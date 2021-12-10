<script setup>
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { ref } from "vue";
import { Utils } from "../Utils";
let page = ref({});
let data = ref({});

PageHelper.Init(page, () => {});
HttpHelper.Post("page/brandintroduction", {}).then((ret) => {
  HttpHelper.Post("page/brandlist", {}).then((list) => {
    ret.teams = list;
    data.value = ret;
  });
});
</script>

<template>
  <div v-if="page.Res != null && page.Inst != null && page.Text != null">
    <div class="HeaderSkewed" style="background-color: rgb(255, 255, 255)">
      <div class="HeaderSkewed__Content">
        <div class="HeaderContent HeaderContentChildren">
          <div class="HeaderContentChildren__Children">
            <div class="jumbotron-card jumbotron-card--in-header">
              <div class="flex-row flex-center">
                <div style="color: white; font-size: 34px" class="flex-1">
                  {{ data.title }}
                </div>

                <img
                  class="pp_img"
                  :src="
                    page.uploadpath + 'brandintroduction/' + data.brabdminimg
                  "
                />
              </div>
              <div
                style="
                  width: 160px;
                  height: 2px;
                  background-color: orange;
                  margin-top: 40px;
                "
              ></div>

              <div
                v-html="Utils.HtmlDecode(data.content)"
                style="margin-top: 100px"
              ></div>

              <!-- 按钮 -->
              <div class="button-wrapper">
                <button
                  type="button"
                  class="button button--white"
                  aria-label="Watch Video"
                  style="border: 1px solid white"
                >
                  <span style="color: white; margin-right: 10px">观看简介</span>
                  <!-- <div v-html="Utils.HtmlDecode(data.eightbuttom)"></div> -->
                  <i>
                    <svg
                      width="13"
                      height="15"
                      viewBox="0 0 13 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.811921 0.932373L12.6105 7.74429L0.81192 14.5562L0.811921 0.932373Z"
                        fill="#fff"
                        fill-opacity="0.97"
                      ></path>
                    </svg>
                  </i>
                </button>
              </div>

              <div
                class="Block Block--grid-single"
                name="About Us"
                style="z-index: 1"
              >
                <div class="Block__content">
                  <!-- <h2 class="block-title">{{ data.title }}</h2> -->
                  <template v-for="(item, index) of data.teams">
                    <div class="team_block">
                      <img
                        :src="
                          page.uploadpath + 'aboutus/' + data.teams[index].img
                        "
                        class="team-member__picture"
                      />
                      <div
                        class="team-member__content"
                        v-html="Utils.HtmlDecode(data.teams[index].content)"
                      ></div>
                    </div>
                  </template>

                  <img
                    class="under_img"
                    :src="
                      page.uploadpath + 'brandintroduction/' + data.bottom_img
                    "
                  />
                </div>
              </div>
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
  background-image: linear-gradient(90deg, #0095e7, #028dec 60%, #0960fd 120%);
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
  margin-top: 18.333vw;
}
.team-member__content p {
  font-size: 1.25vw;
  line-height: 1.42;
  margin: 0 0 1.7708vw;
  color: #fff;
}
.button-wrapper {
  float: right;
  margin-top: -20px;
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
  overflow: hidden;
  position: relative;
  margin-top: 111px;
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

@media only screen and (max-width: 500px) {
  .team_block {
    text-align: center;
  }
  .team-member__content {
    margin-top: 10%;
    width: 100%;
  }
}

@media only screen and (min-width: 500px) {
  .team_block {
    display: flex;
    align-content: center;
    align-items: center;
  }
  .team-member__content {
    padding: 1.6667vw 1.6667vw 3.3333vw 0;
    margin-left: 5%;
    width: 75%;
  }
}

.team-member__picture {
  height: 20%;
  width: 20%;
}

img {
  max-width: 100%;
  border-style: none;
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
    font-size: 1.28vw;
    line-height: 1.42;
    /* margin: 0 0 1.7708vw; */
    letter-spacing: 0.2em;
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
    max-width: 60.4583vw;
    padding: 3.3854vw 4.6875vw 2.3438vw;
  }
  .jumbotron-card--in-header {
    margin-top: 18.3333vw;
  }
  .team-member {
    display: inline-block;
  }

  .team-member--hasOffset .team-member__picture {
    grid-column: 2/3;
  }
  .team-member--hasOffset .team-member__content {
    grid-column: 3/4;
  }
}
.pp_img {
  width: 164px;
  height: 100px;
}
.under_img {
  width: 334px;
  height: 26px;
  float: right;
  margin-top: 98px;
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