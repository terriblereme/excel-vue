<template>
  <div>
    <img src="@/assets/img/top1.png" class="adv-top" />
    <div class="notice">
      <div class="div-center">
        <img src="@/assets/img/notice.png" />
        <vue3-seamless-scroll
          :list="notices"
          :v-model="false"
          class="scroll"
          hover
          direction="left"
          :limitScrollNum="1"
        >
          <div class="item">
            <span
              v-for="(item, index) in notices"
              :key="index"
              @click="$router.push(`/activity/detail/${item.id}`)"
            >
              {{ "[" + item.createTime.slice(5, 10) + "]" + item.title }}
            </span>
          </div>
        </vue3-seamless-scroll>
      </div>
    </div>
    <div class="nav bg-ef">
      <div class="div-center">
        <div data-aos="fade-right" class="nav-title-en">Haixin activity</div>
        <div data-aos="fade-left" class="nav-title">海鑫动态</div>
        <ul class="activitys">
          <li
            v-for="item in activitys"
            :key="item.id"
            @click="$router.push(`/activity/detail/${item.id}`)"
          >
            <div :style="{ backgroundImage: 'url(' + item.img + ')' }">
              <p class="ellipsis">
                {{ item.title }}
              </p>
            </div>
          </li>
        </ul>
        <div class="nav-btn">
          <a class="btn-a" @click="$router.push({ path: '/activity' })"
            >查看更多</a
          >
        </div>
      </div>
    </div>
    <div class="nav">
      <div class="div-center">
        <div data-aos="fade-right" class="nav-title-en">Haixin glory</div>
        <div data-aos="fade-left" class="nav-title">海鑫荣誉</div>
        <div class="glory-card">
          <adv :id="1" cardType="card"></adv>
        </div>
      </div>
    </div>
    <div class="nav bg-ef">
      <div class="div-center">
        <div data-aos="fade-right" class="nav-title-en">
          Party building garden
        </div>
        <div data-aos="fade-left" class="nav-title">党建园地</div>
        <div class="part">
          <div class="part-left" data-aos="fade-down">
            <iframe
              height="100%"
              width="100%"
              src="https://player.youku.com/embed/XNTE3MDQ2MjQwOA=="
              frameborder="0"
            ></iframe>
          </div>
          <div class="part-right" data-aos="fade-up">
            <ul>
              <li
                v-for="part in parts"
                :key="part.id"
                @click="
                  $router.push({ path: `/partybuilding/detail/${part.id}` })
                "
              >
                <p class="ellipsis">{{ part.title }}</p>
                <a>【详情】</a>
              </li>
            </ul>
            <a @click="$router.push({ path: '/partybuilding' })">更多>></a>
          </div>
        </div>
      </div>
    </div>
    <div class="nav">
      <div class="div-center">
        <div data-aos="fade-right" class="nav-title-en">
          Cooperative partner
        </div>
        <div data-aos="fade-left" class="nav-title">合作伙伴</div>
        <div data-aos="fade-right" class="partner-img">
          <img src="@/assets/img/partner.png" />
        </div>
      </div>
    </div>
    <div class="nav intro">
      <div class="intro-left">
        <adv :id="2"></adv>
      </div>
      <div class="intro-right">
        <div data-aos="fade-right" class="nav-title-en">Introduction</div>
        <div data-aos="fade-left" class="nav-title">海鑫介绍</div>
        <p>
          {{ company.intro }}
        </p>
        <a class="btn-a" @click="$router.push({ path: '/company' })"
          >查看更多</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import adv from "@/components/adv.vue";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import { getList } from "@/api/protal";
