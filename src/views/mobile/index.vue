<template>
  <div class="mobile-main">
    <div v-if="isWeiXin">
      <router-view />
    </div>
    <div v-else class="wxpng">
      <img src="@/assets/img/wx1.png" />
    </div>
  </div>
</template>
<script>
import "@/assets/style/mobile.scss";
export default {
  data() {
    return {
      isWeiXin: true,
    };
  },
  methods: {},
  created() {
    // 判断是否微信客户端
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      this.isWeiXin = true;
    } else {
      this.isWeiXin = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.mobile-main {
  background-color: #f5f9fc;
  min-height: 100vh;
  .wxpng {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
}
</style>