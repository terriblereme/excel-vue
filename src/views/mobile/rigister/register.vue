<template>
  <vnp-keyboard
    v-model="dataForm.visitingVehicle"
    v-model:show="show"
  ></vnp-keyboard>
  <div class="con-main bangs-bg">
    <el-form
      :model="dataForm"
      ref="dataForm"
      :rules="saveRules"
      label-position="top"
      class="main-form"
    >
      <div v-for="(item, index) in saveDataForm" :key="index">
      <label style="color:#409eff" @click="changeList(index)">
        点击填写第{{index+1}}位访客信息
      </label>
      <div  v-if="showVisitorList==index">
      <el-form-item label="访客姓名" prop="visitingName">
        <el-input v-model="dataForm.visitingName" maxlength="50" />
      </el-form-item>
      <el-form-item label="访客电话" prop="visitingPhone">
        <el-input v-model="dataForm.visitingPhone" maxlength="11" />
      </el-form-item>
      <el-form-item label="身份证号" prop="visitingNumber">
        <el-input v-model="dataForm.visitingNumber" maxlength="18" />
      </el-form-item>
      <el-form-item label="访客单位" prop="visitingDept">
        <el-input v-model="dataForm.visitingDept" maxlength="50" />
      </el-form-item>
      <el-form-item label="车牌号">
        <el-input
          v-model="dataForm.visitingVehicle"
          maxlength="8"
          @click="show = true"
          readonly
        >
        </el-input>
      </el-form-item>
      <el-form-item label="来访时间" prop="visitingTime">
        <el-input
          v-model="dataForm.visitingTime"
          @focus="showDatetimePicker = true"
          readonly
        />
        <van-popup :show="showDatetimePicker" round position="bottom">
          <van-datetime-picker
            type="datetime"
            v-model="currentDate"
            @cancel="showDatetimePicker = false"
            @confirm="confirmDateTime"
          />
        </van-popup>
      </el-form-item>
      <el-form-item label="受访人" prop="interviewee">
        <el-input
          v-model="dataForm.intervieweeName"
          @focus="showPicker = true"
          readonly
        />
        <van-popup :show="showPicker" round position="bottom" teleport="#app">
          <van-cascader
            v-model="dataForm.interviewee"
            title="请选择受访人"
            :options="depts"
            :field-names="{ text: 'name', value: 'id', children: 'children' }"
            @close="showPicker = false"
            @change="onChange"
            @finish="onConfirm"
          />
        </van-popup>
      </el-form-item>
      <el-form-item label="来访事由" prop="visitingReason">
        <el-input v-model="dataForm.visitingReason" maxlength="200" />
      </el-form-item>
      <!-- <el-form-item label="请上传照片" >
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :before-upload="(file)=>beforeAvatarUpload(file,'photo')"
          v-loading="loading"
        >
          <el-image
            v-if="dataForm.photo"
            :src="dataForm.photo"
            fit="cover"
          ></el-image>
          <div v-else class="avatar-else">
            <el-icon class="avatar-uploader-icon"><circle-plus /></el-icon>
            <span> 点击上传 </span>
          </div>
        </el-upload>
      </el-form-item> -->
      <el-form-item label="请上传八闽健康码" >
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :before-upload="(file) => beforeAvatarUpload(file, 'code1')"
          v-loading="loading"
        >
          <el-image
            v-if="dataForm.code1"
            :src="dataForm.code1"
            fit="cover"
          ></el-image>
          <div v-else class="avatar-else">
            <el-icon class="avatar-uploader-icon"><circle-plus /></el-icon>
            <span> 点击上传 </span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="请上传核酸检测报告" >
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :before-upload="(file) => beforeAvatarUpload(file, 'code3')"
          v-loading="loading"
        >
          <el-image
            v-if="dataForm.code3"
            :src="dataForm.code3"
            fit="cover"
          ></el-image>
          <div v-else class="avatar-else">
            <el-icon class="avatar-uploader-icon"><circle-plus /></el-icon>
            <span> 点击上传 </span>
          </div>
        </el-upload>
      </el-form-item>
      </div>
      <div class="bottom-btn">
        <el-button v-if="index !== 0"  type="danger" size="mini" @click="deleteItem(item,index)">
          删除该条访客信息
        </el-button>
      </div>
      <div class="bottom-btn">
        <el-button v-if="index+1== saveDataForm.length" type="primary" size="primary" @click="addItem(index)">
          <el-icon class="avatar-uploader-icon"><circle-plus /></el-icon>
          <span> 添加其他来访人员 </span>
        </el-button>
      </div>
      </div>
    </el-form>
     <el-checkbox v-model="checked">本人已阅读并理解<label style="color:#409eff" @click="showNotice=true">《入园需知》</label>，同意遵守</el-checkbox>
     <van-popup v-model:show="showNotice" round>
       <div class="notice-div">
         <div class="title">入园需知</div>
         <div class="content" v-html="notice"></div>
         <el-button type="primary" round @click="showNotice = false">关闭</el-button>
       </div>
       </van-popup>
    <div class="bottom-btn">
      <el-button v-if="checked" type="primary" round @click="loopSave">提交</el-button>
      <el-button v-else type="info" round  disabled>提交</el-button>
    </div>
  </div>
