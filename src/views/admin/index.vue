<template>
  <el-container>
    <el-aside>
      <div class="logo">
        <img src="@/assets/img/title/side-logo.png" >
      </div>
      <el-menu :router="true" text-color="#fff" :default-openeds="['0']">
        <el-sub-menu
          v-for="(menu, index) in user.menus"
          :key="index"
          :index="index.toString()"
        >
          <template #title>
            <span>{{ menu.funcName }}</span>
          </template>
          <el-menu-item
            v-for="(item, index) in menu.children"
            :key="index"
            :index="item.location"
            :class="{ 'is-active': activePath.includes(item.location) }"
            >{{ item.funcName }}</el-menu-item
          >
        </el-sub-menu>
      </el-menu></el-aside
    >
    <el-container>
      <el-header
        >欢迎，{{ user.nickName }} &nbsp;|&nbsp;&nbsp;
        <a @click="logout"> 退出</a></el-header
      >
      <el-main>
        <el-scrollbar height="100%"> <router-view /> </el-scrollbar
      ></el-main>
    </el-container>
  </el-container>
</template>
<script>
import "@/assets/style/admin.scss";
import { mapState } from "vuex";
import { logout } from "@/utils/auth";
import {  logoutapi } from "@/api/admin";
export default {
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      activePath: "",
    };
  },
  watch: {
    $route() {
      this.watchPath();
    },
  },
  created() {
    this.watchPath();
  },
  methods: {
    logout() {
      logoutapi().then(() => {
        logout();
      });
    },
    watchPath() {
      if(this.$route.path=="/admin"&&this.user.menus){
          let menu = this.user.menus[0].children[0];
          this.$router.push(menu.location);
      }else{
        this.activePath = this.$route.path;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.el-aside {
  width: 15.4688vw;
  background: url("../../assets/img/aside.png");
  background-size: cover;
  .logo {
    width: 7.9167vw;
    height: 4.4271vw;
    margin: 1.0417vw auto;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.el-header {
  background-color: #fff;
  height: 5.2083vw;
  font-size: 18px;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  a {
    &:hover {
      color: #409eff;
    }
  }
}
.el-main {
  background-color: #f3f4f9;
  height: calc(100vh - 5.2083vw);
}
</style>