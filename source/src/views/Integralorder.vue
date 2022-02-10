<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';

let page = ref({});
let router = useRouter();
let route = useRoute();
let show=ref(false)
let pintrecorddetail=ref({});


PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});


let danhao=ref('')
let gongsi=ref('')


var ddxq=()=>{
    // 订单详情
HttpHelper.Post('pintrecord/pintrecorddetail',{id:route.query.id}).then((res)=>{
    pintrecorddetail.value=res
    if(res.aftersale_shstadius!=''){
danhao.value=res.aftersalelist.wldanhao
gongsi.value=res.aftersalelist.gongsi
    }

})
}
ddxq()
// 退款
var tuikuan=()=>{
    show.value=true

}
var quetui=()=>{
    HttpHelper.Post('pintrecord/uppintrecord',{id:route.query.id,type:'A'}).then((res)=>{
    if (res.code==0) {
        router.push('/ordersucess?type=B')
        // Toast('退款成功')
        // router.go(-1)
    }else{
         Toast('退款失败')

    }
})
}

// 删除订单
var shanchu=()=>{
      HttpHelper.Post('pintrecord/uppintrecord',{id:route.query.id,type:'B'}).then((res)=>{
    if (res.code==0) {
        Toast('删除成功')
        router.go(-1)
    }else{
         Toast('删除失败')

    }
})
}

// 收货
var shouhuo=()=>{
         HttpHelper.Post('pintrecord/uppintrecord',{id:route.query.id,type:'C'}).then((res)=>{
    if (res.code==0) {
        Toast('收货成功')
        router.push('/interevalute?id='+route.query.id)
        // router.go(-1)
    }else{
         Toast('收货失败')

    }
})
}
// 请求售后
var shouhou=()=>{
    router.push('/aftersale?id='+route.query.id)
}

// 评价
var pingjia=()=>{
     router.push('/interevalute?id='+route.query.id)
}





// tijiao 
var tijiao=()=>{
    if (danhao.value=='') {
       Toast('请填写物流单号') 
       return
    }
    if (gongsi.value=='') {
       Toast('请填写物流公司') 
       return
    }
    var id=pintrecorddetail.value.id
    HttpHelper.Post("aftersale/update",{
        danhao:danhao.value,
        gongsi:gongsi.value,
        id,
        type:'A'
    }).then((res)=>{
        if (res.code==0) {
           Toast('提交成功')  
ddxq()
        }else{
Toast('提交失败') 
        }

    })




}
var fuzhi=(str)=>{
  PageHelper.Copy(str);
}

let kfshow=ref(false)
var guanbi=()=>{
  kfshow.value=false
}

// lianxi 联系客服
var lianxigg=()=>{
  // alert(111)

  kfshow.value=true;
  return

   wx.miniProgram.navigateTo({url: '/pages/kefu/kefu'});
  //  wx.miniProgram.navigateTo({url: '/pages/kefu/kefu"'});
 
}


var chexiao=()=>{
    var id=pintrecorddetail.value.id
    HttpHelper.Post("aftersale/update",{
        type:'B',

id
    }).then((res)=>{

        if (res.code==0) {
            Toast('撤销成功')
            ddxq()
        }else{
Toast('撤销失败')
        }

    })


}

var chognxin=()=>{
    router.push('/aftersale?id='+route.query.id+'&leixin=A')
}


var shshouhuo=()=>{
    var id=pintrecorddetail.value.id

HttpHelper.Post("aftersale/update",{
    id,
    type:'C'
}).then((res)=>{
    if (res.code==0) {

        Toast('确认收货成功')
      ddxq()  
    }else{
Toast('确认收货失败')
    }

})




}


</script>

