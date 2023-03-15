<template>
  <div>
    <div class="top-bread">
      <div class="top-line"></div>
      <span class="top-title">人员管理</span>
    </div>
    <div class="table-main">
      <div class="search-div">
        <div class="btn">
          <el-button type="success" icon="circle-plus-filled" @click="handleAdd"
            >新建</el-button
          >
        </div>
        <div class="search-form">
          <el-form :inline="true">
            <el-form-item label="关键字">
              <el-input v-model="searchForm.keyword" />
            </el-form-item>
            <el-form-item label="部门">
              <treeSelect
                v-model="searchForm.deptId"
                :treeData="depts"
              ></treeSelect>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="loadList(1)"
                >查询</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-table
        :data="list"
        border
        stripe
        style="width: 100%"
        empty-text="暂无数据"
      >
        <el-table-column type="index" width="50" align="center" label="序号">
          <template #default="scope">
            {{
              (this.searchForm.pageNum - 1) * this.searchForm.pageSize +
              scope.$index +
              1
            }}
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机" />
        <el-table-column prop="nickName" label="姓名" />
        <el-table-column prop="deptName" label="部门" />
        <el-table-column label="状态" prop="state" :formatter="formatState" />
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button
              v-if="scope.row.state === '0'"
              size="mini"
              plain
              type="primary"
              @click="handlePush(scope.row)"
              >启用</el-button
            >
            <el-button
              v-else
              size="mini"
              plain
              type="primary"
              @click="handlePush(scope.row)"
              >禁用</el-button
            >
            <el-button
              size="mini"
              plain
              type="primary"
              @click="handlePsw(scope.row)"
              >修改密码</el-button
            >
            <el-button
              size="mini"
              plain
              type="primary"
              @click="handleEdit(scope.row)"
              >修改</el-button
            >

            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="page-div">
        <el-pagination
          :page-size="searchForm.pageSize"
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="loadList"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog v-model="editVisible" :title="dialogTitle">
      <el-form :model="dataForm" ref="dataForm" :rules="saveRules">
        <el-form-item label="手机" prop="mobile">
          <el-input
            v-model="dataForm.mobile"
            :disabled="this.dataForm.id ? true : false"
          />
        </el-form-item>
        <el-form-item label="姓名" prop="nickName">
          <el-input v-model="dataForm.nickName" />
        </el-form-item>
        <el-form-item label="部门" prop="deptId">
          <treeSelect
            v-model="dataForm.deptId"
            :modelLabel="dataForm.deptName"
            :treeData="depts"
          ></treeSelect>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="pswVisible" title="修改密码">
      <el-form ref="pswForm" :rules="pswRules" :model="pswForm">
        <el-form-item label="新密码" prop="newPsw">
          <el-input v-model="pswForm.newPsw" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="pswForm.checkPass" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="pswVisible = false">取消</el-button>
          <el-button type="primary" @click="editPsw">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  userList,
  userAdd,
  userEdit,
  userDel,
  deptList,
  userChangeState,
  userUpdatePsw,
} from "@/api/admin";
import md5 from "js-md5";
import treeSelect from "@/components/treeSelect.vue";
export default {
  components: {
    treeSelect,
  },
  data() {
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入手机号"));
      } else {
        const reg = /^1[0-9]{10}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
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
      total: 0,
      searchForm: {
        deptId: "",
        keyword: "",
        pageNum: 1,
        pageSize: 10,
      },
      depts: [],
      list: [],
      editVisible: false,
      dialogTitle: "",
      dataForm: {},
      saveRules: {
        mobile: [{ required: true, validator: validatePhone, trigger: "blur" }],
        deptId: [{ required: true, trigger: "blur", message: "请选择部门" }],
        nickName: [
          { required: true, trigger: "blur", message: "请输入姓名" },
          { max: 64, message: "姓名最大长度64", trigger: "blur" },
        ],
      },
      pswVisible: false,
      pswForm: {},
      pswRules: {
        newPsw: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    formatState(row) {
      return row.state === "0" ? "禁用" : "启用";
    },
    loadDepts() {
      deptList().then((res) => {
        this.depts = res.data;
      });
    },
    loadList(pageNum) {
      this.searchForm.pageNum = pageNum;
      userList(this.searchForm).then((res) => {
        this.list = res.data;
        this.total = res.total;
      });
    },
    handleAdd() {
      this.editVisible = true;
      this.dialogTitle = "新建";
      if (this.$refs.dataForm !== undefined) this.$refs.dataForm.resetFields();
      Object.keys(this.dataForm).forEach((key) => (this.dataForm[key] = ""));
    },
    handleEdit(row) {
      this.editVisible = true;
      this.dialogTitle = "编辑";
      if (this.$refs.dataForm !== undefined) this.$refs.dataForm.resetFields();
      this.dataForm.id = row.id;
      this.dataForm.mobile = row.mobile;
      this.dataForm.nickName = row.nickName;
      this.dataForm.deptId = row.deptId;
      this.dataForm.deptName = row.deptName;
    },
    handleDelete(row) {
      this.$msgbox
        .confirm("您确认要删除该数据吗?", "删除确认", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          userDel(row.id).then(() => {
            this.loadList(1);
          });
        });
    },
    handleSave() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          if (!this.dataForm.id) {
            userAdd(this.dataForm).then((res) => {
              if (res.code === 1) {
                this.editVisible = false;
                this.loadList(1);
              }
            });
          } else {
            userEdit(this.dataForm).then((res) => {
              if (res.code == 1) {
                this.editVisible = false;
                this.loadList(1);
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    handlePush(row) {
      userChangeState(row.id).then((res) => {
        if (res.code == 1) {
          this.loadList();
        }
      });
    },
    handlePsw(row) {
      this.pswVisible = true;
      this.pswForm.id = row.id;
      this.pswForm.newPsw = "";
      this.pswForm.checkPass ="";
    },
    editPsw() {
      this.$refs.pswForm.validate((valid) => {
        if (valid) {
          if (this.pswForm.id) {
            userUpdatePsw({
              id: this.pswForm.id,
              password: md5(this.pswForm.newPsw),
            }).then((res) => {
              if (res.code === 1) {
                this.pswVisible = false;
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
    this.loadDepts();
    this.loadList(1);
  },
};
</script>

<style>
</style>