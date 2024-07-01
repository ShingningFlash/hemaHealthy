<template>
  <div>
    <!-- 弹窗 -->
    <div class="modal" v-if="isOpen">
      <div class="modal-overlay" @click="isOpen = false"></div>
      <div class="modal-content">
        <div class="mode">
          <img class="x" src="../static/img/x.png" alt="" @click="isOpen = false">
          <video style="width:100%;object-fit: cover" :src="config.indexVideo" controls></video>
        </div>

      </div>
    </div>
    <div class="swiper">
      <client-only>
        <el-carousel height="35vw" :interval="5000">
          <el-carousel-item v-for="(item,index) in config.banner" :key="index">
            <img :src="item.img" style="max-width: 100%;" alt="" @click="hasvideo">
          </el-carousel-item>
        </el-carousel>
      </client-only>
    </div>
    <!-- 解决方案 -->
    <div class="Solutions">
      <div class="box1">
        <div class="left">
          <div class="name">
            {{  model1.title}}
          </div>
          <div class="line"></div>
          <div class="inc">
            {{ model1.text }}
          </div>
          <div class="btn">
            <nuxt-link style="color:#184e6a;width:100%;height:100%;text-decoration: none;" to="/aboutus">了解更多 >>
            </nuxt-link>

          </div>
        </div>
        <div class="right">
          <img :src="model1.img" style="width:497px;height:376px;" alt="">
          <div class="bg"></div>
        </div>
      </div>
      <div class="box2">
        <div class="text">河马健康+河马医药+河马互联网医院</div>
        <div class="square wow animate__fadeInLeft">
          <div class="item " v-for="(item,index) in model1.tagImages" :key="index">
            <img :src="item.img" style="" alt="">
            <div class="wen">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="sed ">
      <div class="title wow animate__fadeInLeft">
        {{ model2.title }}
      </div>
      <div class="entitle wow animate__fadeInLeft">
        {{ model2.viceTitle }}
      </div>
      <div class="inc wow animate__fadeInLeft">
        {{ model2.text }}
      </div>
      <div class="consultation wow animate__fadeInLeft">
        <div class="item1" v-html="model2.content">

        </div>
      </div>


      <div class="kuan wow animate__zoomInDown">
        <div class="nei">
          <div class="nei_item" v-for="(item,index) in model2.tagImages" :key="index">
            <img :src="item.img" alt="">

            <div class="text1">
              {{ item.title }}
            </div>
            <div class="text2">
              {{ item.remarks }}
            </div>

          </div>

        </div>
      </div>
    </div>
    <div class="partner">
      <div class="partner_item">
        <div class="title1 wow animate__fadeInLeft">{{ model3.title }}</div>
        <div class="title2 wow animate__fadeInLeft">{{ model3.viceTitle }}</div>
        <div class="title3 wow animate__fadeInLeft">{{ model3.text }}</div>
        <div class="title4 wow animate__fadeInLeft" v-html="model3.content"></div>
        <div class="list" v-if="model3 != ''">
          <div class="list_item" v-for="(item,index) in partner" :key="index">
            <img :src="item.img" style="width:100%;height:100%" alt="">
          </div>

        </div>
        <div class="pagination">
          <li v-for="pages in pageCount" :key="pages" @click="paner(pages)">
            <a :class="pages == page ? 'active' :''"></a>
          </li>

        </div>
      </div>
    </div>


    <div class="news">
      <div class="news_item">
        <div class="title1 wow animate__fadeInLeft">{{ model4.title }}</div>
        <div class="title2 wow animate__fadeInLeft">{{ model4.viceTitle }}</div>
        <div class="title3 wow animate__fadeInLeft">{{ model4.text }}</div>
        <div class="content">
          <div class="left wow animate__fadeInLeft">

            <div v-for="(item,index) in model4.cat" :key="index" :class="current == index ? 'active' : ''" class="bao"
              @click="change(index)">
              <div class="item_tab">
                <img v-if="current == index" src="../static/img/serviceSelectIcon.png" alt=""
                  style="margin-right:12px;margin-left:20px;">
                <img v-else src="../static/img/serviceIcon.png" alt="" style="margin-right:12px;margin-left:20px;">
                {{ item.catName }}
              </div>

              <div v-if="current == index">
                <div class="tab_item" v-for="(items,indexs) in item.child" :key="indexs"
                  @click="openNew('news',items.id)">
                  {{ items.title }}
                </div>
              </div>

            </div>
            <div class="item_tab" style="color:#396D84;line-height: 67px;font-weight:700;cursor: pointer;"
              @click="openNewList('news')">
              <img src="../static/img/serviceIcon.png" alt="" style="margin-right:12px;margin-left:20px;">
              查看更多>>
            </div>
          </div>
          <div class="right wow animate__fadeInRight">
            <client-only>
              <el-carousel height="608px" indicator-position="none" :interval="5000">
                <el-carousel-item autoplay="false" v-for="(item,index) in newsList" :key="index"
                  @click.native="openNew('news',item.newsId)">
                  <nuxt-img :src="item.img" style="width:100%;"
                    :options="{ quality: 75, formats: ['webp', 'jpeg'], blur: 10, placeholder: true }"
                    provider="twicpics" lazy blur-up />

                  <div class="text">
                    <div class="text1">{{ item.addTime }}</div>
                    <div class="text2">
                      {{ item.title }}
                    </div>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </client-only>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  export default {
    layout: 'mod',
    name: 'IndexPage',
    data() {
      return {
        swperList: [], //轮播图列表
        hdgd: '680px', //轮播图高度
        serviceList: [], //服务案例
        newsList: [], //新闻列表
        partner: [], //合作伙伴
        newsTitle: '',
        newsIntroduction: '',
        newsId: '',
        current: 1,
        total: 0,
        child: [],
        tablist: [],
        config: [], //首页视频链接
        model1: [], // 模块1
        model2: [], //模块2
        model3: [], //模块3
        model4: [], //模块4
        newsList: [], //新闻
        page: 1,
        partner: [],
        viewportWidth: '',
        isOpen: false

      }
    },

    computed: {
      pageCount() {
        return Math.ceil(this.total / 12);
      },
      paginatedItems() {
        const startIndex = (this.page - 1) * 12;
        const endIndex = startIndex + 12;
        return this.partner.slice(startIndex, endIndex);
      }
    },
    mounted() {

      this.getData()
      this.getViewportWidth();
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
          h = 0.33 * w
        } else if (w > 3841 && w < 5600) {
          h = 0.11 * w
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
      // 是否有视频
      hasvideo() {
        if (this.config.indexVideo) {
          if (this.config.indexVideo != '') {
            this.isOpen = true
          }
        }
      },
      openNewList(name, id, index) {
        this.$router.push({
          name: name,
          //   params: {
          //     catId: id,
          //     current:index
          //   }
        })
      },
      openNew(name, id) {
        console.log(name);
        this.$router.push({
          name: name,
          params: {
            id: id
          }
        })
      },
      change(e) {
        this.current = e
        // this.newsTitle = this.newsList[e].title
        // this.newsIntroduction = this.newsList[e].introduction
        // this.newsId = this.newsList[e].newsId
      },
      async paner(pages) {
        console.log(pages);
        this.page = pages
        const data = await this.$indexApi.getNewsDetail('/api/index?size=12&page=' + this.page)
        let ss = data.row.model3
        this.partner = ss.partners.data
        this.total = ss.partners.total

      },
      // 获取首页数据
      async getData() {
        const data = await this.$indexApi.getIndex()
        console.log(data);
        if (data.status == 1) {

          this.config = data.row.config
          this.model1 = data.row.model1
          this.model2 = data.row.model2
          this.model3 = data.row.model3
          this.model4 = data.row.model4
          this.partner = this.model3.partners.data
          this.total = this.model3.partners.total
          this.child = this.model4.cat[1].child
          this.newsList = this.model4.news

        }

        // code something
      },
      async getPub() {
        const data = await this.$indexApi.getPublic()
        console.log(data);
      }

    }
  }

