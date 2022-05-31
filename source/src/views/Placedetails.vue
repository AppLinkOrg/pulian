<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';
import  store  from "../State";
import { Utils } from '../Utils';

let page = ref({});
let router = useRouter();
let route = useRoute();
let bujilist=ref(null);

PageHelper.Init(page, () => {});
console.log(route.query.id,'666');
let placedetails = ref({});
HttpHelper.Post("carwash/placedetails", {id:route.query.id}).then((Res) => {
    
  placedetails.value = Res;
  console.log(placedetails,'666');
});


PageHelper.LoginAuth(page, () => {
liebiao()
});


// 实物不急优惠券列表





// buti 补贴跳转
var buti=(e)=>{
    router.push('/couponbag?id='+e)

}


</script>

<template>
  <div v-if="page.Res!=null">
      <div class=" margin-left-14 margin-right-14">
          <div class="f-20 bold margin-top-14">
              {{placedetails.name}}
          </div>
          <div class="f-20 bold margin-top-14">
              {{placedetails.address}}
          </div>
          <div class=" margin-top-14">
              {{placedetails.distance}}&nbsp;&nbsp;&nbsp;{{placedetails.timeslot}}
          </div>
          <div class="htmlimg padding-15" v-html="Utils.HtmlDecode(placedetails.content)" ></div>
      </div>
  </div>
</template>
<style scoped>



</style>