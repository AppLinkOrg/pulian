<script setup>
import { ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { HttpHelper } from "../HttpHelper";
import { PageHelper } from "../PageHelper";

let router = useRouter();
let route = useRoute();

let page = ref({});
PageHelper.Init(page, () => {});

var allcategory = ref({});

var current = ref(0);

let show = ref(false);

var fuwudetail = ref([]);

// 门店详情
HttpHelper.Post("store/allcategory", {}).then((res) => {
  allcategory.value = res;
});

// 轮播图改变时间
var onChange = (index) => {
  current.value = index;
};

// 购买
var goumia = () => {
  router.push("/Submitorder?id=" + fuwudetail.value.id);
  console.log("寄哪里了---", fuwudetail, fuwudetail.id);
};
</script>

<template >
  <div class="all_page" v-if="page.Res != null">
    <div class="top_blue">
      <div class="c-w f-16 f-bold margin-left-24 padding-top-5">
        +添加我的爱车
      </div>
      <div class="radius_block"></div>
    </div>
    
    <div class="flex-row flex-wrap padding-top-10">
      <div class="category" v-for="(item, index) in allcategory" :key="index">
        <img
          class="icon_category"
          :src="page.uploadpath + 'bigcategory/' + item.icon"
        />
        <div class="f-12 margin-top-5">{{ item.name }}</div>
      </div>
    </div>

    <!-- 广告区域 -->
    <div
      class="margin-L-R-15 bg-w border-radius-5 padding-10 advertising_block"
    >
      <!-- <img
          class="store_long_img"
          :src="page.uploadpath + 'resource/' + page.Res.dianpu"
        /> -->
      <div class="flex-row">
        <!-- 广告左侧大图 -->
        <div class=" ">
          <van-image
            width="90"
            height="206"
            fit="cover"
            :src="page.uploadpath + 'resource/' + page.Res.dianpu"
          />
        </div>

        <!-- 广告右侧店铺信息 -->
        <div class=" flex-1 margin-left-10 " style="width:56vw">
          <div class="f-16 f-bold c-b">商户名称</div>
          <div class="flex-row flex-center margin-top-5">
            <div class="f-12 c-3">5.0分</div>
            <div class="f-12 c-7 margin-left-10">月售1234单</div>
            <div class=" flex-1"></div>
            <div class="f-12 c-7">2.0km</div>
          </div>
          <div class="flex-row flex-wrap">
            <div class="label_bg margin-right-5 margin-top-5 c-3 f-10">
              热情老板
            </div>
            <div class="label_bg margin-right-5 margin-top-5 c-3 f-10">
              热情老a萨达阿斯达板
            </div>
          </div>
          <div class="flex-row flex-wrap margin-top-10">
            <van-image
              class="zuobiao margin-right-5"
              :src="page.uploadpath + 'resource/' + page.Res.zuobiao"
            />
            <div class="f-12 c-7">阿斯达苏打水</div>
          </div>

          <!-- 广告店铺服务列表滚动区域 -->
 
          <div
            class="flex-row margin-top-5"
            style="overflow: scroll; width: 100%"
          >
            <div class="margin-right-5">
              <van-image
                class="fuwu_img margin-right-5"
                :src="page.uploadpath + 'resource/' + page.Res.dianpu"
              />
              <div class="margin-top-5">标准洗车</div>
              <div class="flex-row flex-bottom">
                <div class="f-14 c-5 margin-right-5">¥50</div>
                <div class="f-10" style="text-decoration: line-through">
                  ¥50
                </div>
              </div>
            </div>
            <div class="margin-right-5">
              <van-image
                class="fuwu_img margin-right-5"
                :src="page.uploadpath + 'resource/' + page.Res.dianpu"
              />
              <div class="margin-top-5">标准洗车</div>
              <div class="flex-row flex-bottom">
                <div class="f-14 c-5 margin-right-5">¥50</div>
                <div class="f-10" style="text-decoration: line-through">
                  ¥50
                </div>
              </div>
            </div>
            <div class="margin-right-5">
              <van-image
                class="fuwu_img margin-right-5"
                :src="page.uploadpath + 'resource/' + page.Res.dianpu"
              />
              <div class="margin-top-5">标准洗车</div>
              <div class="flex-row flex-bottom">
                <div class="f-14 c-5 margin-right-5">¥50</div>
                <div class="f-10" style="text-decoration: line-through">
                  ¥50
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <van-image
        fit="cover"
        class="label_img"
        :src="page.uploadpath + 'resource/' + page.Res.ls"
      />
      <!-- <img
          class="label_img"
          :src="page.uploadpath + 'resource/' + page.Res.ls"
        /> -->
    </div>
  </div>
</template>
<style scoped>
.all_page {
  background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 100%);
  height: 100vh;
  width: 100vw;
}
.top_blue {
  height: 60px;
  width: 100%;
  background: #409eff;
  position: relative;
}
.radius_block {
  height: 20px;
  border-radius: 20px 20px 0px 0px;
  background: white;
  width: 100%;
  position: absolute; 
  bottom: -1%;
}
.margin-left-24 {
  margin-left: 24px;
}
.icon_category {
  width: 30px;
  height: 30px;
}
.category {
  /* margin:0 16% 0 3%; */
  width: 25%;
  margin-bottom: 10px;
  text-align: center;
}
.store_long_img {
  height: 206px;
  width: 90px;
}
.advertising_block {
  position: relative;
}
.label_img {
  width: 45px;
  height: 20px;
  position: absolute;
  right: 0;
  top: 0;
}
.label_bg {
  padding: 4px 6px;
  background: #ecf5ff;
  border-radius: 4px;
}
.zuobiao {
  width: 12px;
  height: 12px;
}
.fuwu_img {
  width: 85px;
  height: 70px;
  border-radius: 5px;
}


 
</style>