<template>
  <div v-if="!isWeiXin">
    <router-view />
  </div>
  <div v-else class="wxpng">
    <img src="@/assets/img/pc.png" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPC: false,
      isWeiXin:false,
    };
  },
  created() {
     let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
      if(flag)
      this.isPC=false
      else
      this.isPC=true
       //判断是否微信客户端
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      this.isWeiXin = true;
    } else {
      this.isWeiXin = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.wxpng {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>