<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
import store from "../State";
import { Utils } from "../Utils";

let page = ref({});
let router = useRouter();
let route = useRoute();
let bujilist = ref(null);

PageHelper.Init(page, () => {});

let carwashplacelist = ref([]);
HttpHelper.Post("carwash/carwashplacelist", {}).then((Res) => {
  console.log(Res,'11');  
  carwashplacelist.value = Res;
});

PageHelper.LoginAuth(page, () => {
  liebiao();
});

// 实物不急优惠券列表

// 跳转
var personalcenter = (e) => {
  router.push("/personalcenter");
};
</script>

<template>
  <div v-if="page.Res != null">
    <div class="wf-100 padding-left-14 padding-right-14 imgbox flex-between">
        <div>
            <img class="icon-40" :src="page.uploadpath + 'resource/' + page.Res.location">
        </div>
        <div>
            <img class="icon-40" :src="page.uploadpath + 'resource/' + page.Res.personalcenter"  @click="personalcenter()">
        </div>
    </div>
    <div class="bottom margin-left-18 margin-right-18" style="background-color:#F7F7F8">
      <div class="bg-w">
        <img
          class="wf-100"
          :src="page.uploadpath + 'resource/' + page.Res.buycarwash"
        />
      </div>
      <div
        class="bg-w"
        v-for="(item, index) in carwashplacelist"
        :key="index"
      >
        <div>
            {{item.name}}
        </div>
        <div>
            {{item.address}}
        </div>
        <div>
            {{item.distance}}{{item.timeslot}}
        </div>

      </div>
      <div class="bg-w">
        <div class="wf-100  bg-6 border-radius-20 wrapper">
          <div>
            <img
              class="icon-25"
              :src="page.uploadpath + 'resource/' + page.Res.saoyisao"
            />
          </div>
          <div class="c-w f-14" style="line-height:40px">扫码洗车</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.bottom {
  position: fixed;
  bottom: 0;
}
</style>