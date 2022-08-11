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
  lngitude: 0 //经度
});
let page = ref({});
let router = useRouter();
let route = useRoute();
let carwashplacelist = ref([]);
const arr = new Array();
let lat = ref({});
let lng = ref({});
let cameraId = ref(0); //相机id
let isScan = ref(true);
let sign = ref(0)
var url = ref(
  "https://apis.map.qq.com/tools/geolocation?key=HN5BZ-FHPK4-6Z2U3-DBEUG-ZHXYV-AQFQV&referer=myapp"
);
PageHelper.Init(page, () => {
  
});

var shouquan = () => {
  PageHelper.LoginAuth(page, () => {
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
  });

  
};
let show1 = ref(0);
let timer = setInterval(() => {
  //需要定时执行的代码
  wancheng();
  // shouquan();
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
// const init = () => {
  
  
// };
var getweizhi = () => {
  PageHelper.loadwechatconfig(() => {
    wx.getLocation({
      type: "gcj02",
      success: function(res) {
        console.log(res, "resss");
        var latitude = res.latitude;
        var longitude = res.longitude;
        
        dataMap.latitude = latitude;
        dataMap.lngitude = longitude;
        lat.value = latitude;
        lng.value = longitude;
        //init
        let center = new TMap.LatLng(dataMap.latitude, dataMap.lngitude);
        dataMap.map = new TMap.Map(document.getElementById("QQMap"), {
          center: center, //设置地图中心点坐标
          zoom: 17.2, //设置地图缩放级别
          viewMode:'2D'
        });
        deleteSomeInfo();
        HttpHelper.Post("carwash/carwashplacelist", {
          lng1: longitude,
          lat1: latitude
        }).then(Res => {
          Res.sort((a, b) => a.distance - b.distance);
          console.log(Res, "11");
          carwashplacelist.value = Res;
          for (let i = 0; i < Res.length; i++) {
            HttpHelper.Post("carwash/getmachinelistofonliebycode", {
              id: carwashplacelist.value[i].id
            }).then(status => {
              console.log(status, "status");

              carwashplacelist.value[i].jqstatus = status;
            });
            let obj = {
              id: Res[i].id,
              styleId: "myStyle",
              position: new TMap.LatLng(Res[i].lat * 1, Res[i].lng * 1),
              properties: {
                title: "marker1"
              }
            };
            arr.push(obj);
          }
          console.log(arr[0], "rrr");
          addMarkerLayer();
          
        });
        window.localStorage.setItem("latitude", latitude);
        window.localStorage.setItem("longitude", longitude);
        //  alert("success" + JSON.stringify(res));
      },
      fail: function(res) {
        // alert("fail" + JSON.stringify(res));
        console.log("getLocation", "fail" + JSON.stringify(res));
      },
      complete: function(res) {
        console.log("getLocation", "complete" + JSON.stringify(res));
      }
    });
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
    position: dataMap.map.getCenter()
  };
  arr.push(markerGeo);
  console.log(arr.length, arr, "99999");
  // 创建一个位于地图中心点的marker
  dataMap.markerLayer = new TMap.MultiMarker({
    map: dataMap.map, //指定地图容器
    styles: {
      //创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
      myStyle: new TMap.MarkerStyle({
        width: 25, // 点标记样式宽度（像素）
        height: 25, // 点标记样式高度（像素）
        src:
          "http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/pulian/resource/6c323aed1de243a1650aa42eb1a1c014_220527105607_1161226950.png", //图片路径
        //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
        anchor: { x: 16, y: 32 }
      })
    },

    geometries: arr //点标记数据数组
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
  // init()
  getweizhi(); 
});
var easeTo = () => {
  dataMap.map.easeTo({
    zoom: 17.2,
    // rotation: 10,
    pitch: 10,
    adcode: 110101,
    center: new TMap.LatLng(lat.value, lng.value)
  }); //平滑缩放,旋转到指定级别
};
// let MachineList = ref([])
// HttpHelper.Get("CarWash/GetMachineListOfOnlie", {}).then((Res) => {
//   console.log(Res, "MachineList");
//   MachineList.value = Res;
// });

// 跳转
var personalcenter = e => {
  console.log("llllll");
  router.push("/personalcenter");
};
var buycarwash = e => {
  if (
    page.value.Memberinfo.shoujisq != "B" ||
    page.value.Memberinfo.touxiang != "B"
  ) {
    shouquan();
  }else{
    router.push("/carwashcard");
  }
  
};

var selectcarwashpackage = e => {
  PageHelper.loadwechatconfig(()=>{
    wx.scanQRCode({
    onlyFromCamera: false,
    success(res) {
      console.log(res, "respppp");
      if (res.errMsg == "scanCode:ok") {
        console.log(res, "res.path");
        wx.navigateTo({
          url: res.path
        });
      } else {
        wx.navigateBack({
          delta: -1
        });
      }
    },
    fail(res) {
      wx.navigateBack({
        delta: -1
      });
    }
  });
  })
  
  // HttpHelper.Post("carwash/getmachineofonlie", { machineCode: code }).then(
  //   res => {
  //     let status = res.networkstatus.onOfflines;
  //     if (status == "0") {
  //       //离线
  //       Toast("此台设备正在维护， 请更换其他机器。");
  //     } else if (status == "1") {
  //       //在线

  //     } else {
  //       //工作中
  //       Toast("此台设备正在使用中， 请手动关闭后重新扫码使用。");
  //     }
  //   }
  // );
};
var placedetails = e => {
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
    <div class="container" id="QQMap" style="width: 100%; height: 40vh">
      <div class="wf-100 padding-left-14 padding-right-14 imgbox flex-between twoicon">
        <div>
          <img
            class="icon-40"
            :src="page.uploadpath + 'resource/' + page.Res.location"
            @touchend="easeTo()"
          />
        </div>
        <div>
          <img
            class="icon-40"
            :src="page.uploadpath + 'resource/' + page.Res.personalcenter"
            @touchend="personalcenter()"
          />
        </div>
      </div>
    </div>

    <div class="bg-10 padding-top-10">
      <div style="background-color: #f7f7f8">
        <div class="bg-w margin-left-14 margin-right-14 border-radius-10">
          <img
            class="wf-100"
            :src="page.uploadpath + 'resource/' + page.Res.buycarwash"
            @click="buycarwash()"
          />
        </div>
        <div
          class="bg-w margin-left-14 margin-right-14 margin-top-14 padding-10 border-radius-10"
          v-for="(item, index) in carwashplacelist"
          :key="index"
          @click="placedetails(item)"
        >
          <div class="margin-bottom-10 f-14 bold c-2">{{ item.name }}</div>
          <div class="margin-bottom-10 f-10 c-7">{{ item.address }}</div>
          <div class="margin-bottom-10 imgbox">
            <img
              class="icon-15 margin-right-5"
              :src="page.uploadpath + 'resource/' + page.Res.distance"
            />
            <div v-if="item.distance < 1000" class="line-height-15 c-1">{{ item.distance }}m</div>
            <div class="line-height-15 c-1" v-else>{{ Math.floor(item.distance / 1000) }}km</div>
            <img
              class="icon-15 margin-left-30 margin-right-5"
              :src="page.uploadpath + 'resource/' + page.Res.timeslot"
            />
            <div class="line-height-15">{{ item.timeslot }}</div>
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
        <div
          class="margin-top-14 margin-bottom-14 padding-right-14 padding-left-14 bottom"
          style="width: 100%"
        >
          <div class="wf-100 bg-6 border-radius-10 wrapper" @click="selectcarwashpackage()">
            <div>
              <img class="icon-25" :src="page.uploadpath + 'resource/' + page.Res.saoyisao" />
            </div>
            <div class="c-w f-14" style="line-height: 40px">扫码洗车</div>
          </div>
        </div>
      </div>
      <div class="icon-130"></div>
    </div>
  </div>
</template>
<style scoped>
.top {
  position: fixed;
  top: 0;
  right: 0;
}
.bottom {
  position: fixed;
  bottom: 8vh;
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