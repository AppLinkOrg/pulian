<script setup>
import { ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { HttpHelper } from "../HttpHelper";
import { PageHelper } from "../PageHelper";

let router = useRouter();
let route = useRoute();

let page = ref({});
let statuslist = ref([
  { name: "未使用", status: "A" },
  { name: "已使用", status: "B" },
  { name: "已过期", status: "C" },
]);
PageHelper.Init(page, () => {});

var storedetail = ref({});

let current = ref("A");
let instinfo = ref({});
HttpHelper.Post("inst/instinfo", {}).then((Res) => {
  console.log(Res,'11');  
  instinfo.value = Res;
});

// 门店详情
let packageorderlist = ref([]);
HttpHelper.Post("carwash/packageorderlist", {zhuangtai:current.value}).then((res) => {
  packageorderlist.value = res;
});
var show = ref(false);
var isshow = (e) =>{
  console.log(show);
  show.value = !show.value
}
// 购买
var status = (e) => {
  current.value = e;
  HttpHelper.Post("carwash/packageorderlist", {zhuangtai:current.value}).then((res) => {
  packageorderlist.value = res;
});

  console.log(current.value, "666");
};
</script>

<template>
  <div class="" v-if="page.Res != null">
    <div class="h-40 imgbox flex-around line-height-40">
      <div
        v-for="(item, index) in statuslist"
        :key="index"
        @click="status(item.status)"
        :class="{ active: item.status == current }"
        style="font-size: 14px"
      >
        {{ item.name }}
      </div>
    </div>
    <div class=" h-14 wf-100"></div>
    <div class=" order wf-100 padding-top-14">
      <div
        class="
          padding-15
          margin-left-14 margin-right-14
          bg-w
          margin-bottom-14
          order
        "
        v-for="(item, index) in packageorderlist"
        :key="index"
      >
        <div >
          <div  class="flex-row flex-between">
            <div>
              <div class="f-16 bold">{{item.synopsis}}</div>
              <div class="c-1 f-12 margin-top-8">{{item.start_time}}-{{item.end_time}}</div>
            </div>
            <div v-if="current == 'A'" class="btn">扫码洗车</div>
          </div>
          <div class="xian"></div>
          <div class="flex-row flex-between">
            <div class="c-7 f-12 h-14 " style="overflow:hidden;line-height:20px; height:20;" :class="{active2:show}">{{instinfo.rule}}</div>
            <div @click="isshow(item.id)"><img class="icon-12" :src="page.uploadpath + 'resource/' + page.Res.xiajain"></div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.active {
  color: #1890fe;
}
.order{
  box-shadow: 0px 2px 14px 0px rgba(24, 144, 254, 0.12);
  border-radius: 10px;
}
.btn{
  width: 70px;
  height: 24px;
  background: #1890FE;
  border-radius: 15px;
  color: white;
  text-align: center;
  line-height: 24px;
}
.active2{
  height: 40px;
}
.xian{
  width: 100%;
  height: 1px;
  background: #EEEEEE;
  margin-top:15px;
  margin-bottom:10px
}
</style>