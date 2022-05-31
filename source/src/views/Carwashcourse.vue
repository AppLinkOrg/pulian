<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';
import  store  from "../State";
import { Utils } from '../Utils';

let page = ref({});
let router = useRouter();
let route = useRoute();
let bujilist=ref(null);

PageHelper.Init(page, () => {});



PageHelper.LoginAuth(page, () => {
liebiao()
});


let instinfo = ref({});
HttpHelper.Post("inst/instinfo", {}).then((Res) => {
  console.log(Res,'11');  
  instinfo.value = Res;
});



// buti 补贴跳转
var buti=(e)=>{
    router.push('/couponbag?id='+e)

}


</script>

<template> 
  <div v-if="page.Res!=null">
      <div >
          <div class="htmlimg padding-15" v-html="Utils.HtmlDecode(instinfo.carwashcourse)" ></div>
      </div>
  </div>
</template>
<style scoped>



</style>