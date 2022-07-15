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
let ordr_id = ref({});
let wanchengt = ref(false);
let yhprice = ref({});
var package_id = ref([]);
var price = ref({});
var synopsis = ref({});
var rule = ref({});
var yh_id = ref({});
var shuoming_id = ref({});
var cur_id = ref({});
var valid = ref({});
var show = ref(false);
var shuoming = ref(false);
PageHelper.Init(page, () => {});

let carwashpackagelist = ref([]);
let couponorder = ref([]);

HttpHelper.Post("carwash/carwashpackagelist", {}).then(Res => {
  yhprice.value = 0;
  ordr_id.value = 0;
  price.value = 0;
  HttpHelper.Post("carwash/couponorderlist", { yhstatus: "A" }).then(res => {
    couponorder.value = res;
    res.sort((a, b) => b.jainshao - a.jainshao);
    Res.sort((a, b) => a.price - b.price);
    package_id.value = Res[0].id;
    console.log(res, "zzz");
    synopsis.value = Res[0].synopsis;
    valid.value = Res[0].valid;
    rule.value = Res[0].rule;
    console.log(Res, "11");
    carwashpackagelist.value = Res;
    for (let i = 0; i < carwashpackagelist.value.length; i++) {
      carwashpackagelist.value[i].isyh = false;
      carwashpackagelist.value[i].yh = 0;
      for (let j = 0; j < res.length; j++) {
        if (carwashpackagelist.value[i].price * 1 >= res[j].manmoney * 1) {
          console.log(j, "jjjj");
          carwashpackagelist.value[i].isyh = true;
          carwashpackagelist.value[i].yh = res[j].jainshao;
          console.log(carwashpackagelist.value[i].yh, "zzz");
          console.log(carwashpackagelist.value[i].price * 1, "zzz");
          console.log(res[j].manmoney * 1, "zzz");
          j = res.length;
        }
      }
    }
    selectpackage(Res[0]);
  });
});
//优惠券

PageHelper.LoginAuth(page, () => {});

// 选择套餐

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
  valid.value = e.valid;
};
//创建一个新实例 并且 对class为wrapper对象 实现了一个纵向可点击的滚动效果

//支付
var payorder = () => {
  console.log(price.value, "xxx", yhprice.value);

  if (price.value == yhprice.value && price.value !=0) {
    HttpHelper.Post("carwash/packageorder2", {
      package_id: package_id.value,
      amount: price.value - yhprice.value,
      synopsis: synopsis.value,
      rule: rule.value,
      couponorder_id: yh_id.value,
      valid: valid.value,
      taocanprice:price.value
    }).then(res => {
      if (res.code == 0) {
        router.push("/carwashtcpaysucces?type=" + "B");
      } else {
        Toast(res.errMsg);
      }
    });
  } else {
    HttpHelper.Post("carwash/packageorder", {
      package_id: package_id.value,
      amount: price.value - yhprice.value,
      synopsis: synopsis.value,
      rule: rule.value,
      couponorder_id: yh_id.value,
      valid: valid.value,
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
                url: "/pages/pay/pay?id=" + res.return + "&type=" + "Q"
              });
            }
          } else {
            // 微信浏览器
            //  prepay5
            // prepay7
            HttpHelper.Post("wechat/packageorder", {
              id: res.return
            }).then(payret => {
              WeixinJSBridge.invoke("getBrandWCPayRequest", payret, ress => {
                //  alert(JSON.stringify(ress))
                if (ress.err_msg == "get_brand_wcpay_request:ok") {
                  Toast("支付成功");
                  router.push("/carwashtcpaysucces?type=" + "B");
                }
              });
            });
          }
        });
      }
    });
  }
};
var selectyh = e => {
  cur_id.value = e.id;
  show.value = true;
  console.log("444");
};
var close = e => {
  show.value = false;
};
var isshow = e => {
  shuoming_id.value = e.id;
  shuoming.value = !shuoming.value;
  console.log(isshow.value);
};
// 跳转
var personalcenter = e => {
  router.push("/personalcenter");
};
var usecard = e => {
  console.log(e.manmoney);

  if (e.manmoney * 1 > price.value * 1 || e.jainshao > price) {
    Toast("该优惠券不可用");
    return;
  }
  yh_id.value = e.id;
  yhprice.value = e.jainshao;
  show.value = false;
};
</script>

<template>
  <div class="bg-10 pages wf-100" v-if="page.Res != null">
    <div class="h-14 bg-10 wf-100"></div>

    <div class="bg-w margin-left-14 margin-right-14 padding-top-10 border-radius-10">
      <div class="h-38 line-height-38 f-16 bold margin-left-14">请选购洗车套餐</div>
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
      </div>
      <div class="wf-100 h-14"></div>
    </div>
    <div
      class="bg-w margin-left-14 margin-right-14 margin-top-14 padding-top-10 padding-15 border-radius-10"
    >
      <div class="imgbox flex-between">
        <div class="line-height-18 f-14 c-7">使用劵</div>
        <div class="line-height-18 f-16 c-5 bold">-¥{{ yhprice }}</div>
      </div>
      <div class="imgbox flex-between margin-top-14">
        <div class="f-14 c-7">订单总价</div>
        <div class="f-16 bold">¥{{ price }}</div>
      </div>
    </div>
    <div class="h-1 wf-100"></div>
    <div class="bottom imgbox flex-between wf-100 padding-left-14 padding-right-14 bg-w">
      <div class>
        <div class="amount">
          <span style="font-size:12px">¥</span>
          {{ price - yhprice }}
        </div>
        <div class="f-12 c-7">已优惠¥{{ yhprice }}</div>
      </div>
      <div class="but" @click="payorder()">立即支付</div>
    </div>
  </div>
  <div v-if="show" class="show">
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
.active {
  color: #1890fe;
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