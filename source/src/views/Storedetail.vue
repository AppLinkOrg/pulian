<script setup>
import { ref } from "@vue/reactivity";
import { Toast } from "vant";
import { useRouter, useRoute } from "vue-router";
import { HttpHelper } from "../HttpHelper";
import { PageHelper } from "../PageHelper";
import { Utils } from "../Utils";
// import { provide } from "@vue/composition-api";
// import NavBar from "../components/NavBar.vue";



// provide("title", "我是父组件向子组件传递的值"); 




let router = useRouter();
let route = useRoute();

let page = ref({});
PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});

var storedetail = ref(null);

var current = ref(0);

let show =ref(false);
let fwshow=ref(0);

var fuwudetail=ref([]);
let fuwulist=ref({});
let evaluatelist=ref([]);



// 门店详情
var mylat= window.localStorage.getItem("latitude");
var mylng= window.localStorage.getItem("longitude");
// storedetail.distance


var xqmendian=()=>{
  HttpHelper.Post("store/storedetail", { id: route.query.id,mylat,mylng }).then((res) => {
  res.distance2=Utils.GetMileTxt(res.distance)
  storedetail.value = res;

  fuwu();
  daijin();
  filtratestore();
});
}

xqmendian()
// 轮播图改变时间
var onChange = (index) => {
  current.value = index;
};

// 抢购
var qiangou = (item) =>{
  PageHelper.LoginAuth(page, () => {
       // 判断用户是否授权微信
  let viewer = window.navigator.userAgent.toLowerCase();

if (viewer.match(/MicroMessenger/i) == "micromessenger") {
  wx.miniProgram.getEnv((resrnv) => {

      if (resrnv.miniprogram) {
     if (page.value.Memberinfo.touxiang !='B') {
       
   
         wx.miniProgram.navigateTo({url: '/pages/login/login?type=A'});
         return
}
		// alert(page.value.Memberinfo.shoujisq)
   if (page.value.Memberinfo.shoujisq !='B' && page.value.Memberinfo.touxiang =='B') {

         wx.miniProgram.navigateTo({url: '/pages/login/login?type=B'});
         return
}
      }else{

      }


  })
  
  
  }




  fuwudetail.value=item


  show.value=true;

yhlist(item);

  zuihou();

  });
  




 
}

// 优惠券列表

var yhlist=(item)=>{
  var bigcategory_id=storedetail.value.bigcategorylist[fwshow.value].id
var buji=storedetail.value.bigcategorylist[fwshow.value].buji
if (buji=='Y') {
  var serviceitem_id=item.service_id
}

   HttpHelper.Post('coupon/couponlist',{store_id:route.query.id,bigcategory_id,buji,service_id:serviceitem_id}).then((Res)=>{
     for (let index = 0; index < Res.length; index++) {
        Res[index].show = false;
       
     }
    couponlist.value=Res
})


 HttpHelper.Post('coupon/mycoupon',{store_id:route.query.id,bigcategory_id,buji,service_id:serviceitem_id}).then((Res)=>{
    //  for (let index = 0; index < Res.length; index++) {
    //     Res[index].show = false;
       
    //  }
    mycouponlist.value=Res
})



}

// 购买
var goumia=()=>{
  console.log(couponlist_item.value,'couponlist_id');

// myselect.value==0 选择不是自己的优惠券
  if (myselect.value==0) {
     if (couponlist_item.value !=null) {
      router.push('/Submitorder?id='+fuwudetail.value.id+'&couponlist_id='+couponlist_item.value.id+'&type=A');
  }else{
     router.push('/Submitorder?id='+fuwudetail.value.id+'&couponlist_id='+0+'&type=A');
  }
  }else{
    // 选择自己的优惠券
 
 router.push('/Submitorder?id='+fuwudetail.value.id+'&couponlist_id='+mycouponlist_item.value.id+'&type=B');
  }
 
 
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
           
PageHelper.loadwechatconfig(()=>{
  // alert("loadwechatconfig");
  wx.openLocation(json);
});


// wx.miniProgram.navigateTo({url: '/pages/daohan/daohan?latstor='+latstor+'&lngstor='+lngstor+'&name='+name});



}

// 筛选服务
var dianj=(e)=>{
fwshow.value=e
fuwu()
daijin()

}
let fuwuxian=ref({})
// 服务
var fuwu=()=>{
  var bigcategory_id=storedetail.value.bigcategorylist[fwshow.value].id
  fuwuxian.value=storedetail.value.bigcategorylist[fwshow.value]

  HttpHelper.Post('serviceprice/servicepricelist2',{store_id:route.query.id,bigcategory_id}).then((Res)=>{
    fuwulist.value=Res
})
}

