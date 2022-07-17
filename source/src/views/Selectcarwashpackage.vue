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
var cur_id = ref({});
var showbox = ref(false);
var shuoming = ref(false);
var shuoming_id = ref({});
PageHelper.Init(page, () => {});
var shouquan = () => {
  PageHelper.LoginAuth(page, () => {});

  if (page.value.Memberinfo.touxiang != "B") {
    show1.value = 1;
    wx.miniProgram.navigateTo({ url: "/pages/login/login?type=A" });
  }
  // alert(page.value.Memberinfo.shoujisq)
  if (
    page.value.Memberinfo.shoujisq != "B" &&
    page.value.Memberinfo.touxiang == "B"
  ) {
    show1.value = 2;
    wx.miniProgram.navigateTo({ url: "/pages/login/login?type=B" });
  }
};
let show1 = ref(0);
let timer = setInterval(() => {
  //需要定时执行的代码
  wancheng();
  shouquan();
}, 1000);

var wancheng = () => {
  if (page.value.Memberinfo == null) {
    PageHelper.LoginAuth(page, () => {});
    return;
  } else {
    console.log(page.value.Memberinfo);
  }
  if (show1.value == 1 && page.value.Memberinfo.touxiang != "B") {
    PageHelper.LoginAuth(page, () => {});
  }

  if (show1.value == 2 && page.value.Memberinfo.shoujisq != "B") {
    PageHelper.LoginAuth(page, () => {});
  }

  if (
    page.value.Memberinfo.shoujisq == "B" &&
    page.value.Memberinfo.touxiang == "B"
  ) {
    clearInterval(timer);
  }
};
let carwashpackagelist = ref([]);
HttpHelper.Post("carwash/carwashpackagelist", {}).then(Res => {
  yhprice.value = 0;
  yh_id.value = 0;
  HttpHelper.Post("carwash/couponorderlist", { yhstatus: "A" }).then(res => {
    res.sort((a, b) => b.jainshao - a.jainshao);
    couponorder.value = res;
    Res.sort((a, b) => a.price - b.price);
    package_id.value = Res[0].id;
    synopsis.value = Res[0].synopsis;
    rule.value = Res[0].rule;
    console.log(Res, "11");
    carwashpackagelist.value = Res;
    for (let i = 0; i < carwashpackagelist.value.length; i++) {
      carwashpackagelist.value[i].isyh = false;
      carwashpackagelist.value[i].yh = 0;
      console.log(i, "iii");
      for (let j = 0; j < res.length; j++) {
        if (carwashpackagelist.value[i].price * 1 >= res[j].manmoney * 1) {
          console.log(j, "jjj");
          carwashpackagelist.value[i].isyh = true;
          // console.log(carwashpackagelist.value[i].isyh);
          // carwashpackagelist.value[i].yh = res[j].jainshao;
          j = res.length;
        }
      }
    }
    selectpackage(Res[0]);
  });
});
let packageorderlist = ref([]);
HttpHelper.Post("carwash/packageorderlist", { zhuangtai: "A" }).then(res => {
  packageorderlist.value = res;
});

var selectpackage = e => {
  console.log(e);
  if (package_id.value != e.id) {
    yh_id.value = -1;
    yhprice.value = 0;
  }
  package_id.value = e.id;
  price.value = e.price;
  synopsis.value = e.synopsis;
  rule.value = e.rule;
  order_id.value = -1;
  //   if (e.isyh) {
  //     let arr = couponorder.value;
  //     console.log(couponorder.value, "arr");
  //     arr.sort((a, b) => b.jainshao - a.jainshao);
  //     for (let i = 0; i < arr.length; i++) {
  //       if (arr[i].manmoney * 1 <= price.value * 1) {
  //         console.log(arr[i].manmoney, "arr");
  //         console.log(price.value, "arr");
  //         console.log(price.value, "arr");
  //         // yh_id.value = arr[i].id;
  //         // yhprice.value = arr[i].jainshao;
  //         i = arr.length;
  //       }
  //     }
  //   }
};

