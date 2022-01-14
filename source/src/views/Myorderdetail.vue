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

let orderdetail=ref(null)

var orderxq=()=>{
    HttpHelper.Post("order/orderdetail",{id:route.query.id}).then((Res)=>{
orderdetail.value=Res

    })


}
orderxq();

// 评价
var pingjia=(e)=>{

router.push('/Interevalute?type=A&id='+route.query.id);
}
// tuikuan 退款
var tuikuan=()=>{

HttpHelper.Post("wechat/refund",{
  id:route.query.id
}).then((Res)=>{
  if (Res.code==0) {

    Toast('退款成功')

orderxq()


  }else{
    Toast('退款失败')
  }

})


}

var zhifu=()=>{
   wx.miniProgram.navigateTo({url: '/pages/pay/pay?id='+orderdetail.value.id+'&type=A'});
}

// quxiao 

var quxiao=()=>{
  HttpHelper.Post("order/update",{
    id:orderdetail.value.id,
    type:'A'
  }).then((res)=>{
    if (res==0) {
        Toast('取消成功')
orderxq();

    }else{
      Toast('取消失败')
    }

  })

}


// dianhua 
var dianhua=()=>{
   var phoneNumber=orderdetail.value.store_phone
   if (phoneNumber.length>0) {
      window.location.href = 'tel://' + phoneNumber
    
   }else{
 Toast('门店联系方式不正确')
   }
    
}

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


// wx.miniProgram.navigateTo({url: '/pages/daohan/daohan?latstor='+latstor+'&lngstor='+lngstor+'&name='+name});



}

</script>

<template>
  <div  v-if="page.Res!=null && orderdetail!=null">
      <div class="h-100 bg-5">
          <div class="h-30"></div>
          <div class="c-w f-16 bold  margin-left-26">{{orderdetail.orderstatus_name}}</div>
          <div class="margin-left-14 margin-right-14 margin-top-20 bg-w border-radius-9 padding-15">
              <div class="f-15 c-2 bold">服务信息</div>
              <div class="flex-row flex-center margin-top-20">
                  <div class="c-2 f-14 ">{{orderdetail.service_name}}</div>
<div class="flex-1"></div>
                  <div class="f-9 c-2">¥</div>
                  <div class="c-2 f-14">{{orderdetail.amount}}</div>
                  <div></div>
              </div>
                <div class="flex-row flex-center margin-top-20" v-if="orderdetail.yhsrouce=='A'">
                         <div class="c-2 f-14 ">优惠券价格</div>
                         <div class="flex-1"></div>
                    
    
                  <div class="c-2 f-9">¥</div>
                  <div class="c-2 f-14">{{orderdetail.jaige}}</div>
                     </div>

          </div>
          <!--  -->
                 <div class="margin-left-14 margin-right-14 margin-top-20 bg-w border-radius-9 padding-15">
                     <div class="flex-row flex-center">
                         <div class="c-2 f-14 ">使用券</div>
                         <div class="flex-1"></div>
                    
    
                  <div class="c-6 f-9">-¥</div>
                  <div class="c-6 f-14">{{orderdetail.youhui}}</div>
                     </div>
                       <div class="flex-row flex-center margin-top-20">
                         <div class="c-2 f-14 ">订单总价</div>
                         <div class="flex-1"></div>
                    
    
                  <div class="c-2 f-9">¥</div>
                  <div class="c-2 f-14">{{orderdetail.totalamount}}</div>
                     </div>
                      <div class="flex-row flex-center margin-top-20" >
                         <div class="c-2 f-14 ">手机号码</div>
                         <div class="flex-1"></div>
                    
    

                  <div class="c-2 f-14">{{orderdetail.mobile}}</div>
                     </div>


          </div>
          <!--  -->
  <div class="margin-left-14 margin-right-14 margin-top-20  bg-w border-radius-9 padding-15 margin-top-10">
         <div class="f-15 bold c-2">适用门店</div>
         <div class="flex-row flex-center">
           <div>
             <div class="margin-top-15 c-2 bold f-14">{{orderdetail.store_id_name}}</div>
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

          <!--  -->
             <div class="margin-left-14 margin-right-14 margin-top-10 bg-w border-radius-9 padding-15">
<div class="f-15 c-2 bold">订单信息</div>
<div class="flex-row flex-center margin-top-14">
    <div class="c-2 f-12">订单编号：</div>
    <div class="c-1 f-12 ">{{orderdetail.orderno}}</div>
</div>
<div class="flex-row flex-center margin-top-14">
    <div class="c-2 f-12">提交时间：</div>
    <div class="c-1 f-12 ">{{orderdetail.submit_time}}</div>
</div>
<div class="flex-row flex-center margin-top-14" v-if="orderdetail.orderstatus!='A'">
    <div class="c-2 f-12">支付时间：</div>
    <div class="c-1 f-12 ">{{orderdetail.pay_time}}</div>
</div>
<div class="flex-row flex-center margin-top-14"   v-if="orderdetail.orderstatus=='C'|| orderdetail.orderstatus=='G'">
    <div class="c-2 f-12">完成时间：</div>
    <div class="c-1 f-12 ">{{orderdetail.use_time}}</div>
</div>


             </div>

  <!--  -->
          <div class="position-bottom  bg-w h-50" style="bottom:0px">
              <div class="flex-row flex-center h-50 margin-left-14 margin-right-14">
                  <div class="flex-1"></div>
                  <div class="c-w f-12 center h-30 bg-6 w-90 border-radius-15 line-height-30" @click="pingjia()" v-if="orderdetail.orderstatus=='C' ">评价</div>
                  <div class="c-2 f-12 center h-30 bd-4 w-90 border-radius-15 line-height-30"  v-if="orderdetail.orderstatus=='B' " @click="tuikuan()">退款</div>

                   <div class="c-2 f-12 center h-30 bd-4 w-90 border-radius-15 line-height-30 "  v-if="orderdetail.orderstatus=='A' " @click="quxiao()">取消订单</div>
                   <div class="c-w f-12 center h-30 bg-6 w-90 border-radius-15 line-height-30 margin-left-20"  v-if="orderdetail.orderstatus=='A' " @click="zhifu()">立即支付</div>
              </div>
                            <!-- <div class="margin-left-14 margin-right-14 h-40 line-height-40 center f-16 c-w bold bg-5 border-radius-20" @click="save">
确认核销
              </div> -->
          </div>


          </div> 



  </div>
</template>
<style scoped>

</style>