// 门店评价
 HttpHelper.Post('evaluate/evaluatelist',{store_id:route.query.id,limit:"0,3",srouce:'A'}).then((Res)=>{
    evaluatelist.value=Res
})


// 代金卷  
let couponlist=ref([]);
let mycouponlist=ref([]);
var daijin=()=>{
  var bigcategory_id=storedetail.value.bigcategorylist[fwshow.value].id
var buji=storedetail.value.bigcategorylist[fwshow.value].buji

   HttpHelper.Post('coupon/couponlist',{store_id:route.query.id,bigcategory_id,buji}).then((Res)=>{
     for (let index = 0; index < Res.length; index++) {
        Res[index].show = false;
       
     }
    couponlist.value=Res
})

  HttpHelper.Post('coupon/mycoupon',{store_id:route.query.id,bigcategory_id,buji}).then((Res)=>{
    //  for (let index = 0; index < Res.length; index++) {
    //     Res[index].show = false;
       
    //  }
    mycouponlist.value=Res
})

}

// xuanze 选择那种优惠卷
let couponlist_item=ref(null);
var xuanze=(index)=>{
  // var couponlistdd=couponlist.value[index]

  // 判断满减数目是否达标
  if (couponlist.value[index].manmoney>fuwudetail.value.originalprice) {
    Toast('满减价格为满足')
    return
  }else{

  }
  
  if (couponlist.value[index].show==false) {
       for(let item of couponlist.value){
item.show=false
    }
    couponlist.value[index].show=true
    couponlist_item.value=couponlist.value[index]
 
  }else{
couponlist.value[index].show=false
couponlist_item.value=null
  }
  myselect.value=0
zuihou()
}

// 最后的价钱计算
let totleprice=ref(0);
var zuihou=()=>{
  console.log('进来哦了',couponlist_item);
  var fuwudetail_price=fuwudetail.value.originalprice;

  if (couponlist_item.value!=null) {
    if(couponlist_item.value.type=='A'){
      // 立减券
     fuwudetail_price=fuwudetail_price-couponlist_item.value.jainshao+couponlist_item.value.price*1

    }
    if(couponlist_item.value.type=='B'){
      // 抵扣券
      //  fuwudetail_price=fuwudetail_price*couponlist_item.value.zhekou*0.01
        fuwudetail_price=fuwudetail_price-couponlist_item.value.jainshao+couponlist_item.value.price*1

    }
    if(couponlist_item.value.type=='C'){
fuwudetail_price=couponlist_item.value.price
    }
    
  }
   
 
 fuwudetail_price=fuwudetail_price*1


//  if (fuwudetail_price.value>=0) {
    
//  }else{

//  }

totleprice.value=fuwudetail_price.toFixed(2);
 


 console.log(fuwudetail_price,'fuwudetail_price');


}
// 最后的价钱计算2
var zuihou2=()=>{
  console.log('进来哦了',couponlist_item);
  var fuwudetail_price=fuwudetail.value.originalprice;

  if (mycouponlist_item.value!=null) {
    if(mycouponlist_item.value.type=='A'){
      // 立减券
     fuwudetail_price=fuwudetail_price-mycouponlist_item.value.jainshao

    }
    if(mycouponlist_item.value.type=='B'){
      // 抵扣券
      //  fuwudetail_price=fuwudetail_price*mycouponlist_item.value.zhekou*0.01
 fuwudetail_price=fuwudetail_price-mycouponlist_item.value.jainshao
    }
    if(mycouponlist_item.value.type=='C'){
fuwudetail_price=0
    }
    
  }
 fuwudetail_price=fuwudetail_price*1

  totleprice.value=fuwudetail_price.toFixed(2);

}
// mydiandan 选择的自己购买的订单
let myselect=ref(0)
let mycouponlist_item=ref(0)
var mydiandan=(e)=>{

  // 判断满减数目是否达标
  if (mycouponlist.value[e].manmoney>fuwudetail.value.originalprice) {
    Toast('满减价格为满足')
    return
  }else{

  }


  for(let item of couponlist.value){
    item.show=false
  }
  if (myselect.value==e+1) {
     myselect.value=0
      mycouponlist_item.value=null
  }else{
    myselect.value=e+1
     mycouponlist_item.value=mycouponlist.value[e]
  }
 

zuihou2()
 
  

}

// 收藏列表
let collectionpd=ref(0);
var shoucan=()=>{
  HttpHelper.Post('collection/collectionpd',{stoer_id:route.query.id}).then((Res)=>{
    if (Res.code==0) {
      collectionpd.value=Res.result
    }else{
      Toast('获取收藏信息失败')
    }
})
}
shoucan();

