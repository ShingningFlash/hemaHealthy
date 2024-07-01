<template>
  <div>
    <!-- 弹窗 -->
    <div class="modal" v-if="isOpen">
      <div class="modal-overlay" @click="isOpen = false"></div>
      <!-- <img v-if="isMobile" class="x" src="../static/img/x.png" style="position: absolute;top:0;right:10%;" alt="" @click="isOpen = false"> -->
      <div class="modal-content">
        <div class="mode">
          <img v-if="isMobile" class="x" src="../static/img/x.png" style="top:60px;right:20px;z-index:999999999" alt=""
            @click="isOpen = false">
          <img v-else class="x" src="../static/img/x.png" alt="x">
          <video :src="vdo" controls></video>
          <div class="rightsss">
            <div class="title" style="">{{ title}}</div>
            <div class="diqu" style="">性别：{{ sex == 1 ?'男' : '女' }} 年龄 {{ age }}
              地区：{{ address }} </div>
            <div class="rightContent" v-html="content" style=""></div>
          </div>
        </div>

      </div>
    </div>
    <div class="swiper">
      <client-only>
        <el-carousel height="35vw" :interval="5000">
          <el-carousel-item v-for="(item,index) in config.banner" :key="index">
            <nuxt-img style="max-width: 100%;" :src="item.img"
              :options="{ quality: 75, formats: ['webp', 'jpeg'], blur: 10, placeholder: true }" provider="twicpics"
              lazy blur-up />
          </el-carousel-item>
        </el-carousel>
      </client-only>

    </div>
    <div class="nav">
      <div class="nav_s">
        <div class="nav-item" :class="activeIndexs == item.id ? 'activeds' : ''" v-for="(item,index) in bigCase"
          :key="index" @click="handleSelects(item.id)">{{ item.cat }}</div>
        <!-- <no-ssr>
          <el-menu :default-active="activeIndexs" class="el-menu-demo" mode="horizontal" @select="handleSelects"
            text-color="#666666" active-text-color="#155263">
            <el-menu-item :index="item.id+''" v-for="(item,index) in bigCase" :key="index">{{ item.cat }}</el-menu-item>

          </el-menu>
        </no-ssr> -->
      </div>

      <div class="nav_w">

        <no-ssr>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
            text-color="#666666" active-text-color="#155263">
            <el-menu-item index="0">视频案列</el-menu-item>
            <el-menu-item index="1">锦旗荣誉</el-menu-item>
            <el-menu-item index="2">服务案例</el-menu-item>
          </el-menu>
        </no-ssr>

        <no-ssr>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item style="">首页</el-breadcrumb-item>
            <el-breadcrumb-item>健康管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{ text }}</el-breadcrumb-item>
          </el-breadcrumb>
        </no-ssr>
      </div>
    </div>

    <div class="content" v-if="!detail && activeIndex == '0'">
      <div class="wow animate__fadeInLeft wenben">
        河马健康耳鸣服务案例全部属于真实案例，如有虚假，我司愿承担一切相关责任！愿接受所有患者与社会各界的监督！
      </div>
      <div class="choose wow animate__fadeInLeft">
        <div class="cjo">
          <div class="shu"></div>
          地区：
          <div class="position" v-for="(item,index) in position" :key="index" :class="current == index ? 'active' :''"
            @click="changePosition(index,item.url)">
            {{ item.catName }}
          </div>
        </div>
        <div class="cjo">
          <div class="shu"></div>
          症状：
          <div class="position" v-for="(item,index) in symptoms" :key="index" :class="currents == index ? 'active' :''"
            @click="changeSymptoms(index,item.url)">
            {{ item.catName }}
          </div>
        </div>
        <div class="cjo detas">
          <div class="shu"></div>
          日期：
          <no-ssr>
            <!-- :picker-options="pickerOptions" -->
            <el-date-picker v-model="value2" type="monthrange" align="right" :unlink-panels="true" range-separator="至"
              start-placeholder="开始月份" end-placeholder="结束月份" popper-class="date-style" @change="onPick">
            </el-date-picker>
          </no-ssr>
        </div>
      </div>

      <div class="listvdo wow animate__fadeInLeft">
        <div class="list_itemvdo " v-for="(item,index) in list" :key="index"
          @click="lookdeo(item.video,item.title,item.sex,item.address,item.age,item.content)">
          <div class="imgbox">
            <img class="img" :src="item.img" alt="">
            <img class="play" src="../static/img/play.png" alt="">
          </div>
          <div class="text">
            <div class="text1">
              {{item.title }}
            </div>
            <div class="text3">
              <span>性别：{{ item.sex == 1 ? '男':'女'}} 年龄：{{ item.age }}</span>
            </div>
            <div class="text3">
              <span>地区：{{ item.address}}</span>
            </div>
            <div class="text2" v-html="item.content">

            </div>
          </div>
        </div>

      </div>
      <div style="display:flex;justify-content: center;margin-top:70px;" v-if="!isMobile">
        <no-ssr>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
            :current-page.sync="page" :page-size="size*1" layout="prev, pager, next, jumper" :total="total">
          </el-pagination>
        </no-ssr>
      </div>
      <div style="display:flex;justify-content: center;margin-top:70px;" v-if="isMobile">
        <no-ssr>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
            :current-page.sync="page" :page-size="size*1" layout="prev, pager, next" :total="total">
          </el-pagination>
        </no-ssr>
      </div>
    </div>

    <div class="content" v-if="!detail && activeIndex == '1'">
      <div class="wow animate__backInLeft titleds" style="">锦旗荣誉</div>
      <div class="wow animate__backInLeft"
        style="width: 62.03px;height: 2px;background: #d87d14ff;margin:0 auto;margin-top:15px"></div>
      <!-- <div class="wow animate__backInLeft" style="font-size: 21px;font-weight: 700;color: #666;margin-top:51px">
      </div> -->


      <div class="list wow animate__rollIn">
        <div class="list_itemjinqi " v-for="(item,index) in list" :key="index">

          <img class="img" :src="item.img" style="" alt="">
          <div class="rights">
            <div class="titless">{{ item.title }}</div>
            <div class="se">性别：{{ item.sex == 1? '男': '女'}}
              年龄：{{ item.age }}，病症：{{ item.symptoms }}，地区：{{ item.address }} </div>
            <div style="font-size: 16px;color: #6F6F6F;margin-top:10px">{{ item.addTime }}</div>
            <div class="se1" v-html="item.content"></div>
          </div>
        </div>
      </div>
      <div style="display:flex;justify-content: center;margin-top:70px;" v-if="!isMobile">
        <no-ssr>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
            :current-page.sync="page" :page-size="size*1" layout="prev, pager, next, jumper" :total="total">
          </el-pagination>
        </no-ssr>
      </div>
      <div style="display:flex;justify-content: center;margin-top:70px;" v-if="isMobile">
        <no-ssr>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
            :current-page.sync="page" :page-size="size*1" layout="prev, pager, next" :total="total">
          </el-pagination>
        </no-ssr>
      </div>
    </div>


    <div class="content" v-if="!detail && activeIndex == '2'">
      <div class="wow animate__backInLeft wenben">
        河马健康耳鸣服务案例全部属于真实案例，如有虚假，我司愿承担一切相关责任！愿接受所有患者与社会各界的监督！
      </div>
      <div class="choose wow animate__backInLeft">
        <div class="cjo" style="">
          <div class="shu"></div>
          地区：
          <div class="position" v-for="(item,index) in position" :key="index" :class="current == index ? 'active' :''"
            @click="changePosition(index,item.url)">
            {{ item.catName }}
          </div>
        </div>
        <div class="cjo">
          <div class="shu"></div>
          症状：
          <div class="position" v-for="(item,index) in symptoms" :key="index" :class="currents == index ? 'active' :''"
            @click="changeSymptoms(index,item.url)">
            {{ item.catName }}
          </div>
        </div>
        <div class="cjo detas">
          <div class="shu"></div>
          日期：
          <no-ssr>
            <!-- :picker-options="pickerOptions" -->
            <el-date-picker v-model="value2" type="monthrange" align="right" :unlink-panels="true" range-separator="至"
              start-placeholder="开始月份" end-placeholder="结束月份" popper-class="date-style" @change="onPick">
            </el-date-picker>
          </no-ssr>
        </div>
      </div>

      <div class="listdete wow animate__rollIn">
        <div class="list_item " v-for="(item,index) in list" :key="index" @click="goDetail(item.casesId)">
          <img class="img" :src="item.img" alt="">
          <div class="text">
            <div class="text1">
              {{ item.title }}
            </div>
            <div class="text2" v-html="item.content">

            </div>
          </div>
        </div>
      </div>
      <div style="display:flex;justify-content: center;margin-top:70px;" v-if="!isMobile">
        <no-ssr>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
            :current-page.sync="page" :page-size="size*1" layout="prev, pager, next, jumper" :total="total">
          </el-pagination>
        </no-ssr>
      </div>
      <div style="display:flex;justify-content: center;margin-top:70px;" v-if="isMobile">
        <no-ssr>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
            :current-page.sync="page" :page-size="size*1" layout="prev, pager, next" :total="total">
          </el-pagination>
        </no-ssr>
      </div>
    </div>

    <div v-if="detail">
      <service-detail :id="id" @data-emitted="handleData" />
    </div>
  </div>
