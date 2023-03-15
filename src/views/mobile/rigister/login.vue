<template>
  <div class="con-main">
    <div class="login-form">
      <el-form
        :model="loginForm"
        ref="loginForm"
        :rules="loginRules"
        label-position="top"
      >
        <el-form-item label="账号" prop="mobile">
          <el-input
            v-model="loginForm.mobile"
            maxlength="11"
            placeholder="请输入手机号码"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            maxlength="20"
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
      </el-form>
      <div class="bottom-btn">
        <el-button type="primary" round @click="handleLogin">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from "@/api/protal";
import md5 from "js-md5";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.trim().length == 0) {
        callback(new Error("请输入账号"));
      } else if (!/^1[0-9]{10}$/.test(value)) {
        callback(new Error("请输入正确的手机号码"));
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
        mobile: "",
        password: "",
      },
      loginRules: {
        mobile: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
    };
  },
  methods: {
    handleLogin() {
      let openid = this.$store.state.openid;
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          login({
            mobile: this.loginForm.mobile,
            password: md5(this.loginForm.password),
            openid:openid,
          }).then((res) => {
            if (res.code === 1) {
              this.$store.dispatch("bslogin", res.data);
              this.$router.push("/mobile/manage");
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

<style lang="scss" scoped>
.con-main {
  background-image: url("../../../assets/img/title/mobile-login.png");
  background-position: top;
  background-size: 100% auto;
  display: flex;
  align-items: top;
  justify-content: center;
  height: 100vh;
  padding: 0 4vw;
  .login-form {
    margin-top: 60vw;
   ::v-deep .el-form--label-top .el-form-item__label {
      display: none !important ;
    }
    ::v-deep .el-input__inner {
      background: #f5f9fc;
      border-radius: 0;
      border: none;
    }
    ::v-deep .el-input {
      border-bottom: 0.2667vw solid #e6e6e6;
    }
    ::v-deep .el-form-item {
      margin-bottom: 6.6667vw;
    }
    .bottom-btn {
      button {
        background: linear-gradient(-38deg, #36affe 0%, #4a8cfc 100%);
        font-size: 4.8vw;
        font-weight: bold;
      }
    }
  }
}
</style>