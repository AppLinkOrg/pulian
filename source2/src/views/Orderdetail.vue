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


var orderxq=()=>{
    
}

</script>

<template>
  <div  v-if="page.Res!=null">
      <div class="h-100 bg-5">
          <div class="h-30"></div>
          <div class="c-w f-16 bold  margin-left-26">待核销</div>
          <div class="margin-left-14 margin-right-14 margin-top-20 bg-w border-radius-9 padding-15">
              <div class="f-15 c-2 bold">服务信息</div>
              <div class="flex-row flex-center margin-top-20">
                  <div class="c-2 f-14 ">标准洗车</div>
<div class="flex-1"></div>
                  <div class="f-9 c-2">¥</div>
                  <div class="c-2 f-14">30</div>
                  <div></div>
              </div>
                  <div class="flex-row flex-center margin-top-20">
                  <div class="c-2 f-14 ">优惠券</div>
<div class="flex-1"></div>
                  <div class="f-9 c-2">-¥</div>
                  <div class="c-2 f-14">30</div>
                  <div></div>
              </div>

          </div>

          <!--  -->
             <div class="margin-left-14 margin-right-14 margin-top-10 bg-w border-radius-9 padding-15">
<div class="f-15 c-2 bold">订单信息</div>
<div class="flex-row flex-center margin-top-14">
    <div class="c-2 f-12">订单编号：</div>
    <div class="c-1 f-12 ">325354625252</div>
</div>
<div class="flex-row flex-center margin-top-14">
    <div class="c-2 f-12">支付时间：</div>
    <div class="c-1 f-12 ">325354625252</div>
</div>
<div class="flex-row flex-center margin-top-14">
    <div class="c-2 f-12">支付金额：</div>
    <div class="c-1 f-12 ">¥25</div>
</div>
<div class="flex-row flex-center margin-top-14">
    <div class="c-2 f-12">用户手机：</div>
    <div class="c-1 f-12 ">325354625252</div>
</div>


             </div>

  <!--  -->
          <div class="position-bottom " style="bottom:20px">
                            <div class="margin-left-14 margin-right-14 h-40 line-height-40 center f-16 c-w bold bg-5 border-radius-20" @click="save">
确认核销
              </div>
          </div>


          </div> 



  </div>
</template>
<style scoped>

</style>