</template>

<script>
  import serviceDetail from '../components/serviceDetail.vue'
  export default {
    components: {
      serviceDetail
    },
    layout: 'mod',
    name: 'Services',
    data() {
      return {
        bigCase: [],
        activeIndexs: '',
        isOpen: false,
        activeIndex: '0',
        position: [],
        symptoms: [],
        list: [],
        current: 0,
        currents: 0,
        id: '1',
        CasesList: [],
        detail: false,
        seo: {},
        total: 0,
        page: 1,
        size: 0,
        currentUrl: '/api/cases/id/2/position/0/symptoms/0',
        vdo: '',
        title: '',
        sex: '',
        address: '',
        age: '',
        content: '',
        config: '',
        text: '视频案例',
        value2: '',
        statTime: '',
        endTime: '',
        hdgd: '680px',

        value1: '',
        value2: '',
        isMobile: false
      }

    },
    mounted() {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['iphone', 'ipod', 'ipad', 'android', 'webos', 'blackberry', 'windows phone'];
      this.getcasesbig()
      this.isMobile = mobileKeywords.some(keyword => userAgent.indexOf(keyword) > -1);
      //   if (this.activeIndex == '2') {
      //     this.currentUrl = '/api/cases/id/2/position/0/symptoms/0?size=9&page=' + this.page + '&startTime=' + String(this
      //       .statTime) + '&endTime=' + String(this.endTime)
      //     this.getData()
      //   }
      //   if (this.activeIndex == '1') {
      //     this.currentUrl = '/api/cases/id/3/position/0/symptoms/0?size=8&page=' + this.page
      //     this.getData()
      //   }
      //   if (this.activeIndex == '0') {
      //     this.currentUrl = '/api/cases/id/1/position/0/symptoms/0?size=12&page=' + this.page + '&startTime=' + String(
      //       this.statTime) + '&endTime=' + String(this.endTime)
      //     this.getData()
      //   }
      if (this.$route.params.id) {
        this.id = this.$route.params.id
        this.detail = !this.detail
      }
      this.getViewportWidth()
      let that = this
      window.onresize = function windowResize() {
        // 通过捕获系统的onresize事件触发我们需要执行的事件
        var w = window.innerWidth
        var h = 680
        if (w < 767) {
          h = 200
        } else if (w > 1180 && w < 1921) {
          h = 680
        } else if (w > 1921 && w < 3841) {
          h = 0.28 * w
        } else if (w > 3841) {
          h = 0.22 * w
        } else if (w > 5759) {
          h = 0.11 * w
        } else {
          h = 0.22 * w
        }
        that.hdgd = h + 'px'
      }
    },


    methods: {
      getViewportWidth() {
        this.viewportWidth = window.innerWidth;
        if (this.viewportWidth < 768) {
          this.hdgd = 200 + 'px'
        }
      },
      textRach(textArea) {
        let text = textArea
          .replace(/<p style="text-align: center;">/g, '<p style="margin:0;">')
          .replace(/<p style="text-align: left;">/g, '<p style="margin:0;">')
        return text
      },
      //   获取大分类
      async getcasesbig() {
        const data = await this.$indexApi.getCase('/api/casesbig')
        console.log(data);
        if (data.status == 1) {
          this.bigCase = data.row
          this.activeIndexs = data.row[0].id
        //   this.bigCase.push({
        //     id: 0,
        //     cat: '所有案例'
        //   })
          this.currentUrl = '/api/cases/id/1/class/' + data.row[0].id + '/position/0/symptoms/0?size=12&page=' + this
            .page + '&startTime=' + String(this
              .statTime) + '&endTime=' + String(this.endTime)
          this.getData()
        }
      },
      onPick(e) {
        console.log(e);
        if (e != null) {
          let statTime = new Date(e[0]).getTime()
          let endTime = new Date(e[1])
          endTime.setMonth(endTime.getMonth() + 1, 1);
          endTime.setSeconds(-1);
          let endTimes = endTime.getTime()
          this.statTime = statTime
          this.endTime = endTimes
          console.log(this.statTime, this.endTime);
          this.page = 1

          if (this.activeIndex == '2') {
            this.currentUrl = '/api/cases/id/2/position/0/symptoms/0?size=9&page=' + this.page + '&startTime=' + String(
              this.statTime) + '&endTime=' + String(this.endTime)
            console.log(this.currentUrl);
          } else {
            this.currentUrl = '/api/cases/id/1/position/0/symptoms/0?size=12&page=' + this.page + '&startTime=' +
              String(this.statTime) + '&endTime=' + String(this.endTime)
          }

          this.gettagData()
        } else {
          this.statTime = ''
          this.page = 1
          this.statTime = ''
          if (this.activeIndex == '2') {
            this.currentUrl = '/api/cases/id/2/position/0/symptoms/0?size=9&page=' + this.page + '&startTime=' + String(
              this.statTime) + '&endTime=' + String(this.endTime)
            console.log(this.currentUrl);
          } else {
            this.currentUrl = '/api/cases/id/1/position/0/symptoms/0?size=12&page=' + this.page + '&startTime=' +
              String(this.statTime) + '&endTime=' + String(this.endTime)
          }

          this.gettagData()
        }

      },
      lookdeo(src, title, sex, address, age, content) {
        this.vdo = src
        this.title = title
        this.sex = sex
        this.address = address
        this.age = age
        this.content = content
        this.isOpen = true

      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val
        this.gettagData()
      },
      changePosition(index, url) {
        this.current = index
        this.page = 1
        this.currentUrl = url
        this.gettagData()

      },
      changeSymptoms(index, url) {
        this.currents = index
        this.page = 1
        this.currentUrl = url
        this.gettagData()
      },
      async gettagData() {
        this.list = []
        if (this.activeIndex == '0') {
          const data = await this.$indexApi.getCase(this.currentUrl + '?size=12&page=' + this.page + '&startTime=' +
            String(
              this.statTime) + '&endTime=' + String(this.endTime))
          if (data.status == 1) {

            if (this.activeIndex == '1') {
              this.list = data.row.pennants.data
              this.total = data.row.pennants.total
              this.size = data.row.pennants.per_page

            } else {
              this.list = data.row.data.data

              this.total = data.row.data.total
              this.size = data.row.data.per_page

            }
            window.scrollTo({
              top: 850,
              behavior: "smooth",
            });
          }
        } else if (this.activeIndex == '2') {
          const data = await this.$indexApi.getCase(this.currentUrl + '?size=9&page=' + this.page + '&startTime=' +
            String(
              this.statTime) + '&endTime=' + String(this.endTime))
          if (data.status == 1) {

            if (this.activeIndex == '1') {
              this.list = data.row.pennants.data
              this.total = data.row.pennants.total
              this.size = data.row.pennants.per_page

            } else {
              this.list = data.row.data.data
              this.total = data.row.data.total
              this.size = data.row.data.per_page
              this.list.forEach(item => {
                if (item.content != '') {

                  item.content = this.textRach(item.content)

                }
              })


            }
            window.scrollTo({
              top: 850,
              behavior: "smooth",
            });
          }
        } else {
          const data = await this.$indexApi.getCase(this.currentUrl + '?size=8&page=' + this.page + '&startTime=' +
            String(
              this.statTime) + '&endTime=' + String(this.endTime))
          if (data.status == 1) {

            if (this.activeIndex == '1') {
              this.list = data.row.pennants.data
              this.total = data.row.pennants.total
              this.size = data.row.pennants.per_page

            } else {
              this.list = data.row.data.data
              this.total = data.row.data.total
              this.size = data.row.data.per_page

            }
            window.scrollTo({
              top: 850,
              behavior: "smooth",
            });
          }
        }

      },
      async getData() {

        this.list = []
        const data = await this.$indexApi.getCase(this.currentUrl)
        if (data.status == 1) {
          this.position = data.row.position
          this.symptoms = data.row.symptoms

          if (this.activeIndex == '2') {
            this.position.unshift({
              url: '/api/cases/id/2/class/' + this.activeIndexs + '/position/0/symptoms/0',
              catName: '全部'
            })
            this.symptoms.unshift({
              url: '/api/cases/id/2/class/' + this.activeIndexs + '/position/0/symptoms/0',
              catName: '全部'
            })
          }
          if (this.activeIndex == '0') {
            this.position.unshift({
              url: '/api/cases/id/1/class/' + this.activeIndexs + '/position/0/symptoms/0',
              catName: '全部'
            })
            this.symptoms.unshift({
              url: '/api/cases/id/1/class/' + this.activeIndexs + '/position/0/symptoms/0',
              catName: '全部'
            })
          }



          if (this.activeIndex == '1') {
            this.list = data.row.pennants.data
            this.total = data.row.pennants.total
            this.size = data.row.pennants.per_page
            this.config = data.row.config
          } else {
            this.list = data.row.data.data
            this.total = data.row.data.total
            this.size = data.row.data.per_page
            this.config = data.row.config
            this.list.forEach(item => {
              if (item.content != '') {

                item.content = this.textRach(item.content)

              }
            })
          }


        }

      },
      handleSelect(ease) {

        this.detail = false
        this.page = 1
        this.activeIndex = ease
        if (ease == '0') {
          this.currentUrl = '/api/cases/id/1/class/' + this.activeIndexs + '/position/0/symptoms/0?size=12&page=' + this
            .page + '&startTime=' + String(
              this.statTime) + '&endTime=' + String(this.endTime)
          this.text = '视频案例'
          this.getData()
        }
        if (ease == '1') {
          this.currentUrl = '/api/cases/id/3/class/' + this.activeIndexs + '/position/0/symptoms/0?size=8&page=' + this
            .page
          this.text = '锦旗荣誉'
          this.getData()
        }
        if (ease == '2') {
          this.currentUrl = '/api/cases/id/2/class/' + this.activeIndexs + '/position/0/symptoms/0?size=9&page=' + this
            .page + '&startTime=' + String(
              this.statTime) + '&endTime=' + String(this.endTime)
          this.text = '服务案例'
          this.getData()
        }
      },
      handleSelects(ease) {
        this.page = 1
        this.detail = false
        this.activeIndex = '0'
        this.activeIndexs = ease
        let size
        if (this.activeIndex == '0') {
          size = 12
        } else if (this.activeIndex == '1') {
          size = 8
        } else {
          size = 9
        }
        this.currentUrl = '/api/cases/id/1/class/' + ease + '/position/0/symptoms/0?size=' + size + '&page=' + this
          .page + '&startTime=' + String(this
            .statTime) + '&endTime=' + String(this.endTime)
        this.getData()



        // if (ease == '0') {
        //   this.currentUrl = '/api/cases/id/1/position/0/symptoms/0?size=12&page=' + this.page + '&startTime=' + String(
        //     this.statTime) + '&endTime=' + String(this.endTime)
        //   this.text = '视频案例'
        //   this.getData()
        // }
        // if (ease == '1') {
        //   this.currentUrl = '/api/cases/id/3/position/0/symptoms/0?size=8&page=' + this.page
        //   this.text = '锦旗荣誉'
        //   this.getData()
        // }
        // if (ease == '2') {
        //   this.currentUrl = '/api/cases/id/2/position/0/symptoms/0?size=9&page=' + this.page + '&startTime=' + String(
        //     this.statTime) + '&endTime=' + String(this.endTime)
        //   this.text = '服务案例'
        //   this.getData()
        // }
      },
      // 获取详情组件的值false 关闭详情
      handleData(data) {

        this.detail = data
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      },


      currentchange(e) {
        this.page = e
        this.getCasesList()
      },
      //   获取
      async getCasesList() {
        let formData = new FormData()
        formData.append('p', this.page)
        const data = await this.$indexApi.getCasesList(formData)
        this.CasesList = data.row
        this.seo = data.seo
        this.total = data.count
      },

      goDetail(id) {
        this.id = id
        this.detail = !this.detail
      }
    }
  }

