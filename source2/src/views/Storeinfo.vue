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

// 门店信息
let storedetail2=ref(null)
HttpHelper.Post("store/storedetail2",{}).then((Res)=>{
storedetail2.value=Res
})



</script>

<template>
  <div  v-if="page.Res!=null">
         <div class="flex-row h-53 flex-center c-2 f-16 bold padding-left-14">
          门店信息
      </div> 
      <div class="bg-w ">
            <div class="flex-row flex-center h-53 flex-center  bd-9 padding-left-14  padding-right-14  ">
          <div class="c-1 f-14  ">门店名称</div>
    
          <input type="text" class="c-2 f-14 flex-1 right" disabled="disabled"  v-model="storedetail2.name" />
      </div>
        <div class="flex-row flex-center h-53 flex-center  bd-9 padding-left-14  padding-right-14  ">
          <div class="c-1 f-14  ">地址</div>
    
          <input type="text" class="c-2 f-14 flex-1 right" disabled="disabled"  v-model="storedetail2.address" />
      </div>
        <div class="flex-row flex-center h-53 flex-center  bd-9 padding-left-14  padding-right-14  ">
          <div class="c-1 f-14  ">联系人姓名</div>
    
          <input type="text" class="c-2 f-14 flex-1 right" disabled="disabled"  v-model="storedetail2.xinming" />
      </div>
        <div class="flex-row flex-center h-53 flex-center  bd-9 padding-left-14  padding-right-14  ">
          <div class="c-1 f-14  ">联系人电话</div>
    
          <input type="text" class="c-2 f-14 flex-1 right" disabled="disabled"  v-model="storedetail2.phone" />
      </div>
        <div class="flex-row flex-center h-53 flex-center  bd-9 padding-left-14  padding-right-14  ">
          <div class="c-1 f-14  ">营业开始时间</div>
    
          <input type="text" class="c-2 f-14 flex-1 right"   v-model="storedetail2.star_time" />
      </div>
       <div class="flex-row flex-center h-53 flex-center  bd-9 padding-left-14  padding-right-14  ">
          <div class="c-1 f-14  ">营业结束时间</div>
    
          <input type="text" class="c-2 f-14 flex-1 right"   v-model="storedetail2.end_time" />
      </div>
        <div class="flex-row flex-center h-53 flex-center  bd-9 padding-left-14  padding-right-14  ">
          <div class="c-1 f-14  ">星级标准</div>
    
          <input type="text" class="c-2 f-14 flex-1 right" disabled="disabled"  v-model="storedetail2.score" />
          <div class="c-2 f-14  right" >星</div>
      </div>

      </div>
         <!--  -->
          <div class="position-bottom " style="bottom:20px">
                            <div class="margin-left-14 margin-right-14 h-40 line-height-40 center f-16 c-w bold bg-5 border-radius-20" @click="save">
保存修改
              </div>
          </div>

  </div>
</template>
<style scoped>

</style>