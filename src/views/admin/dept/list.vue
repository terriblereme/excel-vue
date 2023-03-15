<template>
  <div>
    <div class="top-bread">
      <div class="top-line"></div>
      <span class="top-title">组织架构</span>
    </div>
    <div class="table-main">
      <div class="search-div">
        <div class="btn">
          <el-button
            type="success"
            icon="circle-plus-filled"
            @click="handleAdd({ id: 0, name: '' })"
             v-if="hasPermission('dept-add')"
            >新建单位</el-button
          >
        </div>
      </div>
      <el-table
        :data="list"
        border
        stripe
        row-key="id"
        style="width: 100%"
        empty-text="暂无数据"
      >
        <el-table-column prop="name" label="名称" />
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button
              v-if="scope.row.id != 2"
              size="mini"
              plain
              type="primary"
              @click="handleAdd(scope.row)"
              >新建</el-button
            >
            <el-button
              v-if="scope.row.id != 1 && scope.row.id != 2"
              size="mini"
              plain
              type="primary"
              @click="handleEdit(scope.row)"
              >修改</el-button
            >

            <el-button
              v-if="scope.row.id != 1 && scope.row.id != 2"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="editVisible" title="编辑">
      <el-form :model="dataForm" ref="dataForm" :rules="saveRules">
        <el-form-item label="上一级">
          <el-input disabled :placeholder="dataForm.pname" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="dataForm.name" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model.number="dataForm.sort" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { deptList, deptAdd, deptEdit, deptDel } from "@/api/admin";
export default {
  data() {
    return {
      list: [],
      editVisible: false,
      dataForm: {},
      saveRules: {
        name: [
          { required: true, trigger: "blur", message: "请输入部门名称" },
          { max: 100, message: "名称最大长度100", trigger: "blur" },
        ],
        sort: [{ type: "number", message: "请输入数字", trigger: "blur" }],
      },
    };
  },
  methods: {
    loadList() {
      deptList().then((res) => {
        this.list = res.data;
      });
    },
    handleAdd(row) {
      this.editVisible = true;
      if (this.$refs.dataForm !== undefined) this.$refs.dataForm.resetFields();
      Object.keys(this.dataForm).forEach((key) => (this.dataForm[key] = ""));
      this.dataForm.pid = row.id;
      this.dataForm.pname = row.name;
    },
    handleEdit(row) {
      this.editVisible = true;
      if (this.$refs.dataForm !== undefined) this.$refs.dataForm.resetFields();
      this.dataForm.id = row.id;
      this.dataForm.name = row.name;
      this.dataForm.pid = row.pid;
      this.dataForm.pname = row.pname;
      this.dataForm.sort = row.sort;
    },
    handleDelete(row) {
      this.$msgbox
        .confirm("您确认要删除该数据吗?", "删除确认", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          deptDel(row.id).then(() => {
            this.loadList();
          });
        });
    },
    handleSave() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          if (!this.dataForm.id) {
            deptAdd(this.dataForm).then((res) => {
              if (res.code === 1) {
                this.editVisible = false;
                this.loadList();
              }
            });
          } else {
            deptEdit(this.dataForm).then((res) => {
              if (res.code == 1) {
                this.editVisible = false;
                this.loadList();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
  },
  mounted() {
    this.loadList();
  },
};
</script>

<style>
</style>