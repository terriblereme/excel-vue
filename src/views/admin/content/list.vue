<template>
  <div>
        <div class="top-bread">
      <div class="top-line"></div>
      <span class="top-title">内容管理</span>
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
          <el-form-item label="分类">
            <el-select
              v-model="searchForm.category"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in categorys"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="Search" @click="loadList(1)">查询</el-button>
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
          {{(this.searchForm.pageNum-1)*this.searchForm.pageSize+scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="580" />
      <el-table-column
        prop="category"
        label="分类"
        :formatter="convertLoc"
      />
      <el-table-column label="状态" prop="state" :formatter="formatState" />
      <el-table-column prop="createTime" label="时间" />
      <el-table-column label="操作" width="300">
        <template #default="scope">
          <el-button
            v-if="scope.row.state === '0'"
            size="mini"
            plain
            type="primary"
            @click="handlePush(scope.row)"
            >发布</el-button
          >
          <el-button
            v-else
            size="mini"
            plain
            type="primary"
            @click="handlePush(scope.row)"
            >撤销</el-button
          >
          <el-button
            size="mini"
            plain
            type="primary"
            @click="handleEdit(scope.row)"
            >修改</el-button
          >

          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="page-div">
      <el-pagination
        :page-size="searchForm.pageSize"
        :current-page="searchForm.pageNum"
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
        <el-form-item label="标题" prop="title">
          <el-input v-model="dataForm.title" />
        </el-form-item>

        <el-form-item label="分类" prop="category">
          <el-select v-model="dataForm.category" placeholder="请选择">
            <el-option
              v-for="item in categorys"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="dataForm.author" />
        </el-form-item>
        <el-form-item label="封面">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            v-loading="loading"
          >
            <el-image
              style="height: 9.2708vw; width: 9.2708vw"
              v-if="dataForm.img"
              :src="dataForm.img"
              fit="scale-down"
            ></el-image>
            <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="简介" prop="intro">
          <el-input v-model="dataForm.intro"  :rows="5"
    type="textarea" />
        </el-form-item>
        <el-form-item label="详情">
          <wangeditor
            v-model="dataForm.content"
          ></wangeditor>
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
import {
  contentList,
  contentGet,
  upload,
  contentAdd,
  contentEdit,
  contentDel,
  contentChangeState,
} from "@/api/admin";
import wangeditor from "@/components/wangEditor.vue";
export default {
  components: {
    wangeditor,
  },
  data() {
    return {
      editor: null,
      loading: false,
      total: 0,
      searchForm: {
        category: "",
        pageNum: 1,
        pageSize: 10,
      },
      categorys: [
        { label: "海鑫文化", value: "1" },
        { label: "业务介绍", value: "6" },
        { label: "海鑫动态", value: "2" },
        { label: "重要通知", value: "5" },
        { label: "学习园地", value: "7" },
        { label: "党建园地", value: "3" },
        { label: "人才招聘", value: "4" },
      ],
      list: [],
      dialogTitle:'',
      editVisible: false,
      dataForm: {},
      saveRules: {
        title: [
          { required: true, trigger: "blur", message: "请输入标题" },
          { max: 200, message: "标题最大长度200", trigger: "blur" },
        ],
        category: [{ required: true, trigger: "blur", message: "请选择分类" }],
        author: [{ max: 100, message: "作者最大长度100", trigger: "blur" }],
        intro: [{ max: 255, message: "简介最大长度255", trigger: "blur" }],
      },
    };
  },
  methods: {
    formatState(row) {
      return row.state === "0" ? "未发布" : "已发布";
    },
    convertLoc(row) {
      const item = this.categorys.find(function (ca) {
        return ca.value === row.category;
      });
      return item != null ? item.label : "";
    },
    loadList(pageNum) {
      this.searchForm.pageNum = pageNum;
      contentList(this.searchForm).then((res) => {
        this.list = res.data;
        this.total = res.total;
      });
    },
    handleAdd() {
      this.editVisible = true;
      this.dialogTitle="新建";
      if (this.$refs.dataForm !== undefined) this.$refs.dataForm.resetFields();
      Object.keys(this.dataForm).forEach((key) => (this.dataForm[key] = ""));
    },
    handleEdit(row) {
      this.editVisible = true;
      this.dialogTitle="编辑";
      if (this.$refs.dataForm !== undefined) this.$refs.dataForm.resetFields();
      contentGet(row.id).then((res) => {
        let data = res.data;
        this.dataForm.id = data.id;
        this.dataForm.category = data.category;
        this.dataForm.author = data.author;
        this.dataForm.img = data.img;
        this.dataForm.intro = data.intro;
        this.dataForm.title = data.title;
        this.dataForm.content = data.content;
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
          contentDel(row.id).then(() => {
            this.loadList(1);
          });
        });
    },
    handleSave() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          if (!this.dataForm.id) {
            contentAdd(this.dataForm).then((res) => {
              if (res.code === 1) {
                this.editVisible = false;
                this.loadList(1);
              }
            });
          } else {
            contentEdit(this.dataForm).then((res) => {
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
      contentChangeState(row.id).then((res) => {
        if (res.code == 1) {
          this.loadList();
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
          this.dataForm.img = res.data.path;
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