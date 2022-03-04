<script setup>
// import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';
import { Utils } from '../Utils';



let page = ref({});
let router = useRouter();
let route = useRoute();


// PageHelper.Init(page, () => {});

let langdetail=ref(null)

if (route.query.id>0) {
    HttpHelper.Post("lang/langdetail",{id:route.query.id}).then((res)=>{
langdetail.value=res
    })
    
}else{
    Toast('数据存在问题')
}

var tiaozhaun=()=>{
  let str =langdetail.value.weizhi
  
  if (str!='') {
if (str=='firsthome') {
      router.push('/')
  }else{
       router.push('/'+str)
  }
     
  }

  
}

// PageHelper.LoginAuth(page, () => {});

</script>

<template>
<!-- padding-15 -->
<!--  -->
  <div  v-if="langdetail!=null">
    <!-- {{langdetail.neirong}} -->

<div class="htmlimg " v-html="Utils.HtmlDecode(langdetail.neirong)" @click="tiaozhaun"></div>

  </div>



</template>
<style scoped>
/deep/ .htmlimg>p{
  margin: 0 !important;
}
/deep/ .htmlimg p>img{
  width: 100% !important;
}

/deep/ .htmlimg p >a >img{
  width: 100% !important;
}
</style>