<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';

let page = ref({});
let router = useRouter();
let route = useRoute();
let shownum=ref('A');


PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});

// cx 选择
var cx=(e)=>{
    shownum.value=e
    yhlist()
}

// 优惠券列表
let couponorder=ref(null)
var yhlist=()=>{
    HttpHelper.Post('couponorder/couponorderlist',{shownum:shownum.value}).then((res)=>{
    couponorder.value=res
})

}

yhlist();
</script>

<template>
  <div  v-if="page.Res!=null">
      <van-sticky>
          <div class="h-40 bg-w flex-row flex-center">
          <div class="flex-1 f-14 c-1 center" :style="{'color':shownum=='A'?'#409EFF':''}" @click="cx('A')">未使用</div>
          <div class="flex-1 f-14 c-1 center" :style="{'color':shownum=='B'?'#409EFF':''}" @click="cx('B')">已使用</div>
          <div class="flex-1 f-14 c-1 center" :style="{'color':shownum=='C'?'#409EFF':''}" @click="cx('C')">已失效</div>
      </div>
      <div class="bg-w flex-row">
          <div class="flex-1 ">
              <div class="hen" :style="{'background':shownum=='A'?'#1890FE':''}"></div>
          </div>
          <div class="flex-1 ">
              <div class="hen" :style="{'background':shownum=='B'?'#1890FE':''}"></div>
          </div>
          <div class="flex-1 ">
              <div class="hen" :style="{'background':shownum=='C'?'#1890FE':''}"></div>
          </div>
      </div>
      </van-sticky>

     <div v-for="(item,index) in couponorder " :key="index">
          <!-- 领劵中心 -->
        <div class="margin-left-14 margin-right-14 margin-top-14 bg-w border-radius-9 padding-ph flex-row" v-if="couponorder.type !='C'">
          <div class="biao center flex-row flex-center ">
              <div class=" c-6 f-14 bold w-14 margin-auto">{{item.type=='A'?'立减券':item.type=='B'?'抵扣券':'补给券'}}</div>
          </div>
          <div class="margin-left-10 flex-row flex-center">
           <div>
                  <div class="c-2 f-16 bold ">{{item.shangping}}张×{{item.price}}元 {{item.name}}</div>
              <div class="margin-top-14 c-6 f-14 ">{{item.title}}</div>
              <div class="f-12 c-1 margin-top-14 ">满{{item.manmoney}}可用 每次仅使用一张</div>
              <!-- <div class="f-12 c-1 margin-top-14 ">满{{item.manmoney}}可用</div> -->
           </div>
          </div>
          <div class="flex-1"></div>
          <div class="flex-row flex-center">
          <div>
                  <div class="padding-left-12 padding-right-12 h-26 line-height-26 c-w f-12 bg-5 border-radius-13 ">去使用</div>
              <div class="margin-top-10 c-1 f-12 center">有效期{{item.youxiao}}天</div>
          </div>

          </div>
      </div>
      <!-- 实物不急 -->

       <div class="margin-left-14 margin-right-14 margin-top-14 bg-w border-radius-9 padding-ph flex-row" v-else>
          <div class="biao center flex-row flex-center ">
              <div class=" c-6 f-14 bold w-14 margin-auto">补给券</div>
          </div>
          <div class="margin-left-10 flex-row flex-center">
           <div>
                  <div class="c-2 f-16 bold ">{{item.shangping}}张×{{item.price}}元 {{item.name}}</div>
              <div class="margin-top-14 c-6 f-14 ">{{item.title}}</div>
              <div class="f-12 c-1 margin-top-14 ">无门槛</div>
              <!-- <div class="f-12 c-1 margin-top-14 ">满{{item.manmoney}}可用</div> -->
           </div>
          </div>
          <div class="flex-1"></div>
          <div class="flex-row flex-center">
          <div>
                  <div class="padding-left-12 padding-right-12 h-26 line-height-26 c-w f-12 bg-5 border-radius-13 ">去使用</div>
              <div class="margin-top-10 c-1 f-12 center">有效期{{item.youxiao}}天</div>
          </div>

          </div>
      </div>
     </div>



      <!-- <div class="margin-left-14 margin-right-14 margin-top-14 styyan  flex-row flex-center padding-my" v-for="(item,index) in couponorder" :key="index" >
          <div class="shu margin-right-20"></div>
          <div>
              <div class="flex-row flex-center ">
                 <div class="c-6 f-15 bold">¥</div>
                 <div class="f-36 c-6 bold">5</div>
              </div>
              <div class="margin-top-10 c-1 f-12 ">满20可用</div>

          </div>
          <div class="margin-left-30"></div>
         <div class="margin-right-14 flex-1">
             <div class="flex-row">
                 <div><div class="c-2 f-16 bold ">满减券</div>
              <div class="f-12 c-1  margin-top-10">有效期至2022.12.23</div></div>
              <div class="flex-1"></div>
              <div class="f-12 c-w padding-left-14 padding-right-14 h-25 line-height-25 border-radius-12  bg-6 ">去使用</div>
             </div>
             <div class="flex-row flex-center margin-top-26">
                 <div class="c-1 f-12">使用规则</div>
                 <div class="flex-1"></div>
                 <img :src="page.uploadpath + 'resource/' + page.Res.xiajain" class="icon-12"/>
             </div>
         </div>
      </div> -->



  </div>
</template>
<style scoped>
.hen{
    width: 20px;
height: 3px;
border-radius: 2px;
margin:auto;
}
.styyan{
  
height: 110px;
background: #FFFFFF;
box-shadow: 0px 2px 14px 0px rgba(24, 144, 254, 0.12);
border-radius: 5px;
}
.shu{
    width: 4px;
height: 110px;
background: #1890FE;
border-radius: 2px 0px 0px 2px;
}


</style>