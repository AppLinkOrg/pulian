<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';
// import { eventBus } from "../eventBus";


let page = ref({});
let router = useRouter();
let route = useRoute();
let addresslist=ref([]);
let type=ref('');

PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});


type.value=route.query.type

// 点击添加新地址
var newdizhi=()=>{
    router.push('/addressadd?type=A')
}

// 我的地址列表
HttpHelper.Post('address/addresslist',{}).then((res)=>{
addresslist.value=res
})



//点击编辑地址信息
var bianji=(e)=>{

    if (type.value=='C') {
      localStorage.setItem('addressid', e)
       router.go(-1)
        // router.go({name:'submitintegral',params:{addressid:e}})
        return
        
    }
router.push('/addressadd?type=B&id='+e)
}

 const onClickLeft = () => history.back();
</script>

<template>
  <div  v-if="page.Res!=null">
      <van-nav-bar
  title="地址管理"
  left-text="返回"
  left-arrow
  fixed
  @click-left="onClickLeft"
/>
<div class="h-50"></div>
<!-- <div v-show="false">
         <van-nav-bar
  title="地址管理"
  left-text="返回"
  left-arrow
 
  @click-left="onClickLeft"
/>
</div> -->


      <div class="margin-left-14 margin-right-14">
          <div class="margin-top-15 bg-w border-radius-9 flex-row flex-center padding-15" v-for="(item,index) in addresslist" :key="index" @click="bianji(item.id)">
              <div >
                  <div class="flex-row flex-center">
                      <div class="moren line-height-18 center c-6 f-10 margin-right-10" v-if="item.xuanzhogn_value=='Y' && type !='C' " >默认</div>
                      <div class=" c-2 bold f-15">{{item.address}} {{item.xianxi}}</div>
                  </div>
                  <div class="margin-top-10 c-1 f-12">{{item.shouhuo}}  {{item.phone}}</div>

              </div>
              <div class="flex-1"></div>
              <img :src="page.uploadpath + 'resource/' + page.Res.youjian" class="icon-12" />
          </div>
      </div>


                            <!--  -->
          <div class="position-bottom " style="bottom:20px">
              <div class="margin-left-14 margin-right-14 h-40 line-height-40 center f-16 c-w bold bg-5 border-radius-20" @click="newdizhi">
添加新地址
              </div>

          </div>
 

  </div>
</template>
<style scoped>

</style>