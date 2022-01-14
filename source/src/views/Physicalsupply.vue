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


// 实物不急优惠券列表
let bujilist=ref(null);
HttpHelper.Post('coupon/bujilist',{type:'C',tuiguan:'Y'}).then((res)=>{
    bujilist.value=res
})

// buti 补贴跳转
var buti=(e)=>{
    router.push('/couponbag?id='+e)

}


</script>

<template>
  <div  v-if="page.Res!=null">
      <div class="margin-left-14 margin-right-14 margin-top-14 bg-w border-radius-9 padding-ph flex-row" v-for="(item,index) in bujilist" :key="index" @click="buti(item.id)">
          <div class="biao center flex-row flex-center ">
              <div class=" c-6 f-14 bold w-14 margin-auto">补给券</div>
          </div>
          <div class="margin-left-10 flex-row flex-center">
           <div>
               <!-- ×{{item.price}}元 -->
                  <div class="c-2 f-16 bold ">{{item.shangping}}张 {{item.name}}</div>
              <div class="margin-top-14 c-6 f-14 ">{{item.title}}</div>
              <div class="f-12 c-1 margin-top-14 ">无门槛</div>
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