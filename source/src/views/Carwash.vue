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
PageHelper.Init(page, () => {});
// 异步获得位置
// 通过终端设备IP地址获取其当前所在地理位置，精确到市级
// 常用于初始化用户城市等非精确定位场景。
const getNowLngAndLat = $.ajax({
  type: "get",
  url: "https://apis.map.qq.com/ws/location/v1/ip",
  data: {
    key: "HN5BZ-FHPK4-6Z2U3-DBEUG-ZHXYV-AQFQV",
    output: "jsonp",
  },
  dataType: "jsonp",
  success: function (res) {
    console.log(res, "666");
    // console.log(res)
    dataMap.latitude = res.result.location.lat;
    dataMap.lngitude = res.result.location.lng;

    HttpHelper.Post("carwash/carwashplacelist", {
      lng: res.result.location.lng,
      lat: res.result.location.lat,
    }).then((Res) => {
      console.log(Res, "11");
      carwashplacelist.value = Res;
      for (let i = 0; i < Res.length; i++) {
        let obj = {
          id: Res[i].id,
          styleId: "myStyle",
          position: new TMap.LatLng(Res[i].lat * 1, Res[i].lng * 1),
          properties: {
            title: "marker1",
          },
        };
        arr.push(obj);
      }
      console.log(arr[0], "rrr");
      init();
      deleteSomeInfo();

      addMarkerLayer();
    });
  },
  fail: function () {},
});
const init = () => {
  let center = new TMap.LatLng(dataMap.latitude, dataMap.lngitude);
  dataMap.map = new TMap.Map(document.getElementById("QQMap"), {
    center: center, //设置地图中心点坐标
    zoom: 17.2, //设置地图缩放级别
  });
};

// 去除无用信息
const deleteSomeInfo = () => {
  // 腾讯地图去除logo
  var logo = document.querySelector(
    "#QQMap > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(2)"
  );
  logo.setAttribute("style", "display: none;");
  // 腾讯地图去除logo文字
  var logoText = document.getElementsByClassName("logo-text");
  logoText[0].setAttribute("style", "display: none;");
  // 腾讯地图去除罗盘
  var logoCompass = document.getElementsByClassName("rotate-circle");
  logoCompass[0].setAttribute("style", "display: none;");
  var logoCompass2 = document.getElementsByClassName("tmap-zoom-control");
  logoCompass2[0].setAttribute("style", "display: none;");
  // 获取缩放控件实例
  // let control = dataMap.map.getControl(TMap.constants.DEFAULT_CONTROL_ID.ZOOM);
  // 设置控件在右下角
  // control.setPosition(TMap.constants.CONTROL_POSITION.BOTTOM_RIGHT);
  // 缩放控件显示缩放级别
  // control.setNumVisible(true);
};
const addMarkerLayer = () => {
  var markerGeo = {
    id: "center",
    position: dataMap.map.getCenter(),
  };
   arr.push(markerGeo)
  console.log(arr.length, arr, "99999");
  // 创建一个位于地图中心点的marker
  dataMap.markerLayer = new TMap.MultiMarker({
    map: dataMap.map, //指定地图容器
    styles: {
      //创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
      myStyle: new TMap.MarkerStyle({
        width: 25, // 点标记样式宽度（像素）
        height: 25, // 点标记样式高度（像素）
        src: "http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/pulian/resource/6c323aed1de243a1650aa42eb1a1c014_220527105607_1161226950.png", //图片路径
        //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
        anchor: { x: 16, y: 32 },
      }),
    },

    geometries: arr//点标记数据数组
  });
  //监听地图平移，panstart开始平移，panend平移结束
  // dataMap.map.on("pan", function () {
  //   markerGeo.position = dataMap.map.getCenter(); //获取地图中心点
  //   dataMap.latitude = markerGeo.position.lat;
  //   dataMap.lngitude = markerGeo.position.lng;
  //   // dataMap.markerLayer.updateGeometries([markerGeo]); // 报错，只好先删后加
  //   dataMap.markerLayer.setMap(null); // 或者dataMap.markerLayer.destroy();
  //   dataMap.markerLayer = new TMap.MultiMarker({
  //     map: dataMap.map, //指定地图容器
  //     //点标记数据数组
  //     geometries: [markerGeo],
  //   });
  // });
};


onMounted(() => {
  $.when(getNowLngAndLat).done(function () {});
});

HttpHelper.Get("api/Auth", {appId:'38ccd6f4fc94cadb',appSerct:'471c4a38a0616c1aa154fb52178b88c3'}).then((Res) => {
  console.log(Res, "rrrr");
});

// let MachineList = ref([])
// HttpHelper.Get("CarWash/GetMachineListOfOnlie", {}).then((Res) => {
//   console.log(Res, "MachineList");
//   MachineList.value = Res;
// });

// 跳转
var personalcenter = (e) => {
  router.push("/personalcenter");
};
var buycarwash = (e) => {
  router.push("/carwashcard");
};
var selectcarwashpackage = (e) => {
  router.push("/selectcarwashpackage");
};
var placedetails = (e) => {
  router.push("/placedetails?id=" + e);
};
</script>

<template>
  <div class="wf-100" v-if="page.Res != null">
    <div class="container" id="QQMap" style="width: 100%; height: 200px"></div>
    <div class="wf-100 padding-left-14 padding-right-14 imgbox flex-between">
      <div>
        <img
          class="icon-40"
          :src="page.uploadpath + 'resource/' + page.Res.location"
        />
      </div>
      <div>
        <img
          class="icon-40"
          :src="page.uploadpath + 'resource/' + page.Res.personalcenter"
          @click="personalcenter()"
        />
      </div>
    </div>
    <div class="bg-10">
      <div class="bottom" style="background-color: #f7f7f8">
        <div class="bg-w">
          <img
            class="wf-100"
            :src="page.uploadpath + 'resource/' + page.Res.buycarwash"
            @click="buycarwash()"
          />
        </div>
        <div
          class="bg-w margin-left-14 margin-right-14 margin-top-14"
          v-for="(item, index) in carwashplacelist"
          :key="index"
          @click="placedetails(item.id)"
        >
          <div class="margin-bottom-10">
            {{ item.name }}
          </div>
          <div class="margin-bottom-10">
            {{ item.address }}
          </div>
          <div class="margin-bottom-10 imgbox">
            <img
              class="icon-15"
              :src="page.uploadpath + 'resource/' + page.Res.distance"
            />
            <div v-if="item.distance < 1000" class="line-height-19">
              {{ item.distance }}m
            </div>
            <div class="line-height-19" v-else>
              {{ Math.floor(item.distance / 1000) }}km
            </div>
            <img
              class="icon-15 margin-left-30"
              :src="page.uploadpath + 'resource/' + page.Res.timeslot"
            />
            <div class="line-height-19">{{ item.timeslot }}</div>
          </div>
          <div class="margin-bottom-10">
            {{ item.distance }}{{ item.timeslot }}{{ item.timeslot }}
          </div>
        </div>
        <div
          class="
            bg-w
            margin-left-14 margin-right-14 margin-top-14 margin-bottom-14
          "
        >
          <div
            class="wf-100 bg-6 border-radius-10 wrapper"
            @click="selectcarwashpackage()"
          >
            <div>
              <img
                class="icon-25"
                :src="page.uploadpath + 'resource/' + page.Res.saoyisao"
              />
            </div>
            <div class="c-w f-14" style="line-height: 40px">扫码洗车</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.bottom {
  position: fixed;
  bottom: 0;
}
</style>