<script setup>
// import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { PageHelper } from "../PageHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
import { Utils } from "../Utils";

let page = ref({});
let router = useRouter();
let route = useRoute();
let show1 = ref(0);
let integral = ref(0);
PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {
  // HttpHelper.Post("integral/selectintegral2", {
  //   tel: page.value.Memberinfo.mobile
  // }).then(Res => {
  //   console.log(Res, "11");
  //   integral.value = Res.integral;
  // });
});

let landdetail = ref({});
// setTimeout(() => {
  
// }, 1000);
HttpHelper.Post("land/landdetail", { id: "1" }).then(res => {
    landdetail.value = res;
});
var shouquan = () => {
  PageHelper.LoginAuth(page, () => {
    if (page.value.Memberinfo.touxiang != "B") {
      show1.value = 1;
      wx.miniProgram.redirectTo({ url: "/pages/login/login?type=A&temp=1" });
      return;
    }
    // alert(page.value.Memberinfo.shoujisq)
    if (
      page.value.Memberinfo.shoujisq != "B" &&
      page.value.Memberinfo.touxiang == "B"
    ) {
      show1.value = 2;
      wx.miniProgram.redirectTo({ url: "/pages/login/login?type=B&temp=1" });
      return;
    }
  });
};


var lingquan = () => {
  if (
    page.value.Memberinfo.shoujisq != "B" ||
    page.value.Memberinfo.touxiang != "B"
  ) {
    shouquan();
  } else {
    if (page.value.Memberinfo.landcard == "B") {
      console.log(page.value.Memberinfo.landcard);
      Toast("该优惠券只能领取一次，您已经领取过了");
    } else {
      HttpHelper.Post("coupon/collectcoupons", {
        shouhuo: "非实物",
        phone: "非实物",
        address: "非实物",
        xianxi: "非实物",
        coupon_id: landdetail.value.coupon_id
      }).then(res => {
        if (res.code == 0) {
          router.push("/deductionbond");
        } else {
          Toast("该优惠券只能领取一次，您已经领取过了");
        }
      });
    }
  }
};
</script>

<template>

  <div @click="lingquan()" class="padding-left-10 padding-right-10">
    <div
      :style="{
        backgroundImage:
          'url(' + page.uploadpath + 'resource/' + page.Res.landimg + ')',
      }"
      style="background-size: 100%; background-repeat: no-repeat"
      class="flex-row column flex-evenly h-110 margin-top-10 padding-left-14 c-w"
    >
      <div class="f-18">{{ page.Memberinfo.mobile }}</div>
      <div class="f-14">您有: {{ page.Memberinfo.jifen }} 积分</div>
    </div>
    <div @click="lingquan()" class="htmlimg" v-html="Utils.HtmlDecode(landdetail.neirong)"></div>
  </div>
</template>
<style scoped>
/deep/ .htmlimg > p {
  margin: 0 !important;
}
/deep/ .htmlimg p > img {
  width: 100% !important;
}

/deep/ .htmlimg p > a > img {
  width: 100% !important;
}

</style>