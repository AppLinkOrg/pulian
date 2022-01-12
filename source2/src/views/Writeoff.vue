<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";

// Vue.prototype.wx = wx;

let page = ref({});
let router = useRouter();
let route = useRoute();

PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});

let orderdetail = ref({});
HttpHelper.Post("order/orderdetail", { id: 1 }).then((res) => {
  orderdetail.value = res;
});

let orderlist2 = ref([]);
let leix = ref("E");

 
  HttpHelper.Post("member/info2", {}).then((res2) => {
    HttpHelper.Post("order/hexiaojilu", { account_id: res2.id }).then((Res) => {
      if (Res != null) {
        orderlist2.value = Res;
      }
    });
  });
 
 

let orderno = ref("");
// OR2021122400000771

//检查并搜索订单
var tapToSearch = (e) => {
  if (e.keyCode == 13) {
 
    select();
  }
};
// OR2022011100001912
var select = () =>{
     HttpHelper.Post("member/info2", {}).then((res2) => {
    HttpHelper.Post("order/selectmyorder", { orderno: orderno.value,store_id:res2.store_id }).then((Res) => {
      if (Res.code==0) {
         router.push("/Orderdetail?orderno=" + orderno.value);
      }else{
          Toast("该订单不属于本商户！");
      }
    });
  });
}

// let code = ref("");  
var bindscanQRCode = (e) => {
  console.log("！！！！！");
//   alert("1111111");
  PageHelper.loadwechatconfig(() => {
    // alert("loadwechatconfig");
    wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: function (res) {  
        orderno.value = res.resultStr; // 当needResult 为 1 时，扫码返回的结果  
        select();
      },
    });
  });
};

var daohang = () => {
  let latstor = orderdetail.value.store_lat;
  let lngstor = orderdetail.value.store_lng;
  let name = orderdetail.value.store_address;
  // alert(latstor)
  var json = { latitude: latstor * 1, longitude: lngstor * 1, scale: 18, name };

  PageHelper.loadwechatconfig(() => {
    // alert("loadwechatconfig");
    wx.openLocation(json);
  });
};
</script>

<template>
  <div v-if="page.Res != null">
    <van-sticky>
      <div
        class="h-50 flex-row flex-center bg-w padding-left-14 padding-right-14"
      >
   
        <input
          type="text"
          class="h-30 bg-1 border-radius-15 center c-2 f-12"
          placeholder="请输入核销码"
          @keyup="tapToSearch"
          v-model="orderno"
        />

        <img
          :src="page.uploadpath + 'resource/' + page.Res.saomiao3"
          class="icon-25 margin-left-26"
          @click="bindscanQRCode"
        />
      </div>
    </van-sticky>
   <!-- <div>多少：{{code}}</div> -->
    <div class="c-2 bold f-16 margin-top-15 margin-left-14 margin-bottom-20">
      核销记录
    </div>

    <div class="flex-row flex-center padding-15">
      <div class="c-1 f-14" style="width: 30%">核销时间</div>
      <div class="flex-1 c-1 f-14 center" style="width: 30%">订单编号</div>
      <div class="c-1 f-14 center" style="width: 30%">状态</div>
    </div>

    <div
      class="bg-w flex-row flex-center padding-15"
      v-for="(item, index) in orderlist2"
      :key="index"
    >
      <div class="c-1 f-14" style="width: 30%">{{ item.submit_time }}</div>
      <div class="flex-1 c-2 f-12 center" style="width: 30%">
        {{ item.order_orderno }}
      </div>
      <div class="c-6 f-12 center" style="width: 30%">
        {{ order_hexiao == "A" ? "待核销" : "已核销" }}
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>