<template>
  <div class="con-main">
    <div class="m-header">
      您好，{{ bsUser.nickName }}，<span
        @click="$router.push(`/mobile/editpsw`)"
        >修改密码，</span
      >
      <span @click="logout">退出</span>
    </div>
    <div class="guard" v-if="bsUser.deptId == 2">
      <van-search
        v-model="searchForm.visitingVehicle"
        placeholder="请输入车牌号"
        @search="reload"
      />
      <div class="no-data" v-if="list.length == 0">
        <img
          src="@/assets/img/no-data3.png"
          v-if="searchForm.visitingVehicle"
        />
        <img src="@/assets/img/no-data1.png" v-else />
      </div>
      <van-list
        v-model:loading="loading"
        :finished="finished"
        :finished-text="finishedText"
        @load="nextLoad"
      >
        <div v-for="item in list" :key="item" class="guard-item">
          <div class="guard-item-l">
            <h5>车牌号：{{ item.visitingVehicle }}</h5>
            <p>来访人：{{ item.visitingName }}</p>
            <p>来访时间：{{ item.visitingTime }}</p>
          </div>
          <div class="guard-btn" @click="handleSave(item.id, 4)">
            <span>离开</span>
          </div>
        </div>
      </van-list>
    </div>
    <div class="review" v-else>
      <div class="no-data" v-if="list.length == 0">
        <img src="@/assets/img/no-data2.png" />
      </div>
      <van-list
        v-model:loading="loading"
        :finished="finished"
        :finished-text="finishedText"
        @load="nextLoad"
      >
        <div v-for="item in list" :key="item" class="review-item">
          <p class="review-state">等待审核</p>
          <h5>来访申请</h5>
          <p>来访人：{{ item.visitingName }}</p>
          <p>手机号码：{{ item.visitingPhone }}</p>
          <p>身份证：{{ item.visitingNumber }}</p>
          <p>车牌号：{{ item.visitingVehicle }}</p>
          <p>来访单位：{{ item.visitingDept }}</p>
          <p>来访时间：{{ item.visitingTime }}</p>
          <p>来访事由：{{ item.visitingReason }}</p>
          <p>
            <span class="review-code">健康信息：</span>
            <el-image style="width: 21.3333vw" :src="item.code1" fit="scale-down" :preview-src-list="[item.code1,item.code2,item.code3]" >
              无
            </el-image>
            <el-image style="width: 21.3333vw" :src="item.code3" fit="scale-down" :preview-src-list="[item.code3,item.code1,item.code2]">
              无
            </el-image>
          </p>

          <div class="review-btn">
            <van-button round type="success" @click="handleSave(item.id, 2)"
              >同意</van-button
            >
            <van-button round type="warning" @click="handleSave(item.id, 3)"
              >拒绝</van-button
            >
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { registerList, registerEdit } from "@/api/admin";
import { logout } from "@/utils/auth";
export default {
  computed: {
    ...mapState(["bsUser"]),
  },
  data() {
    return {
      searchForm: {
        interviewee: null,
        pageNum: 0,
        pageSize: 10,
        visitingVehicle: "",
        state: 1,
      },
      finishedText: "-暂无更多-",
      finished: false,
      loading: false,
      list: [],
    };
  },
  created() {
    if (!this.bsUser.id) {
      this.$router.push("/mobile/login");
    } else {
      //门岗
      if (this.bsUser.deptId == 2) {
        this.searchForm.state = 2;
      } else {
        this.searchForm.interviewee = this.bsUser.id;
      }
    }
  },
  methods: {
    nextLoad() {
      this.searchForm.pageNum += 1;
      this.loadList();
    },
    loadList() {
      this.loading = true;
      registerList(this.searchForm).then((res) => {
        this.loading = false;
        if (res.total == 0) {
          this.finishedText = "- 暂无访客 -";
        } else {
          this.finishedText = "- 暂无更多 -";
        }
        this.list = this.list.concat(res.data);
        if (res.totalPage <= this.searchForm.pageNum) {
          this.finished = true;
        }
      });
    },
    handleSave(id, state) {
      registerEdit({ id: id, state: state }).then(() => {
        this.reload();
      });
    },
    reload() {
      this.searchForm.pageNum = 1;
      this.list = [];
      this.loadList();
    },
    logout() {
      logout();
    },
  },
};
</script>

<style lang="scss" scoped>
.m-header {
  text-align: right;
  color: #4ca5fb;
  font-size: 2.8vw;
  margin-bottom: 3.3333vw;
  font-weight: bold;
  span {
    color: #000000;
  }
}
.no-data {
  width: 54.9333vw;
  height: 38.6667vw;
  margin: auto;
  img {
    width: 100%;
    height: 100%;
  }
}
.van-search {
  padding: 0;
  border-radius: 2vw;
}
::v-deep .van-search__content {
  background: #fff !important;
}
.review {
  .review-item {
    background: #fff;
    margin-bottom: 3.3333vw;
    padding: 3.3333vw;
    line-height: 2em;
    position: relative;
    color: #a1a1a1;
    font-size: 3.0667vw;
    font-weight: 500;
    vertical-align: top;
    .review-state {
      width: 16.5333vw;
      background: #4ca5fb;
      border-radius: 0.5333vw;
      text-align: center;
      color: #fff;
      position: absolute;
      font-size: 2.9333vw;
      left: -1.3333vw;
      top: 2.4vw;
    }
    h5 {
      margin-top: 8.6667vw;
      font-size: 3.3333vw;
      color: #3f3f3f;
    }
    .review-code{
      height: 100%;
      vertical-align: top;
    }
    .review-btn {
      text-align: right;
      .van-button {
        width: 15.8667vw;
        height: 5.2vw;
        font-size: 2.8vw;
        margin-left: 1.3333vw;
        color: #fefefe;
      }
    }
  }
}
.guard {
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
        color: #000000;
        font-size: 4.1333vw;
      }
    }
    .guard-btn {
      width: 19.0667vw;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ff8080;
      border-top-right-radius: 2vw;
      border-bottom-right-radius: 2vw;
      span {
        font-size: 4vw;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
}
</style>