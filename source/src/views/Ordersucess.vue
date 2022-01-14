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

let type=ref('')
type.value=route.query.type

console.log(type.value,'hhhh');

var chakan=()=>{
if (type.value=='C') {
    //   router.replace('/myvoucher')
    router.push('/myvoucher')

    return
}
router.push('/exchangerecord')

}

var shouyw=()=>{
    router.push('/')
}

</script>

<template>
  <div  v-if="page.Res!=null">
      <div class="h-240 bg-5">
          <div class="h-60"></div>
           <img
        @click="daohang"
          :src="page.uploadpath + 'resource/' + page.Res.chengogn"
          class="chengogn  "
        />
        <div class="c-w f-16 bold center ">{{type=='B'?'退款':'下单'}}成功!</div>
    
        <div class="margin-top-10 c-w f-12 center">恭喜你，{{type=='B'?'退款':'下单'}}成功！</div>
      </div>

      <div class="flex-row flex-center margin-top-60">
          <div class="flex-1"></div>
          <div class="btn-order f-14 line-height-40 center" style="border: 1px solid #1890FE;color: #1890FE;" @click="shouyw">
              返回首页
          </div>
          <div class="margin-left-26"></div>
          <div class="btn-order f-14 line-height-40 center bg-5" style="color: #fff;" @click="chakan">
              查看订单
          </div>
           <div class="flex-1"></div>
      </div>



  </div>
</template>
<style scoped>
.chengogn{
    width: 100px;
    height: 62px;
    display: block;
    margin: 0 auto 20px;
}
.btn-order{
    width: 150px;
    height: 40px;
    border-radius: 20px;

}

</style>