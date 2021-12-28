<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';

let page = ref({});
let router = useRouter();
let route = useRoute();


PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});

var boda=()=>{
    // var phoneNumber='14785296314'
    //  window.location.href = 'tel://' + phoneNumber

     clearInterval(timer)
}

let wanchengt=ref(false);
let num=ref(0)
// 判断服务支付情况
let timer = setInterval(() => {
     //需要定时执行的代码
     num.value=num.value+1
   console.log(1111);
   if(num.value==10){
clearInterval(timer)
}
},1000)




</script>

<template>
  <div  v-if="page.Res!=null">
      <div @click="boda">拨打</div>
  </div>
</template>
<style scoped>

</style>