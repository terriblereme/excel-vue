<template>
  <div class="con-main">
    <div class="con-item">
      <img src="@/assets/img/edit-icon.png" />
      <span
        ><h5>来访登记</h5>
        <p>请填写来访人员信息</p></span
      >
      <van-button round type="primary" @click="goRegister"
        >预约</van-button
      >
    </div>
    <div class="con-item">
      <img src="@/assets/img/search-icon.png" />
      <span
        ><h5>登记查询</h5>
        <p>查询登记结果</p></span
      >
      <van-button round type="primary" @click="$router.push(`/mobile/search`)"
        >查询</van-button
      >
    </div>
    <div class="con-item">
      <img src="@/assets/img/manage-icon.png" />
      <span
        ><h5>来访管理</h5>
        <p>来访登记管理</p></span
      >
      <van-button round type="primary" @click="$router.push(`/mobile/manage`)"
        >管理</van-button
      >
    </div>
    <el-image style="width: 100%;" :src="require('@/assets/img/tingche.png')" fit="scale-down"  :preview-src-list="[require('@/assets/img/tingche.png')]"/>
  </div>
</template>

<script>
import { appid,redirecturi,getUrlKey } from "@/utils/config";
import { getOpenid,registerVerfy } from "@/api/protal";
export default {
  created() {
    // let openid ="ogF1-1Q6MbXkNn0xnbnjznU-A6Wg";
    // this.$store.commit("SET_OPENID", openid);
    let openid = this.$store.state.openid;
    if (!openid) {
      let code = getUrlKey("code");
      if (code) {
        getOpenid(code).then((res) => {
          let openid = res.data;
          this.$store.commit("SET_OPENID", openid);
        });
      } else {
        let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirecturi}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
        window.location.replace(url);
      }
    }
  },
  methods:{
    goRegister(){
      let openid = this.$store.state.openid;
      registerVerfy({openId:openid}).then((res)=>{
        if(res.code==1)
        this.$router.push(`/mobile/register`);
      })
    }
  }

};
</script>

<style lang="scss" scoped>
.con-main {
  background-image: url("../../../assets/img/title/mobile2.png");
  background-position: top;
  background-size: 100% auto;
  .con-item {
    display: flex;
    padding: 5.3333vw 6vw;
    border-radius: 4vw;
    background: #fff;
    justify-content: space-between;
    align-items: center;
    margin: 2.6667vw 0;
    &:first-child {
      margin-top: 31.3333vw;
    }
    img {
      width: 8.6667vw;
      height: 8.6667vw;
    }
    span {
      width: 42.2667vw;
      text-align: left;
      h5 {
        font-size: 4.2667vw;
        color: #1c252c;
        margin-bottom: 5.0667vw;
      }
      p {
        color: #656565;
        font-size: 3.6vw;
      }
    }
    .van-button {
      width: 21.2vw;
      height: 8.4vw;
      font-size: 4.4vw;
      background: #3366f7;
    }
  }
}
</style>