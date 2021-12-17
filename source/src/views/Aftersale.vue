<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';

let page = ref({});
let router = useRouter();
let route = useRoute();
let miaoshu=ref('')


PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});

</script>

<template>
  <div  v-if="page.Res!=null">

        <div class="h-300 bg-7 "></div>
      <div class="margin-top-f300"></div>
      <div class="margin-left-14 margin-right-14 ">
          <div class="margin-top-20 bg-w border-radius-9 padding-15">
              <div class="c-2 f-15 bold ">服务类型</div>
              <div class="flex-row flex-center margin-top-15">
                   <div class="h-30 bd-5 line-height-30 padding-left-30 padding-right-30 border-radius-13 c-6 f-12">换货服务</div>
                    <div class="h-30 bd-4 line-height-30 padding-left-30 padding-right-30 border-radius-13 c-2 f-12 margin-left-14">退货服务</div>
              </div>
               
          </div>
 <!--  -->
          <div class="padding-15 bg-w border-radius-9 margin-top-10">
             <div class="flex-row ">
                  <img :src="page.uploadpath + 'resource/' + page.Res.dianpu" class="icon-80"/>
                  <div class="margin-left-10 flex-row flex-column" style="width:100%">
                      <div class="f-14 c-2 bold ">坦孚.圣护A7 SL高级汽油机油坦孚润 滑油公司</div>
                      <div class="flex-1"></div>
                      <div class="flex-row " style="width:100%">
                          <div class="c-6 f-14">300积分</div>
                          <div class="flex-1"></div>
                          <div class="c-1 f-12">x1</div>
                      </div>
                  </div>
             </div>

          </div>
          <!--  -->
          <div class="padding-15 bg-w border-radius-9 margin-top-10">
              <div class="f-15 c-2 bold">问题描述</div>
                <!--  -->
          <div class="margin-top-15  bg-1 border-radius-5 h-200  padding-15">
              <textarea class="flex-1  bg-1 h-100 f-12 c-2" style="border:none;width:100%" placeholder="效果如何，服务是否周到，环境怎么样？" v-model="miaoshu"></textarea>
              <div class="bd-4 radius-5 icon-70 flex-row flex-column ">
                  <div class="flex-1"></div>
                    <img :src="page.uploadpath + 'resource/' + page.Res.paizhao" class="icon-25"/>
                    <div class="margin-top-8  c-1 f-10">上传图片</div>
                     <div class="flex-1"></div>
              </div>
          </div>
    
          </div>

      </div>


                              <!--  -->
          <div class="position-bottom " style="bottom:20px">
              <div class="margin-left-14 margin-right-14 h-40 line-height-40 center f-16 c-w bold bg-5 border-radius-20">
提交
              </div>

          </div>

      

  </div>
</template>
<style scoped>

</style>