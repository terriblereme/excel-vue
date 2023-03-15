<template>
  <div class="bg-white">
    <img src="@/assets/img/ct6.png" class="adv-top" />
    <div class="div-center container">
      <div data-aos="fade-right" class="title-en">
        <label>SERVICE</label>&emsp;COMMITMENT
      </div>
      <div class="title-line">
        <hr />
        <span data-aos="fade-left">服务承诺</span>
        <hr />
      </div>
      <div class="service-list">
        <div class="service-item">
          <img src="@/assets/img/bus-icon5.png" />
          <h3>安全</h3>
          <p>全副武装、训练有素、最严密的安全措施、各项风险事故零发生</p>
        </div>
        <div class="service-item">
          <img src="@/assets/img/bus-icon2.png" />
          <h3>准点</h3>
          <p>运送过程由精密的调度联络系统记录及追踪</p>
        </div>
        <div class="service-item">
          <img src="@/assets/img/bus-icon3.png" />
          <h3>优质</h3>
          <p>独特的监督审查、押运规范、交接服务程序及保障措施</p>
        </div>
        <div class="service-item">
          <img src="@/assets/img/bus-icon4.png" />
          <h3>高效</h3>
          <p>常备应急机动队，突发事件或紧急情况,及时应急处理和增援</p>
        </div>
        <div class="service-item">
          <img src="@/assets/img/bus-icon1.png" />
          <h3>使命</h3>
          <p>守押必须安全 安全就是效益</p>
        </div>
      </div>

      <div data-aos="fade-right" class="title-en">
        <label>CORPORATE</label>&emsp;BUSINESS
      </div>
      <div class="title-line">
        <hr />
        <span data-aos="fade-left">公司业务</span>
        <hr />
      </div>
      <div class="business-list">
        <div class="business-item" v-for="(item, index) in list" :key="index">
          <img :src="item.img" data-aos="fade-left" />
          <div data-aos="fade-right">
            <h3>>></h3>
            <h3>{{ item.title }}</h3>
            <h3>{{ item.intro }}</h3>
            <p v-html="item.content"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="div-center container">
        <div data-aos="fade-right" class="title-en">
          <label>SERVICE</label>&emsp;PROCESS
        </div>
        <div class="title-line">
          <hr />
          <span data-aos="fade-left">服务流程</span>
          <hr />
        </div>
        <div class="block-process">
          <ul>
            <li v-for="(item, index) in process" :key="index">
              <div class="item-blank">
                <div class="item-line"></div>
                <div class="item-dots"></div>
                <div class="item-step">{{ item.timestamp }}</div>
                <div class="item-content">{{ item.content }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getList } from "@/api/protal";
export default {
  data() {
    return {
      list: [],
      process: [
        {
          content: "签订合约",
          timestamp: "第一",
        },
        {
          content: "制定押运路线，合理调动人员、车辆",
          timestamp: "第二",
        },
        {
          content: "押运服务在最严密的安全措施运送",
          timestamp: "第三",
        },
        {
          content: "运送过程由精密的调度联络系统记录及追踪",
          timestamp: "第四",
        },
        {
          content: "所有工作人员均接受定期及突击检查",
          timestamp: "第五",
        },
        {
          content: "制定押运路线，合理调动人员、车辆",
          timestamp: "第六",
        },
        {
          content: "押运服务在最严密的安全措施下运送",
          timestamp: "第七",
        },
        {
          content: "运送过程由精密的调度联络系统记录及追踪",
          timestamp: "第八",
        },
        {
          content: "所有工作人员均接受定期及突击检查",
          timestamp: "第九",
        },
      ],
    };
  },
  methods: {},
  mounted() {
    getList({ category: "6" }).then((res) => {
      this.list = res.data;
    });
  },
};
</script>

<style lang="scss"  scoped>
.container {
  .service-list {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    .service-item {
      border: 0.0521vw solid #e6e6e6;
      margin: 0.9115vw;
      text-align: center;
      width: 20%;
      padding: 1.3021vw;
      font-size: 0.7292vw;
      img{
        width: 3.75vw;
        height: 3.75vw;
      }
      h3 {
        margin: 0.9375vw;
        font-size: 0.9375vw;
      }
    }
  }
  .business-list {
    .business-item {
      color: #333333;
      font-size: 1.1458vw;
      display: flex;
      align-items: flex-start;
      margin: 2.6042vw 0;
      img {
        width: 50%;
        display: inline-block;
        order: 2;
        &:hover {
          transform: scale(1.05);
        }
      }
      div {
        width: 50%;
        order: 1;
        display: inline-block;
        padding: 3.125vw;
        h3 {
          color: #043776;
        }
        p {
          line-height: 1.5;
          padding-top: 1.5625vw;
        }
      }
      &:nth-child(odd) {
        background-color: #f9f9f9;
        img {
          order: 1;
        }
        div {
          order: 2;
        }
      }
    }
  }
}
.footer {
  background: url(../../assets/img/bus-6.png) no-repeat center;
  background-size: cover;
  .block-process {
    ul {
      li {
        font-size: 0.8333vw;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        cursor: pointer;
        &:hover {
          color: #0677f8;
        }
        .item-blank {
          display: flex;
          text-align: left;
          width: 50%;
          position: relative;
          .item-line {
            height: calc(100%);
            top: calc(50%);
            border-left: 0.1042vw solid #0677f8;
            position: absolute;
            left: -0.0521vw;
          }
          .item-dots {
            width: 0.625vw;
            height: 0.625vw;
            background-color: #0677f8;
            border-radius: 50%;
            position: absolute;
            left: -0.3125vw;
            top: calc(50%);
            &:hover {
              width: 0.8333vw;
              height: 0.8333vw;
              left: -0.4167vw;
            }
          }
          .item-step {
            position: absolute;
            left: 1.0417vw;
            height: 100%;
            display: flex;
            align-items: center;
          }
          .item-content {
            background-color: #fff;
            box-shadow: 0.0521vw 0.1042vw 0.8333vw 0vw rgba(0, 0, 0, 0.07);
            border-radius: 0.2083vw;
            padding: 0.9375vw;
            width: calc(100% - 10.4167vw);
            margin: auto;
          }
        }
        &:nth-child(even) {
          justify-content: flex-start;
          .item-blank {
            text-align: right;
            .item-line {
              left: auto;
              right: -0.0521vw;
            }
            .item-dots {
              left: auto;
              right: -0.3125vw;
            }
            .item-step {
              left: auto;
              right: 1.0417vw;
            }
          }
        }
        &:last-child .item-blank .item-line {
          display: none;
        }
      }
    }
  }
}
</style>