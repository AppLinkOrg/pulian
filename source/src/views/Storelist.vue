<script setup>
import { ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { HttpHelper } from "../HttpHelper";
import { PageHelper } from "../PageHelper";
import { Utils } from "../Utils";
import  store  from "../State";




let router = useRouter();
let route = useRoute();

let page = ref({});
PageHelper.Init(page, () => {});

var allcategory = ref({});
var storelist = ref([]);

var activeId = ref(1);
var activeIndex = ref(0);
var areaslist = ref([]);
var filtrate_id = ref(0);


//选择区县 
var area_id=ref(""); 
var area_name=ref("全城区");
var area_dropdown=ref();
var chooseareas= (id,area) => { 
   area_id.value=id; 
   area_name.value=area;
   console.log(area_id,'总共')
   area_dropdown.value.toggle(); 
   filtratestore();
}; 

var cityids=store.state.cityid
HttpHelper.Post("store/areaslist", {
  cityids
}).then((res) => {
  var json={
         id:'',
         area:'全城区',
         areaid:''
       }
        res.unshift(json)
  areaslist.value = res;
  console.log(res,'111drerr1');
});

//选择服务类型,门店全部分类

var service_id=ref(""); 
var service_name=ref("全部服务");
var service_dropdown=ref();
HttpHelper.Post("store/allcategory", {}).then((res) => {
  console.log(res,"总多少")
  for(var i=0;i<res.length;i++){ 
       var servicelist=res[i].servicelist;
       
       var json={
         id:'',
         name:'全部'+res[i].name
       }

       var children=[];
    //  console.log(servicelist,'这个呢111')

    servicelist.unshift(json)

       for(var j=0;j<servicelist.length;j++){
       children.push({text:servicelist[j].name,id:servicelist[j].id}); 
       }
       allserverlist.push({text:res[i].name,children:children})
  }
  console.log(allserverlist,'总服务列表')
  allcategory.value = res;

dalei()
});


var chooseservice= (e) => { 
   console.log('总共--',activeIndex.value);
console.log('总共--',activeId.value);

   service_id.value=e.id;


 bigcategory_id.value=allcategory.value[activeIndex.value]['id']


   service_name.value=e.text;
   service_dropdown.value.toggle();  
   filtratestore();
}; 

 


// 选择排序 
var seqid=ref("");
var seq_index=ref(0);
var seq_name=ref("距离优先");
var seq_dropdown=ref();
var seqlist = ref([
  { text: "距离优先", id: 1 },
  { text: "好评优先", id: 2 },
  { text: "销量优先", id: 3 },
]);
var chooseseq = (id,index,name) => { 
   seqid.value=id;
   seq_index.value=index;
   seq_name.value=name;
   seq_dropdown.value.toggle(); 
    filtratestore();
};



// var storetylelist = ref([
//   { name: "美容", id: 4 ,choose:false },
//   { name: "美容+快修", id: 5,choose:false },
//   { name: "洗车", id: 6,choose:false },
// ]);
var wokestatus = ref([
  { name: "营业中", type: 'A',choose:false  },
  { name: "休息中", type: 'B',choose:false  }, 
]);
 

var allserverlist = [];


//门店列表
// HttpHelper.Post("store/storelist", {}).then((res) => {
//   storelist.value = res;
// });


// 选择门店类型
  
var choosestoretype = (index) => {
  if ( bigcategory_id.value==allcategory.value[index].id) {
    // 点击取消
bigcategory_id.value="";
return
  }
  // console.log("点击了",storetylelist.value[index].choose)
   
   
  bigcategory_id.value=allcategory.value[index].id;

 allcategory.value[index].choose=!allcategory.value[index].choose; 
   allcategory.value = allcategory.value; 
};

// 选择门店营业状态
var wokestatus_type=ref("");
var choosewokestatus = (index) => { 
  if (wokestatus_type.value==wokestatus.value[index].type) {
    wokestatus_type.value=""
    return
  }
 
    wokestatus_type.value=wokestatus.value[index].type;

 wokestatus.value[index].choose=!wokestatus.value[index].choose; 
   wokestatus.value = wokestatus.value; 
};

var workstatus_storetype=ref();
var confirm =()=>{ 
   console.log("确定")
   workstatus_storetype.value.toggle(); 
   filtratestore();
}

//调用筛选接口返回门店列表数据

  var mylat= window.localStorage.getItem("latitude");
var mylng= window.localStorage.getItem("longitude");

var cityid=store.state.cityid

var filtratestore = () => {  
 console.log(wokestatus_type.value,'有吗');
   
   HttpHelper.Post("store/filtrate", {
   business:wokestatus_type.value,
   seq:seqid.value,
   service_id:service_id.value,
   areas_id:area_id.value,
   bigcategory_id:bigcategory_id.value,
   mylat,mylng,cityid
   

   }).then((res) => {
        for(let item of res){
       item.distance2=Utils.GetMileTxt(item.distance)

     }

    storelist.value = res;


   });

};
//大分类
  var bigcategory_id=ref(0);
var dalei =()=>{
  if(route.query.bigcategory_id!=null){ 
  var allca=allcategory.value;
  var allindex=0;

  for (let index = 0; index < allca.length; index++) {
    if(allca[index]['id']==route.query.bigcategory_id){
allindex=index
    }
    
  }

    activeIndex.value=allindex
  activeId.value=''
 
  bigcategory_id.value=route.query.bigcategory_id;
service_name.value='全部'+route.query.bigcategory_name;
  // bigcategory_name
 
   wokestatus_type.value="";
   seqid.value="";
   service_id.value="";
   area_id.value="";

  HttpHelper.Post("store/filtrate", {
   business:wokestatus_type.value,
   seq:seqid.value,
   service_id:service_id.value,
   areas_id:area_id.value,
   bigcategory_id:bigcategory_id.value
   }).then((res) => {
    storelist.value = res;
   });
   
}
}
 
var choosetype = (index) => {  
  var item= allcategory.value[index]
  console.log(item,'item');

  activeIndex.value=index
  activeId.value=''

  

  service_name.value=item.servicelist[0]['name']

  //  service_id.value=item.servicelist[0]['id']


   bigcategory_id.value=item.id;

   wokestatus_type.value="";
   seqid.value="";
   service_id.value="";
   area_id.value="";

    filtratestore();
};

 

var tostoredetail = (index) => { 
  router.push("/storedetail?id=" + index);
};



var addmycar = () => {  
  router.push("/editvegicle");
};

// 顶部退关图片
let storelist3=ref([])
var tuiguan=()=>{
  var mylat= window.localStorage.getItem("latitude");
var mylng= window.localStorage.getItem("longitude");

var cityid=store.state.cityid

  HttpHelper.Post("store/storelist3",{
    mylat,mylng,cityid
    }).then((res)=>{
    res[0].distance2=Utils.GetMileTxt(res[0].distance)
    storelist3.value=res
console.log(2222);
  })
}
tuiguan()


// fuwudina 服务数据
let serviceid=ref(0)
var fuwudina=(index)=>{

  var item=storelist3.value[0].servicepricelist[index];
  var id=storelist3.value[0].id;
  serviceid.value=item.service_id

  router.push("/storedetail?id=" + id+'&service_id='+item.service_id);
}

// storexq 店铺详情
var storexq=()=>{
   var id=storelist3.value[0].id;
  router.push("/storedetail?id=" + id);
}
 

  filtratestore();


  // 设置默认车辆
  let mycarlist=ref(null)
HttpHelper.Post("member/mycarlist",{isdefault:'Y'}).then((res)=>{
if(res.length>0){
mycarlist.value=res[0]
}
})


var che=()=>{
  router.push('/garage')
}


var chopngzhi=()=>{
  bigcategory_id.value=""
wokestatus_type.value=""

}


 
</script>

<template >
  <div class="all_page" v-if="page.Res != null">
 
    <div class="top_blue" v-if="mycarlist==null">
      <div class="c-w f-16 f-bold margin-left-24 padding-top-10" @click="addmycar()">
        +添加我的爱车
      </div>
      <div class="radius_block"></div>
    </div>
<div class="top_blue" v-else>
  <div class="flex-row flex-center margin-left-24 padding-top-20" @click="che">
    <img :src="mycarlist.carbrand_logo" class="icon-35" />
    <div class="margin-left-10">
      <div class="flex-row">
        <div class="f-14 bold c-w">{{mycarlist.plateno}}</div>
         <!-- <img :src="page.uploadpath + 'resource/' + page.Res.	xiala" class="icon-12 margin-left-10" /> -->
      </div>
      <div class="c-w f-12 margin-top-5">{{mycarlist.carseries_name}}</div>
    </div>


  </div>
      <div class="radius_block"></div>
</div>


    <div class="flex-row flex-wrap padding-top-10">
      <div class="category" v-for="(item, index) in allcategory" :key="index" @click="choosetype(index)">
        <img
          class="icon_category"
          :src="page.uploadpath + 'bigcategory/' + item.icon"
        />
        <div class="f-12 margin-top-5">{{ item.name }}</div>
      </div>
    </div>

    <!-- 广告区域 -->
    <div
      class="margin-L-R-15 bg-w border-radius-5 padding-10 advertising_block"
    >
      <!-- <img
          class="store_long_img"
          :src="page.uploadpath + 'resource/' + page.Res.dianpu"
        /> -->
      <div class="flex-row" v-if="storelist3.length>0">
        <!-- 广告左侧大图 -->
        <div class="">
          <!-- <van-image
            width="90"
            height="206"
            fit="cover"
            :src="page.uploadpath + 'store/' + storelist3[0]['tupian']"
          /> -->

           <van-image
            width="90"
            height="206"
            fit="cover"
            :src="page.uploadpath + 'storetui/' + storelist3[0]['storetui_img']"
            class="border-radius-9"
            
          />
        </div>

        <!-- 广告右侧店铺信息 -->
        <div class="flex-1 margin-left-10" style="width: 56vw"  v-if="storelist3.length>0" @click="storexq">
          <div class="f-16 f-bold c-b">{{storelist3[0]['name']}}</div>
          <div class="flex-row flex-center margin-top-5">
            <div class="f-12 c-3">{{storelist3[0]['score']}}分</div>
            <div class="f-12 c-7 margin-left-10">月售{{storelist3[0]['monthlysale']}}单</div>
            <div class="flex-1"></div>
            <div class="f-12 c-7">{{storelist3[0]['distance2']}}</div>
          </div>
          <div class="flex-row flex-wrap">
            <div class="label_bg margin-right-5 margin-top-5 c-3 f-10" v-for="(item,index) in storelist3[0]['biaoqianlist']" :key="index">
              {{item}}
            </div>
            <!-- <div class="label_bg margin-right-5 margin-top-5 c-3 f-10">
              热情老a萨达阿斯达板
            </div> -->
          </div>
          <div class="flex-row flex-wrap margin-top-10">
            <van-image
            style="flex:none"
              class="zuobiao margin-right-5"
              :src="page.uploadpath + 'resource/' + page.Res.zuobiao"
            />
            <div class="f-12 c-7 flex-1">{{storelist3[0]['address']}}</div>
          </div>

          <!-- 广告店铺服务列表滚动区域 -->

          <div
            class="flex-row margin-top-5"
            style="overflow: scroll; width: 100%"
          >
            <div class="margin-right-5" v-for="(item,index) in storelist3[0]['servicepricelist']" :key="index"  @click.stop="fuwudina(index)">
              <van-image
                class="fuwu_img margin-right-5  "
                :src="page.uploadpath + 'serviceprice/' + item.img"
              />
              <div class="margin-top-5">{{item.service_id_name}}</div>
              <div class="flex-row flex-bottom">
                <div class="f-14 c-5 margin-right-5">¥{{item.originalprice}}</div>
                <!-- <div class="f-10" style="text-decoration: line-through">
                  ¥50
                </div> -->
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- <van-image
        fit="cover"
        class="label_img"
        :src="page.uploadpath + 'resource/' + page.Res.ls"
      /> -->
    <img  class="label_img" :src="page.uploadpath + 'resource/' + page.Res.ls"  v-if="storelist3.length>0"/>
    
    </div>
     

    <van-sticky>
      <van-dropdown-menu>
        <van-dropdown-item :title="area_name" ref="area_dropdown" class="text-center">
          <van-list @load="onLoad" class="center">
            <van-cell
              v-for="item in areaslist"
              :key="item.areaid"
              :title="item.area"
              :class="area_id==item.areaid?'van_cell':''"
              @click="chooseareas(item.areaid,item.area)"
            />
          </van-list>
        </van-dropdown-item>

        

        <van-dropdown-item :title="service_name" ref="service_dropdown">
          <van-tree-select
            v-model:active-id="activeId"
            v-model:main-active-index="activeIndex"
            :items="allserverlist"
            @click-item="chooseservice"
          />
  
        </van-dropdown-item>

 
        <van-dropdown-item :title="seq_name" ref="seq_dropdown"   >
          <van-list @load="onLoad" class="center">
            <van-cell
              v-for="(item,index) in seqlist"
              :key="index"
              :class="seqid==item.id?'van_cell':''"
              :title="item.text"
              @click="chooseseq(item.id,index,item.text)"
            />
          </van-list>
        </van-dropdown-item>

        <van-dropdown-item title="门店筛选" ref="workstatus_storetype">
          <div class="padding-10">
            <div class="f-14 bold">门店类型</div>
            <div class="flex-row flex-wrap">
              <div v-for="(item, index) in allcategory"  :key="index" class="label_block  f-10" :class="item.id==bigcategory_id?'choose_label':'not_choose_label'"  @click="choosestoretype(index)">{{item.name}}</div> 
            </div>
            <div class="f-14 bold margin-top-10">是否营业</div>
            <div class="flex-row flex-wrap">
              <div class="label_block not_choose_label f-10" v-for="(item,index) in wokestatus" :key="index" :class="item.type==wokestatus_type?'choose_label':'not_choose_label'"  @click="choosewokestatus(index)">{{item.name}}</div> 
            </div>

            <div class="flex-row  margin-top-20 margin-bottom-10">
                <div class="btn flex-1 btn_reset" @click="chopngzhi">重置</div> 
                <div style="width:10px"></div>
                <div class="btn flex-1 btn_confirm" @click="confirm">确定</div> 
            </div>

          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </van-sticky>

    <!-- 门店列表 -->
    <div v-for="(item, index) in storelist" :key="index" @click="tostoredetail(item.id)"  >
      <div class="margin-top-15 margin-left-14 margin-right-14 bg-w padding-10 border-radius-9">
        <div class="flex-row">
          <img
            :src="page.uploadpath + 'store/' + item.tupian"
            class="icon-84 border-radius-9"
          />
          <div class="margin-left-10 flex-1">
            <div class="bold f-15 c-2 f-15">{{ item.name }}</div>
            <div class="margin-top-9 f-11 c-3">{{ item.score }}分</div>
            <div class="margin-top-9 c-1 f-11">
              月售 {{ item.monthlysale }}单
            </div>
            <div class="margin-top-9 flex-row flex-center">
              <img
                :src="page.uploadpath + 'resource/' + page.Res.dizhi"
                class="icon-13"
              />
              <div class="c-1  f-11 margin-left-4">{{ item.address }}</div>
              <div class="flex-1"></div>
              <div class="f-11 c-1">{{item.distance2}}</div>
            </div>
          </div>
        </div>
        <div class="bg-2 margin-top-15" style="height: 1px"></div>
        <!-- @click.stop="fuwustodetail()" -->
        <div class="margin-top-15 margin-bottom-15" v-for="(items,indexs) in item.servicepricelist" :key="indexs"  >
          <div class="flex-row flex-center">
            <div class="c-2 f-13 bold">{{items.service_name}}</div>
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
            <div class="c-4 f-13">30</div> -->
          </div>
          <div class="flex-row margin-top-10 flex-center">
            <div class="c-1 f-9">已售 {{items.sell}}</div>
            <div class="flex-1"></div>
            <div class="f-7 c-2" style="text-align: center">¥</div>
            <div class="f-9 c-2" style="text-align: center">{{items.originalprice}}</div>
          </div>
        </div>
      </div>
      <div class="bg-1 h-4"></div>
    </div>

    <div class="margin-top-30 c-1 bold f-14 center " v-if="storelist.length==0">没有找到相关门店</div>

          <div class="h-50"></div>
  </div>
</template>
<style scoped>
/deep/ .van-image__img{
  border-radius:9px !important;
}

.all_page {
  background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 100%);
  height: 100vh;
  width: 100vw;
}
.top_blue {
  height: 80px;
  width: 100%;
  background: #409eff;
  position: relative;
}
.radius_block {
  height: 20px;
  border-radius: 20px 20px 0px 0px;
  background: white;
  width: 100%;
  position: absolute;
  bottom: -1%;
}
.margin-left-24 {
  margin-left: 24px;
}
.icon_category {
  width: 30px;
  height: 30px;
}
.category {
  /* margin:0 16% 0 3%; */
  width: 25%;
  margin-bottom: 10px;
  text-align: center;
}
.store_long_img {
  height: 206px;
  width: 90px;
}
.advertising_block {
  position: relative;
}
.label_img {
  /* width: 45px; */
  height: 20px;
  position: absolute;
  right: 0;
  top: 0;
}
.label_bg {
  padding: 4px 6px;
  background: #ecf5ff;
  border-radius: 4px;
}
.zuobiao {
  width: 12px;
  height: 12px;
}
.fuwu_img {
  width: 85px;
  height: 70px;
   /* height: 70px; */
  border-radius: 5px;
   /* width: 90px;
  height: 60px; */
}
.van_cell {
  color: rgb(248, 81, 52) !important;
}
.label_block {
  border-radius: 5px;
  width: 80px;
  line-height: 35px;
  height: 35px;
  text-align: center;
  margin-top: 10px;
  margin-right: 5px;
}
.not_choose_label {
  background: rgb(241, 241, 241);
  border: 1px solid rgb(241, 241, 241);
  color: black;
}
.choose_label {
  background: rgb(255, 245, 245);
  border: 1px solid rgb(255, 151, 125);
  color: rgb(255, 151, 125);
}
.btn{
    padding: 10px;
    border-radius: 30px;
    text-align: center; 
}
.btn_reset{
    border: 1px solid rgb(241, 241, 241);
}
.btn_confirm{
  background: rgb(255, 61, 12);
  border: 1px solid rgb(255, 101, 12);
  color: white;
}
</style>