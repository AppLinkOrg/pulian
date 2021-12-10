<script setup>
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { ref } from "vue";
import { Utils } from "../Utils";
let page = ref({});
let data = ref({});

PageHelper.Init(page, () => {});
HttpHelper.Post("page/aboutus", {}).then((ret) => {
  HttpHelper.Post("page/leadershipteam", {}).then((list) => {
    ret.teams = list;
    data.value = ret;
  });
});
</script>

<template>
  <div
    v-if="
      page.Res != null &&
      page.Inst != null &&
      page.Text != null &&
      data.bgimg != undefined
    "
  >
    <div class="HeaderSkewed" style="background-color: rgb(255, 255, 255)">
      <div class="HeaderSkewed__Content">
        <div class="HeaderContent HeaderContentChildren">
          <div class="HeaderContentChildren__Children">
            <div class="jumbotron-card jumbotron-card--in-header">
              <div style="color:white;font-size:28px">{{data.top_title}}</div>
               <!-- <hr style="width:110px;float:left;margin-top:20px"> -->

                <div
                style="
                  width: 110px;
                  height: 2px;
                  background-color: orange;
                  margin-top: 20px;
                "
              ></div>

              <div v-html="Utils.HtmlDecode(data.content)" style="margin-top:40px"></div> 
            </div>
          </div>
        </div>
      </div>
      <div class="HeaderSkewed__Background">
        <div
          class="
            HeaderSkewed__BackgroundImage HeaderSkewed__BackgroundImage--desktop
          "
          :style="{
            backgroundImage:
              'url(' + page.uploadpath + 'aboutus/' + data.bgimg + ')',
          }"
        ></div>
        <div
          class="
            HeaderSkewed__BackgroundImage HeaderSkewed__BackgroundImage--mobile
          "
          :style="{
            backgroundImage:
              'url(' + page.uploadpath + 'aboutus/' + data.bgimg + ')',
          }"
        ></div>
      </div>
    </div>
    <div class="Block Block--grid-single" name="About Us" style="z-index: 1">
      <div class="Block__content">
         
        <h2 class="block-title_name  "> {{ data.title_name }}</h2>
        <h2 class="block-title"> {{ data.title }}</h2>

        <div class="box_list">
           <template v-for="(item, index) of data.teams">
         
            <div class="team-member__content"  v-html="Utils.HtmlDecode(data.teams[index].content)"></div>
        
        
        </template>
         
        </div>
        <h2 class="block-title_name  "> {{ data.bottom_title }}</h2>
        <h2 class="block-title"> {{ data.bottom }}</h2>

        
       

      </div>
    </div>
  </div>
</template>

