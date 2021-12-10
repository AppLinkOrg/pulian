<script setup>
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { ref } from "vue";
import { Utils } from "../Utils";
let page = ref({});
let data = ref({});
PageHelper.Init(page, () => {});
HttpHelper.Post("page/mission", {}).then((ret) => {
  data.value = ret;
});
</script>
 
<template style="">
  <div style="padding-bottom: 30px">
  

    <div
      class="HeaderSkewed HeaderSkewed--normal"
      style="background-color: rgb(255, 255, 255)"
    >
      <div class="HeaderSkewed__Content">
        <div class="HeaderContent HeaderContentTitleCenter">
          <h1 class="HeaderContentTitleCenter__Title">
            {{ data.title }}
          </h1>
        </div>
      </div>
      <div class="HeaderSkewed__Background">
        <div
          class="
            HeaderSkewed__BackgroundImage HeaderSkewed__BackgroundImage--desktop
          "
          :style="{
            backgroundImage:
              'url(' + page.uploadpath + 'mission/' + data.topimg + ')',
          }"
        ></div>
        <div
          class="
            HeaderSkewed__BackgroundImage HeaderSkewed__BackgroundImage--mobile
          "
          :style="{
            backgroundImage:
              'url(' + page.uploadpath + 'mission/' + data.topimg + ')',
          }"
        ></div>
      </div>
    </div>


    <div class="Block Block--regular-spaced" style="z-index: 1">
      <div class="Block__content">
        <div class="content-grid content-grid--main-single">
          <div class="content-grid__block">
            <div class="wrapper wrapper--normal">
              <div class="MissionHeadingWrapper">
                <h2 class="heading heading--title-orange">
                   {{ data.content1 }}
                </h2>
                <br aria-hidden="true" />
                <p class="paragraph paragraph--dark"> {{ data.content2 }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="Block Block--regular-spaced">
      <div class="wrapper">
        <div class="MissionHeadingWrapper">
          <h2 class="heading heading--title-orange">
            {{ data.content1 }}
          </h2>

          <p class="paragraph paragraph--dark">
            {{ data.content2 }}
          </p>
        </div>
      </div>
    </div> -->

    <div class="content-grid__block">
      <div class="wrapper wrapper--normal">
        <h2 class="text-center head">{{ data.content3 }}</h2>
        <div class="grid-cards grid-cards--4-small grid-cards--fullwidth">
          <div class="card-benefit card-benefit--gray">
            <div class="card-benefit__content">
              <h3 class="card-benefit__title">
                {{ data.content5 }}
              </h3>
            </div>
          </div>
          <div class="card-benefit card-benefit--gray">
            <div class="card-benefit__content">
              <h3 class="card-benefit__title">
                {{ data.content6 }}
                <small class="subindex">1</small>
              </h3>
            </div>
          </div>
          <div class="card-benefit card-benefit--gray">
            <div class="card-benefit__content">
              <h3 class="card-benefit__title">
                {{ data.content7 }}<small class="subindex">1</small>
              </h3>
            </div>
          </div>
          <div class="card-benefit card-benefit--gray">
            <div class="card-benefit__content">
              <h3 class="card-benefit__title">
                {{ data.content8 }}<small class="subindex">2</small>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="margin-top: 48px">
      <h2 class="text-center head">{{ data.content9 }}</h2>

      <div
        class="
          media-container media-container--normal media-container--full-center
        "
      >
        <div class="media-container__content">
          <div class="WrapperModalVideoClick">
            <!-- <img
              class="videoblock"
              :src="page.uploadpath + 'mission/' + data.topimg"
            /> -->
            <video
              class="videoblock"
              :poster="page.uploadpath + 'mission/' + data.topimg"
              :src="page.uploadpath + 'mission/' + data.vedio"
              controls="controls"
            ></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.HeaderSkewed {
    padding-top: 0;
        min-height: 29.6875vw;
            box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: visible;
    position: relative;
    z-index: 3;
}

.HeaderContentTitleCenter__Title {
  text-rendering: optimizeLegibility;
  font-weight: 400;
}
.HeaderSkewed__Background {
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 21.3542vw, 0 100%);
  clip-path: polygon(0 0, 100% 0, 100% 21.3542vw, 0 100%);
  max-height: 29.6875vw;
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
.HeaderSkewed__BackgroundImage--desktop {
  display: block;
}
.HeaderSkewed__BackgroundImage {
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}

.HeaderSkewed__Content {
  padding-bottom: 4.16665vw;
  display: flex;
  flex: 1 1;
  flex-direction: column;
  margin: 0 auto;
  overflow: visible;
  position: relative;
  width: 100%;
  z-index: 2;
}
.HeaderContentTitleCenter {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.HeaderContent {
  flex: 1 1;
  pointer-events: all;
  position: relative;
  z-index: 1;
}
.HeaderContentDirecyPay__Title,
.HeaderContentTitleCenter__Title,
.HeaderContentTitleCenterChildren__Title {
  font-size: 42px;
}
.HeaderContentDirecyPay__Title,
.HeaderContentTitleCenter__Title,
.HeaderContentTitleCenterChildren__Title {
  color: #fff;
  letter-spacing: -0.84px;
  margin: 0;
  padding: 0 32px;
  text-align: center;
}
 

.icon {
  width: 70px;
  height: 66.91px;
}
.title {
  font-size: 42px;
  color: white;
  letter-spacing: -0.84px;
  margin: 0;
  padding: 0 32px;
  font-family: sofia-pro, sans-serif;
  text-rendering: optimizeLegibility;
  font-weight: 400;
}
.text-center {
  text-align: center;
}
 
.Block--regular-spaced {
  padding: 3.125vw 0;
}
.Block {
    background-color: #fff;
    overflow: hidden;
    position: relative;
}
.Block__content {
    margin: 0 auto;
    padding: 0;
    position: relative;
    z-index: 2;
}
.content-grid--main-single {
    padding-bottom: 0;
    padding-top: 0;
    display: block;
}
.content-grid {
    grid-row-gap: 6.6667vw;
    grid: 1fr/repeat(2,1fr);
    
    align-items: stretch; 
    justify-items: stretch;
    margin: 0 auto; 
    position: relative;
}

.content-grid__block {
  padding: 0 32px;
  margin-top: 48px;
}
.wrapper {
  max-width: 77.0833vw;
  padding: 0 16px;
  margin: 0 auto;
  position: relative;
    width: 100%;
}
.paragraph--dark,
.paragraph--white,
.paragraph--white-partners {
  font-size: 18px;
  line-height: 1.42;
  max-width: 41.6667vw;
  padding: 0;
  color: #555;
  font-weight: 300;
  letter-spacing: normal;
  text-align: left;
}

.MissionHeadingWrapper {
  max-width: 580px;
  margin: 0 auto;
}
.head {
  color: #555;
  font-size: 2.1875vw;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.9px;
  line-height: 1.33;
  margin: 0 auto;
  font-weight: 400;
}
.heading {
  margin: 0;
  scroll-margin-top: 8vh;

  vertical-align: baseline;
}
.heading--title-orange,
.heading--title-white {
  color: #555;
  font-size: 2.1875vw;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.9px;
  line-height: 1.33;
  text-align: left;
}
.heading--title-center {
  text-align: center;
}
/* .heading--title, .heading--title-center, .heading--title-lineless, .heading--title-orange, .heading--title-white {
    color: #555;
    font-size: 2.1875vw;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -.9px; 
        font-weight: 400;
} */

.grid-cards {
  display: grid;
  grid-template-rows: 1fr;
}
.grid-cards--fullwidth {
  max-width: 100%;
}
.grid-cards--4-small {
  grid-column-gap: 2.8646vw;
  grid-template-columns: repeat(4, minmax(1px, 1fr));
  margin: 3.125vw auto 1.0417vw;
  /* gap: 11.5942vw 19.3237vw; */
  display: grid;
  grid-template-rows: 1fr;
}

.card-benefit--gray {
  background: linear-gradient(340.24deg, #f1f1f1 -7.83%, #fff 43.36%);
}
.card-benefit--gray,
.card-benefit--orange {
  height: 15.625vw;
  min-width: 15.625vw;
  padding: 2.0833vw 2.3438vw;
  object-fit: contain;
  box-shadow: 0 15px 30px 0 rgb(0 0 0 / 10%);
  border-radius: 35px;
}
.card-benefit {
  min-height: 100px;
}
.card-benefit--gray .card-benefit__content .card-benefit__title {
  font-weight: 700;
  color: #555;
}
.card-benefit--gray .card-benefit__title,
.card-benefit--orange .card-benefit__title {
  font-size: 1.25vw;
}
.card-benefit__title {
  font-size: 1.6667vw;
  letter-spacing: -0.0333vw;
  line-height: 1.31;
  margin-bottom: 1.0938vw;
  max-width: 13.0208vw;
  text-align: left;
}

.media-container--full-center {
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 3.3333vw 0;
  width: 100%;
}
.media-container {
  line-height: 0;
  position: relative;
  border-radius: 35px;
}
.media-container__content {
  display: inline-block;
  line-height: 0;
  overflow: hidden;
}
.WrapperModalVideoClick {
  position: relative;
}
.WrapperModalVideoClick .naked-button.player-picture {
  outline-offset: -5px !important;
}
.player-picture {
  position: relative;
}
.naked-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: inline;
  line-height: 0;
  margin: 0;
  outline: none;
  padding: 0;
}
.WrapperModalVideoClick .abs-center {
  z-index: 10;
}
.videoblock {
  width: 655px;
  height: 368px;
}
</style>