var selectpackage2 = e => {
  console.log(e);
  if (package_id.value != e.id) {
    yh_id.value = -1;
  }
  order_id.value = e.id;
  package_id.value = -1;
  yhprice.value = 0;
  price.value = 0;
};
//上传订单
//支付
var payorder = () => {
  if (price.value != 0) {
    if (price.value == yhprice.value ) {
      HttpHelper.Post("carwash/uploadcarwashorder2", {
        package_id: package_id.value,
        amount: price.value - yhprice.value,
        couponorder_id: yh_id.value,
        tel: page.value.Memberinfo.mobile,
        machine_id: route.query.machine_id,
        taocanprice:price.value
      }).then(res => {
        if (res.code == 0) {
          HttpHelper.Post("carwash/startup", {
            carwashorder_id: res.return,
          }).then(e => {
            
            console.log(e, "666");
            if (e.statusCode == "200" && e.errCode == "0") {
              router.push(
                "/carwashpaysuccess?orderid=" + res.return + "&type=A"
              );
            } else { 
              Toast(e.retMsg);
              router.push(
                "/carwashpaysuccess?orderid=" + res.return + "&type=C"
              );
            }
          });
        }
      });
    } else {
      console.log(page.value.Memberinfo.mobile,'mobile');
      console.log(route.query.machine_id,'route.query.machine_id');
      
      HttpHelper.Post("carwash/uploadcarwashorder", {
        package_id: package_id.value,
        amount: price.value - yhprice.value,
        couponorder_id: yh_id.value,
        tel: page.value.Memberinfo.mobile,
        machine_id: route.query.machine_id,
        taocanprice:price.value
      }).then(res => {
        let viewer = window.navigator.userAgent.toLowerCase();

        if (viewer.match(/MicroMessenger/i) == "micromessenger") {
          wx.miniProgram.getEnv(resrnv => {
            ordr_id.value = res.return;
            wanchengt.value = false;
            if (resrnv.miniprogram) {
              // 小程序内部
              if (res.code == 0) {
                console.log("提交成功跳转支付");
                //  ordr_id.value=res.return
                //  wanchengt.value=false
                wx.miniProgram.navigateTo({
                  url: "/pages/pay/pay?id=" + res.return + "&type=" + "P"
                });
              }
            } else {
              // 微信浏览器
              //  prepay5
              // prepay7
              HttpHelper.Post("wechat/carwash", {
                id: res.return
              }).then(payret => {
                WeixinJSBridge.invoke("getBrandWCPayRequest", payret, ress => {

                  if (ress.err_msg == "get_brand_wcpay_request:ok") {
                    Toast("支付成功");
                    // router.go(-1)
                    HttpHelper.Post("carwash/startup", {
                      carwashorder_id: res.return,
                      machine_id: route.query.machine_id,
                      tel: page.value.Memberinfo.mobile
                    }).then(e => {
                      if (e.statusCode == "200" && e.errCode == "0") {
                        router.push(
                          "/carwashpaysuccess?orderid=" +
                            order_id.value +
                            "&type=A"
                        );
                      } else {
                        Toast(e.retMsg);
                        router.push(
                          "/carwashpaysuccess?orderid=" +
                            order_id.value +
                            "&type=" +
                            "C"
                        );
                      }
                    });
                  }
                });
              });
            }
          });
        }
      });
    }
  } else {
    
    HttpHelper.Post("carwash/startup", {
      packageorder_id: order_id.value,
      machine_id: route.query.machine_id,
      tel: page.value.Memberinfo.mobile
    }).then(e => {
      console.log(e, "666");
      if (e.statusCode == "200" && e.errCode == "0") {
        router.push("/carwashpaysuccess?orderid=" + order_id.value + "&type=A");
      } else {
        Toast(e.retMsg);
        router.push("/carwashpaysuccess?orderid=" + order_id.value + "&type=C");
      }
    });
  }
};
var selectyh = e => {
  cur_id.value = e.id;
  showbox.value = true;
  console.log("444");
};
var close = e => {
  showbox.value = false;
};
var isshow = e => {
  shuoming_id.value = e.id;
  shuoming.value = !shuoming.value;
  console.log(isshow.value);
};
var usecard = e => {
  if (e.manmoney * 1 > price.value * 1 || e.jainshao > price) {
    Toast("该优惠券不可用");
    return;
  }
  yh_id.value = e.id;
  yhprice.value = e.jainshao;
  showbox.value = false;
};


</script>

