<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';
// import wx from "weixin-js-sdk";



let page = ref({});
let router = useRouter();
let route = useRoute();
PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});


// 点击全部订单
var dindan = ()=>{
    router.push('/myorder')
}
// 授权页面点击
var shouquan=()=>{
  PageHelper.LoginAuth(page, () => {});

    
    if (page.value.Memberinfo.touxiang !='B') {
      show.value=1
         wx.miniProgram.navigateTo({url: '/pages/login/login?type=A'});
}
		// alert(page.value.Memberinfo.shoujisq)
   if (page.value.Memberinfo.shoujisq !='B' && page.value.Memberinfo.touxiang =='B' ) {
      show.value=2
         wx.miniProgram.navigateTo({url: '/pages/login/login?type=B'});
}
    }

let show=ref(0)
let timer = setInterval(() => {
     //需要定时执行的代码
     wancheng()
},1000)

var wancheng=()=>{
  if (page.value.Memberinfo==null) {
    PageHelper.LoginAuth(page, () => {});
    return
  }
  if (show.value==1 && page.value.Memberinfo.touxiang !='B') {
      PageHelper.LoginAuth(page, () => {});
  }

 if (show.value==2&& page.value.Memberinfo.shoujisq !='B') {
  PageHelper.LoginAuth(page, () => {});
 }

 if (page.value.Memberinfo.shoujisq =='B' && page.value.Memberinfo.touxiang =='B') {
     clearInterval(timer)
 }


}
  

// 点击车库  
var cheku = ()=>{
   router.push('/garage') 
}

// 点击添加车
var addaiche=()=>{

  HttpHelper.Post("member/mycarlist", {
 
}).then((res) => {
if (res.length>0) {
      router.push("/editvegicle?first=A");
    }else{
router.push("/editvegicle?first=B");
    }
});
   
    // router.push('/editvegicle')
}

// 点击地址
var dizhi=()=>{
     router.push('/addressguan')
}

// kazhuan 点击卡券
var kazhuan=()=>{
    router.push('/myvoucher')
}

let mycarlist = ref([]); 
//查询车库的数目
HttpHelper.Post("member/mycarlist", {
  isdefault:'Y'
}).then((res) => {
  mycarlist.value = res;
});


// jifen 点击积分
var jifen=()=>{
    router.push('/integraldetail')
}

// qiandao 点击签到
var qiandao=()=>{
    router.push('/integral')
}

// shoucan 点击收藏
var shoucan=()=>{
  router.push('/mycollection')
}

// hehuo 合伙
var hehuo=()=>{
  router.push('/partnership?type=B')
}

// Aboutus
var guaunyu=()=>{
 router.push('/aboutus')
}

// fankui 反馈
var fankui=()=>{
  router.push('/feedback')
}

// 使用说明
var shiyong=()=>{
  // router.push('/ceshi')
  router.push('/partnership?type=A')
}

let kfshow=ref(false)

// lianxi 联系客服
var lianxigg=()=>{
  // alert(111)

  kfshow.value=true;
  return

   wx.miniProgram.navigateTo({url: '/pages/kefu/kefu'});
  //  wx.miniProgram.navigateTo({url: '/pages/kefu/kefu"'});
 
}


// 查询 卡卷  收藏的数目
let shumu=ref(null)
var chaxun=()=>{
  HttpHelper.Post("chaxun/shumu",{

  }).then((Res)=>{
shumu.value=Res
  })

}
chaxun();



var daifu=(e)=>{
 
  router.push('/myorder?type='+e)
}

var guanbi=()=>{
  kfshow.value=false
}

var fuzhi=(str)=>{
  PageHelper.Copy(str);
}

</script>

