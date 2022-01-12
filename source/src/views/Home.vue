<script setup>
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { ref, watch } from "vue";
import { Utils } from "../Utils";
import { NModal } from "naive-ui";
import { useRouter,useRoute } from "vue-router";
import Tar from '../components/Tar.vue';

let router = useRouter();
let page = ref({});
let data = ref({});
let showVideo = ref(false);
PageHelper.Init(page, () => {});
 

var diaozhuan = (item) => {
  router.push(item);
  router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
  });
};

PageHelper.loadwechatconfig(()=>{
  wx.getLocation({
          type: 'wgs84', 
          success: function (res) {
     var latitude=res.latitude
 var longitude=res.longitude
 window.localStorage.setItem("latitude",latitude);
  window.localStorage.setItem("longitude",longitude);
          //  alert("success" + JSON.stringify(res));
          },
          fail: function (res) {
              // alert("fail" + JSON.stringify(res));
            console.log("getLocation","fail" + JSON.stringify(res));
          },
          complete: function (res) {
            console.log("getLocation","complete" + JSON.stringify(res));
          }
        });
});

let route = useRoute();
let pathname=ref('');
watch(route,(newVal,oldVal)=>{
  console.log('监听到变化dd8888d',newVal.path);

})
// console.log('监听到变化dd8888d');

</script>

<template>
 <div>
<router-view />
<Tar :pathname="pathname"></Tar>
 </div>
</template>




