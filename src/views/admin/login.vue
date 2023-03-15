<template>
  <div class="login-container">
    <div class="login-main">
      <el-form
        ref="loginF"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <el-form-item prop="username">
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入账号"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
            :prefix-icon="User"
          >
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter="handleLogin"
            show-password
            :prefix-icon="Lock"
          />
        </el-form-item>
        <el-checkbox v-model="loginForm.rememberMe"
          >记住我</el-checkbox
        >
        <el-button @click.prevent="handleLogin">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { User, Lock } from "@element-plus/icons-vue";
</script>
<script>
import { login } from "@/api/admin";
import md5 from "js-md5";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.trim().length == 0) {
        callback(new Error("请输入账号"));
      } else if (!/^[0-9a-zA-Z]{3,20}$/.test(value)) {
        callback(new Error("账号包含字母、数字，长度3-20"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.trim().length == 0) {
        callback(new Error("请输入密码"));
      } else if (!/^[0-9a-zA-Z]{6,20}$/.test(value)) {
        callback(new Error("密码包含字母、数字，长度6-20"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        rememberMe: true,
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    handleLogin() {
      this.$refs.loginF.validate((valid) => {
        if (valid) {
          login({
            loginName: this.loginForm.username,
            password: md5(this.loginForm.password),
            rememberMe: this.loginForm.rememberMe,
          }).then((res) => {
            if (res.code === 1) {
              this.$store.dispatch("login", res.data);
              this.$router.push("/admin");
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss"  scope>
* {
  margin: 0;
  padding: 0;
  list-style-type: none;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center;
  outline: none;
  box-sizing: border-box;
}
/* reset element-ui css */
.login-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: url("../../assets/img/login1.png");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-main {
    width: 62.5vw;
    height: 35.4688vw;
    background: url("../../assets/img/title/login2.png");
    background-size: cover;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .login-form {
      width: 50%;
      display: flex;
      flex-direction: column;
      padding: 0 3.125vw;
      .el-form-item {
        border-bottom: .0625rem solid #e6e6e6;
        position: relative;
        line-height: 5.2083vw;
        .el-input {
          display: inline-block;
           font-size: 1.5rem;
          input {
            background: transparent;
            border: 0;
            -webkit-appearance: none;
            color: #000;
            caret-color: #cccccc;
            padding-left: 2.8125rem;
          }
        }
        .el-form-item__error{
           font-size: .75rem;
        }
      }
      .el-checkbox {
        font-size: 1.125rem;
        color: #cccccc;
      }
      .el-button {
        margin-top: 1.5625vw;
        background: #4593ea;
        border-radius: 2.0833vw;
        font-size: 1.875rem;
        font-weight: bold;
        letter-spacing: .9375rem;
        color: #fff;
      }
    }
  }
}
</style>
