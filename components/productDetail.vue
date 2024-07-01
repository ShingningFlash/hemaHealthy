
<template>
  <div>
    <div v-if="ProductDetail != ''" style="margin-top:100px;
    margin-bottom:100px;">


      <div class="title">
        {{ ProductDetail.name }}
      </div>
      <div class="line1"></div>
      <div class="content" v-html="ProductDetail.content"></div>
      <div class="line"></div>
      <div class="box">
          <div class="left">
            
          </div>
          <div class="right" @click="back">RETURN</div>
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
    name: 'ProductDetail',
    data() {
      return {
        ProductDetail: {},
        next: [],
        prev: []
      }
    },
    mounted() {
      this.getProductDetail()
    },
    methods: {

      textRach(textArea) {
        let text = textArea
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/gi, '<img$1')
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/gi, '<img$1')
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/gi, '<img$1')
          .replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/gi, '<img$1')
          .replace(/<img([\s\w"-=\/\.:;]+)/gi, '<img style="max-width: 100%;display:inline-block" $1')
        return text
      },
      //   获取
      async getProductDetail() {
        const formData = new FormData()
        formData.append('id', this.id)
        const data = await this.$indexApi.getProductDetail(formData)
        if (data.row.content != '') {
            data.row.content = this.textRach(data.row.content)
        }
        this.ProductDetail = data.row
        //   this.next = data.next
        //   this.prev = data.prev
      },

      back() {
        this.$emit("data-emitted", false)
      }
    }
  }

</script>

<style lang="scss" scoped>
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
    margin-top: 63.5px;
    margin-bottom: 35.5px;
  }

  .line1 {
    width: 52px;
    height: 2px;
    background: #0d7111;
    margin: 0 auto;
    margin-top: 15px;
    margin-bottom: 39px;
  }

  .title {
    font-family: "PingFang SC Bold";
    font-weight: 700;
    font-size: 24px;
    text-align: center;
    color: #000;
  }

  .content {
    width: 1600px;
    font-family: "PingFang SC";
    font-weight: 400;
    font-size: 16px;
    line-height: 30px;
    color: #2e2e2e;
    margin: 0 auto;
    // display: flex;
    // justify-content: center;
    
  }

  .box {
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
      background: #0d7111;
      text-align: center;
      line-height: 38px;
      font-family: "Microsoft YaHei";
      font-weight: 400;
      font-size: 16px;
      color: #fff;
      cursor: pointer;

      &:active {
        background-color: lighten(#0d7111, 10%);
        transition: background-color 0.2s ease;
      }
    }
  }

</style>