</script>
<style>
  @media (max-width:767px) {
    .el-date-range-picker .el-picker-panel__body {
      min-width: 0 !important;

    }

    .el-picker-panel {
      width: 100%;
    }

  }

</style>
<style scoped lang="scss">
  @media (max-width:767px) {
    ::v-deep .el-carousel__container {
      //   height: 200px !important;
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
      z-index: 2147483648;
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
      padding: 3.333vmin;
      box-sizing: border-box;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      max-height: 90vh;
      overflow-y: auto;

      .mode {
        // width: 1199.25px;
        // height: 591.25px;
        border-radius: 10px 10px 10px 10px;
        background: #ffffffff;
        position: relative;

        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        .rightsss {
          margin-top: 10px;

          .title {
            font-size: 18px;
            color: #333;
          }

          .diqu {
            font-size: 12px;
            color: #333;
            margin-top: 19px;
          }

          .rightContent {
            font-size: 12px;
            color: #666;
            color: #565656;
            margin-top: 10px;
            max-height: 200px;
            overflow-y: auto;
          }
        }

        video {
          width: 100%;
          object-fit: cover
        }

        .x {
          position: fixed;
          right: -0.333vmin;
          top: -15.333vmin;
          cursor: pointer;
        }
      }

    }

    .nav {
      //   display: none;
      background: #fff;

      //   height: 100px;
      .nav_w {
        display: flex;
        flex-direction: column;

      }

      .nav_s {
        // margin: 0 auto;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        margin-top: 20px;

        .nav-item {
          width: 120px;
          height: 45px;
          text-align: center;
          background-color: rgb(246, 247, 249);
          line-height: 45px;
          border-radius: 30px;
          color: rgb(88, 95, 115);
          font-size: 16px;
          cursor: pointer;
        }

        .activeds {
          background-color: rgb(224, 242, 255);
        }
      }

    }

    .el-menu-item {
      font-size: 16px;
      line-height: 60px;

    }

    .el-breadcrumb {
      font-size: 15px;
      margin-left: 20px;
      margin-top: 20px;
    }


    ::v-deep {

      //   .el-pagination.is-background .el-pager li:not(.disabled) {
      //     background-color: #fff;   // 进行修改未选中背景和字体
      //     // color: #fff;
      //   }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #194E6A; // 进行修改选中项背景和字体
        color: #fff;
      }



    }

    .swiper {
      width: 100%;
      //   height: 200px;
      margin-top: 65px;

      img {
        width: 100%;
        // height: 200px;
      }
    }


    .content {
      // width: 1200px;
      margin: 0 auto;
      padding-bottom: 50px;

      .titleds {
        font-size: 24px;
        font-weight: 700;
        color: #155263;
        text-align: center;
        margin-top: 24px;
      }

      .wenben {
        font-size: 16px;
        font-weight: 700;
        color: #FF0000;
        margin-top: 21px;
        padding: 0 20px;
        box-sizing: border-box;
      }

      .title {
        font-family: "PingFang SC Heavy";
        font-weight: 900;
        font-size: 28px;
        text-align: center;
        color: #000;
        margin-top: 50px;

      }

      .line {
        width: 52px;
        height: 2px;
        background: #0d7111;
        margin: 0 auto;
        margin-top: 15px;
      }

      .grid_container {
        //   width: 1200px;
        display: grid;
        grid-template-columns: repeat(3, 33.33%);
        //   grid-gap: 12px;
        margin: 0 auto;
        margin-top: 60px;
        margin-bottom: 100px;
        color: #fff;

        .boxx {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: opacity 0.5s ease;
          opacity: 0;

          .text {
            width: 320px;
            text-align: center;
          }
        }

        .box {
          &:hover .boxx {
            // transition: color 0.5s ease;
            position: absolute;
            z-index: 1000;
            opacity: 1;

          }

          img {
            transition: transform 0.5s ease;
          }

          &:hover img {
            transform: scale(1.1);
          }

          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(13, 113, 17, .5);
            transition: opacity 1s ease;
            z-index: 1;
            opacity: 0;
            pointer-events: none;
          }

          &:hover::before {
            cursor: pointer;
            opacity: 1;
          }
        }



      }

      .choose {
        padding: 0 20px;
        box-sizing: border-box;
        font-weight: 400;
        font-size: 18px;
        text-align: center;
        color: #333333;
        margin-top: 25px;
        padding-bottom: 28px;
        border-bottom: 1px solid #ccc;


        .cjo {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 15px;
          font-size: 12px;
          gap: 10px;
        }

        .detas {
          //   display: none;
          width: 100%;
        }

        .shu {
          width: 2px;
          height: 24px;
          background: #155263ff;
          //   margin-right: 10px;
        }

        .position {
          // width: 96px;
          padding: 1.333vmin 1.333vmin;
          box-sizing: border-box;
          //   height: px;
          border-radius: 4px 4px 4px 4px;
          border: 1px solid #666666;
          text-align: center;
          //   line-height: 34px;
          font-size: 12 px;
          font-weight: 400;
          color: #666666;
          //   margin-right: 15px;
          cursor: pointer;
          transition: all .5s;
          //   margin-top: 10px;
        }

        .active {
          background: #184E6A;
          color: #fff;
          border: none;
        }
      }


      .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .list_itemjinqi {
          //   width: 576px;
          display: flex;
          //   justify-content: space-between;
          flex-direction: column;
          margin-top: 30px;
          width: 100%;
          border-bottom: 1px dashed #ccc;
          padding-bottom: 20px;


          .img {
            width: 100%;
            padding: 0 20px;
            margin: 0 auto;
            box-sizing: border-box;
            // height: 346px;
            transition: all .5s;

          }



          .rights {


            padding: 0 20px;
            overflow: hidden;

            .titless {
              color: #000000ff;
              font-weight: 700;
              font-size: 18px;
              line-height: 30.13px;
              letter-spacing: 0px;
              text-align: left;
              margin-top: 10px;
            }

            .se {
              color: #000000ff;
              font-weight: 400;
              font-size: 12px;
              line-height: 25px;
              text-align: left;
              margin-top: 8px;
            }

            .se1 {
              color: #6f6f6fff;
              font-weight: 400;
              font-size: 12px;
              text-align: left;
              line-height: 25px;
              max-height: 163px;
              overflow-y: auto;
              margin-top: 5px;

            }
          }
        }


      }


      .listvdo {
        padding: 0 1.33333vmin;
        display: flex;
        flex-wrap: wrap;
        // grid-template-columns: repeat(1, 300px);
        // grid-gap: 5px;
        // max-width: 1200px;

        .list_itemvdo {
          width: 47%;
          position: relative;
          padding: 2.13333vmin 1.33333vmin;
          display: inline-block;
          cursor: pointer;
          // flex-basis: 25%;
          box-shadow: 0 0 29px 0 #2728281c;
          transition: all .5s;

          .imgbox {
            position: relative;
          }

          .img {
            width: 100%;
            // height: 150px;
          }

          .play {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);

          }

          //   &:hover {
          //     transform: scale(1.1);
          //   }

          .text {
            // padding: 18px;
            box-sizing: border-box;

            .text1 {
              font-weight: 700;
              // width: 178px;
              // height: 21px;
              font-size: 16px;
              text-align: left;
              color: #333333;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
              margin-top: 8px;
            }

            .text3 {
              font-weight: 700;
              // width: 178px;
              // height: 21px;
              text-align: left;
              color: #333333;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
              margin-top: 5px;
              font-size: 12px;
              line-height: 20px;
            }

            .text2 {
              color: #666666ff;
              font-weight: 400;
              font-size: 12px;
              text-align: left;
              line-height: 24px;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              max-height: 45px;
            }
          }

        }
      }

      .listdete {
        padding: 0 1.33333vmin;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;

        p {
          margin: 0 !important;
        }

        .list_item {
          width: 46.5%;
          position: relative;
          padding: 2.13333vmin 1.33333vmin;
          display: inline-block;
          cursor: pointer;


          //   width: 255px;
          //   height: 385px;
          border-radius: 10px 10px 10px 10px;
          background: #fcfcfcff;
          box-shadow: 0 0 54px 0 #00000021;
          margin-top: 15px;
          cursor: pointer;
          transition: all .5s;

          &:hover {
            transform: scale(1.1);
          }

          .img {
            width: 100%;
            // height: 232px;
          }

          .text {
            padding: 0.333vmin;
            box-sizing: border-box;

            .text1 {
              font-weight: 700;
              // width: 178px;
              // height: 21px;
              font-size: 16px;
              text-align: left;
              color: #333333;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              margin-top: 10px;

            }

            .text2 {
              color: #666666ff;
              font-weight: 400;
              font-size: 12px;
              text-align: left;
              line-height: 20px;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
              margin-top: 10px;

            }
          }
        }
      }
    }

  }

  @media (min-width:768px) {
    ::v-deep .el-carousel__container {
      //   height: 680px !important;
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
        width: 1199.25px;
        height: 591.25px;
        border-radius: 10px 10px 10px 10px;
        background: #ffffffff;
        position: relative;

        box-sizing: border-box;
        display: flex;
        // justify-content: space-between;

        video {
          //   width: 687px;
          object-fit: cover
        }

        .rightsss {
          margin-left: 51px;

          // width:100px;
          .title {
            font-size: 24px;
            color: #333;
          }

          .diqu {
            font-size: 18px;
            color: #333;
            margin-top: 19px;
          }

          .rightContent {
            height: 85%;
            overflow: auto;
          }
        }

        .x {
          position: absolute;
          right: -33px;
          top: -93px;
          cursor: pointer;
        }
      }

    }

    .nav {
      background: #fff;
      height: 100px;

      .nav_w {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .nav-item {
          width: 210px;
          height: 75px;
          text-align: center;
          background-color: rgb(246, 247, 249);
          line-height: 75px;
        }
      }

      .nav_s {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        
        margin-top: 20px;
        gap: 15px;

        .nav-item {
          width: 190px;
          height: 65px;
          text-align: center;
          background-color: rgb(246, 247, 249);
          line-height: 65px;
          border-radius: 30px;
          color: rgb(88, 95, 115);
          font-size: 24px;
          cursor: pointer;
        }

        .activeds {
          background-color: rgb(224, 242, 255);
        }
      }

    }

    .el-menu-item {
      padding-left: 35px;
      padding-right: 35px;

      font-size: 24px;
      height: 100px;
      line-height: 100px;
    }

    .el-breadcrumb {
      font-size: 18px;
    }

    ::v-deep {

      //   .el-pagination.is-background .el-pager li:not(.disabled) {
      //     background-color: #fff;   // 进行修改未选中背景和字体
      //     // color: #fff;
      //   }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #194E6A; // 进行修改选中项背景和字体
        color: #fff;
      }
    }

    .swiper {
      width: 100%;
      height: 680px;

      img {
        width: 100%;
        height: 680px;
      }
    }


    .content {
      width: 1200px;
      margin: 0 auto;
      padding-bottom: 100px;

      .titleds {
        font-size: 32px;
        font-weight: 700;
        color: #155263;
        text-align: center;
        margin-top: 145px;
      }

      .wenben {
        font-size: 20px;
        font-weight: 700;
        color: #FF0000;
        margin-top: 135px;
      }

      .title {
        font-family: "PingFang SC Heavy";
        font-weight: 900;
        font-size: 34px;
        text-align: center;
        color: #000;
        margin-top: 100px;

      }

      .line {
        width: 52px;
        height: 2px;
        background: #0d7111;
        margin: 0 auto;
        margin-top: 15px;
      }

      .grid_container {
        width: 1200px;
        display: grid;
        grid-template-columns: repeat(3, 392px);
        grid-gap: 12px;
        margin: 0 auto;
        margin-top: 60px;
        margin-bottom: 100px;
        color: #fff;

        .boxx {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: opacity 0.5s ease;
          opacity: 0;

          .text {
            width: 320px;
            text-align: center;
          }
        }

        .box {
          &:hover .boxx {
            // transition: color 0.5s ease;
            position: absolute;
            z-index: 1000;
            opacity: 1;

          }

          img {
            transition: transform 0.5s ease;
          }

          &:hover img {
            transform: scale(1.1);
          }

          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(13, 113, 17, .5);
            transition: opacity 1s ease;
            z-index: 1;
            opacity: 0;
            pointer-events: none;
          }

          &:hover::before {
            cursor: pointer;
            opacity: 1;
          }
        }



      }

      .choose {

        font-weight: 400;
        font-size: 18px;
        text-align: center;
        color: #333333;
        margin-top: 55px;
        padding-bottom: 28px;
        border-bottom: 1px solid #ccc;


        .cjo {
          display: flex;
          align-items: center;
          margin-top: 10px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .shu {
          width: 2px;
          height: 24px;
          background: #155263ff;
          margin-right: 10px;
        }

        .position {
          //   width: 96px;
          //   height: 34px;
          border-radius: 4px 4px 4px 4px;
          border: 1px solid #666666;
          text-align: center;
          line-height: 34px;
          font-size: 16px;
          font-weight: 400;
          color: #666666;
          margin-right: 15px;
          cursor: pointer;
          padding: 0 20px;
          transition: all .5s;
          //   margin-top: 10px;
          white-space: nowrap;
        }

        .active {
          background: #184E6A;
          color: #fff;
          border: none;
        }
      }


      .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .list_itemjinqi {
          width: 576px;
          display: flex;
          justify-content: space-between;
          margin-top: 51px;

          .img {
            width: 269px;
            height: 346px;
            transition: all .5s;

          }

          .rights {
            overflow: hidden;
            margin-left: 20px;

            .titless {
              color: #000000ff;
              font-weight: 700;
              font-size: 20px;
              line-height: 30.13px;
              letter-spacing: 0px;
              text-align: left;
            }

            .se {
              color: #000000ff;
              font-weight: 400;
              font-size: 16px;
              line-height: 25px;
              text-align: left;
              margin-top: 8px;
            }

            .se1 {
              color: #6f6f6fff;
              font-weight: 400;
              font-size: 14px;
              text-align: left;
              line-height: 25px;
              height: 146px;
              overflow: auto;


            }
          }
        }




      }

      .listvdo {
        display: grid;
        grid-template-columns: repeat(4, 255px);
        grid-gap: 60px;
        max-width: 1200px;

        .list_itemvdo {
          width: 255px;
          position: relative;
          margin-top: 20px;
          cursor: pointer;
          // flex-basis: 25%;
          box-shadow: 0 0 29px 0 #2728281c;
          transition: all .5s;

          .imgbox {
            position: relative;
          }

          .img {
            width: 255px;
            width: 100%;
            // height: 207px;


          }

          .play {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

          }

          &:hover {
            transform: scale(1.1);
          }

          .text {
            padding: 18px;
            box-sizing: border-box;

            .text1 {
              font-weight: 700;
              // width: 178px;
              // height: 21px;
              font-size: 18px;
              text-align: left;
              color: #333333;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }

            .text3 {
              font-weight: 700;
              // width: 178px;
              // height: 21px;
              text-align: left;
              color: #333333;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
              margin-top: 10px;
              font-size: 16px;
              line-height: 20px;
            }

            .text2 {
              color: #666666ff;
              font-weight: 400;
              font-size: 18px;
              text-align: left;
              line-height: 24px;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          }

        }
      }

      .listdete {
        display: grid;
        grid-template-columns: repeat(3, 370px);
        grid-gap: 43px;
        max-width: 1200px;
        margin-top: 20px;

        .list_item {
          width: 371px;
          //   height: 385px;
          border-radius: 10px 10px 10px 10px;
          background: #fcfcfcff;
          box-shadow: 0 0 54px 0 #00000021;

          cursor: pointer;
          transition: all .5s;

          &:hover {
            transform: scale(1.1);
          }

          .img {
            width: 371px;
            // height: 232px;
          }

          .text {
            padding: 23px;
            box-sizing: border-box;

            .text1 {
              font-weight: 700;
              // width: 178px;
              // height: 21px;
              font-size: 20px;
              text-align: left;
              color: #333333;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }

            .text2 {
              color: #666666ff;
              font-weight: 400;
              font-size: 18px;
              text-align: left;
              line-height: 30px;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          }
        }
      }
    }

  }

</style>
