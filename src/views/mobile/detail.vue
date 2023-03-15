<template>
  <div>
    <div class="header">
      <img src="@/assets/logo.png" />
      <span>
        <p>厦门海鑫金融保安守押有限公司</p>
        <p>Xiamen Haixin financial security guard Co., Ltd</p>
      </span>
    </div>
    <div class="adv-top" :style="{'background-image':`url(${require(`@/assets/img/ct${data.category}.png`)})`}" v-if="data.category"></div>
    <div class="div-center container">
      <div class="nav content-detail">
          <p class="detail-title">{{data.title}}</p>
           <div v-html="data.content" class="detail-info"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { getDetail } from "@/api/protal";
export default {
  data() {
    return {
      data: {},
      loading: false,
    };
  },
  methods: {
    load(id) {
      this.loading = true;
      getDetail(id).then((res) => {
        this.data = res.data;
      });
    },
  },
   created() {
    let id = this.$route.params.id;
    this.load(id);
  },
  mounted() {},
};
</script>
<style lang="scss"  scoped>
.content-detail{
  .detail-title{
    font-size: 4.2667vw;
    color: #000;
    margin-bottom: 4vw;
    text-align: center;
  }
  .detail-info{
    font-size: 3.7333vw;
    color: #808080;
    ::v-deep img{
      max-width: 100%;
    }
  }
}
</style>