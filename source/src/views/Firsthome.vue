<script setup>
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { ref, reactive } from "vue";
import { Utils } from "../Utils";
import { NModal } from "naive-ui";
import { useRouter } from "vue-router";
import Tar from "../components/Tar.vue";

let router = useRouter();
let page = ref({});
let data = ref({});
let showVideo = ref(false);

var indexbanner1 = ref({});
var anniulist = ref([]);
var servicelist = ref([]);
var storelist = ref([]);

PageHelper.Init(page, () => {});

// 轮播图
HttpHelper.Post("inst/indexbanner", {}).then((indexbanner) => {
  console.log("进来了");
  console.log(indexbanner);
  indexbanner1.value = indexbanner;
});
// 按钮图片
HttpHelper.Post("anniu/anniulist", {}).then((res) => {
  anniulist.value = res;
});
// 服务列表
HttpHelper.Post("service/servicelist", {}).then((res) => {
  servicelist.value = res;
});

// 门店列表
HttpHelper.Post("store/storelist", {}).then((res) => {
  storelist.value = res;
});

console.log("进来了");
console.log(indexbanner1);
var diaozhuan = (item) => {
  router.push(item);
  router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
  });
};
// 跳转店铺详情页
var dianpu = (index) => {
  // '/storedetail?id=1'
  router.push("/storedetail?id=" + index);
};
</script>

<template >
  <div v-if="page.Res != null" class="big-bg">
    <!--  -->
    <img
      :src="page.uploadpath + 'resource/' + page.Res.sybg"
      style="width: 100%"
    />
    <div style="margin-top: -90px"></div>
    <!-- 轮播图 -->
    <van-swipe
      class="my-swipe indexbanner"
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item
        v-for="(image, index) in indexbanner1"
        :key="index"
        class="h-140"
      >
        <img
          :src="page.uploadpath + 'indexbanner/' + image.img"
          class="h-140"
        />
      </van-swipe-item>
    </van-swipe>
    <!-- 列表 -->
    <div
      class="flex-row flex-center margin-top-20 margin-left-26 margin-right-26"
    >
      <div class="flex-1 flex-row flex-center">
        <img
          :src="page.uploadpath + 'resource/' + page.Res.fuwu2"
          class="icon-15"
        />
        <div class="c-1 f-1 margin-left-4">车服中心</div>
        <div class="flex-1"></div>
      </div>
      <div class="shu"></div>
      <div class="flex-1 flex-row flex-center">
        <div class="flex-1"></div>
        <img
          :src="page.uploadpath + 'resource/' + page.Res.zhuce"
          class="icon-15"
        />
        <div class="c-1 f-1 margin-left-4">全国网点</div>
        <div class="flex-1"></div>
      </div>
      <div class="shu"></div>
      <div class="flex-1 flex-row flex-center">
        <div class="flex-1"></div>
        <img
          :src="page.uploadpath + 'resource/' + page.Res.koubai"
          class="icon-15"
        />
        <div class="c-1 f-1 margin-left-4">专业服务</div>
        <div class="flex-1"></div>
      </div>
      <div class="shu"></div>
      <div class="flex-1 flex-row flex-center">
        <div class="flex-1"></div>
        <img
          :src="page.uploadpath + 'resource/' + page.Res.fuwu"
          class="icon-15"
        />
        <div class="c-1 f-1 margin-left-4">省心贴心</div>
      </div>
    </div>
    <!-- 按钮 -->
    <div
      class="flex-row flex-center margin-left-23"
      style="
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;
      "
    >
      <div
        v-for="(item, index) in anniulist"
        :key="index"
        class="margin-top-20 margin-right-30"
      >
        <img
          :src="page.uploadpath + 'anniu/' + item.img"
          class="icon-42 displat-block margin-auto"
        />
        <div class="c-2 f-2 margin-top-7">{{ item.name }}</div>
      </div>
    </div>
    <!-- 新人礼包 -->
    <div class="margin-top-23 margin-left-14 margin-right-14">
      <img
        :src="page.uploadpath + 'resource/' + page.Res.xinren"
        class="h-93 wf-100"
      />
      <!-- 附近门店 -->
      <div class="flex-row flex-center margin-top-26">
        <div class="shu1"></div>
        <div class="margin-left-10 bold f-17 c-2">附近门店</div>
      </div>
      <!-- 分类 -->

      <div
        class="flex-row flex-center margin-top-14 margin-bottom-14"
        style="overflow: scroll"
      >
        <div
          class="
            padding-left-10 padding-right-10
            bg-1
            c-2
            f-11
            h-22
            border-radius-11
            line-height-22
            flex-none
            margin-right-10
          "
          v-for="(item, index) in servicelist"
          :key="index"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <!-- 店铺 -->
    <div
      @click="dianpu(item.id)"
      v-for="(item, index) in storelist"
      :key="index"
    >
      <div class="margin-top-15 margin-left-14 margin-right-14">
        <div class="flex-row">
          <img
            :src="page.uploadpath + 'resource/' + page.Res.dianpu"
            class="icon-84"
          />
          <div class="margin-left-10">
            <div class="bold f-15 c-2 f-15">{{ item.name }}</div>
            <div class="margin-top-9 f-11 c-3">{{ item.score }}分</div>
            <div class="margin-top-9 c-1 f-11">
              月售 {{ item.monthlysale }}单
            </div>
            <div class="margin-top-9 flex-row flex-center">
              <img
                :src="page.uploadpath + 'resource/' + page.Res.dizhi"
                class="icon-13"
              />
              <div class="c-1 f-11 margin-left-4">{{ item.address }}</div>
              <div class="flex-1"></div>
              <div class="f-11 c-1">3.20km</div>
            </div>
          </div>
        </div>
        <div class="bg-2 margin-top-15" style="height: 1px"></div>
        <div class="margin-top-15 margin-bottom-15">
          <div class="flex-row flex-center">
            <div class="c-2 f-13 bold">标准洗车</div>
            <div class="flex-1"></div>
            <div
              class="
                bd-1
                border-radius-2
                h-14
                padding-right-4 padding-left-4
                c-4
                f-8
              "
            >
              减免券¥10
            </div>
            <div class="c-4 f-9 margin-left-10">¥</div>
            <div class="c-4 f-13">30</div>
          </div>
          <div class="flex-row margin-top-10 flex-center">
            <div class="c-1 f-9">已售 229</div>
            <div class="flex-1"></div>
            <div class="f-7 c-2" style="text-align: center">¥</div>
            <div class="f-9 c-2" style="text-align: center">40</div>
          </div>
        </div>
      </div>
      <div class="bg-1 h-4"></div>
    </div>

    <div class="h-93"></div>
  </div>
</template>




<style scoped>
.indexbanner {
  height: 140px;
  margin: 0 14px 0;
}
.h-140 {
  height: 140px;
  width: 100%;
}
.shu {
  width: 1px;
  height: 9px;
  background: #e4e4e4;
}
.shu1 {
  width: 4px;
  height: 19px;
  background: #409eff;
  border-radius: 2px;
}
.van-swipe__indicator {
}
/deep/ .van-swipe__indicator--active {
  margin-top: 2px;
  width: 14px;
  height: 4px;
  border-radius: 2px;
}
.van-swipe__indicators {
}
</style>