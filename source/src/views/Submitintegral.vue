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
      <div class="h-200 bg-7 "></div>
      <div class="margin-top-f200"></div>

      <div class="margin-left-14 margin-right-14 ">
          <div class="margin-top-20 padding-15 bg-w border-radius-9 flex-row flex-center">
              <div>
                  <div class="c-2 bold f-15">青青草原羊村大门口</div>
                  <div class="margin-top-10 c-2 f-12 ">牛肉粥 19568447268</div>

              </div>
              <div class="flex-1"></div>
              <img :src="page.uploadpath + 'resource/' + page.Res.youjian" class="icon-12"/>

          </div>
          <!--  -->
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
          </div>

          <!--  -->



      </div>


     
        <div class="position-bottom bg-w">
            <div class="flex-row flex-center h-50 margin-left-14 margin-right-14">
              <div>
                   <div class="flex-row flex-center">
                
                <div class="f-16  c-5 bold">300积分</div>
               </div>
        
              </div>
              <div class="flex-1"></div>
              <div class="h-38 line-height-38 c-w bold f-14 bg-3 " style="padding:0 48px;border-radius: 5px 15px 5px 15px;" >提交订单</div>
            </div>
        </div>

  </div>
</template>
<style scoped>

</style>