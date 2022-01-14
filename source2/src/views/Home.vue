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


let show=ref(false)

var guanbi=()=>{
  show.value=false
}

var kefu=()=>{
  show.value=true
}

var fuzhi=(str)=>{
  PageHelper.Copy(str);
}

var zhanghao=()=>{
  router.push('/management')
}

var about=(e)=>{
  if (e==1) {
    router.push('/service')
    return
  }
  if (e==2) {
    router.push('/order')
    return
  }
  if (e==3) {
    router.push('/writeoff')
    return
  }
   if (e==4) {
    router.push('/genneralevalut')
    return
  }
  router.push('/about')
}

</script>

<template>
  <div  v-if="page.Res!=null && page.Memberinfo!=null" class="big-bg">
   <div :style="{
            backgroundImage:
              'url(' + page.uploadpath + 'resource/' + page.Res.home + ')',
          }" class="h-210" style="background-size:100%;background-repeat: no-repeat" >
<div class="padding-top-40 margin-left-40 margin-right-14 flex-row flex-center">
 <div>
                <div class="f-24 c-w bold ">欢迎您</div>
<div class="f-20 c-w margin-top-20 ">{{page.Memberinfo.store_name}}</div>
 </div>
 <div class="flex-1"></div>
 <div class="h-30 flex-row flex-center padding-left-10 padding-right-10 border-radius-14 bd-8" @click="zhanghao">
     <img :src="page.uploadpath + 'resource/' + page.Res.shezhi" class="icon-16" />
     <div class="margin-left-4 c-w f-12 ">账号管理</div>
 </div>

</div>
          </div>

          <!--  -->
          <div class="margin-top-50 flex-row flex-center">
            <div class="flex-1"></div>
            <div @click="about(3)">
              <img :src="page.uploadpath + 'resource/' + page.Res.hexiao" class="icon-33 displat-block margin-auto" />
              <div class="center c-2 f-14 margin-top-15">服务核销</div>
            </div>
            <div class="flex-1"></div>
            <div @click="about(1)">
              <img :src="page.uploadpath + 'resource/' + page.Res.fuwuinfo" class="icon-33 displat-block margin-auto" />
              <div class="center c-2 f-14 margin-top-15">服务信息</div>
            </div>
            <div class="flex-1"></div>
            <div @click="about(2)" >
              <img :src="page.uploadpath + 'resource/' + page.Res.didna" class="icon-33 displat-block margin-auto" />
              <div class="center c-2 f-14 margin-top-15">订单管理</div>
            </div>
            <div class="flex-1"></div>
          </div>

          <div class="margin-top-50 flex-row flex-center">
            <div class="flex-1"></div>
            <div @click="about(4)">
              <img :src="page.uploadpath + 'resource/' + page.Res.pingjia" class="icon-33 displat-block margin-auto" />
              <div class="center c-2 f-14 margin-top-15">评价管理</div>
            </div>
            <div class="flex-1"></div>
            <div @click="about">
              <img :src="page.uploadpath + 'resource/' + page.Res.aboutr" class="icon-33 displat-block margin-auto" />
              <div class="center c-2 f-14 margin-top-15">关于我们</div>
            </div>
            <div class="flex-1"></div>
            <div style="visibility: hidden">
              <img :src="page.uploadpath + 'resource/' + page.Res.pingjia" class="icon-33 displat-block margin-auto" />
              <div class="center c-2 f-14 margin-top-15">订单管理</div>
            </div>
            <div class="flex-1"></div>
          </div>



<!-- 客服 -->

 <div class=" icon-90" style="bottom:20px;right:0;position: fixed" @click="kefu">
                     <img :src="page.uploadpath + 'resource/' + page.Res.kefu" class="icon-90" />
               </div>


<van-overlay :show="show" @click="show = false">
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
.padding-home{
  padding: 15px 40px 23px;

}

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  /* .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  } */

</style>