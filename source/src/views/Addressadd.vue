<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';

let page = ref({});
let router = useRouter();
let route = useRoute();
let checked=ref(false)
let type=ref('');
let shouhuo=ref('');
let phone=ref('');
let xianxi=ref('');
let show=ref(false)
let str=ref('');
let id=ref(0);
let addressdetail=ref({});


PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});


type.value=route.query.type
console.log(route.query.id,'router');

id.value=route.query.id

if (type.value=='B'&& id.value>0) {
    HttpHelper.Post('address/addressdetail',{id:id.value}).then((res)=>{
    addressdetail.value=res
    shouhuo.value=res.shouhuo
    phone.value=res.phone
    str.value=res.address
    xianxi.value=res.xianxi
    if (res.xuanzhogn_value=='Y') {
        checked.value=true
    }else{
        checked.value=false
    }



})
    
}
// 地址的选择
// var change=(e)=>{
 
   
//     console.log(e,'eee');

// }

var cancel=(e)=>{
    show.value=false
 console.log(e,'eee33');
}
var confirm=(e)=>{
    str.value=''
     for (let index = 0; index < e.length; index++) {
        str.value= str.value+e[index].name
        
    }
    show.value=false
 console.log(e,'eee222');
}

// 点击保存地址
var save=()=>{
    console.log(page.value.Memberinfo,'page');
    if (page.value.Memberinfo==null) {
        Toast('请先授权用户信息');
  return;
    }
    // 判断信息是否填全
    if(shouhuo.value==''){
  Toast('请填写收货人姓名');
  return;
    }
      if(phone.value==''){
  Toast('请填写收货人手机号');
  return;
    }
      if(str.value==''){
  Toast('点击选择收货地址');
  return;
    }
      if(xianxi.value==''){
  Toast('请填写收货人详细地址');
  return;
    }

let xuanzhogn=ref('')
    if (checked.value==false) {
        xuanzhogn.value='N'
    }else{
 xuanzhogn.value='Y'
    }

    

HttpHelper.Post('address/addressadd',{
    shouhuo:shouhuo.value,phone:phone.value,address:str.value,xianxi:xianxi.value,xuanzhogn:xuanzhogn.value,type:type.value,id:id.value
}).then((res)=>{
    if (res.code) {
         Toast('保存成功');
         router.go(-1)
    }else{
         Toast('保存失败');
    }
    
})


    console.log(checked.value,'checked');

}

// 删除地址信息
var shanchu=()=>{
    HttpHelper.Post('address/detele',{id:id.value}).then((res)=>{
     if (res.code) {
         Toast('删除成功');
         router.go(-1)
    }else{
         Toast('删除失败');
    }
})

}

const onClickLeft = () => history.back();
</script>

<template>
  <div  v-if="page.Res!=null" class="h-m100">
<van-nav-bar
  title="编辑地址"
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

      <div class="padding-left-14 padding-right-14 bg-w ">
          <div class="h-44 flex-row flex-center bd-6">
              <div class="w-90 c-2 f-15 bold  ">收货人</div>
              <input type="text" placeholder="请填写收货人姓名" class="c-2 f-14 flex-1" v-model="shouhuo"/>
          </div>
          <div class="h-44 flex-row flex-center bd-6">
              <div class="w-90 c-2 f-15 bold  ">手机号</div>
              <input type="number" placeholder="请填写收货人手机号" class="c-2 f-14 flex-1" v-model="phone"/>
          </div>
          <div class="h-44 flex-row flex-center bd-6">
              <div class="w-90 c-2 f-15 bold  ">收货地址</div>
              <input type="text" placeholder="点击选择收货地址" class="c-2 f-14 flex-1" @click="show=true" v-model="str" onfocus="this.blur();" />
              <img :src="page.uploadpath + 'resource/' + page.Res.youjian" class="icon-12"/>
          </div>
           <div class="h-44 flex-row flex-center bd-6">
              <div class="w-90 c-2 f-15 bold  ">详细地址</div>
              <input type="text" placeholder="例如：xx小区5栋302号" class="c-2 f-14 flex-1" v-model="xianxi" />
          </div>
           <div class="h-53 flex-row flex-center ">
                <div class="c-2 f-14 w-90 bold">设为默认地址</div>
                <div class="flex-1"></div>
            <van-switch v-model="checked" />
           </div> 
      </div>

             <!--  -->
          <div class="position-bottom " style="bottom:20px">
                            <div class="margin-left-14 margin-right-14 h-40 line-height-40 center f-16 c-w bold bg-5 border-radius-20" @click="save">
保存
              </div>
              <div class="margin-left-14 margin-right-14 h-40 line-height-40 center f-16 c-w bold bg-8 border-radius-20 margin-top-15" v-if="type!='A'" @click="shanchu">
删除地址
              </div>

          </div> 

<!--  -->
  <div class="position-bottom " style="bottom:0px" v-if="show">
<van-area title="收货地址" :area-list="areaList" @confirm='confirm' @cancel='cancel'    />
  </div>


  </div>
</template>
<style scoped>

</style>