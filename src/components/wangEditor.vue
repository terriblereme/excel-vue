<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align: left"></div>
  </div>
</template>
<script>
import E from "wangeditor";
import { upload } from "@/api/admin";
export default {
  data() {
    return {
      editor: null,
      editorContent: this.modelValue,
    };
  },
  props: {
    modelValue: {
      default: "",
    },
  },
  watch: {
    modelValue(newVal) {
      if (newVal == "") {
        this.editor.txt.clear();
      } else {
        this.editor.txt.html(newVal);
      }
    },
    editorContent(newVal) {
      this.$emit("update:modelValue", newVal);
    },
  },
  methods: {},
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.config.onchange = (html) => {
      this.editorContent = html;
    };
    // 配置菜单栏，设置不需要的菜单
    this.editor.config.excludeMenus = ["undo", "redo"];

    //配置上传图片
    this.editor.config.uploadImgAccept = ["jpg", "jpeg","png"];
    this.editor.config.customUploadImg = (resultFiles, insertImgFn) => {
      let file = resultFiles[0];
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("图片大小不可超过 2MB!");
      }else{
         upload(file).then((res) => {
            // 上传图片，返回结果，将图片插入到编辑器中
          insertImgFn(res.data.path);
        });
      }
 
     
    };
    //配置上传视频
    this.editor.config.uploadVideoMaxSize = 1 * 1024 * 1024; // 500m
    this.editor.config.uploadVideoAccept = ["mp4"];
    this.editor.config.customUploadVideo = (resultFiles, insertVideoFn) => {
      // resultFiles 是 input 中选中的文件列表
      // insertVideoFn 是获取视频 url 后，插入到编辑器的方法
      let file = resultFiles[0];
      const isLt = file.size / 1024 / 1024 < 400;
      if (!isLt) {
        this.$message.error("视频大小不可超过 400MB!");
      } else {
        upload(file).then((res) => {
          // 上传视频，返回结果，将视频地址插入到编辑器中
          insertVideoFn(res.data.path);
        });
      }
    };
    this.editor.create(); // 创建富文本实例
  },
};
</script>

<style>
</style>