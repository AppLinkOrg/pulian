<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";

let page = ref({});
PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});

let router = useRouter();
let route = useRoute();
let servicepricedetail = ref({});
let num = ref(1);
let phone = ref("");
let sqshow = ref(false);

let ordr_id = ref(0);
let wanchengt = ref(false);
// 判断服务支付情况
let timer = setInterval(() => {
  //需要定时执行的代码
  wancheng();
}, 1000);

var wancheng = () => {
  if (ordr_id.value > 0) {
    HttpHelper.Post("order/orderdetail", { id: ordr_id.value }).then((Res) => {
      if (wanchengt.value != false) {
        clearInterval(timer);
      }
      if (Res.orderstatus == "B" && wanchengt.value == false) {
        console.log("进来哦了");
        wanchengt.value = true;
        router.push("/Paysuccess?id=" + ordr_id.value);
      }
    });
  }
};

// 服务价格设置详情
HttpHelper.Post("serviceprice/servicepricelist", { id: route.query.id }).then(
  (res) => {
    servicepricedetail.value = res;
    youhuij();
  }
);

// 数量加一
var jia = () => {
  num.value = num.value + 1;
  console.log("nnum", num);
};
// 数量减一
var jian = () => {
  if (num.value > 1) {
    num.value = num.value - 1;
  } else {
  }

  console.log("nnum", num);
};

// 支付  提交订单
var zhifu = () => {
  PageHelper.LoginAuth(page, () => {});
  // if (phone.value.length==0) {
  //      Toast('请输入手机号');
  //      return;
  // }

  // if (phone.value.length!=11) {
  //      Toast('手机格式不正确');
  //       return;
  // }
  // 判断用户是否授权微信
  //      if (page.value.Memberinfo.touxiang !='B' || page.value.Memberinfo.shoujisq !='B' ) {
  //        sqshow.value=true
  //          return
  // }

  // couponorder_id
  // mobile:phone.value

  let viewer = window.navigator.userAgent.toLowerCase();
  var mobile2 = "";
  if (page.value.Memberinfo.mobile == "") {
    mobile2 = phone.value;
  } else {
    mobile2 = page.value.Memberinfo.mobile;
  }

  // phone
  if (type.value == "A") {
    HttpHelper.Post("order/creatorder", {
      mobile: mobile2,
      serviceprice_id: route.query.id,
      num: num.value,
      couponlist_id: route.query.couponlist_id,
      gou_type: type.value,
    }).then((res) => {
      console.log(123);
      console.log(res);
      if (res.code == 0) {
        // 判断用户支付的价格是否等于  0
        if (totle.value == 0) {
          HttpHelper.Post("order/creatorder2", { id: res.return }).then(
            (orderes) => {
              if (orderes.code == 0) {
                ordr_id.value = res.return;
              } else {
                Toast(orderes.return);
              }
            }
          );
          return;
        }

        // router.push('/Paysuccess?id='+res.return);

        if (viewer.match(/MicroMessenger/i) == "micromessenger") {
          wx.miniProgram.getEnv((resrnv) => {
            if (resrnv.miniprogram) {
              ordr_id.value = res.return;
              wx.miniProgram.navigateTo({
                url: "/pages/pay/pay?id=" + res.return + "&type=A",
              });
            } else {
              // 微信浏览器
              HttpHelper.Post("wechat/prepay6", {
                id: res.return,
                types: "A",
              }).then((payret) => {
                console.log(payret, "payret");

                WeixinJSBridge.invoke(
                  "getBrandWCPayRequest",
                  payret,
                  (ress) => {
                    //  alert(JSON.stringify(ress))
                    if (ress.err_msg == "get_brand_wcpay_request:ok") {
                      Toast("支付成功");
                      // router.go(-1)
                    }
                  }
                );
              });
            }
          });
        }
      } else {
        Toast(res.return);
      }
    });
  } else {
    HttpHelper.Post("order/creatorder", {
      mobile: mobile2,
      serviceprice_id: route.query.id,
      num: num.value,
      couponorder_id: route.query.couponlist_id,
      gou_type: type.value,
    }).then((res) => {
      console.log(123);
      console.log(res);
      if (res.code == 0) {
        // 判断用户支付的价格是否等于  0
        if (totle.value == 0) {
          HttpHelper.Post("order/creatorder2", { id: res.return }).then(
            (orderes) => {
              if (orderes.code == 0) {
                ordr_id.value = res.return;
              } else {
                Toast(orderes.return);
              }
            }
          );
          return;
        }

        //     ordr_id.value=res.return
        // wx.miniProgram.navigateTo({url: '/pages/pay/pay?id='+res.return+'&type=A'});

        // router.push('/Paysuccess?id='+res.return);

        if (viewer.match(/MicroMessenger/i) == "micromessenger") {
          wx.miniProgram.getEnv((resrnv) => {
            if (resrnv.miniprogram) {
              ordr_id.value = res.return;
              wx.miniProgram.navigateTo({
                url: "/pages/pay/pay?id=" + res.return + "&type=A",
              });
            } else {
              // 微信浏览器
              HttpHelper.Post("wechat/prepay6", {
                id: res.return,
                types: "A",
              }).then((payret) => {
                console.log(payret, "payret");

                WeixinJSBridge.invoke(
                  "getBrandWCPayRequest",
                  payret,
                  (ress) => {
                    //  alert(JSON.stringify(ress))
                    if (ress.err_msg == "get_brand_wcpay_request:ok") {
                      Toast("支付成功");
                      // router.go(-1)
                    }
                  }
                );
              });
            }
          });
        }
      } else {
        Toast(res.return);
      }
    });
  }
};

