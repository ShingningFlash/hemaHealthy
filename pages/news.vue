<template>
  <div style="background:#F3F3F3;">
    <div class="swiper">
      <img :src="config.image" lazy />
    </div>
    <div class="content" v-if="!detail">
      <div class="tab">
        <div class="tab_item" v-for="(item,index) in model4" :key="index" :class="current == index ? 'active' : ''"
          @click="changeTab(index,item.catId)">
          {{ item.catName }}
        </div>
      </div>
      <div class="list wow animate__rollIn" v-if="current != 0">
        <div class="list_item " v-for="(item,index) in child" :key="index" @click="goDetail(item.newsId)">
          <img class="img" :src="item.img" alt="">
          <div class="text">
            <div class="text1">
              {{ item.title }}
            </div>
            <div class="text2" v-html="item.publicTime">

            </div>
          </div>
        </div>
        
      </div>
      <div v-else>
        <div class="news" v-for="(item,index) in child" :key="index" @click="goDetail(item.newsId)">
            <div class="left_news">
                <img :src="item.img" alt="" style="width:100%;height: 100%;">
            </div>
            <div class="right_news">
                <div class="title">{{ item.title }}</div>
                <div class="dete">{{ item.publicTime }}</div>
                <div class="inc">{{ item.introduction }}</div>
            </div>
        </div>
        
      </div>
      <div style="display:flex;justify-content: center;margin-top:70px;">
        <el-pagination  @current-change="handleCurrentChange" background :page-size="9"
          :current-page="page" layout="prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>


    <div v-else>
      <news-detail :id="newsId" @data-emitted="handleData" />
    </div>
  </div>
</template>

<script>
  import newsDetail from "../components/newsDetail.vue";
  export default {
    components: {
      newsDetail,
    },
    layout: "mod",
    name: "News",
    data() {
      return {
        id: "3",
        NewsCatList: [],
        NewsList: [],
        detail: false,
        config: '',
        current: 0,
        cat_id: '',
        total: 0,
        page: 1,
        newsIntroduction: '',
        newsId: '',
        newsTitle: '',
        model4: '',
        child: '',
        page:1,
        size:0,
        currentUrl:'/api/news/id/'
        
      };
    },
    mounted() {
      this.getData();
      console.log(this.$route.params.id);
      if (this.$route.params.id) {
        this.newsId = this.$route.params.id
        this.detail = !this.detail
      }
    //   if(this.$route.params.current){
    //     this.current = this.$route.params.current

    //   }
    },

    methods: {
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val
        this.getData()
      },
      // 获取首页数据
      async getData() {
        const data = await this.$indexApi.getNews(this.currentUrl+this.id+'?page='+this.page)
        console.log(data);
        if (data.status == 1) {
            this.config = data.row.config
          this.model4 = data.row.class
          this.child = data.row.data
        //   this.total = data.row.data
          this.size = this.child.length
        }

        // code something
      },
      
      
      changeTab(index,catId) {
        this.current = index
        this.id = catId
        this.getData()
      },
      change(e) {
        this.newsTitle = this.NewsList[e].title
        this.newsIntroduction = this.NewsList[e].introduction
        this.newsId = this.NewsList[e].newsId
      },
      openNew(id) {
        this.id = id
        this.detail = !this.detail
      },
      currentchange(e) {
        this.page = e
        this.getNewsList()
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
      //   获取
      async getNewsCatList() {
        const data = await this.$indexApi.getNewsCatList();
        this.NewsCatList = data.row;
        this.cat_id = data.row[0].catId
        this.getNewsList();

        //   this.seo = data.seo
      },

      goDetail(id) {
        this.newsId = id;
        this.detail = !this.detail;
      },
      //   获取新闻列表
      async getNewsList() {
        const formData = new FormData();
        formData.append("cat_id", this.cat_id);
        formData.append('p', this.page)
        const data = await this.$indexApi.getNewsList(formData);
        this.NewsList = data.row;
        this.seo = data.seo;
        this.total = data.count
        this.newsTitle = data.row[0].title
        this.newsIntroduction = data.row[0].introduction
        this.newsId = data.row[0].newsId
      },
    },
  };

