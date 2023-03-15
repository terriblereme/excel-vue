<template>
  <div>
    <img src="@/assets/img/ct3.png" class="adv-top" />
    <div class="div-center container">
      <div class="content-list">
        <ul>
          <li
            v-for="(item, index) in list"
            :key="index"
            @click="$router.push({ path: `/partybuilding/detail/${item.id}` })"
          >
            <div class="item-left">
              <div class="content-date" v-if="item.img === null || item.img === ''">
                <p>{{ item.createTime.slice(8, 10) }}</p>
                {{ item.createTime.slice(0, 7) }}
              </div>
              <img :src="item.img" v-else />
            </div>
            <div class="item-right">
               <div class="item-title">
                <h3>{{ item.title }}</h3>
              </div>
              <p>{{ item.intro }}</p>
              <p>{{ item.createTime.slice(0, 10) }}</p>
              <a class="btn-a btn-bottom"><el-icon><caret-right /></el-icon>详情</a>
            </div>
          </li>
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
      total: 0,
      list: [],
    };
  },
  methods: {
    loadList(pageNum) {
      getList({ pageNum: pageNum, pageSize: 10, category: "3" }).then((res) => {
        this.list = res.data;
        this.total = res.total;
      });
    },
  },
  mounted() {
    this.loadList(1);
  },
};
</script>

<style lang="scss"  scoped>

</style>