<script setup>
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { ref } from "vue";
import { Utils } from "../Utils";
let page = ref({});
let data = ref({});

PageHelper.Init(page, () => {});
HttpHelper.Post("page/contactustow", {}).then((ret) => {
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
    <div class="HeaderSkewed" style="background-color: rgb(255, 255, 255)">
      <div class="HeaderSkewed__Content">
        <div class="HeaderContent HeaderContentChildren">
          <div class="HeaderContentChildren__Children">
            <div class="jumbotron-card jumbotron-card--in-header">
                <h1 class="title_yellow_short_line ">加入我们</h1>
                <p>我们共同链接世界，<br />我们共同链接世界我们共同链接世界我们共同链接世界</p>
                <h4>加入我们加入我们</h4>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                </ul>
              <!-- <div v-html="Utils.HtmlDecode(data.content)"></div> -->
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
    <div class="secondcontent">
        <h2>招聘岗位：OP操作员，招聘岗位，招聘岗位，招聘岗位</h2>
        <h3>OP操作员</h3>
        <h4>岗位职责</h4>
        <p>1、招聘岗位招聘岗位招聘岗位招聘岗位</p>
        <p>2、招聘岗位招聘岗位招聘岗位招聘岗位</p>
        <h4>岗位职责</h4>
        <p>1、招聘岗位招聘岗位招聘岗位招聘岗位</p>
        <p>2、招聘岗位招聘岗位招聘岗位招聘岗位</p>
        <p>此职位亦对应届生开放欢迎</p>
    </div>
    <!-- <div class="Block Block--grid-single" name="About Us" style="z-index: 1">
      <div class="Block__content">
        <h2 class="block-title">{{ data.title }}</h2>
        <template v-for="(item, index) of data.teams">
          <template v-if="index % 2 == 0">
            <div class="team-member false">
              <div class="team-member__picture">
                <img
                  :src="page.uploadpath+'aboutus/'+data.teams[index].img"
                />
              </div>
              <div class="team-member__content"  v-html="Utils.HtmlDecode(data.teams[index].content)">
                
              </div>
            </div>
            <div class="team-member team-member--hasOffset" v-if="(index+1)<data.teams.length">
              <div class="team-member__picture">
                <img
                  :src="page.uploadpath+'aboutus/'+data.teams[index+1].img"
                />
              </div>
              <div class="team-member__content"  v-html="Utils.HtmlDecode(data.teams[index+1].content)">
               
              </div>
            </div>
          </template>
        </template>

      </div>
    </div> -->
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
  background-size: cover;
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
.jumbotron-card--in-header h1{
    line-height: 1.4;
    margin: 0 0 1.5625vw;
    color: #fff;
    font-size: 23px;
    font-weight: 400;
    padding-bottom: 1em
}
@media only screen and (min-width: 64em){
    .jumbotron-card p {
        font-size: 1.25vw;
        line-height: 2.42;
        margin: 0 0 1.7708vw;
        letter-spacing: 0.1px;
        font-weight: 400;
    }
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
.block-title {
  color: #555;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.9px;
  line-height: 1;
  margin-bottom: 65px;
  -o-object-fit: contain;
  object-fit: contain;
  text-align: left;
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
  }
  .block-title {
    font-size: 45px;
    letter-spacing: -0.9px;
    line-height: 1.33;
    margin-bottom: 96px;
    margin-top: 32px;
  }
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
    display: grid;
    gap: 0 1.6667vw;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    margin: 0 0 2.5vw;
    max-width: none;
    position: static;
    right: -3.8647vw;
  }
  .team-member__picture {
    box-shadow: 0 30px 45px 0 rgb(0 0 0 / 16%);
    height: 20.2604vw;
    margin: 0 0 64px auto;
    padding: 1.6146vw;
    width: 20.2604vw;
  }
  .team-member__content {
    padding: 1.6667vw 1.6667vw 3.3333vw 0;
  }
  .team-member--hasOffset .team-member__picture {
    grid-column: 2/3;
  }
  .team-member--hasOffset .team-member__content {
    grid-column: 3/4;
  }

}
</style>