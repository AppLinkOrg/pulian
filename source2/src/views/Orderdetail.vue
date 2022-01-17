<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";

let page = ref({});
let router = useRouter();
let route = useRoute();

PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});

let orderinfo = ref({});
HttpHelper.Post("order/selectorder", {
  orderno: route.query.orderno,
}).then((res) => {
  console.log(res, "???");
  orderinfo.value = res.return;
  console.log(orderinfo.value, "@@@");
});

var save = (e) => {
  HttpHelper.Post("order/hexiao", {
    orderno: route.query.orderno,
  }).then((res) => {
    if (res.code == "0") {


      HttpHelper.Post("member/info2", {}).then((res2) => {

        console.log(res2);
           
        HttpHelper.Post("order/addjilu", {
          order_id: orderinfo.value.id,
          account_id:res2.id
        }).then((ret) => {
          if (res.code == "0") {
            HttpHelper.Post("order/selectorder", {
              orderno: route.query.orderno,
            }).then((res) => {
              orderinfo.value = res.return;
              Toast("核销成功！");
            });
          }
        });

      });



    } else {
      Toast("核销失败,请重试！");
    }
  });
};
//  OR2022010600000295


let type=ref('');
type.value=route.query.type



</script>



<template>
  <div v-if="page.Res != null">
    <div class="h-100 bg-5">
      <div class="h-30"></div>
      <div class="c-w f-16 bold margin-left-26" v-if="type!='A'">
        {{ orderinfo.hexiao == "A" ? "待核销" : "已核销" }}
      </div>
      <div class="c-w f-16 bold margin-left-26" v-else>
        {{ orderinfo.orderstatus == "B" ? "待核销" :orderinfo.orderstatus == "E"?"退款":orderinfo.orderstatus == "F"?"取消": "已核销" }}
      </div>
      <div
        class="
          margin-left-14 margin-right-14 margin-top-20
          bg-w
          border-radius-9
          padding-15
        "
      >
        <div class="f-15 c-2 bold">服务信息</div>
        <div class="flex-row flex-center margin-top-20">
          <div class="c-2 f-14">{{ orderinfo.service_name }}</div>
          <div class="flex-1"></div>
          <div class="f-9 c-2">¥</div>
          <div class="c-2 f-14">{{ orderinfo.danjia }}</div>
          <div></div>
        </div>


        <div class="flex-row flex-center margin-top-20">
          <div class="c-2 f-14">购买优惠券</div>
          <div class="flex-1"></div>
          <div class="f-9 c-2">¥</div> 
          <div class="c-2 f-14">{{orderinfo.jaige }}</div> 
          <div></div>
        </div>
        <div class="flex-row flex-center margin-top-20" >
          <div class="c-2 f-14">优惠券抵扣</div>
          <div class="flex-1"></div>
          <div class="f-9 c-2">- ¥</div>
          <div v-if="orderinfo.type!='C'" class="c-2 f-14">{{orderinfo.yhsrouce=='C'?0:orderinfo.youhui }}</div>
          <div v-if="orderinfo.type=='C'" class="c-2 f-14">{{orderinfo.danjia }}</div> 
          <div></div>
        </div>
      </div>

      <!--  -->
      <div
        class="
          margin-left-14 margin-right-14 margin-top-10
          bg-w
          border-radius-9
          padding-15
        "
      >
        <div class="f-15 c-2 bold">订单信息</div>
        <div class="flex-row flex-center margin-top-14">
          <div class="c-2 f-12">订单编号：</div>
          <div class="c-1 f-12">{{ orderinfo.orderno }}</div>
        </div>
        <div class="flex-row flex-center margin-top-14">
          <div class="c-2 f-12">支付时间：</div>
          <div class="c-1 f-12">{{ orderinfo.pay_time }}</div>
        </div>
        <div class="flex-row flex-center margin-top-14">
          <div class="c-2 f-12">支付金额：</div>
          <div class="c-1 f-12">¥{{ orderinfo.type=='C'?orderinfo.jaige:orderinfo.totalamount }}</div>
        </div>
        <div class="flex-row flex-center margin-top-14">
          <div class="c-2 f-12">用户手机：</div>
          <div class="c-1 f-12">{{ orderinfo.mobile }}</div>
        </div>
      </div>

      <!--  -->
      <div
        class="position-bottom"
        style="bottom: 20px"
        v-if="orderinfo.hexiao == 'A' && type!='A'"
      >
        <div
          class="
            margin-left-14 margin-right-14
            h-40
            line-height-40
            center
            f-16
            c-w
            bold
            bg-5
            border-radius-20
          "
          @click="save"
        >
          确认核销
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>