<template>
  <div  v-if="page.Res!=null && page.Memberinfo!=null">
      <div class="h-260"  :style="{
            backgroundImage:
              'url(' + page.uploadpath + 'resource/' + page.Res.mybg + ')',
          }" style="background-size:100%;background-repeat: no-repeat"  ></div>

     <div class="margin-top-f260"></div>
     <div class="flex-row flex-center margin-top-36" >
           <img :src="page.Memberinfo.avatarUrl" class="icon-55 border-radius-50 margin-left-14" @click="shouquan()" />
           <div class="margin-left-14 ">
               <div class="c-2 bold f-16">{{page.Memberinfo.nickName}}</div>
               <div class="margin-top-10 c-2 f-12">{{page.Memberinfo.mobile}}</div>
           </div>
           <div class="flex-1"></div>
           <div class="h-30 padding-left-10 padding-right-10 mubo flex-row flex-center bd-2" @click="qiandao()">
 <img :src="page.uploadpath + 'resource/' + page.Res.qianbao" class="icon-20 border-radius-50"/>
 <div class="margin-left-4 c-6 f-12 ">签到</div>
           </div>
     </div>
     <!--  -->
     <div class="flex-row flex-center margin-top-30">
         <div class="flex-1"></div>
         <div @click="jifen()">
             <div class="c-6 bold f-20 center ">{{page.Memberinfo.jifen}}</div>
             <div class="margin-top-10 c-2 f-12 center">积分</div>
         </div>
         <div class="flex-2"></div>
         <div @click="kazhuan()">
           
             <div class="c-6 bold f-20 center "  >{{shumu==null?0:shumu.result.num}}</div>
             <div class="margin-top-10 c-2 f-12 center">卡券</div>
         </div>
          <div class="flex-2"></div>
         <div  @click="shoucan">
             <div class="c-6 bold f-20 center ">{{shumu==null?0:shumu.result.num2}}</div>
             <div class="margin-top-10 c-2 f-12 center">收藏</div>
         </div>
         <div class="flex-1"></div>
     </div> 
     <!-- 我的订单 -->
     <div class="margin-left-14 margin-right-14 bg-w border-radius-9 padding-15 margin-top-20">
         <div class="flex-row flex-center">
             <div class="f-15 bold c-2 ">我的订单</div>
             <div class="flex-1"></div>
           <div class="flex-row flex-center" @click="dindan()">
                 <div class="c-1 f-10  ">全部订单</div>
               <img :src="page.uploadpath + 'resource/' + page.Res.youjian" class="icon-12 margin-left-4"/>

           </div>
         </div>
         <div class="flex-row flex-center margin-top-20">
             <div class="flex-1  "  @click="daifu('A')">
                   <img :src="page.uploadpath + 'resource/' + page.Res.daiful" class="icon-28 displat-block margin-auto"/>
                   <div class="margin-top-10 c-1 f-12 center" >待付款</div>
             </div>
              <div class="flex-1"  @click="daifu('B')">
                   <img :src="page.uploadpath + 'resource/' + page.Res.kehsi" class="icon-28 displat-block margin-auto"/>
                   <div class="margin-top-10 c-1 f-12 center" >可使用</div>
             </div>
              <div class="flex-1"  @click="daifu('daip')">
                   <img :src="page.uploadpath + 'resource/' + page.Res.pinjia" class="icon-28 displat-block margin-auto"/>
                   <div class="margin-top-10 c-1 f-12 center" >待评价</div>
             </div>
              <div class="flex-1"  @click="daifu('er')">
                   <img :src="page.uploadpath + 'resource/' + page.Res.tuikuan" class="icon-28 displat-block margin-auto"/>
                   <div class="margin-top-10 c-1 f-12 center" >退款/取消</div>
             </div>

         </div>
         <div class="margin-top-10"></div>

     </div>
     <!-- 我的爱车 -->
     <div class="margin-left-14 margin-right-14 bg-w border-radius-9 padding-15 margin-top-10">
         <div class="flex-row flex-center">
             <div class="f-15 bold c-2 ">我的爱车</div>
             <div class="flex-1"></div>
           <div class="flex-row flex-center " @click="cheku">
                 <div class="c-1 f-10  " >车库</div>
               <img :src="page.uploadpath + 'resource/' + page.Res.youjian" class="icon-12 margin-left-4"/>
           </div>
         </div>
         <div class="" v-if="mycarlist.length>0">


    <div
      class="margin-top-10 margin-left-14 margin-right-14 bg-w border-radius-9"
    
    >
      <div class="flex-row flex-center padding-20">
        <div class="flex-1">
          <div class="f-20 c-2 bold">{{ mycarlist[0].plateno }}</div>
          <div class="margin-top-14 c-1 f-13">{{  mycarlist[0].carseries_id_name }}</div>
        </div>
        <img :src=" mycarlist[0].carbrand_logo" class="icon-60" />
      </div>
      
    </div>


         </div>
         <div v-if="mycarlist.length==0">
 <img :src="page.uploadpath + 'resource/' + page.Res.qiche" class="icon-50  displat-block margin-auto"  @click="addaiche()"/>
          <div class="margin-top-4 c-1 f-14 center">添加爱车 享专属服务</div>
         </div>
         

     </div>
     <!-- 更多服务 -->
      <div class="margin-left-14 margin-right-14 bg-w border-radius-9 padding-15 margin-top-10">
            <div class="f-15 bold c-2 ">更多服务</div>
             <div class="flex-row flex-center margin-top-20">
             <div class="flex-1" @click="shiyong">
                   <img :src="page.uploadpath + 'resource/' + page.Res.shiyon" class="icon-28 displat-block margin-auto"/>
                   <div class="margin-top-10 c-1 f-12 center">使用说明</div>
             </div>
              <div class="flex-1" @click="hehuo">
                   <img :src="page.uploadpath + 'resource/' + page.Res.hezuo" class="icon-28 displat-block margin-auto"/>
                   <div class="margin-top-10 c-1 f-12 center">合伙加盟</div>
             </div>
              <div class="flex-1" @click="lianxigg">
                   <img :src="page.uploadpath + 'resource/' + page.Res.lainxi" class="icon-28 displat-block margin-auto"/>
                   <div class="margin-top-10 c-1 f-12 center">联系客服</div>
             </div>
              <div class="flex-1" @click="guaunyu">
                   <img :src="page.uploadpath + 'resource/' + page.Res.guanyu" class="icon-28 displat-block margin-auto"/>
                   <div class="margin-top-10 c-1 f-12 center">关于我们</div>
             </div>

         </div>

         <div class="flex-row flex-center margin-top-20">
           
             <div class="flex-1" @click="dizhi">
                   <img :src="page.uploadpath + 'resource/' + page.Res.dizhiguanli" class="icon-28 displat-block margin-auto"/>
                   <div class="margin-top-10 c-1 f-12 center">地址管理</div>
             </div>
              <div class="flex-1" @click="fankui">
                   <img :src="page.uploadpath + 'resource/' + page.Res.yijianfan" class="icon-28 displat-block margin-auto"/>
                   <div class="margin-top-10 c-1 f-12 center">意见反馈</div>
             </div>
               <div class="flex-1"></div>
             <div class="flex-1"></div>
            

         </div>
      </div>
  
<div class="h-50"></div>

<div class="h-50"></div>

<van-overlay :show="kfshow" @click="kfshow = false">
  <div class="wrapper" @click.stop>
    <div class="block" >

   <div >
      <div class="flex-row ">
        <div class="flex-1"></div>
        <img :src="page.uploadpath + 'resource/' + page.Res.guianboi" class="icon-25" @click="guanbi"/>

      </div>
      <img :src="page.uploadpath + 'inst/' + page.Inst.arcode" class="icon-220 margin-top-10 margin-left-26  margin-right-26 " />
      <div class="flex-row margin-top-20">
        <div class="flex-1"></div>
        <div class="f-18 bold c-2 f-18">客服微信:{{page.Inst.wxhao}}</div>
        <div class="margin-left-10 f-16 c-6 " @click="fuzhi(page.Inst.wxhao)">复制</div>
         <div class="flex-1"></div>
      </div>


    </div>
    </div>
 
    
  </div>
</van-overlay>


  </div>
</template>
<style scoped>


</style>