<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import Config from "../Config";

let page = ref({});
PageHelper.Init(page, () => {});

let router = useRouter();
let route = useRoute();
let orderdetail=ref({});
let imgsrc=ref({});

// 服务价格设置详情
HttpHelper.Post("order/orderdetail", {id:route.query.id }).then((res) => {
  orderdetail.value = res;
});

// 生成一个二维码
// HttpHelper.Post("store/creatorqrcode", {id:route.query.id }).then((res) => {
//   imgsrc.value = res;
// });


// console.log(Config.ApiUrl,'Config');
 imgsrc.value  = Config.ApiUrl+'store/creatorqrcode?id='+route.query.id;

// 查看订单
var chakan = ()=>{
    router.push('/orderdetail?id='+route.query.id)
}


// shouye
var shouye=()=>{
    router.push('/')
}

</script>

<template>
  <div v-if="page.Res!=null">
      <div class="h-200 bg-5">
            <div class="flex-row flex-center h-120"  >
           <div class="flex-1"></div>
              <img  :src="page.uploadpath + 'resource/' + page.Res.tubiao" class="tubiao" />
              <div class="margin-left-10">
                  <div class="f-16 c-w bold">支付成功!</div>
                  <div class="f-12 c-w margin-top-6">感谢您的购买</div>
              </div>
               <div class="flex-1"></div>
       </div>
          </div> 
       <!-- <div style="margin-top:-115px"></div> -->
      <div  class="margin-top-f80"></div>
       <!--  -->
       <img  :src="page.uploadpath + 'resource/' + page.Res.tupain2" class="h-30 "  style="width:100%"/>
       <!--  -->
       <div style="margin-top:-23px"></div>
       <div class="yanshi margin-left-26 margin-right-26 bg-w ">
          <div class="h-25"></div>
           <div class="flex-row flex-center">
                <div class="flex-1"></div>
               <div class="f-18 c-2 bold">¥</div>
               <div class="c-2 f-40 bold">{{orderdetail.totalamount}}</div>
                <div class="flex-1"></div>
           </div>
           <div class="margin-top-45 c-2 f-14 bold center">{{orderdetail.service_name}}</div>
           <div class="margin-top-20"></div>
           <div class=" icon-190 margin-auto">
  <img
          :src="imgsrc"
          class=" icon-190  displat-block "
        />
           </div>
         
           <!-- <div class="margin-top-20  flex-row flex-center">
                <div class="flex-1"></div>
               <div class="c-1 f-14 ">券码:</div>
               <div class="margin-left-10 c-2 f-14 ">{{orderdetail.orderno}}</div>
                <div class="flex-1"></div>
           </div> -->
           <div class="margin-top-20  flex-row flex-center">
               <div class="flex-1"></div>
               <div class="c-1 f-14 ">有效期至:</div>
               <div class="margin-left-10 c-2 f-14 ">{{orderdetail.effective_time}}</div>
                <div class="flex-1"></div>
           </div>
          <div class="h-1 bg-1 margin-top-15"></div>
          <div class="margin-top-15  c-2 f-12 center ">到店出示二维码或券码即可消费</div>
          <div class="h-14"></div>
        

       </div>

       <!--  -->
       <div class="flex-row " style="width:100%">
           <div class="margin-left-30"></div>
            <div class="h-40 border-radius-20 bd-5 c-2 f-16 bold center line-height-40 margin-top-30 flex-1   " @click="shouye">返回首页</div>
 <div class="margin-left-30"></div>
            <div class="h-40 border-radius-20 bg-5 c-w f-16 bold center line-height-40 margin-top-30 flex-1  " @click="chakan">查看订单</div>
             <div class="margin-left-30"></div>
       </div>
       <!-- <div class="h-40 border-radius-20 bg-5 c-w f-16 bold center line-height-40 margin-top-30" @click="chakan">查看订单</div> -->



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