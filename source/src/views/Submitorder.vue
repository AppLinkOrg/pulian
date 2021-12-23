<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';

let page = ref({});
PageHelper.Init(page, () => {});

let router = useRouter();
let route = useRoute();
let servicepricedetail=ref({});
let num=ref(1);
let phone = ref('');


// 服务价格设置详情
HttpHelper.Post("serviceprice/servicepricelist", {id:route.query.id }).then((res) => {
  servicepricedetail.value = res;
  youhuij();
});

// 数量加一
var jia = () => {
    num.value=num.value+1;
  console.log('nnum',num);
};
// 数量减一
var jian = () => {
    if (num.value>1) {
          num.value=num.value-1;
    }else{
      
    }
  
  console.log('nnum',num);
};

// 支付  提交订单
var zhifu=()=>{
    if (phone.value.length==0) {
         Toast('请输入手机号');
         return;
    }
 
    if (phone.value.length!=11) {
         Toast('手机格式不正确');
          return;
    }

HttpHelper.Post("order/creatorder", {mobile:phone.value,serviceprice_id:route.query.id,num:num.value,couponlist_id:route.query.couponlist_id }).then((res) => {
    console.log(123)
    console.log(res);
  if (res.code==0) {

      router.push('/Paysuccess?id='+res.return);
  }else{
      Toast(res.return);
  }
});


}

// 优惠卷详情
let coupondetail=ref(null)
var youhuij=()=>{
  HttpHelper.Post('coupon/coupondetail',{id:route.query.couponlist_id}).then((res)=>{
    coupondetail.value=res
    zuihou()
})


}

// 最后的价格
let totle=ref(0);
var zuihou=()=>{
  var servicepricedetail_price=servicepricedetail.value.originalprice
  var coupondetail_price=coupondetail.value.price
 
  if(coupondetail.value.type=='A'){
// 立减券
totle.value=servicepricedetail_price*1-coupondetail.value.jainshao*1+coupondetail_price*1
// console.log(servicepricedetail_price*1,coupondetail.value.jainshao*1,coupondetail_price*1);
  }
   if(coupondetail.value.type=='B'){
    //  抵扣券
    totle.value=servicepricedetail_price*coupondetail.value.zhekou*0.01+coupondetail_price
  }
    if(coupondetail.value.type=='C'){
      // 补给券
      totle.value=coupondetail_price
  }
}









</script>

<template>
  <div v-if="page.Res!=null">
      <div class="h-200 bg-5"></div> 
      <div style="margin-top:-115px"></div>
      <div class="margin-left-14 margin-right-14 bg-w border-radius-5 padding-15" >
          <div class="bold f-15 c-2">服务信息</div>
          <div class="flex-row flex-center margin-top-20">
              <div class="f-14 c-1 ">{{servicepricedetail.service_name}}</div>
              <div class="flex-1"></div>
              <div class="f-9 c-2">¥</div>
              <div class="f-14 c-2">{{servicepricedetail.originalprice}}</div>
          </div>
          <!-- <div class="flex-row flex-center margin-top-15" >
              <div class="c-2 f-14">数量</div>
              <div class="flex-1"></div>
              <img
          :src="page.uploadpath + 'resource/' + page.Res.jain"
          class="icon-23"
          @click="jian"
        />
      
              <div class="f-13 c-1 margin-left-14 margin-right-14">{{num}}</div>
                 <img
          :src="page.uploadpath + 'resource/' + page.Res.jia"
          class="icon-23"
          @click="jia"
        />
          </div> -->
      </div>
      <div class="margin-top-10"></div>
<div class="margin-left-14 margin-right-14 bg-w border-radius-5 padding-15" >
         <div class="flex-row flex-center" v-if="coupondetail !=null" >
              <div class=" f-15 c-2">使用券</div>
              <div class="flex-1"></div>
              <div class="c-3 f-9">-¥</div>
              <div class="f-14 c-3">{{coupondetail.type=='C'?servicepricedetail.originalprice:coupondetail.jainshao}}</div>
                 <img
          :src="page.uploadpath + 'resource/' + page.Res.youjian"
          class="icon-10"
        />
        
         </div>
          <div class="flex-row flex-center margin-top-20">
              <div class="f-14 c-1 ">订单总价</div>
              <div class="flex-1"></div>
              <div class="f-9 c-2">¥</div>
              <div class="f-14 c-2">{{totle}}</div>
          </div>
          <div class="flex-row flex-center margin-top-20">
              <div class="f-14 c-1 ">手机号码</div>
              <input type="text" placeholder="请输入您的手机号码" class="right f-12 c-2 flex-1" v-model="phone"  maxlength="11">
          </div>
      </div>
        <div class="margin-top-10"></div>
        <div class="margin-left-14 margin-right-14 bg-w border-radius-5 padding-15" >
            <div class=" f-15 c-2 bold">支付方式</div>
            <div class="flex-row flex-center margin-top-16">
                 <img
          :src="page.uploadpath + 'resource/' + page.Res.weix"
          class="icon-26"
        />
                <div class="f-14 c-2 margin-left-4">微信支付</div>
                <div class="flex-1"></div>
                      <img
          :src="page.uploadpath + 'resource/' + page.Res.wanchegn"
          class="icon-18"
        />
            </div>
        </div>

        <div class="position-bottom bg-w">
            <div class="flex-row flex-center h-50 margin-left-14 margin-right-14">
              <div>
                   <div class="flex-row flex-center">
                    <div class="f-12 c-5">¥</div>
                <div class="f-24 c-5">{{totle}}</div>
               </div>
               <div class="margin-top-4 c-1 f-12">已优惠¥0</div>
              </div>
              <div class="flex-1"></div>
              <div class="h-38 line-height-38 c-w bold f-14 bg-3 " style="padding:0 48px;border-radius: 5px 15px 5px 15px;" @click="zhifu">立即支付</div>
            </div>
        </div>

        <!--  -->


  </div>
</template>
<style scoped>

</style>