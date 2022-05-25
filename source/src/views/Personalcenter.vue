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
  console.log(Res, "11");
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
    <div
      class="
        wf-100
        padding-left-14 padding-right-14
        imgbox
        flex-between
        margin-top-25
      "
    >
      <div class="imgbox flex-star">
        <div>
          <img
            class="icon-70"
            :src="page.uploadpath + 'resource/' + page.Res.personalcenter"
          />
        </div>
        <div class="wrapper column">
          <div>dasdad</div>
          <div>131156378589</div>
        </div>
      </div>
    </div>
    <div class="wf-100 padding-left-14 padding-right-14 margin-top-20">
      <div class="imgbox flex-around">
        <div>
          <div>5</div>
          <div>优惠券</div>
        </div>
        <div class="wrapper column">
          <div>20</div>
          <div>积分</div>
        </div>
      </div>
    </div>
    <div class="wf-100 padding-left-14 padding-right-14 margin-top-10">
      <div class="imgbox flex-between flex-center h-60">
        <div style="line-height:40px" class="imgbox flex-between flex-center">
          <img
            class="icon-26 margin-right-10"
            :src="page.uploadpath + 'resource/' + page.Res.carwashorder"
          />
          <div>洗车订单</div>
        </div>

        <div>
          <img
            class="icon-15"
            :src="page.uploadpath + 'resource/' + page.Res.jiantou"
          />
        </div>
      </div>
      <div class="imgbox flex-between flex-center h-60">
        <div style="line-height:40px" class="imgbox flex-between flex-center">
          <img
            class="icon-26 margin-right-10"
            :src="page.uploadpath + 'resource/' + page.Res.purchasedpackage"
          />
          <div>已购套餐</div>
        </div>

        <div>
          <img
            class="icon-15"
            :src="page.uploadpath + 'resource/' + page.Res.jiantou"
          />
        </div>
      </div>
      <div class="imgbox flex-between flex-center h-60">
        <div style="line-height:40px" class="imgbox flex-between flex-center">
          <img
            class="icon-26 margin-right-10"
            :src="page.uploadpath + 'resource/' + page.Res.carwashtutorial"
          />
          <div>洗车教程</div>
        </div>

        <div>
          <img
            class="icon-15"
            :src="page.uploadpath + 'resource/' + page.Res.jiantou"
          />
        </div>
      </div>
      <div class="imgbox flex-between flex-center h-60">
        <div style="line-height:40px" class="imgbox flex-between flex-center">
          <img
            class="icon-26 margin-right-10"
            :src="page.uploadpath + 'resource/' + page.Res.contactcustomerservice"
          />
          <div>联系客服</div>
        </div>
        <div>
          <img
            class="icon-15"
            :src="page.uploadpath + 'resource/' + page.Res.jiantou"
          />
        </div>
      </div>
      <div class="imgbox flex-between flex-center h-60">
        <div style="line-height:40px" class="imgbox flex-between flex-center">
          <img
            class="icon-26 margin-right-10"
            :src="page.uploadpath + 'resource/' + page.Res.helpinfo"
          />
          <div>帮助信息</div>
        </div>
        <div>
          <img
            class="icon-15"
            :src="page.uploadpath + 'resource/' + page.Res.jiantou"
          />
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