// shocuan 点击收藏
var shocuan=()=>{
HttpHelper.Post('collection/collectionadd',{store_id:route.query.id}).then((res)=>{
  if(res==1){
Toast('收藏成功');


  }else{
Toast('取消收藏');
  }
  shoucan();
    
})
}

// dianhua 
var dianhua=()=>{
   var phoneNumber=storedetail.value.phone
   if (phoneNumber.length>0) {
      window.location.href = 'tel://' + phoneNumber
    
   }else{
 Toast('门店联系方式不正确')
   }
    
}

// 附近更多
var service_id=ref(0);
let storelist=ref([])

service_id.value=route.query.service_id

var filtratestore = () => {


  var mylat= window.localStorage.getItem("latitude");
var mylng= window.localStorage.getItem("longitude");

var storedetail_city_id=storedetail.value.city_id

console.log(storedetail_city_id,'storedetail_city_id');

   HttpHelper.Post("store/filtrate2", { 
   service_id:service_id.value,mylat,mylng,seq:4,storeid:route.query.id,storedetail_city_id:storedetail_city_id
   }).then((res) => {
     for(let item of res){
       item.distance2=Utils.GetMileTxt(item.distance)
       item.originalprice=parseFloat(item.originalprice)
item.coupon_jainshao=parseFloat(item.coupon_jainshao)
     }
     
    storelist.value = res;
   });
};



// mendian 点击附近更多
var mendian=(index)=>{

  // let newUrl=router.resolve({
  //   path:"/storedetail",
  //   query:{
  //     id:index,
  //     service_id:route.query.service_id
  //   }
  // })

  // window.open(newUrl.href,'_blank')
 
// window.open("/storedetail?id="+index+'&service_id='+route.query.service_id)

   router.push("/storedetail?id="+index+'&service_id='+route.query.service_id);
  //    router.push("/storedetail?id="+index+'&service_id='+route.query.service_id);
    

    let timer = setTimeout(() => {
     //需要定时执行的代码
     router.go(0)
    
},100)


  //  filtratestore()
  //  xqmendian()
}



// chakanall 查看全部评价
var chakanall=()=>{
  // console.log(route.query.id,'id');
  router.push('/genneralevalut?id='+route.query.id);
}


</script>

<template>
  <div
    class=""
    v-if="storedetail!=null && page.Res!=null "
  >
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
            <div class="icon-13 "  v-for="item in 5"
              :key="item">
              
               <img
             v-if="storedetail.score<item"
                :src="page.uploadpath + 'resource/' + page.Res.star1"
                class="icon-13 "
              />
              <img
              v-else
              
                :src="page.uploadpath + 'resource/' + page.Res.star2"
                class="icon-13 "
              />
         


              </div>
             

            <div class="f-13 bold c-3 margin-left-10">{{storedetail.score}}</div>
          </div>
          <div class="c-1 f-11 margin-top-10">{{storedetail.business_name}} {{storedetail.workinghours}}</div>
   

            <div class="flex-row flex-center margin-top-14 margin-bottom-9 " v-if="storedetail.biaoqianlist.length>0  ">
            <div class="h-17 padding-left-7 padding-right-7 bg-1 f-9 line-height-17 margin-right-10" v-for="(item,index) in storedetail.biaoqianlist" :key="index">{{item}}</div>
          </div>
    

        </div>
        <div class="flex-1"></div>
        <div>
          <!-- <img
          :src="page.uploadpath + 'resource/' + page.Res.shocaun"
          class="icon-21 "
        /> -->
        <van-icon name="like-o" color="#1989fa" size="20px" v-if="collectionpd==0"  @click="shocuan"/>
        <van-icon name="like" color="red" size="20px" v-else  @click="shocuan"/>
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
        <div @click="dianhua">
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
      <div class="flex-row flex-center"  style="overflow: scroll;">
      
        <div  v-for="(item,index) in storedetail.bigcategorylist" :key="index" class="margin-right-20"  @click="dianj(index)" style="flex:none">
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
      <div class="margin-left-14 margin-right-14 bg-w border-radius-9" style="padding:18px 9px 0px "  v-if="evaluatelist.length>0">
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
               v-for="(items,indexs) in item.imglist" :key="indexs"
                :src="page.uploadpath + 'picture/' + items.img"
                class="icon-78 margin-right-10"
              />
              <div class="c-1 f-8 margin-top-9">{{item.service_name}}</div>

        </div>
        <div class="flex-1"></div>
        <div class="c-1 f-9">{{item.time}}</div>
              
            </div>
      </div>
          
  <div class="h-1 bg-2"></div>
            <div class="center h-44 line-height-44 f-11" @click="chakanall">查看全部评论</div>
          </div>

          <div class="margin-left-14 margin-right-14 bg-w border-radius-9" style="padding:18px 9px 0px "  v-else>
              <div class="center h-44 line-height-44 f-11">暂无评价</div>
          </div>
   
          
         

            

          <!--  附近更多-->
           <div class="c-2 f-14 bold margin-top-20 margin-bottom-10 margin-left-14 ">附近更多</div>
           <!--  -->
           <div class="margin-left-14 margin-right-14">
           <div class="flex-row " style="display: flex;display: -webkit-flex;justify-content: space-between;flex-direction: row;flex-wrap: wrap;">
             <div class="bg-w border-radius-9  margin-bottom-20" v-for="(item,index) in storelist" :key="index"  @click="mendian(item.id)">
               <van-image
  fit="cover"
 :src="page.uploadpath + 'store/' + item.tupian"
    class="dianpu img-border"
