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

</script>

<template>
  <div  v-if="page.Res!=null">
 <div class="h-160"  :style="{
            backgroundImage:
              'url(' + page.uploadpath + 'resource/' + page.Res.integralbg + ')',
          }" style="background-size:100%;background-repeat: no-repeat"  ></div>

          <div class="margin-top-f160"></div>
        <div class="margin-left-14 margin-right-14">
            <div class="flex-row flex-center padding-top-20">
            <div class="flex-1"></div>
            <div class="f-12 c-w ">积分明细</div>
          </div>
          <!--  -->
           <div class="flex-row flex-center padding-top-5">
              <div class="f-12 c-w ">我的积分</div>
            <div class="flex-1"></div>
           
          </div>
          <!--  -->
          <div class="flex-row flex-center margin-top-16">
            <img :src="page.uploadpath + 'resource/' + page.Res.xinxin" class="icon-26"/>
            <div class="f-30 bold c-w margin-left-4 ">600</div>
            <div class="flex-1"></div>
            <div class="h-25 padding-left-10 padding-right-10 line-height-25 f-12 c-6 bg-w border-radius-12">积分充值</div>
          </div>

        </div>
        <!--  -->
        <div class="margin-left-14 margin-right-14 border-radius-9 bg-w padding-15 margin-top-30">
          <div class="flex-row flex-center">
            <div class="c-2 f-15 bold">已连续签到</div>
            <div class="c-6 f-15 ">1</div>
            <div class="c-2 f-15 bold">天</div>
            <div class="flex-1"></div>
            <div class="c-6 f-12 bold">积分规则</div>
          </div>
          <div class="margin-top-40 flex-row flex-center">
            <div v-for="item in 6" :key="item">
              <div class="margin-right-16" >
                <div class="border-radius-50 icon-30 bg-1 line-height-30 f-12 c-8 bold center ">
                  +10
                </div>
                <div class="margin-top-5 c-2 f-12 center">{{item}}天</div>
              </div>
              
            </div>
            <div class="margin-right-16" >
                  <img :src="page.uploadpath + 'resource/' + page.Res.liwu" class="icon-30"/>
                <div class="margin-top-5 c-2 f-12 center">2天</div>
              </div>
          
          </div>
          <div class="margin-left-20 margin-right-20 bg-5 center c-w f-16 h-40 line-height-40  margin-top-25 border-radius-20">已签到</div>


        </div>

        <!--任务领积分  -->
        <div class="f-15 bold  c-2 padding-15 ">任务领积分</div>
        <!--  -->
        <div class="margin-left-14 margin-right-14">
          <div class="bg-w border-radius-5 padding-15 ">
            <div class="flex-row flex-center">
<img :src="page.uploadpath + 'resource/' + page.Res.che" class="icon-40"/>
<div class="margin-left-10">
  <div class="flex-row flex-center">
    <div class="f-14 c-2 ">添加车辆</div>
    <img :src="page.uploadpath + 'resource/' + page.Res.xinxin" class="icon-14"/>
    <div class="c-6 bold f-14">+100</div>
  </div>
  <div class="margin-top-10 c-2 f-12  ">添加车牌车系</div>
</div>
<div class="flex-1"></div>
<div class="f-12 c-6 padding-left-14 padding-right-14 h-25 line-height-25 border-radius-12  bd-5  ">去完成</div>

            </div>

                      <div class="flex-row flex-center margin-top-15">
<img :src="page.uploadpath + 'resource/' + page.Res.che" class="icon-40"/>
<div class="margin-left-10">
  <div class="flex-row flex-center">
    <div class="f-14 c-2 ">完善车辆信息</div>
    <img :src="page.uploadpath + 'resource/' + page.Res.zu" class="icon-14"/>
    <div class="c-6 bold f-14">+100</div>
  </div>
  <div class="margin-top-10 c-2 f-12  ">完善车辆信息</div>
</div>
<div class="flex-1"></div>
<div class="f-12 c-6 padding-left-14 padding-right-14 h-25 line-height-25 border-radius-12  bd-5  ">去完成</div>

            </div>


          </div>

          <!-- 积分兑换 -->
          <div class="flex-row flex-center">
             <div class="f-15 bold  c-2 padding-top-15 padding-bottom-15 ">积分兑换</div>
             <div class="flex-1"></div>
             <div class="c-6 f-12 bold ">兑换记录</div>
             <img :src="page.uploadpath + 'resource/' + page.Res.youjian" class="icon-10 margin-left-4"/>
          </div>
          <!--  -->
          <div class="flex-row flex-center margin-top-14">
            <div class="f-12 c-2 ">全部</div>
          </div>

          <!--  -->
          <div class="margin-top-20 flex-row " style="display: flex;display: -webkit-flex;justify-content: space-between;flex-direction: row;flex-wrap: wrap;">
            <div class="bg-w border-radius-9">
              <img :src="page.uploadpath + 'resource/' + page.Res.dianpu" class="inimg"/>
              <div class="margin-top-10 center f-14 c-2 ">5元满减券</div>
              <div class="margin-top-10 f-14 center c-6 ">2000积分</div>
              <div class="flex-row ">
                <div class="flex-1"></div>
                <div class="f-12 c-w padding-left-14 padding-right-14 h-25 line-height-25 border-radius-12  bg-6 margin-top-10 ">立即兑换</div>
                 <div class="flex-1"></div>
              </div>
              <div class="margin-top-10"></div>

            </div>
          </div>
          




        </div>

<div class="h-100"></div>

  </div>
</template>
<style scoped>
.inimg{
  width: 165px;
  height: 110px;
}
</style>