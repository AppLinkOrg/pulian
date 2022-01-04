<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';

let page = ref({});
let router = useRouter();
let route = useRoute();
let oldpassword=ref('')
let newpassword=ref('')

PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});


var save=()=>{
    if(oldpassword.value==''){
        Toast('请填写原密码')
        return
    }
    if(newpassword.value==''){
        Toast('请填写新密码')
        return
    }
    if(newpassword.value==oldpassword.value){
        Toast('新旧密码请勿一样')
        return
    }

    HttpHelper.Post("account/update",{
        oldpassword:oldpassword.value,
        newpassword:newpassword.value
    }).then((res)=>{
        if (res.code==0) {
   
             window.localStorage.removeItem("token")
            Toast('修改成功')
            
        }else{
            Toast(res.result)
        }

    })



}
</script>


<template>
  <div  v-if="page.Res!=null">
      <div class="flex-row h-53 flex-center c-2 f-16 bold padding-left-14">
          修改密码
      </div>

     <div class="bg-w">
          <div class="flex-row flex-center h-53 flex-center  bd-9 padding-left-14  padding-right-14  ">
          <div class="c-1 f-14  ">原密码</div>
    
          <input type="password" class="c-2 f-14 flex-1 right"  placeholder="请填写原密码" v-model="oldpassword" />
      </div>
      <div class="flex-row h-53 flex-center  bd-9 padding-left-14  padding-right-14 ">
          <div class=" c-1 f-14  ">新密码</div>
          <input type="password" class="c-2 f-14 right flex-1" placeholder="请填写新密码" v-model="newpassword"/>
      </div>
     </div>

             <!--  -->
          <div class="position-bottom " style="bottom:20px">
                            <div class="margin-left-14 margin-right-14 h-40 line-height-40 center f-16 c-w bold bg-5 border-radius-20" @click="save">
保存修改
              </div>
          </div>

  </div>
</template>
<style scoped>

</style>