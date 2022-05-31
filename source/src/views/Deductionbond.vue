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
  { name: "已使用", status: "C" },
]);
PageHelper.Init(page, () => {});

var storedetail = ref({});

var current = ref({});
current.value = 'A'

// 门店详情
HttpHelper.Post("store/storedetail", { id: route.query.id }).then((res) => {
  storedetail.value = res;
});

// 购买
var status = (e) => {
  current.value = e
  console.log(current._value,'666');
};
</script>

<template>
  <div class="" v-if="page.Res != null">
    <div class="h-40 imgbox flex-around line-height-40">
      <div v-for="(item, index) in statuslist" :key="index" @click="status(item.status)" :class="{'active':item.status==current}" style="font-size:14px">{{item.name}}</div>
    </div>
  </div>
</template>
<style scoped>
.active{
  color: #1890FE;
}
</style>