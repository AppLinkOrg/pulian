<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';

let page = ref({});
let router = useRouter();
let route = useRoute();

let startime=ref('');
let endtime=ref('');
let starshow=ref(false);
let endshow=ref(false);


PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});

// 门店信息
let storedetail2=ref(null)
var mendian=()=>{
  HttpHelper.Post("store/storedetail2",{}).then((Res)=>{
storedetail2.value=Res
})
}

mendian();

 

startime.value=new Date();
let minDate=ref('')
minDate.value=new Date();

var  nowTime=(e)=>{//获取当前时间
    var now = new Date(e)
    let _month = ( 10 > (now.getMonth()+1) ) ? '0' + (now.getMonth()+1) : now.getMonth()+1;
    let _day = ( 10 > now.getDate() ) ? '0' + now.getDate() : now.getDate();
    let _hour = ( 10 > now.getHours() ) ? '0' + now.getHours() : now.getHours();
    let _minute = ( 10 > now.getMinutes() ) ? '0' + now.getMinutes() : now.getMinutes();
    let _second = ( 10 > now.getSeconds() ) ? '0' + now.getSeconds() : now.getSeconds();
    return now.getFullYear() + '-' + _month + '-' + _day + ' ' + _hour + ':' + _minute + ':' + _second;
}

var confirm=(e)=>{
  // startime.value=e
   storedetail2.value.star_time=nowTime(e)
   starshow.value=false
}

var starclick=()=>{
   starshow.value=true
}

var endclick=()=>{
  if (storedetail2.value.star_time=='') {
    Toast('请先选择开始时间')
    return
  }
  endshow.value=true
}

var confirm2=(e)=>{
   storedetail2.value.end_time=nowTime(e)
   endshow.value=false
}

var save=()=>{
  HttpHelper.Post("shuju/update",{
    type:'A',
    id:page.value.Memberinfo.store_id,
    star_time:storedetail2.value.star_time,
end_time:storedetail2.value.end_time
    }).then((Res)=>{
      if (Res.code==0) {
        mendian()
        Toast('修改成功')
      }else{
        Toast('修改失败')
      }

  })

}
</script>

<template>
  <div  v-if="page.Res!=null && storedetail2!=null">
         <div class="flex-row h-53 flex-center c-2 f-16 bold padding-left-14">
          门店信息
      </div> 
      <div class="bg-w ">
            <div class="flex-row flex-center h-53 flex-center  bd-9 padding-left-14  padding-right-14  ">
          <div class="c-1 f-14  ">门店名称</div>
    
          <input type="text" class="c-2 f-14 flex-1 right" disabled="disabled"  v-model="storedetail2.name" />
      </div>
        <div class="flex-row flex-center h-53 flex-center  bd-9 padding-left-14  padding-right-14  ">
          <div class="c-1 f-14  ">地址</div>
    
          <input type="text" class="c-2 f-14 flex-1 right" disabled="disabled"  v-model="storedetail2.address" />
      </div>
        <div class="flex-row flex-center h-53 flex-center  bd-9 padding-left-14  padding-right-14  ">
          <div class="c-1 f-14  ">联系人姓名</div>
    
          <input type="text" class="c-2 f-14 flex-1 right" disabled="disabled"  v-model="storedetail2.xinming" />
      </div>
        <div class="flex-row flex-center h-53 flex-center  bd-9 padding-left-14  padding-right-14  ">
          <div class="c-1 f-14  ">联系人电话</div>
    
          <input type="text" class="c-2 f-14 flex-1 right" disabled="disabled"  v-model="storedetail2.phone" />
      </div>
        <div class="flex-row flex-center h-53 flex-center  bd-9 padding-left-14  padding-right-14  ">
          <div class="c-1 f-14  ">营业开始时间</div>
    <div class="flex-1 flex-row " @click="starclick">
       <input type="text" class="c-2 f-14 flex-1 right"   v-model="storedetail2.star_time" disabled="disabled"  />
    </div>
         
      </div>
       <div class="flex-row flex-center h-53 flex-center  bd-9 padding-left-14  padding-right-14  ">
          <div class="c-1 f-14  ">营业结束时间</div>
      <div class="flex-1 flex-row " @click="endclick">
       <input type="text" class="c-2 f-14 flex-1 right"   v-model="storedetail2.end_time" disabled="disabled"  />
    </div>
         
      </div>
        <div class="flex-row flex-center h-53 flex-center  bd-9 padding-left-14  padding-right-14  ">
          <div class="c-1 f-14  ">星级标准</div>
    
          <input type="text" class="c-2 f-14 flex-1 right" disabled="disabled"  v-model="storedetail2.score" />
          <div class="c-2 f-14  right" >星</div>
      </div>

      </div>
         <!--  -->
          <div class="position-bottom " style="bottom:20px">
                            <div class="margin-left-14 margin-right-14 h-40 line-height-40 center f-16 c-w bold bg-5 border-radius-20" @click="save">
保存修改
              </div>
          </div>


          <!-- 择年月日 -->
  <van-popup v-model:show="starshow" position="bottom">
<van-datetime-picker
  v-model="startime"
  type="datetime"
  title="营业开始时间"
  :min-date="minDate"
  :max-date="maxDate"
  @confirm="confirm"
/>
  </van-popup>


            <!-- 择年月日 -->
  <van-popup v-model:show="endshow" position="bottom">
<van-datetime-picker
  v-model="endtime"
  type="datetime"
  title="营业结束时间"
  :min-date="startime"
  :max-date="maxDate"
  @confirm="confirm2"
/>
  </van-popup>

          <!-- 择年月日 -->
  <!-- <van-popup v-model:show="endshow" position="bottom">
              <van-datetime-picker
  v-model="endtime"
  type="datehour"
  title="营业结束时间"
  :min-date="startime"
  :max-date="maxDate"
/>
  </van-popup> -->


  </div>
</template>
<style scoped>

</style>