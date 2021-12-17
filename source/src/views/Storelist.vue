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
var storelist = ref([]);

var activeId = ref(1);
var activeIndex = ref(0);
var fuwulist = ref([
  {
    text: "浙江",
    children: [
      { text: "杭州", id: 1 },
      { text: "温州", id: 2 },
    ],
  },
  {
    text: "江苏",
    children: [
      { text: "南京", id: 3 },
      { text: "无锡", id: 4 },
    ],
  },
]);

var citylist = ref([
  { text: "南京", id: 1 },
  { text: "无锡", id: 2 },
]);

var seqlist = ref([
  { text: "距离优先", id: 1 },
  { text: "好评优先", id: 2 },
  { text: "销量优先", id: 3 },
]);

var storetylelist = ref([
  { name: "美容", id: 4 ,choose:false },
  { name: "美容+快修", id: 5,choose:false },
  { name: "洗车", id: 6,choose:false },
]);
var wokestatus = ref([
  { name: "营业中", type: 'A',choose:false  },
  { name: "休息中", type: 'B',choose:false  }, 
]);

var current = ref(0);

let show = ref(false);

var fuwudetail = ref([]);

// 门店全部分类
HttpHelper.Post("store/allcategory", {}).then((res) => {
  allcategory.value = res;
});
//门店列表
HttpHelper.Post("store/storelist", {}).then((res) => {
  storelist.value = res;
});
 
// 选择门店类型
var choosestoretype = (index) => {
  console.log("点击了",storetylelist.value[index].choose)
 storetylelist.value[index].choose=!storetylelist.value[index].choose; 
   storetylelist.value = storetylelist.value; 
};
// 选择门店营业状态
var choosewokestatus = (index) => { 
 wokestatus.value[index].choose=!wokestatus.value[index].choose; 
   wokestatus.value = wokestatus.value; 
};


var tobrand = () => {  
  router.push("/choosebrand");
};
 
 
</script>

<template >
  <div class="all_page" v-if="page.Res != null">
    <div class="top_blue">
      <div class="c-w f-16 f-bold margin-left-24 padding-top-5" @click="tobrand()">
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
        <div class="">
          <van-image
            width="90"
            height="206"
            fit="cover"
            :src="page.uploadpath + 'resource/' + page.Res.dianpu"
          />
        </div>

        <!-- 广告右侧店铺信息 -->
        <div class="flex-1 margin-left-10" style="width: 56vw">
          <div class="f-16 f-bold c-b">商户名称</div>
          <div class="flex-row flex-center margin-top-5">
            <div class="f-12 c-3">5.0分</div>
            <div class="f-12 c-7 margin-left-10">月售1234单</div>
            <div class="flex-1"></div>
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

    <van-sticky>
      <van-dropdown-menu>
        <van-dropdown-item title="全城区" ref="item" class="text-center">
          <van-list @load="onLoad" class="center">
            <van-cell
              v-for="item in citylist"
              :key="item.id"
              :title="item.text"
            />
          </van-list>
        </van-dropdown-item>

        <van-dropdown-item title="全部服务" ref="item">
          <van-tree-select
            v-model:active-id="activeId"
            v-model:main-active-index="activeIndex"
            :items="fuwulist"
          />
        </van-dropdown-item>

        <van-dropdown-item title="距离优先" ref="item">
          <van-list @load="onLoad" class="center">
            <van-cell
              v-for="item in seqlist"
              :key="item.id"
              class="van-cell"
              :title="item.text"
            />
          </van-list>
        </van-dropdown-item>

        <van-dropdown-item title="门店筛选" ref="item">
          <div class="padding-10">
            <div class="f-14 bold">门店类型</div>
            <div class="flex-row flex-wrap">
              <div v-for="(item,index) in storetylelist" :key="index" class="label_block  f-10" :class="item.choose==true?'choose_label':'not_choose_label'"  @click="choosestoretype(index)">{{item.name}}</div> 
            </div>
            <div class="f-14 bold margin-top-10">是否营业</div>
            <div class="flex-row flex-wrap">
              <div class="label_block not_choose_label f-10" v-for="(item,index) in wokestatus" :key="index" :class="item.choose==true?'choose_label':'not_choose_label'"  @click="choosewokestatus(index)">{{item.name}}</div> 
            </div>

            <div class="flex-row  margin-top-20 margin-bottom-10">
                <div class="btn flex-1 btn_reset">重置</div> 
                <div style="width:10px"></div>
                <div class="btn flex-1 btn_confirm">确定</div> 
            </div>

          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </van-sticky>

    <!-- 门店列表 -->
    <div v-for="(item, index) in storelist" :key="index">
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
.van-cell {
  color: rgb(248, 81, 52) !important;
}
.label_block {
  border-radius: 5px;
  width: 80px;
  line-height: 35px;
  height: 35px;
  text-align: center;
  margin-top: 10px;
  margin-right: 5px;
}
.not_choose_label {
  background: rgb(241, 241, 241);
  border: 1px solid rgb(241, 241, 241);
  color: black;
}
.choose_label {
  background: rgb(255, 245, 245);
  border: 1px solid rgb(255, 151, 125);
  color: rgb(255, 151, 125);
}
.btn{
    padding: 10px;
    border-radius: 30px;
    text-align: center; 
}
.btn_reset{
    border: 1px solid rgb(241, 241, 241);
}
.btn_confirm{
  background: rgb(255, 61, 12);
  border: 1px solid rgb(255, 101, 12);
  color: white;
}
</style>