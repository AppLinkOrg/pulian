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

// guize 规则显示
let xzindex=ref(0)
var guize=(e)=>{
    if(xzindex.value==e+1){
xzindex.value=0
    }else{
    xzindex.value=e+1    
    }

}

// gouse 去使用
var gouse=(index)=>{
    

    router.push('/couponbag?id='+couponorder.value[index].coupon_id+'&couponorder_id='+couponorder.value[index].id+'&type=A')

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


     <div v-for="(item,index) in couponorder" :key="index" >
             <div class="margin-left-14 margin-right-14 margin-top-14 styyan  flex-row flex-center padding-my" >
          <div class="shu margin-right-20"></div>
          <div v-if="item.type=='C'">
              <div class="c-2 f-15">兑换</div>
          </div>
          <div  v-else>
              
              <!-- <div class="flex-row flex-center " v-if="item.type=='B'">
         
                 <div class="f-36 c-6 bold">{{item.zhekou}}%</div>
              </div> -->
              <div class="flex-row flex-center ">
                 <div class="c-6 f-15 bold">¥</div>
                 <div class="f-36 c-6 bold">{{item.jainshao}}</div>
              </div>
              <div class="margin-top-10 c-1 f-12 ">满{{item.manmoney}}可用</div>

          </div>
          <div class="margin-left-30"></div>
         <div class="margin-right-14 flex-1">
             <div class="flex-row">
                 <div><div class="c-2 f-16 bold ">{{item.coupon_name}}</div>
              <div class="f-12 c-1  margin-top-10">有效期至{{item.end_time_dateformat}}</div></div>
              <div class="flex-1"></div>
              <div class="f-12 c-w padding-left-14 padding-right-14 h-25 line-height-25 border-radius-12  bg-6 " @click="gouse(index)">{{item.yhstadius=='A'?'去使用':item.yhstadius=='B'?'已使用':'失效'}}</div>
             </div>
             <div class="flex-row flex-center margin-top-26">
                 <div class="c-1 f-12">使用规则</div>
                 <div class="flex-1"></div>
                 <img :src="page.uploadpath + 'resource/' + page.Res.xiajain" class="icon-12" @click="guize(index)" v-if="xzindex!=index+1"/>
                 <img :src="page.uploadpath + 'resource/' + page.Res.shanjian" class="icon-12" @click="guize(index)" v-else />
             </div>
         </div>
      </div>
      <!--  -->
      <div class="guize padding-15 bg-w margin-left-14 margin-right-14 margin-top-10" v-if="index+1==xzindex&&item.coupon_guize!=''">
          <p v-html="item.coupon_guize"></p>

      </div>

     </div>






     <div v-if="false">
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
     </div>



   



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
.guize{
    box-shadow: 0px 2px 14px 0px rgba(24, 144, 254, 0.12);
border-radius: 5px;
}


</style>