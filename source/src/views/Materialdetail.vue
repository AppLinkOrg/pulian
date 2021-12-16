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
        <div class="padding-15">
          <div class="bg-w border-radius-9 ">
          <img :src="page.uploadpath + 'resource/' + page.Res.dianpu" class="h-130 w-100f"/>
          <div class="flex-row flex-center padding-15">
              <div class="c-1 bold f-16 ">四轮轮胎</div>
              <div class="flex-1"></div>
              <img :src="page.uploadpath + 'resource/' + page.Res.xinxin" class="icon-18"/>
              <div class="margin-left-4 c-6 f-18 bold">600</div>

          </div>


      </div>

         <div class="bg-w border-radius-9 margin-top-10 padding-15">
            <div class="f-14 c-2 bold">兑换时间</div>
            <div class="margin-top-14 c-1 f-12">2021-12-01至2021-12-31</div>
            <div class="f-14 c-2 bold margin-top-20">产品详情</div>

         </div>
   <div class="f-15 c-2 bold padding-top-15 padding-bottom-15 ">产品评价</div>
<!--  -->
   <div class=" bg-w border-radius-9" style="padding:18px 9px 0px ">
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

                       <!--  -->
          <div class="position-bottom " style="bottom:20px">
              <div class="margin-left-14 margin-right-14 h-40 line-height-40 center f-16 c-w bold bg-5 border-radius-20">
立即兑换
              </div>

          </div>



        </div>
  </div>
</template>
<style scoped>

</style>