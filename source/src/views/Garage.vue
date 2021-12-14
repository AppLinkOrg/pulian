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
  <div  v-if="page.Res!=null">
      <div class="margin-top-10 margin-left-14 margin-right-14 bg-w border-radius-9 ">
          <div class="flex-row flex-center padding-20">
              <div class="flex-1">
                  <div class="f-20 c-2 bold">粤BDG245</div>
                  <div class="margin-top-14 c-1 f-13">奔驰</div>
              </div>
                <img :src="page.uploadpath + 'resource/' + page.Res.dianpu" class="icon-60"/>
          </div>
<div class="h-1 bg-1 "></div>
<div class="flex-row flex-center padding-15">
  <img :src="page.uploadpath + 'resource/' + page.Res.wanchegn" class="icon-18"/>
  <div class="c-1 f-12 ">设为默认车</div>
  <div class="flex-1"></div>
  <div class="c-1 f-12">删除</div>
    <div class="c-1 f-12">修改</div>
</div>
      </div>

                <!--  -->
          <div class="position-bottom" style="bottom:20px">
              <div class="margin-left-14 margin-right-14 h-40 line-height-40 center f-16 c-w bold bg-5 border-radius-20">
+添加爱车
              </div>

          </div>
      

  </div>
</template>
<style scoped>

</style>