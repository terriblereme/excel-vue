<template>
  <div>
    <div class="top-bread">
      <div class="top-line"></div>
      <span class="top-title">账号管理</span>
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
        <el-table-column prop="loginName" label="账号" />
        <el-table-column prop="nickName" label="名称" />
        <el-table-column prop="roleName" label="角色" />
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
        <el-form-item label="账号" prop="loginName">
          <el-input
            v-model="dataForm.loginName"
            :disabled="this.dataForm.id ? true : false"
          />
        </el-form-item>
        <el-form-item label="名称" prop="nickName">
          <el-input v-model="dataForm.nickName" />
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="dataForm.roleId" placeholder="请选择角色">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门">
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
  sysuserList,
  sysuserAdd,
  sysuserEdit,
  sysuserDel,
  sysuserChangeState,
  sysuserUpdatePsw,
  roleList,
  deptList,
} from "@/api/admin";
import treeSelect from "@/components/treeSelect.vue";
import md5 from "js-md5";
export default {
  components: {
    treeSelect,
  },
  data() {
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入账号"));
      } else if (!/^[0-9a-zA-Z]{3,20}$/.test(value)) {
        callback(new Error("账号包含字母、数字，长度3-20"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!/^[0-9A-Za-z]{6,18}$/.test(value)) {
        callback(new Error("请输入6-18位数字和字母"));
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
        roleId: "",
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
        loginName: [
          { required: true, validator: validatePhone, trigger: "blur" },
        ],
        nickName: [
          { required: true, trigger: "blur", message: "请输入名称" },
          { max: 64, message: "名称最大长度64", trigger: "blur" },
        ],
        roleId: [{ required: true, trigger: "blur", message: "请选择角色" }],
      },
      pswVisible: false,
      pswForm: {},
      pswRules: {
        newPsw: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      roleList: [],
    };
  },
  methods: {
    loadDepts() {
      deptList().then((res) => {
        this.depts = res.data;
      });
    },
    formatState(row) {
      return row.state === "0" ? "禁用" : "启用";
    },
    loadList(pageNum) {
      this.searchForm.pageNum = pageNum;
      sysuserList(this.searchForm).then((res) => {
        this.list = res.data;
        this.total = res.total;
      });
    },
    loadRole() {
      roleList().then((res) => {
        this.roleList = res.data;
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
      this.dataForm.loginName = row.loginName;
      this.dataForm.nickName = row.nickName;
      this.dataForm.roleId = row.roleId;
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
          sysuserDel(row.id).then(() => {
            this.loadList(1);
          });
        });
    },
    handleSave() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          if (!this.dataForm.id) {
            sysuserAdd(this.dataForm).then((res) => {
              if (res.code === 1) {
                this.editVisible = false;
                this.loadList(1);
              }
            });
          } else {
            sysuserEdit(this.dataForm).then((res) => {
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
      sysuserChangeState(row.id).then((res) => {
        if (res.code == 1) {
          this.loadList();
        }
      });
    },
    handlePsw(row) {
      this.pswVisible = true;
      this.pswForm.id = row.id;
    },
    editPsw() {
      this.$refs.pswForm.validate((valid) => {
        if (valid) {
          if (this.pswForm.id != null) {
            sysuserUpdatePsw({
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
    this.loadList(1);
    this.loadRole();
    this.loadDepts();
  },
};
</script>

<style>
</style>