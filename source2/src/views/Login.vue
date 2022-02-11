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

let show = ref(false);
let account = ref("");
let password = ref("");

var forget = () => {
  show.value = true;
};
var dianhua = () => {
  var phoneNumber = page.value.Inst.instmobile;
  console.log(phoneNumber, "customerservicemobile");
  if (phoneNumber.length > 0) {
    window.location.href = "tel://" + phoneNumber;
  } else {
    Toast("联系方式不正确");
  }
};

var login = () => {
  if (account.value == "") {
    Toast("请输入您的账号");
    return;
  }
  if (password.value == "") {
    Toast("请输入您的密码");
    return;
  }

  HttpHelper.Post("account/login", {
    account: account.value,
    password: password.value,
  }).then((res) => {
    if (res.code == 0) {
      window.localStorage.setItem("token", res.return);
      Toast("登录成功");
      router.push("/");
    } else {
      Toast(res.result);
    }
  });
};
var tocontent = (keycode) => {
//  alert(111)

   router.push("/content?keycode=" + keycode);

};


</script>

<template>
  <div v-if="page.Res != null" class="big-bg">
    <div
      :style="{
        backgroundImage:
          'url(' + page.uploadpath + 'resource/' + page.Res.login + ')',
      }"
      class="h-270"
      style="background-size: 100%; background-repeat: no-repeat"
    >
      <div class="padding-top-40 margin-left-40">
        <div class="f-30 c-w bold">欢迎使用</div>
        <div class="f-18 c-w margin-top-20">车服中心商户端</div>
      </div>
    </div>

    <!-- 账号 -->
    <div class="margin-top-40 margin-left-40 margin-right-40">
      <div class="c-2 f-14">账号</div>
      <input
        placeholder="请输入您的账号"
        class="c-2 f-16 bd-7 padding-bottom-10 padding-top-15"
        v-model="account"
      />
      <div class="c-2 f-14 margin-top-30">密码</div>
      <input
        placeholder="请输入您的密码"
        class="c-2 f-16 bd-7 padding-bottom-10 padding-top-15"
        v-model="password"
      />

      <div
        class="
          margin-top-60
          h-44
          line-height-44
          center
          f-16
          c-w
          bold
          bg-5
          border-radius-9
        "
        @click="login"
      >
        登陆
      </div>
      <div class="flex-row flex-center margin-top-10">
        <div class="f-12 c-2"> </div>
        <div class="flex-2"></div>
        <div class="f-12 c-2 " @click="forget()">忘记密码</div>
      </div>
    </div>

    <!-- 《隐私政策》&《用户协议》 -->
    <div class=" " style="margin-top:50px">
      <div class="center c-6 f-12">
        <span class="" @click="tocontent('yinsi')">《隐私政策》</span>&<span class="" @click="tocontent('xieyi')"
          >《用户协议》</span
        >
      </div>
    </div>
<!-- <div class=" " style="margin-top:50px">
      <div class="center c-6 f-12">
        <span class="" @click="tocontent('yinsi')">《隐私政策》</span>&<span class="" @click="tocontent('xieyi')"
          >《用户协议》</span
        >
      </div>
    </div> -->
    <!--忘记密码  -->

    <van-dialog
      v-model:show="show"
      title="忘记密码"
      show-cancel-button
      confirmButtonText="拨打电话"
      confirmButtonColor="#1890FE"
      @confirm="dianhua"
    >
      <div class="center padding-top-25 padding-bottom-25 c-1 f-14">
        您可以拨打后台管理员电话进行修改
      </div>
    </van-dialog>
  </div>
</template>
<style scoped>
</style>