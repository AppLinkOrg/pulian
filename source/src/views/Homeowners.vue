<script setup>
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { ref } from "vue";
import { Utils } from "../Utils";
let page = ref({});
let data = ref({});
PageHelper.Init(page, () => {});
HttpHelper.Post("page/homeowners",{}).then((ret) => {
  HttpHelper.Post("page/homeownerPartTwo", {}).then((list) => {
  ret.tools = list;
  data.value = ret;
   })
})
</script>

<template>
  <div
    v-if="
      page.Res != null &&
      page.Inst != null &&
      page.Text != null &&
      data.firstbgimg != undefined
    "
  >
    <!-- 第一部分 -->
    <div
      class="
        HeaderSkewed HeaderSkewed--big HeaderSkewed--up HeaderSkewed--homeowners
      "
      style="background-color: rgb(255, 255, 255)"
    >
      <div class="HeaderSkewed__Content">
        <div class="HeaderContent HeaderContentHomeowners">
          <h1 class="HeaderContentHomeowners__Title">
            <div v-html="Utils.HtmlDecode(data.firsttitle)"></div>
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
            'url(' + page.uploadpath + 'pagehomeowners/' + data.firstbgimg + ')',
          }"
        ></div>
      </div>
    </div>
    <!-- 第二部分 -->
    <div class="wrapper wrapper--normal">
      <div class="SectionQuotes SectionQuotes--gray">
        <div class="Block Block--left-face" style="z-index: 1">
          <div class="Block__content">
            <div
              class="
                content-grid
                content-grid--section-quotes
                content-grid--section-quotes--gray
              "
            >
              <div class="content-grid__block">
                <div
                  class="
                    grid-cards
                    grid-cards--4-small
                    grid-cards--fullwidth
                    grid-cards--no-carousel
                  "
                >
                  <figure class="CardQuote CardQuote--gray">
                    <blockquote>
                      <p>
                        <div v-html="Utils.HtmlDecode(data.secondtext1)"></div>
                      </p>
                    </blockquote>
                    <div v-html="Utils.HtmlDecode(data.secondtitle1)"></div>
                  </figure>
                  <figure class="CardQuote CardQuote--gray">
                    <blockquote>
                      <p>
                        <div v-html="Utils.HtmlDecode(data.secondtext2)"></div>
                      </p>
                    </blockquote>
                    <div v-html="Utils.HtmlDecode(data.secondtitle2)"></div>
                  </figure>
                  <figure class="CardQuote CardQuote--gray">
                    <blockquote>
                      <p>
                       <div v-html="Utils.HtmlDecode(data.secondtext3)"></div>
                      </p>
                    </blockquote>
                   <div v-html="Utils.HtmlDecode(data.secondtitle3)"></div>
                  </figure>
                  <figure class="CardQuote CardQuote--gray">
                    <blockquote>
                     <div v-html="Utils.HtmlDecode(data.secondtext4)"></div>
                    </blockquote>
                    <div v-html="Utils.HtmlDecode(data.secondtext4)"></div>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 第三部分 -->
    <div class="Block Block--regular" style="overflow: visible">
      <div class="Block__content">
        <div class="solar-homeowner__container">
          <div class="solar-homeowner__background" 
          :style="{
        backgroundImage:
          'url(' + page.uploadpath + 'pagehomeowners/' + data.threebgimg + ')',
      }"></div>
          <div class="solar-homeowner__content">
            <h3 class="solar-homeowner__title">
              <div v-html="Utils.HtmlDecode(data.threetitle)"></div>
            </h3>
            <div class="solar-homeowner__picture">
              <div
                class="
                  media-container
                  media-container--normal
                  media-container--normal
                "
              >
                <div class="media-container__content">
                  <picture class="picture">
                     <img :src="page.uploadpath + 'pagehomeowners/' + data.threeimg" />
                  </picture>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 第四部分 -->
    <div class="SmileyBackgroundSkew">
      <div class="Block Block--grid-solar-cards-smile" style="z-index: 2">
        <div class="Block__content">
          <div
            class="
              solar-rectangle__container solar-rectangle__container--undefined
            "
          >
            <div class="solar-rectangle__card solar-rectangle__card--1">
              <p class="solar-rectangle__text">
               <div v-html="Utils.HtmlDecode(data.fourtitle)"></div>
              </p>
            </div>
          </div>
          <div class="pointer-parent" style="z-index: 2">
            <div class="Spacer">
              <template v-for="(item, index) in data.tools">
                <template class="" v-if="index % 2 == 0">
                  <div class="solar-element false">
                    <div class="solar-element__picture">
                      <img
                        :src="
                          page.uploadpath + 'pagehomeowners/' + data.tools[index].img
                        "
                      />
                    </div>
                    <div class="solar-element__content">
                      <div
                        class="solar-element__content"
                        v-html="Utils.HtmlDecode(data.tools[index].content)"
                      ></div>
                    </div>
                  </div>
                  <div class="solar-element solar-element--hasOffset"
                   v-if="index + 1 < data.tools.length" >
                    <div class="solar-element__picture">
                      <img
                        :src="
                          page.uploadpath +
                          'pagehomeowners/' +
                          data.tools[index + 1].img
                        "
                      />
                    </div>
                    <div
                      class="solar-element__content"
                      v-html="Utils.HtmlDecode(data.tools[index + 1].content)"
                    ></div>
                  </div>
                </template>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 第五部分 -->
    <div class="block Block--grid-dual--reverse" style="z-index:2;">
      <div class="Block__content">
        <div class="HomeOwnersCard__Container">
          <div class="HomeOwnersCard__PictureContainer">
            <img :src="page.uploadpath + 'pagehomeowners/' + data.fiveimg" />
          </div>
          <div class="HomeOwnersCard__TextContainer">
            <h3 class="heading heading--h1--dark">
              <div v-html="Utils.HtmlDecode(data.fivetitle)"></div>
            </h3>
            <p class="paragraph paragraph--dark">
             <div v-html="Utils.HtmlDecode(data.fivetext)"></div>
            </p>
            <div class="button-wrapper">
              <button type="button" 
                class="button button--slim-ghost" 
                aria-label="Learn How">
                  <span>
                    <div v-html="Utils.HtmlDecode(data.fivebuttom)"></div>
                  </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 第六部分 -->
    <div class="sixcontant" 
      style="overflow:hidden;background:#f7f8f7" 
      >
        <div class="wrapper wrapper--normal">
          <div class="content-grid content-grid--tools">
            <div class="content-grid__block">
              <div class="wrapper--text">
                <h2 class="heading heading--title-orange-dual">
                 <div v-html="Utils.HtmlDecode(data.sixtitle)"></div>
                </h2>
              <p class="paragraph paragraph--small-plus-right">
                <div v-html="Utils.HtmlDecode(data.sixtext)"></div>
              </p>
            </div>
          </div>
      <div class="content-grid__block">
        <div class="toolscollage__homeowners">
          <div>
            <picture class="toolscollage__homeowners_picture--0">
              <img :src="page.uploadpath + 'pagehomeowners/' + data.siximg1" />
            </picture>
          </div>
          <div>
            <picture class="toolscollage__homeowners_picture--1">
              <img :src="page.uploadpath + 'pagehomeowners/' + data.siximg2" />
            </picture>
          </div>
          <div>
            <picture class="toolscollage__homeowners_picture--2">
              <img :src="page.uploadpath + 'pagehomeowners/' + data.siximg3" />
            </picture>
          </div>
        </div>
      </div>
    </div>

