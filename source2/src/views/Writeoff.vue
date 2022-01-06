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

let orderlist2=ref([])
let leix=ref('E')


var dinfan=()=>{
    HttpHelper.Post("order/orderlist2",{leix:leix.value}).then((Res)=>{
        if (Res!=null) {
      orderlist2.value=Res      
        }

    })
}
dinfan();


let orderno=ref('')

var tapToSearch=(e)=>{
    if (e.keyCode==13) {
        router.push('/Orderdetail?orderno='+orderno.value)
        
    }
  
 
}


</script>

<template>
  <div  v-if="page.Res!=null">
      <van-sticky>
          <div class="h-50 flex-row flex-center bg-w padding-left-14 padding-right-14">
              <input type="text" class="h-30 bg-1 border-radius-15 center c-2 f-12 " placeholder="请输入核销码"  @keyup="tapToSearch" v-model="orderno"/>
                   <img :src="page.uploadpath + 'resource/' + page.Res.saomiao3" class="icon-25 margin-left-26" />
          </div>
      </van-sticky>

   
      <div class="c-2 bold f-16 margin-top-15 margin-left-14 margin-bottom-20">核销记录</div>
      <van-sticky>
          <div class="flex-row flex-center margin-left-14 margin-right-14 margin-bottom-10">
              <div class="flex-1 c-1 f-14">核销时间</div>
              <div class="flex-1 c-1 f-14 center" >订单编号</div>
              <!-- <div class="flex-1 c-1 f-14 right">核销码</div> -->
              <div class="flex-1 c-1 f-14 right">状态</div>
          </div>
      </van-sticky>

      <div class="bg-w flex-row flex-center padding-left-14 padding-right-14 bg-6" v-for="(item,index) in orderlist2" :key="index" >
<div class="flex-1 c-1 f-14" style="flex:none">{{item.use_time}}</div>
              <div class="flex-1 c-2 f-14 center" style="flex:none">{{item.orderno}}</div>
              <!-- <div class="flex-1 c-2 f-14 " style="flex:none">核销码</div> -->
              <div class="flex-1 c-6 f-14 right " style="flex:none">已核销</div>
      </div>





  </div>
</template>
<style scoped>

</style>