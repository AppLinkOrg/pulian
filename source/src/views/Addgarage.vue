<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";

let page = ref({});

let router = useRouter();
let route = useRoute();
 

PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});

var list = ref({});

var carbrand_id = ref("");
var carseries_id = ref("");
var carmodel_id = ref("");

var brand_name = ref("");
var model_name = ref("");
var series_name = ref("");

if (
  route.query.carbrand_id != null &&
  route.query.carseries_id != null &&
  route.query.carmodel_id != null
) {
  carbrand_id.value = route.query.carbrand_id;
  carseries_id.value = route.query.carseries_id;
  carmodel_id.value = route.query.carmodel_id;

  HttpHelper.Post("carbrand/selectcar", {
    carbrand_id: carbrand_id.value,
    carseries_id: carseries_id.value,
    carmodel_id: carmodel_id.value,
  }).then((res) => {
    brand_name.value = res.brand_name;
    model_name.value = res.model_name;
    series_name.value = res.series_name;
    console.log(list, "返回值");
  });
}

var provinceslist = ref({});
HttpHelper.Post("store/provinceslist", {}).then((res) => {
  provinceslist.value = res;
});

// 选择品牌车系
var pingpai = () => {
  router.push("/choosebrand");
};

var caridname = ref("");
var caridname_input = (e) => {
  caridname.value = e;
  // console.log(e,'内容啊啊啊')
};

var provinces_name = ref("粤");
var onConfirm = (e) => {
  provinces_name.value = e.nickname;
  show.value = false;
  console.log(e);
};

var show = ref(false);
var showpopup = (type) => {
  show.value = type;
};

var tishi = ref(false);
var showmodel = (status) => {
  tishi.value = status;
};

//提交表单
var confrim = (e) => {
  // Toast('请选择品牌车系');

  if (provinces_name.value == "") {
    Toast("请选择车牌归属地");
    return;
  }
  if (caridname.value == "") {
    Toast("请填写车牌号");
    return;
  }
  if (carbrand_id.value == "") {
    Toast("请选择品牌车系");
    return;
  }
  // return;
  HttpHelper.Post("member/addmycar", {
    carbrand_id: carbrand_id.value,
    carseries_id: carseries_id.value,
    carmodel_id: carmodel_id.value,
    plateno: provinces_name.value + "·" + caridname.value,
  }).then((res) => {
    provinceslist.value = res;
    tishi.value = false;
    // router.go();
    router.replace("/myselef");
  });
};
</script>

<template>
  <div v-if="page.Res != null">
    <van-nav-bar
      title="添加车辆"
      left-text="返回"
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <div class="h-50"></div>

    <div class="padding-15">
      <div class="padding-add bg-w border-radius-9">
        <div class="flex-row flex-center padding-15">
          <div class="flex-1"></div>
          <img
            :src="page.uploadpath + 'resource/' + page.Res.saomiao"
            class="icon-18"
          />
          <div class="bold f-14 c-6 margin-left-4">扫描驾驶证自动填写</div>
          <div class="flex-1"></div>
        </div>
        <div class="h-1 bg-1"></div>
        <div class="h-53 flex-row flex-center margin-left-14 margin-right-14">
          <div class="c-2 f-14 w-90">车牌号</div>

          <div class="flex-row" @click="showpopup(true)">
            <div class="c-2 f-14">{{ provinces_name }}</div>
            <img
              :src="page.uploadpath + 'resource/' + page.Res.xiajian"
              class="icon-8 margin-left-4"
            />
          </div>
  
          <van-field
            v-model="caridname"
            @update:model-value="caridname_input"
            placeholder="请输入用户名"
          />
        </div>
        <div class="h-1 bg-1"></div>
        <div
          class="h-53 flex-row flex-center margin-left-14 margin-right-14"
          @click="pingpai"
        >
          <div class="c-2 f-14 w-90">品牌车系</div>
          <input
            type="text"
            placeholder="请选择您的品牌"
            class="f-14 c-2 flex-1"
            @click="pingpai()"
            :value="brand_name + ' ' + model_name + ' ' + series_name"
          />
          <img
            :src="page.uploadpath + 'resource/' + page.Res.youjian"
            class="icon-12 margin-left-4"
          />
        </div>
      </div>
    </div>

    <!--  -->
    <div class="center c-1 f-12 margin-top-15">
      所填信息为交管局所需，我们将严格保密，请您放心填写
    </div>
    <!--  -->
    <div class="position-bottom" style="bottom: 20px">
      <div
        class="
          margin-left-14 margin-right-14
          h-40
          line-height-40
          center
          f-16
          c-w
          bold
          bg-5
          border-radius-20
        "
        @click="showmodel(true)"
      >
        保存
      </div>
    </div>

    <van-popup v-model:show="show" position="bottom">
      <van-picker
        title="选择车牌归属地"
        :columns="provinceslist"
        value-key="nickname"
        @confirm="onConfirm"
        @cancel="showpopup(false)"
        @change="onChange"
      />
    </van-popup>

    <van-dialog
      v-model="showdelete"
      v-model:show="tishi"
      title="确认保存？"
      show-cancel-button
      class="text-center"
      @confirm="confrim"
      @cancel="showmodel(false)"
    >
    </van-dialog>
  </div>
</template>
<style scoped>
.padding-add {
  padding: 19px 12px 0px 14px;
}
</style>