<style scoped>
img {
  max-width: 100%;
  border-style: none;


  
}
.firstcontent {
  width: 100%;
  height: 50vw;
  max-height: 900px;
  background-size: cover;
  background-position-y: 69%;
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
  clip-path: polygon(0 0, 100% 0, 100% 87%, 0 100%);
}
.firstcontent .content_box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.firstcontent .imgbox {
  max-width: 23%;
}
.secondcontent {
  width: 100%;
  max-height: 650px;
  height: 40vw;
  display: flex;
  justify-content: center;
}
.secondcontent .content_box {
  width: 77%;
  height: 100%;
  position: relative;
}
.secondcontent .content_box .left_box {
  /* float: left; */
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.secondcontent .content_box .left_box .textblock1,
.threecontent .box_content .contentbox2 {
  font-size: 3.5vw;
  color: #0095e7;
  max-width: 50%;
  font-weight: 700;
}
.secondcontent .content_box .left_box .textblock {
  font-size: 2.1vw;
  color: #333333;
  font-weight: 700;
  max-width: 60%;
  margin-top: 2.5vw;
}
.secondcontent .content_box .right_box {
  /* float: right; */
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.secondcontent .imgbox {
  max-height: 650px;
  width: 425px;
}
.threecontent {
  margin-top: -13.3%;
  width: 100%;
  height: 62vw;
  max-height: 1100px;
  margin-bottom: 0;
  overflow: hidden;
  pointer-events: none;
  position: relative;
  z-index: 2;
  -webkit-clip-path: polygon(0 24.5%, 100% 0, 100% 100%, 0 100%);
  clip-path: polygon(0 24.5%, 100% 0, 100% 100%, 0 100%);
}
.threecontent .box_video video {
  width: 100%;
  z-index: 1;
}

.threecontent .box_content {
  display: flex;
  flex-direction: column;
  height: auto;
  width: 50%;
  position: absolute;
  margin-top: -38.75%;
  z-index: 100;
  /* background: rgba(0, 0, 0, 0.5); */
  border-top-right-radius: 35px;
  border-bottom-right-radius: 35px;
}
.threecontent .box_content .contentbox2 {
  max-width: 60%;
  padding-left: 22.8%;
}
.threecontent .box_content .contentbox3 {
  color: #fff;
  font-size: 2.18vw;
  padding: 2vw 0 2vw 22.8%;
  font-weight: 700;
  background: rgba(0, 0, 0, 0.32);
  margin-top: 0.5vw;
}
.fourcontext {
  width: 100%;
  height: 81vh;
  max-height: 842px;
  margin-top: 5%;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.fourcontext::after {
  background-image: linear-gradient(
    340deg,
    #f7b334,
    #fd8300 134%,
    #be5625 167%
  );
  background-position: 50%;
  background-size: cover;
  bottom: 0;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
  z-index: 1;
}
.fourcontext .box_content {
  width: 77%;
  height: 100%;
  display: flex;
  flex-direction: row;
  z-index: 10;
}
.fourcontext .box_content .left_box {
  width: 50%;
  height: auto;
  color: #fff;
  z-index: 2;
}
.fourcontext .box_content .left_box .left_box_content {
  padding-top: 15%;
}
.fourcontext .box_content .left_box .left_box_content_title,
.fivecontent .box_content .right_box .right_box_Title,
.sixcontent .box_content_title {
  font-size: 1.7rem;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.9px;
  line-height: 1.33;
  text-align: left;
  font-weight: 700;
}
.fourcontext .box_content .left_box .left_box_content_text,
.fivecontent .box_content .right_box .right_box_text .contentbox2 {
  margin-left: -0.7rem;
  font-size: 1.05vw;
}
.fourcontext button,
.sixcontent button {
  border: 2px solid #fff;
  color: #fff;
}
.fourcontext .button:hover,
.sixcontent button:hover {
  background: #fff;
  border-color: transparent;
  color: #444;
}
.fourcontext .box_content .right_box {
  width: 50%;
  height: auto;
  z-index: 2;
}
.fourcontext .box_content .right_box .right_box_img {
  width: 100%;
  height: auto;
  margin-top: 35%;
}
.fourcontext .box_content .right_box img {
  max-width: 100%;
  height: auto;
  border-radius: 35px;
  position: static;
}
@media screen and (max-width: 879px) {
  .fourcontext .box_content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .fourcontext .box_content .right_box {
    width: 60%;
  }
}
.fivecontent {
  width: 100%;
  /* height: 25.063vw; */
  margin-top: 10%;
  max-height: 460px;
  display: flex;
  justify-content: center;
}
.fivecontent .box_content {
  width: 77%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.fivecontent .box_content .left_box {
  width: 50%;
  height: auto;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 35px;
}
.fivecontent .box_content .left_box img {
  width: 100%;
  height: 100%;
}
.fivecontent .box_content .right_box {
  width: 50%;
  height: auto;
  padding-left: 10%;
}
.fivecontent .box_content .right_box .right_box_Title {
  color: #0095e7;
}
@media screen and (max-width: 879px) {
  .fivecontent .box_content .left_box {
    display: none;
  }
  .fivecontent {
    /* height: 75.063vw; */
  }
  .fivecontent .box_content .right_box {
    width: 100%;
  }
}
.sixcontent {
  width: 100%;
  height: 69vw;
  max-height: 1325px;
  margin-top: 8vw;
  display: flex;
  justify-content: center;
  background-size: cover;
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
  clip-path: polygon(0 0, 100% 0, 100% 87%, 0 100%);
}
.sixcontent .box_content {
  width: 77%;
  height: auto;
  padding-top: 8%;
  color: #fff;
}
.sixcontent .title_white_short_line:after {
  margin-top: 5.5%;
}
.sixcontent .box_content .box_content_text {
  max-width: 38%;
  margin-top: 5.5%;
}
.sixcontent .box_content .box_content_text .text {
  font-size: 1.25vw;
}
@media screen and (max-width: 789px) {
  .sixcontent .box_content .box_content_text {
    max-width: 100%;
    /* margin-top: 5.5%; */
  }
}
.WrapperModalVideo {
  max-width: 100%;
}
.WrapperModalVideo video {
  max-width: 100%;
}
@media only screen and (min-width: 100em) {
  .secondcontent .content_box .left_box .textblock1,
  .threecontent .box_content .contentbox2 {
    font-size: 42px;
  }
  .secondcontent .content_box .left_box .textblock1 {
    max-width: 250px;
  }
  .threecontent .box_content .contentbox2 {
    max-width: 430px;
  }
  .secondcontent .content_box .left_box .textblock {
    font-size: 30px;
    margin-top: 50px;
  }
  .threecontent .box_content .contentbox3 {
    font-size: 30px;
    padding: 20px 0 20px 22.8%;
    margin-top: 30px;
  }

  .fourcontext .box_content .left_box .left_box_content_title,
  .fivecontent .box_content .right_box .right_box_Title,
  .sixcontent .box_content_title {
    font-size: 28px;
  }

  .fourcontext .box_content .left_box .left_box_content_text,
  .fivecontent .box_content .right_box .right_box_text .contentbox2 {
    font-size: 16px;
  }
  .sixcontent .box_content .box_content_text .text {
    font-size: 20px;
  }
  .sixcontent {
    margin-top: 150px;
  }
}
</style>