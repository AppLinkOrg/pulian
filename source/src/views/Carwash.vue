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

PageHelper.Init(page, () => {
    console.log('55555555555555');
    let that = this;
    this.markerLayer = new TMap.MultiMarker({});
    that.initMap();
});
this.markerLayer = new TMap.MultiMarker({});
this.initMap();
let carwashplacelist = ref([]);
HttpHelper.Post("carwash/carwashplacelist", {}).then((Res) => {
  console.log(Res, "11");
  carwashplacelist.value = Res;
});

// 地图初始化函数
var initMap = () => {
  console.log("window", window);
  // 定义地图中心点坐标
  let center = new window.TMap.LatLng(31.271694, 118.362938);
  // 定义map变量，调用 TMap.Map() 构造函数创建地图
  let map = new window.TMap.Map(document.getElementById("mapContainer"), {
    center: center, // 设置地图中心点坐标
    zoom: 17.2, // 设置地图缩放级别
    pitch: 43.5, // 设置俯仰角
    rotation: 45, // 设置地图旋转角度
  });
  //如果不给地图添加坐标点,这里可以忽略了,如果要添加请继续看(重点关注***markerLayer***)
  this.map = map;
  map.on("click", (e) => {
    this.markerLayer.setGeometries([]);
    const position = e.latLng;
    addImgMarker(position);
  });
};

var addImgMarker = (data) => {
  this.markerLayer = new TMap.MultiMarker({
    map: this.map,
    //样式定义
    styles: {
      //创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
      myStyle: new TMap.MarkerStyle({
        width: 25, // 点标记样式宽度（像素）
        height: 35, // 点标记样式高度（像素）
        src: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg", //图片路径
        //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
        anchor: { x: 16, y: 32 },
      }),
    },
    //点标记数据数组
    geometries: [
      {
        id: "1", //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
        styleId: "myStyle", //指定样式id
        position: data, //点标记坐标位置
      },
    ],
  });
};

// 实物不急优惠券列表

// 跳转
var personalcenter = (e) => {
  router.push("/personalcenter");
};
var buycarwash = (e) => {
  router.push("/carwashcard");
};
</script>

<template>
  <div v-if="page.Res != null">
    <div
      class="container"
      id="mapContainer"
      style="width: 100%; height: 200px"
    ></div>
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
    <div
      class="bottom margin-left-18 margin-right-18"
      style="background-color: #f7f7f8"
    >
      <div class="bg-w">
        <img
          class="wf-100"
          :src="page.uploadpath + 'resource/' + page.Res.buycarwash"
          @click="buycarwash()"
        />
      </div>
      <div class="bg-w" v-for="(item, index) in carwashplacelist" :key="index">
        <div>
          {{ item.name }}
        </div>
        <div>
          {{ item.address }}
        </div>
        <div>{{ item.distance }}{{ item.timeslot }}</div>
      </div>
      <div class="bg-w">
        <div class="wf-100 bg-6 border-radius-20 wrapper">
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
</template>
<style scoped>
.bottom {
  position: fixed;
  bottom: 0;
}
</style>