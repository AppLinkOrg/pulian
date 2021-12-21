<script setup>
import { ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { HttpHelper } from "../HttpHelper";
import { PageHelper } from "../PageHelper";
import wx from 'weixin-js-sdk';
import { Utils } from "../Utils";
// import { provide } from "@vue/composition-api";
// import NavBar from "../components/NavBar.vue";



// provide("title", "我是父组件向子组件传递的值"); 




let router = useRouter();
let route = useRoute();

let page = ref({});
PageHelper.Init(page, () => {});

var storedetail = ref({});

var current = ref(0);

let show =ref(false);
let fwshow=ref(0);

var fuwudetail=ref([]);
let fuwulist=ref({});
let evaluatelist=ref([]);



// 门店详情
var mylat= window.localStorage.getItem("lat");
var mylng= window.localStorage.getItem("lng");
// storedetail.distance


HttpHelper.Post("store/storedetail", { id: route.query.id,mylat,mylng }).then((res) => {
  res.distance2=Utils.GetMileTxt(res.distance)
  storedetail.value = res;

  fuwu();
});
// 轮播图改变时间
var onChange = (index) => {
  current.value = index;
};

// 抢购
var qiangou = (item) =>{
  fuwudetail.value=item


  show.value=true;
 
}

// 购买
var goumia=()=>{
   router.push('/Submitorder?id='+fuwudetail.value.id);
    console.log('寄哪里了---',fuwudetail,fuwudetail.id);

}

// 导航
var daohang=()=>{
  let latstor=storedetail.value.lat
let lngstor=storedetail.value.lng
let name=storedetail.value.address
// alert(latstor)
var json={latitude:latstor*1,
            longitude:lngstor*1,
            scale: 18,
            name};
           
           wx.getLocation({
  type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
  success: function (res) {
    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
    var speed = res.speed; // 速度，以米/每秒计
    var accuracy = res.accuracy; // 位置精度
            alert(JSON.stringify(res));
  },fail:function(res){
            alert("fail"+JSON.stringify(res));
  },complete:function(res){
            alert("complete"+JSON.stringify(res));
  }
           }
           );


// wx.miniProgram.navigateTo({url: '/pages/daohan/daohan?latstor='+latstor+'&lngstor='+lngstor+'&name='+name});



}

// 筛选服务
var dianj=(e)=>{
fwshow.value=e
fuwu()

}
// 服务
var fuwu=()=>{
  var bigcategory_id=storedetail.value.bigcategorylist[fwshow.value].id

  HttpHelper.Post('serviceprice/servicepricelist2',{store_id:route.query.id,bigcategory_id}).then((Res)=>{
    fuwulist.value=Res
})
}

// 门店评价
 HttpHelper.Post('evaluate/evaluatelist',{store_id:route.query.id,limit:"0,3"}).then((Res)=>{
    evaluatelist.value=Res
})



console.log(route.query.id, "router");
const onClickLeft = () => history.back();


</script>

<template>
  <div
    class=""
    v-if="page.Res!=null"
  >
  <!-- <NavBar></NavBar> -->

  <!-- <van-nav-bar
  title="门店详情"
  left-text="返回"
  left-arrow
  fixed
  @click-left="onClickLeft"
/> -->


    <!-- <div> -->
    <van-swipe
      :autoplay="3000"
      indicator-color="white"
      @change="onChange"
      :loop='false'
    >
      <van-swipe-item
        v-for="(item,index) in storedetail.imglist"
        :key="index"
        class="w-100 h-215"
      >
        <img
          :src="page.uploadpath + 'img/' + item.img"
          class="w-100 h-215"
        />
      </van-swipe-item>

    </van-swipe>
    <!-- </div> -->

    <div class="margin-top-f78"></div>

    <div
      class="margin-left-14 margin-right-14 bg-w border-radius-9"
      style="padding:14px 9px;position: relative;z-index:1"
    >
      <div class="flex-row ">
        <div>
          <div class="bold f-14 c-2 ">{{storedetail.name}}</div>
          <div class="margin-top-8 flex-row flex-center  ">
            <!-- <div
              v-for="item in 5"
              :key="item"
              class="margin-right-5 icon-13 "
            > -->
              <img
              v-for="item in 5"
              :key="item"
                :src="page.uploadpath + 'resource/' + page.Res.star1"
                class="icon-13 "
              />
              <!-- <img
              
                :src="page.uploadpath + 'resource/' + page.Res.star2"
                class="icon-13 "
              /> -->
            <!-- </div> -->

            <div class="f-13 bold c-3 margin-left-10">{{storedetail.score}}</div>
          </div>
          <div class="c-1 f-11 margin-top-10">{{storedetail.business_name}} {{storedetail.workinghours}}</div>
          <div class="flex-row flex-center margin-top-14 margin-bottom-9 ">
            <div class="h-17 padding-left-7 padding-right-7 bg-1 f-9 line-height-17">保养</div>
          </div>

        </div>
        <div class="flex-1"></div>
        <div>
          <img
          :src="page.uploadpath + 'resource/' + page.Res.shocaun"
          class="icon-21 "
        />
        <div class="c-1 margin-top-4 f-9">收藏</div>
        </div>
      </div>
      <div class="h-1 bg-2 margin-top-9 "></div>
      <div class="flex-row flex-center margin-top-14">
        <div>
          <div class="c-2 f-11 ">{{storedetail.address}}</div>
          <div class="c-1 f-11 margin-top-9">距离您{{storedetail.distance2}}，驾车约12分钟</div>
        </div>
        <div class="flex-1"></div>
        <div>
          <img
            :src="page.uploadpath + 'resource/' + page.Res.dianhua"
            class="icon-15 "
          />
          <div class="f-9 c-1 margin-top-5">电话</div>

        </div>
        <div class="margin-left-20" @click="daohang()">
          <img
            :src="page.uploadpath + 'resource/' + page.Res.	danhang"
            class="icon-15 "
          />
          <div class="f-9 c-1 margin-top-5">导航</div>

        </div>

      </div>

    </div>
    <!--门店服务  -->
    <div class="c-2 f-14 bold margin-top-20 margin-bottom-10 margin-left-14 ">门店服务</div>
    <!--  -->
    <div class="margin-left-14 margin-right-14 bg-w border-radius-9" style="padding:18px 9px 7px 9px">
      <div class="flex-row flex-center">
      
        <div  v-for="(item,index) in storedetail.bigcategorylist" :key="index" class="margin-right-20"  @click="dianj(index)">
          <div class="f-13 c-2 ">{{item.name}}</div>
          <div class="hen" :style="{'background':fwshow==index?'linear-gradient(-10deg, #409EFF, #67B0FD)':''}"></div>
        </div>
       
      </div>
    <div v-for="(item,index) in fuwulist" :key="index">
        <div class="margin-top-14 flex-row flex-center" >
        <div class="c-2 f-11 ">{{item.service_name}}</div>
        <div class="flex-1"></div>
         <!-- <div class="bd-1 border-radius-2 h-14 padding-right-4 padding-left-4 c-4 f-8 ">减免券¥10</div> -->
         <!-- <div class="c-4 f-9 margin-left-10">¥</div>
      <div class="c-4 f-13 ">{{item.presentprice}}</div>  -->
      <div class="f-7 c-2 margin-left-10 " style="text-align: center;">¥</div>
        <div class="f-9 c-2 " style="text-align: center;">{{item.originalprice}}</div>
</div>
<div class="flex-row flex-center margin-top-6">
<div class="c-1 f-9">已售 {{item.sell}}</div>
<div class="flex-1"></div>
<div class="h-19  padding-left-14 padding-right-14 c-w f-9  border-radius-9 bg-3 line-height-19" @click="qiangou(item)">抢购</div>
</div>
    </div>
      </div>
      <!--使用说明  -->
         <div class="c-2 f-14 bold margin-top-20 margin-bottom-10 margin-left-14 ">使用说明</div>
         <!--  -->
         <div  class="margin-left-14 margin-right-14 bg-w border-radius-9" style="padding:18px 9px 11px ">
           <div class="flex-row flex-center margin-left-32 margin-right-32">
             <div>
                <img
          :src="page.uploadpath + 'resource/' + page.Res.xiadan"
          class="icon-35 displat-block margin-auto"
        />
        <div class="margin-top-6 text-center c-1 f-11">在线下单</div>
             </div>
             <div class="flex-1 h-1 bg-2"> </div>
               <div>
                <img
          :src="page.uploadpath + 'resource/' + page.Res.daodian"
          class="icon-35 displat-block margin-auto"
        />
        <div class="margin-top-6 text-center c-1 f-11">到店使用</div>
             </div>
             <div class="flex-1 h-1 bg-2"> </div>
               <div>
                <img
          :src="page.uploadpath + 'resource/' + page.Res.saoma"
          class="icon-35 displat-block margin-auto"
        />
        <div class="margin-top-6 text-center c-1 f-11">扫码服务</div>
             </div>
           </div>
           <div class="flex-row flex-center bg-4 margin-top-20" style="padding:6px 10px">
<img
          :src="page.uploadpath + 'resource/' + page.Res.tishi"
          class="icon-17"
        />
        <div class="margin-left-10 c-2 f-8 border-radius-5">温馨提示：到店请出示订单中的二维码，代金券及订单号码等不能作为 消费凭证。</div>
           </div>

         </div>

         <!--门店评价  -->
          <div class="c-2 f-14 bold margin-top-20 margin-bottom-10 margin-left-14 ">门店评价</div>
          <!--  -->
      <div class="margin-left-14 margin-right-14 bg-w border-radius-9" style="padding:18px 9px 0px ">
            <div   v-for="(item,index) in evaluatelist" :key="index">
            <div class="flex-row margin-bottom-18">
              <img
          :src="item.member_avatarUrl"
          class="icon-28 border-radius-50"
        />
        <div class="margin-left-6">
          <div class="f-11 c-2">{{item.member_nickName}}</div>
          <div class="margin-top-4"></div>
    <div class="flex-row ">
            <div   v-for="items in 5" :key="items"  class="icon-13 " >
   <img
            v-if="item.dianping*1>=items"
              
                :src="page.uploadpath + 'resource/' + page.Res.star2"
                class="icon-13 "
              />
                 <img
          v-else
        
                :src="page.uploadpath + 'resource/' + page.Res.star1"
                class="icon-13 "
              />
          </div>
    </div>
       
              <div class="margin-top-9 c-1 f-11">{{item.neirong==''?'没评价':item.neirong}}</div>
              <div class="margin-top-9"></div>
               <img
                :src="page.uploadpath + 'resource/' + page.Res.dianpu"
                class="icon-78 "
              />
              <div class="c-1 f-8 margin-top-9">{{item.service_name}}</div>

        </div>
        <div class="flex-1"></div>
        <div class="c-1 f-9">{{item.time}}</div>
              
            </div>
      </div>
          
  <div class="h-1 bg-2"></div>
            <div class="center h-44 line-height-44 f-11">查看全部评论（90）</div>
          </div>
   
          
         

            

          <!--  附近更多-->
           <div class="c-2 f-14 bold margin-top-20 margin-bottom-10 margin-left-14 ">附近更多</div>
           <!--  -->
           <div class="margin-left-14 margin-right-14">
           <div class="flex-row " style="display: flex;display: -webkit-flex;justify-content: space-between;flex-direction: row;flex-wrap: wrap;">
             <div class="bg-w border-radius-9">
               <img
          :src="page.uploadpath + 'resource/' + page.Res.dianpu"
          class="dianpu"
        />
        <div class="margin-left-10 margin-right-10 margin-bottom-10">
        <div class="flex-row flex-center margin-top-9  ">
          <div class="bold c-2 f-12 ">商户名称</div>
          <div class="flex-1"></div>
          <div class="c-1 f-9">3.20km</div>
        </div>
        <div class="c-1 f-9 margin-top-9">标准洗车</div>
        <div class="flex-row flex-center margin-top-9" >
          <div class="bd-1 border-radius-2 h-14 padding-right-4 padding-left-4 c-4 f-8 ">减免券¥10</div>
         <div class="c-4 f-9 margin-left-10">¥</div>
      <div class="c-4 f-13 ">30</div> 
      <div class="f-7 c-2 margin-left-10 " style="text-align: center;">¥</div>
        <div class="f-9 c-2 " style="text-align: center;">40</div>

        </div>

        </div>

             </div>
           </div>
           </div>
           <!--  -->
           <div class="margin-top-30"></div>

    <!-- 弹出信息 -->

<van-popup  v-model:show="show" position="bottom" :style="{ height: '60vh' }" round >

  <div class="margin-left-14" style="overflow: scroll;height:100%;position: relative;" >
  <div class=" f-15 bold c-2 margin-top-20">{{fuwudetail.service_name}}</div>
  <div class="flex-row flex-center margin-top-10">
     <img  :src="page.uploadpath + 'resource/' + page.Res.dui" class="icon-11" />
     <div class="c-1 f-9 margin-left-4">未消费，随时退</div>
      <img  :src="page.uploadpath + 'resource/' + page.Res.dui" class="icon-11 margin-left-10" />
      <div class="c-1 f-9 margin-left-4">过期退</div>

  </div>
  <div class="h-1 bg-2 margin-top-14 "></div>
  <div class="flex-row flex-center margin-top-14 margin-bottom-14 margin-right-14">
<div>
  <div class="f-13 bold c-2">{{storedetail.name}}</div>
  <div class="margin-top-4 c-1 f-9 ">{{storedetail.address}}</div>

</div>
<div class="flex-1"></div>
  <img  :src="page.uploadpath + 'resource/' + page.Res.danhang" class="icon-11" />
  <div class="margin-left-4 c-1 f-9">1.3km</div>
  </div>
    <div class="h-1 bg-2"></div>
    <div class=" f-15 bold c-2 margin-top-20">店铺券</div>
  <div class="margin-top-9 margin-bottom-9">
      <div class="zhuan flex-row flex-center" :style="{
              backgroundImage:
                'url(' + page.uploadpath + 'resource/' + page.Res.juan + ')',
            }"  style="background-size:100% ">
             <div class="flex-1"></div>
            <div>
              
              <div class="flex-row flex-center">
                <div class="flex-1"></div>
                <div class="f-8 c-5">¥</div>
                <div class="c-5 f-15">3</div>
                 <div class="flex-1"></div>
              </div>
              <div class="margin-top-6 c-1 f-8">满30可用</div>

            </div>
          
            <div class="margin-left-10">
              <div class="c-2 f-11 bold">店铺红包</div>
              <div class="margin-top-6 c-1 f-9 ">至2021.12.09到期</div>
            </div>
        <div class="flex-1"></div>
 <img  :src="page.uploadpath + 'resource/' + page.Res.quan" class="icon-15 " />
 <div class="flex-1"></div>
            </div>
  </div>

  <div class=" f-15 bold c-2 margin-top-20">代金券</div>

    <div class="margin-top-9 margin-bottom-9">
      <div class="zhuan flex-row flex-center" :style="{
              backgroundImage:
                'url(' + page.uploadpath + 'resource/' + page.Res.daijin + ')',
            }"  style="background-size:100% ">
             <div class="flex-1"></div>
            <div>
              
              <div class="flex-row flex-center">
                <div class="flex-1"></div>
                <div class="f-16 c-3">7</div>
                <div class="f-10 c-3">元</div>
                <div class="c-3 f-12">×</div>
                <div class="f-16 c-3">2</div>
                <div class="f-10 c-3">张</div>
                 <div class="flex-1"></div>
              </div>
              <div class="margin-top-6 c-1 f-9">无门槛</div>

            </div>
          
            <div class="margin-left-10">
              <div class="c-2 f-11 bold">标准洗车券</div>
              <div class="flex-row margin-top-9 flex-center">
                <div class="f-10 c-5 ">¥</div>
                <div class="f-14 c-5">10</div>
              </div>
            </div>
        <div class="flex-1"></div>
