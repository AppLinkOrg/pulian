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

let infodetails = ref({});
HttpHelper.Post("carwash/infodetails", {id:route.query.id}).then((Res) => {
  infodetails.value = Res;
  console.log(infodetails);
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
          <div class="f-20 bold ">
              {{infodetails.title}}
          </div>
          <div class="">
              {{infodetails.zuozhe}}&nbsp;&nbsp;&nbsp;{{infodetails.time}}
          </div>
          <div class="htmlimg padding-15" v-html="Utils.HtmlDecode(infodetails.details)" ></div>
      </div>
  </div>
</template>
<style scoped>



</style>