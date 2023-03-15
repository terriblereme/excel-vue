<template>
  <div>
    <div class="header">
      <img src="@/assets/logo.png" />
      <span>
        <p>厦门海鑫金融保安守押有限公司</p>
        <p>Xiamen Haixin financial security guard Co., Ltd</p>
      </span>
    </div>
    <div
      class="adv-top"
      :style="{
        'background-image': 'url('+require(`@/assets/img/activity${category}.png`)+')',
      }"
    ></div>
    <div class="div-center container">
      <!-- <div>
        <div class="title-en"><label>COMPANY</label>&emsp;CULTURE</div>
        <div class="title-line">
          <hr />
          <span data-aos="fade-left">公司文化</span>
          <hr />
        </div>
      </div> -->
      <div class="nav">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text=""
          @load="loadList"
          class="content-list"
        >
          <div
            v-for="item in list"
            :key="item"
            class="list-item"
            @click="$router.push(`/mobile/detail/${item.id}`)"
          >
            <div class="item-img">
              <img :src="item.img" v-if="item.img" />
            </div>
            <p class="item-title">{{ item.title }}</p>
            <p class="ellipsis" v-if="item.intro">{{ item.intro }}</p>
            <p>时间：{{ item.createTime }}</p>
            <div class="line"></div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import { getList } from "@/api/protal";
export default {
  data() {
    return {
      category:2,
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
      getList({ pageNum: this.pageNum, pageSize: 5, category: this.category }).then(
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
  mounted() {
         let category = this.$route.query.category;
     if(!category||!this.$consts.activityCategorys.find(item =>item.id==category)){
       category = this.$consts.activityCategorys[0].id;
     }
     this.category = category;
  },
  created(){

  },
};
</script>

<style lang="scss"  scoped>
.content-list {
  .list-item {
    padding-bottom: 2.6667vw;
    .item-img {
      img {
        width: 100%;
      }
      div {
        background: #0173ff;
        color: #fff;
        text-align: center;
        font-size: 6.6667vw;
        padding: 13.3333vw 0;
        p {
          color: #fff;
          font-size: 6.6667vw;
          font-weight: bold;
          padding: 1.3333vw 0;
        }
      }
    }

    .item-title {
      color: #000000;
      font-size: 3.7333vw;
      padding: 1.3333vw 0;
      font-weight: 400;
    }
    p {
      color: #808080;
      font-size: 2.4vw;
      padding-bottom: 1.3333vw;
    }
    .line{
      border-bottom: 1px dashed #e6e5e5fa;
      margin: 1.3333vw 0;
    }
  }
}
</style>