<template>
  <div  v-if="page.Res!=null">

      <div class="h-300 bg-7 "></div>
      <div class="margin-top-f300"></div>

       <div class="margin-top-20 c-w f-20 bold margin-left-14" v-if="pintrecorddetail.aftersale_shstadius=='C' && pintrecorddetail.orderstatus=='G' || pintrecorddetail.orderstatus=='H' ||  pintrecorddetail.orderstatus=='F'">{{pintrecorddetail.orderstatus_name}}</div>

   <div v-else>
          <div class="margin-top-20 c-w f-20 bold margin-left-14" v-if="pintrecorddetail.aftersale_shstadius!='' &&  pintrecorddetail.aftersale_shstadius!='D' ">{{pintrecorddetail.aftersale_shstadius=='A'?'审核中':pintrecorddetail.aftersale_shstadius=='B'?'审核失败':pintrecorddetail.aftersale_shstadius=='C'?'审核成功':'审核撤销'}}</div>
   
<div v-else>
    <div class="margin-top-20 c-w f-20 bold margin-left-14" v-if="pintrecorddetail.orderstatus=='D'">交易已关闭</div>
<div class="margin-top-20 c-w f-20 bold margin-left-14" v-if="pintrecorddetail.orderstatus=='B'">运输中</div>
<div class="margin-top-20 c-w f-20 bold margin-left-14" v-if="pintrecorddetail.orderstatus=='C'">交易成功</div>

      <div class="margin-top-20 c-w f-20 bold margin-left-14" v-if="pintrecorddetail.orderstatus!='D'&&pintrecorddetail.orderstatus!='B'&&pintrecorddetail.orderstatus!='C'">{{pintrecorddetail.orderstatus_name}}</div>
</div>
   </div>

<div class="c-w f-14 margin-top-10 margin-left-14 margin-right-14" v-if="pintrecorddetail.aftersale_shstadius=='B' " >拒绝原因：{{pintrecorddetail.aftersalelist.srouce}}</div>


       <div class="margin-left-14 margin-right-14">
          <div class="margin-top-15 bg-w border-radius-9  padding-15">
<!-- <div v-if="pintrecorddetail.orderstatus!='A'&&pintrecorddetail.orderstatus!='D'">
                       <div  class="flex-row flex-center ">
<img :src="page.uploadpath + 'resource/' + page.Res.chesds" class="icon-40"/>
<div class="margin-left-10">
    <div class="c-6 f-12 ">[深圳市]xx小区xx栋门卫签收</div>
    <div class="c-2 f-12 margin-top-10 ">2021-02-30 23:23:34</div>
</div>
                   </div>
                        <div class="h-1  bd-6 margin-top-10  margin-bottom-20  "></div>
