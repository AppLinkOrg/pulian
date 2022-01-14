<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import Config from "../Config";
import { Toast } from 'vant';


let page = ref({});
PageHelper.Init(page, () => {});

let router = useRouter();
let route = useRoute();
let orderdetail=ref({});
let imgsrc=ref({});



PageHelper.Init(page, () => {});

// 服务价格设置详情
HttpHelper.Post("order/orderdetail", {id:route.query.id }).then((res) => {
  orderdetail.value = res;
});

 imgsrc.value  = Config.ApiUrl+'store/creatorqrcode?id='+route.query.id;

//  daohan 导航
// 导航
// var daohang=()=>{
//   let latstor=storedetail.value.store_lat
// let lngstor=storedetail.value.store_lng
// let name =storedetail.store_address
// wx.miniProgram.navigateTo({url: '/pages/daohan/daohan?latstor='+latstor+'&lngstor='+lngstor+'&name='+name});
// }


// 导航
var daohang=()=>{
  let latstor=orderdetail.value.store_lat
let lngstor=orderdetail.value.store_lng
let name=orderdetail.value.store_address
// alert(latstor)
var json={latitude:latstor*1,
            longitude:lngstor*1,
            scale: 18,
            name};
           
PageHelper.loadwechatconfig(()=>{
  // alert("loadwechatconfig");
  wx.openLocation(json);
});
}

// dianhua 
var dianhua=()=>{
   var phoneNumber=orderdetail.value.store_phone
   if (phoneNumber.length>0) {
      window.location.href = 'tel://' + phoneNumber
    
   }

   if (phoneNumber.length==0) {
 
 Toast('门店未留联系方式')
 
   }

    
}


</script>

<template>
  <div v-if="page.Res!=null">
      <div class="h-200 bg-5"></div> 
       <div class="margin-top-f160"></div>
       <div class="flex-row flex-center margin-left-26 margin-right-26">
         <div class="bold f-16 c-w ">待消费</div>
         <div class="flex-1"></div>
         <div class="c-w f-12">¥</div>
         <div class="c-w f-24">{{orderdetail.totalamount}}</div>
       </div>
      

       <!--  -->
       <img  :src="page.uploadpath + 'resource/' + page.Res.tupain2" class="h-30 "  style="width:100%"/>
       <!--  -->
       <div style="margin-top:-23px"></div>
       <div class="yanshi margin-left-26 margin-right-26 bg-w ">
          <div class="bg-4 h-35 line-height-35 center f-12 c-6" >
<!-- 使用时请告知商户是xxx汽车券码 -->
          </div>

          <div class="h-25"></div>
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
          <div class="margin-top-15  c-1 f-12 center ">到店出示二维码或券码即可消费</div>
          <div class="h-14"></div>
        

       </div>

       <!--适用门店  -->

       <div class="margin-left-26 margin-right-26 bg-w border-radius-9 padding-15 margin-top-10">
         <div class="f-15 bold c-2">适用门店</div>
         <div class="flex-row flex-center">
           <div>
             <div class="margin-top-15 c-2 bold f-14">{{orderdetail.store_name}}</div>
             <div class="margin-top-4 c-1 f-10">{{orderdetail.store_address}}</div>
           </div>
           <div class="flex-1"></div>
           <img
           @click="dianhua"
          :src="page.uploadpath + 'resource/' + page.Res.dianhua"
          class="icon-12"
        />
        <div class="margin-left-20"></div>
        <img
        @click="daohang"
          :src="page.uploadpath + 'resource/' + page.Res.	danhang"
          class="icon-12"
        />
         </div>
       </div>
       <!-- 订单信息 -->
       <div class="margin-top-10 margin-left-26 margin-right-26 bg-w border-radius-9 padding-15">
         <div class="f-15 bold c-2">订单信息</div>
         <div class="flex-row flex-center margin-top-15">
           <div class="c-2  f-12 ">订单编号：</div>
           <div class="c-1 f-12 ">{{orderdetail.orderno}}</div>
         </div>
          <div class="flex-row flex-center margin-top-15">
           <div class="c-2  f-12 ">手机号码：</div>
           <div class="c-1 f-12 ">{{orderdetail.mobile}}</div>
         </div>
 <div class="flex-row flex-center margin-top-15">
           <div class="c-2  f-12 ">下单时间：</div>
           <div class="c-1 f-12 ">{{orderdetail.submit_time}}</div>
         </div>
         
          <div class="flex-row flex-center margin-top-15">
           <div class="c-2  f-12 ">付款时间：</div>
           <div class="c-1 f-12 ">{{orderdetail.pay_time}}</div>
         </div>
       </div>



<div class="h-50"></div>
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