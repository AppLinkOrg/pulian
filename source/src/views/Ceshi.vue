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

var boda=()=>{
    // var phoneNumber='14785296314'
    //  window.location.href = 'tel://' + phoneNumber

     clearInterval(timer)
}

let wanchengt=ref(false);
let num=ref(0)
// 判断服务支付情况
let timer = setInterval(() => {
     //需要定时执行的代码
     num.value=num.value+1
   console.log(1111);
   if(num.value==10){
clearInterval(timer)
}
},1000)

let imglist=ref([])

var shanchuan=()=>{
  // PageHelper.loadwechatconfig(()=>{
 wx.chooseImage({
	count: 1, // 默认9
	sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
	sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
	success: function (res) {
		var localIds = res.localIds; 
    // alert(JSON.stringify(res))

  // syncUpload(localIds,0)

    // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
//  imglist.value.push(localIds)


    wx.getLocalImgData({
    localId: localIds.toString(),
    success: function (res) {
        const localData = res.localData;
        let imageBase64 = '';
        if (localData.indexOf('data:image') == 0) {
            //苹果的直接赋值，默认生成'data:image/jpeg;base64,'的头部拼接
            imageBase64 = localData;
        } else {
            //此处是安卓中的唯一得坑！在拼接前需要对localData进行换行符的全局替换
            //此时一个正常的base64图片路径就完美生成赋值到img的src中了
            imageBase64 = 'data:image/jpeg;base64,' + localData.replace(/\n/g, '');
        }
        // imglist.value.push(imageBase64)
baocun(imageBase64)
      // alert(JSON.stringify(imglist))
    },
  fail:function(res){
    alert(JSON.stringify(res))
  }
  
});


	},
  fail:function(res){
    alert(JSON.stringify(res))
  }
});
// });


}

var syncUpload=(localIds,index)=>{
  wx.uploadImage({
    localId:localIds,
    isShowProgressTips: 0,
    success:function(res){

    },
    fail:function (res) {
      
    }

  })

}


var baocun=(e)=>{

HttpHelper.UploadBase64("resource", e).then((ret) => {
  if (ret.code==0) {
imglist.value.push(ret.result)
    alert(JSON.stringify(imglist))
  }else{
    Toast('上传失败')
  }
    
      });
    



}


</script>

<template>
  <div  v-if="page.Res!=null">
      <div @click="shanchuan">上传图片</div>

      <img v-for="(item,index) in imglist" :key="index" :src="page.uploadpath + 'resource/' + item" class="icon-20"/>

      <div @click="baocun2">保存</div>
  </div>
</template>
<style scoped>

</style>