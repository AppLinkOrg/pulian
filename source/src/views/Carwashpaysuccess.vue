<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
import store from "../State";
import { Utils } from "../Utils";
import BScroll from "better-scroll";
import { logLight } from "naive-ui/lib/log/styles";

let page = ref({});
let router = useRouter();
let route = useRoute();

PageHelper.Init(page, () => {});

HttpHelper.Post("carwash/carwashpackagelist", {}).then((Res) => {});
//优惠券

PageHelper.LoginAuth(page, () => {
  liebiao();
});


var start = () =>{
    HttpHelper.Post("carwash/startup", {}).then((Res) => {
        console.log(Res);
    });
}
// 跳转
var personalcenter = (e) => {
  router.push("/personalcenter");
};
var goindex = (e) => {
  router.push("/carwash");
};
</script>

<template>
  <div class="bg-10 h-m100 wf-100" v-if="page.Res != null">
    <div class="imgbox column flex-center color w-100 c-w">
      <div class="margin-top-74">
        <img
          class="imgpay"
          :src="page.uploadpath + 'resource/' + page.Res.paysuccessimg"
        />
      </div>
      <div class="margin-top-14">支付成功</div>
      <div class="margin-top-7">感谢您的购买</div>
      <div class="margin-top-20 margin-bottom-20">此台设备可以正常使用</div>
    </div>
    <div class="flex-row flex-around margin-top-40">
      <div class="backbtn imgbox column flex-center c-3 border" @click="goindex">返回首页</div>
    </div>
  </div>
</template>
<style scoped>
.color {
  background: linear-gradient(173deg, #409eff 0%, #75bbff 100%);
}
.imgpay {
  width: 100px;
}
.backbtn {
  width: 150px;
  height: 38px;
  line-height: 38px;

  border-radius: 19px;
}
.border {
  border: 1px solid #1890fe;
}
</style>