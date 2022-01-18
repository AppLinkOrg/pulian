<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';

let page = ref({});
let router = useRouter();
let route = useRoute();
let pointsrecordlist=ref({})
let jifenzhuan=ref('A');


PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});

// 用户积分明细列表
var jifenlist=()=>{
  HttpHelper.Post('pointsrecord/pointsrecordlist',{jifenzhuan:jifenzhuan.value}).then((res)=>{
    pointsrecordlist.value=res
})
}
jifenlist()

// 头部按钮 切换
var xuan=(e)=>{
jifenzhuan.value=e
jifenlist()
}


</script>

<template>
  <div  v-if="page.Res!=null">
 <van-sticky>
          <div class="h-40 bg-w flex-row flex-center" >
          <div class="flex-1 f-14 c-1 center" :style="{'color':jifenzhuan=='A'?'#1890FE':'#333333'}"  @click="xuan('A')">收入</div>
          <div class="flex-1 f-14 c-1 center" :style="{'color':jifenzhuan=='B'?'#1890FE':'#333333'}"  @click="xuan('B')">支出</div>
      </div>
       <div class=" flex-row flex-center" >
          <div class="flex-1 f-14 c-1 center" >
<div class="hensty" v-show="jifenzhuan=='A'"></div>
          </div>
          <div class="flex-1 f-14 c-1 center">
            <div class="hensty"  v-show="jifenzhuan=='B'"></div>
          </div>
      </div>
 </van-sticky>

       <!-- <div class="position-top">
          <div class="h-40 bg-w flex-row flex-center" >
          <div class="flex-1 f-14 c-1 center" :style="{'color':jifenzhuan=='A'?'#1890FE':'#333333'}"  @click="xuan('A')">收入</div>
          <div class="flex-1 f-14 c-1 center" :style="{'color':jifenzhuan=='B'?'#1890FE':'#333333'}"  @click="xuan('B')">支出</div>
      </div>
       <div class=" flex-row flex-center" >
          <div class="flex-1 f-14 c-1 center" >
<div class="hensty" v-show="jifenzhuan=='A'"></div>
          </div>
          <div class="flex-1 f-14 c-1 center">
            <div class="hensty"  v-show="jifenzhuan=='B'"></div>
          </div>
      </div>
      </div> -->

      <!-- <div class="h-40"></div> -->

      <div class="margin-left-14 margin-right-14 margin-top-14 bg-w border-radius-9 padding-15" v-for="(item,index) in pointsrecordlist.result" :key="index">
        <div class="f-15 c-2 bold ">{{item[0]['times']}}</div>
   
        <div class="padding-top-15 padding-bottom-15 bd-6 "  v-for="(items,indexs) in item" :key="indexs">
  
           
          <div class="flex-row flex-center ">
            <div>
               <div class="f-14 c-2 ">{{items.type=='A'?'签到':items.type=='B'?'添加车辆':items.type=='C'?'完善信息':items.type=='D'?'积分兑换':items.type=='E'?'购买积分':items.type=='F'?'积分退款':'积分退货'}}</div>
                 <div class="c-1 f-12 margin-top-10">{{items.time}}</div>
            </div>
          
            <div class="flex-1"></div>
            <div class="bold f-15 c-6">{{items.totle}}</div>
          </div>
        
        </div>
      </div>


  </div>
</template>
<style scoped>
.hensty{
  width: 25px;
height: 2px;
background: #1890FE;
border-radius: 1px;
margin:auto;
}
.hensty1{
  width: 25px;
height: 2px;
margin:auto;
border-radius: 1px;
}

</style>