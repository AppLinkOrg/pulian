<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';

let page = ref({});
let router = useRouter();
PageHelper.Init(page, () => {});


</script>

<template>
 <div  v-if="page.Res!=null" class="big-bg">
  
      <div class="h-200"  :style="{
            backgroundImage:
              'url(' + page.uploadpath + 'resource/' + page.Res.evbg + ')',
          }" style="background-size:100%;background-repeat: no-repeat"></div>
          <div class="margin-top-f200"></div>
          <!--  华语专业汽修-->
          <div class="margin-top-20 margin-left-14 margin-right-14 bg-w border-radius-9 padding-15">
              <div class="f-14 c-2 bold ">华语专业汽修</div>
              <div class="flex-row flex-center margin-top-10">
  <img :src="page.uploadpath + 'resource/' + page.Res.dianpu" class="icon-90 border-radius-9"/>
                <div class="margin-left-10">
                    <div class="f-14 c-1 ">标准洗-SUV/MPV</div>
                    <div class="c-2 margin-top-10 f-10">有效期至：2022-03-12 23:34</div>
                    <div class="c-2 margin-top-10 f-10">数量：1</div>
                    <div class="c-2 margin-top-10 f-10">总价：¥23</div>
                </div>
        
              </div>
          </div>
          <!-- 点评 -->
          <div class="flex-row flex-center margin-top-20  margin-left-14 margin-right-14 ">
              <div class="c-2 f-14 bold">点评</div>
                <img :src="page.uploadpath + 'resource/' + page.Res.star4" class="icon-20 margin-left-10" v-for="item in 5" :key="item" />
                <div class="c-1 f-12 margin-left-14">非常好</div>
          </div>
          <!--  -->
          <div class="flex-row flex-center margin-left-14 margin-right-14 margin-top-20" style="overflow: scroll;">
              <div class="h-24 padding-left-10 padding-right-10 c-1 f-12 line-height-24 bg-1 border-radius-12">服务很好</div>

          </div>
          <!--  -->
          <div class="margin-top-15 margin-left-14 margin-right-14 bg-1 border-radius-5 h-200  padding-15">
              <textarea class="flex-1  bg-1 h-100 f-12 c-2" style="border:none;width:100%" placeholder="效果如何，服务是否周到，环境怎么样？">
              </textarea>
              <div class="bd-4 radius-5 icon-70 flex-row flex-column ">
                  <div class="flex-1"></div>
                    <img :src="page.uploadpath + 'resource/' + page.Res.paizhao" class="icon-25"/>
                    <div class="margin-top-8  c-1 f-10">上传图片</div>
                     <div class="flex-1"></div>
              </div>
          </div>
          <!--  -->
          <div class="position-bottom" style="bottom:20px">
              <div class="margin-left-14 margin-right-14 h-40 line-height-40 center f-16 c-w bold bg-5 border-radius-20">
发布
              </div>

          </div>
 </div>
</template>
<style scoped>

</style>