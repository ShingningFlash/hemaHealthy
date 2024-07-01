<template>
  <div>
    <div v-if="CasesDetail != ''">
      <!-- <div class="img"> -->
      <!-- <nuxt-img :src="CasesDetail.img" style="width:100%;height: 100%;"
          :options="{ quality: 75, formats: ['webp', 'jpeg'], blur: 10, placeholder: true }" provider="twicpics" lazy
          blur-up /> -->
      <!-- </div> -->
      <div class="txt">
        河马健康耳鸣服务案例全部属于真实案例，如有虚假，我司愿承担一切相关责任！愿接受所有患者与社会各界的监督！
      </div>


      <div class="title">
        {{ CasesDetail.title }}
      </div>
      <div class="futitle" style="">发表于 {{ CasesDetail.addTime }}</div>
      <div class="line"></div>
      <div class="content" v-html="CasesDetail.content"></div>
      <div class="line"></div>
      <div class="box">
        <div class="left">
          <div class="prev" v-if="prev == null || prev == 'null'">上一篇：没有了!</div>
          <div class="prev1" v-else @click="other(prev.id)">上一篇：{{ prev.title }}</div>
          <div class="next" v-if="next == null || next == 'null'">下一篇：没有了!</div>
          <div class="next1" v-else @click="other(next.id)">下一篇：{{ next.title }} </div>
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
    name: 'ServiceDetail',
    data() {
      return {
        CasesDetail: [],
        next: [],
        prev: [],
        currentUrl: '/api/casesDetail/id/'
      }
    },
    mounted() {
      this.getCasesDetail()
    },
    methods: {
      textRach(textArea) {
        let text = textArea
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/gi, '<img$1')
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/gi, '<img$1')
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/gi, '<img$1')
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/gi, '<img$1')
          .replace(/<img([\s\w"-=\/\.:;]+)/gi, '<img style="max-width: 100%;display:inline-block" $1')
          .replace(/<video([\s\w"-=\/\.:;]+)/gi, '<video style="max-width: 100%;display:inline-block" $1')
        return text
      },
      async other(id) {
        const formData = new FormData()
        this.id = id
        formData.append('id', id)
        const data = await this.$indexApi.getCasesDetail(this.currentUrl + id)
        let sss = data.row.data
        if (sss.content != '') {
          sss.content = this.textRach(sss.content)
        }
        this.CasesDetail = sss
        this.next = data.row.next
        this.prev = data.row.last
      },
      //   获取
      async getCasesDetail() {
        const formData = new FormData()
        const data = await this.$indexApi.getCasesDetail(this.currentUrl + this.id)
        let sss = data.row.data
        if (sss.content != '') {
          sss.content = this.textRach(sss.content)
        }
        this.CasesDetail = sss
        this.next = data.row.next
        this.prev = data.row.last
      },

      back() {
        this.$emit("data-emitted", false)
      }
    }
  }

</script>

<style lang="scss" scoped>
  @media (max-width: 767px) {
    .txt {
      width: 100%;
      //   background: #efefefff;
      font-weight: 700;
      color: #ff0000;
      font-size: 16px;
      //   text-align: center;
      //   line-height: 30px;
      margin-top: 5px;
      padding: 0 20px;
      box-sizing: border-box;
      margin-top: 20px;
    }

    .futitle {
      text-align: center;
      font-size: 18px;
      color: #666;
      margin-top: 14px;
    }

    .img {
      width: 789px;
      height: 609px;
      margin: 0 auto;
      margin-top: 68px;
    }

    .line {
      width: 100%;
      padding: 0 1.333vmin;
      height: 0;
      border: 1px dashed #cbcbcb;
      margin: 0 auto;
      margin-top: 20.5px;
      margin-bottom: 35.5px;
    }

    .title {
      font-family: "PingFang SC Bold";
      font-weight: 700;
      font-size: 24px;
      text-align: center;
      color: #000;
      margin-top: 21px;
    }

    .content {
      // width: 1200px;
      font-family: "PingFang SC";
      font-weight: 400;
      font-size: 12px;
      line-height: 30px;
      color: #2e2e2e;
      margin: 0 auto;
      padding:0 20px;

    }

    .box {
      padding: 0 1.333vmin;
      // width: 1200px;
      display: flex;
      margin: 0 auto;
      justify-content: space-between;
      margin-bottom: 100px;

      .left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .prev,
        .next {
          color: #7e7e7eff;
          font-size: 12px;
          font-weight: 400;
          margin-top: 10px;
        }

        .prev1,
        .next1 {
          color: #333333;
          font-size: 12px;
          font-weight: 400;
          cursor: pointer;
          margin-top: 10px;
        }
      }

      .right {

        width: 83px;
        height: 37px;
        border-radius: 28px 28px 28px 28px;
        background: #ffffffff;
        text-align: center;
        line-height: 37px;
        font-weight: 400;
        font-size: 12px;
        color: #184E6A;
        border: 1px solid #184E6A;
        cursor: pointer;

        &:active {
          background-color: lighten(#184E6A, 10%);
          transition: background-color 0.2s ease;
        }
      }
    }
  }

  @media (min-width: 1200px) {
    .txt {
      width: 100%;
      //   background: #efefefff;
      //   font-size: 18px;
      //   text-align: center;
      font-size: 20px;
      font-weight: 700;
      color: #FF0000;
      width: 1200px;
      margin: 0 auto;
      margin-top: 51px;

    }

    .futitle {
      text-align: center;
      font-size: 18px;
      color: #666;
      margin-top: 24px;
    }

    .img {
      width: 789px;
      height: 609px;
      margin: 0 auto;
      margin-top: 68px;
    }

    .line {
      width: 1200px;
      padding: 0 1.333vmin;
      height: 0;
      border: 1px dashed #cbcbcb;
      margin: 0 auto;
      margin-top: 20.5px;
      margin-bottom: 35.5px;
    }

    .title {
      font-family: "PingFang SC Bold";
      font-weight: 700;
      font-size: 24px;
      text-align: center;
      color: #000;
      margin-top: 61px;
    }

    .content {
      width: 1200px;
      font-family: "PingFang SC";
      font-weight: 400;
      font-size: 18px;
      line-height: 30px;
      color: #2e2e2e;
      margin: 0 auto;

    }

    .box {
      padding: 0 20px;
      width: 1200px;
      display: flex;
      margin: 0 auto;
      justify-content: space-between;
      margin-bottom: 100px;

      .left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .prev,
        .next {
          color: #7e7e7eff;
          font-size: 18px;
          font-weight: 400;
          margin-top: 10px;
        }

        .prev1,
        .next1 {
          color: #333333;
          font-size: 18px;
          font-weight: 400;
          cursor: pointer;
          margin-top: 10px;
        }
      }

      .right {

        width: 203px;
        height: 57px;
        border-radius: 28px 28px 28px 28px;
        background: #ffffffff;
        text-align: center;
        line-height: 57px;
        font-weight: 400;
        font-size: 18px;
        color: #184E6A;
        border: 1px solid #184E6A;
        cursor: pointer;

        &:active {
          background-color: lighten(#184E6A, 10%);
          transition: background-color 0.2s ease;
        }
      }
    }
  }

</style>