let type = ref("");
type.value = route.query.type;

// 优惠卷详情
let coupondetail = ref(null);
var youhuij = () => {
  if (type.value == "A") {
    HttpHelper.Post("coupon/coupondetail", {
      id: route.query.couponlist_id,
    }).then((res) => {
      coupondetail.value = res;
      zuihou();
    });
  } else {
    HttpHelper.Post("coupon/coupondetail2", {
      id: route.query.couponlist_id,
    }).then((res) => {
      coupondetail.value = res;
      zuihou2();
    });
  }
};

// 最后的价格
let totle = ref(0);
var zuihou = () => {
  var servicepricedetail_price = servicepricedetail.value.originalprice;

  if (route.query.couponlist_id == 0) {
    totle.value = servicepricedetail_price;
    return;
  }

  var coupondetail_price = coupondetail.value.price;
  var toto_price = 0;

  if (coupondetail.value.type == "A") {
    // 立减券
    toto_price =
      servicepricedetail_price * 1 -
      coupondetail.value.jainshao * 1 +
      coupondetail_price * 1;
  }
  if (coupondetail.value.type == "B") {
    //  抵扣券
    // toto_price=servicepricedetail_price*coupondetail.value.zhekou*0.01+coupondetail_price*1
    toto_price =
      servicepricedetail_price * 1 -
      coupondetail.value.jainshao * 1 +
      coupondetail_price * 1;
  }
  if (coupondetail.value.type == "C") {
    // 补给券
    toto_price = coupondetail_price;
  }
  toto_price = toto_price * 1;
  totle.value = toto_price.toFixed(2);
};

let zhekou_rice = ref(0);

var zuihou2 = () => {
  var servicepricedetail_price = servicepricedetail.value.originalprice;

  if (route.query.couponlist_id == 0) {
    totle.value = servicepricedetail_price;
    return;
  }

  var coupondetail_price = coupondetail.value.price;
  var toto_price = 0;
  if (coupondetail.value.type == "A") {
    // 立减券
    toto_price = servicepricedetail_price * 1 - coupondetail.value.jainshao * 1;
    // console.log(servicepricedetail_price*1,coupondetail.value.jainshao*1,coupondetail_price*1);
  }
  if (coupondetail.value.type == "B") {
    //  抵扣券
    // toto_price=servicepricedetail_price*coupondetail.value.zhekou*0.01
    toto_price = servicepricedetail_price * 1 - coupondetail.value.jainshao * 1;
    // zhekou_rice.value=(servicepricedetail_price-toto_price).toFixed(2)
  }
  if (coupondetail.value.type == "C") {
    // 补给券
    toto_price = 0;
  }
  toto_price = toto_price * 1;
  totle.value = toto_price.toFixed(2);
};

// confirm 确认时间
var confirm = () => {
  // 判断用户是否授权微信
  if (page.value.Memberinfo.touxiang != "B") {
    wx.miniProgram.navigateTo({ url: "/pages/login/login?type=A" });
    return;
  }
  // alert(page.value.Memberinfo.shoujisq)
  if (
    page.value.Memberinfo.shoujisq != "B" &&
    page.value.Memberinfo.touxiang == "B"
  ) {
    wx.miniProgram.navigateTo({ url: "/pages/login/login?type=B" });
    return;
  }
};

// cancel 取消时间
var cancel = () => {
  sqshow.value = false;
};
</script>

