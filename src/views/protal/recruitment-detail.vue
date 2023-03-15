<template>
  <div>
    <img :src="require(`@/assets/img/ct${data.category}.png`)" class="adv-top" />
    <div class="div-center container">
      <div class="breadcrumb">
        您当前位置：
        <a @click="$router.push('/recruitment')">人才招聘</a>
        <el-icon><arrow-right /></el-icon>
        <span>{{ data.title }}详情</span>
      </div>
      <div class="line">
        <hr />
        <span data-aos="fade-down"> DETAILS</span>
        <hr />
      </div>
      <div class="detail">
        <h2 class="title">{{ data.title }}</h2>
        
        <div v-html="data.content"></div>
      </div>
      <div class="pn">
        <a
          v-if="pre != null"
          @click="clickPreNext(pre.id)"
        >
          上一篇:{{ pre.title.slice(0, 15) }}
          <span v-if="pre.title.length > 15">...</span>
        </a>
        <a
          v-if="next != null"
          @click="clickPreNext(next.id)"
        >
          下一篇:{{ next.title.slice(0, 15) }}
          <span v-if="next.title.length > 15">...</span>
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ArrowRight } from "@element-plus/icons-vue";
</script>
<script>
import { getDetail, getList } from "@/api/protal";
export default {
  data() {
    return {
      data: {},
      pre: null,
      next: null,
    };
  },
  methods: {
     clickPreNext(id){
         this.load(id);
         this.$router.replace(`/recruitment/detail/${id}`);
     },
    load(id) {
      getDetail(id).then((res) => {
        this.data = res.data;
        //获取上一篇
        getList({
          pageNum: 1,
          pageSize: 1,
          category: this.data.category,
          endTime: this.data.createTime,
        }).then((res) => {
          if (res.total > 0) {
            this.pre = res.data[0];
          }else{
              this.pre=null;
          }
        });
        //获取下一篇
        getList({
          pageNum: 1,
          pageSize: 1,
          category: this.data.category,
          startTime: this.data.createTime,
          sort: "asc",
        }).then((res) => {
          if (res.total > 0) {
            this.next = res.data[0];
          }else{
              this.next=null;
          }
        });
      });
    },
  },
  created(){
       let id = this.$route.params.id;
       this.load(id);
  },
  mounted() {},
};
</script>

<style lang="scss"  scoped>

</style>