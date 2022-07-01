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
let kfshow = ref(false);

PageHelper.Init(page, () => {});

let carwashplacelist = ref([]);
HttpHelper.Post("carwash/carwashplacelist", {}).then((Res) => {
  console.log(Res, "11");
  carwashplacelist.value = Res;
});

PageHelper.LoginAuth(page, () => {});
// 授权页面点击

// var shouquan = () => {
//   PageHelper.LoginAuth(page, () => {});

//   if (page.value.Memberinfo.touxiang != "B") {
//     show.value = 1;
//     wx.miniProgram.navigateTo({ url: "/pages/login/login?type=A" });
//   }
//   // alert(page.value.Memberinfo.shoujisq)
//   if (
//     page.value.Memberinfo.shoujisq != "B" &&
//     page.value.Memberinfo.touxiang == "B"
//   ) {
//     show.value = 2;
//     wx.miniProgram.navigateTo({ url: "/pages/login/login?type=B" });
//   }
// };
// let show = ref(0);
// let timer = setInterval(() => {

//   wancheng();
// }, 1000);

// var wancheng = () => {
//   if (page.value.Memberinfo == null) {
//     PageHelper.LoginAuth(page, () => {});
//     return;
//   }
//   if (show.value == 1 && page.value.Memberinfo.touxiang != "B") {
//     PageHelper.LoginAuth(page, () => {});
//   }

//   if (show.value == 2 && page.value.Memberinfo.shoujisq != "B") {
//     PageHelper.LoginAuth(page, () => {});
//   }

//   if (
//     page.value.Memberinfo.shoujisq == "B" &&
//     page.value.Memberinfo.touxiang == "B"
//   ) {
//     clearInterval(timer);
//   }
// };
let yhnum = ref({});
HttpHelper.Post("carwash/couponorderlist", { yhstatus: "A" }).then((res) => {
  console.log(res, "res");
  yhnum.value = res.length;
});
// 联系客服
var lianxikf = () => {
  kfshow.value = true;
};
var guanbi = () => {
  kfshow.value = false;
};

// 跳转
var carwashcourse = (e) => {
  router.push("/carwashcourse");
};
var jifen = (e) => {
  router.push("/mypoints");
};
var myself = (e) => {
  router.push("/myselef");
};
var helpinfo = (e) => {
  router.push("/helpinfo");
};
var deductionbond = (e) => {
  router.push("/deductionbond");
};
var purchasedpackage = (e) => {
  router.push("/purchasedpackage");
};
var carwashorder = (e) => {
  router.push("/carwashorder");
};
var fuzhi = (str) => {
  PageHelper.Copy(str);
};
var fault = (str) => {
  router.push("/fault");
};
</script>

<template>
  <div
    v-if="page.Res != null"
    class="bacc padding-top-25"
    :style="{
      backgroundImage:
        'url(' + page.uploadpath + 'resource/' + page.Res.mybg + ')',
    }"
    style="background-size: 100%; background-repeat: no-repeat"
  >
    <div style="padding-bottom-20">
      <div class="wf-100 padding-left-14 padding-right-14 imgbox flex-between">
        <div class="imgbox flex-star">
          <div class="margin-right-10">
            <img class="icon-55 radius" :src="page.Memberinfo.avatarUrl" />
          </div>
          <div
            class="flex-row column flex-around padding-top-14 padding-bottom-14"
          >
            <div class="name bold">{{ page.Memberinfo.nickName }}</div>
            <div style="line-height: 20px" class="c-7">
              {{ page.Memberinfo.mobile }}
            </div>
          </div>
        </div>
      </div>
      <div class="wf-100 padding-left-14 padding-right-14 margin-top-20">
        <div class="imgbox flex-around f-14">
          <div @click="myself()" class="flex-row">
            <div class="margin-right-10">
              <img
                class="icon-20"
                :src="page.uploadpath + 'resource/' + page.Res.gocar2"
              />
            </div>
            <div class="c-1 line-height-22">车服中心</div>
          </div>
          <div @click="deductionbond()" class="flex-row">
            <div class="margin-right-10">
              <img
                class="icon-20 "
                :src="page.uploadpath + 'resource/' + page.Res.card"
              />
            </div>
            <div class="c-1 line-height-22">洗车券表</div>
          </div>
          <div @click="jifen()" class="flex-row">
            <div class="margin-right-10">
              <img
                class="icon-20"
                :src="page.uploadpath + 'resource/' + page.Res.integral"
              />
            </div>
            <div class="c-1 line-height-22">我的积分</div>
          </div>
        </div>
      </div>
      <div class="w-100f h-40"></div>
    </div>

    <div
      class="wf-100 padding-left-14 padding-right-14 bg-w f-16"
      style="border-radius: 20px 20px 0 0"
    >
      <div
        class="imgbox flex-between flex-center h-60 solid"
        @click="carwashorder()"
      >
        <div style="line-height: 40px" class="imgbox flex-between flex-center">
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
      <div
        class="imgbox flex-between flex-center h-60 solid"
        @click="purchasedpackage()"
      >
        <div style="line-height: 40px" class="imgbox flex-between flex-center">
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
      <div
        class="imgbox flex-between flex-center h-60 solid"
        @click="carwashcourse()"
      >
        <div style="line-height: 40px" class="imgbox flex-between flex-center">
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
      <!-- <div
        class="imgbox flex-between flex-center h-60 solid"
        @click="lianxikf()"
      >
        <div style="line-height: 40px" class="imgbox flex-between flex-center">
          <img
            class="icon-26 margin-right-10"
            :src="
              page.uploadpath + 'resource/' + page.Res.contactcustomerservice
            "
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
      <div
        class="imgbox flex-between flex-center h-60 solid"
        @click="helpinfo()"
      >
        <div style="line-height: 40px" class="imgbox flex-between flex-center">
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
      </div> -->
      <div class="imgbox flex-between flex-center h-60 solid" @click="fault()">
        <div style="line-height: 40px" class="imgbox flex-between flex-center">
          <img
            class="icon-26 margin-right-10"
            :src="page.uploadpath + 'resource/' + page.Res.guzhang"
          />
          <div>故障反馈</div>
        </div>
        <div>
          <img
            class="icon-15"
            :src="page.uploadpath + 'resource/' + page.Res.jiantou"
          />
        </div>
      </div>
    </div>
    <van-overlay :show="kfshow" @click="kfshow = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <div>
            <div class="flex-row">
              <div class="flex-1"></div>
              <img
                :src="page.uploadpath + 'resource/' + page.Res.guianboi"
                class="icon-25"
                @click="guanbi"
              />
            </div>
            <img
              :src="page.uploadpath + 'inst/' + page.Inst.arcode"
              class="icon-220 margin-top-10 margin-left-26 margin-right-26"
            />
            <div class="flex-row margin-top-20">
              <div class="flex-1"></div>
              <div class="f-18 bold c-2 f-18">
                客服微信:{{ page.Inst.wxhao }}
              </div>
              <div
                class="margin-left-10 f-16 c-6"
                @click="fuzhi(page.Inst.wxhao)"
              >
                复制
              </div>
              <div class="flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<style scoped>
.bottom {
  position: fixed;
  bottom: 0;
}
.radius {
  border-radius: 50%;
}
.name {
  height: 16px;
  font-size: 16px;
  font-family: PingFang SC;
  color: #333333;
  line-height: 16px;
}
.num {
  font-size: 20px;
  font-family: DIN;
  font-weight: 500;
  color: #1890fe;
  line-height: 20px;
}
.solid {
  border-bottom: 1px solid #eeeeee;
}
</style>