</template>

<script>
import { deptList, userList, registerSave,getCompany } from "@/api/protal";
import { upload } from "@/api/admin";
import Keyboard from "@/components/vnp-keyboard.vue";
var moment = require("moment");
export default {
  components: {
    "vnp-keyboard": Keyboard,
  },
  data() {
    return {
      loading: false,
      showVisitorList:"0",
      tempIndex:0,
      show: false,
      showKeyboard: true,
      currentDate: new Date(),
      depts: [],
      dataForm: {},
      showPicker: false,
      showDatetimePicker: false,
      checked:false,
      showNotice:false,
      notice:"",
      saveDataForm: [
        {
          visitingName:"",
          visitingPhone:"",
          visitingNumber:"",
          visitingDept:"",
          visitingVehicle:"",
          visitingTime:"",
          intervieweeUnit:"",
          interviewee:"",
          intervieweeName:"",
          intervieweeDept:"",
          intervieweeDeptName:"",
          visitingReason:"",
          code1:"",
          code2:"",
          code3:"",
        }
        ],
        saveRules: {
        visitingName: [
          { required: true, trigger: "blur", message: "请输入访客姓名" },
        ],
        visitingPhone: [
          { required: true, trigger: "blur", message: "请输入手机号码" },
          {
            type: "number",
            trigger: "blur",
            message: "请输入正确的手机号码",
            transform(value) {
              if (!/^1[3-9][0-9]{9}$/.test(value)) return false;
            },
          },
        ],
        visitingNumber: [
          { required: true, trigger: "blur", message: "请输入身份证号码" },
          {
            trigger: "blur",
            message: "请输入正确的身份证号码",
            transform(value) {
              if (!/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/.test(value))
                return false;
            },
          },
        ],
        visitingDept: [
          { required: true, trigger: "blur", message: "请输入访客单位" },
        ],
        visitingTime: [
          { required: true, trigger: "change", message: "请输入来访时间" },
        ],
        interviewee: [
          { required: true, trigger: "change", message: "请选择受访人" },
        ],
        visitingReason: [
          { required: true, trigger: "blur", message: "请输入来访事由" },
        ],

      },
    };
  },
  methods: {
  
    beforeAvatarUpload(file, prop) {
      let suffix = file.name
        .substring(file.name.lastIndexOf(".") + 1)
        .toLowerCase();
      const isJPG = ["jpg", "png", "jpeg"].includes(suffix);
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.$message.error("图片格式仅支持JPG和PNG");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("图片大小不可超过 2MB!");
        return false;
      }
      if (isJPG && isLt2M) {
        this.loading = true;
        upload(file).then((res) => {
          this.loading = false;
          if (res.code == 1) {
            this.dataForm[prop] = res.data.path;
          } else {
            this.$message.error(res.msg);
          }
        });
      }
      return false;
    },
    loadDepts() {
      deptList().then((res) => {
        this.depts = res.data;
      });
    },
    loadNotice(){
      getCompany(2).then((res)=>{
        this.notice = res.data.intro
      })
    },
    onChange(value) {
      let selected = value.selectedOptions[value.selectedOptions.length - 1];
      if (selected.children &&!selected.isLoad) {
        selected.isLoad = true;
        userList({ deptId: selected.id }).then((res) => {
          let users = res.data.map((item) => {
            item.name = item.nickName;
            return item;
          });
          selected.children.push(...users);
        });
      }
    },
    onConfirm(value) {
      this.dataForm.intervieweeUnit = value.selectedOptions[0].name;
      let selected = value.selectedOptions[value.selectedOptions.length - 1];
      this.dataForm.interviewee = selected.id;
      this.dataForm.intervieweeName = selected.name;
      this.dataForm.intervieweeDept = selected.deptId;
      this.dataForm.intervieweeDeptName = selected.deptName;
      this.showPicker = false;
    },
    confirmDateTime(value) {
      this.dataForm.visitingTime = moment(value).format("yyyy-MM-DD HH:mm");
      this.showDatetimePicker = false;
    },
    handleSave() {
      this.$refs.dataForm.validate((valid) => {
        this.dataForm.openid = this.$store.state.openid;
        if (valid) {
          registerSave(this.dataForm);
        }
      });
    },
    loopSave(){
      this.$refs.dataForm.validate((valid) => {
        this.dataForm.openid = this.$store.state.openid;
        if (valid) {
          this.saveDataForm[this.tempIndex]=this.dataForm
          let len=this.saveDataForm.length
          for (let i=0;i<len;i++){
            this.dataForm=this.saveDataForm[i]
            registerSave(this.dataForm);
          }
        }
      });
          this.$router.push("/mobile/home");
    },
    changeList(index){
      //let obj={}
      this.saveDataForm[this.tempIndex]=this.dataForm
      this.dataForm=this.saveDataForm[index]
      this.showVisitorList=index
      //this.changeDataForm(index)
      this.tempIndex=index

    },
    deleteItem(item,index){
      this.saveDataForm.splice(index,1)
      this.showVisitorList=this.showVisitorList-1
      this.tempIndex=this.tempIndex-1
    },
    addItem(index){
      let itemObj={
        visitingName:"",
        visitingPhone:"",
        visitingNumber:"",
        visitingDept:this.dataForm.visitingDept,
        visitingVehicle:this.dataForm.visitingVehicle,
        visitingTime:this.dataForm.visitingTime,
        intervieweeUnit:this.dataForm.intervieweeUnit,
        interviewee:this.dataForm.interviewee,
        intervieweeName:this.dataForm.intervieweeName,
        intervieweeDept:this.dataForm.interviewee,
        intervieweeDeptName:this.dataForm.intervieweeName,
        visitingReason:this.dataForm.visitingReason,
        code1:"",
        code2:"",
        code3:"",
      }
      this.$refs.dataForm.validate((valid) => {
        this.dataForm.openid = this.$store.state.openid;
        if (valid) {
          this.showVisitorList=index+1
          this.tempIndex=index+1
          this.saveDataForm[index]=this.dataForm
          this.dataForm=itemObj
          this.saveDataForm.push(itemObj)
       }
      });
    },

  },
  mounted() {
    this.loadDepts();
    this.loadNotice();
  },
};
</script>

<style lang="scss" scoped>
.notice-div{
  width: 80vw;
  padding: 5.3333vw;
  .title{
    font-size: 4vw;
    text-align: center;
    font-weight: 600;
    letter-spacing: 0.2667vw;
    margin-bottom: 5.3333vw;
  }
  .content{
    font-size: 3.4667vw;
    min-height: 50vh;
    margin-bottom: 5.3333vw;
  }
  .el-button{
    width: 100%;
  }

}
</style>