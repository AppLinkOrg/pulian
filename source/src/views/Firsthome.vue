<script setup>
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { ref, reactive } from "vue";
import { Utils } from "../Utils";
import { NModal } from "naive-ui";
import { useRouter,useRoute } from "vue-router";
import Tar from "../components/Tar.vue";
import { Toast } from "vant";
import  store  from "../State";


let router = useRouter();
let route = useRoute();
let page = ref({});
let data = ref({});
let showVideo = ref(false);

var indexbanner1 = ref({});
var anniulist = ref([]);
var servicelist = ref([]);
var storelist = ref([]);



PageHelper.Init(page, () => {});

// 轮播图
HttpHelper.Post("inst/indexbanner", {}).then((indexbanner) => {
  console.log("进来了");
  console.log(indexbanner);
  indexbanner1.value = indexbanner;
});
// 按钮图片
// store/allcategory
// anniu/anniulist
var allcategory=ref({})
HttpHelper.Post("store/allcategory", {tuiguan:'Y'}).then((res) => {
    for(let items of res){
items.type='B'
    }
 


  HttpHelper.Post("anniu/anniulist", {}).then((resss) => { 
  // allcategory.value = res;

  for(let item of resss){
    item.type='A'
res.push(item)
  }

   anniulist.value = res;


});

});


// 首页中部广告列表
let guangaolist=ref([])
HttpHelper.Post("guangao/guangaolist",{}).then((Res)=>{
  guangaolist.value=Res
})



// 服务列表
HttpHelper.Post("service/servicelist", {}).then((res) => {
  servicelist.value = res;

  filtratestore(store.state.biaoindex)
});

// 门店列表
// HttpHelper.Post("store/storelist", {}).then((res) => {
//   storelist.value = res;
// });
 
console.log("进来了");
console.log(indexbanner1);
var diaozhuan = (item) => {
  router.push(item);
  router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
  });
};
// 跳转店铺详情页
var dianpu = (index) => {
  // '/storedetail?id=1'
  router.push("/storedetail?id=" + index+'&service_id='+service_id.value);
};

let member_id=ref(null)
member_id.value=route.query.member_id
// route.query.openid
// owMBk5ZESuUrZUEPnfrbtj-jsVdM
if (route.query.openid!=undefined && route.query.openid!='') {
   window.localStorage.setItem("token",route.query.openid);
}



  
 let memberinfo=ref({});
PageHelper.LoginAuth(page, () => {});

var service_id=ref("");
let showsele=ref(0);
var filtratestore = (index) => {
  store.changebiaoindex(index)

  var id=servicelist.value[index].id
  showsele.value=index

  service_id.value=id; 

  var mylat= window.localStorage.getItem("latitude");
var mylng= window.localStorage.getItem("longitude");
var cityid=store.state.cityid

   HttpHelper.Post("store/filtrate", { 
   service_id:service_id.value,mylat,mylng,cityid
   }).then((res) => {
     for(let item of res){
       item.distance2=Utils.GetMileTxt(item.distance)

     }
     
    storelist.value = res;
   });
};


// tiaozhaun 首页按钮跳转
var tiaozhaun=(url)=>{
  if (url=='') {
    // Toast('暂未开放')
    return
  }
router.push(url)
}

var tostorelist=(id)=>{ 
router.push("/storelist?bigcategory_id="+id);
}


var tiao=(index)=>{
  var item=anniulist.value[index]
  if (item.type=='B') {
    router.push("/storelist?bigcategory_id="+item.id+'&bigcategory_name='+item.name);
  }

   if (item.type=='A') {
     
router.push(item.url)
   }

}

var chefu=()=>{
  router.push('/ceshi')
}

// tiaozhaun 推广页跳转路径
var newtiao=(index)=>{
  var url=guangaolist.value[index].url
  if (url=='') {
    return
  }
  router.push(url)

}

 // 设置默认车辆
  let mycarlist=ref(null)
HttpHelper.Post("member/mycarlist",{isdefault:'Y'}).then((res)=>{
if(res.length>0){
mycarlist.value=res[0]
}
})

// chengshi 城市跳转
var chengshi=()=>{
  router.push('/city')
}


var che=()=>{
  router.push('/garage')
}
var addmycar = () => {  

   HttpHelper.Post("member/mycarlist", {
 
}).then((res) => {
if (res.length>0) {
      router.push("/editvegicle?first=A");
    }else{
router.push("/editvegicle?first=B");
    }
});

  // router.push("/editvegicle");
};
</script>

