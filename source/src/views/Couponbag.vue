<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';

let page = ref({});
let router = useRouter();
let route = useRoute();
let type=ref('')
type.value=route.query.type

PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});

// 卷的详情
let coupondetail=ref(null)
HttpHelper.Post('coupon/coupondetail',{id:route.query.id}).then((res)=>{
    coupondetail.value=res
})


// goumia 购买优惠券
var goumia=()=>{
    console.log('进来了');
PageHelper.LoginAuth(page, () => {

  console.log('进来了111');

      if (page.value.Memberinfo.touxiang !='B') {
       
 
         wx.miniProgram.navigateTo({url: '/pages/login/login?type=A'});
         return
}
		// alert(page.value.Memberinfo.shoujisq)
   if (page.value.Memberinfo.shoujisq !='B' && page.value.Memberinfo.touxiang =='B') {
console.log('进来了333');
         wx.miniProgram.navigateTo({url: '/pages/login/login?type=B'});
         return
}

console.log('进来了');
goumai2();
});


}

var goumai2=()=>{
    console.log('进来了11');
       HttpHelper.Post('youhuiorder/youhuiorderadd',{coupon_id:route.query.id}).then((res)=>{
    if (res.code==0) {

        // Toast('购买成功')

         let viewer = window.navigator.userAgent.toLowerCase();

         if (viewer.match(/MicroMessenger/i) == "micromessenger") {
wx.miniProgram.getEnv((resrnv) => {
    if (resrnv.miniprogram) {

order_id.value=res.return
zhifushow.value=true
 wx.miniProgram.navigateTo({url: '/pages/pay/pay?id='+res.return+'&type=B'});
    }else{
        HttpHelper.Post("wechat/prepay4",{
            id:res.return,
            types:'A'
        }).then((payret)=>{
            console.log(payret,'payret');

 WeixinJSBridge.invoke("getBrandWCPayRequest", payret, ress => {
    //  alert(JSON.stringify(ress))
                  if (ress.err_msg == "get_brand_wcpay_request:ok") {

                    Toast('支付成功')
                    // router.go(-1)


                  }
                });

        })


    }
})
         }

    }else{
Toast('购买失败')
    }
})
}

// chakandianpu 查看店铺
var chakandianpu=()=>{
    router.push('/storesx?id='+route.query.id)

}
let zhifushow=ref(false)
let order_id=ref(0)

var wancheg=()=>{
    if (zhifushow.value==true&&order_id.value>0) {
        HttpHelper.Post("youhuiorder/youhuiorderdetail",{
            id:order_id.value
        }).then((res)=>{
            if (res.orderstatus='B') {
                Toast('购买成功')
                zhifushow.value=false
                order_id.value=0
            }

        })

        
    }
}

// 判断服务支付情况
let timer = setInterval(() => {
     //需要定时执行的代码
     wancheg()
},1000)




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
               <div class="c-2 f-14 bold">{{type=='A'?'使用规则':'购买须知'}}</div>
               <div class="c-1 f-12 padding-bottom-15 padding-top-15"  style="white-space: pre-wrap;">
                       {{type=='A'?coupondetail.guize:coupondetail.xuzhi}}
               </div>
           </div>
           <!--  -->
                            <!--  -->
          <div class="position-bottom " style="bottom:20px" v-if="type!='A'">
              <div class="margin-left-14 margin-right-14 h-40 line-height-40 center f-16 c-w bold bg-5 border-radius-20" @click="goumia">
<a class="c-w f-24">¥{{coupondetail.price}}</a><a class="c-w f-16">/{{coupondetail.shangping}}张</a><a class="c-w f-16 bold padding-left-14">立即购买</a>
              </div>

          </div> 



  </div>
</template>
<style scoped>

</style>