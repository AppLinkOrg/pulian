<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';

let page = ref({});
let router = useRouter();
let route = useRoute();
let checked=ref(false)

PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});

</script>

<template>
  <div  v-if="page.Res!=null">

      <div class="padding-left-14 padding-right-14 bg-w ">
          <div class="h-44 flex-row flex-center bd-6">
              <div class="w-90 c-2 f-15 bold  ">收货人</div>
              <input type="text" placeholder="请填写收货人姓名" class="c-2 f-14 flex-1"/>
          </div>
          <div class="h-44 flex-row flex-center bd-6">
              <div class="w-90 c-2 f-15 bold  ">手机号</div>
              <input type="text" placeholder="请填写收货人手机号" class="c-2 f-14 flex-1"/>
          </div>
          <div class="h-44 flex-row flex-center bd-6">
              <div class="w-90 c-2 f-15 bold  ">收货地址</div>
              <input type="text" placeholder="点击选择收货地址" class="c-2 f-14 flex-1"/>
              <img :src="page.uploadpath + 'resource/' + page.Res.youjian" class="icon-12"/>
          </div>
           <div class="h-44 flex-row flex-center bd-6">
              <div class="w-90 c-2 f-15 bold  ">详细地址</div>
              <input type="text" placeholder="例如：xx小区5栋302号" class="c-2 f-14 flex-1"/>
          </div>
           <div class="h-53 flex-row flex-center ">
                <div class="c-2 f-14 w-90 bold">设为默认地址</div>
                <div class="flex-1"></div>
            <van-switch v-model="checked" />
           </div> 
      </div>

             <!--  -->
          <div class="position-bottom " style="bottom:20px">
                            <div class="margin-left-14 margin-right-14 h-40 line-height-40 center f-16 c-w bold bg-5 border-radius-20">
保存
              </div>
              <div class="margin-left-14 margin-right-14 h-40 line-height-40 center f-16 c-w bold bg-8 border-radius-20 margin-top-15">
删除地址
              </div>

          </div> 




  </div>
</template>
<style scoped>

</style>