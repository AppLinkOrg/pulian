<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';

let page = ref({});
let router = useRouter();
PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});

let indexList=ref(['热', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I','J','K','L','M','N','O','P','Q','R','S','T','W','X','Y','Z']);

let listA=ref([])
let listB=ref([])

let arrlist=ref([]);

   HttpHelper.Post("hotbrands/hotbrandslist",{}).then((res)=>{
arrlist.value.push(res)
})


for (let index = 1; index < indexList.value.length; index++) {
   
   HttpHelper.Post("carbrand/carbrandlist",{bfirstletter:indexList.value[index]}).then((res)=>{
arrlist.value.push(res)
})
    
}

 console.log(arrlist,'index');



 const onClickLeft = () => history.back();


</script>

<template>
  <div  v-if="page.Res!=null">
<van-nav-bar
  title="选择品牌"
  left-text="返回"
  left-arrow
  fixed
  @click-left="onClickLeft"
/>
<div class="h-50"></div>
      <!--  热门品牌-->
      <!-- <div class="h-38 flex-row flex-center c-2 f-14 margin-left-14 bold">热门品牌</div>
      <div class="h-95 flex-row flex-center h-95 bg-w" style="overflow: scroll;">
          <div class="margin-left-30">
              <img :src="page.uploadpath + 'resource/' + page.Res.dianpu" class="icon-40 displat-block margin-auto"/>
              <div class="center c-2 f-14 margin-top-16">奥迪</div>
          </div>
      </div> -->
      <!--  -->

<van-index-bar :index-list="indexList">

       
<div v-for="(item,index) in indexList" :key="index" >
      <van-index-anchor :index="item"  >{{item}}</van-index-anchor>

<div class="h-95 flex-row flex-center h-95 bg-w" style="overflow: scroll;" v-if="index==0">
          <div class="margin-left-30" v-for="(items,indexs) in arrlist[0]"   :key="indexs" style="flex:none">
              <img :src="items.carbrand_logo" class="icon-40 displat-block margin-auto"/>
              <div class="center c-2 f-14 margin-top-16">{{items.carbrand_id_name}}</div>
          </div>
      </div>
      <div v-else v-for="(items,indexs) in arrlist[index]" :key="indexs" class="flex-row flex-center bg-w h-60" >
          <img :src="items.logo" class="icon-40 margin-left-14"/>
          <div class="margin-left-14 c-2 f-14 ">{{items.name}}</div>
      </div>
       
</div>



  <van-index-anchor index="B">标题2</van-index-anchor>
  <van-cell title="文本" />
  <van-cell title="文本" />
  <van-cell title="文本" />
</van-index-bar>

<!--  -->
  </div>
</template>
<style scoped>

</style>