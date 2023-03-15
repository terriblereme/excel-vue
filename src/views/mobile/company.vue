<template>
  <div>
    <div class="header">
      <img src="@/assets/logo.png" />
      <span>
        <p>厦门海鑫金融保安守押有限公司</p>
        <p>Xiamen Haixin financial security guard Co., Ltd</p>
      </span>
    </div>
    <div class="adv-top" :style="{'background-image':`url(${require(`@/assets/img/top2.png`)})`}"></div>
    <div class="div-center container">
      <div>
        <div class="title-en"><label>COMPANY</label>&emsp;PROFLILE</div>
        <div class="title-line">
          <hr />
          <span data-aos="fade-left">公司简介</span>
          <hr />
        </div>
      </div>
      <div class="nav">
        <div class="company-adv">
          <adv :id="3"></adv>
        </div>
        <div class="company-title">
          <p>About HaiXin</p>
          <p>厦门海鑫金融保安守押有限公司是厦门市唯一</p>
          <p>一家经福建省公安厅批准的从事武装守护押运的专业化国有资本公司</p>
        </div>
        <div class="company-intro">
          {{ company.intro }}
        </div>
        <div class="company-bottom">
          <div class="company-bottom-it">
            <p>押运服务</p>
            <p><label>24</label>小时</p>
          </div>
          <div class="company-bottom-it">
            <p>服务银行网点</p>
            <p><label>600</label>余家</p>
          </div>
          <div class="company-bottom-it">
            <p>服务企事业</p>
            <p><label>300</label>余个</p>
          </div>
        </div>
      </div>

      <div data-aos="fade-right" class="title-en">
        <label>HONORAPRY</label>&emsp;QUALIFICATION
      </div>
      <div class="title-line">
        <hr />
        <span data-aos="fade-left">荣誉资质</span>
        <hr />
      </div>
      <div class="nav">
        <div class="honorapry-text">
          &emsp;海鑫始终树立“<span>守押必须安全，安全就是效益</span>
          ”的观念，把安全工作作为公司工作开展的重心，公司全体人员认真履职，严格落实各项规章制度，实现了各项风险事故零发生，守护全市现金及贵重物品的流通安全，为保障全市金融业的健康发展做出积极贡献，努力实现社会效益和经济效益的双丰收。
        </div>
        <div class="glory-card">
          <adv :id="1" cardType="card"></adv>
        </div>
      </div>

      <div data-aos="fade-right" class="title-en">
        <label>INTRODUCTION</label> VIDEO
      </div>
      <div class="title-line">
        <hr />
        <span data-aos="fade-left">宣传视频</span>
        <hr />
      </div>
      <div style="text-align: center;margin:auto;">
        <video height='100%' width='100%' src="http://www.hxjrsy.com/uploads/HXvideo.mp4" controls="controls">
        </video>
      </div>

      <div data-aos="fade-right" class="title-en">
        <label>COOPERATIVE</label>&emsp;PARTNER
      </div>
      <div class="title-line">
        <hr />
        <span data-aos="fade-left">合作伙伴</span>
        <hr />
      </div>
      <div class="nav">
        <div class="partner-text">
          中国银行、农业银行、工商银行、建设银行、交通银行等分行级29家专业银行，银行的服务网点600多个
        </div>
        <img src="@/assets/img/partner.png" class="parter-img" />
      </div>
    </div>
  </div>
</template>
<script>
import adv from "@/components/adv.vue";
import { getCompany } from "@/api/protal";
export default {
  components: {
    adv,
  },
  data() {
    return {
      flag: true,
      company: {},
    };
  },
  methods: {
    loadCompany() {
      getCompany(1).then((res) => {
        this.company = res.data;
      });
    },
  },
  mounted() {
    this.loadCompany();
  },
};
</script>

<style lang="scss"  scoped>
.container {
  .glory-card {
    height: 23.4375vw;
  }
  .company-adv {
    height: 46.6667vw;
  }
  .company-title {
    text-align: center;
    padding: 3.3333vw 0;
    p {
      color: #1f1f1f;
      font-size: 2.4vw;
      line-height: 1.5;
      &:first-child {
        color: #1f1f1f;
        font-size: 6.6667vw;
        font-weight: 800;
        margin-bottom: 0.8854vw;
      }
    }
  }
  .company-intro {
    font-size: 3.7333vw;
    line-height: 1.5;
    text-indent: 2em;
  }
  .company-bottom {
    padding: 2.6042vw 0;
    font-size: 0.8333vw;
    .company-bottom-it {
      text-align: center;
      width: 33%;
      display: inline-block;
      p {
        color: #007bff;
        font-size: 2.4vw;
        margin: 10px 0;
        &:first-child {
          color: #999999;
          font-size: 2.6667vw;
        }
        label {
          margin-right: 0.6667vw;
          font-size: 5.8667vw;
          font-weight: bold;
        }
      }
    }
  }
  .honorapry-text {
    color: #333333;
    font-size: 3.7333vw;
    line-height: 1.5;
    margin-bottom: 2.6042vw;
     text-indent: 2em;
    span {
      color: #007bff;
      font-weight: bold;
    }
  }
  .partner-text {
    font-size: 3.7333vw;
    text-indent: 2em;
    margin-bottom: 2.6042vw;
  }
  .parter-img {
    width: 100%;
  }
}
</style>