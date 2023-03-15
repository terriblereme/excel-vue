<template>
  <div class="con-main">
    <div class="guard">
      <van-search
        v-model="searchForm.keyword"
        placeholder="请输入关键字"
        @search="reload"
      />
      <div class="no-data" v-if="list.length == 0">
        <img src="@/assets/img/no-data3.png" />
      </div>
      <van-list
        v-model:loading="loading"
        :finished="finished"
        :finished-text="finishedText"
        @load="nextLoad"
      >
        <div v-for="item in list" :key="item">
          <div class="guard-item">
            <div class="guard-item-l">
              <h5>车牌号：{{ item.visitingVehicle }}</h5>
              <p>受访人：{{ item.intervieweeName }}</p>
              <p>访问时间：{{ item.visitingTime }}</p>
            </div>
            <div class="guard-btn">
              <img
                :src="require(`../../../assets/img/state-${item.state}.png`)"
              />
            </div>
          </div>
          <p v-if="item.state == 2" class="exit-btn">
            <label @click="handleSave(item.id)">我已离开</label>
          </p>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { registerList, registerExit } from "@/api/protal";
export default {
  data() {
    return {
      searchForm: {
        keyword: "",
        openid: "",
        pageNum: 0,
        pageSize: 5,
      },
       finishedText: "",
      finished: false,
      loading: false,
      list: [],
    };
  },
  methods: {
     reload() {
      this.searchForm.pageNum = 1;
      this.list = [];
      this.loadList();
    },
    nextLoad() {
      this.searchForm.pageNum += 1;
      this.loadList();
    },
    loadList() {
      this.loading = true;
      this.finished = false;
      registerList(this.searchForm).then((res) => {
        this.loading = false;
         if (res.total == 0) {
          this.finishedText = "- 暂无记录 -";
        } else {
          this.finishedText = "- 暂无更多 -";
        }
        this.list = this.list.concat(res.data);
        if (res.totalPage <= this.searchForm.pageNum) {
          this.finished = true;
        }
      });
    },
    handleSave(id) {
      registerExit({ id: id }).then(() => {
        this.reload();
      });
    },
  },
  created() {
    this.searchForm.openid = this.$store.state.openid;
  },
};
</script>

<style lang="scss" scoped>
.no-data {
  width: 54.9333vw;
  height: 38.6667vw;
  margin: auto;
  text-align: center;
  img {
    width: 100%;
    height: 100%;
  }
  span {
    color: #bababa;
  }
}
.van-search {
  padding: 0;
  border-radius: 2vw;
}
::v-deep .van-search__content {
  background: #fff !important;
}
.guard-item {
  background: #fff;
  display: flex;
  justify-content: space-between;
  margin-top: 3.3333vw;
  border-radius: 2vw;
  .guard-item-l {
    padding: 2.6667vw 4vw;
    color: #6f6f6f;
    font-size: 2.9333vw;
    font-weight: 500;
    h5 {
      margin-bottom: 1.3333vw;
      color: #000000;
      font-size: 4.1333vw;
    }
  }
  .guard-btn {
    display: flex;
    align-items: center;
    padding-right: 4vw;
    img {
      width: 12.9333vw;
      height: 12.9333vw;
    }
  }
}
.exit-btn {
  color: #3699ff;
  font-weight: bold;
  font-size: 2.1333vw;
  text-align: right;
  padding-right: 4vw;
  margin-top: 2.2667vw;
  label {
    border-bottom: 1px solid #3699ff;
  }
}
</style>