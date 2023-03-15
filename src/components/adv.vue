<template>
      <el-carousel  :type="cardType" arrow="never" indicator-position="none">
        <el-carousel-item v-for="item in imgs" :key="item.id">
          <img :src="item.path" />
        </el-carousel-item>
      </el-carousel>

</template>

<script>
import { getAdv } from "@/api/protal";
export default {
  name: "ad",
  props: {
    id: Number,
    cardType: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loading:true,
      imgs: [],
    };
  },
  mounted() {
    getAdv(this.id).then((res) => {
      this.loading=false;
      this.imgs = res.data;
    });
  },
};
</script>

<style>
.el-carousel,.el-carousel__container,.el-carousel__container img {
  width: 100%;
  height: 100%;
}
</style>
