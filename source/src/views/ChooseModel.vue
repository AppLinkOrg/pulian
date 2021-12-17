<script setup>
import { ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import { HttpHelper } from "../HttpHelper";
import { PageHelper } from "../PageHelper";

let router = useRouter();
let route = useRoute();

let page = ref({});
PageHelper.Init(page, () => {});

var allbrandlist = ref({});

// var abt = [];
// for (var i = 0; i < 16; i++) {
//   abt.push(String.fromCharCode(i + 65));
// }
// console.log(abt, "看看多少");
// 门店详情
HttpHelper.Post("carbrand/brandlist", {}).then((res) => {
  allbrandlist.value = res;
});

var toseries = () => {  
  router.push("/chooseseries");
};

</script>

<template>
  <div class="" v-if="page.Res != null">
    <div>车型</div>
  </div>
</template>
<style scoped>
.brand_icon {
  width: 40px;
  height: 40px;
}
</style>