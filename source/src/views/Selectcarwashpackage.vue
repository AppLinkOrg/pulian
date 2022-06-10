<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { onMounted } from "vue";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
import store from "../State";
import { Utils } from "../Utils";
import { throttle } from "throttle-debounce";
let page = ref({});
let router = useRouter();
let route = useRoute();
let bujilist = ref(null);
let ordr_id = ref(0); //现在购买的套餐
let wanchengt = ref(false);
let yhprice = ref({});
let couponorder = ref([]);
var price = ref({});
var synopsis = ref({});
var rule = ref({});
var yh_id = ref({});
var package_id = ref({});
var order_id = ref(""); //已购套餐
PageHelper.Init(page, () => {});

let carwashpackagelist = ref([]);
HttpHelper.Post("carwash/carwashpackagelist", {}).then((Res) => {
  HttpHelper.Post("carwash/couponorderlist", { yhstatus: "A" }).then((res) => {
    couponorder.value = res;

    Res.sort((a, b) => a.price - b.price);
    package_id.value = Res[0].id;
    price.value = Res[0].price;
    synopsis.value = Res[0].synopsis;
    rule.value = Res[0].rule;
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
    selectpackage(Res[0]);
  });
});
let packageorderlist = ref([]);
HttpHelper.Post("carwash/packageorderlist", { zhuangtai: "B" }).then((res) => {
  packageorderlist.value = res;
});

var selectpackage = (e) => {
  console.log(e.id);
  package_id.value = e.id;
  price.value = e.price;
  synopsis.value = e.synopsis;
  rule.value = e.rule;
  if (e.isyh) {
    let arr = couponorder.value;
    arr.sort((a, b) => b.jainshao - a.jainshao);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].manmoney <= price.value) {
        yh_id.value = arr[i].id;
        yhprice.value = arr[i].jainshao;
        break;
      }
    }
  } else {
    yh_id.value = -1;
    yhprice.value = 0;
  }
  order_id.value = -1;
};

var selectpackage2 = (e) => {
  console.log(e);
  order_id.value = e.id;
  package_id.value = -1;
  yhprice.value = 0;
  price.value = 0;
  package_id.value = -1;
};
//上传订单
//支付
//创建一个新实例 并且 对class为wrapper对象 实现了一个纵向可点击的滚动效果

var payorder = () => {
  if (price.value != 0) {
    HttpHelper.Post("carwash/packageorder", {
      package_id: package_id.value,
      amount: price.value,
      synopsis: synopsis.value,
      rule: rule.value,
      couponorder_id: yh_id.value,
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
                  console.log("ordr_id.value");
                  console.log("order_id.value");
                  HttpHelper.Post("carwash/startup", {
                    order_id: order_id.value,
                  }).then((e) => {
                    router.push("/carwashpaysuccess?orderid=" + order_id.value);
                    if (e.statusCode == "200" && e.errCode == "0") {
                      router.push("/carwashpaysuccess?orderid=" + order_id.value);
                    } else {
                      Toast(retMsg)
                    }
                  });
                  
                }
              });
            });
          }
        });
      }
    });
  } else {
    router.push("/carwashpaysuccess?orderid=" + order_id.value);
  }
};
</script>

<template>
  <div class="bg-10 h-m100 wf-100" v-if="page.Res != null">
    <div class="h-14 bg-10 wf-100"></div>
    <div
      class="
        bg-w
        margin-left-14 margin-right-14
        padding-top-10 padding-bottom-10
        margin-bottom-14
      "
    >
      <div class="h-38 line-height-38 f-16 bold margin-left-14">
        选择已购洗车套餐
      </div>
      <div class="flex-row scroll-view">
        <div
          class="f-16 bold margin-left-14 padding-10 taocan"
          style="display: inline-block"
          v-for="(item, index) in packageorderlist"
          :key="index"
          :class="{ active: item.id == order_id }"
          @click="selectpackage2(item)"
        >
          <div>{{ item.synopsis }}</div>
          <div class="margin-top-15">{{ item.rule }}</div>
        </div>
      </div>
      <div class="h-14 f-16 bold margin-left-14"></div>
    </div>
    <div
      class="
        bg-w
        margin-left-14 margin-right-14
        padding-left-14 padding-right-14 padding-top-10
      "
    >
      <div class="h-38 line-height-38 f-16 bold">请选购洗车套餐</div>
      <div
        class="washcard padding-left-14 padding-right-14"
        v-for="(item, index) in carwashpackagelist"
        :class="{ active: item.id == package_id }"
        :key="index"
        @click="selectpackage(item)"
      >
        <div class="imgbox flex-between price">
          <div>{{ item.synopsis }}</div>
          <div>¥{{ item.price }}</div>
        </div>
        <div class="imgbox flex-between price">
          <div>{{ item.rule }}</div>
          <div v-if="item.isyh" class="isyh">（您有抵扣券可用）</div>
          <div v-else class="isyh">（暂无抵扣劵）</div>
        </div>
      </div>

      <div class="">
        <div class="imgbox flex-between">
          <div>使用券</div>
          <div>-¥{{ yhprice }}</div>
        </div>
        <div class="imgbox flex-between">
          <div>订单总价</div>
          <div v-if="price != ''">¥{{ price }}</div>
          <div v-else>¥0</div>
        </div>
      </div>
      <div class="h-14 wf-100"></div>
    </div>
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
        <div>¥{{ price - yhprice }}</div>
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
.washcard {
  border: 1px solid #eeeeee;
  border-radius: 10px;
  margin-bottom: 14px;
}
.price {
  height: 33px;
  line-height: 33px;
}
.active {
  border: 1px solid #1890fe !important;
}
.taocan {
  border: #eeeeee 1px solid;
}
.scroll-view {
  overflow: hidden;
  white-space: nowrap;
  width: 350px;
  display: -webkit-box;
  overflow-x: scroll;
  overflow-y: hidden;
}
.isyh {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #fb6260;
}
</style>