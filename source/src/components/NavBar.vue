
   

<script setup>
import { inject } from "@vue/composition-api";
import { ref } from "@vue/reactivity";



let page = ref({});

let title=ref('');
  title.value = inject("title");

 const onClickLeft = () => history.back();

</script>

<template>
  <div >
         <van-nav-bar
  left-text="返回"
  left-arrow
  :title="title"
  fixed
  @click-left="onClickLeft"
/>

  </div>
</template>
<style scoped>

</style>