<script setup>
import { PageHelper } from "../PageHelper";
import { ref } from "@vue/reactivity";
import { HttpHelper } from "../HttpHelper";
import { useRouter, useRoute } from "vue-router";
import { Toast } from "vant";
import  store  from "../State";


let page = ref({});
let router = useRouter();
let route = useRoute();
PageHelper.Init(page, () => {});
PageHelper.LoginAuth(page, () => {});

var list = ref({});
var carinfo = ref({});







var carbrand_id = ref("");
var carseries_id = ref("");
var carmodel_id = ref("");

var brand_name = ref("");
var model_name = ref("");
var series_name = ref("");

var provinces_name = ref("");
var vin = ref("");
var engineno = ref("");
var inspection_date = ref("");
var register_date = ref("");
var caridname = ref("");

// if(store.state.first==0){
// }


if(store.state.first==0){
store.changecarbrand_id(0);
store.changecarseries_id(0);
store.changecarmodel_id(0);
store.changefirst(store.state.first+1);




}else{
  brand_name.value=store.state.brand_name
  model_name.value=store.state.model_name
  series_name.value=store.state.series_name
  provinces_name.value=store.state.provinces_name
  vin.value=store.state.vin
  engineno.value=store.state.engineno
  register_date.value=store.state.register_date
  caridname.value=store.state.caridname

  

}




console.log(store.state.first,'dddd');



if (route.query.id != null) {
  console.log("不走吗？？？");
  HttpHelper.Post("member/mycarinfo", {
    id: route.query.id,
  }).then((res) => {
    carbrand_id.value = res.carbrand_id;
    carseries_id.value = res.carseries_id;
    carmodel_id.value = res.carmodel_id;

    provinces_name.value = res.plateno.slice(0, 1);

    caridname.value = res.plateno.slice(2);
    vin.value = res.vin;
    engineno.value = res.engineno;

    inspection_date.value = res.inspection_date;
    register_date.value = res.register_date;

    if(res.isdefault_value=='Y'){
checked.value=true
    }

    



    HttpHelper.Post("carbrand/selectcar", {
    carbrand_id: carbrand_id.value,
    carseries_id: carseries_id.value,
    carmodel_id: carmodel_id.value,
  }).then((res) => {
    brand_name.value = res.brand_name;
    model_name.value = res.model_name;
    series_name.value = res.series_name;
  });
 
  });
} else {
  provinces_name.value = "粤";
  // 判断是否已选择车系
  // store.state.carbrand_id
  // if (
  //   route.query.carbrand_id != null &&
  //   route.query.carseries_id != null &&
  //   route.query.carmodel_id != null
  // ) {
  //   carbrand_id.value = route.query.carbrand_id;
  //   carseries_id.value = route.query.carseries_id;
  //   carmodel_id.value = route.query.carmodel_id;
  // }


    if (
    store.state.carbrand_id != 0 &&
    store.state.carseries_id != 0 &&
    store.state.carmodel_id != 0
  ) {
    carbrand_id.value = store.state.carbrand_id;
    carseries_id.value = store.state.carseries_id;
    carmodel_id.value = store.state.carmodel_id;
  }


 
}



      HttpHelper.Post("carbrand/selectcar", {
    carbrand_id: carbrand_id.value,
    carseries_id: carseries_id.value,
    carmodel_id: carmodel_id.value,
  }).then((res) => {
    brand_name.value = res.brand_name;
    model_name.value = res.model_name;
    series_name.value = res.series_name;
  });



var selectcar_name = () => {
  HttpHelper.Post("carbrand/selectcar", {
    carbrand_id: carbrand_id.value,
    carseries_id: carseries_id.value,
    carmodel_id: carmodel_id.value,
  }).then((res) => {
    brand_name.value = res.brand_name;
    model_name.value = res.model_name;
    series_name.value = res.series_name;
  });
};

var provinceslist = ref({});
HttpHelper.Post("store/provinceslist", {}).then((res) => {
  provinceslist.value = res;
});

// 选择品牌车系
var pingpai = () => {
  // caridname
  store.changebrand_name(brand_name.value,model_name.value,series_name.value,provinces_name.value,vin.value,engineno.value,inspection_date.value,register_date.value,caridname.value)
  
  router.push("/choosebrand");
};


var caridname_input = (e) => {
  caridname.value = e;
};
var engineno_input = (e) => {
  engineno.value = e;
};
var vin_input = (e) => {
  vin.value = e;
};


//车牌归属地

var onConfirm = (e) => {
  provinces_name.value = e.nickname;
  show.value = false;
  console.log(e);
};

// 弹窗
var show = ref(false);
var show2 = ref(false);
var show3 = ref(false);
var showpopup = (type, status) => {
  if (type == 1) {
    show.value = status;
  } else if (type == 2) {
    show2.value = status;
  } else {
    show3.value = status;
  }
};