<template >
  <div v-if="page.Res != null" class="big-bg">
    <!--  -->
    <!-- <img
      :src="page.uploadpath + 'resource/' + page.Res.sybg"
      style="width: 100%"
    /> -->
    <div class="h-170" :style="{'background-image':'url'+'('+page.uploadpath+'resource/'+page.Res.sybg+')'}" style="background-size:100% 100%; ">
 
    </div>
    <!-- <div class="margin-top-f95"></div> -->
    <div class="margin-top-f170"></div>

       <div class="flex-row flex-center margin-left-14 margin-right-14 h-min-50 margin-bottom-20">
<div class="flex-row flex-center" @click="chengshi()" >

<!-- <div class="c-w f-15 bold  " v-if="page.Memberinfo ==null&& store.state.cityname==''&& page.Inst.cities_city=='' ">未获取到位置</div> -->
  <!-- <div class="c-w f-15 bold " v-else>{{store.state.cityname==''? page.Memberinfo.city_id_name:store.state.cityname}}</div> -->

  <div class="c-w f-15 bold " v-if="page.Memberinfo !=null && page.Inst !=null">{{store.state.cityname!=''? store.state.cityname:page.Memberinfo.city_id_name==''? page.Inst.cities_city:page.Memberinfo.city_id_name}}</div>
 <img
      :src="page.uploadpath + 'resource/' + page.Res.	xiala"
      class="icon-12 margin-left-4"
    />
</div>
      <div class="flex-1"></div>

      <div style="flex:none"  v-if="mycarlist!=null"  @click="che">
         <div class="flex-row flex-center margin-left-24 padding-top-20" >
    <img :src="mycarlist.carbrand_logo" class="w-35" />
    <div class="margin-left-10">
      <div class="flex-row">
        <div class="f-14 bold c-w">{{mycarlist.plateno}}</div>
       
      </div>
      <div class="c-w f-12 margin-top-5">{{mycarlist.carseries_name}}</div>
    </div>


  </div>
      </div>
      <div class="top_blue" v-else>
      <div class="c-w f-16 f-bold margin-left-24 " @click="addmycar()">
        +添加我的爱车
      </div>
      <div class="radius_block"></div>
    </div>
    </div>
    
    <!-- 轮播图 -->
    <van-swipe
      class="my-swipe indexbanner"
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item
        v-for="(image, index) in indexbanner1"
        :key="index"
        class="h-140"
        @click="tiaozhaun(image.url)"
      >
        <img
          :src="page.uploadpath + 'indexbanner/' + image.img"
          class="h-140"
        />
      </van-swipe-item>
    </van-swipe>
    <!-- 列表 -->
    <div
      class="flex-row flex-center margin-top-20 margin-left-26 margin-right-26"
    >
      <div class="flex-1 flex-row flex-center">
        <img
          :src="page.uploadpath + 'resource/' + page.Res.fuwu2"
          class="icon-15"
        />
        <!-- @click="chefu" -->
        <div class="c-2 f-2 margin-left-4" >车服中心</div>
        <div class="flex-1"></div>
      </div>
      <div class="shu"></div>
      <div class="flex-1 flex-row flex-center">
        <div class="flex-1"></div> 
        <img
          :src="page.uploadpath + 'resource/' + page.Res.zhuce"
          class="icon-15"
        />
        <div class="c-2 f-2 margin-left-4">全国网点</div>
        <div class="flex-1"></div>
      </div>
      <div class="shu"></div>
      <div class="flex-1 flex-row flex-center">
        <div class="flex-1"></div>
        <img
          :src="page.uploadpath + 'resource/' + page.Res.koubai"
          class="icon-15"
        />
        <div class="c-2 f-2 margin-left-4">专业服务</div>
        <div class="flex-1"></div>
      </div>
      <div class="shu"></div>
      <div class="flex-1 flex-row flex-center">
        <div class="flex-1"></div>
        <img
          :src="page.uploadpath + 'resource/' + page.Res.fuwu"
          class="icon-15"
        />
        <div class="c-1 f-2 margin-left-4">省心贴心</div>
      </div>
    </div>
    <!-- 按钮 -->
        <!-- <div
      class="flex-row flex-wrap "  
    >
      <div
        v-for="(item, index) in allcategory"
        :key="index"
        style="width:25%"
        class="margin-top-20  center "
        @click="tostorelist(item.id)"
      >
        <img 
          :src="page.uploadpath + 'bigcategory/' + item.icon"
          class="icon-42 displat-block margin-auto"
        />
        <div class="c-2 f-2 margin-top-7">{{ item.name }}</div>
      </div>
    </div> -->

 <!-- @click="tiaozhaun(item.url)" -->
    <div
      class="flex-row flex-wrap "  
    >
      <div
        v-for="(item, index) in anniulist"
        :key="index"
        style="width:25%"
        class="margin-top-20  center "
        @click="tiao(index)"
      >
        <img
        v-if="item.type=='A'"
          :src="page.uploadpath + 'anniu/' + item.img"
          class="icon-42 displat-block margin-auto"
        />
          <img 
          v-else
          :src="page.uploadpath + 'bigcategory/' + item.icon"
          class="icon-42 displat-block margin-auto"
        />
        <div class="c-2 f-2 margin-top-7">{{ item.name }}</div>
      </div>
    </div>
    <!-- 新人礼包 -->
    <div class="margin-top-23 margin-left-14 margin-right-14">
     <!-- guangaolist -->
     <van-swipe :autoplay="3000" lazy-render>
  <van-swipe-item v-for="(image,index) in guangaolist" :key="index" @click="newtiao(index)">
   <img
        :src="page.uploadpath + 'guangao/' + image.img"
        class="h-93 wf-100" 
      />
  </van-swipe-item>
