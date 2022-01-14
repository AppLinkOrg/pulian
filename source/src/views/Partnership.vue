<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';
import { Utils } from '../Utils';

let page = ref({});
let router = useRouter();
let route = useRoute();


PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});


// 内容详情
let neirongdetail=ref(null)

if (route.query.type=='A') {
  HttpHelper.Post('neirong/neirongdetail',{id:3}).then((res)=>{
    neirongdetail.value=res
})
}
if (route.query.type=='B'){
  HttpHelper.Post('neirong/neirongdetail',{id:1}).then((res)=>{
    neirongdetail.value=res
})
}
if (route.query.type=='C'){
  HttpHelper.Post('neirong/neirongdetail',{id:4}).then((res)=>{
    neirongdetail.value=res
})
}





</script>

<template>
  <div  v-if="page.Res!=null && neirongdetail!=null">
      <div class="htmlimg padding-15" v-html="Utils.HtmlDecode(neirongdetail.neirong)"></div>


  </div>
</template>
<style scoped>
/deep/ .htmlimg>p{
  margin: 0 !important;
}
.htmlimg p>img{
  width: 100% !important;
}

</style>