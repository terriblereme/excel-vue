<template>
  <div>
    <img src="@/assets/img/top2.png" class="adv-top" />
    <div class="div-center container">
      <div class="tabs-top">
        <a class="is-active"> <span>关于海鑫</span> </a>
        <a @click="$router.push('/company/culture')"> <span>海鑫文化</span>  </a>
      </div>
      <div>
        <div  class="title-en">
        <label>COMPANY</label>&emsp;PROFLILE
      </div>
      <div class="title-line">
        <hr />
        <span data-aos="fade-left">公司简介</span>
        <hr />
      </div>
      </div>

      <el-row>
        <el-col :span="12">
          <adv :id="3" ></adv>
        </el-col>
        <el-col :span="12" class="company-right">
          <p>About HaiXin</p>
          <p>厦门海鑫金融保安守押有限公司是厦门市唯一一家经福建</p>
          <p>省公安厅批准的从事武装守护押运的专业化国有资本公司
          </p>
        </el-col>
      </el-row>
      <el-row class="company-bottom">
        <el-col :span="12"
          >{{company.intro}}</el-col
        >
        <el-col :span="4" data-aos="zoom-in">
          <p>押运服务</p>
          <p><label>24</label>小时</p></el-col
        >
        <el-col :span="4" data-aos="zoom-in"
          ><p>服务银行网点</p>
          <p><label>600</label>余家</p></el-col
        >
        <el-col :span="4" data-aos="zoom-in"
          ><p>服务企事业</p>
          <p><label>300</label>余个</p></el-col
        >
      </el-row>
      <div data-aos="fade-right" class="title-en">
        <label>HONORAPRY</label>&emsp;QUALIFICATION
      </div>
      <div class="title-line">
        <hr />
        <span data-aos="fade-left">荣誉资质</span>
        <hr />
      </div>
 
      <div class="honorapry-text">
        &emsp;海鑫始终树立“<span>守押必须安全，安全就是效益</span>
        ”的观念，把安全工作作为公司工作开展的重心，公司全体人员认真履职，严格落实各项规章制度，实现了各项风险事故零发生，守护全市现金及贵重物品的流通安全，为保障全市金融业的健康发展做出积极贡献，努力实现社会效益和经济效益的双丰收。
      </div>
      <div class="glory-card">
           <adv :id="1" cardType="card"></adv>
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
      <iframe
          height='987'
          width='100%'
          src="https://player.youku.com/embed/XNTkyNDI1NzcyNA==?qq-pf-to=pcqq.c2c"
          frameborder="0"
      ></iframe>
    </div>

           <div data-aos="fade-right" class="title-en">
        <label>COOPERATIVE</label>&emsp;PARTNER
      </div>
      <div class="title-line">
        <hr />
        <span data-aos="fade-left">合作伙伴</span>
        <hr />
      </div>
      <div class="partner-text">
        中国银行、农业银行、工商银行、建设银行、交通银行等分行级29家专业银行，银行的服务网点600多个
      </div>
      <img src="@/assets/img/partner.png" class="parter-img" />
    </div>
  </div>
</template>
<script>
import adv from "@/components/adv.vue";
import { mapState } from "vuex";
export default {
  computed:{
     ...mapState(["company"]),
  },
  components: {
    adv,
  },
  data() {
    return {
      flag: true,
    };
  },
  methods: {},
};
</script>

<style lang="scss"  scoped>
.container {
    .glory-card{
    height: 23.4375vw;
  }
  .company-right {
    background-color: #ffd282;
    padding: 7.3958vw 4.1667vw;
    p {
      color: #1f1f1f;
      font-size: 0.9375vw;
      padding: 0.2604vw 0;
      &:first-child {
        color: #1f1f1f;
        font-size: 2.6042vw;
        font-weight: 800;
        margin-bottom: 0.8854vw;
      }
    }
  }
  .company-bottom {
    padding: 2.6042vw 0;
    background-color: #f9f9f9;
    font-size: 0.8333vw;
    .el-col {
      text-align: center;
      p {
        color: #007bff;
        font-size: 0.9375vw;
        padding:0.1042vw 0;
        &:first-child {
          margin-top: 2.6563vw;
          color: #999999;
          font-size: 1.0417vw;
        }
        label {
          font-size: 2.2917vw;
        }
      }
      &:first-child {
        padding: 0;
        text-indent:2em;
        text-align: left;
        line-height: 1.5;
      }
    }
  }
  .honorapry-text {
    color: #666666;
    font-size: 0.8333vw;
    line-height: 1.5;
    margin-bottom: 2.6042vw;
    span {
      color: #0352b3;
    }
  }
  .partner-text {
    color: #666666;
    font-size: 0.8333vw;
    margin-bottom: 2.6042vw;
    text-align: center;
  }
  .parter-img {
    width: 100%;
  }
}
</style>