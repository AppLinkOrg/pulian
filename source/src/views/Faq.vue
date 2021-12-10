<script setup>
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { ref } from "vue";
import { Utils } from "../Utils";
let page = ref({});
let data = ref({});
PageHelper.Init(page, () => {});
HttpHelper.Post("page/faq", {}).then((ret) => {
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
    <div class="firstcontent"
        style="background-color:#fff">
            <div class="HeaderSkewed__Content">
            <div class="HeaderContent">
                <h1 class="HeaderContentTitleCenter__Title">
                    <div class="textblock" v-html="Utils.HtmlDecode(data.firsttitle)"></div>
                </h1>
            </div>
        </div>
        <div class="HeaderSkewed__Background">
            <div class="HeaderSkewed__BackgroundImage HeaderSkewed__BackgroundImage--desktop" 
                :style="{
                backgroundImage:
                'url(' + page.uploadpath + 'faq/' + data.firstbgimg + ')',
                }"
            >
            </div>
        </div>
    </div>
<!-- 二 -->
    <div class="secondcontent">
        <div class="paragraph-pointer paragraph-pointer--headingslim1" style="top: 0px; opacity: 0;"><div class="paragraph-pointer__pointer"></div></div>
        <div class="paragraph-pointer paragraph-pointer--headingslim2" style="top: 0px; opacity: 0;"><div class="paragraph-pointer__pointer"></div></div>
        <div class="paragraph-pointer paragraph-pointer--headingslim3" style="top: 0px; opacity: 0;"><div class="paragraph-pointer__pointer"></div></div>
        <div class="Block Block--regular-topless" 
            style="z-index: 10;">
            <div class="Block__guides">
                <div class="background-guides background-guides--1"></div>
            </div>
            <div class="textblock" v-html="Utils.HtmlDecode(data.secondcontent)"></div>
        </div>
    </div>
  </div>
</template>
<style scoped>
.firstcontent {
  min-height: 29.6875vw;
  display: flex;
  flex-direction: column;
  overflow: visible;
  position: relative;
  z-index: 3;
}
.firstcontent .HeaderSkewed__Content {
  padding-bottom: 4.16665vw;
  display: flex;
  flex: 1 1;
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
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.firstcontent .HeaderContentTitleCenter__Title{
    font-size: 42px;
    font-weight: 400;
    color: #fff;
    letter-spacing: -.84px;
    margin: 0;
    padding: 0 32px;
    text-align: center;
}
.firstcontent .HeaderSkewed__Background {
    -webkit-clip-path: polygon(0 0,100% 0,100% 21.3542vw,0 100%);
    clip-path: polygon(0 0,100% 0,100% 21.3542vw,0 100%);
    max-height: 29.6875vw;
    background-color: #555;
    bottom: 0;
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    user-select: none;
    z-index: 1;
}
.firstcontent .HeaderSkewed__BackgroundImage--desktop {
    display: block;
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;
}

.secondcontent{
    position: relative;
    z-index: 1;
    /* -webkit-clip-path: polygon(0 0,100% 0,100% 21.3542vw,0 100%);
    clip-path: polygon(0 0,100% 0,100% 21.3542vw,0 100%); */
}
.Block--regular-topless {
    padding: 0;
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
    left: 13.8542vw;
    border-left: 2px solid #f1f1f1;
    bottom: 0;
    padding: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 0;
}
.Block__content {
    margin: 0 auto;
    padding: 0;
    position: relative;
    z-index: 2;
}

.wrapper--tracking {
    max-width: 67.7083vw;
    width: 100%;
    padding: 0 16px;
    margin: 0 auto;
    position: relative;
}
.content-grid--faq:first-child {
    padding-bottom: 3.3333vw;
    padding-top: 5vw;
}
.content-grid--faq {
    display: block;
    grid-row-gap: 6.6667vw;
    grid: 1fr/repeat(2,1fr);
    align-items: stretch;
    justify-items: stretch;
    margin: 0 auto;
    position: relative;
}

.content-grid__block {
    padding: 0 32px;
    width: 100%;
}
.heading--h1--regular {
    font-size: 45px;
    line-height: 1.11;
}
.heading {
    color: #555;
    font-stretch: normal;
    font-weight: 500;
    margin: 0;
    scroll-margin-top: 8vh;
    text-align: left;
    vertical-align: baseline;
}
.rawHtmlStyled--slim {
    margin: 5rem 0 0;
}
h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}
.secondcontent .rawHtmlStyled h2 {
    font-size: 1.3rem;
    line-height: 1.5;
    margin: 4rem 0;
    padding: 0;
    color: #555;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    margin: 2rem 0 0!important;
    text-align: left;
    text-rendering: optimizeLegibility;
    font-weight: 400;
}
.secondcontent .rawHtmlStyled p, .rawHtmlStyled ul{
    font-size: 1.25rem;
    line-height: 1.5;
    margin: 0 0 2rem;
    padding: 0;
    color: #555;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    line-height: 1.5;
    margin: 0 0 2rem;
    padding: 0;
    text-align: left;
}
.rawHtmlStyled ul {
    margin: 2rem 0 2rem 2rem;
    font-size: 1.25rem;
    line-height: 1.5;
    padding: 0;
}
.paragraph-pointer--headingslim1, 
.paragraph-pointer--headingslim2, 
.paragraph-pointer--headingslim3 {
    -webkit-transform: translateY(0);
    transform: translateY(0);
}
.paragraph-pointer {
    left: 13.8542vw;
    transition: top .4s,opacity .8s;
    height: 100px;
    position: absolute;
    z-index: 100;
}
.paragraph-pointer .paragraph-pointer__pointer {
    background-color: #f7b334;
    position: absolute;
    width: 2px;
}
@media  screen and (min-width: 64em){
    .paragraph-pointer .paragraph-pointer__pointer {
    height: 88px;
    top: -14px;
}

}
</style>