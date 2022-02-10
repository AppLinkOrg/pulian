<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from 'vant';

let page = ref({});
let router = useRouter();
let route = useRoute();
let morendetail=ref({})
let pointsmadetail=ref({})
let addressid=ref('')
let show=ref(false)


PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});


addressid.value = localStorage.getItem('addressid')
 
localStorage.setItem('addressid', '')

// 获取详情数据
HttpHelper.Post('pointsmall/pointsmadetail',{id:route.query.id}).then((res)=>{
    pointsmadetail.value=res
})

// 获取用户默认地址信息
HttpHelper.Post('adress/moren',{addressid:addressid.value}).then((res)=>{

    morendetail.value=res
})

// 选择地址
var xzdizhi=()=>{
    router.push('/addressguan?type=C')
}

// 提交订单
var tijiao=()=>{
    // 判断是否填写信息
    if (morendetail.value==null) {
        Toast('请选择地址')
        return
    }
    // 判断用户积分是否足够
    if (pointsmadetail.value.point*1>page.value.Memberinfo.jifen*1) {
        show.value=true
        return
    }

  

    HttpHelper.Post('pintrecord/pintrecordadd',{
        shouhuo:morendetail.value['shouhuo'],
        phone:morendetail.value['phone'],
        address:morendetail.value['address'],
        xianxi:morendetail.value['xianxi'],
        pointsmall_id:route.query.id,
        }).then((res)=>{
            if (res.code==0) {

                if (pointsmadetail.value.type=='A') {
                    router.push('/ordersucess?type=C')

                    
                }else{
                    router.push('/ordersucess?type=A')
                }


                

                // Toast('兑换成功')
                
            }else{
Toast('兑换失败')
            }

})

}

const onClickLeft = () => history.back();

var renwu=()=>{
    show.value=false
    router.push('/integral')
}

var chognzhi=()=>{
      show.value=false
    router.push('/recharge')
}
</script>

<template>
  <div  v-if="page.Res!=null">
    <!-- <van-nav-bar
  title="提交订单"
  left-text="返回"
  left-arrow
  fixed
  @click-left="onClickLeft"
/>
<div class="h-50"></div> -->
      <div class="h-200 bg-5 "></div>
      <div class="margin-top-f200"></div>

      <div class="margin-left-14 margin-right-14 ">
          <div class="margin-top-20 padding-15 bg-w border-radius-9 flex-row flex-center" v-if="morendetail!=null" @click="xzdizhi()">
              <div>
                  <div class="c-2 bold f-15">{{morendetail.address}}{{morendetail.xianxi}}</div>
                  <div class="margin-top-10 c-2 f-12 ">{{morendetail.shouhuo}} {{morendetail.phone}}</div>

              </div>
              <div class="flex-1"></div>
              <img :src="page.uploadpath + 'resource/' + page.Res.youjian" class="icon-12"/>

          </div>

           <div class="margin-top-20 padding-15 bg-w border-radius-9 flex-row flex-center" v-else @click="xzdizhi()">
              <div class="c-1 f-15">
                请选择地址

              </div>
              <div class="flex-1"></div>
              <img :src="page.uploadpath + 'resource/' + page.Res.youjian" class="icon-12"/>

          </div>
          <!--  -->
          <div class="padding-15 bg-w border-radius-9 margin-top-10">
             <div class="flex-row ">
                  <img :src="page.uploadpath + 'pointsmall/' + pointsmadetail.img" class="icon-80"/>
                  <div class="margin-left-10 flex-row flex-column" style="width:100%">
                      <div class="f-14 c-2 bold ">{{pointsmadetail.name}}</div>
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
                 <div class="f-14 c-6">{{pointsmadetail.point}}积分</div>
             </div>

          </div>
          <!--  -->
          <!-- <div class="padding-15 bg-w border-radius-9 margin-top-10">
              <div class="flex-row flex-center">
                  <div class="f-14 c-1 ">订单编号</div>
                  <div class="flex-1"></div>
                  <div class="f-14 c-1">323423523423525</div>
              </div>
              <div class="margin-top-20 flex-row flex-center">
                     <div class="f-14 c-1 ">兑换时间</div>
                  <div class="flex-1"></div>
                  <div class="f-14 c-1">2021-09-23 23:34:35</div>
              </div>
          </div> -->

          <!--  -->



      </div>


     
        <div class="position-bottom bg-w">
            <div class="flex-row flex-center h-50 margin-left-14 margin-right-14">
              <div>
                   <div class="flex-row flex-center">
                
                <div class="f-16  c-5 bold">{{pointsmadetail.point}}积分</div>
               </div>
        
              </div>
              <div class="flex-1"></div>
              <div class="h-38 line-height-38 c-w bold f-14 bg-3 " style="padding:0 48px;border-radius: 5px 15px 5px 15px;" @click="tijiao">提交订单</div>
            </div>
        </div>

         <!-- 嵌入内容 -->
      <van-overlay :show="show" @click="show = false">
  <div class="wrapper" @click.stop>
    <div class="block" >
        <div class="flex-row flex-center">
            <div class="flex-1"></div>
            <img :src="page.uploadpath + 'resource/' + page.Res.cha" class="icon-13" @click="show=false"/>
           

        </div>
         <div class="bold c-1 f-16 center">积分不足</div>
            <div class="c-2 margin-top-26 center">您当前有{{page.Memberinfo.jifen}}积分， 还差{{pointsmadetail.point-page.Memberinfo.jifen}}积分即可兑换。</div>
            <div class="margin-top-30 flex-row flex-center" style="width:100%">
                <div class="btn-1 bd-5 border-radius-13 f-12 c-6 center line-height-26" @click="renwu">做任务</div>
                <div class="flex-1"></div>
                 <div class="btn-1 bg-6 border-radius-13 f-12  center line-height-26  c-w " @click="chognzhi">去充值</div>
            </div>
    </div>
  </div>
</van-overlay>


  </div>
</template>
<style scoped>

</style>