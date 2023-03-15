<template>
  <div>
    <img src="@/assets/img/ct4.png" class="adv-top" />
    <div class="div-center container">
      <div data-aos="fade-right" class="title-en">
        <label>TALENT</label>&emsp;RECRUITMENT
      </div>
      <div class="title-line">
        <hr />
        <span data-aos="fade-left">人才招聘</span>
        <hr />
      </div>
      <div class="recuit-list">
        <ul>
          <li
            v-for="(item, index) in list"
            :key="index"
            @click="$router.push({ path: `/recruitment/detail/${item.id}` })"
          >
            <div class="recuit-item">
              <div class="item-right">
                <h2>{{ item.title }}</h2>
                <h3>
                  岗位要求
                   <a class="btn-a"
                    ><el-icon><caret-right /></el-icon>详情</a
                  >
                </h3>
                <div class="item-intro" v-html=" item.intro"></div>
               
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="re-footer">
      <div class="foot-left">
        <p class="re-title">如果你对我们感兴趣，欢迎加入</p>
        <div class="re-item" data-aos="fade-right" data-aos-duration="5000">
          <p>
            <span>简历投递</span>
            <span>应聘简历请发至 {{company.email}}</span>
          </p>
          <img src="@/assets/img/icon-em.png" />
        </div>
        <div class="re-item" data-aos="fade-right">
          <p>
            <span>招聘岗位</span>
            <span>{{ jobs }}</span>
          </p>
          <img src="@/assets/img/icon-us.png" />
        </div>
        <div class="re-item" data-aos="fade-right">
          <p>
            <span>联系我们</span>
            <span>联系电话 {{company.tel}}</span>
          </p>
          <img src="@/assets/img/icon-ph.png" />
        </div>
      </div>
      <div class="foot-right"></div>
    </div>
  </div>
</template>
<script setup>
import { CaretRight } from "@element-plus/icons-vue";
</script>
<script>
import { mapState } from "vuex";
import { getList } from "@/api/protal";
export default {
  computed:{
    ...mapState(["company"]),
  },
  data() {
    return {
      list: [],
      jobs: "",
    };
  },
  methods: {
    loadList() {
      getList({ category: "4" }).then((res) => {
        this.list = res.data;
        let len = 3;
        if (this.list.length < 3) len = this.list.length;
        for (let i = 0; i < len; i++) {
          this.jobs += this.list[i].title;
          if (i < len - 1) {
            this.jobs += " - ";
          }
        }
      });
    },
  },
  mounted() {
    this.loadList();
  },
};
</script>

<style lang="scss"  scoped>
.container {
  .recuit-list {
    li {
      width: 100%;
      padding: 1.3021vw 0;
      border-bottom: 0.0521vw solid #bfbfbf;
      cursor: pointer;
      .recuit-item {
        background: #f7f7f7;
        display: flex;
        .item-left {
          display: flex;
          align-items: center;
          div {
            width: 17.7083vw;
            text-align: center;
            color: #277fff;
            font-size: 2.9688vw;
            font-weight: bold;
            padding: 2.6042vw;
            &:hover {
              transform: scale(1.05);
            }
          }
        }
        .item-right {
          background: #f7f7f7;
          display: inline-block;
          padding: 1.3021vw;
          h2 {
            font-size: 1.5625vw;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #0173ff;
            text-align: center;
          }
          h3 {
            color: #333333;
            font-size: 1.1979vw;
            margin: 0.5208vw 0;
          }
          .item-intro {
            white-space: pre-line;
            color: #808080;
            font-size: 0.9375vw;
            line-height: 1.5;
          }
        }
      }

      &:last-child {
        border-bottom: 0;
      }
    }
  }
}
.re-footer {
  background: rgba(17, 77, 153, 0.55);
  color: #fff;
  display: flex;
  justify-content: center;
  line-height: 1.5;
  .foot-left {
    text-align: right;
    padding: 4.0625vw 0;
    width: 50%;
    .re-title {
      padding-right: 4.1667vw;
      font-size: 1.1458vw;
    }
    .re-item {
      margin-top: 3.6458vw;
      position: relative;
      p {
        font-size: 0.9375vw;
        span {
          display: block;
        }
        padding-right: 4.1667vw;
      }
      img {
        width: 4.2708vw;
        height: 4.2708vw;
        position: absolute;
        right: -2.1354vw;
        top: 0;
      }
    }
  }
  .foot-right {
    width: 50%;
    background: url(../../assets/img/map.png) no-repeat center;
    background-size: cover;
  }
}
</style>