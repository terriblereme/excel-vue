<template>
<div>
  <div >
      <el-button   class="tool" type="primary" plain @click="turnBack">返回</el-button>
      <el-button   class="tool" plain @click="onData">查看其它</el-button>
    <el-button   class="tool" plain @click="saveModel">保存模板</el-button>
    <el-button   class="tool" plain @click="download">导出</el-button>
    <el-button   class="tool"  @click="printExcel"  type="success" plain v-print="'#print-html'">打印</el-button>
  </div>
  <div id="myModal" class="modal">
    <!-- 弹窗内容 -->
    <div class="modal-content">
      <div>
      <p> 请输入模板名称:</p>
        <el-input style="margin:25px;width: 600px;text-align:center;"  v-model="createName" maxlength="11" />
    </div>
      <div style="margin:25px; text-align:center;">
        <el-button  class="button" type="primary"   @click="turnBack">添加</el-button>
        <el-button class="button" type="danger"   @click="closePopup">取消</el-button>
      </div>
    </div>
  </div>

</div>
<div>
  <!--    打印内容区域，默认不显示，点击打印后才显示-->
   <div id="print-area" style="
     display: none;
     position: absolute;
     z-index: 0;
     top: 25px;
     width: 10vh;
     height: 10vh;
     overflow: hidden;">
   </div>
   <div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;top: 45px;"></div>
   <div id="print-html" style="text-align: center;"></div>
 </div>
 </template>
 <script>
 import LuckyExcel from 'luckyexcel'
 import exportExcel from '@/api/exportExcel.js'

 import sheetChart from '@/chart/sheetChart'
 //import Print from "print-js";
 //import Print from 'vue-print-nb';

 export default {
   name: 'EditExcel',
   flag: true,
   props: {
     // 显示的excel文件
     file: {
       default: () => {
         return null
       },
       type: Object
     },
     // 打印时base64图片的位置
     printPosition: {
       default: 'center',
       type: String
     },
     showDownload: {
       type: Boolean,
       default: true
     },
     showExport: {
       type: Boolean,
       default: true
     },
     showImport: {
       type: Boolean,
       default: true
     },
     showPrintDefault: {
       type: Boolean,
       default: true
     },
     showPrint: {
       type: Boolean,
       default: true
     }
   },
   data() {
     return {
       createName:'',
       show: false,
       // excel基础配置
       luckysheetParam: {
         // 对应区域
         containerId: 'editSheet',
         // 语言
         lang: 'zh'
       },
       // 打印基础配置
       printParam: {
         // 对应区域
         id: 'print_html'
       },
       option1:{
         container: "luckysheet",
         title: '123456', // 设定表格名称
         lang: 'zh', // 设定表格语言
         name: "Cell", //工作表名称
         showtoolbarConfig: {
           print: false // 隐藏插件内部打印按钮
         },
         showinfobar: false, // 显示头部返回标题栏
         data: [
           {
             name: 'cell',
             color: 'red',
             index: 1,
             status: 1,
             order: 1,
             celldata: [
               {
                 r: 0, // 行
                 c: 0, // 列
                 v: 'udsfhauhduahufhuh' // 值
               },
             ],
             config: {}
           },
         ]
       }
     }
   },
   created() {
     this.initExcel1()
   },
   mounted() {
     if (this.file) {
       this.beforeUpload(this.file)
       return
     }
     // eslint-disable-next-line no-debugger
    // this.initExcel()
   },
   methods: {
     /**
      * @description: 初始化excel
      * @author: flyer
      * @param {Object} exportJson 初始化数据
      */
     initExcel1() {
       var options=this.option1
       console.log(options.data[0].celldata[0].v)
       options.data[0].celldata[0].v="第一格的定位测试"
       this.$nextTick(() => {
         $(function () {
           luckysheet.create(
               options
           );
         });
       });
     },
     /**
      * @description: 查看表格参数
      * @author: flyer
      * @param {Boolean} flag 是否默认打印
      */
     onCheck(){
        console.log(luckysheet.getAllSheets())
     },
     onData(){
       console.info(luckysheet.getAllSheets())
     },

     /**
      * @description: 保存模板
      * @author: flyer
      * @param {Object}
      */
     //关闭弹窗
     closePopup(){
       var modal = document.getElementById('myModal');
       modal.style.display = "none";
     },
     //弹窗保存
     saveModel(){
       var modal = document.getElementById('myModal');
       modal.style.display = "block";

     },
     //调用接口保存
     createModel(){


     },
     /**
      * @description: 返回功能
      * @author: flyer
      */
     turnBack(){
       this.$router.back();
     },
     /**
      * @description: 自动划区的打印功能
      * @author: flyer
      */
     // 获取表格中包含内容的row，column
     getExcelRowColumn() {
       const sheetData = luckysheet.getSheetData();
       let objRowColumn = {
         row: [null, null], //行
         column: [null, null], //列
       };
       sheetData.forEach((item, index) => {
         //行数
         item.forEach((it, itemIndex) => {
           if (it !== null) {
             if (objRowColumn.row[0] == null) objRowColumn.row[0] = index; // row第一位
             objRowColumn.row[1] = index; //row第二位
             if (objRowColumn.column[0] == null)
               objRowColumn.column[0] = itemIndex; //column第一位
             objRowColumn.column[1] = itemIndex; //column第二位
           }
         });
       });
       return objRowColumn;
     },
     printExcel() {
       //document.querySelector("#print-area").style.display = "block";
       window.luckysheet.hideGridLines();
       let RowColumn = this.getExcelRowColumn() // 获取有值的行和列
       RowColumn.column[0] = 0 ;//因需要打印左边的边框，需重新设置
       luckysheet.setRangeShow(RowColumn) // 进行选区操作
       let src = luckysheet.getScreenshot(); // 生成base64图片
       //let $img = `<img src=${src} style="width: 100%;position: absolute;left:-20px" />`;
       let $img = `<img src=${src} style="max-width: 90%;" />`;

        this.$nextTick(() => {
          document.querySelector("#print-html").innerHTML = $img;
        });
       window.luckysheet.showGridLines();
     },
     /**
      * @description: 获取在线excel数据后编辑成excel文件导出
      * @author: flyer
      */
     async exportExcel() {
       // eslint-disable-next-line no-undef
       const data = luckysheet.getluckysheetfile()
       const exportData = await exportExcel(data)
       const blob = new Blob([exportData])
       const file = new File([blob], this.file?.name || '文档.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
       return file
     },

     /**
      * @description: 导出excel文件对象
      * @author: flyer
      */
     async exportFile() {
       const file = await this.exportExcel()
       // this.$emit('exportFile', file)
       this.beforeUpload(file)
     },

     /**
      * @description: 浏览器导出excel
      * @author: flyer
      * @param {Object} blob excel数据，也可以是file对象
      */
     async download() {
       const file = await this.exportExcel()
       if (window.navigator && window.navigator.msSaveBlob) {
         window.navigator.msSaveBlob(file, file.name)
       } else {
         const a = document.createElement('a')
         a.download = file.name
         a.href = URL.createObjectURL(file)
         a.style.display = 'none'
         document.body.appendChild(a)
         a.click()
         document.body.removeChild(a)
       }
     },

     /**
      * @description: 导入excel文件
      * @author: flyer
      * @param {Object} file excel文件
      */
     beforeUpload(file) {
       const suffix = file.name.split('.')
       if (suffix[suffix.length - 1] !== 'xlsx') {
         this.$message.error('文件格式只能是.xlsx')
         return false
       }
       // eslint-disable-next-line no-undef
       luckysheet.destroy()
       // eslint-disable-next-line no-undef
       LuckyExcel.transformExcelToLucky(file, (exportJson) => {
         if (exportJson.sheets == null || exportJson.sheets.length === 0) {
           this.$message.warning('读取excel文件内容失败，目前不支持xls文件!')
           return
         }
         this.initExcel(exportJson)
       })
     }
   }
 }


 </script>

 <style lang="scss" scoped>
 $height:40px;
 /* 弹窗 (background) */
 .modal {
   display: none;
   /* 默认隐藏 */
   position: fixed;
   /* 固定定位 */
   z-index: 99;
   /* 设置在顶层 */
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   overflow: auto;
   background-color: rgb(0, 0, 0);
   background-color: rgba(0, 0, 0, 0.4);
 }

 /* 弹窗内容 */
 .modal-content {
   background-color: #fefefe;
   margin: 15% auto;
   padding: 20px;
   border: 1px solid #888;
   width: 40%;
 }
 /* 关闭按钮 */
 .close {
   color: #aaa;
   float: right;
   font-size: 28px;
   font-weight: bold;
 }
 .lucky-excel{
   position:relative;overflow:hidden;width:100%;height:100%;
   .container{
     width:100%;height:calc(100% - #{$height});
   }
 .button{
   margin-right:180px;
   width: 80px;
   height: 40px;
 }
   .tool-bar{
     display:flex;width:100%;height: $height;justify-content:left;align-items:center;
     ::v-deep .el-button{
       padding:0 10px;
       height: 30px;
       line-height: 30px;
     }
     .tool{
       margin-left:100px
     }

   }
 }
 </style>