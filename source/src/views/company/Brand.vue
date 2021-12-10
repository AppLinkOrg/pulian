<script setup>
import { PageHelper } from "../../PageHelper";
import { HttpHelper } from "../../HttpHelper";
import { ref } from "vue";
import { Utils } from "../../Utils";
let page = ref({});
let data = ref({});
PageHelper.Init(page, () => {});
HttpHelper.Post("page/brand", {}).then((ret) => {
  data.value = ret;
});
</script>

<template>
  <div
    v-if="
      page.Res != null &&
      page.Inst != null &&
      page.Text != null 
    "
  >
    <!-- 第一部分 -->
    <div
      class="firstcontant"
      :style="{
          backgroundImage:
          'url(' + page.uploadpath + 'brand/' + data.firstimg + ')',
      }"
    >
      <div class="flex-row flex-center h100p">
        <div class="flex-1 h100p"></div>
        <div class="center">
          <div class="imgbox center">
            <img
              class="logo"
              :src="page.uploadpath + 'inst/' + page.Inst.logo2"
            />
          </div>
          <h1 class="slogen c-w">
            <div v-html="Utils.HtmlDecode(data.firsttitle)"></div>
          </h1>
        </div>
        <div class="flex-1 h100p"></div>
      </div>
    </div>
    <!-- 第二部分 -->
     <div class="secondcontent flex-row">
      <div class="flex-1"></div>
      <div class="flex-row cont">
          <div class="textblock">
              <h2 class="second_title_first second_title"><div v-html="Utils.HtmlDecode(data.secondtitle)"></div></h2>
              <div class="second_text" v-html="Utils.HtmlDecode(data.secondtext1)"></div>
              <h2 class="second_title"><div v-html="Utils.HtmlDecode(data.secondtitle2)"></div></h2>
              <a href="#"><div class="second_text" v-html="Utils.HtmlDecode(data.secondtext2)"></div></a>
          </div>
        <div class="flex-1"></div>
        <div class="phone imgbox">
          <img :src="page.uploadpath + 'brand/' + data.secondimg" />
        </div>
      </div>
      <div class="flex-1"></div>
    </div>
    <!-- 第三部分 -->
     <div class="thirdcontant">
      <div class="video imgbox">
        <img :src="page.uploadpath + 'brand/' + data.threebgimg" />
      </div>
      <div class="textbox flex-row flex-center">
        <div class="flex-1 contentbox flex-row">
          <div class="flex-1"></div>
          <h2 class="three_title"><div v-html="Utils.HtmlDecode(data.threetitle)"></div></h2>
          <div class="three_text">
              <div v-html="Utils.HtmlDecode(data.threetext)"></div>
          </div>
          <!-- 按钮 -->
          <div class="button-wrapper">
              <button type="button" 
              class="button button--white-solid" aria-label="Watch Video">
              <span><div v-html="Utils.HtmlDecode(data.threebuttom)"></div></span>
              <i>
                <svg width="13" height="15" viewBox="0 0 13 15" 
                  fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M0.811921 0.932373L12.6105 7.74429L0.81192 14.5562L0.811921 0.932373Z" 
                    fill="#555555" 
                    fill-opacity="0.97">
                   </path>
                </svg>
              </i>
              </button>
          </div>
        </div>
        <div class="flex-1"></div>
      </div>
    </div>
    <!-- 第四部分 -->
     <div class="fourcontant">
      <div class="textbox flex-row">
        <div class="box_left">
          <h2 class="four_title"><div v-html="Utils.HtmlDecode(data.fourtitle)"></div></h2>
          <div class="four_text" v-html="Utils.HtmlDecode(data.fourtext)"></div>
        </div>
        <div class="box_rigth">
           <img :src="page.uploadpath + 'brand/' + data.fourimg" />
        </div>
      </div>
    </div>
    <!-- 第五部分 -->
     <div class="fivecontant">
        <div class="Block__content">
            <div class="Block_text_content">
                <h2 class="five_title">
                <div v-html="Utils.HtmlDecode(data.fivetitle)"></div>
                </h2>
                <div class="five_text" v-html="Utils.HtmlDecode(data.fivetext)"></div>
                <!-- 按钮 -->
                <div class="WrapperContent WrapperContent--buttons ">
                    <div class="button-wrapper">
                        <button type="button" 
                            class="button button--white" 
                            aria-label="Watch Video">
                            <span>
                                <div v-html="Utils.HtmlDecode(data.fivebuttom)"></div>
                            </span>
                            <i>
                                <svg width="13" height="15" viewBox="0 0 13 15" fill="none" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.811921 0.932373L12.6105 7.74429L0.81192 14.5562L0.811921 0.932373Z" 
                                        fill="#fff" fill-opacity="0.97">
                                    </path>
                                </svg>
                            </i>
                        </button>
                     </div>
                </div>
            </div>
            <div class="box_img">
                    <img :src="page.uploadpath + 'brand/' + data.fiveimg" />
            </div>   
          </div>
      </div>
      <!-- 第六部分 -->
      <div class="sixcontant flex-row">
        <div class="flex-1"></div>
          <div class="video imgbox"
          :style="{
          backgroundImage:
          'url(' + page.uploadpath + 'brand/' + data.sixbgimg + ')',
      }"
          >
            <!-- <img :src="page.uploadpath + 'brand/' + data.sixbgimg" /> -->
          </div>
          <div class="
           flex-row flex-center">
            <div class="flex-1 contentbox flex-row">
              <div class="flex-1"></div>
                <div class="three_text">
                  <div class="box_min_img">
                    <img :src="page.uploadpath + 'brand/' + data.sixnimimg" />
                  </div>
                  <div class="six_text" v-html="Utils.HtmlDecode(data.sixtext)"></div>
              <!-- 按钮 -->
                  <div class="button-wrapper">
                <button type="button" 
                  class="button button--white-solid" aria-label="Watch Video">
                  <span><div v-html="Utils.HtmlDecode(data.sixbuttom)"></div></span>
                  <i>
                    <svg width="13" height="15" viewBox="0 0 13 15" 
                      fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.811921 0.932373L12.6105 7.74429L0.81192 14.5562L0.811921 0.932373Z" 
                        fill="#555555" 
                        fill-opacity="0.97">
                      </path>
                    </svg>
                  </i>
                </button>
                  </div>
            </div>
            </div>
            <div class="flex-1"></div>
          </div>
      </div>
      <!-- 第七部分 -->
      <div class="sevencontant">
        <div class="fourcontant">
      <div class="textbox flex-row">
        <div class="box_left">
          <h2 class="four_title"><div v-html="Utils.HtmlDecode(data.seventitle)"></div></h2>
          <div class="four_text" v-html="Utils.HtmlDecode(data.seventext)"></div>
          <!-- <div class="RebrandDownloadBlock">
            <a class="SmartButton SmartButton--normal">
              <span><div v-html="Utils.HtmlDecode(data.seventuttom1)"></div></span>
            </a>
            <a class="SmartButton SmartButton--orange">
              <span><div v-html="Utils.HtmlDecode(data.sevenbuttom2)"></div></span>
            </a>
          </div> -->
          <div class="four_text" v-html="Utils.HtmlDecode(data.seventext2)"></div>
        </div>
        <div class="box_rigth">
           <img :src="page.uploadpath + 'brand/' + data.sevenimg" />
        </div>
      </div>
    </div>
      </div>
      <!-- 第八部分 -->
      <div class="eightcontant">
        <div class="box_contant">
          <div class="box_title">
            <h2 class="heading_title">
              <div v-html="Utils.HtmlDecode(data.eighttitle)"></div>
            </h2>
            <p class="paragraph paragraph--dark">
              <div v-html="Utils.HtmlDecode(data.eighttext)"></div>
            </p>
            
          </div>
          <div class="box_img">
            <div class="box_img1">
              <img :src="page.uploadpath + 'brand/' + data.eightimg3" />
            </div>
            <div class="RebrandApp__Store">
              <div class="RebrandApp__Store_name">
                <p><div v-html="Utils.HtmlDecode(data.eightmintitle)"></div></p>
              </div>
              <div class="RebrandApp__Store_buttons">
                <img :src="page.uploadpath + 'brand/' + data.eightimg1" />
                <img :src="page.uploadpath + 'brand/' + data.eightimg2" />
              </div>              
            </div>
          </div>
        </div>
      </div>


  </div>
