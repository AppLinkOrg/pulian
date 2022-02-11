<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';
import { Utils } from "../Utils";

let page = ref({});
let router = useRouter();
let route = useRoute();


PageHelper.Init(page, () => {});
// PageHelper.LoginAuth(page, () => {});

let info = ref({}); 
HttpHelper.Post("content/get", { keycode:  route.query.keycode }).then((Res) => {
    Res.content=Utils.HtmlDecode(Res.content);
    info.value=Res;
    console.log(Res)
}); 
</script>

<template>
  <div  v-if="page.Res!=null">
      <div class=" "  ></div>
     <div class="padding-20 " v-html="info.content"></div>
  </div>
</template>

<style scoped>

</style>