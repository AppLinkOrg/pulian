<script setup>
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { ref } from "vue";
import { Utils } from "../Utils";
let page = ref({});
let data = ref({});
PageHelper.Init(page, () => {});
HttpHelper.Post("page/contactus", {}).then((ret) => {
  data.value = ret;
});
</script>

<template  >
  <div style="padding-bottom: 30px">
    
    <div
      class="HeaderSkewed HeaderSkewed--normal" 
    >
      <div class="HeaderSkewed__Content">
        <div class="HeaderContent HeaderContentTitleCenter">
          <h1 class="HeaderContentTitleCenter__Title">{{data.title}}</h1>
        </div>
      </div>
      <div class="HeaderSkewed__Background">
        <div
          class="
            HeaderSkewed__BackgroundImage HeaderSkewed__BackgroundImage--desktop
          "
          :style="{
            backgroundImage:
              'url(' + page.uploadpath + 'contactus/' + data.topimg + ')',
          }"
        ></div>
        <div
          class="
            HeaderSkewed__BackgroundImage HeaderSkewed__BackgroundImage--mobile
          "
          :style="{
            backgroundImage:
              'url(' + page.uploadpath + 'contactus/' + data.topimg + ')',
          }"
        ></div>
      </div>
    </div>



    <div class="ContactCard" style="margin-top: 30px; margin-bottom: 62.4px">
      <img class="icon" :src="page.uploadpath + 'contactus/' + data.icon1" />

      <div class="ContactCard__Title">{{data.content1}}</div>

      <a href="tel:1-844-562-6725" class="ContactCard__Phone"
        >{{data.telephone}}
      </a>

      <div class="ContactCard__Schedule" style="margin-top: 32px">
        <p>{{data.content2}}</p>
        <p>{{data.content3}}</p>
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
.HeaderContentDirecyPay__Title, .HeaderContentTitleCenter__Title, .HeaderContentTitleCenterChildren__Title {
    font-size: 42px;
}
.HeaderContentDirecyPay__Title, .HeaderContentTitleCenter__Title, .HeaderContentTitleCenterChildren__Title {
    color: #fff;
    letter-spacing: -.84px;
    margin: 0;
    padding: 0 32px;
    text-align: center;
}
.HeaderSkewed__Background {
    /* -webkit-clip-path: polygon(0 0,100% 0,100% 21.3542vw,0 100%); */
    clip-path: polygon(0 0,100% 0,100% 21.3542vw,0 100%);
    max-height: 29.6875vw;
}
.HeaderSkewed__Background {
    background-color: #555;
    bottom: 0;
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    /* -webkit-user-select: none;
    -ms-user-select: none; */
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
}
.HeaderSkewed__BackgroundImage {
    /* background-position: top;
    background-repeat: no-repeat;
    background-size: cover; */
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
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
.ContactCard {
  margin-top: 30px;
  padding: 64px 76px 90px;
  border-radius: 45px;
  background: #fff;
  box-shadow: 0 15px 40px rgb(0 0 0 / 5%);
  margin: 0 auto;
  max-width: 454px;
  overflow: hidden;
}
.ContactCard__Title {
  font-size: 32px;
  margin: 0 0 30px;
  padding-right: 24px;
  color: #555;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.64px;
  line-height: 1.4;
  mix-blend-mode: normal;
  opacity: 1;
  text-transform: capitalize;
}
.ContactCard__Phone {
  color: #2f787f !important;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 1.16;
  /* margin: 0 0 32px;  */
  text-decoration-line: underline;
}
.ContactCard__Schedule {
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;
  margin: 0 0 24px;
  color: #555;
}
.ContactCard__Schedule p {
  margin: 0;
}
</style>