<template>
  <div v-if="page.Res!=null && page.Memberinfo!=null">
    <div class="h-200 bg-5"></div>

    <!-- <div style="margin-top:-115px"></div> -->
    <div class="margin-top-f110"></div>

    <div class="margin-left-14 margin-right-14 bg-w border-radius-5 padding-15">
      <div class="bold f-15 c-2">服务信息</div>
      <div class="flex-row flex-center margin-top-20">
        <div class="f-14 c-1 ">{{servicepricedetail.service_name}}</div>
        <div class="flex-1"></div>
        <div class="f-9 c-2">¥</div>
        <div class="f-14 c-2">{{servicepricedetail.originalprice}}</div>
      </div>
      <!-- <div class="flex-row flex-center margin-top-15" >
              <div class="c-2 f-14">数量</div>
              <div class="flex-1"></div>
              <img
          :src="page.uploadpath + 'resource/' + page.Res.jain"
          class="icon-23"
          @click="jian"
        />
      
              <div class="f-13 c-1 margin-left-14 margin-right-14">{{num}}</div>
                 <img
          :src="page.uploadpath + 'resource/' + page.Res.jia"
          class="icon-23"
          @click="jia"
        />
          </div> -->
    </div>
    <div class="margin-top-10"></div>
    <div class="margin-left-14 margin-right-14 bg-w border-radius-5 padding-15">
      <div
        class="flex-row flex-center"
        v-if="coupondetail !=null"
      >
        <div class=" f-15 c-2">使用券</div>
        <div class="flex-1"></div>
        <div class="c-3 f-9">-¥</div>
        <!-- zhekou_rice -->
        <div class="f-14 c-3">{{coupondetail.type=='C'?servicepricedetail.originalprice:coupondetail.jainshao}}</div>
        <img
          :src="page.uploadpath + 'resource/' + page.Res.youjian"
          class="icon-10"
        />

      </div>
      <div class="flex-row flex-center margin-top-20">
        <div class="f-14 c-1 ">订单总价</div>
        <div class="flex-1"></div>
        <div class="f-9 c-2">¥</div>
        <div class="f-14 c-2">{{totle}}</div>
      </div>
      <div
        class="flex-row flex-center margin-top-20"
        v-if="page.Memberinfo.mobile=='' && page.Memberinfo!=null"
      >
        <div class="f-14 c-1 ">手机号码</div>
        <input
          type="text"
          placeholder="请输入您的手机号码"
          class="right f-12 c-2 flex-1"
          v-model="phone"
          maxlength="11"
        >
      </div>
    </div>
    <div class="margin-top-10"></div>
    <div class="margin-left-14 margin-right-14 bg-w border-radius-5 padding-15">
      <div class=" f-15 c-2 bold">支付方式</div>
      <div class="flex-row flex-center margin-top-16">
        <img
          :src="page.uploadpath + 'resource/' + page.Res.weix"
          class="icon-26"
        />
        <div class="f-14 c-2 margin-left-4">微信支付</div>
        <div class="flex-1"></div>
        <img
          :src="page.uploadpath + 'resource/' + page.Res.wanchegn"
          class="icon-18"
        />
      </div>
    </div>

    <div class="position-bottom bg-w">
      <div class="flex-row flex-center h-50 margin-left-14 margin-right-14">
        <div>
          <div class="flex-row flex-center">
            <div class="f-12 c-5">¥</div>
            <div class="f-24 c-5">{{totle}}</div>
          </div>

          <div
            class="margin-top-4 c-1 f-12"
            v-if="coupondetail!=null"
          >已优惠¥{{coupondetail.type=='C'?servicepricedetail.originalprice:coupondetail.jainshao}}</div>
          <div
            class="margin-top-4 c-1 f-12"
            v-else
          >已优惠¥0</div>

        </div>
        <div class="flex-1"></div>
        <div
          class="h-38 line-height-38 c-w bold f-14 bg-3 "
          style="padding:0 48px;border-radius: 5px 15px 5px 15px;"
          @click="zhifu"
        >立即支付</div>
      </div>
    </div>

    <!--  -->

    <van-dialog
      v-model:show="sqshow"
      title="授权"
      show-cancel-button
      @confirm="confirm"
      @cancel="cancel"
    >
      <div
        class="c-2 f-14 bold center padding-15"
        v-if="page.Memberinfo.touxiang !='B'"
      >前往授权头像昵称</div>
      <div
        class="c-2 f-14 bold center padding-15"
        v-if="page.Memberinfo.touxiang =='B'&& page.Memberinfo.shoujisq !='B'"
      >前往授权手机号</div>

    </van-dialog>

  </div>
</template>
<style scoped>
</style>