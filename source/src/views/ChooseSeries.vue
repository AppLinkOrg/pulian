<script setup>
import { ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { HttpHelper } from "../HttpHelper";
import { PageHelper } from "../PageHelper";

let router = useRouter();
let route = useRoute();

let page = ref({});
PageHelper.Init(page, () => {});

var allserieslist = ref({});
var brandinfo = ref({});

// var abt = [];
// for (var i = 0; i < 16; i++) {
//   abt.push(String.fromCharCode(i + 65));
// }
// console.log(abt, "看看多少");
// 门店详情
HttpHelper.Post("carbrand/serieslist", {carbrand_id:route.query.brand_id}).then((res) => {
  allserieslist.value = res;
});

HttpHelper.Post("carbrand/brandinfo", {id:route.query.brand_id}).then((res) => {
  brandinfo.value = res;
});

var tomodel = (carseries_id) => {  
  router.push("/choosemodel?carseries_id="+carseries_id+"&carbrand_id="+route.query.brand_id);
};

</script>

<template>
  <div class="" v-if="page.Res != null">

      <div class="flex-row flex-center bg-w">
          <img class="brand_icon margin-left-10" :src="brandinfo.logo" />
          <van-cell  :title="brandinfo.name"  style="padding-left:0"/>
        </div>
      
    <van-list @load="onLoad"  >
        <div  v-for="item in allserieslist"  :key="item.id" >
            <!-- <div class="bold c-b">{{item.factory_name}}</div> -->
            <van-cell :title="item.factory_name" class="bold c-b "  style="background:#F6F6F6;" />
            <van-cell   :title="item2.name" v-for="item2 in item.serieslist"  :key="item2.id" @click="tomodel(item2.id)"/>
        </div>
            
            
    </van-list>
    
  </div>
</template>
<style scoped>
.brand_icon {
  width: 30px;
  height: 30px;
}
</style>