</script>
<style scoped>
  .el-icon-arrow-left {
    font-size: 40px;
  }

  .el-icon-arrow-right {
    font-size: 40px;
  }

  .el-carousel__arrow {
    width: 45px;
    height: 45px;
  }

</style>
<style lang="scss" scoped>
  @media (max-width:767px) {
    ::v-deep .el-carousel__container:nth-last-child(1) {
      height: 200px !important;
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
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

      .mode {
        // width: 1199.25px;
        // height: 591.25px;a
        border-radius: 10px 10px 10px 10px;
        background: #ffffffff;
        position: relative;

        box-sizing: border-box;
        display: flex;
        justify-content: space-between;

        .x {
          position: absolute;
          right: -15px;
          top: -67px;
          cursor: pointer;
        }
      }

    }

    .swiper {
      width: 100%;
      margin-top: 65px;
      img{
        width:100%;
      }
    }

    //   服务案例
    .Solutions {
      text-align: center;
      letter-spacing: 0.05px;
      padding: 50px 0;

      .box1 {
        // width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        .left {
          .name {
            font-weight: 700;
            // width: 144px;
            // height: 36px;
            font-size: 24px;
            color: #155263;
            white-space: nowrap;
            text-align: center;
          }

          .line {
            // width: 630px;
            height: 1px;
            background: #dfdede;
            margin-top: 15px;
            margin-bottom: 20px;
          }

          .inc {
            // width: 630px;
            font-weight: 400;
            // height: 184px;
            font-size: 14px;
            color: #333333;
            text-align: left;
            line-height: 30px;
            padding: 0 20px;
            box-sizing: border-box;

          }

          .btn {
            width: 104px;
            height: 31px;
            border-radius: 20px 20px 20px 20px;
            border: 1px solid #184e6a;
            text-align: center;
            line-height: 31px;
            font-weight: 400;
            font-size: 12px;
            color: #396D84;
            margin-top: 30px;
            margin-left: 20px;

          }
        }

        .right {
          display: none;
          position: relative;
          margin-top: 60px;

          .bg {
            width: 215.94px;
            height: 421px;
            background: #155263ff;
            position: absolute;
            z-index: -1;
            right: -20px;
            top: -20px;
          }
        }
      }

      .box2 {
        // width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        margin-top: 50px;
        box-sizing: border-box;

        .text {
          font-weight: 700;

          font-size: 18px;
          text-align: left;
          color: #155263;
          //   white-space: nowrap;
          text-align: center;
        }

        .square {
          display: flex;
          //   justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 30px;

          .item {
            width: 100px;
            height: 100px;
            border-radius: 10px 10px 10px 10px;
            background: #ffffffff;
            box-shadow: 0 0 24px 0 #0e050a24;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-direction: column;
            transition: all .5s;
            margin-top: 15px;
            padding: 5px;
            // padding:30px;
            box-sizing: border-box;

            img {
              // flex:1;
              transform: scale(0.4);
              // width:58px;
              // height: 71px;
              height: 60px;
            }

            .wen {
              flex: 1;
              margin-top: 5px;
              color: #333333;
              font-size: 12px;
              font-weight: 400;

            }

            &:hover {
              transform-origin: center;
              transform: scale(1.1);
              cursor: pointer;
            }
          }
        }
      }
    }

    .sed {
      width: 100%;
      background: url('../static/img/bg.png') no-repeat center/cover;
      padding: 50px 0;

      .title {
        font-size: 24px;
        text-align: center;
        color: #FFFFFF;

      }

      .entitle {
        font-weight: 400;
        opacity: 0.8;
        font-size: 12px;
        text-align: center;
        color: #FFFFFF;
        margin-top: 10px;
      }

      .inc {
        // width: 1200px;
        margin: 0 auto;
        font-weight: 400;
        font-size: 12px;
        text-align: center;
        color: #FFFFFF;
        margin-top: 20px;
        padding: 0 20px;
        box-sizing: border-box;
        line-height: 20px;
      }

      .consultation {
        // width: 1200px;
        margin: 0 auto;
        margin-top: 40px;
        padding: 0 20px;
        box-sizing: border-box;

        .item1 {

          font-size: 12px;
          text-align: left;
          color: #FFFFFF;
          line-height: 30px;

          .incc {
            color: #fff;
            font-weight: 400;
            font-size: 12px;
            text-align: left;
            padding-left: 25px;
            box-sizing: border-box;
            line-height: 30px;
          }
        }
      }

      .kuan {
        // width: 1200px;
        //   height: 440px;
        border-radius: 10px 10px 10px 10px;
        background: rgba(255, 255, 255, .18);
        margin: 0 auto;
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 25px;
        box-sizing: border-box;

        .nei {
          //   width: 1160px;
          // height: 400px;
          border-radius: 10px 10px 10px 10px;
          opacity: 0.9;
          background: #ffffffff;
          display: flex;
          flex-wrap: wrap;
          padding: 15px;

          .nei_item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            gap: 5px;
            cursor: pointer;
            margin-top: 20px;
            width: 50%;

            img {
              transform: scale(0.8);
              transition: all .5s;
              width: 58px;
              height: 58px;

            }

            &:hover img {
              transform: scale(1);
            }

            .text1 {
              color: #155263ff;
              font-weight: 400;
              font-size: 12px;
              text-align: center;
              margin-top: 0px;
            }

            .text2 {
              color: #333333ff;
              font-weight: 400;
              font-size: 12px;
              text-align: center;
              margin-top: 5px;
              height: 15px;
              /* line-height: 17px; */
              display: flex;
            }
          }
        }
      }
    }


    //   合作伙伴
    .partner {
      padding: 50px 0;

      .partner_item {
        // width: 1200px;
        margin: 0 auto;
        text-align: center;

        .title1 {
          font-weight: 700;

          font-size: 24px;
          text-align: center;
          color: #333333;
        }

        .title2 {
          font-weight: 400;
          margin-top: 5px;
          opacity: 0.8;
          font-size: 12px;
          text-align: center;
          color: #333333;
        }

        .title3 {
          color: #333333ff;
          font-weight: 400;
          font-size: 18px;
          text-align: center;
          margin-top: 16px;
          padding: 0 20px;
          box-sizing: border-box;
        }

        .title4 {
          color: #333333ff;
          font-weight: 700;
          font-size: 16px;
          text-align: center;
          margin-top: 15px;
        }

        .list {
          padding: 0 20px;
          box-sizing: border-box;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 10px;

          .list_item {
            width: 47%;
            // height: 127px;
            border: 1px solid #ccc;
            margin-top: 20px;
            transition: all .5s;

            &:hover {
              transform-origin: center;
              transform: scale(1.1);
              cursor: pointer;
            }
          }
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 40px;
        }

        .pagination li {
          list-style: none;
          margin: 0 10px;
        }

        .pagination li a {
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          text-align: center;
          line-height: 8px;
          color: #396D84;
          border: 2px solid #396D84;
          background-color: white;
          cursor: pointer;
        }

        .pagination .active {
          background-color: #396D84;
          color: white;
          cursor: not-allowed;
        }

      }
    }

    .news {
      padding: 50px 0;
      background: #f5f5f5;

      .news_item {
        // width: 1200px;
        margin: 0 auto;



        .content {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          margin-top: 30px;
          padding: 0 20px;
          box-sizing: border-box;

          .left {
            // width: 352px;
            //   height: 583px;
            border-radius: 9px 9px 9px 9px;
            background: #ffffffff;
            box-shadow: 0 1px 46px 0 #2828280d;

            .bao {

              border-bottom: 1px solid #BCBCBC;


              &:last-child {
                border-bottom: none;
              }

              .item_tab {
                // width: 352px;
                // height: 67px;
                // background: #fff;
                // display: flex;
                // align-items: center;
                font-weight: 700;
                font-size: 14px;
                // color: #797979;
                // padding: 25px 20px;
                box-sizing: border-box;
                line-height: 67px;
                cursor: pointer;
              }
            }


            .tab_item {
              //   width: 352px;
              height: 67px;
              background: #fff;
              display: flex;
              align-items: center;
              font-weight: 700;
              font-size: 12px;
              color: #797979;
              padding: 25px 20px;
              padding-left: 50px;
              box-sizing: border-box;
              border-bottom: 1px dashed #BCBCBC;
              cursor: pointer;

              &:last-child {
                border-bottom: none;
              }
            }

            .active {
              background: #396D84;
              color: #fff;
            }
          }

          .right {
            // width: 100;
            border-radius: 20px;
            overflow: hidden;
            position: relative;
            margin-top: 20px;



          }
        }

        .text {
          position: absolute;
          bottom: 30px;
          left: 25px;
          font-size: 12px;

          .text1 {
            font-size: 12px;
            color: #fff;
          }

          .text2 {
            font-size: 18px;
            color: #fff;
            margin-top: 10px;
            letter-spacing: -0.02px;
          }
        }

        .title1 {
          font-weight: 700;

          font-size: 24px;
          text-align: center;
          color: #333333;
        }

        .title2 {
          font-weight: 400;
          margin-top: 5px;
          opacity: 0.8;
          font-size: 10px;
          text-align: center;
          color: #333333;
        }

        .title3 {
          color: #333333ff;
          font-weight: 400;
          font-size: 12px;
          text-align: center;
          margin-top: 15px;
        }
      }
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
      grid-template-columns: repeat(4, 280px);
      grid-gap: 25px;
      margin: 0 auto;
      margin-top: 60px;
      margin-bottom: 100px;
      cursor: pointer;

      img {
        transition: transform 0.5s ease;
      }

      img:hover {
        transform-origin: center;
        transform: scale(1.1);
      }
    }
  }




  @media (min-width:768px) {

    ::v-deep .el-carousel__container {
      //   height: 680px !important;
    }

    // ::v-deep .el-carousel__container:nth-last-child(1) {
    //   height: 100% !important;
    // }

    // ::v-deep .el-carousel:nth-last-child(1) {
    //   height: 100% !important;
    // }

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
        // height: 591.25px;
        border-radius: 10px 10px 10px 10px;
        background: #ffffffff;
        position: relative;
        align-items: center;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;

        .x {
          position: absolute;
          right: -33px;
          top: -93px;
          cursor: pointer;
        }
      }

    }

    .swiper {
      width: 100%;

      img {
        width: 100%
      }
    }

    //   服务案例
    .Solutions {
      text-align: center;
      letter-spacing: 0.05px;
      padding: 100px 0;

      .box1 {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;

        .left {
          .name {
            font-weight: 700;
            width: 144px;
            height: 36px;
            font-size: 36px;
            color: #155263;
            white-space: nowrap;
          }

          .line {
            width: 630px;
            height: 1px;
            background: #dfdede;
            margin-top: 30px;
            margin-bottom: 20px;
          }

          .inc {
            width: 630px;
            font-weight: 400;
            height: 184px;
            font-size: 18px;
            color: #333333;
            text-align: left;
            line-height: 30px;

          }

          .btn {
            width: 174px;
            height: 41px;
            border-radius: 20px 20px 20px 20px;
            border: 1px solid #184e6a;
            text-align: center;
            line-height: 41px;
            font-weight: 400;
            font-size: 16px;
            color: #396D84;
            margin-top: 20px;
          }
        }

        .right {
          position: relative;

          .bg {
            width: 215.94px;
            height: 421px;
            background: #155263ff;
            position: absolute;
            z-index: -1;
            right: -20px;
            top: -20px;
          }
        }
      }

      .box2 {
        width: 1200px;
        margin: 0 auto;
        margin-top: 50px;

        .text {
          font-weight: 700;
          width: 397px;
          height: 24px;
          font-size: 24px;
          text-align: left;
          color: #155263;
          white-space: nowrap;
        }

        .square {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 30px;

          .item {
            width: 202px;
            height: 184.28px;
            border-radius: 10px 10px 10px 10px;
            background: #ffffffff;
            box-shadow: 0 0 24px 0 #0e050a24;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            transition: all .5s;

            .wen {
              margin-top: 20px;
              color: #333333;
              font-size: 20.08px;
              font-weight: 400;
            }

            &:hover {
              transform-origin: center;
              transform: scale(1.1);
              cursor: pointer;
            }
          }
        }
      }
    }

    .sed {
      width: 100%;
      background: url('../static/img/bg.png') no-repeat center/cover;
      padding: 100px 0;

      .title {
        font-size: 30px;
        text-align: center;
        color: #FFFFFF;

      }

      .entitle {
        font-weight: 400;
        opacity: 0.8;
        font-size: 14px;
        text-align: center;
        color: #FFFFFF;
        margin-top: 10px;
      }

      .inc {
        width: 1200px;
        margin: 0 auto;
        font-weight: 400;
        font-size: 21px;
        text-align: center;
        color: #FFFFFF;
        margin-top: 20px;
      }

      .consultation {
        width: 1200px;
        margin: 0 auto;
        margin-top: 80px;

        .item1 {

          font-size: 20px;
          text-align: left;
          color: #FFFFFF;
          line-height: 30px;

          .incc {
            color: #fff;
            font-weight: 400;
            font-size: 16px;
            text-align: left;
            padding-left: 25px;
            box-sizing: border-box;
            line-height: 30px;
          }
        }
      }

      .kuan {
        width: 1200px;
        //   height: 440px;
        border-radius: 10px 10px 10px 10px;
        background: rgba(255, 255, 255, .18);
        margin: 0 auto;
        margin-top: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 25px;
        box-sizing: border-box;

        .nei {
          width: 1160px;
          // height: 400px;
          border-radius: 10px 10px 10px 10px;
          opacity: 0.9;
          background: #ffffffff;
          display: flex;
          flex-wrap: wrap;
          padding: 35px;

          .nei_item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex-basis: 25%;
            cursor: pointer;
            margin-top: 10px;

            img {

              transition: all .5s;

            }

            &:hover img {
              transform: scale(1.1);
            }

            .text1 {
              color: #155263ff;
              font-weight: 400;
              font-size: 18px;
              text-align: center;
              margin-top: 10px;
            }

            .text2 {
              color: #333333ff;
              font-weight: 400;
              font-size: 18px;
              text-align: center;
              margin-top: 5px;
            }
          }

          .nei_item:nth-child(4) {
            color: #fff;
          }
        }
      }
    }


    //   合作伙伴
    .partner {
      padding: 100px 0;

      .partner_item {
        width: 1200px;
        margin: 0 auto;
        text-align: center;

        .title1 {
          font-weight: 700;

          font-size: 30px;
          text-align: center;
          color: #333333;
        }

        .title2 {
          font-weight: 400;
          margin-top: 5px;
          opacity: 0.8;
          font-size: 14px;
          text-align: center;
          color: #333333;
        }

        .title3 {
          color: #333333ff;
          font-weight: 400;
          font-size: 21px;
          text-align: center;
          margin-top: 15px;
        }

        .title4 {
          color: #333333ff;
          font-weight: 700;
          font-size: 21px;
          text-align: center;
          margin-top: 15px;
        }

        .list {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          .list_item {
            width: 285px;
            height: 127px;

            border: 1px solid #ccc;
            margin-top: 20px;
            transition: all .5s;

            &:hover {
              transform-origin: center;
              transform: scale(1.1);
              cursor: pointer;
            }
          }
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 40px;
        }

        .pagination li {
          list-style: none;
          margin: 0 10px;
        }

        .pagination li a {
          display: block;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          text-align: center;
          line-height: 13px;
          color: #396D84;
          border: 2px solid #396D84;
          background-color: white;
          cursor: pointer;
        }

        .pagination .active {
          background-color: #396D84;
          color: white;
          cursor: not-allowed;
        }

      }
    }

    .news {
      padding: 100px 0;
      background: #f5f5f5;

      .news_item {
        width: 1200px;
        margin: 0 auto;



        .content {
          display: flex;
          justify-content: space-between;
          margin-top: 80px;

          .left {
            width: 352px;
            max-height: 583px;
            overflow-y: auto;
            border-radius: 9px 9px 9px 9px;
            background: #ffffffff;
            box-shadow: 0 1px 46px 0 #2828280d;

            .bao {

              border-bottom: 1px solid #BCBCBC;


              &:last-child {
                border-bottom: none;
              }

              .item_tab {
                width: 352px;
                font-weight: 700;
                font-size: 18px;
                box-sizing: border-box;
                line-height: 67px;
                cursor: pointer;
              }
            }


            .tab_item {
              width: 352px;
              height: 67px;
              background: #fff;
              display: flex;
              align-items: center;
              font-weight: 700;
              font-size: 16px;
              color: #797979;
              padding: 25px 20px;
              padding-left: 50px;
              box-sizing: border-box;
              border-bottom: 1px dashed #BCBCBC;
              cursor: pointer;

              &:last-child {
                border-bottom: none;
              }
            }

            .active {
              background: #396D84;
              color: #fff;
            }
          }

          .right {
            width: 769px;
            border-radius: 20px;
            overflow: hidden;
            position: relative;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }

        .text {
          position: absolute;
          bottom: 30px;
          left: 25px;
          font-size: 12px;

          .text1 {
            font-size: 18px;
            color: #fff;
          }

          .text2 {
            font-size: 22px;
            color: #fff;
            margin-top: 10px;
            letter-spacing: -0.02px;
          }
        }

        .title1 {
          font-weight: 700;
          font-size: 30px;
          text-align: center;
          color: #333333;
        }

        .title2 {
          font-weight: 400;
          margin-top: 5px;
          opacity: 0.8;
          font-size: 14px;
          text-align: center;
          color: #333333;
        }

        .title3 {
          color: #333333ff;
          font-weight: 400;
          font-size: 21px;
          text-align: center;
          margin-top: 15px;
        }
      }
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
      grid-template-columns: repeat(4, 280px);
      grid-gap: 25px;
      margin: 0 auto;
      margin-top: 60px;
      margin-bottom: 100px;
      cursor: pointer;

      img {
        transition: transform 0.5s ease;
      }

      img:hover {
        transform-origin: center;
        transform: scale(1.1);
      }
    }
  }

</style>
