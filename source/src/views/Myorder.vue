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


let show=ref(false);
let shownum=ref('')
let orderlist=ref([]);

var cx=(e)=>{
shownum.value=e
orerliebiao()
}



// 订单列表
var orerliebiao=()=>{
    HttpHelper.Post('order/orderlist',{shownum:shownum.value}).then((res)=>{
    orderlist.value=res
}) 


}



// 查看券码
var chakan=(e)=>{
     router.push('/orderdetail?id='+e);

}

// 评价
var pingjia=(e)=>{
router.push('/Interevalute?type=A&id='+e);
}

var xqdetail=(id)=>{
    router.push('/myorderdetail?id='+id)
}



if (route.query.type !=undefined) {
    shownum.value=route.query.type
orerliebiao()
}else{
    orerliebiao()
}


</script>

<template>
  <div v-if="page.Res!=null">
        <van-sticky>
           <div class="h-40 bg-w flex-row flex-center">
          <div class="flex-1 f-14 c-1 center" :style="{'color':shownum==''?'#409EFF':''}" @click="cx('')">全部</div>
          <div class="flex-1 f-14 c-1 center" :style="{'color':shownum=='A'?'#409EFF':''}" @click="cx('A')">待付款</div>
          <div class="flex-1 f-14 c-1 center" :style="{'color':shownum=='B'?'#409EFF':''}" @click="cx('B')">可使用</div>
          <div class="flex-1 f-14 c-1 center" :style="{'color':shownum=='daip'?'#409EFF':''}" @click="cx('daip')">待评价</div>
          <div class="flex-1 f-14 c-1 center" :style="{'color':shownum=='er'?'#409EFF':''}" @click="cx('er')">退款/取消</div>
      </div>   
        </van-sticky>

      <!-- <div class="position-top">
          <div class="h-40 bg-w flex-row flex-center">
          <div class="flex-1 f-14 c-1 center" :style="{'color':shownum==''?'#409EFF':''}" @click="cx('')">全部</div>
          <div class="flex-1 f-14 c-1 center" :style="{'color':shownum=='A'?'#409EFF':''}" @click="cx('A')">待付款</div>
          <div class="flex-1 f-14 c-1 center" :style="{'color':shownum=='B'?'#409EFF':''}" @click="cx('B')">可使用</div>
          <div class="flex-1 f-14 c-1 center" :style="{'color':shownum=='daip'?'#409EFF':''}" @click="cx('daip')">待评价</div>
          <div class="flex-1 f-14 c-1 center" :style="{'color':shownum=='er'?'#409EFF':''}" @click="cx('er')">退款/取消</div>
      </div>
      </div> -->
    
      <div class="margin-top-10 margin-left-14 margin-right-14 bg-w border-radius-9 padding-15"  v-for="(item,index) in orderlist" :key="index"  @click="xqdetail(item.id)">
          <div class="flex-row flex-center">
              <div class="c-2 f-14 bold ">{{item.store_name}}</div>
              <div class="flex-1"></div>
              <div class="f-12 c-6 bold ">{{item.orderstatus_name}}</div>
          </div>
          <div class="flex-row margin-top-15">
                <img :src="page.uploadpath + 'store/' + item.store_tupian" class="icon-90 border-radius-5 "/>
                <div class="margin-left-10">
                    <div class="f-14 c-1 ">{{item.service_name}}</div>
                    <div class="c-2 margin-top-10 f-10">有效期至：{{item.effective_time}}</div>
                    <div class="c-2 margin-top-10 f-10">数量：{{item.num}}</div>
                    <div class="c-2 margin-top-10 f-10">总价：¥{{item.totalamount}}</div>
                </div>
          </div>
          <div class="flex-row flex-center margin-top-16">
              <div class="flex-1"></div>
              <div class="bd-3 btn-1 f-12 border-radius-13 line-height-26 center " v-if="item.orderstatus=='B'">退款</div>
              <div class="bg-6  btn-1 c-w f-12 border-radius-13 line-height-26 center margin-left-10" v-if="item.orderstatus=='B'" @click.stop="chakan(item.id)">查看券码</div>
               <!-- <div class="bg-6  btn-1 c-w f-12 border-radius-13 line-height-26 center margin-left-10" v-if="item.yiping=='B'" @click.stop="pingjia(item.id)">评价</div> -->
               <div class="bg-6  btn-1 c-w f-12 border-radius-13 line-height-26 center margin-left-10" v-if="item.orderstatus=='C'" @click.stop="pingjia(item.id)">评价</div>
          </div>

      </div>

          <!-- 嵌入内容 -->
      <van-overlay :show="show" @click="show = false">
  <div class="wrapper" @click.stop>
    <div class="block" >
        <div class="flex-row flex-center">
            <div class="flex-1"></div>
            <img :src="page.uploadpath + 'resource/' + page.Res.cha" class="icon-13"/>
           

        </div>
         <div class="bold c-1 f-16 center">温馨提示</div>
            <div class="c-2 margin-top-26 center">确定要退款订单吗？</div>
            <div class="margin-top-30 flex-row flex-center">
                <div class="btn-1 bd-5 border-radius-13 f-12 c-6 center line-height-26">暂不退款</div>
                 <div class="btn-1 bg-6 border-radius-13 f-12  center line-height-26 margin-left-20 c-w ">确定退款</div>
            </div>
    </div>
  </div>
</van-overlay>


  </div>
</template>
<style scoped>

</style>