<script setup>
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { ref } from "vue";
import { Utils } from "../Utils";
let page = ref({});
let data = ref({});
PageHelper.Init(page, () => {});
HttpHelper.Post("page/covid", {}).then((ret) => {
  data.value = ret;
});
</script>

<template>
  <div
    v-if="
      page.Res != null &&
      page.Inst != null &&
      page.Text != null &&
      data.background1 != undefined
    "
  >
    <div class="firstcontent">
      <div
        class="HeaderSkewed HeaderSkewed--trackline--2"
        style="background-color: rgb(255, 255, 255)"
      >
        <div class="HeaderSkewed__Content">
          <div class="HeaderContent HeaderContentTitleCenterChildren">
            <h1 class="HeaderContentTitleCenterChildren__Title">
              {{ data.slogen }}
            </h1>
            <div class="HeaderContentTitleCenterChildren__Children">
              <div class="jumbotron-card jumbotron-card--covid">
                <div v-html="Utils.HtmlDecode(data.content)"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="HeaderSkewed__Background">
          <div
            class="
              HeaderSkewed__BackgroundImage
              HeaderSkewed__BackgroundImage--desktop
            "
            :style="{
              backgroundImage:
                'url(' + page.uploadpath + 'covid/' + data.background1 + ')',
            }"
          ></div>
        </div>
      </div>
    </div>
    <div class="secondcontent">
      <div class="pointer-parent" style="position: relative; z-index: 1">
        <div
          class="paragraph-pointer paragraph-pointer--p1"
          style="top: 69.8281px; opacity: 1"
        >
          <div class="paragraph-pointer__pointer"></div>
        </div>
        <div
          class="paragraph-pointer paragraph-pointer--p2"
          style="top: 69.8281px; opacity: 1"
        >
          <div class="paragraph-pointer__pointer"></div>
        </div>
        <div class="Block Block--grid-top--covid" style="z-index: 1">
          <div class="Block__guides">
            <div class="background-guides background-guides--2"></div>
          </div>
          <div class="Block__content">
            <div class="wrapper wrapper--tracking">
              <div class="content-grid content-grid--two-columns">
                <div class="content-grid__block">
                  <div v-html="Utils.HtmlDecode(data.leftcontent)">
                  </div>
                  <div class="spacer-mobile"></div>
                </div>
                <div class="content-grid__block">
                  <div id="p2">
                    <div data-aos="fade-up" v-html="Utils.HtmlDecode(data.rightcontent)">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.firstcontent {
  /* min-height: 29.6875vw; */
  /* display: flex;
  flex-direction: column;
  overflow: visible;
  position: relative;
  z-index: 3; */
}
.firstcontent .HeaderSkewed {
  background-color: transparent;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: visible;
  position: relative;
  z-index: 3;
}
.firstcontent .HeaderSkewed__Content {
  display: flex;
  flex: 1 1;
  flex-direction: column;
  margin: 0 auto;
  overflow: visible;
  position: relative;
  width: 100%;
  z-index: 2;
}
.firstcontent .HeaderContent {
  flex: 1 1;
  pointer-events: all;
  position: relative;
  z-index: 1;
}
.firstcontent .HeaderContentDirecyPay__Title,
.HeaderContentTitleCenter__Title,
.HeaderContentTitleCenterChildren__Title {
  color: #fff;
  letter-spacing: -0.84px;
  margin: 0;
  padding: 0 32px;
  text-align: center;
}
.firstcontent .HeaderSkewed__Background {
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
.firstcontent .HeaderSkewed__BackgroundImage {
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
.HeaderSkewed--trackline--2 {
  position: relative;
}
.HeaderSkewed--trackline--2:before {
  border-left: 2px solid #f1f1f1;
  border-right: 2px solid #f1f1f1;
  bottom: 0;
  content: "";
  left: 7.7295vw;
  position: absolute;
  top: 0;
  width: 100%;
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
.jumbotron-card--covid,
.jumbotron-card--white,
.jumbotron-card--white-spaced,
.jumbotron-card--white-spaced-large,
.jumbotron-card--white-spaced-small {
  align-items: center;
  background-color: #fff;
  background-image: none;
  display: flex;
  justify-content: center;
}
.jumbotron-card--covid,
.jumbotron-card--white-spaced,
.jumbotron-card--white-spaced-large,
.jumbotron-card--white-spaced-small {
  margin-top: 15.4589vw;
}
.jumbotron-card--covid {
  display: block;
  margin-top: 15.4589vw;
}

.pointer-parent {
    position: relative;
    z-index: 10;
}
.paragraph-pointer {
    height: 100px;
    left: 7.7295vw;
    position: absolute;
    top: 0;
    transition: opacity .8s;
    z-index: 100;
}
.paragraph-pointer .paragraph-pointer__pointer {
    background-color: #f7b334;
    height: 49px;
    position: absolute;
    width: 2px;
}
.paragraph-pointer {
    height: 100px;
    left: 7.7295vw;
    position: absolute;
    top: 0;
    transition: opacity .8s;
    z-index: 100;
}
.paragraph-pointer.paragraph-pointer--p2 {
    transition: opacity .2s;
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
.background-guides {
    border-left: 2px solid #f1f1f1;
    bottom: 0;
    left: 7.7295vw;
    padding: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 0;
}
.background-guides--2 {
    border-right: 2px solid #f1f1f1;
}
.Block__content {
    margin: 0 auto;
    padding: 0;
    position: relative;
    z-index: 2;
}
.Block--grid-top--covid .Block__content {
    padding: 0;
}
.wrapper {
    margin: 0 auto;
    padding: 0 16px;
    position: relative;
    width: 100%;
}
.wrapper--tracking {
    max-width: 91.7874vw;
    width: 100%;
}
.content-grid {
    grid-row-gap: 7.7295vw;
    align-items: stretch;
    display: grid;
    grid: 1fr/repeat(1,1fr);
    justify-items: stretch;
    margin: 0 auto;
    padding-bottom: 5.2083vw;
    padding-top: 7.2464vw;
    position: relative;
}
.content-grid--two-columns {
    align-items: stretch;
    gap: 0 7.7295vw;
    grid: 1fr/repeat(1,1fr);
    justify-items: stretch;
    padding-bottom: 0;
    padding-top: 24.1546vw;
}
.content-grid__block {
    padding: 0 32px;
    width: 100%;
}
.spacer-mobile {
    display: block;
    height: 64px;
    opacity: 0;
    pointer-events: none;
}
@media only screen and (min-width: 1px) {
  .HeaderSkewed {
    min-height: 50.7246vw;
    padding-top: 0;
  }
  .HeaderSkewed__Content {
    padding-bottom: 7.2464vw;
  }
  .HeaderContentTitleCenterChildren__Children {
    padding: 0 32px;
  }
  .HeaderSkewed__Background {
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 36.2318vw, 0 100%);
    clip-path: polygon(0 0, 100% 0, 100% 36.2318vw, 0 100%);
    max-height: 50.7246vw;
  }
  .HeaderSkewed__BackgroundImage--desktop {
    display: none;
  }
  .HeaderContentDirecyPay__Title,
  .HeaderContentTitleCenter__Title,
  .HeaderContentTitleCenterChildren__Title {
    font-size: 5.314vw;
  }
  .HeaderContentTitleCenterChildren__Title {
    margin: 80px 0;
  }
}
@media only screen and (min-width: 64em) {
  .HeaderSkewed--trackline--2:before {
    left: 13.8542vw;
    max-width: 36.1979vw;
  }
  .jumbotron-card {
    margin: 1.6667vw auto 0;
    max-width: 41.4583vw;
    padding: 3.3854vw 4.6875vw 2.3438vw;
  }
  .paragraph-pointer {
    left: 13.8542vw;
    transition: top .4s,opacity .8s;
}
.paragraph-pointer {
    left: 13.8542vw;
    transition: top .4s,opacity .8s;
}
.paragraph-pointer .paragraph-pointer__pointer {
    height: 88px;
    top: -14px;
}
.paragraph-pointer.paragraph-pointer--p2, .paragraph-pointer.paragraph-pointer--p3 {
    left: 50%;
    top: 0;
    -webkit-transform: translateX(3px);
    transform: translateX(3px);
    transition: top .4s,opacity .8s;
}
.background-guides {
    left: 13.8542vw;
}
.background-guides--2 {
    max-width: 36.4063vw;
}
.content-grid--two-columns {
    gap: 0 6.6667vw;
    grid: 1fr/repeat(2,1fr);
    padding-top: 5.2083vw;
}
}
@media only screen and (min-width: 80em) {
  .HeaderSkewed {
    padding-top: 0;
  }
}
@media only screen and (min-width: 48em) {
  .HeaderSkewed {
    min-height: 29.6875vw;
  }
  .HeaderSkewed__Content {
    padding-bottom: 4.16665vw;
  }
  .HeaderContentTitleCenterChildren__Children {
    padding: 0 32px;
  }
  .jumbotron-card--covid,
  .jumbotron-card--white,
  .jumbotron-card--white-spaced,
  .jumbotron-card--white-spaced-large,
  .jumbotron-card--white-spaced-small {
    height: 24.6875vw;
    max-width: 42.1875vw;
    width: 100%;
    border-radius: 35px;
  }
  .jumbotron-card--covid,
  .jumbotron-card--white-spaced,
  .jumbotron-card--white-spaced-large,
  .jumbotron-card--white-spaced-small {
    height: auto;
    margin-top: 6.6667vw;
    max-width: 51.25vw;
  }
  .jumbotron-card--covid {
    margin-top: 6.6667vw;
    max-width: 29.375vw;
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
  .HeaderContentDirecyPay__Title,
  .HeaderContentTitleCenter__Title,
  .HeaderContentTitleCenterChildren__Title {
    font-size: 42px;
  }
  .HeaderContentTitleCenterChildren__Title {
    margin: 112px 0;
  }
  .Block--grid-top--covid .Block__content {
    padding: 0;
}
.wrapper {
    max-width: 77.0833vw;
    padding: 0 16px;
}
.wrapper--tracking {
    max-width: 67.7083vw;
}
.content-grid {
    grid-row-gap: 6.6667vw;
    grid: 1fr/repeat(2,1fr);
    padding-bottom: 5.2083vw;
    padding-top: 5.2083vw;
}
.content-grid__block {
    padding: 0 32px;
}
.spacer-mobile {
    display: none;
}
}
</style>