<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
import store from "../State";
import { Utils } from "../Utils";

let page = ref({});
let router = useRouter();
let route = useRoute();
let bujilist = ref(null);

PageHelper.Init(page, () => {});

let carwashplacelist = ref([]);
HttpHelper.Post("carwash/carwashplacelist", {}).then((Res) => {
  console.log(Res, "11");
  carwashplacelist.value = Res;
});

PageHelper.LoginAuth(page, () => {
  liebiao();
});

// 实物不急优惠券列表

// 跳转
var personalcenter = (e) => {
  router.push("/personalcenter");
};
</script>

<template>
  <div class="bg-10 h-m100 wf-100" v-if="page.Res != null">
    <div class="h-14 bg-10 wf-100"></div>
    <div
      class="
        bg-w
        margin-left-14 margin-right-14
        padding-left-14 padding-right-14  padding-top-10
      "
    >
      <div class="h-38 line-height-38 f-16 bold">选择洗车卡</div>
      <div class="washcard  padding-left-14 padding-right-14">
        <div class="imgbox flex-between price">
          <div>自助5元洗车套餐1次</div>
          <div>¥ 5</div>
        </div>
        <div class="imgbox flex-between price">
          <div>全城通用 一年有效</div>
          <div>¥ 48</div>
        </div>
      </div>
      
      <div class="">
        <div class="imgbox flex-between">
          <div>自助5元洗车套餐1次</div>
          <div>¥ 5</div>
        </div>
        <div class="imgbox flex-between">
          <div>全城通用 一年有效</div>
          <div>¥ 48</div>
        </div>
      </div>
      <div class="h-14  wf-100"></div>
    </div>
    <div
      class="
        bottom
        imgbox
        flex-between
        wf-100
        padding-left-14 padding-right-14
        bg-w
      "
    >
      <div class="">
        <div>111</div>
        <div>222</div>
      </div>
      <div class="but">立即支付</div>
    </div>
  </div>
</template>
<style scoped>
.bottom {
  position: fixed;
  bottom: 0;
  padding-bottom: 10px;
  padding-top: 10px;
}
.but {
  width: 150px;
  height: 38px;
  background-color: #fc4b44;
  border-radius: 5px 15px 5px 15px;
  line-height: 38px;
  text-align: center;
  font-size: 14px;
  color: #ffffff;
}
.washcard {
  height: 80px;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
  margin-bottom: 14px;
}
.price{
  height: 40px;
  line-height: 40px;
}
</style>