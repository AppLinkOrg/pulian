<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";

let page = ref({});
let router = useRouter();
let route = useRoute();

PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});

var orderstatus = ref([
  { name: "全部", leix: "A" },
  { name: "待核销", leix: "B" },
  { name: "已核销", leix: "C" },
  { name: "退款/取消", leix: "D" },
]);

let orderlist2 = ref([]);
let leix = ref("A");

var dinfan = () => {
  HttpHelper.Post("order/orderlist2", { leix: leix.value }).then((Res) => {
    if (Res != null) {
      orderlist2.value = Res;
    }
  });
};
dinfan();

var change = (e) => {
  console.log(e.name,'???');
  // return;
  leix.value = orderstatus.value[e.name].leix;
  dinfan();
};


var xqclick=(order)=>{
  router.push('/orderdetail?orderno='+order+'&type=A')
}
</script>

<template>
  <div v-if="page.Res != null">
    <van-sticky>
      <van-tabs
        v-model:active="active"
        @click-tab="change"
        title-inactive-color="#999"
        color="#1890FE"
        title-active-color="#1890FE" 
      >
        <van-tab
          v-for="(item, index) in orderstatus"
          :title="item.name"
          :key="index"
        
        >
        </van-tab>
      </van-tabs>
    </van-sticky>

    <div class="padding-15">
      <div
        class="bg-w border-radius-9 padding-15 margin-bottom-14"
        v-for="(item, index) in orderlist2"
        :key="index"
        @click="xqclick(item.orderno)"
      >
        <div class="flex-row flex-center">
          <div class="c-2 f-14">{{ item.service_name }}</div>
          <div class="flex-1"></div>
          <div class="f-14" style="color: #de2f24"  v-if="item.orderstatus!='E'&& item.orderstatus!='F' ">{{ item.hexiao_name }}</div>
          <div class="f-14" style="color: #de2f24"  v-else>{{ item.orderstatus_name }}</div>
        </div>
        <div class="margin-top-14 flex-row flex-center c-1 f-12">
          用户手机：{{ item.mobile }}
        </div>
        <div class="margin-top-14 flex-row flex-center c-1 f-12">
          订单编号：{{ item.orderno }}
        </div>
        <div class="margin-top-14 flex-row flex-center c-2 f-12">
          <div class="c-2 f-14">支付金额：</div>
          <div class="c-2 f-9">¥</div>
          <div class="c-2 f-14">{{ item.totalamount }}元</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>