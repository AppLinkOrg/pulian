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


// 查看店铺列表
let storelist2=ref(null);
let mylat=ref(null);
let mylng=ref(null);
 mylat.value= window.localStorage.getItem("latitude");
 mylng.value= window.localStorage.getItem("longitude");

var storelist = ()=>{
  HttpHelper.Post('store/storelist2',{coupon_id:route.query.id,mylat:mylat.value,mylng:mylng.value,area_ids:area_id.value,seqid:seqid.value}).then((Res)=>{

  for(let item of Res){
item.distance2=Utils.GetMileTxt(item.distance)
  }
    storelist2.value=Res
})
}

storelist()

// mendian 跳转到门店详情
var mendian=(e)=>{
  router.push('/storedetail?id='+e)
}



</script>

<template>
  <div  v-if="page.Res!=null">

    <div class="margin-left-14 margin-right-14 margin-top-14 bg-w border-radius-9 padding-10 flex-row flex-center" v-for="(item,index) in storelist2" :key="index"  @click="mendian(item.id)">
<img :src="page.uploadpath + 'resource/' + page.Res.dianpu" class="icon-70"/>
<div class="margin-left-14 flex-1">
    <div class="c-2 f-14 bold ">{{item.name}}</div>
<div class="flex-row flex-center">
      <div v-for="items in 5" :key="items"  >
  <img :src="page.uploadpath + 'resource/' + page.Res.star1" class="icon-10 margin-top-10" v-if="item.score<items" />
    <img :src="page.uploadpath + 'resource/' + page.Res.star2" class="icon-10 margin-top-10" v-else />
    </div>
</div>
  
    <div class="flex-row ">
        <div class="c-1 margin-top-14 f-12 ">月售 {{item.monthlysale}}单</div>
        <div class="flex-1"></div>
        <div class="c-1 margin-top-14 f-12 ">{{item.distance2}}</div>
    </div>

</div>

</div>


  </div>


</template>
<style scoped>

</style>