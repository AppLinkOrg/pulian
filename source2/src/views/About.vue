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
      <div class="h-25"></div>
           <img :src="page.uploadpath + 'resource/' + page.Res.logoicon" class="icon-150 displat-block margin-auto" />
           <div class="bold center c-2 f-18 margin-top-14">{{page.Inst.name}}</div>
           <div class="margin-top-30 bg-w">
               <div class="flex-row flex-center h-50 padding-left-14 padding-right-14 bd-6">
                   <div class="f-15 c-2 ">微信公众号</div>
                   <div class="flex-1 "></div>
                   <div class="c-2 f-15">{{page.Inst.wxaccount}}</div>
               </div>
                <div class="flex-row flex-center h-50 padding-left-14 padding-right-14 bd-6">
                   <div class="f-15 c-2 ">客服微信</div>
                   <div class="flex-1 "></div>
                   <div class="c-2 f-15">{{page.Inst.wxhao}}</div>
               </div>
                <div class="flex-row flex-center h-50 padding-left-14 padding-right-14 bd-6">
                   <div class="f-15 c-2 ">公司邮箱</div>
                   <div class="flex-1 "></div>
                   <div class="c-2 f-15">{{page.Inst.mail}}</div>
               </div>
           </div>


  </div>
</template>
<style scoped>

</style>