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
let collectionlist=ref(null);
let mylat=ref(null);
let mylng=ref(null);
 mylat.value= window.localStorage.getItem("latitude");
 mylng.value= window.localStorage.getItem("longitude");

var collect = ()=>{
  HttpHelper.Post('collection/collectionlist',{mylat:mylat.value,mylng:mylng.value}).then((Res)=>{
collectionlist.value=Res

})
}

collect()

// mendian 跳转到门店详情
var mendian=(e)=>{
  router.push('/storedetail?id='+e)
}

// quxiao 取消门店收藏
var quxiao=(e)=>{
HttpHelper.Post('collection/collectionadd',{store_id:e}).then((res)=>{
    if(res==0){
        Toast('取消收藏成功')
    }else{
       Toast('取消收藏失败') 
    }
collect();
})

}



</script>

<template>
  <div  v-if="page.Res!=null">

<div  style="position: relative;" v-for="(item,index) in collectionlist" :key="index" class="margin-left-14 margin-right-14 margin-top-14 bg-w border-radius-9 padding-10 " >
     <img :src="page.uploadpath + 'resource/' + page.Res.cha" class="icon-10 dinwei" @click="quxiao(item.store_id)"/>
        <div class="flex-row flex-center" @click="mendian(item.store_id)">
       
<img :src="page.uploadpath + 'store/' + item.store_tupian" class="icon-90-32"/>
<div class="margin-left-14 flex-1">
    <div class="c-2 f-14 bold ">{{item.store_id_name}}</div>
<div class="flex-row flex-center">
      <div v-for="items in 5" :key="items"  >
  <img :src="page.uploadpath + 'resource/' + page.Res.star1" class="icon-10 margin-top-10" v-if="item.store_score<items" />
    <img :src="page.uploadpath + 'resource/' + page.Res.star2" class="icon-10 margin-top-10" v-else />
    </div>
</div>
  
    <div class="flex-row ">
        <div class="c-1 margin-top-14 f-12 ">月售 {{item.store_monthlysale}}单</div>
        <div class="flex-1"></div>
        <div class="c-1 margin-top-14 f-12 ">{{item.distance2}}</div>
    </div>

</div>

</div>
</div>


  </div>


</template>
<style scoped>
.dinwei{
    position: absolute;top:10px;right:14px;
    z-index: 3;

}

</style>