<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';

let page = ref({});
let router = useRouter();
let route = useRoute();


PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});

var boda=()=>{
    var phoneNumber='14785296314'
     window.location.href = 'tel://' + phoneNumber
}
</script>

<template>
  <div  v-if="page.Res!=null">
      <div @click="boda">拨打</div>
  </div>
</template>
<style scoped>

</style>