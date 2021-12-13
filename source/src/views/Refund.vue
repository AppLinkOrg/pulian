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
      <div class="h-300 bg-5">
          <div class="h-64"></div>
            <img :src="page.uploadpath + 'resource/' + page.Res.chengogn" class="chengogn displat-block margin-auto"/>
            <div class="center margin-top-20 f-16 bold c-w">退款申请成功!</div>
            <div class="margin-top-10 f-12 c-w center">退款将在1～7个工作日退还</div>
      </div>
      <div class="margin-left-14 margin-right-14 margin-top-36 h-40 line-height-40 center c-w f-16 bold bg-5 border-radius-20">
完成
      </div>
  </div>
</template>
<style scoped>
.chengogn{
    width: 100px;
    height: 64px;
}

</style>