<script setup>
import { ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { HttpHelper } from "../HttpHelper";
import { PageHelper } from "../PageHelper";

let router = useRouter();
let route = useRoute();

let page = ref({});
let name = ref({});
let statuslist = ref([
  { name: "已完成", status: "A" },
  { name: "进行中", status: "B" },
  { name: "启动失败", status: "C" },
]);
PageHelper.Init(page, () => {});

var storedetail = ref({});

let current = ref("A");

// 门店详情
let carwashorderlist = ref([]);
HttpHelper.Post("carwash/carwashorderlist", {zhuangtai:current.value}).then((res) => {
  carwashorderlist.value = res;
});

// 购买
var status = (e) => {
  current.value = e;
  HttpHelper.Post("carwash/carwashorderlist", {zhuangtai:current.value}).then((res) => {
  carwashorderlist.value = res;
});


  console.log(current.value, "666");
};
var carwashdetails = (e) => {
  router.push("/carwashdetails?id=" + e);
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
          border-radius-10
        "
        v-for="item in carwashorderlist"
        @click="carwashdetails(item.id)"
        :key="item.id"
      >
        <div>
          <div class="c-1 margin-bottom-10 flex-row flex-between">
            <div>下单时间：{{ item.paytime }}</div>
            <div v-if="current == 'A'">已完成</div>
            <div v-if="current == 'B'">进行中</div>
            <div v-if="current == 'C'">启动失败</div>
          </div>
          <div class="f-16 bold margin-bottom-10">{{ item.name }}</div>
          <div class="c-1 f-13 margin-bottom-10">{{ item.package_id_name }}</div>
          <div class="c-1 f-13">实付：¥{{ item.amount }}</div>
        </div>
      </div>
      <div class="bg-10 h-1 wf-100"></div>
    </div>
  </div>
</template>
<style scoped>
.active {
  color: #1890fe;
}
</style>