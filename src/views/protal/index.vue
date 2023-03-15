<template>
 <!-- <el-scrollbar height="100vh"> -->
    <el-container>
    <el-header>
      <div class="div-center">
        <img src="@/assets/logo.png" />
        <span>
          <p>厦门海鑫金融保安守押有限公司</p>
          <p>Xiamen Haixin financial security guard Co., Ltd</p>
        </span>
        <a
          :class="{ active: routerIndex == index ? true : false }"
          v-for="(item, index) in routerList"
          :key="'router' + index"
          @click="spanRouter(item.path)"
        >
          {{ item.text }}
        </a>
      </div>
    </el-header>
    <el-main><router-view /></el-main>
    <el-footer>
      <div class="div-center">
        <div class="footer-item">
          <h3>关于海鑫</h3>
          <a @click="$router.push('/company')">公司简介</a>
          <a @click="$router.push('/company/culture')">海鑫文化</a>
          <a @click="$router.push('/activity')">企业动态</a>
        </div>
        <div class="footer-item">
          <h3>服务业务</h3>
          <a @click="$router.push('/business')">银行押运</a>
          <a @click="$router.push('/business')">保安服务</a>
        </div>
        <div class="footer-item">
          <h3>联系我们</h3>
          <p><img src="@/assets/img/tel.png" />座机: {{ company.tel }}</p>
          <p>
            <img src="@/assets/img/email.png" />电子邮箱:
            {{ company.email }}
          </p>
          <p><img src="@/assets/img/addr.png" />{{ company.address }}</p>
        </div>
        <div class="footer-item">
          <img src="@/assets/img/qrcode.png" />
          <p>扫一扫，关注公众号</p>
        </div>
      </div>
      <hr />
      <a href="https://beian.miit.gov.cn" class="beian">
        备案号：闽ICP备2022009194号-2
      </a>
    </el-footer>
  </el-container>
  <!-- </el-scrollbar> -->
 
</template>
<script>
import "@/assets/style/protal.scss";
import { getCompany } from "@/api/protal";
export default {
  data() {
    return {
      routerIndex: 0,
      routerList: [
        {
          path: "/index",
          text: "首页",
        },
        {
          path: "/company",
          text: "公司简介",
        },
        {
          path: "/business",
          text: "业务介绍",
        },
        {
          path: "/activity",
          text: "企业动态",
        },
        {
          path: "/partybuilding",
          text: "党建园地",
        },
        {
          path: "/recruitment",
          text: "人才招聘",
        },
      ],
      company: {},
    };
  },
  watch: {
    $route() {
      this.watchPath();
    },
  },
  created() {
    this.watchPath();
    this.loadCompany();
  },
  methods: {
    watchPath() {
      let path = this.$route.path;
      this.routerIndex = this.routerList.findIndex((item) =>
        path.includes(item.path)
      );
    },
    spanRouter(path) {
      this.$router.push(path);
    },
    loadCompany() {
      getCompany(1).then((res) => {
        this.company = res.data;
        this.$store.dispatch("company", res.data);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-container {
  background: #ffffff;
  color: #333333;
  .el-header {
    background-color: #ffffff;
    width: 100%;
    height: 5.4688vw;
    padding: 0;
    position: fixed;
    // border-bottom: 2px solid #0173ff;
    box-shadow: 0.0521vw 0.1042vw 0.8333vw 0vw rgba(0, 0, 0, 0.1);
    z-index: 999;
    top: 0;
    .div-center {
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 4.3229vw;
        height: 4.5833vw;
      }
      span {
        display: inline-block;
        color: #053d74;
        font-size: 1.5625vw;
        p {
          &:last-child {
            font-size: 1.05vw;
          }
        }
      }
      a {
        padding: 0.2604vw 1.0417vw;
        font-size: 1.0073vw;
        display: inline-block;
        text-align: center;
        &.active {
          color: #0173ff;
          border: 0.0521vw solid #0173ff;
          border-radius: 0.9115vw;
        }
        &:hover {
          color: #0173ff;
        }
      }
    }
  }
  .el-main {
    margin-top: 5.4688vw;
    padding: 0;
    overflow-x: hidden;
  }
  .el-footer {
    background-color: #0f4d99;
    font-size: 0.7292vw;
    color: #aaaaaa;
    text-align: left;
    height: unset !important;
    padding: 0 3.125vw;
    .div-center {
      display: flex;
      justify-content: space-between;
      .footer-item {
        padding-top: 2.6042vw;
        h3 {
          margin-bottom: 1.7708vw;
          color: #ffffff;
        }
        p,
        a {
          display: block;
          margin-bottom: 1.0417vw;
          &:hover {
            color: #ffffff;
          }
        }
        img {
          margin-right: 0.6771vw;
          display: inline-block;
          width: 0.7292vw;
          height: 0.7292vw;
        }
        &:last-child img {
          width: 6.875vw;
          height: 6.6667vw;
          display: inline-block;
        }
      }
    }
    hr{
      border-color:#1771e0;
    }
    .beian {
      display: inline-block;
      text-align: center;
      width: 100%;
      line-height: 50px;
      height: 50px;
      color: #aaaaaa;
         &:hover {
            color: #ffffff;
          }
    }
  }
}
</style>
