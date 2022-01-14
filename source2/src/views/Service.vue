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

let fuwulist=ref([])
let servicelist=ref([])
let bigcategory_id=ref(0)

// 服务
var fuwu=()=>{
 
    if (bigcategory_id.value<=0) {
      
        return
    }
  HttpHelper.Post('serviceprice/servicepricelist2',{
      store_id:page.value.Memberinfo.store_id,
      bigcategory_id:bigcategory_id.value
      }).then((Res)=>{
   servicelist.value=Res
})
}


// 获取这个门店的服务
HttpHelper.Post("store/fuwulist",{}).then((res)=>{
    console.log(res,'数据')
    if (res.code==0) {

        fuwulist.value=res.result
        if (res.result.length>0) {
             bigcategory_id.value=res.result[0].id
            fuwu()  
        }
      
    }
    
})


var change=(e)=>{
    // console.log(e,'ee');
    // return
    bigcategory_id.value=fuwulist.value[e.name].id
     fuwu()  
    

}


</script>

<template>
  <div  v-if="page.Res!=null">
 <van-sticky>
  <van-tabs v-model:active="active" title-inactive-color="#999" color="#1890FE"  title-active-color="#1890FE" @click-tab="change"  >
  <van-tab v-for="(item,index) in fuwulist" :title="item.name" :key="index"  >
  </van-tab>
</van-tabs>
 </van-sticky>


<div class="padding-15">
    <div class="bg-w border-radius-9 padding-15 ">
        <div class="flex-row flex-center  h-64" v-for="(item,index) in servicelist" :key="index"   :style="{'border-bottom':index+1==servicelist.length?'':'1px solid #CCCCCC '}" >
            <div>
                <div class="c-2 f-14 ">{{item.service_name}}</div>
                <div class="margin-top-10 c-2 f-12 ">已售 {{item.sell}}</div>
            </div>
            <div class="flex-1"></div>
            <div class="c-2 f-10 ">¥</div>
            <div class="f-16 c-2 ">{{item.originalprice}}元</div>
        </div>


    </div>


</div>





  </div>
</template>
<style scoped>

</style>