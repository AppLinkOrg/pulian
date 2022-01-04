
<script setup>
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { ref } from "vue";
let page = ref({});
let footermenu = ref([{ name: "ihia", url: "/", newpage_value: "Y" }]);
PageHelper.Init(page, () => {});

</script>
<template>
  <div
    class="footer flex-row flex-center"
    v-if="page.Res != null && page.Inst != null && page.Text != null"
  >
    <div class="flex-1"></div>
    <div class="footer-container">
      <div class="flex-row flex-wrap nav-footer">
        <div v-for="item of footermenu" :key='item' class="menuitem">
          <router-link
            :to="item.url"
            :style="{ fontWeight: item.fontweight_value == 'Y' ? 'bold' : '' }"
            >{{ item.name }}</router-link
          >
        </div>
      </div>
      <img
        class="footer_logo"
        src="http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/aocean/resource/c7546f8a903d9f33adb21b8d88a1a7f2_211201182452_1307327676.png"
        alt=""
      />
      <div v-html="page.Inst.footerstate"></div>
    </div>
    <div class="flex-1"></div>
  </div>
</template>
<style scoped>
.footer {
  background: #333;
  max-width: 100%;
}
.footer-container {
  padding: 16px 32px 32px;
  font-size: 16px;
  color: #f2f0f0;
  line-height: 18.4px;
  max-width: 100%;
}
@media only screen and (min-width: 48em){
  .footer__container {
      padding: 16px 8.3333vw 32px;
  }
}

.nav-footer {
  padding-top: 112px;
  padding-bottom: 96px;
  text-align: left;
  max-width: 100%;
  width: 1422px;
  grid-template-columns: repeat(auto-fit, minmax(0px, 50%));
  display: grid;
  align-items: stretch;
  justify-items: stretch;
 
}
@media only screen and (min-width: 48em) {
  .nav-footer {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    padding: 7rem 0 6rem;
  }
}
@media only screen and (min-width: 64em) {
  .nav-footer {
    padding: 7rem 0 6rem;
  }
}

.menuitem {
  /* width: 25%; */
  padding-top: 16px;
  padding-bottom: 16px;
  cursor: pointer;
}
.footer-container p {
  font-weight: 500;
}
.footer_logo {
  float: right;
  padding-top: 153px;
  width: 200px;
  width: auto;
}
@media only screen and (min-width: 1px) { 
  .footer_logo {
    float: none;
  }
}
@media only screen and (min-width: 48em) { 
  .footer_logo {
    float: right;
  }
}
</style>