/>
               <!-- <img
          :src="page.uploadpath + 'store/' + item.tupian"
          class="dianpu img-border"
        /> -->
        <div class="margin-left-10 margin-right-10 margin-bottom-10">
        <div class="flex-row flex-center margin-top-9  ">
          <div class="bold c-2 f-12 w-100p"  style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">{{item.name}}</div>
          <div class="flex-1"></div>
          <div class="c-1 f-9">{{item.distance2}}</div>
        </div>
        <div class="c-1 f-9 margin-top-9">{{item.service_name}}</div>
        <div class="flex-row flex-center margin-top-9" >
            <!-- <div class="bd-1 border-radius-2 h-14 padding-right-4 padding-left-4 c-4 f-8 " v-if="item.coupon_type=='C'" >减免券¥{{item.originalprice}}</div>
             <div class="flex-1" v-if="item.coupon_type==''"></div>
          <div class="bd-1 border-radius-2 h-14 padding-right-4 padding-left-4 c-4 f-8 "  v-if="item.coupon_type!=''&&item.coupon_type!='C' ">减免券¥{{item.coupon_jainshao}}</div>
         
         <div class="c-4 f-9 margin-left-10" v-if="item.coupon_type!=''">¥</div>
      <div class="c-4 f-13 " v-if="item.coupon_type=='C'">0</div> 
      <div class="c-4 f-13 " v-if="item.coupon_type!='C'&& item.coupon_type!=''">{{item.originalprice-item.coupon_jainshao}}</div>  -->

      <div class="flex-1"></div>
      <div class="f-7 c-2 margin-left-10 "  :style="{'text-decoration':item.coupon_type!='line-through'?'':''}">¥</div>
        <div class="f-9 c-2 " :style="{'text-decoration':item.coupon_type!='line-through'?'':''}">{{item.originalprice}}</div>

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
  <div class="margin-left-4 c-1 f-9">{{storedetail.distance2}}</div>
  </div>
    <div class="h-1 bg-2"></div>
    <div class=" f-15 bold c-2 margin-top-20">{{fuwuxian.buji=='Y'?'补给券':'代金券'}}</div>
  <div class="margin-top-9 margin-bottom-9 flex-row " style="overflow: scroll;">
      <div class="zhuan flex-row flex-center" :style="{
              backgroundImage:
                'url(' + page.uploadpath + 'resource/' + page.Res.daijin + ')',
            }"  style="background-size:100% ; position: relative;flex:none;background-repeat:no-repeat"  v-for="(item,index) in couponlist" :key="index"  @click="xuanze(index)">

            <div class="position-top2 liji center c-w f-9 "  :style="{
              backgroundImage:
                'url(' + page.uploadpath + 'resource/' + page.Res.ligou + ')',
            }" style="background-size:100%;background-repeat:no-repeat; "   >立购可减</div>

             <!-- <div class="flex-1"></div> -->
              <div class="margin-left-10"></div>
            <!-- <div >
              
              <div class="flex-row flex-center">
                <div class="flex-1"></div>
                <div class="f-8 c-5">¥</div>
                <div class="c-5 f-15">3</div>
                 <div class="flex-1"></div>
              </div>
              <div class="margin-top-6 c-1 f-8">满30可用</div>

            </div> -->
           <div>
               <div class="flex-row flex-center">
                <div class="flex-1"></div>
                <div class="f-16 c-3"  v-if="item.jainshao>0">{{item.jainshao}}</div>
                <div class="f-10 c-3" v-if="item.jainshao>0">元</div>
                <div class="c-3 f-12" v-if="item.jainshao>0">×</div>
               
                <div class="f-16 c-3">{{item.shangping}}</div>
                <div class="f-10 c-3">张</div>
                 <div class="flex-1"></div>
              </div>

              
              
              <div class="margin-top-6 c-1 f-9"  v-if="item.type=='C'">无门槛</div>
              <div class="margin-top-6 c-1 f-9" v-else>满{{item.manmoney}}减{{item.jainshao}}</div>
           </div>
            <div class="margin-left-10" v-if="item.jainshao==0"></div>
             <div class="margin-left-10" v-if="item.jainshao==0"></div>
           <div class="margin-left-10"></div>
            <div class="margin-left-10">
              <div class="c-2 f-11 bold">{{item.name}}</div>
              <div class="f-14 c-5">
                <a class="f-9 c-5">¥</a>
                {{item.price}}
              </div>
              <div class="margin-top-6 c-1 f-9 ">即购日启有效期{{item.youxiao}}天</div>
            </div>
        <div class="flex-1"></div>
 <img  :src="page.uploadpath + 'resource/' + page.Res.quan" class="icon-15 "  v-if="item.show==false" />
 <img  :src="page.uploadpath + 'resource/' + page.Res.wanchegn" class="icon-15 " v-else />
 
 <div class="flex-1"></div>
            </div>
  </div>

  <div class=" f-15 bold c-2 margin-top-20">我的券</div>

    <div class="margin-top-9 margin-bottom-9 flex-row "  style="overflow: scroll;">
      <div class="zhuan flex-row flex-center" :style="{
              backgroundImage:
                'url(' + page.uploadpath + 'resource/' + page.Res.juan + ')',
            }"  style="background-size:100%;background-repeat:no-repeat;flex:none "   v-for="(item,index) in mycouponlist"  :key="index" @click="mydiandan(index)">
             <div class="flex-1"></div>
            <div>
              
              <!-- <div class="flex-row flex-center">
                <div class="flex-1"></div>
                <div class="f-16 c-3">7</div>
                <div class="f-10 c-3">元</div>
                <div class="c-3 f-12">×</div>
                <div class="f-16 c-3">2</div>
                <div class="f-10 c-3">张</div>
                 <div class="flex-1"></div>
              </div> -->
              <div class="flex-row flex-center">
                <div class="flex-1"></div>
                
                <div class="c-5 f-16"  v-if="item.type=='C'"> 兑换</div>
                <div class="flex-row"  v-else>
                  <div class="c-5 f-9">¥</div>
              <div class="c-5 f-16" >{{item.jainshao}}</div>
                </div>
                <!-- <div class="flex-row"  v-else>
         
              <div class="c-5 f-16" >{{item.zhekou}}%</div>
                </div> -->
                
                 
                 <div class="flex-1"></div>
              </div>
               <div class="margin-top-6 c-1 f-9" v-if="item.type=='C'">无门槛</div>
              <div class="margin-top-6 c-1 f-9" v-else>满{{item.manmoney}}可用</div>
             

            </div>
          
            <div class="margin-left-10">
              <div class="c-2 f-11 bold">{{item.coupon_name}}</div>
              <!-- <div class="flex-row margin-top-9 flex-center">
                <div class="f-10 c-5 ">¥</div>
                <div class="f-14 c-5">10</div>
              </div> -->
              <div class="c-1 f-10  margin-top-9">有效期至{{item.end_time_dateformat}}到期</div>
            </div>
            <img  :src="page.uploadpath + 'resource/' + page.Res.quan" class="icon-15 "  v-if="index+1 !=myselect " />
             <img  :src="page.uploadpath + 'resource/' + page.Res.wanchegn" class="icon-15 " v-else />
        <div class="flex-1"></div>

 <!-- <img  :src="page.uploadpath + 'resource/' + page.Res.wanchegn" class="icon-15 " /> -->


            </div>
  </div>


  <div class="h-56"></div>
 <div class="position-bottom">
     <div class="h-1 bg-2 margin-right-14 margin-left-14"></div>
    <div class="flex-row flex-center h-56 margin-right-14 margin-left-14">
    <div>
      <div class="flex-row flex-center">
        <div class="f-12 c-5 ">¥</div>
        <div class="f-18 c-5">{{totleprice}}</div>
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
  height: 70px;
  
}
.custom-indicator {
  position: absolute;

  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
.img-border{
  border-radius: 9px 9px 0  0 ;
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
  width: 167px;
  height: 98px;
}
/deep/ .dianpu img{
    border-radius: 9px 9px 0  0 ;
}
.liji{
  /* width: 45px; */
  padding: 5px;
  /* height: 16px; */
}
</style>