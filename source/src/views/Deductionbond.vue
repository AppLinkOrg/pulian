<script setup>
import { ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { HttpHelper } from "../HttpHelper";
import { PageHelper } from "../PageHelper";

let router = useRouter();
let route = useRoute();

let page = ref({});
let show = ref(false);
let statuslist = ref([
  { name: "未使用", status: "A" },
  { name: "已使用", status: "B" },
  { name: "已过期", status: "C" },
]);
PageHelper.Init(page, () => {});

var storedetail = ref({});

let current = ref("A");
let currentshow = ref({});

// 订单列表
let couponorder=ref([])

HttpHelper.Post('carwash/couponorderlist',{yhstatus:current.value}).then((res)=>{
  console.log(res,'res');
  couponorder.value=res
})
var status = (e) => {
  current.value = e;
  HttpHelper.Post('carwash/couponorderlist',{yhstatus:current.value}).then((res)=>{
  console.log(res,'res');
  couponorder.value=res
})
  console.log(current.value, "666");
};
let id= ref({})
var isshow = (e) => {
  id.value=e
  show.value=!show.value
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
    <div class="bg-10 h-14 wf-100"></div>
    <div class="bg-10 order wf-100 padding-top-14">
      <div
        class="
          margin-left-14 margin-right-14
          bg-w
          margin-bottom-14
          border-radius-10
          
        "
        
        v-for="(item, index) in couponorder"
        :key="index"
      >
        <div class="imgbox shadow">
          <div v-if="current == 'A'" class="borderleft"></div>
          <div v-else class="borderleft2"></div>
          <div class="padding-10" >
          <div v-if="current == 'A'" class="jian status1">
            <span style="font-size:15px">¥</span>{{ item.jainshao }}
          </div>
          <div v-else class="jian status2">
            <span style="font-size:15px">¥</span>{{ item.jainshao }}
          </div>
          <div>满{{item.manmoney}}可用</div>
        </div>
        <div  >
          <div class="imgbox">
            <div class="zizhu">抵扣券</div>
            <div></div>
          </div>
          <div class="imgbox margin-top-16">
            <div class="c-7">{{item.star_time+'-'+item.end_time}}</div>
            <div></div>
          </div>
          <div class="imgbox margin-top-16 flex-between">
            <div class="c-7 margin-bottom-14">使用说明</div>
            <div @click="isshow(item.id)"><img class="icon-12" :src="page.uploadpath + 'resource/' + page.Res.xiajain"></div>
          </div>
        </div>
        </div>
        <div class="shuoming margin-top-10 c-7 line-height-19 padding-10 shadow" v-if="(show && id==item.id)">{{item.guize}}</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.active {
  color: #1890fe;
}
.jian{
  width: 51px;
height: 52px;
font-size: 30px;
font-family: DIN;
font-weight: 500;

line-height: 53px;
}
.status1{
  color: #1890FE;
}
.status2{
  color: #666666;
}
.zizhu{
  width: 244px;
  height: 31px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 53px;
}
.borderleft{
  width: 4px;
  border-radius: 4px   0 0 4px;
  background-color: #1890FE;
  margin-right: 15px;
}
.borderleft2{
  width: 4px;
  border-radius: 4px   0 0 4px;
  background-color: #666666;
  margin-right: 15px;
}
.shadow{
  box-shadow: 0px 4px 28px 0px rgba(24, 144, 254, 0.12);
}
/* .bacc{
  background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/psban9hk9dr76g1evq74j177rv82titkzlk31d78768-1598-46e4-b0fd-c344a0767187) 100% no-repeat;
  width: 750rpx;
  height: 518rpx;
  background-size: 750rpx 932rpx;
  z-index: 0;
} */
</style>