import { mapState } from "vuex";
export default {
  components: {
    Vue3SeamlessScroll,
    adv,
  },
  computed: {
    ...mapState(["company"]),
  },
  data() {
    return {
      notices: [],
      activitys: [],
      parts: [],
    };
  },

  methods: {
    loadNotice() {
      getList({ pageSize: 6, pageNum: 1, category: "5" }).then((res) => {
        this.notices = res.data;
      });
    },
    loadActivity() {
      getList({ pageSize: 6, pageNum: 1, category: "2" }).then((res) => {
        this.activitys = res.data;
      });
    },
    loadPart() {
      getList({ pageSize: 6, pageNum: 1, category: "3" }).then((res) => {
        this.parts = res.data;
      });
    },
  },
  mounted() {
    this.loadNotice();
    this.loadActivity();
    this.loadPart();
  },
};
</script>
<style lang="scss" scoped>
.bg-ef {
  background-color: #f8f8f8;
}
.notice {
  background-color: #ffd282;
  .div-center {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1.1979vw 0;
    img {
      width: 1.5104vw;
      height: 1.6667vw;
    }
    .scroll {
      width: 100%;
      font-size: 1.25vw;
      height: 1.5625vw;
      overflow: hidden;
      margin-left: 1.25vw;
      .item {
        span {
          cursor: pointer;
          color: #515151;
          white-space: nowrap;
        }
      }
    }
  }
}

.nav {
  padding: 4.4271vw 0 3.125vw;
  .nav-title {
    font-size: 1.5625vw;
    position: relative;
    top: -4.2708vw;
  }
  .nav-title-en {
    color: #e69a15;
    font-size: 3.125vw;
    opacity: 0.3;
  }
  .glory-card {
    height: 23.4375vw;
  }
  .nav-btn {
    text-align: center;
    margin-top: 2.7604vw;
    a {
      color: #2b3a86;
      border-color: #2b3a86;
      &:hover {
        color: #ffffff;
        background: #2b3a86;
      }
    }
  }
  .activitys {
    display: inline-block;
    li:nth-child(2),
    li:nth-child(5) {
      margin: 0.625vw 1.3021vw;
    }
    li {
      margin: 0.625vw 0;
      float: left;
      width: 22.0313vw;
      height: 20.4688vw;
      &:nth-child(2),
      &:nth-child(5) {
        margin: 0.625vw 1.3021vw;
      }
      div {
        cursor: pointer;
        background-size: 100% 100%;
        width: 100%;
        height: 100%;
        float: left;
        position: relative;
        &:hover {
          transform: scale(1.02);
          p {
            display: inline-block;
          }
        }
        p {
          display: none;
          padding: 1.1979vw 0;
          height: 3.8021vw;
          width: 100%;
          position: absolute;
          bottom: 0;
          background-color: rgba($color: #000000, $alpha: 0.41);
          color: #ffffff;
          font-size: 1.3542vw;
          text-align: center;
        }
      }
    }
  }

  .glory-img {
    display: flex;
    justify-content: space-between;
    img {
      width: 21.7708vw;
      height: 15.3646vw;
      &:hover {
        transform: scale(1.1, 1.1);
      }
    }
  }
  .partner-img {
    margin-top: 4.7917vw;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.part {
  display: flex;
  .part-left {
    width: 50%;
  }
  .part-right {
    width: 50%;
    padding-left: 1.3021vw;
    li {
      font-size: 1.1979vw;
      color: #666666;
      padding: 1.0417vw 0;
      border-bottom: 0.0521vw solid #dcdcdc;
      cursor: pointer;
      p {
        width: 80%;
        display: inline-block;
      }
      a {
        color: #4574e0;
        margin: 0;
      }
      &:hover {
        color: #4574e0;
      }
    }
    a {
      float: right;
      color: #666666;
      font-size: 1.1458vw;
      margin-top: 0.5208vw;
      &:hover {
        color: #4574e0;
      }
    }
  }
}
.intro {
  display: flex;
  padding: 0;
  .intro-left {
    width: 50%;
  }
  .intro-right {
    width: 50%;
    background-color: #ffd282;
    padding: 2.3438vw;
    .nav-title-en {
      color: rgba($color: #ffffff, $alpha: 0.5);
    }
    p {
      color: #6c6c6c;
      font-size: 0.7813vw;
      line-height: 1.5;
      margin-bottom: 2.2396vw;
      position: relative;
      top: -1.0417vw;
    }
    a {
      background: #10a8ff;
      color: #ffffff;
      border: 0.0521vw solid #10a8ff;
      &:hover {
        background: #ffffff;
        color: #10a8ff;
      }
    }
  }
}
</style>