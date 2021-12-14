<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';

let page = ref({});
let router = useRouter();
PageHelper.Init(page, () => {});
</script>

<template>
  <div  v-if="page.Res!=null"></div>
</template>
<style scoped>

</style>