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
  
// 门店详情
HttpHelper.Post("store/storedetail", { id: route.query.id }).then((res) => {
  storedetail.value = res;
});
  
</script>

<template>
  <div
    class=""
    v-if="page.Res!=null"
  >
  
  <div>张三</div>

  </div>
</template>
<style scoped>
 
</style>