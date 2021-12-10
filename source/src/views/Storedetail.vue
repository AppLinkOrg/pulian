<script setup>
import { ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { HttpHelper } from "../HttpHelper";
import { PageHelper } from "../PageHelper";

let router = useRouter();
let route = useRoute();

let page = ref({});
PageHelper.Init(page, () => {});

var storedetail = ref({});

var current = ref(0);

let show =ref(false);

// 门店详情
HttpHelper.Post("store/storedetail", { id: route.query.id }).then((res) => {
  storedetail.value = res;
});
// 轮播图改变时间
var onChange = (index) => {
  current.value = index;
};

// 抢购
var qiangou = (e) =>{
  show.value=true;
  console.log('寄哪里了',show);
}

console.log(route.query.id, "router");
</script>

<template>
  <div
    class=""
    v-if="page.Res!=null"
  >
    <!-- <div> -->
    <van-swipe
      :autoplay="3000"
      indicator-color="white"
      @change="onChange"
      :loop='false'
    >
      <van-swipe-item
        v-for="(item,index) in storedetail.imglist"
        :key="index"
        class="w-100 h-215"
      >
        <img
          :src="page.uploadpath + 'img/' + item.img"
          class="w-100 h-215"
        />
      </van-swipe-item>

    </van-swipe>
    <!-- </div> -->

    <div style="margin-top:-78px"></div>

    <div
      class="margin-left-14 margin-right-14 bg-w border-radius-9"
      style="padding:14px 9px;position: relative;z-index:1"
    >
      <div class="flex-row ">
        <div>
          <div class="bold f-14 c-2 ">门店名称</div>
          <div class="margin-top-8 flex-row flex-center  ">
            <!-- <div
              v-for="item in 5"
              :key="item"
              class="margin-right-5 icon-13 "
            > -->
              <img
              v-for="item in 5"
              :key="item"
                :src="page.uploadpath + 'resource/' + page.Res.star1"
                class="icon-13 "
              />
              <!-- <img
              
                :src="page.uploadpath + 'resource/' + page.Res.star2"
                class="icon-13 "
              /> -->
            <!-- </div> -->

            <div class="f-13 bold c-3 margin-left-10">5.0</div>
          </div>
          <div class="c-1 f-11 margin-top-10">营业中 周一至周五 09:00-22:00</div>
          <div class="flex-row flex-center margin-top-14 margin-bottom-9 ">
            <div class="h-17 padding-left-7 padding-right-7 bg-1 f-9 line-height-17">保养</div>
          </div>

        </div>
        <div class="flex-1"></div>
        <div>
          <img
          :src="page.uploadpath + 'resource/' + page.Res.shocaun"
          class="icon-21 "
        />
        <div class="c-1 margin-top-4 f-9">收藏</div>
        </div>
      </div>
      <div class="h-1 bg-2 margin-top-9 "></div>
      <div class="flex-row flex-center margin-top-14">
        <div>
          <div class="c-2 f-11 ">翠竹接到太安路新港鸿综合楼140-1</div>
          <div class="c-1 f-11 margin-top-9">距离您1.9km，驾车约12分钟</div>
        </div>
        <div class="flex-1"></div>
        <div>
          <img
            :src="page.uploadpath + 'resource/' + page.Res.dianhua"
            class="icon-15 "
          />
          <div class="f-9 c-1 margin-top-5">电话</div>

        </div>
        <div class="margin-left-20">
          <img
            :src="page.uploadpath + 'resource/' + page.Res.	danhang"
            class="icon-15 "
          />
          <div class="f-9 c-1 margin-top-5">导航</div>

        </div>

      </div>

    </div>
    <!--门店服务  -->
    <div class="c-2 f-14 bold margin-top-20 margin-bottom-10 margin-left-14 ">门店服务</div>
    <!--  -->
    <div class="margin-left-14 margin-right-14 bg-w border-radius-9" style="padding:18px 9px 7px 9px">
      <div class="flex-row flex-center">
        <div>
          <div class="f-13 c-2 ">保养</div>
          <div class="hen"></div>
        </div>
        <div class="margin-left-20"></div>
        <div>
          <div class="f-13 c-2 ">优惠洗车</div>
          <div class="hen "></div>
        </div>
      </div>
      <div class="margin-top-14 flex-row flex-center">
        <div class="c-2 f-11 ">标准洗车</div>
        <div class="flex-1"></div>
         <div class="bd-1 border-radius-2 h-14 padding-right-4 padding-left-4 c-4 f-8 ">减免券¥10</div>
         <div class="c-4 f-9 margin-left-10">¥</div>
      <div class="c-4 f-13 ">30</div> 
      <div class="f-7 c-2 margin-left-10 " style="text-align: center;">¥</div>
        <div class="f-9 c-2 " style="text-align: center;">40</div>
</div>
<div class="flex-row flex-center margin-top-6">
<div class="c-1 f-9">已售 229</div>
<div class="flex-1"></div>
<div class="h-19  padding-left-14 padding-right-14 c-w f-9  border-radius-9 bg-3 line-height-19" @click="qiangou(1)">抢购</div>
</div>
      </div>
      <!--使用说明  -->
         <div class="c-2 f-14 bold margin-top-20 margin-bottom-10 margin-left-14 ">使用说明</div>
         <!--  -->
         <div  class="margin-left-14 margin-right-14 bg-w border-radius-9" style="padding:18px 9px 11px ">
           <div class="flex-row flex-center margin-left-32 margin-right-32">
             <div>
                <img
          :src="page.uploadpath + 'resource/' + page.Res.xiadan"
          class="icon-35 displat-block margin-auto"
        />
        <div class="margin-top-6 text-center c-1 f-11">在线下单</div>
             </div>
             <div class="flex-1 h-1 bg-2"> </div>
               <div>
                <img
          :src="page.uploadpath + 'resource/' + page.Res.daodian"
          class="icon-35 displat-block margin-auto"
        />
        <div class="margin-top-6 text-center c-1 f-11">到店使用</div>
             </div>
             <div class="flex-1 h-1 bg-2"> </div>
               <div>
                <img
          :src="page.uploadpath + 'resource/' + page.Res.saoma"
          class="icon-35 displat-block margin-auto"
        />
        <div class="margin-top-6 text-center c-1 f-11">扫码服务</div>
             </div>
           </div>
           <div class="flex-row flex-center bg-4 margin-top-20" style="padding:6px 10px">
<img
          :src="page.uploadpath + 'resource/' + page.Res.tishi"
          class="icon-17"
        />
        <div class="margin-left-10 c-2 f-8 border-radius-5">温馨提示：到店请出示订单中的二维码，代金券及订单号码等不能作为 消费凭证。</div>
           </div>

         </div>

         <!--门店评价  -->
          <div class="c-2 f-14 bold margin-top-20 margin-bottom-10 margin-left-14 ">门店评价</div>
          <!--  -->
          <div class="margin-left-14 margin-right-14 bg-w border-radius-9" style="padding:18px 9px 0px ">
            <div class="flex-row margin-bottom-18">
              <img
          :src="page.uploadpath + 'resource/' + page.Res.touxian"
          class="icon-28"
        />
        <div class="margin-left-6">
          <div class="f-11 c-2">牛肉粥不是皮蛋瘦肉粥</div>
          <div class="margin-top-4"></div>
          <img
              v-for="item in 5"
              :key="item"
                :src="page.uploadpath + 'resource/' + page.Res.star1"
                class="icon-13 "
              />
              <div class="margin-top-9 c-1 f-11">洗的挺干净的。</div>
              <div class="margin-top-9"></div>
               <img
                :src="page.uploadpath + 'resource/' + page.Res.dianpu"
                class="icon-78 "
              />
              <div class="c-1 f-8 margin-top-9">精洗套餐</div>

        </div>
        <div class="flex-1"></div>
        <div class="c-1 f-9">2021.09.23</div>
              
            </div>
            <div class="h-1 bg-2"></div>
            <div class="center h-44 line-height-44 f-11">查看全部评论（90）</div>

          </div>

          <!--  附近更多-->
           <div class="c-2 f-14 bold margin-top-20 margin-bottom-10 margin-left-14 ">附近更多</div>
           <!--  -->
           <div class="margin-left-14 margin-right-14">
           <div class="flex-row " style="display: flex;display: -webkit-flex;justify-content: space-between;flex-direction: row;flex-wrap: wrap;">
             <div class="bg-w border-radius-9">
               <img
          :src="page.uploadpath + 'resource/' + page.Res.dianpu"
          class="dianpu"
        />
        <div class="margin-left-10 margin-right-10 margin-bottom-10">
        <div class="flex-row flex-center margin-top-9  ">
          <div class="bold c-2 f-12 ">商户名称</div>
          <div class="flex-1"></div>
          <div class="c-1 f-9">3.20km</div>
        </div>
        <div class="c-1 f-9 margin-top-9">标准洗车</div>
        <div class="flex-row flex-center margin-top-9" >
          <div class="bd-1 border-radius-2 h-14 padding-right-4 padding-left-4 c-4 f-8 ">减免券¥10</div>
         <div class="c-4 f-9 margin-left-10">¥</div>
      <div class="c-4 f-13 ">30</div> 
      <div class="f-7 c-2 margin-left-10 " style="text-align: center;">¥</div>
        <div class="f-9 c-2 " style="text-align: center;">40</div>

        </div>

        </div>

             </div>
           </div>
           </div>
           <!--  -->
           <div class="margin-top-30"></div>

    <!-- 弹出信息 -->

<van-popup  v-model:show="show" position="bottom" :style="{ height: '60vh' }" round >

  <div class="margin-left-14" style="overflow: scroll;height:100%;position: relative;" >
  <div class=" f-15 bold c-2 margin-top-20">标准洗车</div>
  <div class="flex-row flex-center margin-top-10">
     <img  :src="page.uploadpath + 'resource/' + page.Res.dui" class="icon-11" />
     <div class="c-1 f-9 margin-left-4">未消费，随时退</div>
      <img  :src="page.uploadpath + 'resource/' + page.Res.dui" class="icon-11 margin-left-10" />
      <div class="c-1 f-9 margin-left-4">过期退</div>

  </div>
  <div class="h-1 bg-2 margin-top-14 "></div>
  <div class="flex-row flex-center margin-top-14 margin-bottom-14 margin-right-14">
<div>
  <div class="f-13 bold c-2">美容汽车中心</div>
  <div class="margin-top-4 c-1 f-9 ">深圳市南山区xx街道xxx路右侧</div>

</div>
<div class="flex-1"></div>
  <img  :src="page.uploadpath + 'resource/' + page.Res.danhang" class="icon-11" />
  <div class="margin-left-4 c-1 f-9">1.3km</div>
  </div>
    <div class="h-1 bg-2"></div>
    <div class=" f-15 bold c-2 margin-top-20">店铺券</div>
  <div class="margin-top-9 margin-bottom-9">
      <div class="zhuan flex-row flex-center" :style="{
              backgroundImage:
                'url(' + page.uploadpath + 'resource/' + page.Res.juan + ')',
            }"  style="background-size:100% ">
             <div class="flex-1"></div>
            <div>
              
              <div class="flex-row flex-center">
                <div class="flex-1"></div>
                <div class="f-8 c-5">¥</div>
                <div class="c-5 f-15">3</div>
                 <div class="flex-1"></div>
              </div>
              <div class="margin-top-6 c-1 f-8">满30可用</div>

            </div>
          
            <div class="margin-left-10">
              <div class="c-2 f-11 bold">店铺红包</div>
              <div class="margin-top-6 c-1 f-9 ">至2021.12.09到期</div>
            </div>
        <div class="flex-1"></div>
 <img  :src="page.uploadpath + 'resource/' + page.Res.quan" class="icon-15 " />
 <div class="flex-1"></div>
            </div>
  </div>

  <div class=" f-15 bold c-2 margin-top-20">代金券</div>

    <div class="margin-top-9 margin-bottom-9">
      <div class="zhuan flex-row flex-center" :style="{
              backgroundImage:
                'url(' + page.uploadpath + 'resource/' + page.Res.daijin + ')',
            }"  style="background-size:100% ">
             <div class="flex-1"></div>
            <div>
              
              <div class="flex-row flex-center">
                <div class="flex-1"></div>
                <div class="f-16 c-3">7</div>
                <div class="f-10 c-3">元</div>
                <div class="c-3 f-12">×</div>
                <div class="f-16 c-3">2</div>
                <div class="f-10 c-3">张</div>
                 <div class="flex-1"></div>
              </div>
              <div class="margin-top-6 c-1 f-9">无门槛</div>

            </div>
          
            <div class="margin-left-10">
              <div class="c-2 f-11 bold">标准洗车券</div>
              <div class="flex-row margin-top-9 flex-center">
                <div class="f-10 c-5 ">¥</div>
                <div class="f-14 c-5">10</div>
              </div>
            </div>
        <div class="flex-1"></div>
