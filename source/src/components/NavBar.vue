
   

<script setup>
// import { inject } from "@vue/composition-api";

import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import store from "../State";

const props = defineProps({
  title: String,
});

let title = ref("");

let route = useRoute();
let router = useRouter();

const onClickLeft = () => {
  if (history.state.back == null) {
    router.push("/");
  } else {
    history.back();
  }

  console.log("进来了", history);
  //  history.back()
};
const onClickRight = () => {
  console.log("进来了", history);
  //  history.back()
};
title.value = props.title;
console.log(props.title, "可以拿到父组件的数据");

watch(
  () => route,
  (e) => {
    console.log("可以拿到父组件的数据");
  }
);
</script>

<template>
  <div>
    <!-- fixed -->
    <van-nav-bar
      left-text="返回"
      left-arrow
      :title="store.state.title"
      fixed
      @click-left="onClickLeft"
    />
    <div v-show="true">
      <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
  </div>
</template>
<style scoped>
/deep/.van-nav-bar--fixed {
  z-index: 999;
}
</style>