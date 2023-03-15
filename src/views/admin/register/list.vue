<template>
  <div>
    <div class="top-bread">
      <div class="top-line"></div>
      <span class="top-title">来访记录</span>
    </div>
    <div class="table-main">
      <div class="search-div">
        <div class="btn"></div>
        <div class="search-form">
          <el-form :inline="true">
            <el-form-item label="关键字">
              <el-input v-model="searchForm.keyword" />
            </el-form-item>
            <el-form-item label="状态">
              <el-select
                v-model="searchForm.state"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in stateList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="来访时间">
              <el-date-picker
                v-model="daterange"
                type="daterange"
                range-separator="到"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="YYYY-MM-DD"
                @change="searchDateChange"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="Search" @click="loadList(1)"
                >查询</el-button
              >
              <el-button
                type="primary"
                icon="Download"
                @click="download()"
                v-if="hasPermission('register-export')"
                >导出</el-button
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
        size="small"
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
        <el-table-column prop="visitingDept" label="来访单位" />
        <el-table-column prop="visitingName" label="来访者" />
        <el-table-column prop="visitingPhone" label="来访者电话" />
        <el-table-column prop="visitingVehicle" label="车牌号" />
        <el-table-column prop="visitingTime" label="来访时间" />
        <el-table-column prop="intervieweeName" label="受访者" />
        <el-table-column prop="intervieweeDeptName" label="受访部门" />
        <el-table-column prop="intervieweeUnit" label="受访单位" />
        <el-table-column label="状态" prop="state" :formatter="formatState" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleDesc(scope.row)"
              v-if="hasPermission('register-desc')"
              >详情</el-button
            >
            <el-button
              size="mini"
              type="text"
              @click="handleExit(scope.row)"
              v-if="hasPermission('register-exit') && scope.row.state == 2"
              >离开</el-button
            >
            <el-button
              size="mini"
              type="text"
              style="color: #f56c6c"
              @click="handleDelete(scope.row)"
              v-if="hasPermission('register-del')"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="page-div">
        <el-pagination
          :page-size="searchForm.pageSize"
          background
          layout="total, prev, pager, next"
          :total="total"
          @current-change="loadList"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog v-model="editVisible" :title="dialogTitle">
      <el-form :model="dataForm" ref="dataForm">
        <el-form-item label="来访时间">
          <el-input v-model="dataForm.visitingTime" disabled />
        </el-form-item>
        <el-form-item label="来访单位">
          <el-input v-model="dataForm.visitingDept" disabled />
        </el-form-item>
        <el-form-item label="来访者">
          <el-input v-model="dataForm.visitingName" disabled />
        </el-form-item>
        <el-form-item label="访客电话">
          <el-input v-model="dataForm.visitingPhone" disabled />
        </el-form-item>
      
        <el-form-item label="健康信息">
          <el-image
            style="height: 6.6667vw; width: 6.6667vw; border: 1px solid #e4e7ed"
            :src="dataForm.code1"
            :preview-src-list="srcList"
            fit="contain"
          >
          </el-image>
          <el-image
            style="height: 6.6667vw; width: 6.6667vw; border: 1px solid #e4e7ed"
            :src="dataForm.code2"
            :preview-src-list="srcList"
            fit="contain"
          >
          </el-image>
          <el-image
            style="height: 6.6667vw; width: 6.6667vw; border: 1px solid #e4e7ed"
            :src="dataForm.code3"
            :preview-src-list="srcList"
            fit="contain"
          >
          </el-image>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="dataForm.visitingNumber" disabled />
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="dataForm.visitingVehicle" disabled />
        </el-form-item>
        <el-form-item label="来访事由">
          <el-input v-model="dataForm.visitingReason" disabled />
        </el-form-item>
        <el-form-item label="受访者">
          <el-input v-model="dataForm.intervieweeName" disabled />
        </el-form-item>
        <el-form-item label="受访部门">
          <el-input v-model="dataForm.intervieweeDeptName" disabled />
        </el-form-item>
        <el-form-item label="受访单位">
          <el-input v-model="dataForm.intervieweeUnit" disabled />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="dataForm.state" disabled>
            <el-option label="待审核" value="1"> </el-option>
            <el-option label="已通过" value="2"> </el-option>
            <el-option label="已拒绝" value="3"> </el-option>
            <el-option label="已离开" value="4"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核人">
          <el-input v-model="dataForm.reviewName" disabled />
        </el-form-item>
        <el-form-item label="审核时间">
          <el-input v-model="dataForm.reviewTime" disabled />
        </el-form-item>
        <el-form-item label="离开确认">
          <el-input v-model="dataForm.guardName" disabled />
        </el-form-item>
        <el-form-item label="离开时间">
          <el-input v-model="dataForm.leaveTime" disabled />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import qs from "qs";
import { registerList, registerDel, registerEdit } from "@/api/admin";
import { apiDevelop } from "@/utils/config";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      total: 0,
      searchForm: {
        intervieweeDept: null,
        keyword: "",
        pageNum: 1,
        pageSize: 10,
      },
      daterange: [],
      list: [],
      editVisible: false,
      dialogTitle: "",
      dataForm: {},
      srcList: [],
      stateList: [
        {
          label: "待审核",
          value: "1",
        },
        {
          label: "已通过",
          value: "2",
        },
        {
          label: "已拒绝",
          value: "3",
        },
        {
          label: "已离开",
          value: "4",
        },
      ],
    };
  },
  methods: {
    formatState(row) {
      let st = this.stateList.find((item) => {
        return item.value === row.state;
      });
      return st.label;
    },
    download() {
      let url =
        apiDevelop +
        "/bsRegisters/excelExport?" +
        qs.stringify(this.searchForm);
      window.open(url);
    },
    searchDateChange() {
      if (this.daterange) {
        this.searchForm.startTime = this.daterange[0];
        this.searchForm.endTime = this.daterange[1];
      } else {
        this.searchForm.startTime = "";
        this.searchForm.endTime = "";
      }
    },
    loadList(pageNum) {
      this.searchForm.pageNum = pageNum;
      registerList(this.searchForm).then((res) => {
        this.list = res.data;
        this.total = res.total;
      });
    },
    handleDesc(row) {
      this.editVisible = true;
      this.dialogTitle = "详情";
      this.dataForm = row;
      this.srcList = [row.photo, row.code1, row.code2, row.code3];
    },
    handleExit(row) {
      registerEdit({
        id: row.id,
        state: 4,
        guardName: this.user.nickName,
      }).then(() => {
        this.loadList();
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
          registerDel(row.id).then(() => {
            this.loadList(1);
          });
        });
    },
  },
  mounted() {
    // this.searchForm.intervieweeDept = this.$store.state.user.deptId;
     this.searchForm.parentDept = this.$store.state.user.deptId;
    this.loadList(1);
  },
};
</script>

<style>
</style>