<template>
  <div>
    <div class="swiper">
      <img :src="config.image" lazy />
    </div>
    <div class="item">
      <div class="box">
        <div class="title wow animate__fadeInUp">
          {{ model1.title }}
        </div>
        <div class="line wow animate__fadeInUp"></div>
        <div class="inc wow animate__fadeInUp" v-html="model1.content"></div>
        <div class="block wow animate__fadeInUp">
          <div class="block1" v-if="model1 != ''">
            <div><span style="">{{ model1.block1.className.title}}</span>

              <span style="">{{ model1.block1.className.vtitle }}</span></div>
            <div style="display: flex;flex-wrap: wrap;">
              <div class="block_item" v-for="(item,index) in model1.block1.tagsImages" :key="index">
                <img style="" :src="item.img" alt="">
                <div class="wen" style="">
                  {{ item.title }}</div>
              </div>
            </div>

          </div>
          <div class="block2" v-if="model1 != ''">
            <div><span>{{ model1.block2.className.title}}</span>

              <span>{{ model1.block2.className.vtitle }}</span></div>
            <div style="display: flex;flex-wrap: wrap;">
              <div class="block_item" v-for="(item,index) in model1.block2.tagsImages" :key="index">
                <img style="" :src="item.img" alt="">
                <div class="wen" style="">
                  {{ item.title }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="model1 != ''">
          <div class="block3" v-for="(item,index) in model1.block3.tagsImages" :key="index">
            <img :src="item.img" alt="">
            <div class="right_item">
              <div class="text1" style="">{{ item.title }}</div>
              <div style="width: 60px;height: 2px;background:#145061;margin:10px 0 10px 0;"></div>
              <div class="text2" style="">{{ item.remarks }}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="item2">
      <div class="box">
        <div class="title wow animate__fadeInUp">
          {{ model2.title }}
        </div>
        <div class="text wow animate__fadeInUp">
          {{ model2.viceTitle }}
        </div>
        <div class="tab wow animate__fadeInUp">
          <div class="tab_item" v-for="(item,index) in tabList" :key="index" :class="current == index ? 'active' :''"
            @click="changeTab(index)">
            {{ item.catName }}
          </div>
        </div>
        <div class="con wow animate__fadeInUp">
          <div class="con_left" v-if="child.length >0">
            <img style="width:100%;height:100%" :src="child[0].img" alt="">
            <div class="text">{{ child[0].title }}</div>
          </div>
          <div class="con_right">
            <div class="con_item" v-if="child.length >1">
              <img style="width:100%;height:100%" :src="child[1].img" alt="">
              <div class="text">{{ child[1].title }}</div>
            </div>
            <div class="con_item" v-if="child.length >2">
              <img style="width:100%;height:100%" :src="child[2].img" alt="">
              <div class="text">{{ child[2].title }}</div>
            </div>
            <div class="con_item" v-if="child.length >3">
              <img style="width:100%;height:100%" :src="child[3].img" alt="">
              <div class="text">{{ child[3].title }}</div>
            </div>
            <div class="con_item" v-if="child.length >4">
              <img style="width:100%;height:100%" :src="child[4].img" alt="">
              <div class="text">{{ child[4].title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="item3" :style="{background:'url('+model2.img +') no-repeat center/cover'}">
      <div class="map wow animate__flipInX" id="map">

      </div>
      <div class="wow animate__backInRight toto">
        <img :src="model2.rightImg" alt="" >
        <div style="font-weight: 400;color:#666">{{ model2.rightText }}</div>
      </div>
    </div>
    <div class="item">
      <div class="box">
        <div class="title wow animate__bounceIn">
          {{ model3.title }}
        </div>
        <div class="text wow animate__bounceIn">
          {{ model3.viceTitle }}
        </div>

        <img class="wow animate__bounceInUp imgs" :src="model3.img" alt="">
        <!-- <div class="inc wow animate__bounceIn" v-html="model3.img"></div> -->
      </div>
    </div>

    <div class="item4" style="background:#f5f5f5">
      <div class="box">
        <div class="title wow animate__bounceIn">
          {{ model4.title }}
        </div>
        <div class="text wow animate__bounceIn">
          {{ model4.viceTitle }}
        </div>
        <div class="nei wow animate__bounceInUp">
          <div class="nei_item" v-for="(item,index) in tag.tagsImages" :key="index">
            <img :src="item.img" alt="">
            <div class="text1">
              {{ item.title }}
            </div>
            <div class="text2">
              <!-- {{ item.remarks }} -->
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
    name: "Health",
    data() {
      return {
        model1: [], //模块1
        model2: [], //模块2
        model3: [], //模块3
        model4: [], //模块4
        tag: [],
        map: null,
        weidu: '',
        jingdu: '',
        tabList: [],
        current: 0,
        child: [],
        config: ''
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      changeTab(index) {
        this.current = index
        this.child = this.tabList[index].child
      },
      textRach(textArea) {
        let text = textArea
          .replace(/<p style="text-align: center;">/g, '<p style="margin:0;text-align: center;">')
          .replace(/<p>/g, '<p style="margin:0;">')
        return text
      },
      async getData() {
        const data = await this.$indexApi.getHealth()
        if (data.status == 1) {
          this.config = data.row.config
          this.model1 = data.row.model1
          
          if(this.model1.content !=''){
            this.model1.content = this.textRach(this.model1.content)
            console.log("con");
          }
          this.model2 = data.row.model2
          this.model3 = data.row.model3
          this.model4 = data.row.model4
          this.tabList = data.row.data
          this.tag = this.model4.block
          this.child = this.tabList[0].child
          this.weidu = this.model2.map.split(",")[0]
          this.jingdu = this.model2.map.split(",")[1]
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

        }

      }
    }
  }

</script>
<style scoped lang="scss">
  @media (max-width:767px) {
    .swiper {
      width: 100%;
      margin-top: 65px;

      img {
        width: 100%;
        // height: 200px;

      }
    }

    .item {
      .imgs {
        width: 100%;
      }

      padding: 50px 20px;
      box-sizing: border-box;
      
      .block3 {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top:40px;
        img {
          width: 100%;
          
        }

        .right_item {

          //   width: 576px;
          //   margin-left: 100px;
          margin-top:10px;
          margin-bottom:10px;
        
          .text1 {
            font-size: 18px;
            color: #232323;
            font-weight: 700;
            margin-top:10px;
          }

          .text2 {
            font-size: 12px;
            color: #232323;
            line-height: 18px;
          }
        }
      }

      .block3:nth-of-type(1){
        margin-top:0;
      }

      .block {
        // width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;

        .block1 {
          //   width: 576px;
          box-sizing: border-box;
          padding: 20px;
          border-radius: 8px 8px 8px 8px;
          background: #ffffffff;
          box-shadow: 0 0 32px 0 #2728281c;

          img {
            transform: scale(0.8);
          }

          span {
            font-size: 24px;
            color: #165465;
          }

          span:nth-last-child(1) {
            font-size: 16px;
            color: #787878;
          }

          .block_item {
            transition: all .5s;
            flex-basis: 33.33%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;
            justify-content: space-between;

            .wen {
              font-size: 12px;
              text-align: center;
              color: #313131;
              margin-top: 5px
            }

            img {
              max-height: 100%;
              height:50px;
            }

            &:hover {
              transform: scale(1.1);
            }
          }
        }

        .block2 {
          //   width: 576px;
          box-sizing: border-box;
          margin-top: 10px;
          padding: 30px;
          border-radius: 8px 8px 8px 8px;
          background: #ffffffff;
          box-shadow: 0 0 32px 0 #2728281c;

          img {
            transform: scale(0.8);
          }

          span {
            font-size: 24px;
            color: #165465;
          }

          span:nth-last-child(1) {
            font-size: 16px;
            color: #787878;
          }

          .block_item {
            transition: all .5s;
            flex-basis: 33.33%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;
            justify-content: space-between;

            .wen {
              font-size: 12px;
              text-align: center;
              color: #313131;
              margin-top: 5px
            }

            img {
              max-height: 100%;
              height:50px;
            }

            &:hover {
              transform: scale(1.1);
            }
          }
        }


      }


      .box {
        // width: 1200px;
        margin: 0 auto;

        .title {
          font-weight: 700;

          font-size: 24px;
          text-align: center;
          color: #000000;
        }

        .text {
          text-align: center;
          font-size: 12px;
          margin-top: 14px;
          margin-bottom: 15px;
          word-break: break-all;
        }

        .line {
          width: 62px;
          height: 2px;
          margin: 0 auto;
          background: #f9c333ff;
          margin-top: 15px;
          margin-bottom: 20px;
        }

        .inc {
          color: #333333ff;
          font-weight: 400;
          font-size: 12px;
          text-align: center;
          line-height: 20px;
          p{
            margin: 0;
          }
        }

      }
    }

    .item2 {
      //   display: none;
      padding: 50px 0;
      background: #EFEFEF;

      .title {
        font-weight: 700;
        font-size: 24px;
        text-align: center;
        color: #000000;
      }

      .text {
        text-align: center;
        margin-top: 12px;
        margin-bottom: 30px;
      }

      .box {
        // width: 1200px;
        margin: 0 auto;

        .tab {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;

          .tab_item {
            height: 41px;
            border-radius: 20px 20px 20px 20px;
            border: 1px solid #155263;
            padding: 0 30px;
            color: #155263;
            line-height: 41px;
            text-align: center;
            margin-right: 20px;
            cursor: pointer;
            transition: all .5s;
            font-size: 12px;
          }

          .active {
            background: #155263;
            color: #fff;
          }
        }

        .con {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 47px;
          flex-direction: column;
          padding: 0 1.333vmin;
          box-sizing: border-box;

          .con_left {
            // width: 526px;
            // height: 485px;
            border-radius: 10px 10px 10px 10px;
            background: #155263ff;
            position: relative;
            cursor: pointer;

            img {
              transition: transform 0.6s;
            }

            overflow: hidden;

            &:hover img {
              transform: scale(1.2);
            }

            .text {
              left: 50%;
              transform: translateX(-50%);
              color: #fff;
              bottom: -20px;
              position: absolute;
              white-space: nowrap;
              z-index: 2;

            }

            &::after {
              opacity: 0.8;
              content: " ";
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 50%;
              background-image: linear-gradient(to top, #155263, transparent);
              pointer-events: none;
            }


          }

          .con_right {
            // width: 647px;
            // height: 485px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            align-content: space-between;
            margin-top: 5px;

            .con_item {
              width: 47%;
              //   height: 231px;
              position: relative;
              cursor: pointer;
              margin-top: 5px;

              img {
                transition: transform 0.6s;
              }

              overflow: hidden;

              &:hover img {
                transform: scale(1.2);
              }

              .text {
                left: 50%;
                transform: translateX(-50%);
                color: #fff;
                bottom: -20px;
                position: absolute;
                white-space: nowrap;
                z-index: 2;
                font-size: 12px;

              }

              &::after {
                opacity: 0.8;
                content: " ";
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 50%;
                background-image: linear-gradient(to top, #155263, transparent);
                pointer-events: none;
              }
            }
          }
        }
      }
    }

    .item3 {
      padding: 20px 0;

      #map {
        width: 90vw;
        height: 309px;
        // padding:0 30px;
        box-sizing: border-box;
      }

      .toto {
        text-align: center;
        width: 95px;
        height: 95px;
        background: #ebf6f0ff;
        border-radius: 50%;
        margin-top:10px;
        img{
            transform: scale(0.7);
            margin-top:10px;
        }
        font-size:12px;
      }

      display: none;
      width: 100%;
      //   height: 900px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .item4 {
      //   display: none;
      padding-top: 50px;
      padding-bottom: 20px;

      .title {
        font-weight: 700;
        font-size: 24px;
        text-align: center;
        color: #000000;
      }

      .text {
        text-align: center;
        margin-top: 18px;
        margin-bottom: 15px;
      }

      .box {
        // width: 1200px;
        margin: 0 auto;
      }

      .nei {
        // width: 1160px;
        // height: 400px;
        padding: 3.333vmin 1.333vmin;
        border-radius: 10px 10px 10px 10px;
        opacity: 0.9;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;


        .nei_item {
          img {
            width: 100%
          }

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 47%;
          transition: all .5s;
          //   height: 258px;
          font-size: 12px;
          box-shadow: 0 0 8px 0 #27282821;
          margin-top: 10px;

          &:hover {
            transform-origin: center;
            transform: scale(1.05);
            cursor: pointer;
          }

          .text1 {
            color: #000;
            font-weight: 400;
            font-size: 12px;
            text-align: center;
            margin-top: 10px;

          }

          .text2 {
            color: #333333ff;
            font-weight: 400;
            font-size: 12px;
            text-align: center;
            margin-top: 5px;
          }
        }
      }
    }
  }

  @media (min-width:768px) {
    .swiper {
      width: 100%;

      img {
        width: 100%;
        height: 713px;
      }
    }

    .item {
      padding: 100px 0;

      .block3:nth-child(odd) {
        display: flex;

        flex-direction: row;
        align-items: center;
        margin-top: 80px;

        .right_item {
          width: 576px;
          margin-left: 100px;

          .text1 {
            font-size: 26px;
            color: #232323;
            font-weight: 700;
          }

          .text2 {
            font-size: 18px;
            color: #232323;
            line-height: 35px;
          }
        }
      }

      .block3:nth-child(even) {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        margin-top: 80px;

        .right_item {
          width: 576px;
          margin-right: 100px;

          .text1 {
            font-size: 26px;
            color: #232323;
            font-weight: 700;
          }

          .text2 {
            font-size: 18px;
            color: #232323;
            line-height: 35px;
          }
        }
      }

      .block {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;

        .block1 {
          width: 576px;
          box-sizing: border-box;
          padding: 45px;
          border-radius: 8px 8px 8px 8px;
          background: #ffffffff;
          box-shadow: 0 0 32px 0 #2728281c;

          span {
            font-size: 26px;
            color: #165465;
          }

          span:nth-last-child(1) {
            font-size: 18px;
            color: #787878;
          }

          .block_item {
            transition: all .5s;
            flex-basis: 33.33%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 40px;
            justify-content: space-between;

            .wen {
              font-size: 18px;
              text-align: center;
              color: #313131;
              margin-top: 20px
            }

            img {
              max-height: 100%;
            }

            &:hover {
              transform: scale(1.1);
            }
          }
        }

        .block2 {
          width: 576px;
          box-sizing: border-box;
          padding: 45px;
          border-radius: 8px 8px 8px 8px;
          background: #ffffffff;
          box-shadow: 0 0 32px 0 #2728281c;

          span {
            font-size: 26px;
            color: #165465;
          }

          span:nth-last-child(1) {
            font-size: 18px;
            color: #787878;
          }

          .block_item {
            transition: all .5s;
            flex-basis: 33.33%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 40px;
            justify-content: space-between;

            .wen {
              font-size: 18px;
              text-align: center;
              color: #313131;
              margin-top: 20px
            }

            img {
              max-height: 100%;
            }

            &:hover {
              transform: scale(1.1);
            }
          }
        }


      }


      .box {
        width: 1200px;
        margin: 0 auto;

        .title {
          font-weight: 700;

          font-size: 32px;
          text-align: center;
          color: #000000;
        }

        .text {
          text-align: center;
          margin-top: 18px;
          margin-bottom: 30px;
        }

        .line {
          width: 62px;
          height: 2px;
          margin: 0 auto;
          background: #f9c333ff;
          margin-top: 24px;
          margin-bottom: 20px;
        }

        .inc {
          color: #333333ff;
          font-weight: 400;
          font-size: 21px;
          text-align: center;
          line-height: 32px;
        }

      }
    }

    .item2 {
      padding: 100px 0;
      background: #EFEFEF;

      .title {
        font-weight: 700;
        font-size: 32px;
        text-align: center;
        color: #000000;
      }

      .text {
        text-align: center;
        margin-top: 18px;
        margin-bottom: 30px;
      }

      .box {
        width: 1200px;
        margin: 0 auto;

        .tab {
          display: flex;
          justify-content: center;
          align-items: center;

          .tab_item {
            height: 41px;
            border-radius: 20px 20px 20px 20px;
            border: 1px solid #155263;
            padding: 0 30px;
            color: #155263;
            line-height: 41px;
            text-align: center;
            margin-right: 20px;
            cursor: pointer;
            transition: all .5s;
          }

          .active {
            background: #155263;
            color: #fff;
          }
        }

        .con {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 27px;

          .con_left {
            width: 526px;
            height: 485px;
            border-radius: 10px 10px 10px 10px;
            background: #155263ff;
            position: relative;
            cursor: pointer;

            img {
              transition: transform 0.6s;
            }

            overflow: hidden;

            &:hover img {
              transform: scale(1.2);
            }

            .text {
              left: 50%;
              transform: translateX(-50%);
              color: #fff;
              bottom: -20px;
              position: absolute;
              white-space: nowrap;
              z-index: 2;

            }

            &::after {
              opacity: 0.8;
              content: " ";
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 50%;
              background-image: linear-gradient(to top, #155263, transparent);
              pointer-events: none;
            }


          }

          .con_right {
            width: 647px;
            height: 485px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-content: space-between;

            .con_item {
              width: 312px;
              height: 231px;
              position: relative;
              cursor: pointer;

              img {
                transition: transform 0.6s;
              }

              overflow: hidden;

              &:hover img {
                transform: scale(1.2);
              }

              .text {
                left: 50%;
                transform: translateX(-50%);
                color: #fff;
                bottom: -20px;
                position: absolute;
                white-space: nowrap;
                z-index: 2;

              }

              &::after {
                opacity: 0.8;
                content: " ";
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 50%;
                background-image: linear-gradient(to top, #155263, transparent);
                pointer-events: none;
              }
            }
          }
        }
      }
    }

    .item3 {
      #map {
        width: 469px;
        height: 469px;
        
      }

      .toto {
        text-align: center;
        margin-left: 70px;
        width: 135px;
        height: 135px;
        background: #ebf6f0ff;
        border-radius: 50%;
        
        img{
            width:34px;height:44px;margin-top:25px
        }
      }

      width: 100%;
      height: 900px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .item4 {
      padding-top: 80px;
      padding-bottom: 20px;

      .title {
        font-weight: 700;
        font-size: 32px;
        text-align: center;
        color: #000000;
      }

      .text {
        text-align: center;
        margin-top: 18px;
        margin-bottom: 30px;
      }

      .box {
        width: 1200px;
        margin: 0 auto;
      }

      .nei {
        width: 1160px;
        // height: 400px;
        border-radius: 10px 10px 10px 10px;
        opacity: 0.9;
        display: grid;
        grid-template-columns: repeat(4, 24%);
        grid-gap: 12px;

        .nei_item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 280px;
          transition: all .5s;
          height: 258px;
          font-size: 16px;
          box-shadow: 0 0 8px 0 #27282821;
          margin-top: 20px;

          &:hover {
            transform-origin: center;
            transform: scale(1.05);
            cursor: pointer;
          }

          .text1 {
            color: #000;
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
      }
    }
  }

</style>
