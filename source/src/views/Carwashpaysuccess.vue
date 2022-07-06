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
PageHelper.Init(page, () => {
 
});

if (route.query.type == "A") {
    HttpHelper.Post("carwash/startup", {
      carwashorder_id: route.query.order_id,
    }).then((e) => {
      if (e.statusCode == "200" && e.errCode == "0") {
        type.value = route.query.type;
      } else {
        type.value = "C";
        Toast(e.retMsg);
      }
    });

}
 
//优惠券

PageHelper.LoginAuth(page, () => {});

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
      <div class="margin-top-14">使用成功</div>
      <div class="margin-top-7">请选择洗车机按钮，开始洗车。</div>
      <div class="margin-top-20 margin-bottom-20">
        <span v-if="type == 'A'">此台设备可以正常使用</span>
        <span v-if="type == 'C'">启动失败原套餐已退回您的账户</span>
      </div>
    </div>
    <div class="flex-row flex-around margin-top-40">
      <div
        class="backbtn imgbox column flex-center c-3 border"
        @click="goindex"
      >
        返回首页
      </div>
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