<style scoped>
.HeaderSkewed {
  background-color: transparent;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: visible;
  position: relative;
  z-index: 3;
}
.HeaderSkewed__Content {
  display: flex;
  flex: 1 1;
  flex-direction: column;
  margin: 0 auto;
  overflow: visible;
  position: relative;
  width: 100%;
  z-index: 2;
}
.jumbotron-card {
  background-image: linear-gradient(340deg, #f7b334, #fd8300 60%, #be5625 120%);
  box-shadow: 0 10px 30px 0 rgb(0 0 0 / 20%);
  margin: 32px auto 0;
  max-width: 85%;
  -o-object-fit: contain;
  object-fit: contain;
  padding: 32px;
  width: 100%;
  border-radius: 20px;
}
.jumbotron-card--in-header {
  margin-top: 32px;
}

.HeaderContent {
  flex: 1 1;
  pointer-events: all;
  position: relative;
  z-index: 1;
}
.HeaderSkewed__Background {
  background-color: #555;
  bottom: 0;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 1;
}
.HeaderSkewed__BackgroundImage {
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}
.Block {
  background-color: #fff;
  overflow: hidden;
  position: relative;
  width: 100%;
}
.Block:before {
  bottom: 0;
  content: "";
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
}
.Block__content {
  margin: 0 auto;
  padding: 0;
  position: relative;
  z-index: 2;
}
.Block--grid-single .Block__content {
  padding: 7.7295vw 0;
}

@media only screen and (max-width: 500px) {
.block-title{ 
  font-size: 18px;
  padding: 0 5%;
}
}

.block-title {
  color: #555;
  font-weight: 800; 
}

.block-title_name{
  color: #0095E7;
  text-align: center;
}


.team-member {
  margin: 0 auto 7.7295vw;
  max-width: 85%;
  padding: 0 32px;
  position: relative;
}
.team-member__picture {
  background-color: #fff;
  box-shadow: 0 15px 25px 0 rgb(0 0 0 / 16%);
  height: auto;
  margin: 0 auto 32px;
  -o-object-fit: scale-down;
  object-fit: scale-down;
  padding: 16px;
  width: 100%;
}
img {
  max-width: 100%;
  border-style: none;
}
.team-member__content {
  padding: 0 16px;
}

@media only screen and (min-width: 1px) {
  .HeaderSkewed {
    min-height: 50.7246vw;
    padding-top: 0;
  }
  .HeaderSkewed__Content {
    padding-bottom: 7.2464vw;
  }
  .HeaderSkewed__Background {
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 36.2318vw, 0 100%);
    clip-path: polygon(0 0, 100% 0, 100% 36.2318vw, 0 100%);
    max-height: 50.7246vw;
  }
  .HeaderSkewed__BackgroundImage--desktop {
    display: none;
  }
}
@media only screen and (min-width: 48em) {
  .HeaderSkewed {
    min-height: 29.6875vw;
  }
  .HeaderSkewed__Content {
    padding-bottom: 4.16665vw;
  }
  .HeaderSkewed__Background {
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 21.3542vw, 0 100%);
    clip-path: polygon(0 0, 100% 0, 100% 21.3542vw, 0 100%);
    max-height: 29.6875vw;
  }
  .HeaderSkewed__BackgroundImage {
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .HeaderSkewed__BackgroundImage--desktop {
    display: block;
  }
  .jumbotron-card {
    border-radius: 35px;
  }
  .Block--grid-single .Block__content {
    padding: 1.6667vw 0;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
  }
  /* .block-title {
    letter-spacing: -0.9px;
    line-height: 1.33;
    margin-bottom: 96px;
    margin-top: 32px; 
  } */
}
@media only screen and (min-width: 80em) {
  .HeaderSkewed {
    padding-top: 0;
  }
}
@media only screen and (min-width: 64em) {
  .jumbotron-card {
    margin: 1.6667vw auto 0;
    max-width: 41.4583vw;
    padding: 3.3854vw 4.6875vw 2.3438vw;
  }
  .jumbotron-card--in-header {
    margin-top: 17.3333vw;
  }
  .team-member {
    /* display: grid;
    gap: 0 1.6667vw;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    margin: 0 0 2.5vw;
    max-width: none;
    position: static;
    right: -3.8647vw; */
  }
  .team-member__picture {
    box-shadow: 0 30px 45px 0 rgb(0 0 0 / 16%);
    height: 20.2604vw;
    margin: 0 0 64px auto;
    padding: 1.6146vw;
    width: 20.2604vw;
  }
  .team-member__content {
    padding: 4%;
    width: 80vw;
  }
  .team-member--hasOffset .team-member__picture {
    grid-column: 2/3;
  }
  .team-member--hasOffset .team-member__content {
    grid-column: 3/4;
  }
}
.box_list{
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  /* max-width: 83vw; */
}
@media only screen and (min-width: 120em) {
  .jumbotron-card {
    max-width: 1300px;
    margin-top: 360px;
  }
  .HeaderSkewed {
    min-height: 570px;
    padding-top: 0;
  }
  .HeaderSkewed__Background {
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 410px, 0 100%);
    clip-path: polygon(0 0, 100% 0, 100% 410px, 0 100%);
    max-height: 570px;
  }
}
</style>