<template>
  <div>
    <div class="top-bread">
      <div class="top-line"></div>
      <span class="top-title">广告管理</span>
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
            <el-form-item label="广告位置">
              <el-select
                v-model="searchForm.location"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in locations"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
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
        <el-table-column
          prop="location"
          label="位置"
          width="280"
          :formatter="convertLoc"
        />
        <el-table-column label="图片">
          <template #default="scope">
            <img :src="scope.row.path" style="height: 40px" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template #default="scope">
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
    <el-dialog v-model="editVisible" title="编辑">
      <el-form :model="dataForm" ref="dataForm" :rules="saveRules">
        <el-form-item label="位置" prop="location">
          <el-select v-model="dataForm.location" placeholder="请选择">
            <el-option
              v-for="item in locations"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片" prop="path">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            v-loading="loading"
          >
            <el-image
              style="height: 9.2708vw; width: 9.2708vw"
              v-if="dataForm.path"
              :src="dataForm.path"
              fit="scale-down"
            ></el-image>
            <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
          </el-upload>
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
import { advList, upload, advAdd, advEdit, advDel } from "@/api/admin";
export default {
  data() {
    return {
      loading: false,
      total: 0,
      searchForm: {
        location: "",
        pageNum: 1,
        pageSize: 10,
      },
      locations: [
        { label: "荣誉资质", value: "1" },
        { label: "首页底", value: "2" },
        { label: "公司简介", value: "3" },
      ],
      list: [],
      editVisible: false,
      dataForm: {
        id: null,
        location: "",
        path: "",
      },
      saveRules: {
        location: [{ required: true, trigger: "blur", message: "请选择位置" }],
        path: [{ required: true, trigger: "blur", message: "请上传图片" }],
      },
    };
  },
  methods: {
    convertLoc(row) {
      const item = this.locations.find(function (l) {
        return l.value === row.location;
      });
      return item != null ? item.label : "";
    },
    loadList(pageNum) {
      this.searchForm.pageNum = pageNum;
      advList(this.searchForm).then((res) => {
        this.list = res.data;
        this.total = res.total;
      });
    },
    handleAdd() {
      this.editVisible = true;
      if (this.$refs.dataForm !== undefined) this.$refs.dataForm.resetFields();
      this.dataForm.id = null;
      this.dataForm.location = "";
      this.dataForm.path = "";
    },
    handleEdit(row) {
      this.editVisible = true;
      if (this.$refs.dataForm !== undefined) this.$refs.dataForm.resetFields();
      this.dataForm.id = row.id;
      this.dataForm.location = row.location;
      this.dataForm.path = row.path;
    },
    handleDelete(row) {
      this.$msgbox
        .confirm("您确认要删除该数据吗?", "删除确认", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          advDel(row.id).then(() => {
            
            this.loadList(1);
          });
        });
    },
    handleSave() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          if (!this.dataForm.id) {
            advAdd(this.dataForm).then((res) => {
              if (res.code === 1) {
                this.editVisible = false;
                this.loadList(1);
              }
            });
          } else {
            advEdit(this.dataForm).then((res) => {
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
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("图片格式仅支持JPG和PNG");
      }
      if (!isLt2M) {
        this.$message.error("图片大小不可超过 2MB!");
      }
      if (isJPG && isLt2M) {
        this.loading = true;
        upload(file).then((res) => {
          this.loading = false;
          this.dataForm.path = res.data.path;
        });
      }

      return false;
    },
  },
  mounted() {
    this.loadList(1);
  },
};
</script>

<style>
</style>