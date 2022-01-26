<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";

let page = ref({});
let router = useRouter();
let route = useRoute();

PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});

var integrallist = ref({});
HttpHelper.Post("inst/integral", {}).then((res) => {
  integrallist.value = res;
});

var checked_id = ref(""); 
var amount=ref("");

var checking = (id,price) => {
  amount.value=price;
  checked_id.value = id;
};

var amount_input=(e)=>{
  console.log(e);
    amount.value=e;
}
var confrim=()=>{
PageHelper.LoginAuth(page, () => {

let viewer = window.navigator.userAgent.toLowerCase();

if (viewer.match(/MicroMessenger/i) == "micromessenger") {
  wx.miniProgram.getEnv((resrnv) => {
    if (resrnv.miniprogram) {
     if (page.value.Memberinfo.touxiang !='B') {
       
   
         wx.miniProgram.navigateTo({url: '/pages/login/login?type=A'});
         return
}
		// alert(page.value.Memberinfo.shoujisq)
   if (page.value.Memberinfo.shoujisq !='B' && page.value.Memberinfo.touxiang =='B') {

         wx.miniProgram.navigateTo({url: '/pages/login/login?type=B'});
         return
}
dinfdan()
    }else{
      dinfdan()

    }

  })
}

 


});
  

//  integral:1000

 
}
var dinfdan=()=>{
    HttpHelper.Post("member/creatorder", {
    amount:amount.value,
   
  }).then((res) => {
 
 

let viewer = window.navigator.userAgent.toLowerCase();

if (viewer.match(/MicroMessenger/i) == "micromessenger") {
  wx.miniProgram.getEnv((resrnv) => {
     ordr_id.value=res.return
 wanchengt.value=false
    if (resrnv.miniprogram) {
      // 小程序内部
if(res.code==0){
 console.log("提交成功跳转支付");
//  ordr_id.value=res.return
//  wanchengt.value=false
 wx.miniProgram.navigateTo({url: '/pages/pay/pay?id='+res.return});
 }
    }else{
      // 微信浏览器
     
         HttpHelper.Post("wechat/prepay5",{
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




 
  }) 
}

var todetail=()=>{
     router.push('/integraldetail') 
}


let ordr_id=ref(0);
let wanchengt=ref(false);
// 判断服务支付情况
let timer = setInterval(() => {
     //需要定时执行的代码
     wancheng()
},1000)



var wancheng=()=>{
  if (ordr_id.value>0) {


  HttpHelper.Post('integral/integralorderdetail',{id:ordr_id.value}).then((Res)=>{
    if (wanchengt.value!=false) {
  clearInterval(timer)
}
    if (Res.orderstatus=='B' && wanchengt.value==false) {
    
      console.log('进来哦了');
      wanchengt.value=true
      ordr_id.value=0

PageHelper.LoginAuth(page, () => {});
    
     
}


})



}
}


</script>

<template>
  <div v-if="page.Res != null && page.Memberinfo!=null">
    <div
      class="h-160"
      :style="{
        backgroundImage:
          'url(' + page.uploadpath + 'resource/' + page.Res.integralbg + ')',
      }"
      style="background-size: 100%; background-repeat: no-repeat"
    ></div>

    <div class="margin-top-f160"></div>

    <div class="margin-left-14 margin-right-14">
      <!--积分余额  -->
      <div class="margin-top-30 f-15 bold c-w">积分余额</div>
      <div class="flex-row flex-center margin-top-16">
        <img
          :src="page.uploadpath + 'resource/' + page.Res.xinxin"
          class="icon-26"
        />
        <div class="f-30 bold c-w margin-left-4">{{page.Memberinfo.jifen}}</div>
        <div class="flex-1"></div>
        <div
          class="
            h-25
            padding-left-10 padding-right-10
            line-height-25
            f-12
            c-6
            bg-w
            border-radius-12
          "
          @click="todetail"
        >
          积分明细
        </div>
      </div>

      <!--  -->
      <div class="border-radius-9 bg-w padding-15 margin-top-30">
        <div
          class="flex-row"
          style="
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            flex-direction: row;
            flex-wrap: wrap;
          "
        >
          <div
            :class="checked_id == item.id ? 'c-6 border' : ''"
            class="
              bg-1
              border-radius-9
              flex-row flex-column
              padding-10
              margin-bottom-10
            "
            style="width: 30%"
            v-for="(item, index) in integrallist"
            :key="index"
            @click="checking(item.id,item.price)"
          >
            <div class="flex-row flex-bottom">
              <div class="f-24 bold">{{ item.price }}</div>
              <div class="f-12">元</div>
            </div>
            <div class="margin-top-10 f-12">{{ item.integral }}积分</div>
          </div>

<div  style="width: 30%;visibility: hidden"></div>

          

        </div>
        <div
          class="
            flex-row flex-center
            h-45
            padding-10 
            bg-1
            border-radius-9
            margin-top-15
          "
        >
          <div class="f-14 bold c-2">其他金额</div>
           
          <!-- <input
            type="number"
            placeholder="请输入充值金额"
            class="f-14 c-1 flex-1"
         v-model="amount"
          /> -->


          <!-- type="digit" -->

           <van-field
            v-model="amount"
            @update:model-value="amount_input"
             class="f-14 c-1 flex-1 bg-2 margin-left-10"
             style="background:#F7F7F8"
             type="digit"
            placeholder="请输入充值金额"
          />

        </div>
      </div>
    </div>

    <!--  -->
    <div class="position-bottom" style="bottom: 20px">
      <div
      @click="confrim"
        class="
          margin-left-14 margin-right-14
          h-40
          line-height-40
          center
          f-16
          c-w
          bold
          bg-5
          border-radius-20
        "
      >
      
        确认充值
      </div>
    </div>
  </div>
</template>
<style scoped>
.border {
  border: 1px solid #1890fe;
}
</style>