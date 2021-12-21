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

var toseries = (brand_id) => {  
  router.push("/chooseseries?brand_id="+brand_id);
};

</script>

<template>
  <div class="" v-if="page.Res != null">
    <van-index-bar
      :index-list="allbrandlist.bfirstletter"
      style="background: white"
    > 
      <van-index-anchor
        :index="item.bfirstletter"
        v-for="(item, index) in allbrandlist"
        :key="index"
      >
        <div class="bold c-b margin-top-10">{{ item.bfirstletter }}</div>
        <div
          class="flex-row flex-center"
          v-for="(item2, index2) in item.brandlist"
          :key="index2"
          @click="toseries(item2.id)"
        >
          <img class="brand_icon" :src="item2.logo" />
          <van-cell :title="item2.name" />
        </div>
      </van-index-anchor>
    </van-index-bar>
  </div>
</template>
<style scoped>
.brand_icon {
  width: 40px;
  height: 40px;
}
</style>