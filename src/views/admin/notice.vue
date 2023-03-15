<template>
  <div class="top-bread">
    <div class="top-line"></div>
    <span class="top-title">入园须知</span>
  </div>
  <div class="table-main">
    <el-form ref="dataForm" :rules="dataRules" :model="dataForm">
      <el-form-item label="内容" prop="intro">
           <wangeditor
            v-model="dataForm.intro"
          ></wangeditor>
      </el-form-item>
    </el-form>
    <div class="btn-div">
      <el-button type="primary" @click="edit">保存</el-button>
    </div>
  </div>
</template>

<script>
import { companyGet, companyEdit } from "@/api/admin";
import wangeditor from "@/components/wangEditor.vue";
export default {
    components: {
    wangeditor,
  },
  data() {
    return {
      dataForm: {},
      saveRules: {
        intro: [{ required: true, trigger: "blur", message: "请输入内容" }],
      },
    };
  },
  methods: {
    load() {
      companyGet(2).then((res) => {
        this.dataForm.id = res.data.id;
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