<template>
  <div>
    <div class="footer">
      <div class="black" :style="{background:'url('+data.system.buttomimg+') no-repeat center/cover'}">
        <div class="box">
          <div>
            <img src="../static/img/foote_logo.png" style="width:273px;height:50px;">
          </div>
          <div class="inc">
            立足互联网医疗+慢病管理事业，弘扬中医药文化，打造有良心、有爱心、有责任心、有进取心、有荣辱心的中医服务团队！
            帮助全球耳病患者“用好药”→“少用药”→“不用药”，为人类的健康幸福做贡献。

          </div>
          <div class="btn" @click="alert">
            联系我们 >>
          </div>
        </div>
      </div>
      <div class="light" v-if="data != ''">
        <div class="box2">
          <div class="imgs">
            <img :src="data.system.qrcode" style="" alt="">
            <div class="text">公众号</div>
          </div>
          <div>
            <div class="navs">
                <nuxt-link v-for="(item,index) in data.navbar" :key="index" @click.native="show = !show" class="nav"
            :to="item.url">{{ item.name }}
            <!-- <div class="sun" >
              <div class="sunbox"  v-for="(items,indexs) in item.child" :key="indexs" @click="open(items.url)">
                <a href="javascript:void(0);">
                {{ items.name }}</a>
              </div>
            </div> -->
          </nuxt-link>
              <!-- <nuxt-link class="nav" to="/">首页</nuxt-link>
              <nuxt-link class="nav" to="/aboutus">关于我们</nuxt-link>
              <nuxt-link class="nav" to="/services">服务案例</nuxt-link>
              <nuxt-link class="nav" to="/health">河马大健康</nuxt-link>
              <nuxt-link class="nav" to="/joinme">加入我们</nuxt-link>
              <nuxt-link class="nav" to="/contact">联系我们</nuxt-link> -->
            </div>
            <div class="address">
              <div class="item">
                <div class="" style="white-space: nowrap;">公司地址：</div>
                <div style="display:flex;align-items: center;margin-top:5px">
                  <img src="../static/img/address.png" alt=""><span>{{ data.system.company_address }}</span>
                </div>
              </div>
              <div class="item">
                <div class="">联系方式：</div>
                <div style="display:flex;align-items: center;margin-top:5px">
                  <img src="../static/img/telephone.png" alt=""><span>服务热线：{{ data.system.contact_number }}</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="green">
        {{ data.system.copyright }} <a style="color: inherit;text-decoration: none;" href="https://beian.miit.gov.cn"
          target="_blank">备案号：{{ data.system.record_no }}</a>

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Footer",
    data() {
      return {
        collocations: []
      }
    },
    props: {
      data: {
        tpye: Object,
        required: true
      }
    },
    mounted() {
      //   this.collocation()
    },
    methods: {
      alert() {
        let msg = this.data
        alert(`河马健康服务热线：\n`+ msg.system.contact_number)
      },
     
    }
  };

</script>

