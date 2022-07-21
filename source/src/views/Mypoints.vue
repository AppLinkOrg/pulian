<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
import { logLight } from "naive-ui/lib/log/styles";

let page = ref({});
let router = useRouter();
let route = useRoute();
let show = ref(false);
let leixin = ref("");
let pointsmallist = ref([]);
let qiandaocha = ref({});
let qiandaocha2 = ref(0);
let instinfo = ref({});
let show1 = ref(0);

PageHelper.LoginAuth(page, () => {});
HttpHelper.Post("inst/instinfo", {}).then((Res) => {
  console.log(Res,'11');  
  instinfo.value = Res;
});
var shouquan = () => {
  PageHelper.LoginAuth(page, () => {});

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
};
let timer = setInterval(() => {
  //需要定时执行的代码
  wancheng();
}, 1000);
var wancheng = () => {
  if (page.value.Memberinfo == null) {
    PageHelper.LoginAuth(page, () => {});
    return;
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
PageHelper.Init(page, () => {});

HttpHelper.Post("member/info", {}).then((res) => {
  console.log(res, "ssssssssss");
  pointsmallist.value = res;
});
// 初始化展示列表
HttpHelper.Post("pointsmall/pointsmallist", { leixinss: leixin.value }).then(
  (res) => {
    pointsmallist.value = res;
  }
);

// 点击积分充值
var chongzhi = () => {
  router.push("/recharge");
};

// 点击积分明细
var mingxi = () => {
  router.push("/integraldetail");
};

// 积分兑换分类
var dianji = (e) => {
  leixin.value = e;
  poinlist(e);
};

// 积分物品 列表
var poinlist = (e) => {
  HttpHelper.Post("pointsmall/pointsmallist", { leixinss: e }).then((res) => {
    pointsmallist.value = res;
  });
};

// 点击立即兑换
var xinqing = (e) => {
  router.push("/materialdetail?id=" + e.id + "&type=" + e.type);
};

// 兑换记录dianji
var jilu = () => {
  router.push("/exchangerecord");
};

// 查询签到情况
var qinakuan = () => {
  HttpHelper.Post("qiandao/qiandaocha", {}).then((res) => {
    qiandaocha.value = res;
  });
  HttpHelper.Post("qiandao/qiandaocha2", {}).then((res) => {
    qiandaocha2.value = res;
  });
};
qinakuan();

// 点击签到
var qiandao = () => {
  if (
    page.value.Memberinfo.shoujisq != "B" ||
    page.value.Memberinfo.touxiang != "B"
  ) {
    shouquan();
  }else{
    if (qiandaocha2.value == 1) {
    Toast("已签到");
    return;
  }
  HttpHelper.Post("qiandao/qiandaoadd", {}).then((res) => {
    if (res.code == 0) {
      PageHelper.LoginAuth(page, () => {});
      qinakuan();
      Toast("签到成功");
    } else {
      Toast("签到失败");
    }
  });
  }
  
};

// 添加车辆信息
var tianche = () => {
  
  if (page.value.Memberinfo.tianjiache == "B") {
    HttpHelper.Post("pointsrecord/pointsrecordadd", {
      type: "B",
      num: "100",
      jia: 1,
      jifenzhuan: "A",
    }).then((res) => {
      if (res.code == 0) {
        PageHelper.LoginAuth(page, () => {});
        Toast("领取成功");
      } else {
        Toast("领取失败");
      }
    });
    return;
  }
  if (page.value.Memberinfo.tianjiache == "C") {
    Toast("已领取");
    return;
  }

  // router.push('/addgarage')

  router.push("/editvegicle?first=B");
};

// 完善车俩填写信息
var quwan = () => {
  if (
    page.value.Memberinfo.tianjiache == "B" ||
    page.value.Memberinfo.tianjiache == "C"
  ) {
  } else {
    Toast("请先添加车辆");
    return;
  }
  if (page.value.Memberinfo.wanche == "B") {
    HttpHelper.Post("pointsrecord/pointsrecordadd", {
      type: "C",
      num: "100",
      jia: 1,
      jifenzhuan: "A",
    }).then((res) => {
      if (res.code == 0) {
        PageHelper.LoginAuth(page, () => {});
        Toast("领取成功");
      } else {
        Toast("领取失败");
      }
    });

    return;
  }
  if (page.value.Memberinfo.wanche == "C") {
    Toast("已领取");
    return;
  }
  router.push("/garage");
};

// guize 规则
var guize = () => {
  router.push("partnership?type=C");
};

let taskintegral = ref(null);
HttpHelper.Post("taskintegral/detail", {}).then((res) => {
  taskintegral.value = res;
});
</script>

<template>
  <div v-if="page.Res != null">
    <div
      class="h-160"
      :style="{
        backgroundImage:
          'url(' + page.uploadpath + 'resource/' + page.Res.integralbg + ')',
      }"
      style="background-size: 100%; background-repeat: no-repeat"
    ></div>

    <div class="margin-top-f160"></div>
    <div class="margin-left-14 margin-right-14">
      <div class="flex-row flex-center padding-top-20">
        <div class="flex-1"></div>
        <div class="f-12 c-w" @click="mingxi()">积分明细</div>
      </div>
      <!--  -->
      <div class="flex-row flex-center padding-top-5">
        <div class="f-12 c-w">我的积分</div>
        <div class="flex-1"></div>
      </div>
      <!--  -->
      <div class="flex-row flex-center margin-top-16">
        <img
          :src="page.uploadpath + 'resource/' + page.Res.xinxin"
          class="icon-26"
        />
        <div class="f-30 bold c-w margin-left-4" v-if="page.Memberinfo != null">
          {{ page.Memberinfo.jifen }}
        </div>
        <div class="flex-1"></div>
        <div
          class="
            h-25
            padding-left-10 padding-right-10
            line-height-25
            f-12
            c-6
            bg-w
            border-radius-12
          "
          @click="chongzhi"
        >
          积分充值
        </div>
      </div>
    </div>
    <!--  -->
    <div
      class="
        margin-left-14 margin-right-14
        border-radius-9
        bg-w
        padding-15
        margin-top-30
      "
    >
      <div class="flex-row flex-center">
        <div class="c-2 f-15 bold">已连续签到</div>
        <div class="c-6 f-15">{{ qiandaocha.return }}</div>
        <div class="c-2 f-15 bold">天</div>
        <div class="flex-1"></div>
        <div class="c-6 f-12 bold" @click="guize">积分规则</div>
      </div>
      <div class="margin-top-40 flex-row flex-center">
        <div v-for="(item, index) in qiandaocha.result" :key="index">
          <div class="margin-right-16">
            <div
              class="
                border-radius-50
                icon-30
                bg-1
                line-height-30
                f-12
                c-8
                bold
                center
              "
              v-if="item == 0"
            >
              +{{instinfo.zengsong}}
            </div>
            <img
              :src="page.uploadpath + 'resource/' + page.Res.xinxin"
              class="icon-30"
              v-else
            />
            <div
              class="margin-top-5 c-2 f-9 center"
              style="white-space: nowrap"
            >
              周{{
                index == 0
                  ? "一"
                  : index == 1
                  ? "二"
                  : index == 2
                  ? "三"
                  : index == 3
                  ? "四"
                  : index == 4
                  ? "五"
                  : index == 5
                  ? "六"
                  : "日"
              }}
            </div>
          </div>
        </div>
        <!-- <div class="margin-right-16" >
                  <img :src="page.uploadpath + 'resource/' + page.Res.liwu" class="icon-30"/>
                <div class="margin-top-5 c-2 f-12 center">2天</div>
              </div> -->
      </div>
      <div
        class="
          margin-left-20 margin-right-20
          bg-5
          center
          c-w
          f-16
          h-40
          line-height-40
          margin-top-25
          border-radius-20
        "
        @click="qiandao"
      >
        {{ qiandaocha2 == 1 ? "已签到" : "签到" }}
      </div>
    </div>

    <!--任务领积分  -->
    <div class="f-15 bold c-2 padding-15">任务领积分</div>
    <!--  -->
    <div class="margin-left-14 margin-right-14">
      <div class="bg-w border-radius-5 padding-15">
        <div class="flex-row flex-center">
          <img
            :src="page.uploadpath + 'resource/' + page.Res.che"
            class="icon-40"
          />
          <div class="margin-left-10">
            <div class="flex-row flex-center">
              <div class="f-14 c-2">添加车辆</div>
              <img
                :src="page.uploadpath + 'resource/' + page.Res.xinxin"
                class="icon-14"
              />
              <div class="c-6 bold f-14">
                +{{ taskintegral != null ? taskintegral.addcar : 0 }}
              </div>
            </div>
            <div class="margin-top-10 c-2 f-12">添加车牌车系</div>
          </div>
          <div class="flex-1"></div>
          <div
            class="
              f-12
              c-6
              padding-left-14 padding-right-14
              h-25
              line-height-25
              border-radius-12
              bd-5
            "
            :class="[
              page.Memberinfo.tianjiache == 'B' ||
              page.Memberinfo.tianjiache == 'C'
                ? 'sty1'
                : 'sty2',
            ]"
            v-if="page.Memberinfo != null"
            @click="tianche()"
          >
            {{
              page.Memberinfo.tianjiache == "B"
                ? "领取"
                : page.Memberinfo.tianjiache == "C"
                ? "已领取"
                : "去完成"
            }}
          </div>
        </div>

        <div class="flex-row flex-center margin-top-15">
          <img
            :src="page.uploadpath + 'resource/' + page.Res.zu"
            class="icon-40"
          />
          <div class="margin-left-10">
            <div class="flex-row flex-center">
              <div class="f-14 c-2">完善车辆信息</div>
              <img
                :src="page.uploadpath + 'resource/' + page.Res.xinxin"
                class="icon-14"
              />
              <div class="c-6 bold f-14">
                +{{ taskintegral != null ? taskintegral.wanshang : 0 }}
              </div>
            </div>
            <div class="margin-top-10 c-2 f-12">完善车辆信息</div>
          </div>
          <div class="flex-1"></div>
          <div
            class="
              f-12
              c-6
              padding-left-14 padding-right-14
              h-25
              line-height-25
              border-radius-12
              bd-5
            "
            @click="quwan"
            :class="[
              page.Memberinfo.wanche == 'B' || page.Memberinfo.wanche == 'C'
                ? 'sty1'
                : 'sty2',
            ]"
            v-if="page.Memberinfo != null"
          >
            {{
              page.Memberinfo.wanche == "B"
                ? "领取"
                : page.Memberinfo.wanche == "C"
                ? "已领取"
                : "去完成"
            }}
          </div>
        </div>
      </div>

    </div>

    <div class="h-100"></div>
  </div>
</template>
<style scoped>
.inimg {
  /* width: 165px;
  height: 110px; */

  width: 160px;
  height: 106px;
}
.sty1 {
  background: linear-gradient(90deg, #409eff 0%, #67b0fd 100%);
  color: #fff;
}
.sty2 {
  border: 1px solid #409eff;
  color: #409eff;
}
</style>