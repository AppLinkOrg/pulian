<script setup>
import { ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { HttpHelper } from "../HttpHelper";
import { PageHelper } from "../PageHelper";

let router = useRouter();
let route = useRoute();

let page = ref({});
PageHelper.Init(page, () => {});

var storedetail = ref({});

let current = ref("A");

// 门店详情
let carwash = ref([]);
HttpHelper.Post("carwash/carwashdetails", { id:route.query.id}).then(
  (res) => {
    carwash.value = res;
  }
);
</script>

<template>
  <div class="bg-10 h-m100 w-100" v-if="page.Res != null">
    <div class="top">
      <div class="end">已完成</div>
      <div class="info bg-10 margin-left-14 margin-top-20 margin-right-14">
        <div class="border-radius-10 padding-15 bg-w">
          <div class="f-16 bold line-height-30">宏福泰大楼</div>
          <div class="f-14 c-1 margin-top-4">自助5元洗车套餐1次</div>
          <div class="flex-row flex-between margin-top-20">
            <div>总价</div>
            <div>{{carwash.allprice}}</div>
          </div>
          <div class="flex-row flex-between margin-top-10">
            <div>优惠</div>
            <div>{{carwash.yprice}}</div>
          </div>
          <div class="flex-row flex-between margin-top-10">
            <div>实际支付</div>
            <div>{{carwash.amount}}</div>
          </div>
        </div>
        <div class="border-radius-10 padding-15 bg-w margin-top-10">
          <div class="f-16 bold">订单信息</div>
          <div class="margin-top-10">订单编号：{{carwash.orderno}}</div>
          <div class="margin-top-10">支付时间：{{carwash.paytime}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.top {
  width: 100%;
  background: linear-gradient(173deg, #409eff 0%, #75bbff 100%);
  padding-bottom: 65px;
}
.end {
  margin-left: 14px;
  width: 104px;
  height: 34px;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 53px;
}
.info {
  width: 347px;
  border-radius: 10px;
  position: absolute;
}
</style>