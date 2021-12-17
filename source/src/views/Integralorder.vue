<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';

let page = ref({});
let router = useRouter();
let route = useRoute();
let show=ref(false)


PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});

</script>

<template>
  <div  v-if="page.Res!=null">

      <div class="h-300 bg-7 "></div>
      <div class="margin-top-f300"></div>
      <div class="margin-top-20 c-w f-20 bold margin-left-14">待发货</div>
       <div class="margin-left-14 margin-right-14">
          <div class="margin-top-15 bg-w border-radius-9  padding-15">
                   <div  class="flex-row flex-center ">
<img :src="page.uploadpath + 'resource/' + page.Res.chesds" class="icon-40"/>
<div class="margin-left-10">
    <div class="c-6 f-12 ">[深圳市]xx小区xx栋门卫签收</div>
    <div class="c-2 f-12 margin-top-10 ">2021-02-30 23:23:34</div>
</div>
                   </div>
                        <div class="h-1  bd-6 margin-top-10  margin-bottom-20  "></div>
              <div  class="flex-row flex-center">
         
               <div>
                          <div class=" c-2 bold f-15">青青草原羊村大门口</div>
               
                  <div class="margin-top-10 c-1 f-12">牛肉粥  19568447268</div>
               </div>
     <div class="flex-1"></div>
              <img :src="page.uploadpath + 'resource/' + page.Res.youjian" class="icon-12"/>
              </div>
    
          </div>
      </div>
       <!--  -->
       <div class="margin-left-14 margin-right-14">
  <div class="padding-15 bg-w border-radius-9 margin-top-10">
             <div class="flex-row ">
                  <img :src="page.uploadpath + 'resource/' + page.Res.dianpu" class="icon-80"/>
                  <div class="margin-left-10 flex-row flex-column" style="width:100%">
                      <div class="f-14 c-2 bold ">坦孚.圣护A7 SL高级汽油机油坦孚润 滑油公司</div>
                      <div class="flex-1"></div>
                      <div class="flex-row " style="width:100%">
                          <div class="flex-1"></div>
                          <div class="c-1 f-12">x1</div>
                      </div>
                  </div>
             </div>
             <div class="flex-row flex-center margin-top-15">
                 <div class="c-2 f-14 ">实际支付</div>
                 <div class="flex-1"></div>
                 <div class="f-14 c-6">300积分</div>
             </div>

          </div>

          <!--  -->
          <div class="padding-15 bg-w border-radius-9 margin-top-10">
              <div class="flex-row flex-center">
                  <div class="f-14 c-1 ">订单编号</div>
                  <div class="flex-1"></div>
                  <div class="f-14 c-1">323423523423525</div>
              </div>
              <div class="margin-top-20 flex-row flex-center">
                     <div class="f-14 c-1 ">兑换时间</div>
                  <div class="flex-1"></div>
                  <div class="f-14 c-1">2021-09-23 23:34:35</div>
              </div>
                <div class="margin-top-20 flex-row flex-center">
                     <div class="f-14 c-1 ">发货时间</div>
                  <div class="flex-1"></div>
                  <div class="f-14 c-1">2021-09-23 23:34:35</div>
              </div>
                <div class="margin-top-20 flex-row flex-center">
                     <div class="f-14 c-1 ">快递单号</div>
                  <div class="flex-1"></div>
                  <div class="c-6 f-12 ">复制</div>
                  <div class="f-14 c-1 margin-left-10">2021-09-23 23:34:35</div>
              </div>
                <div class="margin-top-20 flex-row flex-center">
                     <div class="f-14 c-1 ">成交时间</div>
                  <div class="flex-1"></div>
                  <div class="f-14 c-1">2021-09-23 23:34:35</div>
              </div>
          </div>

       </div>
        <!--  -->
   <div class="position-bottom bg-w">
            <div class="flex-row flex-center h-50 margin-left-14 margin-right-14">
                <div class="flex-1"></div>
             <div class="h-30 bd-4 line-height-30 padding-left-30 padding-right-30 border-radius-13 c-2 f-12">退款</div>
               <div class="h-30 bg-6 line-height-30 padding-left-30 padding-right-30 border-radius-13 c-w  f-12 margin-left-10 ">确认收货</div>
                 <div class="h-30 bd-4 line-height-30 padding-left-30 padding-right-30 border-radius-13 c-2 f-12">申请售后</div>
                 <div class="h-30 bg-6 line-height-30 padding-left-30 padding-right-30 border-radius-13 c-w  f-12 margin-left-10 ">评价</div>
            </div>
        </div>

        <!--  -->
       <!-- 嵌入内容 -->
      <van-overlay :show="show" @click="show = false">
  <div class="wrapper" @click.stop>
    <div class="block" >
        <div class="flex-row flex-center">
            <div class="flex-1"></div>
            <img :src="page.uploadpath + 'resource/' + page.Res.cha" class="icon-13"/>
           

        </div>
         <div class="bold c-1 f-16 center">温馨提示</div>
            <div class="c-2 margin-top-26 center">确定要退款订单吗？</div>
            <div class="margin-top-30 flex-row flex-center">
                <div class="btn-1 bd-5 border-radius-13 f-12 c-6 center line-height-26">暂不退款</div>
                 <div class="btn-1 bg-6 border-radius-13 f-12  center line-height-26 margin-left-20 c-w ">确定退款</div>
            </div>
    </div>
  </div>
</van-overlay>



  </div>
</template>
<style scoped>

</style>