<div class="h-19  padding-left-14 padding-right-14 c-w f-9 bg-5 border-radius-9  line-height-19" >抢购</div>
 <div class="flex-1"></div>
            </div>
  </div>


  <div class="h-56"></div>
 <div class="position-bottom">
     <div class="h-1 bg-2 margin-right-14 margin-left-14"></div>
    <div class="flex-row flex-center h-56 margin-right-14 margin-left-14">
    <div>
      <div class="flex-row flex-center">
        <div class="f-12 c-5 ">¥</div>
        <div class="f-18 c-5">{{fuwudetail.originalprice}}</div>
      </div>
      <div class="c-1 f-12 margin-top-4">{{fuwudetail.service_name}}</div>
    </div>
    <div class="flex-1"></div>
    <div class="h-38 bg-5 c-w f-15 line-height-38 padding-left-36 padding-right-36 border-radius-19 "  @click="goumia">立即购买</div>
  </div>
 </div>





</div>

</van-popup>

  </div>
</template>
<style scoped>
.zhuan{
  width: 218px;
  height: 63px;
  
}
.custom-indicator {
  position: absolute;

  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}

/deep/ .van-swipe__indicators {
  bottom: 90px;
}
/deep/ .van-swipe__indicator--active {
  margin-top: 2px;
  width: 14px;
  height: 4px;
  border-radius: 2px;
}
.hen{
  width: 19px;
height: 4px;

border-radius: 2px;
margin:5px auto 0;
}
.dianpu{
  width: 157px;
  height: 98px;
}
</style>