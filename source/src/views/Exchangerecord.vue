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
        <div class="position-top">
          <div class="h-40 bg-w flex-row flex-center">
          <div class="flex-1 f-14 c-1 center">全部</div>
          <div class="flex-1 f-14 c-1 center">待发货</div>
          <div class="flex-1 f-14 c-1 center">待收货</div>
          <div class="flex-1 f-14 c-1 center">待评价</div>
          <div class="flex-1 f-14 c-1 center">退款/取消</div>
      </div>
      </div>
      <div class="h-40"></div>

      <div class="margin-left-14 margin-right-14 margin-top-14 bg-w border-radius-9 padding-15 ">
          <div class="flex-row ">
              <div class="flex-1"></div>
              <div class="f-12 c-6 bold ">待发货</div>
          </div>
          <div class="flex-row flex-center">
              
<img :src="page.uploadpath + 'resource/' + page.Res.dianpu" class="icon-90"/>
<div class="margin-left-10 ">
    <div class="c-2 f-15 bold">四轮轮胎</div>
    <div class="margin-top-15 flex-row ">
        <div class="c-6 f-14">2000</div>
    <div class="c-1 f-14">积分</div>
    </div>
</div>
          </div>
          <div class="margin-top-10 flex-row ">
              <div class="flex-1"></div>
              <div class="h-26 bd-4 line-height-26 padding-left-30 padding-right-30 border-radius-13 c-2 f-12">退款</div>
          </div>
      </div>


  </div>
</template>
<style scoped>

</style>