
<script setup>
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { ref } from "vue";
import { useRouter,useRoute } from "vue-router";
import  store  from "../State";




let router = useRouter();
let route = useRoute();
let page = ref({kk:'/'});

console.log(route.path,'store.state.name');
store.changeName(route.path)

var active=ref('firsthome')

PageHelper.Init(page, () => {});


// console.log('监听到变化ddd');
// const route=useRoute()
// console.log('监听到变化ddd');
// watch(()=>route.path,(e)=>{
//   pathname.value=e
//   title.value=route.meta.name
//   console.log('监听到变化ddd',route)
// })

const props = defineProps({ 
  pathname:String
});

let pathname=ref('');





  // title.value = inject("title");
pathname.value=props.pathname
 console.log(props.pathname,'可以拿到父组件的数据')

 if (pathname.value=='/'&& active.value!='/') {
  active.value='firsthome'
 }
  if (pathname.value=='/integral'&&active.value!='/integral') {
  active.value='integral'
 }
  if (pathname.value=='/storelist'&&active.value!='/storelist') {
  active.value='storelist'
 }
  if (pathname.value=='/myselef'&&active.value!='/myselef') {
   active.value='myselef'
 }

 //

var tz = (num) => {
  // PageHelper.kk.value.a="2";
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
              router.push('/myselef') 
               active.value='myself'
          }
};

</script>

<template>
  <div>
  
      <van-tabbar v-model="store.state.name">
    
  <van-tabbar-item icon="home-o" @click="tz(1)" name="/">首页</van-tabbar-item>
  <van-tabbar-item icon="points" @click="tz(2)" name="/integral">积分</van-tabbar-item>
  <van-tabbar-item icon="shop-o" @click="tz(3)" name="/storelist">门店</van-tabbar-item>
  <van-tabbar-item icon="manager-o" @click="tz(4)" name="/myselef">我的</van-tabbar-item>
</van-tabbar>



   
  </div>
</template>

<style scoped>

</style>