<template>
  <div style="background:#F3F3F3;padding-bottom: 100px;">
    <!-- 弹窗 -->
    <div class="modal" v-if="isOpen">
      <div class="modal-overlay" @click="isOpen = false"></div>
      <div class="modal-content">
        <div class="mode">
          <img class="x" src="../static/img/x.png" alt="" @click="isOpen = false">
          <video style="width:100%;object-fit: cover" :src="model5.video" controls></video>
          <!-- <div class="rightsss" style="">
            <div style="font-size: 24px;color:#333;">{{ model5.title}}</div>
            <div style="font-size: 18px;color:#333;margin-top:19px;">性别：{{ sex == 1 ?'男' : '女' }} 年龄 {{ age }}
              地区：{{ address }} </div>
            <div v-html="model5.content" style="font-size: 16px;color:#666;color: #565656;margin-top:20px"></div>
          </div> -->
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
      <div class="nav_item">
        <no-ssr>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
            text-color="#666666" active-text-color="#155263">
            <el-menu-item index="0">{{ modeltitle.title }}</el-menu-item>
            <el-menu-item index="1">{{ modeltitle.introduction }}</el-menu-item>
            <el-menu-item index="2">{{ modeltitle.viceTitle }}</el-menu-item>
            <el-menu-item index="3">{{ modeltitle.viceIntroduction }}</el-menu-item>
          </el-menu>
        </no-ssr>
        <no-ssr>
          <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 18px;">
            <el-breadcrumb-item style="">首页</el-breadcrumb-item>
            <el-breadcrumb-item>关于我们</el-breadcrumb-item>
            <el-breadcrumb-item>{{ chooseTile }}</el-breadcrumb-item>
          </el-breadcrumb>
        </no-ssr>
      </div>
    </div>

    <div class="" v-if="activeIndex == 0">
      <div class="item1">
        <div class="box">
          <div class="ball-grid">
            <div class="ball" v-for="(item,index) in 238" :key="index"></div>
          </div>
          <div class="bg_text">ABOUT US</div>

          <div class="name">
            {{ model1.title }}
          </div>
          <div class="line">

          </div>
          <div class="synopsis">
            <div class="synopsis_left">
              <div class="top">
                <div class="title">广州市河马大健康科技有限公司</div>
                <div class="inc" v-html="model1.content">

                </div>
              </div>

              <div class="bottom">
                <div class="hold">{{ model1.introduction }} —</div>
                <div class="boxboxbox">
                  <div class="bottom_left">

                    <div v-for="(item,index) in array" :key="index" style="display:flex;align-items: center;"><img
                        :src="item.data2" alt="">{{ item.data1 }}</div>

                  </div>
                  <div class="bottom_right">
                    <img :src="model1.leftImg" style="" alt="">
                  </div>
                </div>
              </div>
            </div>
            <div class="synopsis_right">
              <img :src="model1.rightImg"
                style="width: 497px;height: 619px;border-radius: 20px 0 20px 0;background: #c9c4c1ff;">

            </div>
          </div>
        </div>
      </div>


      <div class="item2">
        <div class="box">
          <div class="name1">{{ model2.title }}</div>
          <div class="name2">{{ model2.viceTitle }}</div>
          <div class="name3" v-html="model2.content"></div>
          <div class="left_right">
            <div class="left">
              <img :src="model2.leftImg" alt="">
            </div>
            <div class="right">

              <div v-for="(item,index) in model2.viceIntroduction" :key="index"
                style="display:flex;align-items: baseline;position:relative;z-index: 1;">
                <img src="../static/img/start.png" style="" alt="">
                <div v-html="item"></div>
              </div>
              <div class="yanse"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="item3">
        <div class="box">
          <div class="title">{{ model3.title }}</div>
          <div class="lines"></div>
          <div class="concon">
            <div class="boxx1" v-for="(item,index) in model3.tagImages" :key="index"
              :style="{background:'url('+item.img+') no-repeat center/cover'}">
              <div style="text-align: center;">{{ item.title }}</div>
              <div class="line"></div>
              <!-- <div class="over" style="">{{ item.text }}
              </div> -->
              <div class="hover">
                <div>{{ item.title }}</div>
                <div class="line"></div>
                <div class="over" style="">
                  {{ item.text }}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="item2" style="padding-bottom: 0;background-color: #F4F4F4;" v-if="!isMobile">
        <div class="box">
          <div class="name1">{{ model4.title }}</div>
          <div class="name2">{{ model4.viceTitle }}</div>
        </div>
        <div class="bgbg" :style="{background:'url('+model4.img+') no-repeat center/cover'}">
          <div class="bg1">
            <div class="text1">
              {{ model4.mTitle }}
            </div>
            <div class="text2" v-html="content">

            </div>
          </div>
        </div>

      </div>
      <div class="item2" style="padding-bottom: 0;background-color: #F4F4F4;" v-if="isMobile">
        <div class="box">
          <div class="name1">{{ model4.title }}</div>
          <div class="name2">{{ model4.viceTitle }}</div>
        </div>
        <div class="bgbg" v-if="model4 != ''">
          <div class="bg1">
            <div class="text1">
              {{ model4.mTitle }}
            </div>
            <div class="text2" v-html="content">

            </div>
          </div>
          <img style="width:100%" :src="model4.thumb[0]" alt="">
        </div>

      </div>


      <div v-if="!isMobile">
        <diV class="item2_2" v-if="model4 !=''"
          :style="{background:'url('+model4.thumb[2]+') no-repeat right',backgroundColor:'#fff'}">
          <div class="itembox1" v-if="model4 !=''">
            <div>
              <div class="mode1">
                {{ model4.banner1[0].title }}
                <div>{{ model4.banner1[0].text }}</div>
              </div>
              <div class="mode2">
                {{ model4.banner1[2].title }}
                <div>{{ model4.banner1[2].text }}</div>
              </div>

            </div>

            <img class="img1" :src="model4.thumb[1]" alt="">
            <div>
              <div class="mode3">
                {{ model4.banner1[1].title }}
                <div>{{ model4.banner1[1].text }}</div>
              </div>
              <div class="mode4">
                {{ model4.banner1[3].title }}
                <div>{{ model4.banner1[3].text }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="item2_2" v-if="isMobile" style="background-color:#fff">
        <div class="itembox1" :style="{background:'url('+ model4.thumb[2]+') no-repeat bottom/contain'}"
          v-if="model4 !=''">
          <div>
            <div class="mode1">
              {{ model4.banner1[0].title }}
              <div>{{ model4.banner1[0].text }}</div>
            </div>
            <div class="mode2">
              {{ model4.banner1[2].title }}
              <div>{{ model4.banner1[2].text }}</div>
            </div>
          </div>

          <img class="img1" :src="model4.thumb[1]" alt="">
          <div>
            <div class="mode3">
              {{ model4.banner1[1].title }}
              <div>{{ model4.banner1[1].text }}</div>
            </div>
            <div class="mode4">
              {{ model4.banner1[3].title }}
              <div>{{ model4.banner1[3].text }}</div>
            </div>
          </div>
        </div>
        <!-- <div v-if="model4 != ''" style="position: relative;top: -15px;">
          <img style="width:100%;" :src="model4.thumb[2]" alt="">
        </div> -->
      </div>

      <div v-if="!isMobile">
        <!-- :style="{background:'url('+model4.thumb[3]+') no-repeat bottom',backgroundColor:'#fff'}" -->
        <div class="item3_3" style="background:#fff" v-if="model4 !=''"
          >
          <div class="left_item" v-if="model4 != '' ">
            <div>
              <div class="name"> {{ model4.banner2[0].title }}</div>
              <div class="line-with-circle"></div>
              <div class="text"> {{ model4.banner2[0].text }}</div>
            </div>
            <div class="">
              <div class="name1"> {{ model4.banner2[1].title }}</div>
              <div class="line-with-circle1"></div>
              <div class="text1"> {{ model4.banner2[1].text }}</div>
            </div>
          </div>
          <div style="flex:1">
            <img style="max-width:100%;" v-if="model4 != ''" :src="model4.thumb[3]" alt="">
          </div>
          <div class="right_item">
            <div class="">
              <div class="name" v-if="model4.banner2 != ''"> {{ model4.banner2[2].title }}</div>
              <div class="line-with-circle"></div>
              <div class="text" v-if="model4 != ''"> {{ model4.banner2[2].text }}</div>
            </div>
            <div class="">
              <div class="name" v-if="model4 != ''"> {{ model4.banner2[3].title }}</div>
              <div class="line-with-circle1"></div>
              <div class="text" v-if="model4 != ''"> {{ model4.banner2[3].text }}</div>
            </div>
            <div class="">
              <div class="name" v-if="model4 != ''"> {{ model4.banner2[4].title }}</div>
              <div class="line-with-circle2"></div>
              <div class="text" v-if="model4 != ''"> {{ model4.banner2[4].text }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="item3_3" v-if="isMobile">

        <div class="left_item">
          <div>
            <div class="name" v-if="model4 != ''"> {{ model4.banner2[0].title }}</div>
            <div class="line-with-circle"></div>
            <div class="text" v-if="model4 != ''"> {{ model4.banner2[0].text }}</div>
          </div>
          <div class="">
            <div class="name1" v-if="model4 != ''"> {{ model4.banner2[1].title }}</div>
            <div class="line-with-circle1"></div>
            <div class="text1" v-if="model4 != ''"> {{ model4.banner2[1].text }}</div>
          </div>
        </div>
        <div v-if="isMobile">
          <img style="width:100%;" v-if="model4 != ''" :src="model4.thumb[3]" alt="">
        </div>
        <div class="right_item">
          <div class="">
            <div class="name" v-if="model4 != ''"> {{ model4.banner2[2].title }}</div>
            <div class="line-with-circle"></div>
            <div class="text" v-if="model4 != ''"> {{ model4.banner2[2].text }}</div>
          </div>
          <div class="" v-if="model4 != '' ">
            <div class="name" v-if="model4 != ''"> {{ model4.banner2[3].title }}</div>
            <div class="line-with-circle1"></div>
            <div class="text" v-if="model4 != ''"> {{ model4.banner2[3].text }}</div>
          </div>
          <div class="" v-if="model4 != '' ">
            <div class="name" v-if="model4 != ''"> {{ model4.banner2[4].title }}</div>
            <div class="line-with-circle2"></div>
            <div class="text" v-if="model4 != ''"> {{ model4.banner2[4].text }}</div>
          </div>
        </div>

      </div>


      <div class="item4" id="item4">
        <div class="box">
          <div class="title">{{ model5.title }}</div>
          <div class="lines"></div>
          <div class="vdo">
            <img :src="model5.img" style="" alt="" @click="isOpen =true">
            <div class="wenzi">
              <div class="wenzi1">{{ model5.viceTitle }}</div>
              <div class="wenzi2"></div>
              <div class="wenzi3" v-html="model5.content">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>





  </div>
</template>

<script>
  export default {
    layout: "mod",
    name: "Aboutus",
    data() {
      return {
        nt: 0,

        activeIndex: "0",
        config: {},
        model1: [], // 模块1
        model2: [], //模块2
        model3: [], //模块3
        model4: [], //模块4
        model5: [], //模块5
        array: [],
        isOpen: false,
        modeltitle: '',
        chooseTile: '',
        content: '',
        hdgd: '710px', //轮播图高度
        isMobile: false

      };
    },
    mounted() {
      this.getData();
      this.getViewportWidth();
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['iphone', 'ipod', 'ipad', 'android', 'webos', 'blackberry', 'windows phone'];
      this.isMobile = mobileKeywords.some(keyword => userAgent.indexOf(keyword) > -1);
      let that = this
      window.onresize = function windowResize() {
        // 通过捕获系统的onresize事件触发我们需要执行的事件
        var w = window.innerWidth

        var h = 710
        if (w > 1180) {
          this.isMobile = false
        } else {
          this.isMobile = true
        }

        if (w < 767) {
          h = 200
        } else if (w > 1180 && w < 1921) {
          h = 680
        } else if (w > 1921 && w < 3841) {
          h = 0.33 * w
        } else if (w > 3841) {
          h = 0.22 * w
        } else if (w > 5759) {
          h = 0.11 * w
        } else {
          h = 0.22 * w
        }
        that.hdgd = h + 'px'
        console.log(h);
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
      textRach(textArea) {
        let text = textArea
          .replace(/<p>/g, '<p style="margin:0;">')
        return text
      },
      handleSelect(e) {
        console.log(e);
        const element = document.getElementById('item4');
        console.log(element);
        if (e == '0') {
          this.chooseTile = this.modeltitle.title
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else if (e == '1') {
          this.chooseTile = this.modeltitle.introduction
          window.scrollTo({
            top: 2000,
            behavior: "smooth",
          });
        } else if (e == '2') {
          this.chooseTile = this.modeltitle.viceTitle
          window.scrollTo({
            top: 3400,
            behavior: "smooth",
          });
        } else {
          this.chooseTile = this.modeltitle.viceIntroduction
          window.scrollTo({
            top: element.offsetTop,
            behavior: "smooth",
          });
        }
      },
      changeTab(index) {
        this.current = index


        if (index == 0) {
          if (this.map) {
            this.map.destroy();
          }

          this.getAbout()
        } else if (index == 1) {

          this.getContact()

        }
      },
      // 获取详情组件的值false 关闭详情
      handleData(data) {
        console.log(data);
        this.detail = data;
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      },
      async getData() {
        const data = await this.$indexApi.getAbout()
        console.log(data);
        if (data.status == 1) {
          this.config = data.row.config
          this.model1 = data.row.model1
          this.model1.content = this.textRach(this.model1.content)
          this.model2 = data.row.model2
          this.model3 = data.row.model3
          this.model4 = data.row.model4
          this.content = this.textRach(this.model4.content)
          this.model5 = data.row.model5
          this.model5.content = this.textRach(this.model5.content)
          this.modeltitle = data.row.modeltitle
          this.chooseTile = this.modeltitle.title
          this.array = this.model1.viceIntroduction.map((value, index) => {
            return {
              data1: value,
              data2: this.model1.thumb[index]
            }
          })
        }

      },
      //   获取
      async getContact() {
        const data = await this.$indexApi.getContact();
        this.ContactList = data.row;
        
        this.weidu = data.row.model2.map.split(",")[0]
        this.jingdu = data.row.model2.map.split(",")[1]
        if (this.map) {
          this.map.destroy();
        }
        //定义地图中心点坐标
        var center = new TMap.LatLng(this.weidu, this.jingdu)
        //定义map变量，调用 TMap.Map() 构造函数创建地图
        // *有个div的id为 container
        this.map = new TMap.Map(document.getElementById('map'), {
          center: center, //设置地图中心点坐标
          zoom: 17.2, //设置地图缩放级别
          pitch: 43.5, //设置俯仰角
          rotation: 45 //设置地图旋转角度
        });
        //   marker-layer
        new TMap.MultiMarker({
          id: "marker-layer",
          map: this.map,
          styles: {
            // 点标记样式
            marker: new TMap.MarkerStyle({
              width: 20, // 样式宽
              height: 30, // 样式高
              anchor: {
                x: 10,
                y: 30
              }, // 描点位置
            }),
          },
          geometries: [
            // 点标记数据数组
            {
              // 标记位置(纬度，经度，高度)
              position: center,
              id: "marker-layer",
            },
          ],
        });




      },

      goDetail(id) {
        this.id = id;
        this.detail = !this.detail;

      },
      //   获取新闻列表
      async getAbout() {
        const data = await this.$indexApi.getAbout();
        this.AboutList = data.row;
        this.seo = data.seo;
      },
    },
  };

</script>
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

      .rightsss {
        margin-top: 10px;
        // width:100px;
      }

      .mode {
        // width: 1199.25px;
        // height: 591.25px;
        border-radius: 10px 10px 10px 10px;
        background: #ffffffff;
        position: relative;
        flex-direction: column;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;

        video {
          width: 100%;
          object-fit: cover
        }

        .x {
          position: absolute;
          right: -10px;
          top: -63px;
          z-index: 99;
          cursor: pointer;
        }
      }

    }

    .swiper {
      width: 100%;
      margin-top: 65px;

      img {
        width: 100%;
        
      }
    }



    .nav {
      display: none;
      background: #fff;
      height: 100px;


    }


    .item1 {
      background: #F4FBFD;
      padding: 30px 0;
      position: relative;

      .box {
        //   width: 1200px;
        margin: 0 auto;


        .bg_text {
          font-weight: 500;
          //   width: 579px;
          height: 93px;
          opacity: 0.07;
          font-size: 60.66px;
          color: #333333;
          position: absolute;
          top: 105px;
          white-space: nowrap;
          left: 10px;
          z-index: 0;
        }

        .name {
          font-weight: 400;
          font-size: 24px;
          text-align: center;
          color: #333;

        }

        .line {
          width: 62px;
          height: 2px;
          background: #d87d14ff;
          margin: 0 auto;
          margin-top: 15px;
          margin-bottom: 18px;

        }

        .synopsis {
          display: flex;
          justify-content: space-between;
          padding: 0 20px;
          box-sizing: border-box;

          .synopsis_left {
            // width: 655px;

            .top {
              .title {
                font-weight: 700;
                font-size: 18px;
                text-align: left;
                color: #333333;
              }

              .inc {
                color: #535353ff;
                font-weight: 400;
                font-size: 12px;
                text-align: left;
                line-height: 20px;
                margin-top: 10px;
              }
            }

            .hold {
              color: #333333;
              font-size: 18px;
              font-weight: 700;
            }

            .bottom {
              .boxboxbox {
                display: flex;
                justify-content: space-between;
                // align-items: center;
              }

              margin-top: 20px;

              .bottom_left {
                font-weight: 300;
                font-size: 12px;
                text-align: left;
                color: #333333;
                line-height: 30px;
                display: flex;
                flex-direction: column;
                gap:4px;
                margin-top:10px;

                img {
                  width: 17px;
                  height: 17px;
                  margin-right: 5px;
                }
              }

              .bottom_right {
                display: flex;
                align-items: center;

                img {
                  width: 120px;
                }

                // width: 261px;
                // height: 219px;

              }
            }
          }

          .synopsis_right {
            display: none;
            width: 497px;
            height: 619px;
            border-radius: 20px 0 20px 0;
            background: #c9c4c1ff;
            overflow: hidden;
            position: relative;
          }
        }

        .ball-grid {

          display: none;
          flex-wrap: wrap;
          width: 143px;
          height: 189px;
          position: absolute;
          top: 188px;
          right: 309px;
          z-index: 0;

          .ball {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            margin: 2px;

            &:nth-child(odd) {
              background-color: #E2E8EB;
            }

            &:nth-child(even) {
              background-color: #93A6B5;
            }
          }
        }

      }
    }

    .item2 {
      background: #fff;
      padding: 30px 0px;
      box-sizing: border-box;

      .bgbg {
        position: relative;
        width: 100%;

        // &::after {
        //   content: '';
        //   display: block;
        //   padding-bottom: 100%;
        //   padding-top: 10%;
        // }

        .bg1 {
          //   position: absolute;
          //   width: 50%;
          //   right: 2%;
          font-size: 10px;
          padding: 0 20px;
          margin-top: 30px;

          //   top: 5%;
          // top:
          .text1 {
            font-weight: 700;
            font-size: 14px;
            // line-height: 32px;
            color: #333;
          }

          .text2 {
            font-weight: 400;
            font-size: 12px;
            // line-height: 34px;
            color: #474747;
            margin-top: 10px;

          }
        }
      }

      .box {
        // width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        box-sizing: border-box;

        .name1 {

          font-weight: 700;
          font-size: 18px;
          text-align: center;
          color: #333333;
        }

        .name2 {
          font-weight: 400;
          opacity: 0.8;
          font-size: 10px;
          color: #333333;
          margin-top: 10px;
          text-align: center;
          word-break: break-all;
        }

        .name3 {
          font-weight: 400;
          //   width: 1148px;
          height: 22px;
          font-size: 12px;
          text-align: left;
          color: #333333;
          margin-top: 31px;
        }

        .left_right {

          align-items: center;
          margin-top: 15px;

          .left {
            width: 100%;

            img {
              width: 100%;
            }
          }

          .right {
            // width: 495px;
            font-weight: 400;
            font-size: 12px;
            text-align: left;
            color: #000000;
            line-height: 20px;
            background: #F4F6F8;
            position: relative;

            img {
              width: 15px;
            }

            .yanse {
              width: 100%;
              background: #F4FFF8;
              //   width: 700px;
              height: 100%;
              position: absolute;
              top: -20px;
              left: -20px;
              padding: 20px;
              z-index: 0;
            }
          }

        }
      }
    }

    .item2:nth-child(1) {
      //   display: none;
      padding: 50px 20px;
    }


    .item2_2 {
      //   display: none;
      padding: 30px 0;

      .itembox1 {
        // width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        padding-bottom: 150px;

        .mode1 {
          width: 95px;
          margin-top: 0px;
          font-weight: 700;
          font-size: 14px;
          text-align: right;

          div {
            font-weight: 400;
            font-size: 12px;
            color: #666;
            margin-top: 12px;
          }
        }

        .mode2 {
          width: 95px;
          margin-top: 60px;
          font-weight: 700;
          font-size: 14px;
          text-align: right;

          div {
            font-weight: 400;
            font-size: 12px;
            color: #666;
            margin-top: 12px;
          }
        }

        .mode3 {
          width: 95px;
          margin-top: 0px;
          font-weight: 700;
          font-size: 14px;
          text-align: left;

          div {
            font-weight: 400;
            font-size: 12px;
            color: #666;
            margin-top: 12px;
          }
        }

        .mode4 {
          width: 95px;
          margin-top: 30px;
          font-weight: 700;
          font-size: 14px;
          text-align: left;

          div {
            font-weight: 400;
            font-size: 12px;
            color: #666;
            margin-top: 12px;
          }
        }

        .img1 {
          width: 45%;
          height: 20%;
        }
      }

    }

    .item3_3 {
      box-sizing: border-box;
      display: flex;
      background-color: transparent;
      justify-content: space-between;
      background-color: #fff;
      padding-bottom: 20px;

      .left_item {
        // width: 20%;
        // margin-top: 30px;

        .name {
          font-size: 10px;
          color: #333;
          text-align: right;
          font-weight: 400;
          margin-top: 20%;
          //   margin-right: 20px;
          padding-right: 12%;
        }

        .name1 {
          font-size: 10px;
          color: #333;
          text-align: right;
          font-weight: 400;
          margin-top: 20%;
          //   margin-right: 20px;
          padding-right: 12%;

        }

        .text1 {
          font-weight: 400;
          font-size: 8px;
          color: #666;
          text-align: right;
          //   margin-top: 20px;
          //   margin-right: 20px;
          padding-right: 12%;
        }

        .text {
          font-weight: 400;
          font-size: 8px;
          color: #666;
          text-align: right;
          //   margin-right: 20px;
          padding-right: 12%;
        }

        .line-with-circle {
          position: relative;
          display: inline-block;
          padding-left: 30vw;
          margin-top: 5%;
          margin-bottom: 5%;

          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            width: 30vw;
            height: 1px;
            background-color: #2778BE;
            transform: translateY(-50%);
          }

          &::after {
            content: '';
            position: absolute;
            top: 50%;
            right: 0px;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: #2778BE;
            transform: translateY(-50%);
          }
        }

        .line-with-circle1 {
          position: relative;
          display: inline-block;
          padding-left: 30vw;
          margin-top: 5%;
          margin-bottom: 5%;

          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            width: 30vw;
            height: 1px;
            background-color: #80BE5A;
            transform: translateY(-50%);
          }

          &::after {
            content: '';
            position: absolute;
            top: 50%;
            right: 0px;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: #80BE5A;
            transform: translateY(-50%);
          }
        }
      }

      .mid_item {

        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: -1;
      }

      .right_item {
        // width: 20%;
        position: relative;
        top:-10px;

        .name {
          font-size: 10px;
          color: #333;

          font-weight: 400;
          margin-top: 10%;
          padding-left: 12%;
          //   margin-left: 40px;
        }

        .text {
          font-weight: 400;
          font-size: 8px;
          color: #666;
          padding-left: 12%;
          //   margin-left: 40px;
        }

        .line-with-circle {
          position: relative;
          display: inline-block;
          padding-left: 30vw;
          margin-top: 5%;
          margin-bottom: 5%;

          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            width: 30vw;
            height: 1px;
            background-color: #2BA2CD;
            transform: translateY(-50%);
          }

          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 0px;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: #2BA2CD;
            transform: translateY(-50%);
          }
        }

        .line-with-circle1 {
          position: relative;
          display: inline-block;
          padding-left: 30vw;
          margin-top: 5%;
          margin-bottom: 5%;

          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            width: 30vw;
            height: 1px;
            background-color: #22B6B1;
            transform: translateY(-50%);
          }

          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 0px;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: #22B6B1;
            transform: translateY(-50%);
          }
        }

        .line-with-circle2 {
          position: relative;
          display: inline-block;
          padding-left: 30vw;
          margin-top: 5%;
          margin-bottom: 5%;

          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            width: 30vw;
            height: 1px;
            background-color: #FF7800;
            transform: translateY(-50%);
          }

          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 0px;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: #FF7800;
            transform: translateY(-50%);
          }
        }
      }
    }

    .item3 {
      padding: 20px 0.3333vmin;
      background: #184E6A;
      box-sizing: border-box;

      .box {
        .title {
          font-weight: 700;
          font-size: 24px;
          text-align: center;
          color: #FFFFFF;
          margin-top: 10px;
        }

        .lines {
          width: 62.03px;
          height: 2px;
          background: #d87d14ff;
          margin: 0 auto;
          margin-top: 15px;
          margin-bottom: 40px;
        }

        .concon {
          display: flex;
          color: #fff;
          flex-wrap: wrap;
          padding: 0 1.333vmin;
          align-items: center;
          justify-content: center;

          .line {
            width: 28px;
            height: 3px;
            background: #fff;
            margin-top: 11px;
            margin-bottom: 11px
          }

          .boxx1 {
            // width: 300px;
            width: 47%;
            height: 158px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            position: relative;
            box-sizing: border-box;
            padding: 0 0.333vmin;

            .hover {
              position: absolute;
              opacity: 0;
              transition: all .5s;
              display: flex;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;

              .line {
                margin: 5px 0;
              }

              .over {
                font-size: 12px;
                max-height: 97px;
                padding: 0 2.333vmin;
                padding-left: 3.444vmin;
                overflow-y: auto;
                box-sizing: border-box;
              }
            }

            &:hover .hover {
              cursor: pointer;
              width: 100%;
              height: 158px;
              opacity: 0.9;
              background: rgb(21, 82, 99, 0.9);
            }
          }

          //   .boxx1:nth-child(even){
          //     margin-left:1.888vmin;
          //   }


          .boxx2 {
            // width: 300px;
            height: 289px;
            background: #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }

          .boxx3 {
            // width: 300px;
            height: 289px;
            background: #ccc;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }

          .boxx4 {
            // width: 300px;
            height: 289px;
            background: #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

          }
        }
      }
    }

    .item4 {
      padding: 0 20px;
      padding-top: 50px;


      box-sizing: border-box;
      background: #F5F5F5;

      .box {
        // width: 1200px;
        margin: 0 auto;

        .title {
          font-weight: 700;
          font-size: 24px;
          text-align: center;
          // color: #FFFFFF;
        }

        .lines {
          width: 62.03px;
          height: 2px;
          background: #d87d14ff;
          margin: 0 auto;
          margin-top: 15px;
          margin-bottom: 25px;
        }

        .vdo {
          border-radius: 9px 9px 9px 9px;
          background: #ffffffff;
          box-shadow: 0 0 38px 0 #0000000f;
          padding: 10px;
          box-sizing: border-box;

          img {
            width: 100% // height: 200px;
          }

          .wenzi {
            .wenzi1 {
              font-size: 18px;
              font-weight: 700;
              margin-top: 10px;
            }

            .wenzi2 {
              background: #184e6aff;
              border-radius: 1.5px;
              width: 49px;
              margin-top: 14px;
              height: 3px;
            }

            .wenzi3 {
              font-size: 12px;
              font-weight: 400;
              color: #535353;
              line-height: 20px;
              margin-top: 10px;
            }
          }

        }
      }
    }

  }

  @media (min-width:768px) {
    ::v-deep .el-carousel__container {
      //   height: 710px !important;
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

        video {
          width: 687px;
          object-fit: cover
        }

        .rightsss {
          margin-left: 51px;
          // width:100px;
        }

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
        width: 100%;
        height: 680px;
      }
    }

    .el-menu-item {
      padding-left: 35px;
      padding-right: 35px;

      font-size: 24px;
      height: 100px;
      line-height: 100px;
    }

    .nav {
      background: #fff;
      height: 100px;

      .nav_item {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }

    .item2_2 {


      //   background: url('../static/img/about2.jpg') no-repeat right;
      //   background-color: #fff;
      padding: 100px 0;

      .itembox1 {
        width: 1200px;
        margin: 0 auto;
        display: flex;

        .mode1 {
          width: 230px;
          margin-top: 30px;
          font-weight: 700;
          font-size: 20px;
          text-align: right;

          div {
            font-weight: 400;
            font-size: 16px;
            color: #666;
            margin-top: 12px;
          }
        }

        .mode2 {
          width: 230px;
          margin-top: 170px;
          font-weight: 700;
          font-size: 20px;
          text-align: right;

          div {
            font-weight: 400;
            font-size: 16px;
            color: #666;
            margin-top: 12px;
          }
        }

        .mode3 {
          width: 288px;
          margin-top: 30px;
          font-weight: 700;
          font-size: 20px;
          text-align: left;

          div {
            font-weight: 400;
            font-size: 16px;
            color: #666;
            margin-top: 12px;
          }
        }

        .mode4 {
          width: 384px;
          margin-top: 170px;
          font-weight: 700;
          font-size: 20px;
          text-align: left;

          div {
            font-weight: 400;
            font-size: 16px;
            color: #666;
            margin-top: 12px;
          }
        }

        .img1 {
          margin-left: 5px;
        }
      }
    }

    .item3_3 {
      padding: 100px 30px;
      box-sizing: border-box;
      //   background-color: #fff;
      //   position: absolute;
      //   top: 59.5%;
      display: flex;
      //   background: url('../static/img/about3.jpg') no-repeat bottom;
      background-color: transparent;
      justify-content: space-between;
      //   position: absolute;

      .left_item {
        width: 30%;
        // flex:0.33;

        .name {
          font-size: 22px;
          color: #333;
          text-align: right;
          font-weight: 400;
          margin-top: 20%;
          padding-right: 2%;
          //   margin-right: 8%;
        }

        .name1 {
          font-size: 22px;
          color: #333;
          text-align: right;
          font-weight: 400;
          margin-top: 40%;
          padding-right: 2%;
          //   margin-right: 8%;

        }

        .text1 {
          font-weight: 400;
          font-size: 16px;
          line-height: 30px;
          width: 30%;
          color: #666;
          float: right;
          text-align: right;
          padding-right: 2%;
          //   margin-right: 8%;
        }

        .text {
          font-weight: 400;
          font-size: 16px;
          line-height: 30px;
          width: 30%;
          color: #666;
          float: right;
          text-align: right;
          padding-right: 2%;
          //   margin-right: 8%;
        }

        .line-with-circle {
          position: relative;
          display: inline-block;
          padding-left: 30vw;
          margin-top: 5%;
          margin-bottom: 5%;

          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            width: 30vw;
            height: 1px;
            background-color: #2778BE;
            transform: translateY(-50%);
          }

          &::after {
            content: '';
            position: absolute;
            top: 50%;
            right: 0px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: #2778BE;
            transform: translateY(-50%);
          }
        }

        .line-with-circle1 {
          position: relative;
          display: inline-block;
          padding-left: 30vw;
          margin-bottom: 5%;
          margin-top: 5%;

          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            width: 30vw;
            height: 1px;
            background-color: #80BE5A;
            transform: translateY(-50%);
          }

          &::after {
            content: '';
            position: absolute;
            top: 50%;
            right: 0px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: #80BE5A;
            transform: translateY(-50%);
          }
        }
      }

      .mid_item {

        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: -1;
      }

      .right_item {
        width: 30%;
        // flex:0.33;

        .name {
          font-size: 22px;
          color: #333;

          font-weight: 400;
          margin-top: 10%;

          padding-left: 6%;
        }

        .text {
          font-weight: 400;
          font-size: 16px;
          line-height: 30px;
          width: 40%;
          color: #666;
          padding-left: 6%;
        }

        .line-with-circle {
          position: relative;
          display: inline-block;
          padding-left: 30vw;
          margin-top: 5%;
          margin-bottom: 5%;

          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            width: 30vw;
            height: 1px;
            background-color: #2BA2CD;
            transform: translateY(-50%);
          }

          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 0px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: #2BA2CD;
            transform: translateY(-50%);
          }
        }

        .line-with-circle1 {
          position: relative;
          display: inline-block;
          padding-left: 30vw;
          margin-top: 5%;
          margin-bottom: 5%;

          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            width: 30vw;
            height: 1px;
            background-color: #22B6B1;
            transform: translateY(-50%);
          }

          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 0px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: #22B6B1;
            transform: translateY(-50%);
          }
        }

        .line-with-circle2 {
          position: relative;
          display: inline-block;
          padding-left: 30vw;
          margin-top: 5%;
          margin-bottom: 5%;

          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            width: 30vw;
            height: 1px;
            background-color: #FF7800;
            transform: translateY(-50%);
          }

          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 0px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background-color: #FF7800;
            transform: translateY(-50%);
          }
        }
      }
    }

    .item1 {
      background: #F4FBFD;
      padding: 100px 0;
      position: relative;

      .box {
        width: 1200px;
        margin: 0 auto;


        .bg_text {
          font-weight: 500;
          width: 579px;
          height: 93px;
          opacity: 0.07;
          font-size: 117.66px;
          color: #333333;
          position: absolute;
          top: 105px;
          white-space: nowrap;
          left: 10px;
          z-index: 0;
        }

        .name {
          font-weight: 400;
          width: 192px;
          height: 31px;
          font-size: 32px;
          text-align: left;
          color: #333;
          margin-top: 61px;
        }

        .line {
          width: 62px;
          height: 2px;
          background: #d87d14ff;
          margin-top: 27px;
          margin-bottom: 27px;

        }

        .synopsis {
          display: flex;
          justify-content: space-between;

          .synopsis_left {
            width: 655px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .top {
              .title {
                font-weight: 700;
                font-size: 22px;
                text-align: left;
                color: #333333;


              }

              .inc {
                color: #535353ff;
                font-weight: 400;
                font-size: 16px;
                text-align: left;
                line-height: 32px;
                
              }
            }

            .hold {
              color: #333333;
              font-size: 22px;
              font-weight: 700;
              margin-bottom: 20px;
            }

            .bottom {

              //   margin-top: 42px;
              .boxboxbox {
                display: flex;
                justify-content: space-between;
                // align-items: center;
              }

              .bottom_left {
                font-weight: 300;
                font-size: 20px;
                text-align: left;
                color: #333333;
                line-height: 55px;
                display: flex;
                flex-direction: column;
                gap:15px;

                img {
                  width: 28px;
                  height: 28px;
                  margin-right: 10px;
                }
              }

              .bottom_right {
                width: 250px;
                height: 210px;

                img {
                  width: 100%;
                  height: 100%;
                }

              }
            }
          }

          .synopsis_right {
            width: 497px;
            height: 619px;
            border-radius: 20px 0 20px 0;
            background: #c9c4c1ff;
            overflow: hidden;
            position: relative;
          }
        }

        .ball-grid {
          display: flex;
          flex-wrap: wrap;
          width: 143px;
          height: 189px;
          position: absolute;
          top: 188px;
          right: 309px;
          z-index: 0;

          .ball {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            margin: 2px;

            &:nth-child(odd) {
              background-color: #E2E8EB;
            }

            &:nth-child(even) {
              background-color: #93A6B5;
            }
          }
        }

      }
    }

    .item2 {
      padding: 100px 0;
      background: #fff;

      .bgbg {
        position: relative;
        width: 100%;
        // padding-bottom: 47%;
        // padding-top: 30%;

        &::after {
          content: '';
          display: block;
          padding-top: 30%;
        }



        .bg1 {
          position: absolute;
          width: 25%;
          left: 55%;
          top: 25%;



          .text1 {
            font-weight: 700;
            font-size: 21px;
            line-height: 32px;
            color: #333;
          }

          .text2 {
            font-weight: 400;
            font-size: 18px;
            line-height: 34px;
            color: #474747;
            margin-top: 20px;

          }

          // top:
        }


      }

      .box {
        width: 1200px;
        margin: 0 auto;

        .name1 {

          font-weight: 700;
          font-size: 32px;
          text-align: center;
          color: #333333;
        }

        .name2 {
          font-weight: 400;
          opacity: 0.8;
          font-size: 14px;
          color: #333333;
          margin-top: 17px;
          text-align: center;
        }

        .name3 {
          font-weight: 400;
          width: 1148px;
          height: 22px;
          font-size: 21px;
          text-align: center;
          color: #333333;
          margin-top: 31px;
          white-space: nowrap;

        }

        .left_right {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 133px;

          .left {
            width: 554px;
            height: 326px;

            img {
              width: 554px;
              height: 329px
            }
          }

          .right {
            width: 495px;
            font-weight: 400;
            font-size: 16px;
            text-align: left;
            color: #000000;
            line-height: 30px;
            background: #F4F6F8;
            position: relative;

            img {
              width: 19px;
              height: 19px;
              margin-right: 5px;
            }

            .yanse {
              background: #F4FFF8;
              width: 700px;
              height: 100%;
              position: absolute;
              top: -20px;
              left: -20px;
              padding: 20px;
              z-index: 0;
            }
          }

        }
      }
    }


    .item3 {
      padding: 100px 0;
      background: #184E6A;

      .box {
        width: 1200px;
        margin: 0 auto;

        .title {
          font-weight: 700;
          font-size: 32px;
          text-align: center;
          color: #FFFFFF;
        }

        .lines {
          width: 62.03px;
          height: 2px;
          background: #d87d14ff;
          margin: 0 auto;
          margin-top: 30px;
          margin-bottom: 40px;
        }

        .concon {
          display: flex;
          color: #fff;

          .line {
            width: 28px;
            height: 3px;
            background: #fff;
            margin-top: 11px;
            margin-bottom: 11px
          }

          .boxx1 {
            width: 300px;
            height: 289px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            position: relative;

            .over {
              font-size: 14px;
              font-weight: 400;
              width: 239px;
              line-height: 30px;
              position: relative;
              max-height: 204px;




              padding: 0 1.333vmin;
              overflow-y: auto;

              text-align: left;
            }

            .hover {
              position: absolute;
              opacity: 0;
              transition: all .5s;
              display: flex;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;

            }

            &:hover .hover {
              cursor: pointer;
              width: 300px;
              height: 289px;
              opacity: 0.9;
              background: rgb(21, 82, 99, 0.9);
            }
          }


          .boxx2 {
            width: 300px;
            height: 289px;
            background: #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }

          .boxx3 {
            width: 300px;
            height: 289px;
            background: #ccc;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }

          .boxx4 {
            width: 300px;
            height: 289px;
            background: #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

          }
        }
      }
    }

    .item4 {
      padding: 100px 0;
      background: #F5F5F5;

      .box {
        width: 1200px;
        margin: 0 auto;

        .title {
          font-weight: 700;
          font-size: 32px;
          text-align: center;
          // color: #FFFFFF;
        }

        .lines {
          width: 62.03px;
          height: 2px;
          background: #d87d14ff;
          margin: 0 auto;
          margin-top: 30px;
          margin-bottom: 50px;
        }

        .vdo {
          width: 1200px;
          // height: 484px;
          border-radius: 9px 9px 9px 9px;
          background: #ffffffff;
          box-shadow: 0 0 38px 0 #0000000f;
          padding: 35px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;

          img {
            width: 668px;
            height: 417px;
          }

          .wenzi {
            display: flex;
            flex-direction: column;
            margin-left: 40px;

            .wenzi1 {
              font-size: 24px;
              font-weight: 700;
            }

            .wenzi2 {
              background: #184e6aff;
              border-radius: 1.5px;
              width: 49px;
              margin-top: 14px;
              height: 3px;
            }

            .wenzi3 {
              font-size: 16px;
              font-weight: 400;
              color: #535353;
              line-height: 30px;
              margin-top: 33px;
            }
          }


        }
      }
    }

  }

  @media (min-width:1200px)and (max-width:1399px) {
    .bg2 {
      position: absolute;
      //   width: 32%;
      left: 16.5%;
      top: 38%;
      display: flex;
      justify-content: space-between;



      .text1 {
        display: flex;
        flex-direction: column;
        text-align: right;

        .mode1 {
          //   width: 80%;
          font-weight: 700;
          font-size: 20px;

          div {
            font-weight: 400;
            font-size: 16px;
            color: #666;
            margin-top: 12px;
            width: 230px;
          }
        }

        .mode2 {
          //   width: 80%;
          // margin-top:50%;
          font-weight: 700;
          font-size: 20px;
          margin-top: 150px;

          div {
            font-weight: 400;
            font-size: 16px;
            color: #666;
            margin-top: 12px;
            width: 230px;
          }
        }

      }

      .text2 {
        display: flex;
        flex-direction: column;
        margin-left: 81%;

        .mode1 {
          //   width: 80%;
          font-weight: 700;
          font-size: 20px;

          div {
            font-weight: 400;
            font-size: 16px;
            color: #666;
            margin-top: 12px;
            width: 288px;
          }
        }

        .mode2 {
          //   width: 80%;
          // margin-top:50%;
          font-weight: 700;
          font-size: 20px;
          margin-top: 150px;

          div {
            font-weight: 400;
            font-size: 16px;
            color: #666;
            margin-top: 12px;
            width: 288px;
          }
        }



      }
    }
  }


  @media (min-width:1400px)and (max-width:1699.45px) {
    .bg2 {
      position: absolute;
      //   width: 32%;
      left: 18.5%;
      top: 38%;
      display: flex;
      justify-content: space-between;



      .text1 {
        display: flex;
        flex-direction: column;
        text-align: right;

        .mode1 {
          //   width: 80%;
          font-weight: 700;
          font-size: 20px;

          div {
            font-weight: 400;
            font-size: 16px;
            color: #666;
            margin-top: 12px;
            width: 230px;
          }
        }

        .mode2 {
          //   width: 80%;
          // margin-top:50%;
          font-weight: 700;
          font-size: 20px;
          margin-top: 150px;

          div {
            font-weight: 400;
            font-size: 16px;
            color: #666;
            margin-top: 12px;
            width: 230px;
          }
        }

      }

      .text2 {
        display: flex;
        flex-direction: column;
        margin-left: 81%;

        .mode1 {
          //   width: 80%;
          font-weight: 700;
          font-size: 20px;

          div {
            font-weight: 400;
            font-size: 16px;
            color: #666;
            margin-top: 12px;
            width: 288px;
          }
        }

        .mode2 {
          //   width: 80%;
          // margin-top:50%;
          font-weight: 700;
          font-size: 20px;
          margin-top: 150px;

          div {
            font-weight: 400;
            font-size: 16px;
            color: #666;
            margin-top: 12px;
            width: 288px;
          }
        }



      }
    }
  }

  @media (min-width:1700.55px) and (max-width:2560px) {
    .bg2 {
      position: absolute;
      //   width: 32%;
      left: 20.5%;
      top: 38%;
      display: flex;
      justify-content: space-between;



      .text1 {
        display: flex;
        flex-direction: column;
        text-align: right;

        .mode1 {
          //   width: 80%;
          font-weight: 700;
          font-size: 20px;

          div {
            font-weight: 400;
            font-size: 16px;
            color: #666;
            margin-top: 12px;
            width: 230px;
          }
        }

        .mode2 {
          //   width: 80%;
          // margin-top:50%;
          font-weight: 700;
          font-size: 20px;
          margin-top: 150px;

          div {
            font-weight: 400;
            font-size: 16px;
            color: #666;
            margin-top: 12px;
            width: 230px;
          }
        }

      }

      .text2 {
        display: flex;
        flex-direction: column;
        margin-left: 81%;

        .mode1 {
          //   width: 80%;
          font-weight: 700;
          font-size: 20px;

          div {
            font-weight: 400;
            font-size: 16px;
            color: #666;
            margin-top: 12px;
            width: 288px;
          }
        }

        .mode2 {
          //   width: 80%;
          // margin-top:50%;
          font-weight: 700;
          font-size: 20px;
          margin-top: 150px;

          div {
            font-weight: 400;
            font-size: 16px;
            color: #666;
            margin-top: 12px;
            width: 288px;
          }
        }



      }
    }
  }

  //   @media (max-width:1919px) and (min-width:1700px) {
  //     .bg2 {
  //       position: absolute;
  //       //   width: 32%;
  //       left: 19%;
  //       top: 39%;
  //       display: flex;
  //       justify-content: space-between;

  //       .text1 {
  //         display: flex;
  //         flex-direction: column;
  //         text-align: right;

  //         .mode1 {
  //           width: 80%;
  //           font-weight: 700;
  //           font-size: 20px;

  //           div {
  //             font-weight: 400;
  //             font-size: 16px;
  //             color: #666;
  //             margin-top: 12px;

  //           }
  //         }

  //         .mode2 {
  //           width: 80%;
  //           // margin-top:50%;
  //           font-weight: 700;
  //           font-size: 20px;
  //           margin-top: 66%;

  //           div {
  //             font-weight: 400;
  //             font-size: 16px;
  //             color: #666;
  //             margin-top: 12px;

  //           }
  //         }

  //       }

  //       .text2 {
  //         display: flex;
  //         flex-direction: column;
  //         margin-left: 28%;

  //         .mode1 {
  //           width: 80%;
  //           font-weight: 700;
  //           font-size: 20px;

  //           div {
  //             font-weight: 400;
  //             font-size: 16px;
  //             color: #666;
  //             margin-top: 12px;
  //           }
  //         }

  //         .mode2 {
  //           width: 80%;
  //           // margin-top:50%;
  //           font-weight: 700;
  //           font-size: 20px;
  //           margin-top: 33%;

  //           div {
  //             font-weight: 400;
  //             font-size: 16px;
  //             color: #666;
  //             margin-top: 12px;
  //           }
  //         }



  //       }
  //     }
  //   }

</style>
