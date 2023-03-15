<template>
  <div>
    <div class="top-bread">
      <div class="top-line"></div>
      <span class="top-title">角色管理</span>
    </div>
    <div class="table-main">
      <div class="search-div">
        <div class="btn">
          <el-button type="success" icon="circle-plus-filled" @click="handleAdd"
            >新建</el-button
          >
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
        <el-table-column prop="roleName" label="名称" />
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button
              size="mini"
              plain
              type="primary"
              @click="handleAuth(scope.row)"
              >授权</el-button
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
        <el-form-item label="名称" prop="roleName">
          <el-input v-model="dataForm.roleName" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="authVisible" title="授权">
      <el-tree
        ref="authTree"
        :data="authList"
        show-checkbox
        node-key="id"
        default-expand-all
        :props="defaultProps"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="authVisible = false">取消</el-button>
          <el-button type="primary" @click="handleAuthSave">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { roleList, roleAdd, roleEdit, roleDel,authTree,roleAuth } from "@/api/admin";
export default {
  data() {
    return {
      loading: false,
      total: 0,
      dialogTitle: "",
      searchForm: {
        pageNum: 1,
        pageSize: 10,
      },
      list: [],
      editVisible: false,
      dataForm: {
        id: null,
        roleName: "",
      },
      saveRules: {
        roleName: [{ required: true, trigger: "blur", message: "请输入名称" }],
      },
      authVisible: false,
      defaultProps: {
        children: "children",
        label: "funcName",
      },
      authList: [],
      authRoleId:"",
      roleAuthIds:[],
    };
  },
  methods: {
    loadList(pageNum) {
      this.searchForm.pageNum = pageNum;
      roleList(this.searchForm).then((res) => {
        this.list = res.data;
        this.total = res.total;
      });
    },
    handleAdd() {
      this.editVisible = true;
      this.dialogTitle = "新增角色";
      if (this.$refs.dataForm !== undefined) this.$refs.dataForm.resetFields();
      this.dataForm.id = null;
      this.dataForm.roleName = "";
    },
    handleEdit(row) {
      this.editVisible = true;
      this.dialogTitle = "编辑角色";
      if (this.$refs.dataForm !== undefined) this.$refs.dataForm.resetFields();
      this.dataForm.id = row.id;
      this.dataForm.roleName = row.roleName;
    },
    loadAllAuth(){
         authTree({parentId:0}).then(res=>{
            this.authList = res.data;
        })
    },
    handleAuth(row) {
        this.authVisible=true;
        this.authRoleId = row.id;
        authTree({parentId:0,roleId:row.id}).then(res=>{
            this.roleAuthIds=[];
            this.convertRoleAuthIds(res.data);
            this.$refs.authTree.setCheckedKeys(this.roleAuthIds,false);
        })
    },
    convertRoleAuthIds(list){
        list.forEach(item=>{
            if(item.children.length>0){
                this.convertRoleAuthIds(item.children);
            }else{
                this.roleAuthIds.push(item.id);
            }
        })
    },
    handleAuthSave(){
        let ids =  this.$refs.authTree.getCheckedKeys();
        ids.push(...this.$refs.authTree.getHalfCheckedKeys());
        roleAuth({roleId:this.authRoleId,funcIds:ids.toString()}).then(()=>{
            this.authVisible = false;
        });
    },
    handleDelete(row) {
      this.$msgbox
        .confirm("您确认要删除该数据吗?", "删除确认", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          roleDel(row.id).then(() => {
            this.loadList(1);
          });
        });
    },
    handleSave() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          if (!this.dataForm.id) {
            roleAdd(this.dataForm).then((res) => {
              if (res.code === 1) {
                this.editVisible = false;
                this.loadList(1);
              }
            });
          } else {
            roleEdit(this.dataForm).then((res) => {
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
  },
  mounted() {
    this.loadList(1);
    this.loadAllAuth();
  },
};
</script>

<style>
</style>