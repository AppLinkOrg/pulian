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

let carwashpackagelist = ref([]);
HttpHelper.Post("carwash/carwashpackagelist", {}).then((Res) => {
  console.log(Res, "11");
  carwashpackagelist.value = Res;
});

PageHelper.LoginAuth(page, () => {
  liebiao();
});

var package_id = ref({});
var price = ref({});
var selectpackage = (e) => {
  console.log(e);
  package_id.value = e.id;
  price.value = e.price
};
//上传订单
var uploadorder = () => {
  HttpHelper.Post("carwash/uploadcarwashorder", {
    package_id:package_id,
  }).then((Res) => {
    console.log(Res, "11");
  });
};

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
        padding-left-14 padding-right-14 padding-top-10
      "
    >
      <div class="h-38 line-height-38 f-16 bold">请选购洗车套餐</div>
      <div
        class="washcard padding-left-14 padding-right-14"
        v-for="(item, index) in carwashpackagelist"
        :class="{ active: item.id == package_id }"
        :key="index"
        @click="selectpackage(item)"
      >
        <div class="imgbox flex-between price">
          <div>{{ item.synopsis }}</div>
          <div>¥{{ item.price }}</div>
        </div>
        <div class="imgbox flex-between price">
          <div>{{ item.rule }}</div>
          <div>（您有抵扣券可用）</div>
        </div>
      </div>

      <div class="">
        <div class="imgbox flex-between">
          <div>使用券</div>
          <div>¥ 5</div>
        </div>
        <div class="imgbox flex-between">
          <div>订单总价</div>
          <div>¥{{ price }}</div>
        </div>
      </div>
      <div class="h-14 wf-100"></div>
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
        <div></div>
      </div>
      <div class="but" @click="uploadorder()">立即支付</div>
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
  border: 1px solid #eeeeee;
  border-radius: 10px;
  margin-bottom: 14px;
}
.price {
  height: 40px;
  line-height: 40px;
}
.active {
  border: 1px solid #1890fe;
}
</style>