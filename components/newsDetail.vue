<template>
  <div style="background:#F3F3F3;">
    <div v-if="NewsDetail != ''">
      <div class="title">
        {{ NewsDetail.title }}
      </div>
      <div class="time">
        发布时间：{{ NewsDetail.publicTime | formatDate }}
      </div>
      <div class="line"></div>
      <div class="content" v-html="NewsDetail.content"></div>
      <div class="line"></div>
      <div class="box">
        <div class="left">
          <!-- <div class="prev" v-if="prev == null || prev == 'null'">The last：Without the!</div>
          <div class="prev1" v-else @click="other(prev.newsId)">Prev article：{{ prev.title }}</div>
          <div class="next" v-if="next == null || next == 'null'">The last：Without the!</div>
          <div class="next1" v-else @click="other(next.newsId)">Next article：{{ next.title }} </div> -->
        </div>
        <div class="right" @click="back">返回</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      id: {
        tpye: String,
        required: true
      }
    },
    name: 'NewsDetail',
    data() {
      return {
        NewsDetail: [],
        next: [],
        prev: [],
        currentUrl: '/api/newsDetail/id/'
      }
    },
    mounted() {
      this.getNewsDetail()
    },
    filters: {
      formatDate(value) {
        const date = new Date(value*1000);
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        };
        return date.toLocaleDateString('zh-cn', options).replace(/\//g, '-');
      }
    },
    methods: {
        textRach(textArea){
        let text = textArea
			.replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/gi, '<img$1')
			.replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/gi, '<img$1')
			.replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/gi, '<img$1')
			.replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/gi, '<img$1')
			.replace(/<img([\s\w"-=\/\.:;]+)/gi, '<img style="width: 100%;display:block;" $1')
		return text
      },
      async other(id) {

        const data = await this.$indexApi.getNewsDetail(this.currentUrl + this.id)
        this.NewsDetail = data.row
        if(this.NewsDetail.content != '' && this.NewsDetail.content != null){
            this.NewsDetail.content= this.textRach(this.NewsDetail.content)
        }
        this.next = data.next
        this.prev = data.prev
      },
      //   获取
      async getNewsDetail() {

        const data = await this.$indexApi.getNewsDetail(this.currentUrl + this.id)
        console.log(data);
        if (data.status == 1) {
          this.NewsDetail = data.row.data
          if(this.NewsDetail.content != '' && this.NewsDetail.content != null){
            this.NewsDetail.content= this.textRach(this.NewsDetail.content)
        }
        }
        // this.next = data.next
        // this.prev = data.prev
      },

      back() {
        this.$emit("data-emitted", false)
      }
    }
  }

</script>

<style lang="scss" scoped>
 @media(max-width:767px){
    .img {
    width: 789px;
    height: 609px;
    margin: 0 auto;
    margin-top: 28px;
  }

  .line {
    // width: 1200px;
    height: 0;
    border: 1px dashed #cbcbcb;
    margin: 0 auto;
    margin-top: 22px;
    margin-bottom: 35.5px;
  }

  .title {
    font-family: "PingFang SC Bold";
    font-weight: 700;
    font-size: 24px;
    text-align: center;
    color: #000;
    padding:0 20px;
    box-sizing: border-box;
    margin-top:20px;
  }

  .time {
    font-family: "PingFang SC";
    font-weight: 400;
    font-size: 16px;
    line-height: 30px;
    text-align: center;
    color: #959595;
    margin-top: 20px;
  }

  .content {
    padding:0 20px;
    box-sizing: border-box;
    // width: 1200px;
    font-family: "PingFang SC";
    font-weight: 400;
    font-size: 12px;
    line-height: 30px;
    color: #2e2e2e;
    margin: 0 auto;

  }

  .box {
    // width: 1200px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    padding-bottom: 10px;

    .left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .prev,
      .next {
        color: #7e7e7eff;
        font-size: 16px;
        font-weight: 400;
        margin-top: 10px;
      }

      .prev1,
      .next1 {
        color: #0d7111ff;
        font-size: 16px;
        font-weight: 400;
        cursor: pointer;
        margin-top: 10px;
      }
    }

    .right {
      width: 95px;
      height: 38px;
      border-radius: 19px;
      background: #165360;
      text-align: center;
      line-height: 38px;
      font-family: "Microsoft YaHei";
      font-weight: 400;
      font-size: 16px;
      color: #fff;
      cursor: pointer;

      &:active {
        background-color: lighten(#165360, 10%);
        transition: background-color 0.2s ease;
      }
    }
  }
 }
@media(min-width: 768px){
    .img {
    width: 789px;
    height: 609px;
    margin: 0 auto;
    margin-top: 68px;
  }

  .line {
    width: 1200px;
    height: 0;
    border: 1px dashed #cbcbcb;
    margin: 0 auto;
    margin-top: 22px;
    margin-bottom: 35.5px;
  }

  .title {
    font-family: "PingFang SC Bold";
    font-weight: 700;
    font-size: 24px;
    text-align: center;
    color: #000;
    margin-top:100px;
  }

  .time {
    font-family: "PingFang SC";
    font-weight: 400;
    font-size: 16px;
    line-height: 30px;
    text-align: center;
    color: #959595;
    margin-top: 30px;
  }

  .content {
    width: 1200px;
    font-family: "PingFang SC";
    font-weight: 400;
    font-size: 16px;
    line-height: 30px;
    color: #2e2e2e;
    margin: 0 auto;

  }

  .box {
    width: 1200px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    padding-bottom: 100px;

    .left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .prev,
      .next {
        color: #7e7e7eff;
        font-size: 16px;
        font-weight: 400;
        margin-top: 10px;
      }

      .prev1,
      .next1 {
        color: #0d7111ff;
        font-size: 16px;
        font-weight: 400;
        cursor: pointer;
        margin-top: 10px;
      }
    }

    .right {
      width: 135px;
      height: 38px;
      border-radius: 19px;
      background: #165360;
      text-align: center;
      line-height: 38px;
      font-family: "Microsoft YaHei";
      font-weight: 400;
      font-size: 16px;
      color: #fff;
      cursor: pointer;

      &:active {
        background-color: lighten(#165360, 10%);
        transition: background-color 0.2s ease;
      }
    }
  }
}
</style>
