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
HttpHelper.Post('neirong/neirongdetail',{id:2}).then((res)=>{
    neirongdetail.value=res
}) 




</script>

<template>
  <div  v-if="page.Res!=null" >
<div class="bg-w">
          <!-- <div class="h-30">  </div> -->
  <!-- <img :src="page.uploadpath + 'neirong/' + neirongdetail.img" class="icon-100 displat-block margin-auto "/> -->
    
    <div class="h-14">  </div>
<div class="padding-15 margin-left-14 margin-right-14">
    <div class="htmlimg" v-html="Utils.HtmlDecode(neirongdetail.neirong)"></div>
</div>
</div>

<div class="bg-w margin-top-10">
    <!-- <div class=" flex-row flex-center bg-w margin-left-14 margin-right-14 h-44 ">
<div class="f-15 c-1">意见反馈</div>
<div class="flex-1"></div>
<img :src="page.uploadpath + 'resource/' + page.Res.youjian" class="icon-12"/>
</div> -->

<!-- <div class="bd-6"></div>

<div class=" flex-row flex-center bg-w margin-left-14 margin-right-14 h-44">
<div class="f-15 c-1">其他说明</div>
<div class="flex-1"></div>
<img :src="page.uploadpath + 'resource/' + page.Res.youjian" class="icon-12"/>
</div> -->
</div>


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