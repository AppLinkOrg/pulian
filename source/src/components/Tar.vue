
<script setup>
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { ref } from "vue";
import { useRouter } from "vue-router";

let router = useRouter();
let page = ref({});


var active=ref('firsthome')

PageHelper.Init(page, () => {});


var tz = (num) => {
    console.log('jinalia',num);
  if (num==1) {
              router.push('/') 
            //   active='firsthome'  
        
              active.value='firsthome'
          }
          if (num==2) {
              router.push('/integral') 
              //  active='integral'
              //  this.active='integral'
               active.value='integral'
          }
          if (num==3) {
             router.push('/storelist') 
               active.value='store'
          }
          if (num==4) {
              router.push('/') 
               active.value='myself'
          }
};

</script>

<template>
  <div>
      <van-tabbar v-model="active">
  <van-tabbar-item icon="home-o" @click="tz(1)" name="firsthome">首页</van-tabbar-item>
  <van-tabbar-item icon="points" @click="tz(2)" name="integral">积分</van-tabbar-item>
  <van-tabbar-item icon="shop-o" @click="tz(3)" name="store">门店</van-tabbar-item>
  <van-tabbar-item icon="manager-o" @click="tz(4)" name="myself">我的</van-tabbar-item>
</van-tabbar>
   
  </div>
</template>

<style scoped>

</style>