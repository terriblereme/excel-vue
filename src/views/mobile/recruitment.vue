<template>
  <div>
    <div class="header">
      <img src="@/assets/logo.png" />
      <span>
        <p>厦门海鑫金融保安守押有限公司</p>
        <p>Xiamen Haixin financial security guard Co., Ltd</p>
      </span>
    </div>
     <div class="adv-top" :style="{'background-image':`url(${require(`@/assets/img/ct4.png`)})`}"></div>
    <div class="div-center container">
      <div>
        <div class="title-en"><label>TALENT</label>&emsp;RECRUITMENT</div>
        <div class="title-line">
          <hr />
          <span data-aos="fade-left">人才招聘</span>
          <hr />
        </div>
      </div>
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text=""
          @load="loadList"
          class="content-list"
        >
          <div v-for="item in list" :key="item" class="list-item nav" @click="$router.push(`/mobile/detail/${item.id}`)">
            <p class="item-title">{{ item.title }}</p>
            <hr>
            <span>岗位要求</span>
            <p>{{ item.intro }}</p>
          </div>
        </van-list>
      </div>
    </div>
</template>
<script>
import { getList } from "@/api/protal";
export default {
  data() {
    return {
      list: [],
      pageNum: 0,
      finished: false,
      loading: false,
    };
  },
  methods: {
    loadList() {
      this.pageNum++;
      this.loading = true;
      getList({ pageNum: this.pageNum, pageSize: 5, category: "4" }).then(
        (res) => {
          this.loading = false;
          this.list = this.list.concat(res.data);
          if (res.totalPage <= this.pageNum) {
            this.finished = true;
          }
        }
      );
    },
  },
  mounted() {},
};
</script>

<style lang="scss"  scoped>
.content-list {
  .list-item {
    margin-bottom: 5.3333vw;
    .item-title {
      color: #277FFF;
      text-align: center;
      font-size: 7.6vw;
      padding: 4.6667vw 0;
      font-weight: bold;
    }
    hr{
       border:0.0521vw solid #277FFF;
    }
    span{
        color: #000;
        font-size: 4.4vw;
        font-weight: 500;
        margin:4vw 0;
        display: block;
    }
    p {
      color: #808080;
      font-size: 2.4vw;
      line-height: 1.5;
      padding-bottom: 1.3333vw;
       white-space: pre-line;
    }
  }
}
</style>