</script>
<style scoped lang="scss">
@media(max-width:767px){
    .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
    
  }

  .list_item {
    // width: 371px;
    // height: 385px;
    border-radius: 10px 10px 10px 10px;
    background: #fcfcfcff;
    box-shadow: 0 0 54px 0 #00000021;
    margin-top: 21px;
    cursor: pointer;
    transition: all .5s;

    &:hover {
      transform: scale(1.1);
    }

    .img {
      width: 100%;
    //   height: 232px;
    }

    .text {
      padding: 13px;
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

      .text2 {
        color: #666666ff;
        font-weight: 400;
        font-size: 12px;
        text-align: left;
        line-height: 30px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }

  ::v-deep {

    //   .el-pagination.is-background .el-pager li:not(.disabled) {
    //     background-color: #fff;   // 进行修改未选中背景和字体
    //     // color: #fff;
    //   }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #184E6A; // 进行修改选中项背景和字体
      color: #fff;
    }
  }

  .swiper {
    width: 100%;
    margin-top:65px;
    img{
        width:100%;height: 200px;
    }
  }

  .content {
    // width: 1200px;
    margin: 0 auto;
    background: #F3F3F3;
    // padding: 100px;
    padding:0 20px;
    box-sizing: border-box;
    margin-bottom:10px;

    .tab {

      display: flex;
      align-items: center;
      gap: 10px;
    //   justify-content: space-around;
      flex-wrap: wrap;
      margin-top:10px;

      .tab_item {
        // width: 130px;
        // height: 41px;
        padding:0px 1.333vmin;
        border-radius: 12px;
        border: 1px solid #155263;
        color: #155263;
        text-align: center;
        line-height: 30px;
        font-weight: 400;
        font-size: 12px;
        cursor: pointer;
        transition: all .5s;
        white-space: nowrap;

      }

      .active {
        background: #155263;
        border: none;
        color: #fff;
      }
    }

  }

  .news{
    // width:1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    margin-top:30px;
    padding-bottom:50px;
    border-bottom: 1px solid #E8E8E8;
    cursor: pointer;
    .left_news{
        // width:347px;
        // height: 210px;
        overflow: hidden;
        flex:0.8;

        img{
            transition: all .5s;
            &:hover{
                transform: scale(1.1);
            }
        }
    }
    .right_news{
        // margin-left:34px;
        
        .title{
            font-size: 20px;
            font-weight: 700;
            margin-top:10px;
        }
        .dete{
            font-size: 16px;
            color:#333;
            font-weight: 400;
            margin-top:17px;
        }
        .inc{
            font-weight: 400;
            margin-top:27px;
            font-size: 16px;
        }
    }
  }

}
@media(min-width:768px){
    .list {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    gap:30px;
  }

  .list_item {
    width: 371px;
    // height: 385px;
    border-radius: 10px 10px 10px 10px;
    background: #fcfcfcff;
    box-shadow: 0 0 54px 0 #00000021;
    margin-top: 71px;
    cursor: pointer;
    transition: all .5s;

    &:hover {
      transform: scale(1.1);
    }

    .img {
      width: 371px;
      height: 232px;
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

  ::v-deep {

    //   .el-pagination.is-background .el-pager li:not(.disabled) {
    //     background-color: #fff;   // 进行修改未选中背景和字体
    //     // color: #fff;
    //   }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #184E6A; // 进行修改选中项背景和字体
      color: #fff;
    }
  }

  .swiper {
    width: 100%;
    img{
        width:100%;height: 680px;
    }
  }

  .content {
    width: 1200px;
    margin: 0 auto;
    background: #F3F3F3;
    padding: 100px;

    .tab {

      display: flex;
      align-items: center;
      margin: 0 auto;
      justify-content: center;

      .tab_item {
        width: 130px;
        height: 41px;
        border-radius: 20px 20px 20px 20px;
        border: 1px solid #155263;
        color: #155263;
        text-align: center;
        line-height: 41px;
        font-weight: 400;
        font-size: 16px;
        cursor: pointer;
        transition: all .5s;
        margin-right:20px;
      }

      .active {
        background: #155263;
        border: none;
        color: #fff;
      }
    }

  }

  .news{
    width:1200px;
    display: flex;
    align-items: center;
    margin-top:59px;
    padding-bottom:50px;
    border-bottom: 1px solid #E8E8E8;
    cursor: pointer;
    .left_news{
        width:347px;
        height: 210px;
        overflow: hidden;

        img{
            transition: all .5s;
            &:hover{
                transform: scale(1.1);
            }
        }
    }
    .right_news{
        margin-left:34px;
        
        .title{
            font-size: 20px;
            font-weight: 700;
        }
        .dete{
            font-size: 16px;
            color:#333;
            font-weight: 400;
            margin-top:17px;
        }
        .inc{
            font-weight: 400;
            margin-top:27px;
            font-size: 16px;
        }
    }
  }

}  
</style>
