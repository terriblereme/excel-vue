<template>
  <div class="con-main">
    <div class="psw-form">
      <el-form ref="pswForm" :rules="pswRules" :model="pswForm">
        <el-form-item label="新密码:" prop="newPsw">
          <el-input v-model="pswForm.newPsw" show-password />
        </el-form-item>
        <el-form-item label="确认密码:" prop="checkPass">
          <el-input v-model="pswForm.checkPass" show-password />
        </el-form-item>
      </el-form>
      <div class="bottom-btn">
        <el-button type="primary" round @click="editPsw">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { userUpdatePsw } from "@/api/protal";
import { mapState } from "vuex";
import { bslogout } from "@/utils/auth";
import md5 from "js-md5";
export default {
  computed: {
    ...mapState(["bsUser"]),
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!/^[0-9A-Za-z]{6,20}$/.test(value)) {
        callback(new Error("请输入6-20位数字和字母"));
      } else {
        if (this.pswForm.checkPass !== "") {
          this.$refs.pswForm.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.pswForm.newPsw) {
        callback(new Error("两次密码不一致！"));
      } else {
        callback();
      }
    };
    return {
      pswForm: {},
      pswRules: {
        newPsw: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    editPsw() {
      this.$refs.pswForm.validate((valid) => {
        if (valid) {
          if (this.bsUser.id) {
            userUpdatePsw({
              id: this.bsUser.id,
              password: md5(this.pswForm.newPsw),
            }).then((res) => {
              if (res.code === 1) {
                bslogout();
              }
            });
          }
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
  height: 100vh;
  padding: 0;
  .psw-form {
    padding: 6.6667vw;
    background-color: #fff;
    ::v-deep .el-input__inner {
      background: #fff;
      border-radius: 0;
      border: none;
    }
    ::v-deep .el-form-item {
      border-bottom: 0.2667vw solid #e6e6e6;
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