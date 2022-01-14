<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';

let page = ref({});
let router = useRouter();
let route = useRoute();
let leixin=ref('')
let pintrecordlist=ref([]);

PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});


// 头部点击
var dianji=(e)=>{

leixin.value=e
jifenlies()
}

var jifenlies=()=>{
    HttpHelper.Post('pintrecord/pintrecordlist',{leixin:leixin.value}).then((res)=>{
    pintrecordlist.value=res
})
}

jifenlies()

// 退款
var xianqing=(e)=>{
    router.push('/integralorder?id='+e)

}

</script>

<template>
  <div  v-if="page.Res!=null">
         <van-sticky>
               <div class="h-40 bg-w flex-row flex-center">
          <div class="flex-1 f-14 c-1 center"  :style="{'color':(leixin==''?'#409EFF':'')}" @click="dianji('')">全部</div>
          <div class="flex-1 f-14 c-1 center" :style="{'color':(leixin=='A'?'#409EFF':'')}" @click="dianji('A')">待发货</div>
          <div class="flex-1 f-14 c-1 center" :style="{'color':(leixin=='B'?'#409EFF':'')}" @click="dianji('B')">待收货</div>
          <div class="flex-1 f-14 c-1 center" :style="{'color':(leixin=='C'?'#409EFF':'')}" @click="dianji('C')">待评价</div>
          <div class="flex-1 f-14 c-1 center" :style="{'color':(leixin=='D'?'#409EFF':'')}" @click="dianji('D')">退款/取消</div>
      </div>
         </van-sticky>
        <!-- <div class="position-top">
          <div class="h-40 bg-w flex-row flex-center">
          <div class="flex-1 f-14 c-1 center"  :style="{'color':(leixin==''?'#409EFF':'')}" @click="dianji('')">全部</div>
          <div class="flex-1 f-14 c-1 center" :style="{'color':(leixin=='A'?'#409EFF':'')}" @click="dianji('A')">待发货</div>
          <div class="flex-1 f-14 c-1 center" :style="{'color':(leixin=='B'?'#409EFF':'')}" @click="dianji('B')">待收货</div>
          <div class="flex-1 f-14 c-1 center" :style="{'color':(leixin=='C'?'#409EFF':'')}" @click="dianji('C')">待评价</div>
          <div class="flex-1 f-14 c-1 center" :style="{'color':(leixin=='D'?'#409EFF':'')}" @click="dianji('D')">退款/取消</div>
      </div>
      </div> -->
      <!-- <div class="h-40"></div> -->

      <div class="margin-left-14 margin-right-14 margin-top-14 bg-w border-radius-9 padding-15 " v-for="(item,index) in pintrecordlist" :key="index" @click="xianqing(item.id)">
          <div class="flex-row ">
              <div class="flex-1"></div>
              <div class="f-12 c-6 bold ">{{item.orderstatus_name}}</div>
          </div>
          <div class="flex-row flex-center">
              
<img :src="page.uploadpath + 'pointsmall/' + item.pointsmall_img" class="icon-90-32"/>
<div class="margin-left-10 ">
    <div class="c-2 f-15 bold">{{item.pointsmall_id_name}}</div>
    <div class="margin-top-15 flex-row ">
        <div class="c-6 f-14">{{item.integral}}</div>
    <div class="c-1 f-14">积分</div>
    </div>
</div>
          </div>
          <div class="margin-top-10 flex-row ">
              <div class="flex-1"></div>
                  <div class="h-30 bd-4 line-height-30 padding-left-30 padding-right-30 border-radius-13 c-2 f-12" v-if="item.orderstatus=='A'" >退款</div>
             <div class="h-30 bd-4 line-height-30 padding-left-30 padding-right-30 border-radius-13 c-2 f-12" v-if="item.orderstatus=='D'||item.orderstatus=='F'" >删除订单</div>
               <div class="h-30 bg-6 line-height-30 padding-left-30 padding-right-30 border-radius-13 c-w  f-12 margin-left-10 " v-if="item.orderstatus=='B'" >确认收货</div>
                 <div class="h-30 bd-4 line-height-30 padding-left-30 padding-right-30 border-radius-13 c-2 f-12" v-if="item.orderstatus=='C'" >申请售后</div>
                 <div class="h-30 bg-6 line-height-30 padding-left-30 padding-right-30 border-radius-13 c-w  f-12 margin-left-10 "  v-if="item.orderstatus=='C'" >评价</div>

          </div>
      </div>


  </div>
</template>
<style scoped>

</style>