</van-swipe>

     
      <!-- 附近门店 -->
      <div class="flex-row flex-center margin-top-26">
        <div class="shu1"></div>
        <div class="margin-left-10 bold f-17 c-2">附近门店</div>
      </div>
      <!-- 分类 -->

      <div
        class="flex-row flex-center margin-top-14 margin-bottom-30"
        style="overflow: scroll"
      >
        <div
          class="
            padding-left-10 padding-right-10
            bg-1
            c-2
            f-11
            h-22
            border-radius-11
            line-height-22
            flex-none
            margin-right-10
          "
          v-for="(item, index) in servicelist"
          :key="index"
          @click="filtratestore(index)"
          :style="{'color':index==showsele?'#409EFF':'','background':index==showsele?'rgba(64, 158, 255, 0.1)':''}"
          
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <!-- 店铺 -->
    <div
      @click="dianpu(item.id)"
      v-for="(item, index) in storelist"
      :key="index"
    >
      <div class="margin-top-15 margin-left-14 margin-right-14">
        <div class="flex-row">
          <img
            :src="page.uploadpath + 'store/' + item.tupian"
            class="icon-84 border-radius-9"
          />
          <div class="margin-left-10 flex-1" >
            <div class="bold f-15 c-2 f-15">{{ item.name }}</div>
            <div class="margin-top-9 f-11 c-3">{{ item.score }}分</div>
            <div class="margin-top-9 c-1 f-11">
              月售 {{ item.monthlysale }}单
            </div>
            <div class="margin-top-9 flex-row  ">
              <img
                :src="page.uploadpath + 'resource/' + page.Res.dizhi"
                class="icon-13"
              />
              <div class="c-1 f-11 margin-left-4 "  >{{ item.address }}</div>
              <div class="flex-1"></div>
              <div class="f-11 c-1">{{item.distance2}}</div>
            </div>
          </div>
        </div>
        <div class="bg-2 margin-top-15" style="height: 1px"></div>
        <div class="margin-top-15 margin-bottom-15">
          <div class="flex-row flex-center">
            <div class="c-2 f-13 bold">{{item.service_name}}</div>
            <div class="flex-1"></div>
            <!-- <div
              class="
                bd-1
                border-radius-2
                h-14
                padding-right-4 padding-left-4
                c-4
                f-8
              "
            >
              减免券¥10
            </div>
            <div class="c-4 f-9 margin-left-10">¥</div>
            <div class="c-4 f-13">{{item.presentprice}}</div> -->
          </div>
          <div class="flex-row margin-top-10 flex-center">
            <div class="c-1 f-9">已售 {{item.sell}}</div>
            <div class="flex-1"></div>
            <div class="f-7 c-2" style="text-align: center">¥</div>
            <div class="f-9 c-2" style="text-align: center">{{item.originalprice}}</div>
          </div>
        </div>
      </div>
      <div class="bg-1 h-4"></div>
    </div>

    <div class="h-93"></div>
  </div>
</template>




<style scoped>
.indexbanner {
  height: 140px;
  margin: 0 14px 0;
}
.h-140 {
  height: 140px;
  width: 100%;
}
.shu {
  width: 1px;
  height: 9px;
  background: #e4e4e4;
}
.shu1 {
  width: 4px;
  height: 19px;
  background: #409eff;
  border-radius: 2px;
}
.van-swipe__indicator {
}
/deep/ .van-swipe__indicator--active {
  margin-top: 2px;
  width: 14px;
  height: 4px;
  border-radius: 2px;
}
.van-swipe__indicators {
}
</style>