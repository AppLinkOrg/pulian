<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
import  store  from "../State";


let page = ref({});
let router = useRouter();

PageHelper.Init(page, () => {});

let mycarlist = ref([]);

//查询车库的数目
var shumu=()=>{
  HttpHelper.Post("member/mycarlist", {}).then((res) => {
  mycarlist.value = res;
});
}
shumu();

// 添加爱车
var addche = () => {
   store.changecarbrand_id(0);
    store.changecarseries_id(0);
    store.changecarmodel_id(0);

    if (mycarlist.value.length>0) {
      router.push("/editvegicle?first=A");
    }else{
router.push("/editvegicle?first=B");
    }
  
};

var toedit = (id) => {
    store.changecarbrand_id(0);
    store.changecarseries_id(0);
    store.changecarmodel_id(0);
  router.push("/editvegicle?id="+id);
};


var detele=(id)=>{
  HttpHelper.Post("mycar/detele",{
    type:'A',
    id:id
    }).then((res)=>{
      if (res.code==0) {
        shumu();
        Toast('删除成功')
      }else{
        Toast('删除失败')
      }

  })
}

var morder=(id)=>{

 HttpHelper.Post("mycar/detele",{
    type:'B',
    id:id,
    }).then((res)=>{
      if (res.code==0) {
        shumu();

      }else{
  
      }

  })

}
</script>

<template>
  <div v-if="page.Res != null" class="big-bg">
    <div
      class="margin-top-10 margin-left-14 margin-right-14 bg-w border-radius-9"
      v-for="(item, index) in mycarlist"
      :key="index"
    >
      <div class="flex-row flex-center padding-20">
        <div class="flex-1">
          <div class="f-20 c-2 bold">{{ item.plateno }}</div>
          <div class="margin-top-14 c-1 f-13">{{ item.carseries_id_name }}</div>
        </div>
        <img :src="item.carbrand_logo" class="icon-60" />
      </div>
      <div class="h-1 bg-1"></div>
      <div class="flex-row flex-center padding-15">
        

       <div class="flex-row flex-center" @click="morder(item.id)">
         <div
          class="icon-18 border-radius-50 bd-3"
          v-if="item.isdefault_value != 'Y'"
        ></div>
          <img
          :src="page.uploadpath + 'resource/' + page.Res.wanchegn"
          class="icon-18"
          v-else
        />
        <div class="c-1 f-12 padding-left-10">设为默认车</div>
       </div>

        <div class="flex-1"></div>
        <div class="c-1 f-12" @click="detele(item.id)">删除</div>
        <div class="c-1 f-12 margin-left-10" @click="toedit(item.id)">编辑</div>
      </div>
    </div>

    <div v-if="mycarlist.length==0 "  class="f-20 c-1  center ">
         <img
                :src="page.uploadpath + 'resource/' + page.Res.zanwu"
                class="displat-block margin-auto w-100f"
              />
    </div>





    <!--  -->
    <div class="position-bottom" style="bottom: 20px">
      <div
        class="
          margin-left-14 margin-right-14
          h-40
          line-height-40
          center
          f-16
          c-w
          bold
          bg-5
          border-radius-20
        "
        @click="addche()"
      >
        +添加爱车
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>