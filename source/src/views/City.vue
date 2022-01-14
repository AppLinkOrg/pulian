<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';
import  store  from "../State";


let page = ref({});
let router = useRouter();
let route = useRoute();


PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});


// 获取所有门店的城市
let citilist=ref([])
HttpHelper.Post("store/citilist",{}).then((Res)=>{
    if(Res.code==0){
citilist.value=Res.result
    }

})

let showsele=ref(0)
// xz  选择城市
var xz=(index)=>{
    var cityid=citilist.value[index]['city_id']
    var cityname=citilist.value[index]['city']

    store.changecityid(cityid)
store.changecityname(cityname)

    // store.state.cityid=citilist[index]['city_id']

showsele.value=index+1

router.go(-1)

}
// dingwei
var dingwei=()=>{
var mylat= window.localStorage.getItem("latitude");
var mylng= window.localStorage.getItem("longitude");

HttpHelper.Post("member/position",{mylat,mylng}).then((res)=>{
if (res.code==0) {
    // alert(res.result.city_id)
    store.changecityid(0)
    store.changecityname('')
    Toast('获取成功')
}else{
Toast('获取失败')
}

})



}



</script>

<template>
  <div  v-if="page.Res!=null" class="bg-w">
      <div class="h-40 flex-row flex-center margin-left-14 margin-right-14">
         <div class="c-2 f-16 bold">当前定位：{{page.Memberinfo==null?'':page.Memberinfo.city_id_name}}</div>
         <div class="flex-1"></div>
         <div class="c-6 f-12  " @click="dingwei">重新定位</div>
      </div>
      <div class="h-4 bg-10"></div>
      <div class="padding-15">
      <div v-if="store.state.cityname!='' ">
                <div class="f-14 c-1">选中城市</div>
           <div class="flex-row margin-top-14 margin-bottom-14">
                 <div class="h-40 line-height-40 bg-10 padding-left-30 padding-right-30 border-radius-5 c-2 f-16 " 
             :style="{'color':1==2?'#409EFF':'','background':1==2?'rgba(64, 158, 255, 0.1)':''}"
            >
{{store.state.cityname}}
              </div>
              <div class="flex-1"></div>
           </div>
      </div>

          <div class="f-14 c-1">开放城市</div>
          <div class="flex-row flex-center margin-top-14 margin-bottom-14" style="display: flex;display: -webkit-flex;justify-content: space-between;flex-direction: row;flex-wrap: wrap;">
              <div class="h-40 line-height-40 bg-10 padding-left-30 padding-right-30 border-radius-5 c-2 f-16 " 
              :style="{'color':index+1==showsele?'#409EFF':'','background':index+1==showsele?'rgba(64, 158, 255, 0.1)':''}"
              v-for="(item,index) in citilist" :key="index" @click="xz(index)">
{{item.city}}
              </div>

          </div>
      </div>




  </div>


</template>
<style scoped>

</style>