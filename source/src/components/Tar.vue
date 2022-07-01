
<script setup>
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { ref, watch, inject, defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import store from "../State";

let router = useRouter();
const route = useRoute();
let page = ref({ kk: "/" });
let imglist = ref({});
let title = ref({});
let pathname = ref("");
HttpHelper.Post("anni/bottom", {}).then((res) => {
  res.sort((a, b) => a.seq - b.seq);
  imglist.value = res;
});
console.log(route.path, "store.state.name");
store.changeName(route.path);
console.log("router", router.currentRoute._rawValue.path);
var active = ref("firsthome");

PageHelper.Init(page, () => {});

// watch(()=>route.path,(e)=>{
//   pathname.value=e
//   title.value=route.meta.name
//   console.log('监听到变化ddd',route)
// })
watch(route, (newVal, oldVal) => {
  console.log("监听到变化dd8888d", newVal.path);
  pathname.value = newVal.path;
  console.log("7777", pathname.value);
  if (pathname.value == "/") {
    active.value = "firsthome";
    cur.value = 1;
  }
  if (pathname.value == "/integral") {
    active.value = "integral";
    cur.value = 2;
  }
  if (pathname.value == "/carwash") {
    active.value = "carwash";
    cur.value = 3;
  }
  if (pathname.value == "/myselef") {
    active.value = "myselef";
    cur.value = 4;
  }
});
// const props = defineProps({
//   pathname: String,
// });

// title.value = inject("title");
// pathname.value = props.pathname;
// console.log(props.pathname, "可以拿到父组件的数据");

//
var cur = ref(1);
var tz = (num) => {
  cur.value = num;
  console.log(num);
  // PageHelper.kk.value.a="2";
  console.log("jinalia", num);
  if (num == 1) {
    router.push("/");
    //   active='firsthome'

    active.value = "firsthome";
  }
  if (num == 2) {
    router.push("/integral");
    //  active='integral'
    //  this.active='integral'
    active.value = "integral";
  }
  if (num == 3) {
    router.push("/carwash");
    active.value = "carwash";
  }
  if (num == 4) {
    router.push("/myselef");
    active.value = "myself";
  }
};
</script>

<template>
  <div class="bottom w-100f">
    <!-- <van-tabbar v-model="store.state.name">
      <van-tabbar-item icon="home-o" @click="tz(1)" name="/"
        >车服首页</van-tabbar-item
      >
      <van-tabbar-item icon="points" @click="tz(2)" name="/integral"
        >积分兑换</van-tabbar-item
      >
      <van-tabbar-item icon="shop-o" @click="tz(3)" name="/carwash"
        >自助洗车</van-tabbar-item
      >
      <van-tabbar-item icon="manager-o" @click="tz(4)" name="/myselef"
        >个人中心</van-tabbar-item
      >
    </van-tabbar> -->
    <div
      class="flex-row flex-around bg-w padding-tb"
      :v-model="store.state.name"
    >
      <div
        v-for="item in imglist"
        :key="item.id"
        @click="tz(item.seq)"
        class="flex-row column flex-center3"
        name="item.name"
      >
        <div v-if="cur == item.seq">
          <img class="icon-25" :src="page.uploadpath + 'tabimg/' + item.img" />
        </div>
        <div v-else>
          <img class="icon-25" :src="page.uploadpath + 'tabimg/' + item.img2" />
        </div>
        <div>{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bottom {
  position: fixed;
  bottom: 0;
}
.mid {
  margin: 0 auto;
}
</style>