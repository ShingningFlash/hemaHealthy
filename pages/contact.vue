<template>
  <div>

    <div class="swiper">
      <img :src="config.image" lazy />
    </div>

    <div class="item">
      <div class="title wow animate__bounceInLeft">联系我们</div>
      <div class="wow animate__backInLeft"
        style="width: 62.03px;height: 2px;background: #d87d14ff;margin:0 auto;margin-top:15px"></div>
      <div  class="text wow animate__backInLeft">
        请您将问题或建议告诉我们，河马健康竭诚为您服务！可以通过下面各种方式关注或联系我们。
      </div>
      <div class="box wow animate__bounceInLeft">
        <div class="left">
          <div class="top">
            <div class="name">
              {{ ContactList.company }}
            </div>
            <div class="ss">
              服务热线：<span>{{ ContactList.phone }}</span>
            </div>
            <div class="ss">
              公司邮箱：<span>{{ ContactList.email }}</span>
            </div>
            <div class="ss">
              公司网址：<span>{{ ContactList.url }}</span>
            </div>
            <div class="ss">
              公司地址：<span>{{ ContactList.address }}</span>
            </div>
          </div>
          <div class="bottom">
            <img :src="ContactList.img" style="width:100%;height:100%" alt="">
          </div>
        </div>
        <div class="right">
          <div style="width:100%;height: 100%;" class="map" id="map"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    layout: 'mod',
    name: 'Contact',
    data() {
      return {
        weidu: '',
        jingdu: '',
        ContactList: {},
        config: ''
      }
    },
    mounted() {
      this.getContact()
    },
    methods: {

      async getContact() {
        const data = await this.$indexApi.getContact();
        this.ContactList = data.row.data;
        this.config = data.row.config
        this.weidu = this.ContactList.coordinate.split(",")[0]
        this.jingdu = this.ContactList.coordinate.split(",")[1]
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

    }
  }

</script>
<style lang="scss" scoped>
  @media (max-width: 767px) {
    .swiper {
      width: 100%;
        margin-top:65px;
      img {
        width: 100%;
        // height: 200px;
      }
    }

    .item {
    //   width: 1200px;
      margin: 0 auto;
      padding:20px;
      box-sizing: border-box;
      .title{
        font-size: 24px;font-weight: 700;color:#155263;text-align:center;margin-top:24px;
      }
      .text{
        font-size: 12px;font-weight: 700;color: #666;margin:0 auto;margin-top:10px;text-align:center;line-height: 20px;
      }

      .box {
        display: flex;
        // justify-content: space-between;
        flex-direction: column;
        margin-top: 31px;

        .left {
          display: flex;
          flex-direction: column;
        //   justify-content: space-between;

          .top {
            .name {
              font-weight: 700;
              font-size: 20px;
              text-align: left;
              color: #155263;
              margin-bottom: 14px;
              margin-top:0px;
            }

            .ss {
              color: #000000ff;
              font-weight: 700;
              font-size: 14px;
              text-align: left;
              line-height: 20px;


              span {
                color: #000000ff;
                font-weight: 400;
                font-size: 14px;
                text-align: left;
                line-height: 25px;
              }
            }
          }

          .bottom {
            width: 140px;
            height: 140px;
            margin:0 auto;
            margin-bottom:20px;
          }
        }

        .right {
          width: 100%;
          height: 368px;
        }

      }
    }

  }

  @media (min-width: 1200px) {
    .swiper {
      width: 100%;

      img {
        width: 100%;
        height: 680px;
      }
    }

    .item {
    
      width: 1200px;
      margin: 0 auto;
      padding-bottom: 117px;
      
        .title{
        font-size: 32px;font-weight: 700;color:#155263;text-align:center;margin-top:84px;
      }
      
      .text{
        font-size: 21px;font-weight: 700;color: #666;margin:0 auto;margin-top:20px;text-align:center;width:500px;line-height: 32px;
      }

      .box {
        display: flex;
        justify-content: space-between;
        margin-top: 71px;

        .left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .top {
            .name {
              font-weight: 700;
              font-size: 30px;
              text-align: left;
              color: #155263;
              margin-bottom: 24px;
            }

            .ss {
              color: #000000ff;
              font-weight: 700;
              font-size: 20px;
              text-align: left;
              line-height: 35px;


              span {
                color: #000000ff;
                font-weight: 400;
                font-size: 20px;
                text-align: left;
                line-height: 35px;
              }
            }
          }

          .bottom {
            width: 241px;
            height: 241px;
          }
        }

        .right {
          width: 623px;
          height: 568px;
        }

      }
    }
  }

</style>
