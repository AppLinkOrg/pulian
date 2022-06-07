<script setup>
import { ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { HttpHelper } from "../HttpHelper";
import { PageHelper } from "../PageHelper";

let router = useRouter();
let route = useRoute();

let page = ref({});
let statuslist = ref([
  { name: "未使用", status: "A" },
  { name: "已使用", status: "B" },
  { name: "已过期", status: "C" },
]);
PageHelper.Init(page, () => {});

var storedetail = ref({});

let current = ref("A");

// 订单列表
let couponorder=ref([])

HttpHelper.Post('carwash/couponorderlist',{yhstatus:current.value}).then((res)=>{
  console.log(res,'res');
  couponorder.value=res
})
var status = (e) => {
  current.value = e;
  HttpHelper.Post('carwash/couponorderlist',{yhstatus:current.value}).then((res)=>{
  console.log(res,'res');
  couponorder.value=res
})
  console.log(current.value, "666");
};
</script>

<template>
  <div class="" v-if="page.Res != null">
    <div class="h-40 imgbox flex-around line-height-40">
      <div
        v-for="(item, index) in statuslist"
        :key="index"
        @click="status(item.status)"
        :class="{ active: item.status == current }"
        style="font-size: 14px"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="bg-10 h-14 wf-100"></div>
    <div class="bg-10 order wf-100 padding-top-14">
      <div
        class="
          padding-15
          margin-left-14 margin-right-14
          bg-w
          margin-bottom-14
          border-radius-2
          imgbox
        "
        v-for="(item, index) in couponorder"
        :key="index"
      >
        <div class="padding-10" >
          <div class="jian">
            <span style="font-size:15px">¥</span>{{ item.jainshao }}
          </div>
          <div>满{{item.manmoney}}可用</div>
        </div>
        <div  >
          <div class="imgbox">
            <div class="zizhu">优惠券(自助专用)</div>
            <div></div>
          </div>
          <div class="imgbox margin-top-16">
            <div class="c-7">{{item.star_time+'-'+item.end_time}}</div>
            <div></div>
          </div>
          <div class="imgbox margin-top-16">
            <div class="c-7">使用说明</div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.active {
  color: #1890fe;
}
.jian{
  width: 51px;
height: 52px;
font-size: 30px;
font-family: DIN;
font-weight: 500;
color: #1890FE;
line-height: 53px;
}
.zizhu{
  width: 244px;
height: 31px;
font-size: 16px;
font-family: PingFang SC;
font-weight: 500;
color: #333333;
line-height: 53px;
}
</style>