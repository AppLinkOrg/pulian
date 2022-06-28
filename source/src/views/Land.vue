<script setup>
// import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { PageHelper } from "../PageHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
import { Utils } from "../Utils";

let page = ref({});
let router = useRouter();
let route = useRoute();

PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});
let landdetail = ref({});
HttpHelper.Post("land/landdetail", { id: route.query.id }).then((res) => {
  landdetail.value = res;
});
var lingquan = () => {

  if (page.value.Memberinfo.landcard == "B") {
    console.log(page.value.Memberinfo.landcard);
    Toast("该优惠券只能领取一次，您已经领取过了");
  } else {
    HttpHelper.Post("coupon/collectcoupons", {
      shouhuo: '非实物',
      phone: '非实物',
      address: '非实物',
      xianxi: '非实物',
      pointsmall_id: landdetail.value.pointsmall_id
    }).then((res) => {
      if(res.code == 0){
        Toast("领取成功请前往洗车个人中心卡券列表查看");
      }else{
        Toast("领取失败");
      }
    });
  }
};
</script>

<template>
  <div @click="lingquan()"  class="padding-left-10 padding-right-10">
    <div
      :style="{
        backgroundImage:
          'url(' + page.uploadpath + 'resource/' + page.Res.landimg + ')',
      }"
      style="background-size: 100%; background-repeat: no-repeat"
      class="
        flex-row
        column
        flex-evenly
        h-110
        margin-top-10
        padding-left-14
        c-w
      "
    >
      <div class="f-18">{{ page.Memberinfo.mobile }}</div>
      <div class="f-14">您有: {{ page.Memberinfo.jifen }} 积分</div>

    </div>
    <div
      @click="lingquan()"
      class="htmlimg"
      v-html="Utils.HtmlDecode(landdetail.neirong)"
    ></div>
  </div>
</template>
<style scoped>
/* /deep/ .htmlimg > p {
  margin: 0 !important;
}
/deep/ .htmlimg p > img {
  width: 100% !important;
}

/deep/ .htmlimg p > a > img {
  width: 100% !important;
} */
</style>