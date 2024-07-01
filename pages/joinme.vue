<template>
  <div>
    <div class="swiper">
      <img :src="config.image" lazy />
    </div>
    <div class="item">
      <div class="box">
        <div class="name wow animate__backInUp">{{ config.mtitle }}</div>
        <div class="line"></div>
        <div class="content wow animate__backInUp" v-html="config.mtext">

        </div>
      </div>

      <div class="tab ">
        <div class="tab_item wow animate__backInUp" :class="current==index ? 'active':''" v-for="(item,index) in data"
          :key="index" @click="changeTab(index)">
          {{ item.catName}}
        </div>
      </div>

      <div class="job">
        <div class="job_item wow animate__bounceIn" v-for="(item,index) in child" :key="index"
          :style="{background:'url('+item.img+') no-repeat center/cover'}">
          <div class="nei">
            <div class="title">{{ item.title }}</div>
            <div style="font-weight: 400;font-size: 18px;color:#fff;margin-top:29px;margin-bottom: 19px;">岗位职责</div>
            <div class="introduction" v-html="item.introduction"></div>
            <div style="font-weight: 400;font-size: 18px;color:#fff;margin-top:29px;margin-bottom: 19px;">任职要求</div>
            <div class="content" v-html="item.content"></div>
            <div class="btn" @click="drawer = true">立即联系</div>
          </div>
        </div>
      </div>


      <no-ssr>
      <el-drawer title="立即联系" :visible.sync="drawer" :direction="direction" :size="drawerWidth">
        <div style="padding: 20px;box-sizing: border-box;">
          <div class="demo-input-suffix">
            应聘岗位：
            <el-input placeholder="请输入应聘岗位(必填)" v-model="form.title">
            </el-input>
          </div>
          <div class="demo-input-suffix">
            姓名：
            <el-input placeholder="请输入姓名(必填)" v-model="form.name">
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
            期望薪资：
            <el-input placeholder="请输入期望薪资(选填)" v-model="form.xing">
            </el-input>
          </div>
          <div class="demo-input-suffix">
            其他：
            <el-input type="textarea" placeholder="请输入其他(必填)" v-model="form.content"></el-input>
          </div>
          <el-button type="primary" style="margin-top:20px;" @click="push">提交</el-button>
          <el-button  style="margin-top:20px;margin-left:20px;" @click="drawer = false">关闭</el-button>
        </div>
      </el-drawer>
    </no-ssr>
    </div>
  </div>
</template>
<script>
  export default {
    layout: "mod",
    name: "Joinme",
    data() {
      return {
        config: '',
        data: [],
        current: 0,
        child: [],
        drawerWidth:'30%',
        direction: 'rtl',
        drawer: false,
        form: {
          title: '',
          name: '',
          phone: '',
          email: '',
          xing: '',
          content: ''
        },
        viewportWidth:''
      }

    },
   
    mounted() {
      this.getData()
      this.getViewportWidth()
    },
    methods: {
        getViewportWidth() {
        this.viewportWidth = window.innerWidth;
        if (this.viewportWidth < 768) {
          this.drawerWidth = '100%'

        }
    },
    async push() {
        if (this.form.title == '') {
          return this.$message.error('应聘岗位不能为空');
        }
        if (this.form.name == '') {
          return this.$message.error('姓名不能为空');
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
          return this.$message.error('其他不能为空');
        }

        
        const data = await this.$indexApi.pushjob(this.form)
        console.log(data);
        if (data.status == 1) {
            this.drawer = false
          this.form = {
            title: '',
            name: '',
            phone: '',
            email: '',
            xing: '',
            content: ''
          }
          alert(data.msg + '，内容已提交');

        }
      },
      alert() {

        alert(`河马健康服务热线：\n` + sessionStorage.getItem('contact_number'))

      },
      changeTab(index) {
        this.current = index
        this.child = this.data[index].child
      },
      //   获取新闻列表
      async getData() {
        const data = await this.$indexApi.getJoinUs();
        if (data.status == 1) {
          this.config = data.row.config
          this.data = data.row.data
          this.child = this.data[0].child
        }
      },
    }
  }

</script>

