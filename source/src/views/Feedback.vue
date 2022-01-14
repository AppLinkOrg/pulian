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

// neirong
let neirong=ref('');

// tijiao
var tijiao=()=>{

     var imglistarr=""
    if (imglist.value.length>0) {
        imglistarr=imglist.value.join(",")
    }else{
imglistarr=''
    }


    // console.log(neirong.value.length<5);
    if (neirong.value.length<5) {
        Toast('请输入您要反馈的问题（5-500字以内）')
        return
    }
    HttpHelper.Post('feedback/feedbackadd',{
        neirong:neirong.value,
         imglist:imglistarr
        }).then((Res)=>{
    if (Res.code==0) {
         Toast('提交成功')
         neirong.value=''
         imglist.value=[]
    }else{
        Toast('提交失败')
    }
})
}

// tupian
let imglist=ref([])
var tupian=()=>{
  HttpHelper.UploadImage("picture",(Res)=>{
        imglist.value.push(Res.result)
    })
}

</script>

<template>
  <div  v-if="page.Res!=null" class="big-bg">
      <div class="padding-15 h-200 ">
         
<textarea placeholder="请输入您要反馈的问题（5-500字以内）"   maxlength="500" minlength="5"  class="f-12 c-2 padding-15 bg-1 border-radius-9" v-model="neirong" 
          style="width:100%;border:none;height:100%"></textarea>
    <div class="c-2 f-14 bold margin-top-20">图片（选填，提供问题截图）</div>

<div class="flex-row flex-center margin-top-10 " style="display: flex;display: -webkit-flex;justify-content: space-between;flex-direction: row;flex-wrap: wrap;" >
 <img :src="page.uploadpath+'picture/'+item" class="icon-70 margin-left-10" v-for="(item,index) in imglist" :key="index" />

    <img :src="page.uploadpath + 'resource/' + page.Res.paizjao" class="icon-80" @click="tupian"/>
     <div class="flex-1"></div >
</div>

          

      </div>

                         <!--  -->
          <div class="position-bottom " style="bottom:20px">
              <div class="margin-left-14 margin-right-14 h-40 line-height-40 center f-16 c-w bold bg-5 border-radius-20" @click="tijiao">
提交意见
              </div>

          </div>


  </div>
</template>
<style scoped>

</style>