//选择注册日期
var getregisterdate = (e) => {
  var now = new Date(e),
    y = now.getFullYear(),
    m = ("0" + (now.getMonth() + 1)).slice(-2),
    d = ("0" + now.getDate()).slice(-2);
  console.log(y, m, d, "多少少时诵诗书");
  register_date.value = y + "-" + m + "-" + d;
  show2.value = false;
};

//选择检验有效期
var getinspectiondate = (e) => {
  var now = new Date(e),
    y = now.getFullYear(),
    m = ("0" + (now.getMonth() + 1)).slice(-2),
    d = ("0" + now.getDate()).slice(-2);
  console.log(y, m, d, "多少少时诵诗书");
  inspection_date.value = y + "-" + m + "-" + d;
  show3.value = false;
};

// 提交提示
var tishi = ref(false);
var showmodel = (status) => {
  tishi.value = status;
};

   //识别

   
    let imglist=ref('')
    var wokank = ()=>{

        HttpHelper.Getimage("resource",(ret)=>{
          // alert(ret)

         
  //  imglist.value=ret.result
  // //  alert(JSON.stringify(imglist.value))
  //  console.log("走了吗")
  //  if (imglist.value=='') {
  //    Toast('上传图片失败')
  //    return
  //  }
     HttpHelper.Post("member/ocr", {
imglist:ret
    }).then((res) => {
      // alert("进来了啊啊啊")
      // alert(JSON.stringify(res))
      if (res.error_code!=undefined) {
        Toast('图片无法识别')
        return
        
      }
       
       var allres=res.words_result;
      console.log(res.words_result.号牌号码.words)

    //   carbrand_id.value = allres.carbrand_id;
    // carseries_id.value = res.carseries_id;
    // carmodel_id.value = res.carmodel_id;

    provinces_name.value = (allres.号牌号码.words).slice(0, 1); 
    caridname.value = (allres.号牌号码.words).slice(1);
    vin.value = allres.车辆识别代号.words;
    engineno.value = allres.发动机号码.words;

    // inspection_date.value = insertStr((allres.发证日期.words)); 
    // inspection_date.value = insertStr((allres.发证日期.words),7,"-"); 

        // register_date.value = insertStr((allres.注册日期.words),4,"-"); 
    register_date.value = insertStr(allres.注册日期.words); 

    console.log(register_date,'多少？')
    // register_date.value = allres.注册日期.words;

    });


       })


  

    }

    var insertStr=(soure, start, newStr)=>{   

   return soure.slice(0, 4) + '-' + soure.slice(4,6)+'-'+soure.slice(6,10);
  }

//提交表单
var confrim = (e) => {
  // Toast('请选择品牌车系');

  if (provinces_name.value == "") {
    Toast("请选择车牌归属地");
    return;
  }
  if (caridname.value == "") {
    Toast("请填写车牌号");
    return;
  }
  if (carbrand_id.value == "") {
    Toast("请选择品牌车系");
    return;
  }
var isdefault='N'
  if (checked.value==true) {
    isdefault='Y'
  }else{
isdefault='N'
  }

//判断编辑还是新增
 console.log(route.query.id);
  if (route.query.id != null) {
    console.log("走的这边还是这边2222222？？？")
    HttpHelper.Post("member/editmycar", {
      id: route.query.id,
      carbrand_id: carbrand_id.value,
      carseries_id: carseries_id.value,
      carmodel_id: carmodel_id.value,
      vin: vin.value,
      engineno: engineno.value,
      register_date: register_date.value,
      inspection_date: inspection_date.value,
      plateno: provinces_name.value + "·" + caridname.value,
      isdefault
    }).then((res) => {
      provinceslist.value = res;
      tishi.value = false;
      router.go(-1);
      // router.replace("/myselef");
    });
  } else {
    console.log("走的这边还是这边11111？？？")
    HttpHelper.Post("member/addmycar", {
      carbrand_id: carbrand_id.value,
      carseries_id: carseries_id.value,
      carmodel_id: carmodel_id.value,
      vin: vin.value,
      engineno: engineno.value,
      register_date: register_date.value,
      inspection_date: inspection_date.value,
      plateno: provinces_name.value + "·" + caridname.value,
      isdefault
    }).then((res) => {
      provinceslist.value = res;
      tishi.value = false;
      router.go(-1);
      // router.replace("/myselef");
    });
  }

//上传图片
  var fileimage=ref("");
  var afters=(file) => {
    console.log("有没有进来");
      console.log("file", file);
      file.status = 'uploading';
      file.message = '上传中...';
      var name = file.file.name;
      HttpHelper.UploadBase64("resource", file.content).then(ret => {
        console.log(ret);
       
        // this.frontPic.push({ img: ret.result, name: name,video:'' });
       fileimage.value=ret.result;

        file.status = 'done';
      
      });
    }

  
   

};

const checked = ref(false);

if (route.query.first=='B') {
  checked.value=true
}

// checked
</script>

