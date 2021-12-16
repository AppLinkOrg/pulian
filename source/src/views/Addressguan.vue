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

</script>

<template>
  <div  v-if="page.Res!=null">
      <div class="margin-left-14 margin-right-14">
          <div class="margin-top-15 bg-w border-radius-9 flex-row flex-center padding-15">
              <div >
                  <div class="flex-row flex-center">
                      <div class="moren line-height-18 center c-6 f-10">默认</div>
                      <div class="margin-left-10 c-2 bold f-15">青青草原羊村大门口</div>
                  </div>
                  <div class="margin-top-10 c-1 f-12">牛肉粥  19568447268</div>

              </div>
              <div class="flex-1"></div>
              <img :src="page.uploadpath + 'resource/' + page.Res.youjian" class="icon-12"/>
          </div>
      </div>


                            <!--  -->
          <div class="position-bottom " style="bottom:20px">
              <div class="margin-left-14 margin-right-14 h-40 line-height-40 center f-16 c-w bold bg-5 border-radius-20">
添加新地址
              </div>

          </div>
 

  </div>
</template>
<style scoped>
.moren{
    width: 30px;
height: 18px;
background: #ECF5FF;
border-radius: 4px;
}
</style>