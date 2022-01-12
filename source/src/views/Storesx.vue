<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';
import { Utils } from "../Utils";


let page = ref({});
let router = useRouter();
let route = useRoute();


PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});

var areaslist = ref([]);
//选择区县 
var area_id=ref(""); 
var area_name=ref("全城区");
var area_dropdown=ref();
var chooseareas= (id,area) => { 
   area_id.value=id; 
   area_name.value=area;
   console.log(area_id,'总共')
   area_dropdown.value.toggle(); 
 
    storelist();
}; 
HttpHelper.Post("store/areaslist", {}).then((res) => {
  areaslist.value = res;
   
});

// 选择排序 
var seqid=ref("1");
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
    storelist();

  
};


// 查看店铺列表
let storelist2=ref(null);
let mylat=ref(null);
let mylng=ref(null);
 mylat.value= window.localStorage.getItem("latitude");
 mylng.value= window.localStorage.getItem("longitude");

var storelist = ()=>{
  HttpHelper.Post('store/storelist2',{coupon_id:route.query.id,mylat:mylat.value,mylng:mylng.value,area_ids:area_id.value,seqid:seqid.value}).then((Res)=>{

  for(let item of Res){
item.distance2=Utils.GetMileTxt(item.distance)
  }
    storelist2.value=Res
})
}

storelist()

// mendian 跳转到门店详情
var mendian=(e)=>{
  router.push('/storedetail?id='+e)
}

</script>

<template>
  <div  v-if="page.Res!=null">

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

    </van-dropdown-menu>

</van-sticky>


<div class="margin-left-14 margin-right-14 margin-top-14 bg-w border-radius-9 padding-10 flex-row flex-center" v-for="(item,index) in storelist2" :key="index"  @click="mendian(item.id)">
<img :src="page.uploadpath + 'store/' + item.tupian" class="icon-90-32"/>
<div class="margin-left-14 flex-1">
    <div class="c-2 f-14 bold ">{{item.name}}</div>
<div class="flex-row flex-center">
      <div v-for="items in 5" :key="items"  >
  <img :src="page.uploadpath + 'resource/' + page.Res.star1" class="icon-10 margin-top-10" v-if="item.score<items" />
    <img :src="page.uploadpath + 'resource/' + page.Res.star2" class="icon-10 margin-top-10" v-else />
    </div>
</div>
  
    <div class="flex-row ">
        <div class="c-1 margin-top-14 f-12 ">月售 {{item.monthlysale}}单</div>
        <div class="flex-1"></div>
        <div class="c-1 margin-top-14 f-12 ">{{item.distance2}}</div>
    </div>

</div>

</div>




  </div>
</template>
<style scoped>

</style>