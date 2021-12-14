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

var current = ref(0);

let show =ref(false);

var fuwudetail=ref([]);

// 门店详情
HttpHelper.Post("store/storedetail", { id: route.query.id }).then((res) => {
  storedetail.value = res;
});

// 轮播图改变时间
var onChange = (index) => {
  current.value = index;
};

 

// 购买
var goumia=()=>{
   router.push('/Submitorder?id='+fuwudetail.value.id);
    console.log('寄哪里了---',fuwudetail,fuwudetail.id); 
}
 
</script>

<template>
  <div
    class=""
    v-if="page.Res!=null"
  >
  
  <div>
      
  </div>

  </div>
</template>
<style scoped>
 
</style>