<template>
  <div v-if="page.Res != null">
    <div class="padding-15">
      <div class="bg-w border-radius-9">
        <div class="padding-15">
          <div class="padding-add bg-w border-radius-9">
            <div class="flex-row flex-center padding-15" @click="wokank">
              <div class="flex-1"></div>
              <img
                :src="page.uploadpath + 'resource/' + page.Res.saomiao"
                class="icon-18"
              />
              <div class="bold f-14 c-6 margin-left-4"   >扫描行驶证自动填写</div>
              <div class="flex-1"></div>
            </div>
 
           <!-- <van-uploader v-model="fileimage"   accept="image/*"  :after-read="afters"  ></van-uploader> -->

            <div class="h-1 bg-1"></div>

            <div
              class="h-53 flex-row flex-center margin-left-14 margin-right-14"
            >
              <div class="c-2 f-14 w-90" @click="wokank">车牌号</div>

              <div
                class="flex-row"
                @click="showpopup((type = 1), (status = true))"
              >
                <div class="c-2 f-14">{{ provinces_name }}</div>
                <img
                  :src="page.uploadpath + 'resource/' + page.Res.xiajian"
                  class="icon-8 margin-left-4"
                />
              </div>

              <van-field
                v-model="caridname"
                @update:model-value="caridname_input"
                placeholder="请输入车牌号"
              />
            </div>
            <div class="h-1 bg-1"></div>
            <div
              class="h-53 flex-row flex-center margin-left-14 margin-right-14"
              @click="pingpai"
            >
              <div class="c-2 f-14 w-90">品牌车系</div>
              <input
                type="text"
                placeholder="请选择您的品牌"
                class="f-14 c-2 flex-1"
                @click="pingpai()"
                :value="brand_name + ' ' + model_name + ' ' + series_name"
              />
              <img
                :src="page.uploadpath + 'resource/' + page.Res.youjian"
                class="icon-12 margin-left-4"
              />
            </div>

            <div class="h-1 bg-1"></div>
            <div
              class="h-53 flex-row flex-center margin-left-14 margin-right-14"
            >
              <div class="c-2 f-14 w-90">车架号</div>
              <van-field
                v-model="vin"
                @update:model-value="vin_input"
                placeholder="请输入车架号"
              />
            </div>
            <div class="h-1 bg-1"></div>
            <div
              class="h-53 flex-row flex-center margin-left-14 margin-right-14"
            >
              <div class="c-2 f-14 w-90">发动机号</div>
              <van-field
                v-model="engineno"
                @update:model-value="engineno_input"
                placeholder="请输入发动机号"
              />
            </div>
            <div class="h-1 bg-1"></div>
            <div
              class="h-53 flex-row flex-center margin-left-14 margin-right-14"
            >
              <div class="c-2 f-14 w-90">注册时间</div>
              <input
                type="text"
                :value="register_date"
                placeholder="请选择"
                class="f-14 c-2 flex-1"
                @click="showpopup((type = 2), (status = true))"
              />
            </div>
            <div class="h-1 bg-1"></div>
            <div
              class="h-53 flex-row flex-center margin-left-14 margin-right-14"
            >
              <div class="c-2 f-14 w-90">检验有效期</div>
              <input
                type="text"
                :value="inspection_date"
                placeholder="请选择"
                class="f-14 c-2 flex-1"
                @click="showpopup((type = 3), (status = true))"
              />
            </div>
            <div class="h-1 bg-1"></div>
            <div
              class="h-53 flex-row flex-center margin-left-14 margin-right-14"
            >
              <div class="c-2 f-14 w-90">设为默认车辆</div>
              <div class="flex-1"></div>
              <van-switch v-model="checked" />
            </div>
          </div>
        </div>
      </div>

      <div class="c-2 margin-top-10 f-12">
        所填信息为交管局所需，我们将严格保密，请您放心填写
      </div>
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
        @click="showmodel(true)"
      >
        保存
      </div>
    </div>

    <van-popup v-model:show="show" position="bottom">
      <van-picker
        title="选择车牌归属地"
        :columns="provinceslist"
        value-key="nickname"
        @confirm="onConfirm"
        @cancel="showpopup(false)"
        @change="onChange"
      />
    </van-popup>

    <van-popup v-model:show="show2" position="bottom">
      <van-datetime-picker
        v-model="register_date"
        @confirm="getregisterdate"
        type="date"
        title="选择注册时间" 
      />
    </van-popup>

    <van-popup v-model:show="show3" position="bottom">
      <van-datetime-picker
        v-model="inspection_date"
        @confirm="getinspectiondate"
        type="date"
        title="选择检验有效期" 
      />
    </van-popup>

    <van-dialog 
      v-model:show="tishi"
      title="确认保存？"
      show-cancel-button
      class="text-center"
      @confirm="confrim"
      @cancel="showmodel(false)"
    >
    </van-dialog>
  </div>
</template>
<style scoped>
</style>