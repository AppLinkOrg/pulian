<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
import store from "../State";
import { Utils } from "../Utils";
import { onMounted, reactive, watch } from "vue";
import $ from "jquery";
import Tar from "../components/Tar.vue";

const key = "";
const TMap = window.TMap;
const dataMap = reactive({
  map: "",
  markerLayer: "",
  latitude: 0, //纬度
  lngitude: 0, //经度
});
let page = ref({});
let router = useRouter();
let route = useRoute();
let carwashplacelist = ref([]);
const arr = new Array();
let lat = ref({});
let lng = ref({});
let cameraId = ref(0)//相机id
let isScan = ref(true)
var url = ref(
  "https://apis.map.qq.com/tools/geolocation?key=HN5BZ-FHPK4-6Z2U3-DBEUG-ZHXYV-AQFQV&referer=myapp"
);
PageHelper.Init(page, () => {});


const init = () => {
  let center = new TMap.LatLng(dataMap.latitude, dataMap.lngitude);
  dataMap.map = new TMap.Map(document.getElementById("QQMap"), {
    center: center, //设置地图中心点坐标
    zoom: 17.2, //设置地图缩放级别
  });
};
var getweizhi = () => {
  PageHelper.loadwechatconfig(() => {
    wx.getLocation({
      type: "gcj02",
      success: function (res) {
        console.log(res, "resss");
        var latitude = res.latitude;
        var longitude = res.longitude;
        console.log(latitude, "999999");
        console.log(longitude, "999999");
        lat.value = latitude;
        lng.value = longitude;
        HttpHelper.Post("carwash/carwashplacelist", {
          lng: longitude,
          lat: latitude,
        }).then((Res) => {
          console.log(Res, "11");
          carwashplacelist.value = Res;
        });
        window.localStorage.setItem("latitude", latitude);
        window.localStorage.setItem("longitude", longitude);
        //  alert("success" + JSON.stringify(res));
      },
      fail: function (res) {
        // alert("fail" + JSON.stringify(res));
        console.log("getLocation", "fail" + JSON.stringify(res));
      },
      complete: function (res) {
        console.log("getLocation", "complete" + JSON.stringify(res));
      },
    });
  });
};

var openArea = () => {
  var keys = "HN5BZ-FHPK4-6Z2U3-DBEUG-ZHXYV-AQFQV";
  location.href = `https://apis.map.qq.com/tools/routeplan/eword=${route.query.address}&epointx=${route.query.lng}&epointy=${route.query.lat}&spointx=${lng.value}&spointy=${lat.value}?key=${keys}&referer=myaap`;
};
onMounted(() => {
  if (route.query.address) {
    openArea();
  }
  getweizhi();
});
var easeTo = () => {
  dataMap.map.easeTo({
    zoom: 17.2,
    // rotation: 10,
    pitch: 10,
    adcode: 110101,
    center: new TMap.LatLng(lat.value, lng.value),
  }); //平滑缩放,旋转到指定级别
};
// let MachineList = ref([])
// HttpHelper.Get("CarWash/GetMachineListOfOnlie", {}).then((Res) => {
//   console.log(Res, "MachineList");
//   MachineList.value = Res;
// });

// 跳转

var placedetails = (e) => {
  router.push(
    "/placedetails?id=" +
      e.id +
      "&lat=" +
      e.lat +
      "&lng=" +
      e.lng +
      "&lat2=" +
      lat.value +
      "&lng2=" +
      lng.value
  );
};

</script>

<template>
  <div class="wf-100 h-m100 bg-10" v-if="page.Res != null">



    <div class="bg-10 padding-top-10">
      <div style="background-color: #f7f7f8; margin-bottom: 80px">
        <div
          class="
            bg-w
            margin-left-14 margin-right-14 margin-top-14
            padding-10
            border-radius-10
          "
          v-for="(item, index) in carwashplacelist"
          :key="index"
          @click="placedetails(item)"
        >
          <div class="margin-bottom-10 f-14 bold c-2">
            {{ item.name }}
          </div>
          <div class="margin-bottom-10 f-10 c-7">
            {{ item.address }}
          </div>
          <div class="margin-bottom-10 imgbox">
            <img
              class="icon-15"
              :src="page.uploadpath + 'resource/' + page.Res.distance"
            />
            <div v-if="item.distance < 1000" class="line-height-19 c-1">
              {{ item.distance }}m
            </div>
            <div class="line-height-19 c-1" v-else>
              {{ Math.floor(item.distance / 1000) }}km
            </div>
            <img
              class="icon-15 margin-left-30"
              :src="page.uploadpath + 'resource/' + page.Res.timeslot"
            />
            <div class="line-height-19">{{ item.timeslot }}</div>
          </div>
          <div class="flex-row flex-between">
            <div class="flex-row">
              <div class="shebei">{{ item.jqstatus.zaixian }}台设备</div>
              <div class="status" style="background-color: #01be6c">空闲</div>
            </div>
            <div class="flex-row">
              <div class="shebei">{{ item.jqstatus.gongzuo }}台设备</div>
              <div class="status" style="background-color: #fac601">忙碌</div>
            </div>
            <div class="flex-row">
              <div class="shebei">{{ item.jqstatus.lixian }}台设备</div>
              <div class="status" style="background-color: #ed0e3d">维修</div>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  </div>
</template>
<style scoped>
.bottom {
  position: fixed;
  bottom: 5.5vh;
}
.twoicon {
  position: absolute;
  bottom: 0;
  z-index: 9999;
}
.bottom2 {
  margin-bottom: 50px;
}
.container {
  position: relative;
  z-index: 98;
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
/* .win{
  position: relative;
} */
</style>