</div> -->
              <div  class="flex-row flex-center">
         
               <div>
                          <div class=" c-2 bold f-15">{{pintrecorddetail.address}}</div>
               
                  <div class="margin-top-10 c-1 f-12">{{pintrecorddetail.shouhuo}}  {{pintrecorddetail.phone}}</div>
               </div>
     <div class="flex-1"></div>
              <img :src="page.uploadpath + 'resource/' + page.Res.youjian" class="icon-12"/>
              </div>
    
          </div>
      </div>
       <!--  -->
       <div class="margin-left-14 margin-right-14">
  <div class="padding-15 bg-w border-radius-9 margin-top-10">
             <div class="flex-row ">
                  <img :src="page.uploadpath + 'pointsmall/' + pintrecorddetail.pointsmall_img" class="icon-90-32"/>
                  <div class="margin-left-10 flex-row flex-column" style="width:100%">
                      <div class="f-14 c-2 bold " style="width:100%">{{pintrecorddetail.pointsmall_name}}</div>
                      <div class="flex-1"></div>
                      <div class="flex-row " style="width:100%">
                          <div class="flex-1"></div>
                          <div class="c-1 f-12">x1</div>
                      </div>
                  </div>
             </div>
             <div class="flex-row flex-center margin-top-15">
                 <div class="c-2 f-14 ">实际支付</div>
                 <div class="flex-1"></div>
                 <div class="f-14 c-6">{{pintrecorddetail.integral}}积分</div>
             </div>

          </div>

          <!--  -->
          <div class="padding-15 bg-w border-radius-9 margin-top-10">
              <div class="flex-row flex-center">
                  <div class="f-14 c-1 ">订单编号</div>
                  <div class="flex-1"></div>
                  <div class="f-14 c-1">{{pintrecorddetail.orderno}}</div>
              </div>
              <div class="margin-top-20 flex-row flex-center">
                     <div class="f-14 c-1 ">兑换时间</div>
                  <div class="flex-1"></div>
                  <div class="f-14 c-1">{{pintrecorddetail.time}}</div>
              </div>
                <div class="margin-top-20 flex-row flex-center" v-if="pintrecorddetail.fahuo!=''">
                     <div class="f-14 c-1 ">发货时间</div>
                  <div class="flex-1"></div>
                  <div class="f-14 c-1">{{pintrecorddetail.fahuo}}</div>
              </div>
                <div class="margin-top-20 flex-row flex-center" v-if="pintrecorddetail.danhao!='' ">
                     <div class="f-14 c-1 ">快递单号</div>
                  <div class="flex-1"></div>
                  <div class="c-6 f-12 " @click="fuzhi(pintrecorddetail.danhao)">复制</div>
                  <div class="f-14 c-1 margin-left-10">{{pintrecorddetail.danhao}}</div>
              </div>
                <div class="margin-top-20 flex-row flex-center" v-if="pintrecorddetail.cehngjiao!=''">
                     <div class="f-14 c-1 ">成交时间</div>
                  <div class="flex-1"></div>
                  <div class="f-14 c-1">{{pintrecorddetail.cehngjiao}}</div>
              </div>
          </div>

          <!--  -->
           <div class="padding-15 bg-w border-radius-9 margin-top-10" v-if="pintrecorddetail.aftersale_shstadius!='' &&  pintrecorddetail.aftersale_shstadius!='D' " >
               <div class="flex-row flex-center">
                  <div class="f-14 c-1 ">换货原因</div>
                  <div class="flex-1"></div>
                  <div class="f-14 c-1">{{pintrecorddetail.aftersalelist.pingjia}}</div>
              </div>
              <div class="margin-top-20 flex-row flex-center">
                     <div class="f-14 c-1 ">申请时间</div>
                  <div class="flex-1"></div>
                  <div class="f-14 c-1">{{pintrecorddetail.aftersalelist.time}}</div>
              </div>
           </div>

           <!--  平台地址-->
           <div class="padding-15 bg-w border-radius-9 margin-top-10" v-if="pintrecorddetail.aftersale_shstadius!='' &&  pintrecorddetail.aftersale_shstadius!='D'&&  pintrecorddetail.aftersale_shstadius!='A'&&  pintrecorddetail.aftersale_shstadius!='B' ">
               <div class="f-14 c-2 bold">平台地址</div>
               <div class="c-1 margin-top-10 f-14 ">地址：{{page.Inst.shdizhi}}</div>
