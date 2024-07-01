<template>
  <div>
    <div class="header">
      <div style="background: #F5F5F5;width:100%">
        <div class="box">
          <div class="left">欢迎光临 河马健康 官方网站！</div>
          <div class="right">
            <div @click="save" style="display:flex;align-items: center;"><img src="../static/img/col.png"
                style="width:13px;height:13px;margin-right: 5px"> <span style="margin-right:5px">收藏本站</span></div> |
            <div style="display:flex;align-items: center;"><img src="../static/img/phone.png"
                style="margin: 0 5px;width:9px;height:14px"><span>手机端</span></div>
          </div>
        </div>
      </div>
      <div class="box2">
        <div class="left">
          <img :src="data.system.logo" alt="" style="width:100%">
        </div>
        <div class="right">
          <div class="right_nav" @click="show =  !show">
            <span v-if="!show"></span>
            <div v-if="show" class="x-shape"></div>
          </div>
          <div class="right_item">
            <div style="display:flex;align-items: center;">
              <img :src="data.system.qrcode" alt="">
              <div class="text" style="margin-left:10px;font-size: 18px;color:#333">
                <div>扫一扫关注公众号</div>
                <div>河马健康HIPPO服务号</div>
              </div>
            </div>
            <div style="display:flex;align-items: center;margin-left:20px">
              <img src="../static/img/contact.png" alt="">
              <div class="text" style="margin-left:10px;font-size: 18px;color:#333">
                <div>服务热线：</div>
                <div>{{ data.system.contact_number }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box3" :class="show ? 'actives' :''">
        <div class="content">
          <nuxt-link v-for="(item,index) in data.navbar" :key="index" @click.native="show = !show" class="nav"
            :to="item.url">{{ item.name }}
            <div class="sun" >
              <div class="sunbox" v-for="(items,indexs) in item.child" :key="indexs" @click="open(items.url)">
                <a href="javascript:void(0);">
                {{ items.name }}</a>
              </div>
            </div>
          </nuxt-link>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Header",
    data() {
      return {
        status: false,
        show: false
      }
    },
    props: {
      data: {
        tpye: Object,
        required: true
      }
    },
    methods: {
        open(url){
            window.open(url,'_blank')
        },
      // 添加收藏夹
      save() {
        var url = window.location;
        var title = document.title;
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("360se") > -1) {
          alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
        } else if (ua.indexOf("msie 8") > -1) {
          window.external.AddToFavoritesBar(url, title); //IE8
        } else if (document.all) {
          try {
            window.external.addFavorite(url, title);
          } catch (e) {
            alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
          }
        } else if (window.sidebar) {
          window.sidebar.addPanel(title, url, "");
        } else {
          alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
        }

      }
    },
    mounted() {




    }
  };

