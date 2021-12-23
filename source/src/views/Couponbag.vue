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

// 卷的详情
let coupondetail=ref(null)
HttpHelper.Post('coupon/coupondetail',{id:route.query.id}).then((res)=>{
    coupondetail.value=res
})


// goumia 购买优惠券
var goumia=()=>{
   HttpHelper.Post('youhuiorder/youhuiorderadd',{coupon_id:route.query.id}).then((res)=>{
    if (res.code==0) {
        Toast('购买成功')
    }else{
Toast('购买失败')
    }
})

}

// chakandianpu 查看店铺
var chakandianpu=()=>{
    router.push('/storesx?id='+route.query.id)

}




</script>

<template>
  <div  v-if="page.Res!=null && coupondetail!=null">
      <div class="margin-left-14 margin-right-14 margin-top-14 bg-w border-radius-9">
          <div class="h-130 flex-row flex-center">
              <div class="flex-1"></div>
              <img :src="page.uploadpath + 'coupon/' + coupondetail.img" class="juanbao" v-if="coupondetail.img !='' "/>
              <div class="flex-1"></div>
          </div>
          <div class="margin-left-10 margin-right-10">
 <div class="flex-row flex-center margin-top-20 ">
              <div class="bold c-2 f-16 ">{{coupondetail.name}}</div>
              <div class="flex-1"></div>
              <div class="f-18 c-6 bold ">¥{{coupondetail.price}}</div>
          </div>
          <div class="bg-4 h-40 border-radius-20 line-height-40 center c-6 f-14 bold margin-top-26 " @click="chakandianpu">查看可用门店</div>
          <div class="padding-bottom-15"></div>
          </div>
         

      </div>
<!--  -->
           <div class="margin-left-14 margin-right-14 margin-top-14 bg-w border-radius-9 padding-15">
               <div class="c-2 f-14 bold">购买须知</div>
               <div class="c-1 f-12 padding-bottom-15 padding-top-15"  style="white-space: pre-wrap;">
                       {{coupondetail.xuzhi}}
               </div>
           </div>
           <!--  -->
                            <!--  -->
          <div class="position-bottom " style="bottom:20px">
              <div class="margin-left-14 margin-right-14 h-40 line-height-40 center f-16 c-w bold bg-5 border-radius-20" @click="goumia">
<a class="c-w f-24">¥{{coupondetail.price}}</a><a class="c-w f-16">/{{coupondetail.shangping}}张</a><a class="c-w f-16 bold padding-left-14">立即购买</a>
              </div>

          </div> 



  </div>
</template>
<style scoped>

</style>