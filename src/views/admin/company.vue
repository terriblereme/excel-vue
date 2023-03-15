<template>
  <div class="top-bread">
    <div class="top-line"></div>
    <span class="top-title">公司信息</span>
  </div>
  <div class="table-main">
    <el-form ref="dataForm" :rules="dataRules" :model="dataForm">
      <el-form-item label="电话" prop="tel">
        <el-input v-model="dataForm.tel" maxlength="20" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dataForm.email" maxlength="50" />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="dataForm.address" maxlength="100" />
      </el-form-item>
      <el-form-item label="概况" prop="intro">
        <el-input
          v-model="dataForm.intro"
          :rows="5"
          maxlength="500"
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <div class="btn-div">
      <el-button type="primary" @click="edit">保存</el-button>
    </div>
  </div>
</template>

<script>
import { companyGet, companyEdit } from "@/api/admin";
export default {
  data() {
    return {
      dataForm: {},
      saveRules: {
        tel: [{ required: true, trigger: "blur", message: "请输入电话" }],
        email: [{ required: true, trigger: "blur", message: "请输入邮箱" }],
        address: [{ required: true, trigger: "blur", message: "请输入地址" }],
        intro: [{ required: true, trigger: "blur", message: "请输入概况" }],
      },
    };
  },
  methods: {
    load() {
      companyGet(1).then((res) => {
        this.dataForm.id = res.data.id;
        this.dataForm.tel = res.data.tel;
        this.dataForm.email = res.data.email;
        this.dataForm.address = res.data.address;
        this.dataForm.intro = res.data.intro;
      });
    },
    edit() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          companyEdit(this.dataForm).then(() => {});
        } else {
          return false;
        }
      });
    },
  },
  mounted() {
    this.load();
  },
};
</script>

<style scoped>
.btn-div {
  text-align: center;
}
</style>