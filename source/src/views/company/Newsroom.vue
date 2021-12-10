<script setup>
import { PageHelper } from "../../PageHelper";
import { HttpHelper } from "../../HttpHelper";
import { ref } from "vue";
import { Utils } from "../../Utils";
let page = ref({});
let data = ref({});
PageHelper.Init(page, () => {});
HttpHelper.Post("page/newsroom", {}).then((ret) => {
  HttpHelper.Post("page/newsroompress", {}).then((list) => {
    ret.list = list;
    HttpHelper.Post("page/newsroomfourth", {}).then((fourlist) => {
      ret.fourlist = fourlist;
      data.value = ret;
    });
  });
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
    <!-- 第一部分 -->
    <div class="firstcontent" style="background-color: #fff">
      <div class="HeaderSkewed__Content">
        <div class="HeaderContent">
          <h1 class="HeaderContentTitleCenter__Title">{{ data.slogen }}</h1>
        </div>
      </div>
      <div class="HeaderSkewed__Background">
        <div
          class="
            HeaderSkewed__BackgroundImage HeaderSkewed__BackgroundImage--desktop
          "
          :style="{
            backgroundImage:
              'url(' + page.uploadpath + 'newsroom/' + data.background1 + ')',
          }"
        ></div>
      </div>
    </div>
    <!-- 二 -->
    <div class="secondcontent">
      <div class="Block Block--grid-white" style="z-index: 1">
        <div class="Block__content">
          <div class="wrapper wrapper--slim wrapper--featured">
            <div class="wrapper wrapper--paddless">
              <div class="NewsroomSeparator NewsroomSeparator--paddless">
                <h2 class="NewsroomSeparator__Text">{{ data.stitle1 }}</h2>
              </div>
              <article class="NewsroomContentFeatured">
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  class="NewsroomContentFeatured__Wrapper"
                  ><img
                    class="
                      NewsroomContentFeatured__Image
                      NewsroomContentFeatured__Image--video
                    "
                    :src="page.uploadpath + 'newsroom/' + data.simg1" />
                  <div
                    class="NewsroomContentFeatured__Box"
                    v-html="Utils.HtmlDecode(data.scontent1)"
                  ></div
                ></a>
              </article>
            </div>
            <div class="wrapper wrapper--paddless">
              <div class="NewsroomSeparator NewsroomSeparator--paddless">
                <h2 class="NewsroomSeparator__Text">{{ data.stitle2 }}</h2>
              </div>
              <article class="NewsroomContentFeatured">
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  class="NewsroomContentFeatured__Wrapper"
                  ><img
                    class="
                      NewsroomContentFeatured__Image
                      NewsroomContentFeatured__Image--video
                    "
                    :src="page.uploadpath + 'newsroom/' + data.simg2" />
                  <div
                    class="NewsroomContentFeatured__Box"
                    v-html="Utils.HtmlDecode(data.scontent2)"
                  ></div
                ></a>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 三 -->
    <div class="thirdcontent">
      <div class="Block Block--grid-white" style="z-index: 1">
        <div class="Block__content">
          <div class="wrapper wrapper--slim">
            <div class="NewsroomSeparator NewsroomSeparator--normal">
              <h2 class="NewsroomSeparator__Text">{{ data.thtitle }}</h2>
            </div>
            <div class="NewsroomGrid">
              <div class="NewsroomGrid__Children">
                <article
                  class="NewsroomContentPress"
                  v-for="item of data.list"
                  :key="item"
                  v-html="Utils.HtmlDecode(item.content)"
                ></article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 四 -->
    <div class="fourcontent">
      <div class="Block Block--grid-gray" style="z-index: 1">
        <div class="Block__content">
          <div class="wrapper wrapper--slim">
            <div class="NewsroomSeparator NewsroomSeparator--normal">
              <h2 class="NewsroomSeparator__Text">{{ data.fourtitle }}</h2>
            </div>
            <div class="NewsroomDisclaimer">
              <div
                class="NewsroomDisclaimer__Wrapper"
                v-html="Utils.HtmlDecode(data.fourcontent)"
              ></div>
            </div>
            <div class="NewsroomGrid" v-for="item of data.fourlist" :key="item">
              <h3 class="NewsroomGrid__Title">{{ item.name }}</h3>
              <div class="NewsroomGrid__Children">
                <article
                  class="NewsroomContentMedia"
                  v-for="child of item.imglist"
                  :key="child"
                >
                  <a
                    :download="page.uploadpath + 'newsroom/' + child.img"
                    :href="page.uploadpath + 'newsroom/' + child.img"
                    class="NewsroomContentMedia__Link"
                    ><div class="NewsroomContentMedia__Image">
                      <img
                        :src="page.uploadpath + 'newsroom/' + child.img"
                        :alt="child.name"
                        v-if="child.video==''"
                      />
                      <video
                        v-else
                        autoplay
                        loop
                        muted
                        playsinline
                        :poster="page.uploadpath + 'newsroom/' + child.img"
                      >
                        <source
                          :src="page.uploadpath + 'newsroom/' + child.video"
                          type="video/mp4"
                        />
                      </video>
                    </div>
                    <h3 class="NewsroomContentMedia__Title">
                      <span>{{ child.name }}</span
                      ><i v-if="child.name != ''"
                        ><svg
                          width="15"
                          height="18"
                          viewBox="0 0 15 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.10156 1V13.2029"
                            stroke="#555555"
                            stroke-width="2"
                            stroke-linecap="round"
                          ></path>
                          <path
                            d="M13.2031 16.7383H1"
                            stroke="#555555"
                            stroke-width="2"
                            stroke-linecap="round"
                          ></path>
                          <path
                            d="M3.32617 9.73438L7.10351 13.5098L10.8809 9.73438"
                            stroke="#555555"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path></svg
                      ></i></h3
                  ></a>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 五 -->
    <div class="fifthcontent">
      <div class="Block Block--grid-white" style="z-index: 1">
        <div class="Block__content">
          <div class="wrapper wrapper--slim">
            <div class="NewsRoomMediaContact">
              <div class="NewsRoomMediaContact__Wrapper">
                <h2 class="NewsRoomMediaContact__Title">
                  {{ data.fifthtitle }}
                </h2>
                <div v-html="Utils.HtmlDecode(data.fifthcontent)"></div>
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
.firstcontent .HeaderContentTitleCenter__Title {
  font-size: 42px;
  font-weight: 400;
  color: #fff;
  letter-spacing: -0.84px;
  margin: 0;
  padding: 0 32px;
  text-align: center;
}
.firstcontent .HeaderSkewed__Background {
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
}

.Block {
  background-color: #fff;
  overflow: hidden;
  position: relative;
}
.Block--grid-white {
  background-color: #fff;
  min-height: 100px;
}
.Block__content {
  margin: 0 auto;
  padding: 0;
  position: relative;
  z-index: 2;
}
.Block--grid-white .Block__content {
  padding: 5.7971vw 0;
}
.wrapper {
  margin: 0 auto;
  padding: 0 16px;
  position: relative;
  width: 100%;
}
.wrapper--slim {
  max-width: 91.7874vw;
  width: 100%;
}
.wrapper--featured {
  align-items: flex-start;
  display: grid;
  grid-template-columns: 1fr;
}
.wrapper--paddless {
  padding: 0;
}
.NewsroomSeparator {
  margin: 0 0 2rem;
  padding: 32px 16px 16px;
}
.NewsroomSeparator--paddless {
  padding: 32px 16px 0;
}
.NewsroomSeparator__Text {
  color: #555;
  font-size: 36px;
  letter-spacing: -0.84px;
  line-height: 1.2;
  margin: 0 auto;
  text-align: center;
}
.NewsroomGrid {
  margin-bottom: 2rem;
}
.NewsroomGrid__Children {
  grid-column-gap: 3.5rem;
  grid-row-gap: 2rem;
  align-items: start;
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  justify-items: stretch;
}
.NewsroomDisclaimer {
  margin-bottom: 3rem;
}
.NewsroomDisclaimer__Wrapper {
  margin: 0 auto;
  max-width: 611px;
  padding: 0 16px;
}
.Block--grid-gray {
  background-color: #f1f1f1;
  min-height: 100px;
}
.Block--grid-gray {
  overflow: visible;
}
.Block--grid-gray .Block__content {
  padding: 5.7971vw 0;
}
.NewsroomGrid__Title {
  color: #555;
  font-size: 24px;
  letter-spacing: -0.56px;
  line-height: 40px;
  margin: 0 0 1.5rem;
  text-align: center;
}
.NewsroomContentMedia {
  overflow: hidden;
}
.NewsroomContentMedia__Image {
  line-height: 0;
  margin: 0 auto;
}
.NewsroomContentMedia__Image img {
  height: auto;
  max-width: 100%;
  width: 100%;
}
.NewsroomContentMedia__Title {
  align-items: center;
  color: #555;
  display: flex;
  font-size: 16px;
  font-weight: 700;
  justify-content: center;
  letter-spacing: -0.4px;
  line-height: 28px;
  margin: 16px auto;
  padding: 0 8px;
  text-align: center;
  transition: all 0.2s linear;
}
.NewsroomContentMedia__Title i {
  padding: 0.5rem 0.5rem 0;
}
.NewsRoomMediaContact {
  margin: 2rem auto;
  overflow: hidden;
  padding: 0 32px;
}
.NewsRoomMediaContact__Wrapper {
  margin: 2rem auto 0;
  max-width: 493px;
}
.NewsRoomMediaContact__Title {
  color: #555;
  font-size: 26px;
  letter-spacing: -0.84px;
  line-height: 40px;
}
.NewsRoomMediaContact__Title:after {
  background-color: #f7b334;
  content: "";
  display: block;
  height: 3px;
  margin-top: 20px;
  width: 107px;
}
@media only screen and (min-width: 48em) {
  .Block--grid-white {
    padding-bottom: 0;
  }
  .Block--grid-white .Block__content {
    padding: 2.5vw 0;
  }
  .wrapper {
    max-width: 77.0833vw;
    padding: 0 16px;
  }
  .wrapper--slim {
    max-width: 1242px;
  }
  .wrapper--featured {
    grid-gap: 3rem;
    grid-template-columns: repeat(auto-fill, minmax(581px, 1fr));
  }
  .wrapper--paddless {
    padding: 0;
  }
  .NewsroomSeparator {
    margin: 0 0 2rem;
    padding: 32px;
  }
  .NewsroomSeparator--paddless {
    padding: 32px 16px;
  }
  .NewsroomSeparator__Text {
    font-size: 42px;
  }
  .NewsroomGrid {
    margin-bottom: 6rem;
  }
  .NewsroomGrid__Children {
    grid-row-gap: 3.75rem;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
  .NewsroomDisclaimer {
    margin-bottom: 5rem;
  }
  .Block--grid-gray {
    padding-bottom: 0;
  }
  .Block--grid-gray .Block__content {
    padding: 2.5vw 0;
  }
  .NewsroomGrid__Title {
    font-size: 26px;
    line-height: 40px;
    margin: 0 0 3rem;
  }
  .NewsroomContentMedia__Image {
    max-width: 366px;
    width: 100%;
  }
  .NewsRoomMediaContact__Title {
    font-size: 42px;
    line-height: 52px;
  }
}
</style>