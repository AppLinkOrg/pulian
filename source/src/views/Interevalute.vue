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


let biaoqianlist=ref([]);
let miaoshu=ref('');
let num =ref(0);
let xzshow=ref(0);
let pintrecorddetail=ref({});
let type=ref('')


type.value=route.query.type
// 订单详情

if (type.value=='A') {
    HttpHelper.Post('order/orderdetail',{id:route.query.id}).then((res)=>{
    pintrecorddetail.value=res
})
}else{
HttpHelper.Post('pintrecord/pintrecorddetail',{id:route.query.id}).then((res)=>{
    pintrecorddetail.value=res
})
}



// 标签列表
HttpHelper.Post('biaoqian/biaoqianlist',{}).then((res)=>{
    biaoqianlist.value=res
})

// 点击星星
var stardian=(e)=>{
    num.value=e

}
// 点击选择标签
var dianjixz=(e)=>{
xzshow.value=e
}

// 发布
var fabu=()=>{
    if (num.value==0) {
        Toast('请点评')
        return
    }

    var imglistarr=""
    if (imglist.value.length>0) {
        imglistarr=imglist.value.join(",")
    }else{
imglistarr=''
    }


// console.log(imglistarr);
// alert(imglistarr)
// return
    if (type.value=='A') {
            HttpHelper.Post('evaluate/addevaluate2',{
        dianping:num.value,
        neirong:miaoshu.value,
        biaoqian_id:biaoqianlist.value[xzshow.value].id,
        order_id:route.query.id,
        imglist:imglistarr
    }).then((res)=>{
        if (res.code==0) {
             Toast('评论成功')
             num.value=0
             miaoshu.value=''
             xzshow.value=0
             imglist.value=[]
        }else{
        Toast(res.return)
//  Toast('评论失败')
        }
    
})
        
    }else{
            HttpHelper.Post('evaluate/addevaluate',{
        dianping:num.value,
        neirong:miaoshu.value,
        biaoqian_id:biaoqianlist.value[xzshow.value].id,
        pintrecord_id:route.query.id,
        imglist:imglistarr

    }).then((res)=>{
        if (res.code==0) {
             Toast('评论成功')
             num.value=0
             miaoshu.value=''
             xzshow.value=0
             imglist.value=[]
        }else{
        Toast(res.return)
//  Toast('评论失败')
        }
    
})

    }



}

// shanchaun 上传图片
let imglist=ref([]);
var shanchaun=()=>{
    HttpHelper.UploadImage("picture",(Res)=>{
        imglist.value.push(Res.result)

     

    })
}



</script>

<template>
 <div  v-if="page.Res!=null" class="big-bg">
  
      <div class="h-200"  :style="{
            backgroundImage:
              'url(' + page.uploadpath + 'resource/' + page.Res.evbg + ')',
          }" style="background-size:100%;background-repeat: no-repeat"></div>
          <div class="margin-top-f200"></div>
          <!--  华语专业汽修-->
          <div class="margin-top-20 margin-left-14 margin-right-14 bg-w border-radius-9 padding-15" v-if="type!='A'">
              <!-- <div class="f-14 c-2 bold ">{{pintrecorddetail.pointsmall_name}}</div> -->
              <div class="flex-row flex-center margin-top-10">
  <img :src="page.uploadpath + 'pointsmall/' + pintrecorddetail.pointsmall_img" class="icon-90 border-radius-9"/>
                <div class="margin-left-10">
                    <div class="f-14 c-1 bold">{{pintrecorddetail.pointsmall_name}}</div>
                    <div class="c-6 margin-top-10 f-10">{{pintrecorddetail.integral}}积分</div>
                    <!-- <div class="c-2 margin-top-10 f-10">数量：1</div>
                    <div class="c-2 margin-top-10 f-10">总价：¥23</div> -->
                </div>
        
              </div>
          </div>
          <!--  -->
              <!--  华语专业汽修-->
          <div class="margin-top-20 margin-left-14 margin-right-14 bg-w border-radius-9 padding-15" v-else>
              <div class="f-14 c-2 bold ">{{pintrecorddetail.store_name}}</div>
              <div class="flex-row flex-center margin-top-10">
  <img :src="page.uploadpath + 'store/' + pintrecorddetail.store_tupian" class="icon-90 border-radius-9"/>
                <div class="margin-left-10">
                    <div class="f-14 c-1 ">{{pintrecorddetail.service_name}}</div>
                    <div class="c-2 margin-top-10 f-10">有效期至：{{pintrecorddetail.effective_time}}</div>
                    <div class="c-2 margin-top-10 f-10">数量：{{pintrecorddetail.num}}</div>
                    <div class="c-2 margin-top-10 f-10">总价：¥{{pintrecorddetail.totalamount}}</div>
                </div>
        
              </div>
          </div>
          <!-- 点评 -->
          <div class="flex-row flex-center margin-top-20  margin-left-14 margin-right-14 ">
              <div class="c-2 f-14 bold">点评</div>
              <div v-for="item in 5" :key="item" @click="stardian(item)">
 <img :src="page.uploadpath + 'resource/' + page.Res.star4" class="icon-20 margin-left-10" v-if="num<item"  />
  <img :src="page.uploadpath + 'resource/' + page.Res.star3" class="icon-20 margin-left-10"  v-else />
              </div>
               <div class="c-1 f-12 margin-left-14" v-if="num==1">差</div>
                <div class="c-1 f-12 margin-left-14" v-if="num==2">一般</div>
                <div class="c-1 f-12 margin-left-14" v-if="num==3">好</div>
                <div class="c-1 f-12 margin-left-14" v-if="num==4">非常好</div>
                 <div class="c-1 f-12 margin-left-14" v-if="num==5">优秀</div>
          </div>
          <!--  -->
          <div class="flex-row flex-center margin-left-14 margin-right-14 margin-top-20" style="overflow: scroll;">
              <div class="h-24 padding-left-10 padding-right-10 c-1 f-12 line-height-24 bg-1 border-radius-12 margin-right-5" @click="dianjixz(index)" :class="[xzshow==index? 'yan2':'yan1']" style="flex:none" v-for="(item,index) in biaoqianlist" :key="index">{{item.name}}</div>

          </div>
          <!--  -->
          <div class="margin-top-15 margin-left-14 margin-right-14 bg-1 border-radius-5 h-200  padding-15">
              <textarea class="flex-1  bg-1 h-100 f-12 c-2" style="border:none;width:100%" placeholder="效果如何，服务是否周到，环境怎么样？" v-model="miaoshu">
              </textarea>

              <div class="flex-row ">
         
 <img :src="page.uploadpath+'picture/'+item" class="icon-70 margin-left-10" v-for="(item,index) in imglist" :key="index" />


           
                  

                  <div class="bd-4 radius-5 icon-70 flex-row flex-column "  @click="shanchaun">
                  <div class="flex-1"></div>
                    <img :src="page.uploadpath + 'resource/' + page.Res.paizhao" class="icon-25"/>
                    <div class="margin-top-8  c-1 f-10">上传图片</div>
                     <div class="flex-1"></div>
              </div>
              </div>
          </div>
          <!--  -->
          <div class="position-bottom" style="bottom:20px">
              <div class="margin-left-14 margin-right-14 h-40 line-height-40 center f-16 c-w bold bg-5 border-radius-20" @click="fabu">
发布
              </div>

          </div>
 </div>
</template>
<style scoped>
.yan1{
   background: #F6F6F6;
    color: #333333;
}
.yan2{
   background: rgba(236, 245, 255, 0.8);
    color: #409EFF;
}
</style>