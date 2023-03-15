<template>
  <div>
    <img src="@/assets/img/top5.png" class="adv-top" />
    <div class="div-center container">
      <div class="tabs-top">
        <a :class="{'is-active':category==item.id}" v-for="item in $consts.activityCategorys" :key="item.id"  @click="clickCategory(item.id)">
          <span>{{ item.name}} </span>
        </a>
      </div>
      <div class="content-list">
        <ul>
          <li
            v-for="(item, index) in list"
            :key="index"
            @click="$router.push(`/activity/detail/${item.id}`)"
          >
            <div class="item-left">
              <img :src="item.img" v-if="item.img" />
            </div>
            <div class="item-right">
              <div class="item-title">
                <h3>{{ item.title }}</h3>
                <div>
                  <a class="btn-a btn-right-up"
                    ><el-icon><caret-right /></el-icon>详情</a
                  >
                </div>
              </div>

              <p>{{ item.intro }}</p>
              <p>时间：{{ item.createTime }}</p>
            </div>
          </li>
           <li></li>
        </ul>
      </div>
      <div class="protal-page">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="10"
          :total="total"
          @current-change="loadList"
          prev-text="上一页"
          next-text="下一页"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script setup>
import { CaretRight } from "@element-plus/icons-vue";
</script>
<script>
import { getList } from "@/api/protal";
export default {
  data() {
    return {
      category: 2,
      total: 0,
      list: [],
    };
  },
  methods: {
    loadList(pageNum) {
      getList({ pageNum: pageNum, pageSize: 10, category: this.category }).then((res) => {
        this.list = res.data;
        this.total = res.total;
      });
    },
    clickCategory(category){
      this.category = category;
      this.loadList(1);
    }
  },
  mounted() {
    this.loadList(1);
  },
  created(){
    let category = this.$route.query.category;
     if(!category||!this.$consts.activityCategorys.find(item =>item.id==category)){
       category = this.$consts.activityCategorys[0].id;
     }
     this.category = category;
  },
};
</script>

<style lang="scss"  scoped>
</style>