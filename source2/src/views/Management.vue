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

var xiugai=()=>{
    router.push('/password')
}

var info=()=>{
    router.push('/storeinfo')
}
var loginout=()=>{
    router.push('/login');
}


</script>

<template>
  <div  v-if="page.Res!=null">
      <div class="padding-15">
          <div class="border-radius-9 bg-w h-90 flex-row flex-center padding-left-14 "  @click="xiugai">
                  <img :src="page.uploadpath + 'resource/' + page.Res.suo" class="icon-50" />
                  <div class="f-18 bold c-2 bold margin-left-14">修改密码</div>
          </div>
          <div class="border-radius-9 bg-w h-90 flex-row flex-center padding-left-14 margin-top-10" @click="info">
                  <img :src="page.uploadpath + 'resource/' + page.Res.shanhu" class="icon-50" />
                  <div class="f-18 bold c-2 bold margin-left-14">商户信息</div>
          </div>
              <div class="border-radius-9 bg-w h-90 flex-row flex-center padding-left-14 margin-top-10" @click="loginout">
                  <img :src="page.uploadpath + 'resource/' + page.Res.shanhu" class="icon-50" />
                  <div class="f-18 bold c-2 bold margin-left-14">退出登录</div>
          </div>
      </div>



  </div>
</template>
<style scoped>

</style>