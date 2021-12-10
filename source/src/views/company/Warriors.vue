<script setup>
import { PageHelper } from "../../PageHelper";
import { HttpHelper } from "../../HttpHelper";
import { ref } from "vue";
import { Utils } from "../../Utils";
let page = ref({});
let data = ref({});
PageHelper.Init(page, () => {});
HttpHelper.Post("page/warriors", {}).then((ret) => {
  HttpHelper.Post("page/warriorscards", {}).then((list) =>{
    ret.tools = list;
    data.value = ret;
  })
});
</script>

<template>
  <div
    v-if="
      page.Res != null &&
      page.Inst != null &&
      page.Text != null &&
      data.firstimg != undefined
    "
  >
  <!-- 第一部分 -->
     <div class="firstcontant">
        <img class="firstimg" :src="page.uploadpath + 'warriors/' + data.firstimg" />
     </div>
  <!-- 第二部分 -->
      <div class=
        "secondcontant Block Block--warriors" 
        style=
        "z-index: 1;"
      >
        <div class="Block_content">
            <div class="VideoCardFeatured">
                <div class="second_video_card">
                  <div class="VideoCardFeatured_Card_Media">
                    <button class="naked-button player-picture" type="button">
                      <div class="VideoCardFeatured_Thumbnail">
                        <img  class="firstimg" :src="page.uploadpath + 'warriors/' + data.secondvideo" />
                        <img class="first_min_img" :src="page.uploadpath + 'warriors/' + data.threeminimg" />
                      </div>
                    </button>
                  </div>
                  <div class="VideoCardFeatured_Card_Container">
                    <button class="naked-button player-picture">
                      <div class="card_contant">
                        <div class="second_card_titie" v-html="Utils.HtmlDecode(data.secondtitle)"></div>
                        <div class="second_card_text" v-html="Utils.HtmlDecode(data.secondtext)"></div>
                      </div>                      
                    </button>                      
                  </div>
                </div>
            </div>
            <div class="card_list" v-if="data.tools.length > 0">
              <template v-for="(item, index) in data.tools">
                <div class="card_box" >
                  <button class="naked-button player-picture">
                    <div class="card_box_img">
                     <img  class="firstimg" :src="page.uploadpath + 'warriors/' + data.tools[index].video" />
                     <img class="first_min_img" :src="page.uploadpath + 'warriorscard/' + data.tools[index].minimg" />
                    </div>
                    <div class="card_box_content">
                      <h2 class="VideoCard__Title"><div v-html="Utils.HtmlDecode(data.tools[index].title)"></div></h2>
                      <div class="VideoCard__Description" v-html="Utils.HtmlDecode(data.tools[index].content)"></div>
                    </div>
                  </button>
                </div>
              </template>
            </div> 
        </div>
      </div>
  </div>
</template>
<style scoped>
.firstcontant{
    margin: 0;
    min-height: 300px;
    padding: 6.1979vw 0 0;
    background-color: #f8f8f8;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}
.firstcontant .firstimg{
    margin-bottom: 1rem;
    width: 31.9271vw;
    height: auto;
    z-index: 3;
    max-width: 100%;
}

.Block {
    background-color: #fff;
    overflow: hidden;
    position: relative;
}
.Block::before {
    bottom: 0;
    content: "";
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
}
.Block--warriors {
    background-color: #f8f8f8;
    margin: 0 auto;
    padding: 0 32px 32px;
    position: relative;
}
.Block--warriors::before {
    background-color: #fff;
    -webkit-clip-path: polygon(0 68%,180% 10%,100% 100%,0 100%);
    clip-path: polygon(0 73%,100% 34%,100% 100%,0 100%);
}
.Block_content{
  margin: 0 auto;
  padding: 0;
  position: relative;
  z-index: 2;
}
.secondcontant .VideoCardFeatured{
    margin: 64px auto;
    max-width: 1266px;
    padding: 32px;
}
.Block--warriors .second_video_card{
    border-radius: 45px;
    box-shadow: 0 15px 20px rgba(0,0,0,.078);
    display: flex;
    background-color: #fff;
    overflow: hidden;
    width: auto;
}
.secondcontant .VideoCardFeatured_Card_Media {
    display: flex;
    flex: 5 1;
    flex-direction: column;
    line-height: 0;
    position: relative;
}
.secondcontant .VideoCardFeatured__Card_Media .player-picture {
    display: flex;
    flex: 2 1;
    flex-direction: column;
    position: relative;
}
.secondcontant .naked-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    line-height: 0;
    margin: 0;
    outline: none;
    padding: 0;
}
.secondcontant .VideoCardFeatured_Thumbnail {
    display: flex;
    flex: 1 1;
    flex-direction: column;
    line-height: 0;
    width: 100%;
}
.secondcontant .firstimg{
  object-fit: cover;
  object-position: top center;
}
.secondcontant .first_min_img{
  width: 6.25vw;
  bottom: 0;
cursor: pointer;
left: 0;
margin: auto;
position: absolute;
right: 0;
top: 0;
transition: opacity .4s ease-in-out;
}
.secondcontant .card_contant{
  padding: 32px 60px;
  color: #555;
  font-weight: 400;
  text-align: left;
}
.secondcontant .second_card_titie{
  font-size: 42px;
  line-height: 1.3;
  margin: 0 0 16px;
  width: 18.4ch;
  letter-spacing: -.84px;
  text-transform: uppercase;
}
.secondcontant .second_card_text{
  font-size: 20px;
  line-height: 1.5;
  min-height: auto;
  letter-spacing: -.4px;
  margin: 0;

}
.WL_VideoGrid {
    grid-column-gap: 128px;
    grid-row-gap: 118px;
    align-content: stretch;
    grid-template-columns: repeat(2,1fr);
    grid-template-rows: repeat(2,1fr);
    margin: auto;
    max-width: 1266px;
    padding: 64px 32px;
}
.VideoCard {
    border-radius: 45px;
    box-shadow: 0 15px 20px rgba(0,0,0,.078);
    margin: 0 auto;
    max-width: 100%;
    width: 100%;
    background-image: linear-gradient(340deg,#f7b334,#fd8300 60%,#be5625 120%);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: box-shadow .4s ease-in-out;
}

.card_list{
  grid-column-gap: 128px;
  grid-row-gap: 118px;
  align-content: stretch;
  grid-template-columns: repeat(2,1fr);
  grid-template-rows: repeat(2,1fr);
  margin: auto;
  max-width: 1266px;
  padding: 64px 32px;
  display: grid;
  justify-content: center;
}
.card_list .card_box{
  background-image: linear-gradient(340deg,#f7b334,#fd8300 60%,#be5625 120%);
  border-radius: 45px;
  box-shadow: 0 15px 20px rgba(0,0,0,.078);
  margin: 0 auto;
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: box-shadow .4s ease-in-out;
  overflow: hidden;
}
.card_box .card_box_img{
  line-height: 0;
  overflow: hidden;
  position: relative;
  width: 100%;
}
.card_box_content{
  padding: 24px 50px;
}
.VideoCard__Title {
    margin: 0 0 1rem;
    font-size: 1.6667vw;
    line-height: 2.1875vw;
    color: #f8f7f5;
    font-weight: 400;
    text-align: left;
    text-transform: uppercase;
}
.VideoCard__Description{
    font-size: 1.0417vw;
    line-height: 1.36;
    margin: 0 auto 3.5rem;
    color: #f8f7f5;
    font-weight: 400;
    text-align: left;
}
</style>