</div>
</div>
  </div>
</template>


<style scoped>
/* 第一部分 */
.HeaderSkewed {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: visible;
  position: relative;
  z-index: 3;
}
.HeaderSkewed--big {
  padding-top: 0;
  min-height: 50vw;
}
.HeaderSkewed--big .HeaderSkewed__Content {
  padding-bottom: 8.3333vw;
  display: flex;
  flex: 1 1;
  flex-direction: column;
  margin: 0 auto;
  overflow: visible;
  position: relative;
  width: 100%;
  z-index: 2;
}
.HeaderSkewed .HeaderSkewed__Content .HeaderContent {
  flex: 1 1;
  pointer-events: all;
  position: relative;
  z-index: 1;
}
.HeaderSkewed .HeaderContentHomeowners__Title {
  font-size: 2.1875vw;
  letter-spacing: -0.84px;
  margin: 5vw auto 0;
  line-height: 1.2;
  position: static;
  text-align: center;
  color: #fff;
  font-weight: 400;
  max-width: 75.3623vw;
  top: 30.9179vw;
  width: 100%;
}
.HeaderSkewed--big .HeaderSkewed__Background {
  clip-path: polygon(0 0, 100% 0, 100% 41.6667vw, 0 100%);
  max-height: 50vw;
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
.HeaderSkewed--homeowners
  .HeaderSkewed__Background
  .HeaderSkewed__BackgroundImage--desktop {
  background-position: center 0;
  display: block;
}
.HeaderSkewed__BackgroundImage {
  background-repeat: no-repeat;
  background-size: cover;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}

/* 第二部分 */

.wrapper {
  max-width: 100vw;
  padding: 0 152px;
  position: relative;
  width: 100%;
}
.Block--left-face-mobile {
  display: none;
  background-size: 24.1546vw auto;
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
.grid-cards--carousel {
  display: none;
}
.grid-cards--fullwidth {
  max-width: 100%;
}
.grid-cards--extra-space {
  margin: 3.125vw auto 1.0417vw;
}
.grid-cards--4-small {
  grid-column-gap: 2.8646vw;
  grid-template-columns: repeat(4, minmax(1px, 1fr));
  gap: 11.5942vw 19.3237vw;
}
.grid-cards {
  grid-template-rows: 1fr;
}
.carousel-root {
  outline: none;
}
.carousel.carousel-slider {
  margin: 0;
  overflow: hidden;
}
.carousel {
  position: relative;
}
.carousel .control-dots {
  bottom: 0;
  margin: 10px 0;
  padding: 0;
  position: absolute;
  text-align: center;
  width: 100%;
  z-index: 1;
}
.control-dots {
  display: none;
}

.wrapper .Block--left-face {
  display: block;
}
.wrapper .Block--left-face:before {
  background-repeat: no-repeat;
  background-position: 0 35%;
  background-size: 65.1042vw auto;
}
.wrapper .Block:before {
  bottom: 0;
  content: "";
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
}
.content-grid--section-quotes {
  display: block;
  padding: 0 0 96px;
}
.content-grid {
  grid-row-gap: 6.6667vw;
  grid: 1fr / repeat(2, 1fr);
  align-items: stretch;
  align-items: stretch;
  position: relative;
}
.content-grid--section-quotes--gray .content-grid__block {
  padding: 0;
  width: 100%;
}
.grid-cards--no-carousel {
  display: flex;
}
.grid-cards--fullwidth {
  max-width: 100%;
}
.grid-cards--4-small {
  grid-column-gap: 2.8646vw;
  grid-template-columns: repeat(4, minmax(1px, 1fr));
  margin: 3.125vw auto 1.0417vw;
}

.grid-cards {
  grid-template-rows: 1fr;
}
.CardQuote--gray {
  border-radius: 2.3438vw;
  height: auto;
  margin: 0;
  padding: 1.6667vw 1.9792vw 2.4479vw;
  width: 16.4063vw;
  background: #f2f0f0;
  box-shadow: inset 0 0 30px rgb(0 0 0 / 4%);
  max-width: 100%;
}
.CardQuote {
  display: flex;
  flex-direction: column;
}
figure {
  /* display: block; */
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 40px;
  margin-inline-end: 40px;
}
.CardQuote--gray blockquote {
  flex: none;
  margin: 0;
}
.CardQuote blockquote {
  font-size: 1.1vw;
  font-weight: 800;
  letter-spacing: -0.025vw;
  line-height: 1.7708vw;
  max-width: 12.5vw;
  color: #555;
  padding: 0;
  text-align: left;
}
blockquote {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 40px;
  margin-inline-end: 40px;
}
.CardQuote--gray blockquote p {
  margin: 0 auto 1.4063vw;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
.CardQuote figcaption {
  font-size: 0.9375vw;
  color: #555;
  margin: 0;
  text-align: right;
  text-transform: uppercase;
}
.CardQuote--gray figcaption:nth-of-type(2n) {
  font-size: 0.8333vw;
  line-height: 1.25vw;
}
.CardQuote--gray figcaption {
  max-width: 10.8333vw;
  padding: 0;
}
.CardQuote figcaption {
  color: #555;
  margin: 0;
  text-align: right;
  text-transform: uppercase;
}
.carousel.carousel-slider .control-arrow {
  bottom: 0;
  color: #fff;
  font-size: 26px;
  margin-top: 0;
  padding: 5px;
  top: 0;
  left: 0;
  background: none;
  border: 0;
  cursor: pointer;
  opacity: 0.4;
  position: absolute;
  transition: all 0.25s ease-in;
  z-index: 2;
  display: none;
  outline: 0;
}
.carousel .slider-wrapper {
  margin: auto;
  overflow: hidden;
  transition: height 0.15s ease-in;
  width: 100%;
}
figcaption {
  display: block;
}
.carousel .control-next.control-arrow {
  right: 0;
}
.carousel .carousel-status {
  color: #fff;
  font-size: 10px;
  padding: 5px;
  position: absolute;
  right: 0;
  text-shadow: 1px 1px 1px rgb(0 0 0 / 90%);
  top: 0;
  display: none;
}
.CardQuote--gray {
  border-radius: 2.3438vw;
  height: auto;
  margin: 0;
  padding: 1.6667vw 1.9792vw 2.4479vw;
  width: 16.4063vw;
}
blockquote {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 40px;
  margin-inline-end: 40px;
}

/* 第三部分 */

.Block:before {
  bottom: 0;
  content: "";
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
}
.Block .solar-homeowner__container {
  overflow: visible;
  position: relative;
}
.solar-homeowner__background {
  background-image: url(https://goodleap.com/static/solar_homeowners-495688b628fa0cedabb0678c047a112d.jpg);
  clip-path: polygon(0 0, 100% 0, 100% 65%, 0 90%);
  background-repeat: no-repeat;
  background-size: cover;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.solar-homeowner__content {
  max-width: 42.8646vw;
  padding: 6.875vw 0 5.2083vw;
  display: block;
  margin: 0 auto;
  min-height: 100px;
  position: relative;
}
.solar-homeowner__title {
  font-size: 2.1875vw;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.9px;
  line-height: 2.7083vw;
  margin-bottom: 4.0625vw;
  max-width: 42.8646vw;
  padding: 0;
  text-align: center;
  color: #fff;
  font-weight: 400;
  margin: 0 auto 1.5rem;
}
.solar-homeowner__picture {
  width: 41.1458vw;
  height: auto !important;
  margin: auto;
}
.media-container {
  line-height: 0;
  position: relative;
}
.media-container__content {
  display: inline-block;
  line-height: 0;
  overflow: hidden;
  border-radius: 35px;
  pointer-events: all;
}
.picture {
  box-sizing: border-box;
  display: inline-block;
  line-height: 0;
}
.solar-homeowner__picture .picture img {
  line-height: 0;
  object-fit: fill;
}
img{
  max-width: 100%;
  border-style: none;
}

/* 第四部分 */
.SmileyBackgroundSkew {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  position: relative;
}
.SmileyBackgroundSkew:before {
  background-position: 110% 15%;
  background-size: 51.1979vw auto;
  clip-path: polygon(0 3%, 100% 0, 100% 100%, 0 100%);
  top: 5.2083vw;
  background-color: #f8f8f8;
  background-repeat: no-repeat;
  bottom: 0;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
}
.Block--grid-solar-cards-smile {
  background-position: 100% 8%;
  background-size: 78.2609vw auto;
  padding-bottom: 13.0208vw;
  background-color: transparent;
  background-repeat: no-repeat;
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

.solar-rectangle__container {
  position: relative;
}
.solar-rectangle__card {
  border-radius: 35px;
  box-shadow: 0 1.5625vw 2.0833vw 0 rgb(0 0 0 / 16%);
  font-size: 2.1875vw;
  letter-spacing: -0.0438vw;
  max-width: none;
  padding: 6.6667vw 3.75vw;
  width: 41.1458vw;
  background-image: linear-gradient(340deg, #f7b334, #fd8300 60%, #be5625 120%);
  color: #fff;
  line-height: 1.27;
  margin: 0 auto;
}
.solar-rectangle__text {
  margin: 0;
  max-width: none;
  font-weight: 400;
}
.pointer-parent {
  position: relative;
}
.Spacer {
  padding-top: 9.1667vw;
}
.solar-element {
  display: grid;
  gap: 0 3.5938vw;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  margin: 0 0 4.4792vw;
  max-width: none;
  transform: translateX(0);
  padding: 0 32px;
}
.solar-element__picture {
  align-self: center;
  box-shadow: 0 30px 45px 0 rgb(0 0 0 / 16%);
  height: 20.2604vw;
  margin-left: auto;
  margin-right: 0;
  padding: 1.6146vw;
  width: 20.2604vw;
  background-color: #fff;
  margin: 0 auto 32px;
  object-fit: contain;
}
.solar-element__content {
  margin: initial;
  max-width: none;
  padding: 3.3333vw 1.6667vw 3.3333vw 0;
}
.solar-element__name {
  font-size: 2.1875vw;
  letter-spacing: -0.0438vw;
  line-height: 2.7083vw;
  margin: 0;
  color: #555;
  font-weight: 400;
  position: relative;
  text-align: left;
}
.solar-element__description {
  font-size: 1.0417vw;
  line-height: 1.5625vw;
  max-width: 18.5417vw;
  color: #555;
}
.solar-element--hasOffset .solar-element__picture {
  grid-column: 2/3;
}

/* 第五部分 */
.Block--grid-dual--reverse {
  padding: 0;
  background-color: #f8f8f8;
  overflow: visible;
}
.HomeOwnersCard__Container {
    display: flex;
    flex-direction: row-reverse;
    margin: auto;
    right: auto;
    top: -14px;
    width: 71.875vw;
    background-color: #fff;
    box-shadow: 0 20px 40px 0 rgba(0,0,0,.16);
    overflow: hidden;
    position: relative;
    border-radius: 35px;
}
.HomeOwnersCard__PictureContainer {
    height: 36.4583vw;
    height: auto;
    margin-left: 0;
    margin-right: -10%;
    width: 100%;
}
.HomeOwnersCard__Picture {
    height: 102%;
    object-fit: cover;
    object-position: 60% center;
    width: 100%;
}
.HomeOwnersCard__TextContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 3.75vw 3.75vw 4.1667vw;
}
.HomeOwnersCard__TextContainer h3 {
    line-height: 1.1;
}
.heading--h1--dark {
  color: #555;
  font-size: 2.1875vw;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -.9px;
  line-height: 1.33;
  text-align: left;
  font-weight: 400;
}
.paragraph--dark{
  font-size: 18px;
  line-height: 1.42;
  max-width: 41.6667vw;
  padding: 0;
  color: #555;
  font-weight: 300;
  letter-spacing: normal;
  line-height: 1.43;
  text-align: left;
}
.paragraph {
    text-rendering: optimizeLegibility;
    font-stretch: normal;
    font-style: normal;
    margin: 1rem 0 0;
}

/* 第六部分 */
.sixcontant{
  -webkit-clip-path: polygon(0 0,100% 0,100% 80%,0 100%);
    clip-path: polygon(0 0,100% 0,100% 80%,0 100%);
    margin-bottom: 16px;
    padding-bottom: 48px;
    padding-top: 48px;
    position: relative;
    top: -20px;
}
.sixcontant .wrapper {
    max-width: 77.0833vw;
    padding: 0 16px;
    margin: 0 auto;
    position: relative;
    width: 100%;
    
}
.content-grid--tools {
    padding-bottom: 5.2083vw;
    padding-top: 5.2083vw;
    grid-row-gap: 0;
    display: block;
    margin: 0;
    max-width: 100%;
    width: 100%;
}
.content-grid__block {
    padding: 0 32px;
    width: 100%;
}
.wrapper--text {
    max-width: 34.375vw;
}
.heading--title-orange-dual {
    border-left: none;
    padding-left: 0;
    color: #555;
    font-size: 2.1875vw;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -.84px;
    line-height: 2.7083vw;
    text-align: left;
}
.heading--title-orange-dual:after{
  background-color: #ff8300;
    content: "";
    display: block;
    height: 3px;
    margin-top: 14px;
    width: 80px;
}
.paragraph--small-plus-right {
    font-size: 1.0417vw;
    line-height: 1.5625vw;
    padding: 0 2.0833vw 1.6667vw 0;
    color: #555;
    max-width: 95%;
}
.content-grid__block {
    padding: 0 32px;
    width: 100%;
}
.toolscollage__homeowners {
    min-height: 26.0417vw;
    top: 0;
    grid-column-end: 3;
    grid-column-start: 1;
    position: relative;
}
.toolscollage__homeowners_picture--0 {
    left: -0.1042vw;
    min-width: 1px;
    top: 2.0833vw;
    width: 38.6979vw;
    display: block;
    height: auto!important;
    position: absolute;
}
.toolscollage__homeowners img {
    max-width: inherit;
    width: 100%;
}
.toolscollage__homeowners_picture--1 {
    left: 40.625vw;
    right: auto;
    top: -8.5938vw;
    width: 16.1458vw;
    display: block;
    height: auto!important;
    position: absolute;
}
.toolscollage__homeowners_picture--2 {
    left: 58.4896vw;
    right: auto;
    top: 1.9792vw;
    width: 17.7083vw;
    display: block;
    height: auto!important;
    position: absolute;
}
</style>