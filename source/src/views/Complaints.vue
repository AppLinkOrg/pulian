<script setup>
import { PageHelper } from "../PageHelper";
import { HttpHelper } from "../HttpHelper";
import { ref } from "vue";
import { Utils } from "../Utils";
let page = ref({});
let data = ref({});
PageHelper.Init(page, () => {});
HttpHelper.Post("page/complaints", {}).then((ret) => {
  HttpHelper.Post("page/complaintsinfo", {}).then((list) => {
    ret.list = list;
    for(let item of ret.list){
      item.yzerror=false;
    }
    data.value = ret;
  });
});

var submitinfo=()=>{
  var a=0;
  var content ='';
   for(let item of data.value.list){
    if(item.bitian_value=='Y' && (item.inputvalue=='' || item.inputvalue==undefined)){
      item.yzerror=true;
      a++;
    }else {
      item.yzerror=false;
    }
    content+=item.title+'：'+item.inputvalue+'\n';
  }
  if(a>0){
    return
  }
  HttpHelper.Post('page/addcomplaints',{content:content}).then((ret)=>{
    if(ret.code=='0'){
      alert('提交成功')
    }else {
      alert('提交失败')
    }
  })
}

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
        class="HeaderSkewed HeaderSkewed--normal"
        style="background-color: rgb(255, 255, 255)"
      >
        <div class="HeaderSkewed__Content">
          <div class="HeaderContent HeaderContentTitleCenterChildren">
            <h1 class="HeaderContentTitleCenterChildren__Title" >
              {{ data.slogen }}
            </h1>
            <div class="HeaderContentTitleCenterChildren__Children">
              <div class="jumbotron-card jumbotron-card--form">
                <div class="form-do-not-sell">
                  <form id="form-top" >
                    <h2>
                      {{ data.stitle }}
                    </h2>
                    <p class="disclaimer disclaimer--required">
                      {{ data.stishi }} <span class="label-red">*</span>
                    </p>
                    <div
                      class="input-container"
                      v-for="item of data.list"
                      :key="item"
                    >
                      <label class="label label--filled" :for="item.id"
                        >{{ item.title
                        }}<span
                          class="label-red"
                          v-if="item.bitian_value == 'Y' &&
                            item.isinput != 'textarea'"
                          >*</span
                        >
                        <span
                          v-if="
                            item.bitian_value == 'Y' &&
                            item.isinput == 'textarea'
                          "
                          class="required-mark"
                          >*</span
                        >
                      </label>
                      <textarea
                        v-if="item.isinput == 'textarea'"
                        class="input input--textarea false "
                        :class="item.yzerror?'invalid':''"
                        :name="item.title"
                        :id="item.title"
                        type="text"
                        :placeholder="item.tishi"
                        component="InputTextarea"
                        v-model="item.inputvalue"
                      ></textarea
                      ><input
                        v-else
                        class="input false "
                        :class="item.yzerror?'invalid':''"
                        :name="item.title"
                        :id="item.title"
                        type="text"
                        component="InputText"
                        :placeholder="item.tishi"
                        autocomplete="off"
                        v-model="item.inputvalue"
                      />
                    </div>

                    <div v-html="Utils.HtmlDecode(data.sfooter)"></div>
                    <button
                      type="button"
                      class="button-submit"
                      aria-label="Submit form"
                      @click="submitinfo"
                    >
                      {{ data.btntext }}
                    </button>
                  </form>
                </div>
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
                'url(' +
                page.uploadpath +
                'complaints/' +
                data.background1 +
                ')',
            }"
          ></div>
        </div>
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
.HeaderContent {
  flex: 1 1;
  pointer-events: all;
  position: relative;
  z-index: 1;
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
.jumbotron-card {
  background-image: linear-gradient(340deg, #f7b334, #fd8300 60%, #be5625 120%);
  box-shadow: 0 10px 30px 0 rgb(0 0 0 / 20%);
  margin: 32px auto 0;
  max-width: 85%;
  -o-object-fit: contain;
  object-fit: contain;
  padding: 32px;
  width: 100%;
}
.jumbotron-card--form {
  background-color: #fff;
  background-image: none;
  margin-top: 7.7295vw;
  max-width: 100%;
}
.border-rounded,
.card-benefit,
.card-benefit--gray,
.card-benefit--hasDescription,
.card-benefit--orange,
.card-benefit--purple,
.card-benefit--simple,
.card-benefit--small,
.contact-form,
.jumbotron-card,
.media-container--custom-1 .media-container__content,
.media-container__content,
.solar-element__picture,
.solar-rectangle__card,
.toolscollage__homeowners_picture--0 img {
  border-radius: 20px;
}
.form-do-not-sell,
.FormLegals {
  color: #555;
  font-size: 12px;
  line-height: 1.2;
  margin: 16px 0 0;
  text-align: left;
}
.jumbotron-card--form h1,
.jumbotron-card--form h2,
.jumbotron-card--form h3 {
  color: #555 !important;
}
.jumbotron-card h1,
.jumbotron-card h2,
.jumbotron-card h3 {
  color: #fff;
  font-size: 25px;
  font-weight: 400;
  letter-spacing: -0.56px;
  line-height: 1.26;
  margin: 0 0 21px;
}
p.disclaimer--required {
  padding-left: 32px;
}
.form-do-not-sell,
.FormLegals {
  color: #555;
  font-size: 12px;
  line-height: 1.2;
  margin: 16px 0 0;
  text-align: left;
}

.jumbotron-card p {
  color: #fff;
  font-size: 18px;
  line-height: 1.39;
  margin: 0 0 34px;
}
.contact-form .disclaimer,
.form-do-not-sell .disclaimer {
  color: #555;
  font-size: 16px;
  letter-spacing: -0.44px;
  line-height: 1;
  margin: 0 0 7.7295vw;
  text-align: left;
}
.label-red {
  color: #d472ff;
}
.contact-form .disclaimer span,
.form-do-not-sell .disclaimer span {
  color: #c77bff;
}
.input-container {
  margin-bottom: 2rem;
  position: relative;
}
.label {
  color: #555;
  display: block;
  font-size: 16px;
  line-height: 1.44;
  padding: 0 32px 4px;
  text-align: left;
  top: 0;
  transition: top 0.2s ease-in-out;
}
.input {
  background-color: #f1f1f1;
  border: 1px solid transparent;
  border-radius: 32px;
  font-size: 18px;
  height: 45px;
  line-height: 1.17;
  padding: 0 32px;
  width: 100%;
}
.input--textarea {
  height: 149px;
  max-height: 500px;
  max-width: 100%;
  min-height: 149px;
  min-width: 100%;
  padding: 24px 32px;
}
.button-submit {
  align-content: stretch;
  align-items: center;
  background-color: transparent;
  border: 2px solid #444;
  border-radius: 36px;
  color: #444;
  cursor: pointer;
  display: inline-flex;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 1;
  margin: 16px 0 0;
  outline: none;
  padding: 10px 22px;
  pointer-events: all;
  position: relative;
  text-align: center;
  transition: box-shadow 0.3s;
  white-space: nowrap;
  width: auto;
}
.button-submit {
  transition: all 0.2s linear;
}
.button-submit:hover {
  background: #444;
  border-color: transparent;
  color: #fff;
}
.required-mark {
  color: #c77bff;
}
.input.invalid, .input:invalid {
    box-shadow: 0 0 0 1px #d14041;
}
@media only screen and (min-width: 1px) {
  .HeaderSkewed {
    min-height: 50.7246vw;
    padding-top: 0;
  }
  .HeaderSkewed__Background {
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 36.2318vw, 0 100%);
    clip-path: polygon(0 0, 100% 0, 100% 36.2318vw, 0 100%);
    max-height: 50.7246vw;
  }
  .HeaderSkewed__BackgroundImage--desktop {
    display: none;
  }
  .HeaderSkewed__Content {
    padding-bottom: 7.2464vw;
  }
  .HeaderContentDirecyPay__Title,
  .HeaderContentTitleCenter__Title,
  .HeaderContentTitleCenterChildren__Title {
    font-size: 5.314vw;
  }
  .HeaderContentTitleCenterChildren__Title {
    margin: 80px 0;
  }
  .HeaderContentTitleCenterChildren__Children {
    padding: 0 32px;
  }
}
@media only screen and (min-width: 64em) {
  .jumbotron-card {
    margin: 1.6667vw auto 0;
    max-width: 41.4583vw;
    padding: 3.3854vw 4.6875vw 2.3438vw;
  }
  .jumbotron-card h1,
  .jumbotron-card h2,
  .jumbotron-card h3 {
    font-size: 2.0833vw;
    letter-spacing: -0.0469vw;
    line-height: 1.4;
    margin: 0 0 1.5625vw;
  }
  .jumbotron-card p {
    font-size: 1.25vw;
    line-height: 1.42;
    margin: 0 0 1.7708vw;
  }
}
@media only screen and (min-width: 48em) {
  .HeaderSkewed {
    min-height: 29.6875vw;
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
  .HeaderSkewed__Content {
    padding-bottom: 4.16665vw;
  }
  .HeaderContentDirecyPay__Title,
  .HeaderContentTitleCenter__Title,
  .HeaderContentTitleCenterChildren__Title {
    font-size: 42px;
  }
  .HeaderContentTitleCenterChildren__Title {
    margin: 112px 0;
  }
  .HeaderContentTitleCenterChildren__Children {
    padding: 0 32px;
  }
  .jumbotron-card--form {
    margin-top: 7.9167vw;
    max-width: 53.8021vw;
    padding: 0.8333vw 4.6875vw 3.75vw;
    width: 100%;
  }
  .border-rounded,
  .card-benefit,
  .card-benefit--gray,
  .card-benefit--hasDescription,
  .card-benefit--orange,
  .card-benefit--purple,
  .card-benefit--simple,
  .card-benefit--small,
  .contact-form,
  .jumbotron-card,
  .media-container--custom-1 .media-container__content,
  .media-container__content,
  .solar-element__picture,
  .solar-rectangle__card,
  .toolscollage__homeowners_picture--0 img {
    border-radius: 35px;
  }
  .form-do-not-sell,
  .FormLegals {
    font-size: 16px;
    margin: 3.5417vw 0 0;
  }
  p.disclaimer--required {
    padding-left: 32px;
  }
  .contact-form .disclaimer,
  .form-do-not-sell .disclaimer {
    font-size: 16px;
    margin-bottom: 2.0833vw;
  }
  .input-container {
    margin-bottom: 1.5rem;
  }
  .label {
    font-size: 16px;
    line-height: 1.44;
  }
  .input {
    font-size: 18px;
    line-height: 1.17;
  }
  .button-submit {
    border-radius: 36px;
    font-size: 18px;
    padding: 10px 22px;
  }
  .form-do-not-sell,
  .FormLegals {
    font-size: 16px;
    margin: 3.5417vw 0 0;
  }
  p.FormLegals {
    font-size: 16px !important;
  }
}

@media only screen and (min-width: 80em) {
  .HeaderSkewed {
    padding-top: 0;
  }
}
</style>