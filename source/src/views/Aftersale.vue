<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';

let page = ref({});
let router = useRouter();
let route = useRoute();
let miaoshu=ref('')
let leixin=ref('A')
let pintrecorddetail=ref({})

PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});



// 订单详情
HttpHelper.Post('pintrecord/pintrecorddetail',{id:route.query.id}).then((res)=>{
    pintrecorddetail.value=res
})

// 选择
var xa=(e)=>{
leixin.value=e
}

// 提交
var tijiao=()=>{
    if (miaoshu.value=='') {
        Toast('请描述问题')
        return
    }
    var imglis=imglist.value
    var a=imglis.toString();
    // alert(JSON.stringify(imglis))

    // return
    var type=route.query.leixin
    HttpHelper.Post('aftersale/aftersaleadd',{
        pingjia:miaoshu.value,
        fuwu:leixin.value,
        pintrecord_id:route.query.id,
        imglist:a,
        leixin:type
    }).then((res)=>{
        if (res.code==0) {
          miaoshu.value='' 
          imglist.value=[] 
            Toast('提交成功')
        }else if (res.code==-2) {
            Toast(res.return)
        }else{
 Toast('提交失败')
        }
  
})


}

  const onClickLeft = () => history.back();


//   shangchuan 上传图片
let imglist=ref([]);
var shangchuan=()=>{

//     var data = HttpHelper.UploadImage("resource")
// alert('进来了------')
// alert(JSON.stringify(data))


    // HttpHelper.UploadImage("resource").then((ret) => {
    //      alert(JSON.stringify('进来了------'))
    //     imglist.value.push=ret.result
        
    //     alert(JSON.stringify(ret))

    //   });


       HttpHelper.UploadImage("picture",(ret)=>{
   imglist.value.push(ret.result)
       })
}





</script>

<template>
  <div  v-if="page.Res!=null">
      <van-nav-bar
  title="申请售后"
  left-text="返回"
  left-arrow
  fixed
  @click-left="onClickLeft"
/>

<div class="h-50"></div>

    <!-- <div v-show="false">
     <van-nav-bar
  title="申请售后"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>
    </div> -->

  



        <div class="h-300 bg-7 "></div>
      <div class="margin-top-f300"></div>
      <div class="margin-left-14 margin-right-14 ">
          <div class="margin-top-20 bg-w border-radius-9 padding-15">
              <div class="c-2 f-15 bold ">服务类型</div>
              <div class="flex-row flex-center margin-top-15">
                   <div class="h-30 bd-4 line-height-30 padding-left-30 padding-right-30 border-radius-13 c-2 f-12"  :class="[leixin=='A'? 'yan1':'yan2']" @click="xa('A')" :style="{'color':(leixin=='A'?'#2B99FE':''),'border':(leixin=='A'?' 1px solid #2B99FE;':'')}">换货服务</div>
                    <div class="h-30 bd-4 line-height-30 padding-left-30 padding-right-30 border-radius-13 c-2 f-12 margin-left-14" :class="[leixin=='B'? 'yan1':'yan2']" @click="xa('B')" :style="{'color':(leixin=='B'?'#2B99FE':''),'border':(leixin=='B'?' 1px solid #2B99FE;':'')}">退货服务</div>
              </div>
               
          </div>
 <!--  -->
          <div class="padding-15 bg-w border-radius-9 margin-top-10">
             <div class="flex-row ">
                  <img :src="page.uploadpath + 'pointsmall/' + pintrecorddetail.pointsmall_img" class="icon-80"/>
                  <div class="margin-left-10 flex-row flex-column" style="width:100%">
                      <div class="f-14 c-2 bold " style="width:100%">{{pintrecorddetail.pointsmall_name}}</div>
                      <div class="flex-1"></div>
                      <div class="flex-row " style="width:100%">
                          <div class="c-6 f-14">{{pintrecorddetail.integral}}积分</div>
                          <div class="flex-1"></div>
                          <div class="c-1 f-12">x1</div>
                      </div>
                  </div>
             </div>

          </div>
          <!--  -->
          <div class="padding-15 bg-w border-radius-9 margin-top-10">
              <div class="f-15 c-2 bold">问题描述</div>
                <!--  -->
          <div class="margin-top-15  bg-1 border-radius-5 h-200  padding-15">
              <textarea class="flex-1  bg-1 h-100 f-12 c-2" style="border:none;width:100%" placeholder="请在此描述问题" v-model="miaoshu"></textarea>

              <div class="flex-row flex-center"  style="display: flex;display: -webkit-flex;justify-content: space-between;flex-direction: row;flex-wrap: wrap;"> 
 <img v-for="(item,index) in imglist" :key="index" :src="page.uploadpath + 'picture/' + item" class="icon-70 margin-right-10"/>
 

             <div class="bd-4 radius-5 icon-70 flex-row flex-column " @click="shangchuan">
                  <div class="flex-1"></div>
                    <img :src="page.uploadpath + 'resource/' + page.Res.paizhao" class="icon-25"/>
                    <div class="margin-top-8  c-1 f-10">上传图片</div>
                     <div class="flex-1"></div>
              </div>
               <div class="flex-1" style="visibility: hidden" v-if="imglist.length>0"></div>
          
 <!-- <img  :src="page.uploadpath + 'resource/' +  page.Res.paizhao" class="icon-70" @click="shangchuan"/> -->

              </div>



            

          </div>
    
          </div>

      </div>


                              <!--  -->
          <div class="position-bottom " style="bottom:20px">
              <div class="margin-left-14 margin-right-14 h-40 line-height-40 center f-16 c-w bold bg-5 border-radius-20" @click="tijiao">
提交
              </div>

          </div>

      

  </div>
</template>
<style scoped>
.yan1{
border: 1px solid #2B99FE;
color: #2B99FE;
}
.yan2{
border: 1px solid #E4E4E4 ;
color: #333333;
}
</style>