<style lang="scss">
  @media (max-width:767px) {
    .footer {
      width: 100%;
    //   height: 50+185px;
      // background: #363636;

      .black {
        width: 100%;
        // min-height: 285px;
        padding: 20px 0px;
        justify-content: space-around;
        align-content: center;
        box-sizing: border-box;
        margin: 0 auto;

        .box {
          margin: 0 auto;
          padding: 0 20px;
          box-sizing: border-box;
        }

        .inc {

          color: #666666ff;
          font-weight: 400;
          font-size: 12px;
          line-height: 20px;
          margin-top: 18px;
          text-align: left;
        }

        .btn {
          width: 151px;
          height: 31px;
          border-radius: 20px 20px 20px 20px;
          border: 1px solid #184E6A;
          text-align: center;
          line-height: 31px;
          font-weight: 400;
          font-size: 12px;
          color: #184E6A;
          margin: 0 auto;
          margin-top: 27px;
          cursor: pointer;
          &:hover{
            color: #fff;
            background: #184E6A;
          }
        }



      }

      .light {
        width: 100%;

        padding: 30px 0;

        .box2 {
          // width: 1200px;
          margin: 0 auto;

          // display: flex;
          // justify-content: space-between;
          // align-items: center;
          .imgs {
            margin: 0 auto;
            width: 100px;
            img{
                width:100px;height:100px;
            }
            .text{
                text-align: center;font-size: 16px;color:#666
            }
          }

          .navs {
            border-bottom: 1px solid #666;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            margin-top: 20px;
            padding: 0 20px;
            box-sizing: border-box;

            .nav {
              line-height: 60px;
              text-align: left;
              color: #666666;
              text-decoration: none;
              font-size: 16px;

              &:hover {
                color: #184F6A;
              }
            }
          }

          .address {
            display: flex;
            flex-direction: column;
            margin-top: 20px;
            padding: 0 20px;
            box-sizing: border-box;

            .item {
              color: #666666;
              font-weight: 700;
              font-size: 14px;
              text-align: center;
              line-height: 30px;
              //   display: flex;
              //   align-items: center;

              span {
                margin-left: 10px;
                font-size: 14px;
                font-weight: 400;
              }
            }

          }
        }
      }

      .right {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .text {
          font-weight: 400;
          font-size: 12px;
          line-height: 25px;
          text-align: center;
          color: #fff;

        }
      }
    }




    .footer {
      width: 100%;
      height: 50px;
      background: #184F6A;
      box-sizing: border-box;
      text-align: center;
      font-weight: 400;
      font-size: 14px;
    //   line-height: 50px;
      color: #fff;
    }

    .green {
      width: 100%;
      //   height: 50px;
      background: #184F6A;
      box-sizing: border-box;
      text-align: center;
      font-weight: 400;
      font-size: 14px;
      line-height: 50px;
      color: #fff;
      display: flex;
      flex-direction: column;
    }


  }


  @media (min-width:768px) {
    .footer {
      width: 100%;
      height: 50+185px;
      // background: #363636;

      .black {
        width: 100%;
        min-height: 285px;
        padding: 50px 0px;
        //   background: url('../static/img/foote_bg.png') no-repeat center/cover;
        //   display: flex;
        justify-content: space-around;
        align-content: center;
        box-sizing: border-box;
        margin: 0 auto;

        .box {
          width: 1200px;
          margin: 0 auto;
        }

        .inc {

          color: #666666ff;
          font-weight: 400;
          font-face: Microsoft YaHei;
          font-size: 18px;
          line-height: 30px;
          margin-top: 18px;
        }

        .btn {
          width: 174px;
          height: 41px;
          border-radius: 20px 20px 20px 20px;
          border: 1px solid #184E6A;
          text-align: center;
          line-height: 41px;
          font-weight: 400;
          font-size: 16px;
          color: #184E6A;
          margin-top: 37px;
          cursor: pointer;
          transition: all .5s;
          &:hover{
            color: #fff;
            background: #184E6A;
          }
        }



      }

      .light {
        width: 100%;

        padding: 80px 0;

        .box2 {
          width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .imgs {

            width: 130px;
            height: 130px;
            img{
                width:130px;height:130px;
            }
            div{
                text-align: center;font-size: 18px;color:#666
            }
          }

          .navs {
            border-bottom: 1px solid #666;
            display: flex;
            justify-content: space-between;
            width: 950px;

            .nav {
              //   padding: 30px 0;
              //   width: 142px;
              //   height: 80px;
              line-height: 80px;
              text-align: center;
              color: #666666;
              text-decoration: none;
              font-size: 18px;

              //   margin-right:90px;
              &:hover {
                color: #184F6A;
              }
            }
          }


          .address {
            display: flex;
            margin-top: 20px;

            .item {
              color: #666666;
              font-weight: 700;
              font-size: 21px;


              span {
                font-size: 18px;
                font-weight: 400;
                margin-left: 10px;
              }
            }

            .item:nth-last-child(1) {
              margin-left: 120px
            }
          }
        }
      }

      .right {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .text {
          font-weight: 400;
          font-size: 12px;
          line-height: 25px;
          text-align: center;
          color: #fff;

        }
      }
    }




    .footer .green {
      width: 100%;
      height: 50px;
      background: #184F6A;
      box-sizing: border-box;
      text-align: center;
      font-weight: 400;
      font-size: 14px;
      line-height: 50px;
      color: #fff;
    }

  }

</style>
