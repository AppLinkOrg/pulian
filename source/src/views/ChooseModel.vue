<script setup>
import { ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { HttpHelper } from "../HttpHelper";
import { PageHelper } from "../PageHelper";
import  store  from "../State";


let router = useRouter();
let route = useRoute();

let page = ref({});
PageHelper.Init(page, () => {});

var allcarmodel = ref({});

var brandinfo = ref({});
 
HttpHelper.Post("carbrand/carmodel", {carseries_id:route.query.carseries_id}).then((res) => {
  allcarmodel.value = res;
});

// HttpHelper.Post("carbrand/brandinfo", {id:route.query.brand_id}).then((res) => {
//   brandinfo.value = res;
// });

var beforeRouteLeave = (carmodel_id) => {
    // 通过地址查询是否带有跳转标示
    console.log(router,'返回');

    store.changecarbrand_id(route.query.carbrand_id);
    store.changecarseries_id(route.query.carseries_id);
    store.changecarmodel_id(carmodel_id);
    router.go(-3)


      // router.replace("/addgarage?carbrand_id="+route.query.carbrand_id+"&carseries_id="+route.query.carseries_id+"&carmodel_id="+carmodel_id); 
      // router.replace("/editvegicle?carbrand_id="+route.query.carbrand_id+"&carseries_id="+route.query.carseries_id+"&carmodel_id="+carmodel_id); 

      
  }

 

</script>

<template>
  <div class="" v-if="page.Res != null">

      <!-- <div class="flex-row flex-center bg-w">
          <img class="brand_icon margin-left-10" :src="brandinfo.logo" />
          <van-cell  :title="brandinfo.name"  style="padding-left:0"/>
        </div> -->
      
    <van-list @load="onLoad"  >
        <div  v-for="item in allcarmodel"  :key="item.id" >
            <!-- <div class="bold c-b">{{item.factory_name}}</div> -->
            <van-cell :title="item.caryear_name" class="bold c-b "  style="background:#F6F6F6;" />
            <van-cell   :title="item2.name" v-for="item2 in item.model_list"  :key="item2.id" @click="beforeRouteLeave(item2.id)"/>
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