<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';

let page = ref({});
let router = useRouter();
let route = useRoute();


PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});

let evaluatelist=ref([]);

var piangjia=()=>{
// 门店评价

if (route.query.type=='A') {
 HttpHelper.Post('evaluate/evaluatelist2',{
   pointsmall_id:route.query.id,
    biaoqian_id:biaoqianid.value,
 srouce:'B'}).then((Res)=>{
    evaluatelist.value=Res
})


  return
}

if (biaoqianid.value==0) {
   HttpHelper.Post('evaluate/evaluatelist',{
     store_id:route.query.id,

 srouce:'A'}).then((Res)=>{
    evaluatelist.value=Res
})
return
}
 HttpHelper.Post('evaluate/evaluatelist',{
     store_id:route.query.id,
 biaoqian_id:biaoqianid.value,
 srouce:'A'}).then((Res)=>{
    evaluatelist.value=Res
})
}


// 标签列表
let biaoqianlist=ref([]);
let biaoqianid=ref(0);
HttpHelper.Post('biaoqian/biaoqianlist',{}).then((res)=>{
  var json={
    id:0,
    name:'全部评论'
  }
res.unshift(json)


    biaoqianlist.value=res
    biaoqianid.value=res[0].id
    piangjia();
})

// 评价点击
let biaoqian =ref(0)
var dianji=(index)=>{
biaoqian.value=index
  biaoqianid.value=biaoqianlist.value[index].id
    piangjia();
}


</script>

<template>
  <div  v-if="page.Res!=null">
       <van-sticky>
           <div class="h-44 flex-row flex-center padding-left-14 padding-right-14 bg-w" style="overflow: scroll;">
               <div class="h-24 border-radius-12 line-height-24 bg-1 padding-left-14 padding-right-14 f-12 c-2 margin-right-5"
               :style="{'color':biaoqian==index?'#409EFF':'#333333','background':biaoqian==index?'rgba(64, 158, 255, 0.2)':''}"
                v-for="(item,index) in biaoqianlist" :key="index"  style="flex:none" @click="dianji(index)">
{{item.name}}
               </div>
           </div>
           <div class="margin-left-14 bold f-15 c-2 margin-top-14 margin-bottom-10">评价</div>
           

       </van-sticky>

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
               <!-- <img
                :src="page.uploadpath + 'resource/' + page.Res.dianpu"
                class="icon-78 "
              /> -->

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
          

     
          </div>






  </div>
</template>
<style scoped>
/* .{
    
} */

</style>