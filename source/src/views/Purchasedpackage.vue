<script setup>
import { ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { HttpHelper } from "../HttpHelper";
import { PageHelper } from "../PageHelper";

let router = useRouter();
let route = useRoute();

let page = ref({});
let statuslist = ref([
  { name: "未使用", status: "B" },
  { name: "已使用", status: "C" },
  { name: "已过期", status: "D" },
]);
PageHelper.Init(page, () => {});

var storedetail = ref({});

let current = ref("A");

// 门店详情
let packageorderlist = ref([]);
HttpHelper.Post("carwash/packageorderlist", {zhuangtai:current.value}).then((res) => {
  packageorderlist.value = res;
});

// 购买
var status = (e) => {
  current.value = e;
  HttpHelper.Post("carwash/packageorderlist", {zhuangtai:current.value}).then((res) => {
  packageorderlist.value = res;
});

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
          padding-left-14 padding-right-14
          margin-left-14 margin-right-14
          bg-w
          margin-bottom-14
        "
        v-for="(item, index) in packageorderlist"
        :key="index"
      >
        <div >
          <div>{{ item.synopsis }}</div>
          <div></div>
          <div>{{item.rule}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.active {
  color: #1890fe;
}
</style>