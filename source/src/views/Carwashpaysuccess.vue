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
var type = ref({});
var msg = ref({});
PageHelper.Init(page, () => {
  type.value = route.query.type;
});
//优惠券
type.value = route.query.type;
msg.value = route.query.msg;
console.log(msg.value);
localStorage.removeItem("localpackage");
PageHelper.LoginAuth(page, () => {
  type.value = route.query.type;
  msg.value = route.query.msg;
  console.log(msg.value);

  localStorage.removeItem("localpackage");
});
var goindex = e => {
  localStorage.removeItem("localpackage");
  router.push("/");
  // let viewer = window.navigator.userAgent.toLowerCase();
  // if (viewer.match(/MicroMessenger/i) == "micromessenger") {
  //   wx.miniProgram.getEnv(resrnv => {
  //     if (resrnv.miniprogram) {
  //       alert('1')
  //       wx.miniProgram.reLaunch({
  //         url: "/pages/carwash/carwash"
  //       });
  //     } else {
  //       alert('2')
  //       // 微信浏览器
  //       router.push("/carwash");
  //     }
  //   });
  // }
};
</script>

<template>
  <div class="bg-10 h-m100 wf-100" v-if="page.Res != null">
    <div class="imgbox column flex-center color w-100 c-w">
      <div class="margin-top-74">
        <img class="imgpay" :src="page.uploadpath + 'resource/' + page.Res.paysuccessimg" />
      </div>
      <div v-if="type == 'A'">
        <div class="margin-top-14 wf-100 center">使用成功</div>
        <div class="margin-top-7 wf-100 center">请选择洗车机按钮，开始洗车。</div>
      </div>
      <div v-if="type == 'C'">
        <div class="margin-top-14 wf-100 center">启动失败</div>
        <div class="margin-top-7 wf-100 center">{{msg}}</div>
        <div class="margin-top-7 wf-100 center">原套餐已退回您的账户</div>
      </div>
      <div class="margin-top-20 margin-bottom-20"></div>
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