</template>
<style scoped>
.firstcontant {
  height: 50vw;
  background-size: cover;
  background-position: center;
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 41.6667vw, 0 100%);
  clip-path: polygon(0 0, 100% 0, 100% 36.6667vw, 0 100%);
  padding-bottom: 9.3vw;
}
.firstcontant .center{
    padding-top: 5vw;
}
.firstcontant .imgbox {
  width: 100%;
}
.firstcontant .logo {
  max-width: 500px;
}
.firstcontant .slogen {
  font-size: 32px;
}
.secondcontent .cont {
  width: 76vw;
  padding: 0 16px;
}
.secondcontent .textblock {
  padding-right: 3.333vw;
  padding-top: 1.333vw;
  max-width: 522px;
}

.secondcontent .phone img {
  width: 30vw;
}
.secondcontent .second_title{
  color: #555;
  font-size: 2.1875vw;
  letter-spacing: -.9px;
  text-align: left;
  font-weight: 400;
}
.secondcontent .second_title_first::after,
.three_title::after,
.four_title::after,
.five_title::after,
.eightcontant .heading_title::after{
  background-color: #f7b334;
  content: "";
  display: block;
  height: 2px;
  margin-top: 20px;
  width: 80px;
}
.secondcontent .second_text{
  color: #555;
  font-size: 18px;
  max-width: 41.6667vw;
  font-weight: 300;
  text-align: left;
}
.thirdcontant {
  margin-top: -30vw;
  -webkit-clip-path: polygon(0 17%,100% 0,100% 100%,0 100%);
  clip-path: polygon(0 8.333vw, 100% 0, 100% 100%, 0 100%);
}
.thirdcontant video {
  width: 100%;
  z-index: 1;
}
.thirdcontant .textbox {
  position: absolute;
  width: 100vw;
  z-index: 999;
  margin-top: -450px;
}
.thirdcontant .contentbox {
  display: block;
  padding: 0 0 0 6vw;
  background-color: rgba(0, 0, 0, 0.65);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  text-align: center;
  color: white;
  text-align: left;

}
.thirdcontant .three_title{
  font-size: 2.1875vw;
  font-weight: 400;
  width: 100%;
  letter-spacing: -.0469vw;
  margin: 0 0 16px;
  
}
.thirdcontant .three_text{
  font-size: 1.25vw;
  line-height: 1.42;
  font-weight: 400;
  margin: 0 0 1rem;
  width: 70%;
}
.fourcontant{
    display: flex;
    justify-content: center;
    align-content: center;
}
.fourcontant .textbox{
    width: 76vw;
    margin: 0,auto;
    padding: 96px 0;
    text-align: left;
      color: #555;
}
.fourcontant .four_title{
  font-size: 2.1875vw;
  letter-spacing: -.9px;
  line-height: 1.33;
  font-weight: 400;
}
.fourcontant .four_text{
  font-size: 18px;
  line-height: 1.42;
  max-width: 41.6667vw;
  padding: 0;
  font-size: 16px;
  font-weight: 300;
}
.fourcontant img{
    width: 100%;
}
.fivecontant{
  z-index: 1;
    padding-bottom: 13.0208vw;
    padding-top: 5.2083vw;
    background: linear-gradient(210deg,#468eb5,#412799 33.43%,#28034e 73.01%,#721d8c);
}
.fivecontant .Block__content{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    z-index: 1;
}
.fivecontant .Block_text_content{
 max-width: 77.0833vw;
 margin: 0 auto;
 width: 100%;
 color: #fff;
 text-align: left;
 z-index: 1;
}
.fivecontant .five_title{
  font-size: 2.1875vw;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -.9px;
  line-height: 1.33;
  font-weight: 400;
}
.fivecontant .five_text{
  font-size: 18px;
  line-height: 1.42;
  max-width: 36.67vw;
  padding: 0;
  font-weight: 400;
}
.fivecontant .box_img{
    padding: 3.125vw;
    width: 100%;
}
.fivecontant .box_img img{
    width: 100%;
}
 .sixcontant {
  margin-top: -15vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; 
} 
.sixcontant .imgbox{
  bottom: 0;
  background-size: cover;
  clip-path: polygon(0 9%,100% 0,100% 100%,0 100%);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 1;
}
.sixcontant .flex-center{
  padding: 240px 50% 50px;
  position: relative;
  z-index: 2;
}
.sixcontant .contentbox{
    max-width: 24.6875vw;
    padding: 1.6667vw 3.3333vw 0.8333vw;
    width: 100%;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 15px 20px rgb(0 0 0 / 8%);
    margin: 0 auto;
}
.sixcontant .contentbox .box_min_img{
  line-height: 0;
  margin-bottom: 28px
}
.sixcontant .contentbox .box_min_img img{
  width: 16.7708vw;
  display: block;
  margin: 0 auto;
}
.six_text{
  color: #555;
  font-size: 20px;
  line-height: 1.4;
  margin: 0;
  padding: 0;
  text-align: left;
}
.sevencontant{
  background: #f1f1f1;
}
.eightcontant{
  background-color: #f1f1f1;
  position: relative;
  z-index: 3;
  -webkit-clip-path: polygon(0 0,100% 0,100% 84%,0 100%);
  clip-path: polygon(0 0,100% 0,100% 84%,0 100%);
  padding: 64px 0 0;
  margin-bottom: 0;
}
.eightcontant .box_contant{
  padding: 0;
  max-width: 77.0833vw;
  margin: 0 auto;
  position: relative;
  width: 100%;
}
.eightcontant .box_contant .box_title{
  align-content: center;
  gap: 64px 64px;
  grid-template-areas: ". .";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  justify-content: center;
}
.eightcontant .box_contant .box_title .heading_title{
  color: #555;
  font-size: 2.1875vw;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -.9px;
  line-height: 1.33;
  text-align: left;
}
.eightcontant .box_contant .paragraph--dark {
  color: #555;
  font-size: 18px;
  line-height: 1.42;
  max-width: 41.6667vw;
  padding: 0;
  font-weight: 300;
  letter-spacing: normal;
  text-align: left;
}
.eightcontant .box_contant .box_img{
  height: 15.625vw;
  margin-top: 32px;
  position: relative;
}
.eightcontant .box_contant .box_img .box_img1{
  position: absolute;
  height: 56.25vw;
  left: 39.5833vw;
  margin-bottom: 0;
  top: -16.6667vw;
  width: 22.9167vw;
}
img {
    max-width: 100%;
}
img {
    border-style: none;
}
.RebrandApp__Store {
    height: 23.8542vw;
    left: 0;
    padding: 1.6667vw 16px;
    top: 1.5625vw;
    width: 37.1354vw;
    background-color: #fff;
    box-shadow: 0 15px 20px rgb(0 0 0 / 20%);
    display: flex;
    flex-direction: column;;
    position: absolute;
    border-radius: 35px;
}
.RebrandApp__Store_name {
    font-size: 16px;
    font-weight: 800;
    text-align: center;
}
.RebrandApp__Store_buttons {
    align-items: flex-start;
    display: flex;
    justify-content: center;
}


</style>