<div class="c-1 margin-top-10 f-14 ">收货人: {{page.Inst.shname}}</div>
<div class="c-1 margin-top-10 f-14 ">手机号：{{page.Inst.shphone}}</div>
           </div>
         
           
           <!--物流信息  -->

            <div class="padding-15 bg-w border-radius-9 margin-top-10"  v-if="pintrecorddetail.aftersale_shstadius=='C' && pintrecorddetail.orderstatus=='G' || pintrecorddetail.orderstatus=='H' ||  pintrecorddetail.orderstatus=='I'||  pintrecorddetail.orderstatus=='J' || pintrecorddetail.orderstatus=='F'  " >
             
                  <div class="f-14 c-2 bold">物流信息</div>
               <div class="flex-row margin-top-20 flex-center">
                  <div class="f-14 c-1 ">物流单号</div>
                  <div class="flex-1"></div>
                  <div class="f-14 c-1">{{pintrecorddetail.wldanhao}}</div>
              </div>
              <div class="margin-top-20 flex-row flex-center">
                     <div class="f-14 c-1 ">物流公司</div>
                  <div class="flex-1"></div>
                  <div class="f-14 c-1">{{pintrecorddetail.gongsi}}</div>
              </div>
               <div class="flex-row margin-top-20 flex-center"  v-if="pintrecorddetail.orderstatus=='I' || pintrecorddetail.orderstatus=='J'|| pintrecorddetail.orderstatus=='F'">
                  <div class="f-14 c-1 ">平台发货物流单号</div>
                  <div class="flex-1"></div>
                  <div class="f-14 c-1">{{pintrecorddetail.ptwuliu}}</div>
              </div>
               <div class="margin-top-20 flex-row flex-center"  v-if="pintrecorddetail.orderstatus=='I'|| pintrecorddetail.orderstatus=='J' ||  pintrecorddetail.orderstatus=='F'">
                     <div class="f-14 c-1 ">平台发货物流公司</div>
                  <div class="flex-1"></div>
                  <div class="f-14 c-1">{{pintrecorddetail.ptgognsi}}</div>
              </div>
           </div>
           <!-- 填写单号 -->
         <div v-else>
               <div class=" bg-w border-radius-9 margin-top-10" v-if="pintrecorddetail.aftersale_shstadius!='' &&  pintrecorddetail.aftersale_shstadius!='D' &&  pintrecorddetail.aftersale_shstadius!='A'&&  pintrecorddetail.aftersale_shstadius!='B' &&  pintrecorddetail.orderstatus!='I'&&  pintrecorddetail.orderstatus!='J' " >
               <div class="padding-15">
                    <div class="f-14 c-2 bold">填写单号</div>
                 <div class="margin-top-20 flex-row flex-center">
                     <div class="f-14 c-1 ">物流单号</div>
             
                  <input placeholder="请填写物流单号" class="f-14 c-1 right flex-1" v-model="danhao"/>
                
              </div>
               <div class="margin-top-20 flex-row flex-center">
                     <div class="f-14 c-1 ">物流公司</div>
              
                   <input placeholder="请填写物流公司" class="f-14 c-1 right flex-1" v-model="gongsi"/>
                  <div class="f-14 c-1"></div>
              </div>
               </div>
              <div class="bd-6 margin-top-10"></div>
              <div class="padding-15 ">
                  <div class="h-40  center bg-6 c-w f-15 bold line-height-40 border-radius-20" style="width:100%"  @click="tijiao">提交</div>
              </div>
           </div>
         </div>

         <!-- 确认收货 -->



       </div>
       <div class="h-100"></div>
        <!--  -->
   <div class="position-bottom bg-w">
            <div class="flex-row flex-center h-50 margin-left-14 margin-right-14">
                <div class="flex-1"></div>
                <div v-if="pintrecorddetail.aftersale_shstadius!='' &&  pintrecorddetail.aftersale_shstadius!='D' "  class="flex-row ">
 <div class="h-30 bd-4 line-height-30 padding-left-30 padding-right-30 border-radius-13 c-2 f-12" v-if="pintrecorddetail.aftersale_shstadius!='' && pintrecorddetail.orderstatus!='J'" @click="lianxigg">联系客服</div>
 <div class="h-30 bd-4 line-height-30 padding-left-30 padding-right-30 border-radius-13 c-2 f-12 margin-left-10 " v-if="pintrecorddetail.aftersale_shstadius!=''&&pintrecorddetail.aftersale_shstadius!='B' &&pintrecorddetail.aftersale_shstadius!='C'"  @click="chexiao">撤销申请</div>
 <div class="h-30 bd-4 line-height-30 padding-left-30 padding-right-30 border-radius-13 c-2 f-12 margin-left-10 " v-if="pintrecorddetail.aftersale_shstadius=='B' " @click="chognxin">重新申请</div>
  <div class="h-30 bd-4 line-height-30 padding-left-30 padding-right-30 border-radius-13 c-2 f-12 margin-left-10 " v-if="pintrecorddetail.orderstatus=='I' " @click="shshouhuo">确认收货</div>
   <div class="h-30 bd-4 line-height-30 padding-left-30 padding-right-30 border-radius-13 c-2 f-12" v-if="pintrecorddetail.orderstatus=='J'  " @click="shanchu()">删除订单</div>
                   <div class="h-30 bg-6 line-height-30 padding-left-30 padding-right-30 border-radius-13 c-w  f-12 margin-left-10 "  v-if="pintrecorddetail.orderstatus=='J'" @click="pingjia()">评价</div>
                               
                </div>

                <div v-else class="flex-row ">
 <div class="h-30 bd-4 line-height-30 padding-left-30 padding-right-30 border-radius-13 c-2 f-12" v-if="pintrecorddetail.orderstatus=='A'" @click="tuikuan()">退款</div>
             <div class="h-30 bd-4 line-height-30 padding-left-30 padding-right-30 border-radius-13 c-2 f-12" v-if="pintrecorddetail.orderstatus=='D'|| pintrecorddetail.orderstatus=='F' || pintrecorddetail.orderstatus=='E'  " @click="shanchu()">删除订单</div>
               <div class="h-30 bg-6 line-height-30 padding-left-30 padding-right-30 border-radius-13 c-w  f-12 margin-left-10 " v-if="pintrecorddetail.orderstatus=='B'" @click="shouhuo()">确认收货</div>
                 <div class="h-30 bd-4 line-height-30 padding-left-30 padding-right-30 border-radius-13 c-2 f-12" v-if="pintrecorddetail.orderstatus=='C'" @click="shouhou()">申请售后</div>
                 <div class="h-30 bg-6 line-height-30 padding-left-30 padding-right-30 border-radius-13 c-w  f-12 margin-left-10 "  v-if="pintrecorddetail.orderstatus=='C' " @click="pingjia()">评价</div>
                </div>
            
            </div>
        </div>

        <!--  -->
       <!-- 嵌入内容 -->
      <van-overlay :show="show" @click="show = false">
  <div class="wrapper" @click.stop>
    <div class="block" >
        <div class="flex-row flex-center">
            <div class="flex-1"></div>
            <img :src="page.uploadpath + 'resource/' + page.Res.cha" class="icon-13" @click="show=false"/>
           

        </div>
         <div class="bold c-1 f-16 center">温馨提示</div>
            <div class="c-2 margin-top-26 center">确定要退款订单吗？</div>
            <div class="margin-top-30 flex-row flex-center">
                <div class="btn-1 bd-5 border-radius-13 f-12 c-6 center line-height-26" @click="show=false">暂不退款</div>
                 <div class="btn-1 bg-6 border-radius-13 f-12  center line-height-26 margin-left-20 c-w " @click="quetui">确定退款</div>
            </div>
    </div>
  </div>
</van-overlay>



<van-overlay :show="kfshow" @click="kfshow = false">
  <div class="wrapper" @click.stop>
    <div class="block" >

   <div >
      <div class="flex-row ">
        <div class="flex-1"></div>
        <img :src="page.uploadpath + 'resource/' + page.Res.guianboi" class="icon-25" @click="guanbi"/>

      </div>
      <img :src="page.uploadpath + 'inst/' + page.Inst.arcode" class="icon-220 margin-top-10 margin-left-26  margin-right-26 " />
      <div class="flex-row margin-top-20">
        <div class="flex-1"></div>
        <div class="f-18 bold c-2 f-18">客服微信:{{page.Inst.wxhao}}</div>
        <div class="margin-left-10 f-16 c-6 " @click="fuzhi(page.Inst.wxhao)">复制</div>
         <div class="flex-1"></div>
      </div>


    </div>
    </div>
 
    
  </div>
</van-overlay>

  </div>
</template>
<style scoped>

</style>