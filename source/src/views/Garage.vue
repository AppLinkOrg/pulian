<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';

let page = ref({});
let router = useRouter();


PageHelper.Init(page, () => {});

let vehiclelist=ref([]);

//查询车库的数目
   HttpHelper.Post("vehicle/vehiclelist",{}).then((res)=>{
vehiclelist.value=res
})

// 添加爱车
var addche=()=>{
router.push('/addgarage')
}

</script>

<template>
  <div  v-if="page.Res!=null">
      <div class="margin-top-10 margin-left-14 margin-right-14 bg-w border-radius-9 " v-for="(item,index) in vehiclelist" :key="index">
          <div class="flex-row flex-center padding-20">
              <div class="flex-1">
                  <div class="f-20 c-2 bold">{{item.plate}}{{item.platenumber}}</div>
                  <div class="margin-top-14 c-1 f-13">{{item.carseries_id_name}}</div>
              </div>
                <img :src="item.carseries_id_logo" class="icon-60"/>
          </div>
<div class="h-1 bg-1 "></div>
<div class="flex-row flex-center padding-15">
  <div class="icon-18 border-radius-50 bd-3" v-if="item.efault_value!='Y'"></div>
  <img :src="page.uploadpath + 'resource/' + page.Res.wanchegn" class="icon-18" v-else/>
  <div class="c-1 f-12 ">设为默认车</div>
  <div class="flex-1"></div>
  <div class="c-1 f-12">删除</div>
    <div class="c-1 f-12">修改</div>
</div>
      </div>

                <!--  -->
          <div class="position-bottom" style="bottom:20px">
              <div class="margin-left-14 margin-right-14 h-40 line-height-40 center f-16 c-w bold bg-5 border-radius-20" @click="addche()">
+添加爱车
              </div>

          </div>
      

  </div>
</template>
<style scoped>

</style>