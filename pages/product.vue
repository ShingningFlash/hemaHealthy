<template>
  <div>
    <div class="swiper">
      <img :src="seo.image" lazy style="width:100%;height: 400px;" />
    </div>
    <div v-if="!detail">
      <div class="content" v-for="(item,index) in ProductsList" :key="index" :class="index % 2 === 0 ? 'even' : 'old'" @click="goDetail(item.id)">
        <div class="left">
          <nuxt-img :src="item.img" style="width:100%;height: 100%;"
            :options="{ quality: 75, formats: ['webp', 'jpeg'], blur: 10, placeholder: true }" provider="twicpics" lazy
            blur-up />
        </div>
        <div class="right">
          <div class="title">
            {{item.name}}
          </div>
          <div class="contx">
            {{item.remark}}
          </div>
        </div>
      </div>
      <div style="display:flex;justify-content: center;padding-bottom: 100px;margin-top: 50px;">
        <el-pagination background layout="prev, pager, next" :total="total" @current-change="currentchange"
          :page-size="10">
        </el-pagination>
      </div>
    </div>
    <div v-else>
        <product-detail :id="id" @data-emitted="handleData" />
    </div>
  </div>
</template>

<script>
  export default {
    layout: 'mod',
    name: 'Product',
    data() {
      return {
        id:'',
        ProductsList: [],
        seo: {},
        detail: false,
        total:0,
        page:1
      }
    },
    mounted() {
      this.getProductsList()
    },
    methods: {
         // 获取详情组件的值false 关闭详情
         handleData(data){
            console.log(data);
            this.detail = data
        },
      //   获取
      async getProductsList() {
        const formData = new FormData();
        formData.append('p', this.page)
        const data = await this.$indexApi.getProductsList(formData)
        this.ProductsList = data.row
        this.seo = data.seo
        this.total = data.count
      },
      goDetail(id) {
        this.id = id
        this.detail = !this.detail
      },
      currentchange(e) {
        this.page = e
        this.getProductsList()
      },
    }
  }

</script>
<style scoped lang="scss">
::v-deep {
//   .el-pagination.is-background .el-pager li:not(.disabled) {
//     background-color: #fff;   // 进行修改未选中背景和字体
//     // color: #fff;
//   }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #0D7111;   // 进行修改选中项背景和字体
    color: #fff;
  }
}
  .swiper {
    width: 100%;
  }

  .even {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #d6d6d6;
    padding: 60px 0;
  }

  .old {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    justify-content: space-between;
    border-bottom: 1px solid #d6d6d6;
    padding: 60px 0;
  }

  .content {
    margin-bottom: 100px;

    .left {
      width: 492px;
      height: 340px;
      cursor: pointer;
    }

    .right {
        &:hover{
            text-decoration: underline;
        }
        cursor: pointer;
      .title {
        font-family: "PingFang SC Bold";
        font-weight: 700;
        font-size: 26px;
        line-height: 28px;
        color: #000;
      }

      .contx {
        width: 648px;
        height: 223px;
        font-family: "PingFang SC";
        font-weight: 400;
        font-size: 16px;
        line-height: 30px;
        margin-top: 22px;
        color: #000;
      }
    }
  }

</style>
