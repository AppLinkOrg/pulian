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
          <div class="flex-1 f-14 c-1 center">收入</div>
          <div class="flex-1 f-14 c-1 center">支出</div>
      </div>
      </div>

      <div class="h-40"></div>

      <div class="margin-left-14 margin-right-14 margin-top-14 bg-w border-radius-9 padding-15">
        <div class="f-15 c-2 bold ">10月</div>
   
        <div class="padding-top-15 padding-bottom-15 bd-6 ">
  
           
          <div class="flex-row flex-center ">
            <div>
               <div class="f-14 c-2 ">签到</div>
                 <div class="c-1 f-12 margin-top-10">2021-11-29 12:34:23</div>
            </div>
          
            <div class="flex-1"></div>
            <div class="bold f-15 c-6">+10</div>
          </div>
        
        </div>
      </div>


  </div>
</template>
<style scoped>

</style>