<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';
import { Utils } from '../Utils';


let page = ref({});
let router = useRouter();
let route = useRoute();
let pointsmadetail=ref({});
let type=ref('')

PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});

type.value=route.query.type







// 获取详情数据
HttpHelper.Post('pointsmall/pointsmadetail',{id:route.query.id}).then((res)=>{
    pointsmadetail.value=res
})

// 立即兑换
var duihaun=()=>{
 if (page.value.Memberinfo==null) {

   var token = window.localStorage.getItem("token");
  
    //  Toast(token+'ooo');
        Toast('请先授权用户信息');
  return;
    }
    router.push('/submitintegral?id='+route.query.id)


}

var chakandianpu=()=>{
    router.push('/storesx?id='+pointsmadetail.value.coupon_id)

}

// 门店评价
let evaluatelist=ref([])
 HttpHelper.Post('evaluate/evaluatelist2',{pointsmall_id:route.query.id,limit:"0,3",srouce:'B'}).then((Res)=>{
    evaluatelist.value=Res
})

// chakanall 查看全部评价
var chakanall=()=>{
  // console.log(route.query.id,'id');
  router.push('/genneralevalut?id='+route.query.id+'&type=A');
}


</script>

<template>
  <div  v-if="page.Res!=null">
  
        <div class="padding-15">
          <div class="bg-w border-radius-9 ">
          <img :src="page.uploadpath + 'pointsmall/' + pointsmadetail.img" class="h-130 displat-block margin-auto "/>
          <div class="flex-row flex-center padding-15">
              <div class="c-1 bold f-16 ">{{pointsmadetail.name}}</div>
              <div class="flex-1"></div>
              <img :src="page.uploadpath + 'resource/' + page.Res.xinxin" class="icon-18"/>
              <div class="margin-left-4 c-6 f-18 bold">{{pointsmadetail.point}}</div>

          </div>

<div v-if="pointsmadetail.type=='A'">
  <div class="bg-4 h-40 border-radius-20 line-height-40 center c-6 f-14 bold margin-top-26  margin-left-14 margin-right-14" @click="chakandianpu">查看可用门店</div>
          <div class="padding-bottom-15"></div>
</div>
      </div>

         <div class="bg-w border-radius-9 margin-top-10 padding-15">
            <div class="f-14 c-2 bold">兑换时间</div>
            <div class="margin-top-14 c-1 f-12">{{pointsmadetail.star}}至{{pointsmadetail.end}}</div>
               <div v-if="type=='A'">
                 <div class="f-14 c-2 bold margin-top-20">兑换说明</div>
            <div class="margin-top-14 c-1 f-12">{{pointsmadetail.shuoming}}</div>
           </div>
         <div v-else>
              <div class="f-14 c-2 bold margin-top-20">产品详情</div>
            <div class="htmlimg"  v-html="Utils.HtmlDecode(pointsmadetail.xianqing)"></div>
         </div>

        

         </div>

         <div class="f-14 c-2 bold margin-top-20"  v-if="evaluatelist.length>0 && pointsmadetail.type!='A' ">产品评价</div>


  <div class=" bg-w border-radius-9 margin-top-10 padding-15" style="padding:18px 9px 0px "  v-if="evaluatelist.length>0 && pointsmadetail.type!='A' ">
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
     




         



   <!-- <div class="f-15 c-2 bold padding-top-15 padding-bottom-15 ">产品评价</div> -->
<!--  -->
   <!-- <div class=" bg-w border-radius-9" style="padding:18px 9px 0px ">
            <div class="flex-row margin-bottom-18">
              <img
          :src="page.uploadpath + 'resource/' + page.Res.touxian"
          class="icon-28"
        />
        <div class="margin-left-6">
          <div class="f-11 c-2">牛肉粥不是皮蛋瘦肉粥</div>
          <div class="margin-top-4"></div>
          <img
              v-for="item in 5"
              :key="item"
                :src="page.uploadpath + 'resource/' + page.Res.star1"
                class="icon-13 "
              />
              <div class="margin-top-9 c-1 f-11">洗的挺干净的。</div>
              <div class="margin-top-9"></div>
               <img
                :src="page.uploadpath + 'resource/' + page.Res.dianpu"
                class="icon-78 "
              />
              <div class="c-1 f-8 margin-top-9">精洗套餐</div>

        </div>
        <div class="flex-1"></div>
        <div class="c-1 f-9">2021.09.23</div>
              
            </div>
            <div class="h-1 bg-2"></div>
            <div class="center h-44 line-height-44 f-11">查看全部评论（90）</div>

          </div> -->
          <div class="h-100"></div>

                       <!--  -->
          <div class="position-bottom " style="bottom:0px">
              <div class=" h-40 line-height-40 center f-16 c-w bold bg-5 " @click="duihaun()">
立即兑换
              </div>

          </div>



        </div>
  </div>
</template>
<style scoped>
.htmlimg .div>p>img{
  width: 100% !important;
}

</style>