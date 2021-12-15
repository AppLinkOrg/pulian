<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';

let page = ref({});
let router = useRouter();
PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});

const checked = ref(true);

</script>

<template>
  <div  v-if="page.Res!=null">
      <div class="padding-15">
          <div class="bg-w border-radius-9 ">

                <div class="padding-15">
          <div class="padding-add bg-w border-radius-9">
          <div class="flex-row flex-center padding-15">
              <div class="flex-1"></div>
<img :src="page.uploadpath + 'resource/' + page.Res.saomiao" class="icon-18"/>
<div class="bold f-14 c-6 margin-left-4">扫描驾驶证自动填写</div>
 <div class="flex-1"></div>
          </div>
          <div class=" h-1 bg-1"></div>
          <div class="h-53 flex-row flex-center margin-left-14 margin-right-14">
              <div class="c-2 f-14 w-90 ">车牌号</div>
              <div class="flex-row flex-center">
                  <div class="c-2 f-14 ">粤</div>
                  <img :src="page.uploadpath + 'resource/' + page.Res.xiajian" class="icon-8 margin-left-4"/>
              </div>
              <input type="text" placeholder="请输入完整车牌号" class="f-14 c-2 flex-1">
          </div>
          <div class=" h-1 bg-1"></div>
           <div class="h-53 flex-row flex-center margin-left-14 margin-right-14">
                <div class="c-2 f-14 w-90">品牌车系</div>
                <input type="text" placeholder="请选择您的品牌" class="f-14 c-2 flex-1">
                <img :src="page.uploadpath + 'resource/' + page.Res.youjian" class="icon-12 margin-left-4"/>
           </div>
             <div class=" h-1 bg-1"></div>
<div class="h-53 flex-row flex-center margin-left-14 margin-right-14">
                <div class="c-2 f-14 w-90">车架号</div>
                <input type="text" placeholder="请输入您的车架号" class="f-14 c-2 flex-1">
           </div>
  <div class=" h-1 bg-1"></div>
<div class="h-53 flex-row flex-center margin-left-14 margin-right-14">
                <div class="c-2 f-14 w-90">发动机号</div>
                <input type="text" placeholder="请输入您的发动机号" class="f-14 c-2 flex-1">
           </div>
             <div class=" h-1 bg-1"></div>
             <div class="h-53 flex-row flex-center margin-left-14 margin-right-14">
                <div class="c-2 f-14 w-90">注册时间</div>
                <input type="text" placeholder="请选择" class="f-14 c-2 flex-1">
           </div>
                <div class=" h-1 bg-1"></div>
 <div class="h-53 flex-row flex-center margin-left-14 margin-right-14">
                <div class="c-2 f-14 w-90">检验有效期</div>
                <input type="text" placeholder="请选择" class="f-14 c-2 flex-1">
           </div>
              <div class=" h-1 bg-1"></div>
              <div class="h-53 flex-row flex-center margin-left-14 margin-right-14">
                <div class="c-2 f-14 w-90">设为默认车辆</div>
                <div class="flex-1"></div>
            <van-switch v-model="checked" />
           </div> 
      </div>
    </div>
          </div>

          <div class="c-2 margin-top-10 f-12">所填信息为交管局所需，我们将严格保密，请您放心填写</div>
      </div>
             <!--  -->
          <div class="position-bottom" style="bottom:20px">
              <div class="margin-left-14 margin-right-14 h-40 line-height-40 center f-16 c-w bold bg-5 border-radius-20">
保存
              </div>

          </div>

  </div>
</template>
<style scoped>

</style>