<style lang="scss" scoped>
.demo-input-suffix {
    display: flex;
    white-space: nowrap;
    align-items: center;
    margin-top: 20px;
  }
  @media (max-width: 767px) {

    /* Your styles here */
    .swiper {
      width: 100%;
      margin-top: 65px;

      img {
        width: 100%;
        // height: 200px;
      }
    }

    .item {
      padding: 50px 20px;
      box-sizing: border-box;

      .box {
        //   width: 1200px;
        margin: 0 auto;

        .name {
          font-weight: 700;
          font-size: 24px;
          text-align: center;
          color: #155263;

        }

        .line {
          width: 62px;
          height: 2px;
          background: #d87d14ff;
          margin-top: 27px;
          margin-bottom: 27px;
          margin: 15px auto;
        }

        .content {
          color: #666666ff;
          font-weight: 400;
          font-size: 12px;
          // text-align: left;
          // line-height: 35px;
        }


      }

      .tab {
        display: flex;
        //   justify-content: center;
        align-items: center;
        margin-top: 50px;
        flex-wrap: wrap;
        gap: 10px;

        .tab_item {
          height: 28px;
          border-radius: 28px 28px 28px 28px;
          border: 1px solid #2C6372;
          color: #2C6372;
          text-align: center;
          line-height: 28px;
          padding: 0 60px;
          transition: all .5s;
          cursor: pointer;
          font-weight: 400;
          font-size: 12px;
          white-space: nowrap;
        }

        .active {
          color: #fff;
          background: #2C6372;
        }

      }

      .job {
        //   width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 56px;

        .job_item {
          // width: 380px;
          // height: 708px;
          border-radius: 10px 10px 10px 10px;
          margin-top: 10px;

          .nei {
            width: 100%;
            height: 100%;
            background: rgba(21, 82, 99, 0.8);
            padding: 40px 30px;
            box-sizing: border-box;
            position: relative;

            .title {
              font-weight: 700;
              font-size: 24px;
              text-align: center;
              color: #FFFFFF;
            }

            .introduction {
              color: #ffffffff;
              font-weight: 400;
              font-size: 12px;
              line-height: 26px;
            }

            .content {
              color: #ffffffff;
              font-weight: 400;
              font-size: 12px;
              line-height: 26px;
            }

            .btn {
              width: 127px;
              height: 31px;
              border-radius: 20.5px 20.5px 20.5px 20.5px;
              background: #d87d14ff;
              line-height: 31px;
              text-align: center;
              font-weight: 400;
              font-size: 13px;
              color: #FFFFFF;
              position: relative;
              left: 50%;
              transform: translateX(-50%);
              bottom: -10px;
              transition: all .5s;

              &:hover {
                background-color: lighten(#d87d14ff, 10%);
                cursor: pointer;
              }
            }
          }
        }
      }

    }
  }

  @media (min-width: 1200px) {

    /* Your styles here */
    .swiper {
      width: 100%;

      img {
        width: 100%;
        height: 680px;
      }
    }

    .item {
      padding: 100px 0;

      .box {
        width: 1200px;
        margin: 0 auto;

        .name {

          font-weight: 700;

          font-size: 32px;
          text-align: center;
          color: #155263;

        }

        .line {
          width: 62px;
          height: 2px;
          background: #d87d14ff;
          margin-top: 27px;
          margin-bottom: 27px;
          margin: 20px auto;
        }

        .content {
          color: #666666ff;
          font-weight: 400;
          font-size: 19px;
          text-align: center;
          // line-height: 35px;
        }


      }

      .tab {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 50px;

        .tab_item {

          height: 58px;
          border-radius: 28px 28px 28px 28px;
          border: 1px solid #2C6372;
          color: #2C6372;
          text-align: center;
          line-height: 58px;
          padding: 0 60px;
          transition: all .5s;
          cursor: pointer;
          font-weight: 400;
          font-size: 20px;
          margin-right: 25px;

        }

        .active {
          color: #fff;
          background: #2C6372;
        }

      }

      .job {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 56px;

        .job_item {
          width: 380px;
          height: 708px;
          border-radius: 10px 10px 10px 10px;

          .nei {
            width: 100%;
            height: 100%;
            background: rgba(21, 82, 99, 0.8);
            padding: 40px 30px;
            box-sizing: border-box;
            position: relative;

            .title {
              font-weight: 700;
              font-size: 24px;
              text-align: center;
              color: #FFFFFF;
            }

            .introduction {
              color: #ffffffff;
              font-weight: 400;
              font-size: 14px;
              line-height: 26px;
            }

            .content {
              color: #ffffffff;
              font-weight: 400;
              font-size: 14px;
              line-height: 26px;
            }

            .btn {
              width: 187px;
              height: 41px;
              border-radius: 20.5px 20.5px 20.5px 20.5px;
              background: #d87d14ff;
              line-height: 41px;
              text-align: center;
              font-weight: 400;
              font-size: 16px;
              color: #FFFFFF;
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              bottom: 75px;
              transition: all .5s;

              &:hover {
                background-color: lighten(#d87d14ff, 10%);
                cursor: pointer;
              }
            }
          }
        }
      }

    }
  }

</style>