<div class="h-19  padding-left-14 padding-right-14 c-w f-9 bg-5 border-radius-9  line-height-19" >抢购</div>
 <div class="flex-1"></div>
            </div>
  </div>


  <div class="h-56"></div>
 <div class="position-bottom">
     <div class="h-1 bg-2 margin-right-14 margin-left-14"></div>
    <div class="flex-row flex-center h-56 margin-right-14 margin-left-14">
    <div>
      <div class="flex-row flex-center">
        <div class="f-12 c-5 ">¥</div>
        <div class="f-18 c-5">30</div>
      </div>
      <div class="c-1 f-12 margin-top-4">标准洗车</div>
    </div>
    <div class="flex-1"></div>
    <div class="h-38 bg-5 c-w f-15 line-height-38 padding-left-36 padding-right-36 border-radius-19 " >立即购买</div>
  </div>
 </div>





</div>

</van-popup>

  </div>
</template>
<style scoped>
.zhuan{
  width: 218px;
  height: 63px;
  
}
.custom-indicator {
  position: absolute;

  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}

/deep/ .van-swipe__indicators {
  bottom: 90px;
}
/deep/ .van-swipe__indicator--active {
  margin-top: 2px;
  width: 14px;
  height: 4px;
  border-radius: 2px;
}
.hen{
  width: 19px;
height: 4px;
background: linear-gradient(-10deg, #409EFF, #67B0FD);
border-radius: 2px;
margin:5px auto 0;
}
.dianpu{
  width: 157px;
  height: 98px;
}
</style>