<template>
  <div class="bg-10 wf-100" v-if="page.Res != null">
    <div class="h-14 bg-10 wf-100"></div>
    <div
      class="bg-w margin-left-14 margin-right-14 padding-top-10 padding-bottom-10 margin-bottom-14 border-radius-10"
    >
      <div class="h-38 line-height-38 f-16 bold margin-left-14">选择已购洗车套餐</div>
      <div class="flex-row scroll-view">
        <div
          class="f-16 bold margin-left-14 padding-10 taocan border-radius-10"
          style="display: inline-block"
          v-for="(item, index) in packageorderlist"
          :key="index"
          :class="{ active: item.id == order_id }"
          @click="selectpackage2(item)"
        >
          <div :class="{ active2: item.id == order_id }">{{ item.synopsis }}</div>
          <div class="margin-top-15 f-14 c-1">{{ item.rule }}</div>
        </div>
      </div>
      <div class="h-14 f-16 bold margin-left-14"></div>
    </div>
    <div
      class="bg-w margin-left-14 margin-right-14 padding-left-14 padding-right-14 padding-top-10 border-radius-10"
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
          <div class="f-16 bold">{{ item.synopsis }}</div>
          <div class="jiage">
            <span style="font-size: 15px">¥</span>
            {{ item.price }}
          </div>
        </div>
        <div class="imgbox flex-between price">
          <div class="f-14 c-1 f-bold">{{ item.rule }}</div>
          <div
            v-if="item.id == cur_id && yh_id != -1"
            @click="selectyh(item)"
            class="isyh"
          >优惠券-{{yhprice}}元</div>
          <div v-else-if="!item.isyh" class="isyh">(暂无抵扣劵)</div>
          <div v-else class="isyh" @click="selectyh(item)">您有优惠券可用</div>
        </div>
      </div>

      <div class="h-4 wf-100"></div>
    </div>
    <div class="margin-left-14 margin-right-14 margin-top-14 bg-w padding-15 border-radius-10">
      <div class="imgbox flex-between">
        <div class="c-1">使用券</div>
        <div class="isyh">-¥{{ yhprice }}</div>
      </div>
      <div class="imgbox flex-between margin-top-10">
        <div class="c-1">订单总价</div>
        <div class="bold f-15" v-if="price != ''">¥{{ price }}</div>
        <div class="bold f-15" v-else>¥0</div>
      </div>
    </div>
    <div class="icon-80 bg-10"></div>
    <div class="bottom imgbox flex-between wf-100 padding-left-14 padding-right-14 bg-w">
      <div class>
        <div class="allprice">
          <span style="font-size: 10px">¥</span>
          {{ price - yhprice }}
        </div>
      </div>
      <div class="but" @click="payorder()">立即支付</div>
    </div>
  </div>
  <div v-if="showbox" class="show">
    <div style="width:100%;height:30vh" @click="close()"></div>
    <div class="bg-w yhlist padding-15">
      <div class="bg-10 order wf-100 padding-top-14">
        <div
          class="bg-w margin-bottom-14 border-radius-10"
          v-for="(item, index) in couponorder"
          :key="index"
        >
          <div class="imgbox shadow">
            <div class="borderleft"></div>
            <div class="padding-10">
              <div class="jian status1">
                <span style="font-size:15px">¥</span>
                {{ item.jainshao }}
              </div>
              <div>满{{item.manmoney}}可用</div>
            </div>
            <div>
              <div class="imgbox flex-between">
                <div class="imgbox zizhu">优惠券(自助专用)</div>
                <div class="btns" @click="usecard(item)">使用</div>
              </div>
              <div class="imgbox margin-top-16">
                <div class="c-7">{{item.star_time+'-'+item.end_time}}</div>
                <div></div>
              </div>
              <div class="imgbox margin-top-16 flex-between">
                <div class="c-7 margin-bottom-14">使用说明</div>
                <div @click="isshow(item)">
                  <img class="icon-12" :src="page.uploadpath + 'resource/' + page.Res.xiajain" />
                </div>
              </div>
            </div>
          </div>
          <div
            class="shuoming margin-top-10 c-7 line-height-19 padding-10 shadow"
            v-if="shuoming&&shuoming_id==item.id"
          >{{item.guize}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.pages {
  height: 94vh;
}
.btns {
  height: 20px;
  line-height: 20px;
  width: 55px;
  background-color: #1890fe;
  text-align: center;
  font-size: 12px;
  margin-top: 18px;
  border-radius: 10px;
  color: #ffffff;
}
.yhlist {
  width: 100%;
  height: 70vh;
  overflow: scroll;
}
.show {
  width: 100%;
  height: 100vh;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  bottom: 0;
}
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
.jiage {
  font-size: 25px;
  font-family: DIN;
  font-weight: 500;
  color: #1890fe;
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
.active2 {
  color: #1890fe;
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
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #fb6260;
}
.allprice {
  font-size: 24px;
  font-family: DIN;
  font-weight: 500;
  color: #fb6260;
}
.jian {
  width: 51px;
  height: 52px;
  font-size: 30px;
  font-family: DIN;
  font-weight: 500;

  line-height: 53px;
}
.status1 {
  color: #1890fe;
}
.status2 {
  color: #666666;
}
.zizhu {
  height: 31px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 53px;
}
.borderleft {
  width: 4px;
  border-radius: 4px 0 0 4px;
  background-color: #1890fe;
  margin-right: 15px;
}
.borderleft2 {
  width: 4px;
  border-radius: 4px 0 0 4px;
  background-color: #666666;
  margin-right: 15px;
}
.shadow {
  box-shadow: 0px 4px 28px 0px rgba(24, 144, 254, 0.12);
}
</style>
