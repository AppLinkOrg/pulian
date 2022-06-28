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
let yhprice = ref(0);
var package_id = ref([]);
var price = ref({});
var synopsis = ref({});
var rule = ref({});
var yh_id = ref({});
var valid = ref({})
PageHelper.Init(page, () => {});

let carwashpackagelist = ref([]);
let couponorder = ref([]);

HttpHelper.Post("carwash/carwashpackagelist", {}).then((Res) => {
  
  HttpHelper.Post("carwash/couponorderlist", { yhstatus: "A" }).then((res) => {
    couponorder.value = res;
    res.sort((a, b) => b.jainshao - a.jainshao);
    Res.sort((a, b) => a.price - b.price);
    package_id.value=Res[0].id
    console.log(res,'zzz');
    synopsis.value = Res[0].synopsis;
    valid.value = Res[0].valid;
    rule.value = Res[0].rule;
    console.log(Res, "11");
    carwashpackagelist.value = Res;
    for (let i = 0; i < carwashpackagelist.value.length; i++) {
      carwashpackagelist.value[i].isyh = false;
      carwashpackagelist.value[i].yh = 0;
      for (let j = 0; j < res.length; j++) {
        if (carwashpackagelist.value[i].price*1 >= res[j].manmoney*1) {
          console.log(j,'jjjj');
          carwashpackagelist.value[i].isyh = true;
          carwashpackagelist.value[i].yh = res[j].jainshao;
          console.log(carwashpackagelist.value[i].yh,'zzz');
          console.log(carwashpackagelist.value[i].price*1,'zzz');
          console.log(res[j].manmoney*1,'zzz');
          j=res.length
        }
        
      }
      
    }
    selectpackage(Res[0])
  });
});
//优惠券

PageHelper.LoginAuth(page, () => {
});

// 选择套餐


var selectpackage = (e) => {
  console.log(e);
  package_id.value = e.id;
  price.value = e.price;
  synopsis.value = e.synopsis;
  rule.value = e.rule;
  valid.value = e.valid;
  if (e.isyh) {
    let arr = couponorder.value;
    console.log(couponorder.value,'arr');
    arr.sort((a, b) => b.jainshao - a.jainshao);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].manmoney*1 <= price.value*1) {
        console.log(arr[i].manmoney,'arr');
        console.log(price.value,'arr');
        console.log(price.value,'arr');
        yh_id.value = arr[i].id;
        yhprice.value = arr[i].jainshao
        i=arr.length
      }
    }
  }else{
    yh_id.value = -1
    yhprice.value = 0
  }
};
//创建一个新实例 并且 对class为wrapper对象 实现了一个纵向可点击的滚动效果

//支付
var payorder = () => {
  console.log(valid.value,'666');
  HttpHelper.Post("carwash/packageorder", {
    package_id: package_id.value,
    amount: price.value-yhprice.value,
    synopsis: synopsis.value,
    rule: rule.value,
    couponorder_id:yh_id.value,
    valid:valid.value,
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
              url: "/pages/pay/pay?id=" + res.return + "&type=" + "Q",
            });
          }
        } else {
          // 微信浏览器
          //  prepay5
          // prepay7
          HttpHelper.Post("wechat/packageorder", {
            id: res.return,
          }).then((payret) => {

            WeixinJSBridge.invoke("getBrandWCPayRequest", payret, (ress) => {
              //  alert(JSON.stringify(ress))
              if (ress.err_msg == "get_brand_wcpay_request:ok") {
                Toast("支付成功");
                router.push("/carwashpaysuccess?type="  + 'B');
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

    <div
      class="
        bg-w
        margin-left-14 margin-right-14
        padding-top-10
        border-radius-10
      "
    >
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
            <div class="f-14 c-1 f-bold">{{ item.rule }}</div>
            <div v-if="item.isyh" class="isyh">优惠券-{{item.yh}}元</div>
            <div v-else class="isyh">(暂无抵扣劵)</div>
          </div>
        </div>
      </div>
      <div class="wf-100 h-14"></div>
    </div>
    <div
      class="
        bg-w
        margin-left-14 margin-right-14 margin-top-14
        padding-top-10 padding-15
        border-radius-10
      "
    >
      <div class="imgbox flex-between">
        <div class="line-height-18 f-14 c-7">使用劵</div>
        <div class="line-height-18 f-16 c-5 bold">-¥{{ yhprice }}</div>
      </div>
      <div class="imgbox flex-between margin-top-14">
        <div class="f-14 c-7 ">订单总价</div>
        <div class="f-16 bold">¥{{ price }}</div>
      </div>
    </div>
    <div class="h-1 wf-100"></div>
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
        <div class="amount">
          <span style="font-size:12px">¥</span>{{ price - yhprice }}</div>
        <div class="f-12 c-7">已优惠¥{{ yhprice }}</div>
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
  border: 1px solid #eeeeee; 
  border-radius: 10px; 
  margin-bottom: 14px;
  padding: 14px;
}
.active {
  border: 1px solid #1890fe !important;
}
.price2 {
  font-size: 25px;
  font-family: DIN;
  font-weight: 500;
  color: #1890fe;
  line-height: 25px;
}
.isyh {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #fb6260;
}
.amount {
  font-size: 24px;
  font-family: DIN;
  font-weight: 500;
  color: #fb6260;
  line-height: 30px;
}
</style>