</script>
<style lang="scss" scoped>
  @media (max-width:767px) {
    .header {
      width: 100%;
      position: fixed;
      z-index: 99999;
      top: 0;
      left: 0;
      background: #fff;
      user-select: none;
      box-shadow: 0 2px 4px 0px rgba(0, 0, 0, 0.1);
      transition: all .4s ease;

      &::before {
        content: "";
        width: 100%;
        height: 1px;
        position: absolute;
        background: rgba(0, 0, 0, 0.1);
        left: 0;
        bottom: 0;
      }

      .box {

        margin: 0 auto;
        background: #F5F5F5;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        display: none;

        .left {
          color: #666666;
          font-size: 14px;
          font-weight: 400;
          line-height: 30px;
        }

        .right {
          color: #666666;
          font-size: 14px;
          font-weight: 400;
          line-height: 30px;
          display: flex;
          align-items: center;
        }
      }

    }

    .box2 {

      margin: 0 auto;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left {
        margin-left: 4%;
        width: 80%;
      }

      .right {
        display: flex;
        margin-right: 4%;

        .right_nav {
          width: 24px;
          height: 60px;
          cursor: pointer;
          float: right;
          user-select: none;
          align-items: center;
          display: flex;
        }

        .right_item {
          display: none;
        }

        &::before {
          display: table;
          content: "";

        }

        .x-shape::before,
        .x-shape::after {
          content: "";
          position: absolute;
          top: 50%;
          right: 4%;
          width: 2px;
          height: 50%;
          background-color: black;
          transform-origin: center center;


        }

        .x-shape::before {


          transform: translateY(-50%) rotate(45deg);
        }

        .x-shape::after {
          transform: translateY(-50%) rotate(-45deg);
        }

        span {
          width: 100%;
          height: 2px;
          background: #333;
          display: block;
          position: relative;
          transition: all .2s linear;

          &::before {
            content: "";
            position: absolute;
            height: 2px;
            background: #333;
            display: block;
            left: 0;
            width: 100%;
            transition: all .2s linear;
            top: -7px;
          }

          &::after {
            content: "";
            position: absolute;
            height: 2px;
            background: #333;
            display: block;
            left: 0;
            width: 100%;
            transition: all .2s linear;
            top: 7px;
          }
        }

      }
    }

    .box3 {
      display: none;
      align-items: center;
      position: absolute;
      width: 100%;
      margin-right: 0;
      height: calc(100vh - 60px);
      // top: 60px;
      left: 0;
      padding: 22px 0;
      background: #155261;
      transition: all .5s;

      &::before {
        display: table;
        content: "";
      }

      // display: none;

      .content {
        display: block;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        display: flex;
        flex-direction: column;
        padding: 0 20px;

        .sun {
          
          position: relative;
          left:0;
          transition: all .5s;
          background: #175969;
          width:100%;
          padding: 0 20px;
          box-sizing: border-box;
          

          a{
            text-decoration: none;
            color:#fff;
          }
        }
      }

      .nuxt-link-active {
        text-decoration: none;
        color: #0D7111;
      }

      .nav {
        // padding: 0 20px;
        box-sizing: border-box;
        //   width: 142px;
        //   height: 80px;
        line-height: 80px;
        text-align: left;
        color: #fff;
        text-decoration: none;

        &:hover {
          //   color: #E77916;
        }
      }

      .nuxt-link-exact-active {
        background: #E77916;
      }



    }

    .actives {
      display: flex;
    }
  }









  @media (min-width:768px) {
    .header {


      .box {
        // display:none;
        max-width: 1200px;
        margin: 0 auto;
        background: #F5F5F5;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
          color: #666666;
          font-size: 14px;
          font-weight: 400;
          line-height: 30px;
        }

        .right {
          color: #666666;
          font-size: 14px;
          font-weight: 400;
          line-height: 30px;
          display: flex;
          align-items: center;
        }
      }

    }

    .box2 {
      max-width: 1200px;
      height: 120px;
      margin: 0 auto;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .right {
        display: flex;
        align-items: center;

        .right_item {
          display: flex;
          // align-items: center;
          //   flex-direction: column;
          margin-left: 10px;

          .text {
            font-weight: 400;
            font-size: 18px;
            color: #333333;
            line-height: 30px;
          }
        }
      }
    }



    .box3 {
      background: #155261;
      display: flex;
      align-items: center;

      .content {
        width: 1200px;
        margin: 0 auto;

        .sun {
          display:none;
          position: absolute;
          left:0;
          transition: all .5s;
          background: #155261;
          width:100%;
          z-index: 99999;
          .sunbox{
            &:hover{
                background: #E77916;
            }
          }

          a{
            text-decoration: none;
            color:#fff;
          }
        }
      }

      .nuxt-link-active {
        text-decoration: none;
        color: #0D7111;
      }

      .nav {
        padding: 30px 65px;
        width: 142px;
        //   height: 80px;
        line-height: 80px;
        text-align: center;
        color: #fff;
        text-decoration: none;
        transition: all .5s;
        position: relative;
        &:hover .sun{
            display: block;
        }
        &:hover {
          color: #E77916;
        }
      }

      .nuxt-link-exact-active {
        background: #E77916;

        &:hover {
          color: #fff;
        }
      }
    }
  }


  //pc端
  //   @media only screen and (min-width: 1200px) {
  //     .header {
  //       width: 100%;
  //       height: 120px;
  //       background: #0d7112;
  //       display: flex;
  //       justify-content: center;
  //       align-items: center;
  //       padding: 1rem;

  //       .box {
  //         // width:1200px;
  //         display: grid;
  //         grid-template-columns: repeat(2, 1fr);
  //         grid-gap: 1rem;
  //         align-items: center;
  //       }

  //       .header .left {
  //         font-size: 2rem;
  //         // display: flex;
  //       }

  //       .header .right {
  //         display: flex;
  //         justify-content: flex-end;
  //       }

  //       .nuxt-link-active {
  //         text-decoration: none;
  //         color: #0D7111;
  //       }

  //       .nav {
  //         padding: 50px 45px;
  //         width: 142px;
  //         height: 120px;
  //         line-height: 120px;
  //         text-align: center;
  //         color: #fff;
  //         text-decoration: none;
  //       }

  //       .nuxt-link-exact-active {
  //         background: #afdb0f;
  //       }

  //     }
  //   }

</style>
