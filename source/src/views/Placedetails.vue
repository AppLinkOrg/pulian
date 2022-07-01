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

PageHelper.Init(page, () => {});
console.log(route.query.id, "666");
let placedetails = ref({});
HttpHelper.Post("carwash/placedetails", {
  id: route.query.id,
  lat: route.query.lat2,
  lng: route.query.lng2,
}).then((Res) => {
  placedetails.value = Res;
  console.log(placedetails, "666");
});

PageHelper.LoginAuth(page, () => {
  liebiao();
});

var openarea = (e) => {
  let latstor = route.query.lat;
  let lngstor = route.query.lng;
  let name = e;
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
    <div class="bg-10 padding-15">
      <div class="bg-w padding-15 border-radius-10 margin-bottom-10">
        <div class="margin-bottom-10 f-16 bold c-2">
          {{ placedetails.name }}
        </div>
        <div class="margin-bottom-10 f-12 c-7">
          {{ placedetails.address }}
        </div>
        <div class="margin-bottom-10 imgbox">
          <img
            class="icon-15 margin-right-5"
            :src="page.uploadpath + 'resource/' + page.Res.distance"
          />
          <div
            v-if="placedetails.distance < 1000"
            class="line-height-15 c-1 f-12"
          >
            {{ placedetails.distance }}m
          </div>
          <div class="line-height-15 c-1 f-12" v-else>
            {{ Math.floor(placedetails.distance / 1000) }}km
          </div>
          <img
            class="icon-15 margin-left-30 margin-right-5"
            :src="page.uploadpath + 'resource/' + page.Res.timeslot"
          />
          <div class="line-height-15">{{ placedetails.timeslot }}</div>
        </div>
        <div class="flex-row flex-between f-12">
          <div class="flex-row">
            <div class="shebei">{{ placedetails.jqstatus.zaixian }}台设备</div>
            <div class="status" style="background-color: #01be6c">空闲</div>
          </div>
          <div class="flex-row">
            <div class="shebei">{{ placedetails.jqstatus.gongzuo }}台设备</div>
            <div class="status" style="background-color: #fac601">忙碌</div>
          </div>
          <div class="flex-row">
            <div class="shebei">{{ placedetails.jqstatus.lixian }}台设备</div>
            <div class="status" style="background-color: #ed0e3d">维修</div>
          </div>
        </div>
      </div>
      <div class="bg-w border-radius-10">
        <div
          class="htmlimg padding-15 border-radius-10"
          v-html="Utils.HtmlDecode(placedetails.content)"
        ></div>
      </div>
      <div
        class="bottom wrapper margin-top-10"
        @click="openarea(placedetails.address)"
      >
        <img
          class="icon-17"
          :src="page.uploadpath + 'resource/' + page.Res.wdaohang"
        />
        <div>前往洗车点</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.bottom {
  height: 44px;
  background: #409eff;
  border-radius: 22px;
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.status {
  width: 30px;
  height: 16px;
  line-height: 16px;
  background: #ed0e3d;
  border-radius: 8px;
  font-size: 10px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
}
.shebei {
  height: 16px;
  line-height: 16px;
  margin-right: 8px;
}
</style>