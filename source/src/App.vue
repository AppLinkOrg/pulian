<script setup>
import { PageHelper } from "./PageHelper";
import { ref, watch } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import BackToTop from "./components/BackToTop.vue";
import { useRouter } from "vue-router";
let page = ref({});
PageHelper.Init(page, () => {});
watch(useRouter,(newValue,oldValue)=>{
  console.log("count改变了");
})


</script>

<template>
      <div id="app">
    <router-view class="router-view" v-slot="{ Component }">
      <transition :name="transitionName">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
#app {
  
}
.mainbody {
  width: 100vw;
  max-width: 1920px;
  background: white;
}
.big-bg{
  background: white;
  width: 100vw;
  min-height: 100vh;

}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active{
    height: 100%;
    will-change: transform;
    transition: all 500ms cubic-bezier(.55,0,.1,1);
    position: absolute;
    backface-visibility: hidden;
}
.slide-right-enter-active{
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active{
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}
.slide-left-enter-active{
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active{
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}


.bg-w{
  background: white;
}
.bg-1{
background:#F6F6F6;
}
.bg-2{
  background:#E4E4E4;
}
.bg-3{
  background:#FC574F;
}
.bg-4{
  background:#ECF5FF;
}
.bg-5{
  background: linear-gradient(264deg, #409EFF 0%, #67B0FD 100%);
}
.w-100{
  width: 100vw;
}
.wf-100{
  width: 100%;
}
.h-100{
  height: 100%;
}
.h-1{
  height: 1px;
}
.h-4{
  height: 4px;
}
.h-13{
  height: 13px;
}
.h-14{
  height: 14px;
}
.h-17{
  height: 17px;
}
.h-19{
  height: 19px;
}
.h-22{
  height: 22px;
}
.h-25{
  height: 25px;
}
.h-30{
  height: 30px;
}
.h-38{
  height: 38px;
}
.h-40{
  height: 40px;
}
.h-44{
  height: 44px;
}
.h-50{
  height: 50px;
}
.h-56{
  height: 56px;
}
.h-93{
  height: 93px;
}
.h-200{
  height: 200px;
}
.h-215{
  height: 215px;
}
.flex-none{
  flex: none;
}
.flex-row {
  display: flex;
}
.flex-1 {
  flex: 1;
}

.flex-wrap {
  flex-wrap: wrap;
}

.flex-center {
  align-content: center;
  align-items: center;
}
.flex-column {
  align-content: center;
  align-items: center;
  flex-direction: column;
}
.minheight {
  min-height: 100vh;
}
.center {
  text-align: center;
}
.right {
  text-align: right;
}
.imgbox {
  display: flex;
}
.h100p {
  height: 100%;
}
.c-w {
  color: white;
}
.c-1{
  color: #666666;
}
.c-2{
  color: #333333;
}
.c-3{
 color: #1890FE;
}
.c-4{
 color: #FA625F;
}
.c-5{
 color: #FB6260;
}
.f-1{
  font-size: 9px;
}
.f-2{
  font-size: 11px;
}
.f-7{
  font-size: 7px;
}
.f-8{
  font-size: 8px;
}
.f-9{
  font-size: 9px;
}
.f-10{
  font-size: 10px;
}
.f-11{
  font-size: 11px;
}
.f-12{
  font-size: 12px;
}
.f-13{
  font-size: 13px;
}
.f-14{
  font-size: 14px;
}
.f-15{
  font-size: 15px;
}
.f-16{
  font-size: 16px;
}
.f-17{
  font-size: 17px;
}
.f-18{
  font-size: 18px;
}
.f-24{
  font-size: 24px;
}
.f-40{
  font-size: 40px;
}
.border-radius-2{
  border-radius: 2px;
}
.border-radius-5{
  border-radius: 5px;
}
.border-radius-9{
  border-radius: 9px;
}
.border-radius-11{
  border-radius: 11px;
}
.border-radius-19{
  border-radius: 19px;
}
.border-radius-20{
  border-radius: 20px;
}
.line-height-17{
  line-height: 17px;
}
.line-height-19{
  line-height: 19px;
}
.line-height-22{
  line-height: 22px;
}
.line-height-38{
  line-height: 38px;
}
.line-height-40{
  line-height: 40px;
}
.line-height-44{
  line-height: 44px;
}
.bd-1{
  border: 1px solid #FA625F;
}

.button,
.button svg,
.button svg path {
  transition: all 0.2s linear;
}
.button:hover {
  background: #444;
  border-color: transparent;
  color: #fff;
}
.button {
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
  margin: 16px 0;
  outline: none;
  padding: 10px 16px 6px;
  pointer-events: all;
  position: relative;
  text-align: center;
  transition: box-shadow 0.3s;
  white-space: nowrap;
  width: auto;
  z-index: 2;
}
[type="button"],
[type="reset"],
[type="submit"],
button {
  -webkit-appearance: button;
}
.button--slim-ghost-white {
  background: #fff;
  border-color: #fff;
  color: #444;
}
.solar-partners__title {
  color: #fff;
  font-size: 22px;
  font-weight: 400;
  letter-spacing: -0.44px;
  line-height: 1.27;
  margin: 0 auto 1.1rem;
  max-width: 74.8792vw;
  text-align: left;
}


.NewsroomContentFeatured__Date {
  color: #555;
  font-size: 32px;
  letter-spacing: -0.56px;
  line-height: 42px;
  transition: all 0.2s linear;
}
.padding-15{
  padding: 15px;
}

.padding-left-4{
  padding-left:4px;
}
.padding-left-7{
  padding-left:7px;
}
.padding-left-10{
  padding-left:10px;
}
.padding-left-14{
  padding-left:14px;
}
.padding-left-36{
  padding-left:36px;
}
.padding-right-4{
  padding-right:4px;
}
.padding-right-7{
  padding-right:7px;
}
.padding-right-10{
  padding-right:10px;
}
.padding-right-14{
  padding-right:14px;
}
.padding-right-36{
  padding-right:36px;
}






.bold{
  font-weight: bold;
}
.margin-auto{
  margin: auto;
}
.margin-top-4{
  margin-top: 4px;
}
.margin-top-6{
  margin-top: 6px;
}
.margin-top-7{
  margin-top: 7px;
}
.margin-top-8{
  margin-top: 8px;
}
.margin-top-9{
  margin-top: 9px;
}
.margin-top-10{
  margin-top: 10px;
}
.margin-top-14{
  margin-top: 14px;
}
.margin-top-15{
  margin-top: 15px;
}
.margin-top-20{
  margin-top: 20px;
}
.margin-top-23{
  margin-top: 23px;
}
.margin-top-25{
  margin-top: 25px;
}
.margin-top-26{
  margin-top: 26px;
}
.margin-top-30{
  margin-top: 30px;
}
.margin-bottom-10{
  margin-bottom: 10px;
}
.margin-bottom-14{
  margin-bottom: 14px;
}
.margin-bottom-15{
   margin-bottom: 15px;
}
.margin-bottom-18{
   margin-bottom: 18px;
}
.margin-left-4{
  margin-left:4px
}
.margin-left-6{
  margin-left:6px
}
.margin-left-10{
  margin-left:10px
}
.margin-left-14{
  margin-left:14px
}
.margin-left-20{
  margin-left:20px
}
.margin-left-26{
  margin-left:26px
}
.margin-left-23{
  margin-left:23px
}
.margin-left-32{
  margin-left:32px
}
.margin-right-10{
  margin-right:10px
}
.margin-right-12{
  margin-right:12px
}
.margin-right-14{
  margin-right:14px
}
.margin-right-23{
  margin-right:26px
}
.margin-right-26{
  margin-right:26px
}
.margin-right-30{
  margin-right:30px
}
.margin-right-32{
  margin-right:32px
}
.margin-right-40{
  margin-right:40px
}
.icon-10{
  width: 10px;
  height: 10px;
}
.icon-11{
  width: 11px;
  height: 11px;
}
.icon-13{
  width: 13px;
  height: 13px;
}
.icon-15{
  width: 15px;
  height: 15px;
}
.icon-17{
  width: 17px;
  height: 17px;
}
.icon-19{
  width: 19px;
  height: 19px;
}
.icon-21{
  width: 21px;
  height: 21px;
}
.icon-23{
  width: 23px;
  height: 23px;
}
.icon-26{
  width: 26px;
  height: 26px;
}
.icon-28{
  width: 28px;
  height: 28px;
}
.icon-35{
  width: 35px;
  height: 35px;
}
.icon-42{
  width: 42px;
  height: 42px;
}
.icon-78{
  width: 78px;
  height: 78px;
}
.icon-84{
  width: 84px;
  height: 84px;
}
.icon-190{
  width: 190px;
  height: 190px;
}
.displat-block{
  display: block;
}
/* .{
  overflow: scroll;
  overflow: hidden;
} */
.position-bottom{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
input {
  /* text-align: right; */
  outline: none;
  border: none;
  width: 100%;
}

</style>
