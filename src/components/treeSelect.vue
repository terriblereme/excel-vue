<template>
    <el-select
      placeholder="请选择"
      clearable
      v-model="selectValue"
      @clear="selectClear"
    >
      <el-option
        :label="selectLabel"
        :value="selectValue"
        style="height: auto; padding: 0"
      >
        <el-tree
          :data="treeData"
          :props="defaultProps"
          @node-click="nodeClick"
        />
      </el-option>
    </el-select>
</template>

<script>
export default {
  data() {
    return {
      selectLabel: this.modelLabel,
      selectValue: this.modelValue,
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },
  props: {
    treeData: null,
    modelValue:{
      default:''
    },
    modelLabel:{
      default:''
    }
  },
  watch:{
     //监听父prop传的value
    modelLabel(newVal){
      this.selectLabel=newVal;
    },
    //监听父prop传的value
    modelValue(newVal){
      this.selectValue=newVal;
    },
    //监听子组件value,通知父组件
    selectValue(newVal){
      this.$emit("update:modelValue", newVal);
    },
  },
  methods: {
    selectClear() {
      this.selectLabel = "";
      this.selectValue = "";
    },
    nodeClick(data) {
      this.selectLabel = data.name;
      this.selectValue = data.id;
      this.$emit('on-click',this.selectValue);
    },
  },
  mounted() {},
};
</script>

<style scoped>
</style>