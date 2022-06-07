<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
import store from "../State";
import { Utils } from "../Utils";
import BScroll from "better-scroll";

let page = ref({});
let router = useRouter();
let route = useRoute();
let bujilist = ref(null);
let ordr_id = ref(0);
let wanchengt = ref(false);

PageHelper.Init(page, () => {});

let carwashpackagelist = ref([]);
let couponorder = ref([]);

HttpHelper.Post("carwash/carwashpackagelist", {}).then((Res) => {
  HttpHelper.Post("carwash/couponorderlist", { yhstatus: "A" }).then((res) => {
    couponorder.value = res;

    Res.sort((a, b) => a.price - b.price);
    console.log(Res, "11");
    carwashpackagelist.value = Res;
    for (let i = 0; i < carwashpackagelist.value.length; i++) {
      carwashpackagelist.value[i].isyh = false;
      for (let j = 0; j < res.length; j++) {
        if (carwashpackagelist.value[i].price >= res[j].manmoney) {
          carwashpackagelist.value[i].isyh = true;
          break;
        }
      }
    }
  });
});
//优惠券

PageHelper.LoginAuth(page, () => {
  liebiao();
});

// 选择套餐
var package_id = ref({});
var price = ref({});
var synopsis = ref({});
var rule = ref({});
var selectpackage = (e) => {
  console.log(e.id);
  package_id.value = e.id;
  price.value = e.price;
  synopsis.value = e.synopsis;
  rule.value = e.rule;
};
//创建一个新实例 并且 对class为wrapper对象 实现了一个纵向可点击的滚动效果

//支付
var payorder = () => {
  HttpHelper.Post("carwash/packageorder", {
    package_id: package_id.value,
    amount: price.value,
    synopsis: synopsis.value,
    rule: rule.value,
  }).then((res) => {
    let viewer = window.navigator.userAgent.toLowerCase();

    if (viewer.match(/MicroMessenger/i) == "micromessenger") {
      wx.miniProgram.getEnv((resrnv) => {
        ordr_id.value = res.return;
        wanchengt.value = false;
        if (resrnv.miniprogram) {
          // 小程序内部
          if (res.code == 0) {
            console.log("提交成功跳转支付");
            //  ordr_id.value=res.return
            //  wanchengt.value=false
            wx.miniProgram.navigateTo({
              url: "/pages/pay/pay?id=" + res.return + "&type=" + "P",
            });
          }
        } else {
          // 微信浏览器
          //  prepay5
          // prepay7
          HttpHelper.Post("wechat/packageorder", {
            id: res.return,
          }).then((payret) => {
            console.log(payret, "payret");

            WeixinJSBridge.invoke("getBrandWCPayRequest", payret, (ress) => {
              //  alert(JSON.stringify(ress))
              if (ress.err_msg == "get_brand_wcpay_request:ok") {
                Toast("支付成功");
                // router.go(-1)
              }
            });
          });
        }
      });
    }
  });
};

// 跳转
var personalcenter = (e) => {
  router.push("/personalcenter");
};
</script>

<template>
  <div class="bg-10 h-m100 wf-100" v-if="page.Res != null">
    <div class="h-14 bg-10 wf-100"></div>

    <div class="bg-w margin-left-14 margin-right-14 padding-top-10">
      <div class="h-38 line-height-38 f-16 bold margin-left-14">
        请选购洗车套餐
      </div>
      <div class="bg-w padding-left-14 padding-right-14 padding-top-10">
        <div
          id="washcard"
          v-for="(item, index) in carwashpackagelist"
          :class="{ active: item.id == package_id }"
          :key="index"
          @click="selectpackage(item)"
        >
          <div class="imgbox flex-between price">
            <div class="f-16 bold">{{ item.synopsis }}</div>
            <div class="price2">
              <span style="font-size: 15px">¥</span>{{ item.price }}
            </div>
          </div>
          <div class="imgbox flex-between price">
            <div>{{ item.rule }}</div>
            <div v-if="item.isyh" class="isyh">（您有抵扣券可用）</div>
            <div v-else class="isyh">（暂无抵扣劵）</div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="
        bg-w
        margin-left-14 margin-right-14
        padding-top-10 padding-left-14 padding-right-14
      "
    >
      <div class="imgbox flex-between">
        <div>自助5元洗车套餐1次</div>
        <div>¥ 5</div>
      </div>
      <div class="imgbox flex-between">
        <div>全城通用 一年有效</div>
        <div>¥ 48</div>
      </div>
    </div>
    <div class="h-14 wf-100"></div>
    <div
      class="
        bottom
        imgbox
        flex-between
        wf-100
        padding-left-14 padding-right-14
        bg-w
      "
    >
      <div class="">
        <div>{{ price }}</div>
        <div>222</div>
      </div>
      <div class="but" @click="payorder()">立即支付</div>
    </div>
  </div>
</template>
<style scoped>
.bottom {
  position: fixed;
  bottom: 0;
  padding-bottom: 10px;
  padding-top: 10px;
}
.but {
  width: 150px;
  height: 38px;
  background-color: #fc4b44;
  border-radius: 5px 15px 5px 15px;
  line-height: 38px;
  text-align: center;
  font-size: 14px;
  color: #ffffff;
}
#washcard {
  height: 80px;
  border: 1px solid #eeeeee;
  border-radius: 10px;
  margin-bottom: 14px;
  padding-left: 14px;
  padding-right: 14px;
}
.price {
  height: 40px;
  line-height: 40px;
}
.active {
  border: 1px solid #1890fe !important;
}
.price2 {
  width: 55px;
  font-size: 30px;
  font-family: DIN;
  font-weight: 500;
  color: #1890fe;
}
.isyh {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #fb6260;
  line-height: 48px;
}
</style>