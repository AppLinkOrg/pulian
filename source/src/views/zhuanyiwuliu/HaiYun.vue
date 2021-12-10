 
     <script setup>
import { PageHelper } from "../../PageHelper";
import { HttpHelper } from "../../HttpHelper";
import { ref } from "vue";
import { Utils } from "../../Utils";
let page = ref({});
let data = ref({});
PageHelper.Init(page, () => {});
HttpHelper.Post("page/haiyun", {}).then((ret) => {
  data.value = ret;
});
</script>

<template>
  <div v-if="page.Res != null && page.Inst != null && page.Text != null">
    <div
      class="
        HeaderSkewed HeaderSkewed--big HeaderSkewed--up HeaderSkewed--homeowners
      "
      style="background-color: rgb(255, 255, 255)"
    >
      <div class="HeaderSkewed__Content">
        <div class="HeaderContent">
          <div class="firsttitle" v-html="Utils.HtmlDecode(data.title)"></div>
          <div
            class="secondtitle"
            v-html="Utils.HtmlDecode(data.secondtitle)"
          ></div>

          <div>
            <img
              class="luyun"
              :src="page.uploadpath + 'haiyun/' + data.haiyunimg"
            />
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
              'url(' +
              page.uploadpath +
              'zonghewuliu/' +
              data.backgroundimg +
              ')',
          }"
        ></div>
      </div>
    </div>

    <div class="MissionHeadingWrapper">
      <h2 class="h2_font" style="color: #0095e7">
        <div v-html="Utils.HtmlDecode(data.contenttitle)"></div>
        <hr
          style="
            width: 15%;
            float: left;
            margin-top: 20px;
            background-color: orange;
          "
        />
      </h2>
      <br />

      <div class="htmldecodes" v-html="Utils.HtmlDecode(data.content)"></div>
    </div>
  </div>
</template>

<style scoped>
/* @media only screen and (min-width: 80em) {
  
} */
.HeaderSkewed--big {
  padding-top: 0;
  min-height: 50vw;
}
.HeaderSkewed {
  box-sizing: border-box;
  display: flex;

  flex-direction: column;
  overflow: visible;
  position: relative;
  z-index: 3;
}
.HeaderSkewed--homeowners
  .HeaderSkewed__Background
  .HeaderSkewed__BackgroundImage--desktop {
  background-position: center 0;
}
.HeaderSkewed--big .HeaderSkewed__Background {
  clip-path: polygon(0 0, 100% 0, 100% 41.6667vw, 0 100%);
  max-height: 50vw;
}

.HeaderSkewed__BackgroundImage--desktop {
  display: block;
}
.HeaderSkewed__BackgroundImage {
  background-repeat: no-repeat;
  background-size: cover;
}

.HeaderSkewed__Content {
  /* display: flex; */
  /* flex: 1 1; */
  /* flex-direction: column; */
  /* margin: 0 auto; */
  /* overflow: visible; */
  /* position: relative; */
  width: 100%;
  position: absolute;
  top: 36%;
  left: 10%;
  z-index: 2;
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
  user-select: none;
  z-index: 1;
}

.HeaderSkewed__BackgroundImage {
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
}

.luyun {
  width: 20%;
  height: 20%;
  margin-top: 8%;
}
.firsttitle {
  font-size: 3.1875vw;
  font-weight: Bold;
  letter-spacing: 10px;
  color: white;
}
.secondtitle {
  font-size: 2.1875vw;
  font-weight: Bold;
  letter-spacing: 5px;
  color: white;
}

.MissionHeadingWrapper {
  padding: 4% 20%;
}
@media only screen and (min-width: 500px) {
  .h2_font {
    font-size: 2.1875vw;
  }
}
@media only screen and (max-width: 500px) {
  .h2_font {
    font-size: 4.1875vw;
  }
}

@media only screen and (min-width: 1px) {
  .HeaderSkewed--big {
    min-height: 62.8019vw;
    padding-top: 0;
  }
  .HeaderSkewed--centered .HeaderSkewed__Content .HeaderContent {
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .HeaderSkewed--big .HeaderSkewed__Background {
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 48.3091vw, 0 100%);
    clip-path: polygon(0 0, 100% 0, 100% 48.3091vw, 0 100%);
    max-height: 62.8019vw;
  }
  .HeaderSkewed__Background {
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 36.2318vw, 0 100%);
    clip-path: polygon(0 0, 100% 0, 100% 36.2318vw, 0 100%);
    max-height: 50.7246vw;
  }
}

@media only screen and (min-width: 48em) {
  .HeaderSkewed--big {
    min-height: 50vw;
  }
  .HeaderSkewed--centered .HeaderSkewed__Content .HeaderContent {
    align-items: normal;
    display: initial;
    justify-content: normal;
    padding-bottom: 8.3333vw;
  }
  .HeaderSkewed--big .HeaderSkewed__Background {
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 41.6667vw, 0 100%);
    clip-path: polygon(0 0, 100% 0, 100% 41.6667vw, 0 100%);
    max-height: 50vw;
  }
  .HeaderSkewed__Background {
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 21.3542vw, 0 100%);
    clip-path: polygon(0 0, 100% 0, 100% 21.3542vw, 0 100%);
    max-height: 29.6875vw;
  }
}
@media only screen and (min-width: 80em) {
  .HeaderSkewed--big {
    padding-top: 0;
  }
}

@media only screen and (min-width: 120em) {
  .firsttitle {
    font-size: 56px !important;
  }
  .secondtitle {
    font-size: 40px;
  }
  .HeaderSkewed--big {
    min-height: 960px;
    padding-top: 0;
  }
  .h2_font {
    font-size: 40px;
  }
  .htmldecodes div span{
    font-size: 28px !important;
  }
  .HeaderSkewed--centered .HeaderSkewed__Content .HeaderContent {
    padding-bottom: 8.3333vw;
  }
  .HeaderSkewed--big .HeaderSkewed__Background {
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 800px, 0 100%);
    clip-path: polygon(0 0, 100% 0, 100% 800px, 0 100%);
    max-height: 960px;
  }
  .HeaderSkewed__Background {
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 410px, 0 100%);
    clip-path: polygon(0 0, 100% 0, 100% 410px, 0 100%);
  }
}
</style>