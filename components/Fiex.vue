<template>
  <div class="fiex">


    <div class="item1">
      <img src="../static/img/fiexd_logo.png" alt="" >
    </div>
    <div class="item2">
      <div class="items" @click="tu">
        <img src="../static/img/wechat.png" alt="" >
        微信咨询
      </div>
      <div class="items" @click="alert">
        <img src="../static/img/call.png" alt="">
        电话咨询
      </div>
      <div class="items" @click="pushyan">
        <img src="../static/img/liuyan.png" alt="" >
        在线留言
      </div>
      <div class="items" style="border:none" @click="top">
        <img src="../static/img/top.png" alt="" >
        返回顶部
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Fiex",
    data() {
      return {}
    },
    props: {
      data: {
        tpye: Object,
        required: true
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      alert() {
        alert(`河马健康服务热线：\n`+ this.data.contact_number)
         
      },
      pushyan() {
        this.$emit("data-emitted", true)
      },
      tu() {
        this.$emit("data-emitted2", true)
      },
      top() {

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

</script>

<style lang="scss" scoped>
  @media (max-width:767px) {
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
        justify-content: space-between;

        .x {
          position: absolute;
          right: -33px;
          top: -93px;
          cursor: pointer;
        }
      }

    }

    .fiex {
      // width: 90px;
      height: 422px;
      position: fixed;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);

      .item1 {
        width: 51px;
        height: 56px;
        border-radius: 10px 10px 0 0;
        background: #155263ff;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 37px;
          height: 31px;
        }
      }

      .item2 {
        width: 50px;
        // height: 327px;
        background: #fff;
        display: flex;
        flex-direction: column;
        box-shadow: -3px 0px 3px rgba(0, 0, 0, 0.1), 3px 0px 3px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.1);
        img {
          width: 25px;
          height: 25px;
        }

        .items {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 60px;
          justify-content: center;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          cursor: pointer;
          font-size: 12px;
        }
      }
    }

  }

  @media (min-width:768px) {
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
        align-items: center;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;

        .x {
          position: absolute;
          right: -33px;
          top: -93px;
          cursor: pointer;
        }
      }

    }

    .fiex {
      width: 110px;
      height: 422px;
      position: fixed;
      right: 54px;
      top: 50%;
      transform: translateY(-50%);

      .item1 {
        width: 91px;
        height: 76px;
        border-radius: 10px 10px 0 0;
        background: #155263ff;
        display: flex;
        justify-content: center;
        align-items: center;
        
        img {
          width: 63px;
          height: 55px;
        }
      }

      .item2 {
        width: 91px;
        height: 327px;
        background: #fff;
        display: flex;
        flex-direction: column;
        box-shadow: -3px 0px 3px rgba(0, 0, 0, 0.1), 3px 0px 3px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.1);

        .items {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 80px;
          justify-content: center;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }
      }
    }

  }

</style>
