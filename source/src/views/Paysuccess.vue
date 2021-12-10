<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";


let page = ref({});
PageHelper.Init(page, () => {});



</script>

<template>
  <div v-if="page.Res!=null">
      <div class="h-200 bg-5"></div> 
       <div style="margin-top:-115px"></div>
       <div class="flex-row flex-center">
           <div class="flex-1"></div>
              <img  :src="page.uploadpath + 'resource/' + page.Res.tubiao" class="tubiao" />
              <div class="margin-left-10">
                  <div class="f-16 c-w bold">支付成功!</div>
                  <div class="f-12 c-w margin-top-6">感谢您的购买</div>
              </div>
               <div class="flex-1"></div>
       </div>
       <!--  -->
       <img  :src="page.uploadpath + 'resource/' + page.Res.tupain2" class="h-30 "  style="width:100%"/>
       <!--  -->
       <div style="margin-top:-23px"></div>
       <div class="yanshi margin-left-26 margin-right-26 bg-w ">
          <div class="h-25"></div>
           <div class="flex-row flex-center">
                <div class="flex-1"></div>
               <div class="f-18 c-2 bold">¥</div>
               <div class="c-2 f-40 bold">23</div>
                <div class="flex-1"></div>
           </div>
           <div class="margin-top-45 c-2 f-14 bold center">标准洗车</div>
           <div class="margin-top-20 icon-190"></div>
           <div class="margin-top-20  flex-row flex-center">
                <div class="flex-1"></div>
               <div class="c-1 f-14 ">券码:</div>
               <div class="margin-left-10 c-2 f-14 ">2423SDFE42352324</div>
                <div class="flex-1"></div>
           </div>
           <div class="margin-top-20  flex-row flex-center">
               <div class="flex-1"></div>
               <div class="c-1 f-14 ">有效期至:</div>
               <div class="margin-left-10 c-2 f-14 ">2022.01.23</div>
                <div class="flex-1"></div>
           </div>
          <div class="h-1 bg-1 margin-top-15"></div>
          <div class="margin-top-15  c-2 f-12 center ">到店出示二维码或券码即可消费</div>
          <div class="h-14"></div>
        

       </div>

       <!--  -->
       <div class="h-40 border-radius-20 bg-5 c-w f-16 bold center line-height-40 margin-top-30">查看订单</div>



  </div>
</template>
<style scoped>
.tubiao{
    width: 80px;
    height: 50px;
}
.yanshi{
    box-shadow: 1px 1px 7px 0px rgba(204, 204, 204, 0.32);
border-radius: 0px 0px 10px 10px;
}
</style>