<template>
  <div>
    <div class="header">
      <img src="@/assets/logo.png" />
      <span>
        <p>厦门海鑫金融保安守押有限公司</p>
        <p>Xiamen Haixin financial security guard Co., Ltd</p>
      </span>
    </div>
    <img src="@/assets/img/contactus.png" style="width:100%"/>
  </div>
</template>
<script>
import { getCompany } from "@/api/protal";
export default {
  data() {
    return {
      company: {},
    };
  },
  methods: {},
  mounted() {
    getCompany(1).then((res) => {
      this.company = res.data;
    });
  },
};
</script>

<style lang="scss"  scoped>
</style>