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

// 满减券   抵扣券
let bujilist=ref(null);
HttpHelper.Post('coupon/bujilist',{types:'A',tuiguan:'Y'}).then((res)=>{
    bujilist.value=res
})

// 抢购
var ligou=(e)=>{
    router.push('/couponbag?id='+e)

}


</script>

<template>
  <div  v-if="page.Res!=null">
       <div class="margin-left-14 margin-right-14 margin-top-14 bg-w border-radius-9 padding-ph flex-row" v-for="(item,index) in bujilist" :key="index" @click="ligou(item.id)">
          <div class="biao center flex-row flex-center ">
              <div class=" c-6 f-14 bold w-14 margin-auto">{{item.type=='A'?'立减券':item.type=='B'?'抵扣券':'补给券'}}</div>
          </div>
          <div class="margin-left-10 flex-row flex-center">
           <div>
                  <div class="c-2 f-16 bold ">{{item.shangping}}张×{{item.jainshao}}元 {{item.name}}</div>
              <div class="margin-top-14 c-6 f-14 ">{{item.title}}</div>
              <div class="f-12 c-1 margin-top-14 ">满{{item.manmoney}}可用 每次仅使用一张</div>
              <!-- <div class="f-12 c-1 margin-top-14 ">满{{item.manmoney}}可用</div> -->
           </div>
          </div>
          <div class="flex-1"></div>
          <div class="flex-row flex-center">
          <div>
                  <div class="padding-left-12 padding-right-12 h-26 line-height-26 c-w f-12 bg-5 border-radius-13 ">{{item.price}}元抢购</div>
              <div class="margin-top-10 c-1 f-12 center">有效期{{item.youxiao}}天</div>
          </div>

          </div>
      </div>

  </div>
</template>
<style scoped>

</style>