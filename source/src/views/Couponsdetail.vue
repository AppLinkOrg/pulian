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
              <div class="c-1 bold f-16 ">5元满减代金券</div>
              <div class="flex-1"></div>
              <img :src="page.uploadpath + 'resource/' + page.Res.xinxin" class="icon-18"/>
              <div class="margin-left-4 c-6 f-18 bold">600</div>

          </div>


      </div>

        <div class="bg-w border-radius-9 margin-top-10 padding-15">
            <div class="f-14 c-2 bold">兑换时间</div>
            <div class="margin-top-14 c-1 f-12">2021-12-01至2021-12-31</div>
            <div class="f-14 c-2 bold margin-top-20">兑换说明</div>
            <div class="margin-top-14 c-1 f-12">1.兑换成功代金券即发放到账户内，可在【我的-优惠券】中查看</div>

        </div>

     </div>

                  <!--  -->
          <div class="position-bottom " style="bottom:20px">
              <div class="margin-left-14 margin-right-14 h-40 line-height-40 center f-16 c-w bold bg-5 border-radius-20">
立即兑换
              </div>

          </div> 

  </div>
</template>
<style scoped>

</style>