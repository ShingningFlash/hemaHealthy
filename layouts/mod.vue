<template>
  <div id="app">
    <Header :data="data" v-if="data != ''" />
    <main>
      <Nuxt  />
    </main>

    <Footer :data="data" v-if="data != ''" />
    <Fiex :data="data.system" v-if="status" style="z-index:99" @data-emitted="handleData"
      @data-emitted2="isOpen = true" />

    <no-ssr>
      <el-drawer title="在线留言" :visible.sync="drawer" :direction="direction" :size="drawerWidth">
        <div style="padding: 20px;box-sizing: border-box;">
          <div class="demo-input-suffix">
            标题：
            <el-input placeholder="请输入标题(必填)" v-model="form.title">
            </el-input>
          </div>
          <div class="demo-input-suffix">
            昵称：
            <el-input placeholder="请输入昵称(必填)" v-model="form.name">
            </el-input>
          </div>
          <div class="demo-input-suffix">
            手机号码：
            <el-input placeholder="请输入手机号码(必填)" v-model="form.phone">
            </el-input>
          </div>
          <div class="demo-input-suffix">
            电子邮件：
            <el-input placeholder="请输入电子邮件(必填)" v-model="form.email">
            </el-input>
          </div>
          <div class="demo-input-suffix">
            微信号码：
            <el-input placeholder="请输入微信号码(选填)" v-model="form.xing">
            </el-input>
          </div>
          <div class="demo-input-suffix">
            留言内容：
            <el-input type="textarea" placeholder="请输入留言内容(必填)" v-model="form.content"></el-input>
          </div>
          <el-button type="primary" style="margin-top:20px;" @click="push">提交</el-button>
          <el-button  style="margin-top:20px;margin-left:20px;" @click="drawer = false">关闭</el-button>
        </div>
      </el-drawer>
    </no-ssr>
    <!-- 弹窗 -->
    <div class="modal" v-if="isOpen">
      <div class="modal-overlay" @click="isOpen = false"></div>
      <div class="modal-content">
        <div class="mode">
          <img class="x" src="../static/img/x.png" alt="" @click="isOpen = false">
          <img :src="data.system.wxqrcode"  alt="" style="width:150px;height:150px;">
          <div style="font-size:20px">微信咨询</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  if (process.browser) { // 在这里根据环境引入wow.js
    var {
      WOW
    } = require('wowjs')
  }
  import Header from '~/components/Header.vue'
  import Footer from '~/components/Footer.vue'
  import Fiex from '~/components/Fiex.vue'
  export default {
    components: {
      Header,
      Footer,
      Fiex
    },
    data() {
      return {
        status: false,
        drawerWidth:'30%',
        data: '',
        drawer: false,
        direction: 'rtl',
        isOpen: false,
        form: {
          title: '',
          name: '',
          phone: '',
          email: '',
          xing: '',
          content: ''
        }
      }
    },
    methods: {
        getViewportWidth() {
        this.viewportWidth = window.innerWidth;
        if (this.viewportWidth < 768) {
          this.drawerWidth = '100%'

        }
    },
      async getCollocation() {
        const data = await this.$indexApi.getCollocation()
        this.data = data.row
        sessionStorage.setItem('contact_number',this.data.system.contact_number)
        console.log(this.data);
      },
      handleData(data) {
        this.drawer = data
      },
      async push() {
        if (this.form.title == '') {
          return this.$message.error('标题不能为空');
        }
        if (this.form.name == '') {
          return this.$message.error('昵称不能为空');
        }
        let phoneRegex = /^1[3-9]\d{9}$/
        if (!phoneRegex.test(this.form.phone)) {
          return this.$message.error('手机号码格式不正确');
        }
        let emailRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        if (!emailRegex.test(this.form.email)) {
          return this.$message.error('电子邮件格式不正确');
        }
        if (this.form.content == '') {
          return this.$message.error('留言内容不能为空');
        }

        
        const data = await this.$indexApi.pushdata(this.form)
        console.log(data);
        if (data.status == 1) {
          this.form = {
            title: '',
            name: '',
            phone: '',
            email: '',
            xing: '',
            content: ''
          }
          this.$message({
            message: data.msg + '，留言已提交',
            type: 'success'
          });

        }
      }

    },
    mounted() {
      var that = this
      this.getCollocation()
      this.getViewportWidth()
      this.$nextTick(() => {
        if (process.browser) { // 在页面mounted生命周期里面 根据环境实例化WOW
          new WOW({
            animateClass: 'animate__animated'
          }).init()

        }

      });
      window.onscroll = function () {
        //变量t是滚动条滚动时，距离顶部的距离
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        //当滚动到距离顶部200px时，返回顶部的相关按钮显示
        if (t >= 500) {
          that.status = true
        } else { //隐藏按钮正常
          that.status = false
        }
      }
    },

  }

</script>
<style scoped lang="scss">
@media (max-width:767px){
    .el-drawer{
        width:100% !important;
    }
}
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    position: relative;
    background-color: #fff;
    padding: 40px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

    .mode {
      width: 400px;
      height: 200.25px;
      border-radius: 10px 10px 10px 10px;
      background: #ffffffff;
      position: relative;
    align-items: center;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .x {
        position: absolute;
        right: -11px;
        top: -93px;
        cursor: pointer;
      }
    }

  }

  .demo-input-suffix {
    display: flex;
    white-space: nowrap;
    align-items: center;
    margin-top: 20px;
  }

</style>
