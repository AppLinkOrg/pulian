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

</script>

<template>
  <div  v-if="page.Res!=null">

       <div class="h-160"  :style="{
            backgroundImage:
              'url(' + page.uploadpath + 'resource/' + page.Res.integralbg + ')',
          }" style="background-size:100%;background-repeat: no-repeat"  ></div>

          <div class="margin-top-f160"></div>


          <div class="margin-left-14 margin-right-14">
<!--积分余额  -->
<div class="margin-top-30 f-15 bold c-w ">积分余额</div>
<div class="flex-row flex-center margin-top-16">
            <img :src="page.uploadpath + 'resource/' + page.Res.xinxin" class="icon-26"/>
            <div class="f-30 bold c-w margin-left-4 ">600</div>
            <div class="flex-1"></div>
            <div class="h-25 padding-left-10 padding-right-10 line-height-25 f-12 c-6 bg-w border-radius-12">积分充值</div>
          </div>

          <!--  -->
          <div class=" border-radius-9 bg-w padding-15 margin-top-30">
                      <div class=" flex-row " style="display: flex;display: -webkit-flex;justify-content: space-between;flex-direction: row;flex-wrap: wrap;">
<div class="hezi bg-1 border-radius-9 flex-row flex-center">
<div style="width:100%">
    <div class="flex-row flex-center">
    <div class="flex-1"></div>
    <div class="c-6 f-24 bold">1</div>
    <div class="margin-left-4 c-6 f-12 ">元</div>
 <div class="flex-1"></div>
</div>
<div class="margin-top-10 f-12 center c-6">100积分</div>
</div>
</div>
          </div>
          <div class="flex-row flex-center h-45 padding-15 margin-left-14 margin-right-14 bg-1 border-radius-9 margin-top-15"> 
              <div class="f-14 bold c-2 ">其他金额</div>
              <div class="margin-left-40"></div>
              <input type="text" placeholder="请输入充值金额" class="f-14 c-1 flex-1"/>
          </div>

          </div>
  



          </div>

                      <!--  -->
          <div class="position-bottom " style="bottom:20px">
              <div class="margin-left-14 margin-right-14 h-40 line-height-40 center f-16 c-w bold bg-5 border-radius-20">
确认充值
              </div>

          </div> 



  </div>
</template>
<style scoped>
.hezi{
    width: 97px;
height: 76px;
}

</style>