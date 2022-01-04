
<script setup>
import { NButton, NIcon, NModal, NCard, NPopover } from "naive-ui";
import { Menu as MenuIcon } from "@vicons/ionicons5";

import { PageHelper } from "../PageHelper";
import { ref } from "vue";
import { HttpHelper } from "../HttpHelper";
let page = ref({});
let showMenu = ref(false);
let data = ref({});
let isactive = ref(false);
let aa = ref(0);
let list = ref([]);
PageHelper.Init(page, () => {});
HttpHelper.Post("inst/textlist", {}).then((ret) => {
  list.value = ret;
});
var handleSelect = () => {};
var changeheader = (path, mark, a) => {
  HttpHelper.Post("inst/secondpage", { mark: mark }).then((ret) => {
    data.value = ret;
  });
};
</script>
<template>
  <div>
    <nav
      class="navigation"
      v-if="page.Res != null && page.Inst != null && page.Text != null"
    >
      <div class="flex-row">
        <div class="flex-1"></div>
        <div class="mobilemainnav">
          <div class="flex-row flex-center mobilemenubar">
            <div>
              <n-button text style="font-size: 30px" @click="showMenu = true">
                <n-icon>
                  <menu-icon />
                </n-icon>
              </n-button>
            </div>
            <div class="flex-1 center navigation__logo">
              <img :src="page.uploadpath + 'inst/' + page.Inst.logo" />
            </div>
            <div>
              <n-button text style="font-size: 30px; color: white">
                <n-icon>
                  <menu-icon />
                </n-icon>
              </n-button>
            </div>
          </div>
        </div>
        <div class="mainnav">
          <div class="flex-row flex-center">
            <div class="logo">
              <router-link to="/">
                <img :src="page.uploadpath + 'inst/' + page.Inst.logo" />
              </router-link>
            </div>
            <div class="">
              <n-popover
                trigger="hover"
                placement="bottom"
                raw
                :show-arrow="true"
                style="--box-shadow: none !important"
              >
                <template #trigger>
                  <router-link
                    class="navlink"
                    to=""
                    @mouseenter="changeheader('/partners', 'forpartnters')"
                  >
                    <span>{{ page.Text.forpartnters }}</span>
                  </router-link>
                </template>
                <div class="navigation__submenu navigation__submenu--active">
                  <div class="navigation__submenu--body">
                    <ul
                      class="
                        navigation__submenu_item
                        navigation__submenu_item--grid
                        navigation__submenu_item--active
                      "
                    >
                      <li
                        class="navigation__submenu_item--grid--column"
                        v-for="item of data"
                        :key="item"
                      >
                        <a
                          class="navigation__link navigation__link--about"
                          :href="'#' + item.url"
                          ><span>{{ item.name }}</span></a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </n-popover>
            </div>
            <div>
              <n-popover
                trigger="hover"
                placement="bottom"
                raw
                :show-arrow="true"
                style="--box-shadow: none !important"
              >
                <template #trigger>
                  <router-link
                    class="navlink"
                    to=""
                    @mouseenter="changeheader('/homeowners', 'forhomeowners')"
                  >
                    <span>{{ page.Text.forhomeowners }}</span>
                  </router-link>
                </template>
                <div class="navigation__submenu navigation__submenu--active">
                  <div class="navigation__submenu--body">
                    <ul
                      class="
                        navigation__submenu_item
                        navigation__submenu_item--grid
                        navigation__submenu_item--active
                      "
                    >
                      <li
                        class="navigation__submenu_item--grid--column"
                        v-for="item of data"
                        :key="item"
                      >
                        <a
                          class="navigation__link navigation__link--about"
                          :href="'#' + item.url"
                          ><span>{{ item.name }}</span></a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </n-popover>
            </div>
            <div>
              <n-popover
                trigger="hover"
                placement="bottom"
                raw
                :show-arrow="true"
                style="--box-shadow: none !important"
              >
                <template #trigger>
                  <router-link
                    class="navlink"
                    to=""
                    @mouseenter="changeheader('/brandintroduction', 'company')"
                  >
                    <span>{{ page.Text.company }}</span>
                  </router-link>
                </template>
                <div class="navigation__submenu navigation__submenu--active">
                  <div class="navigation__submenu--body">
                    <ul
                      class="
                        navigation__submenu_item
                        navigation__submenu_item--grid
                        navigation__submenu_item--active
                      "
                    >
                      <li
                        class="navigation__submenu_item--grid--column"
                        v-for="item of data"
                        :key="item"
                      >
                        <a
                          class="navigation__link navigation__link--about"
                          :href="'#' + item.url"
                          ><span>{{ item.name }}</span></a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </n-popover>
            </div>
            <div>
              <n-popover
                trigger="hover"
                placement="bottom"
                raw
                :show-arrow="true"
                style="--box-shadow: none !important"
              >
                <template #trigger>
                  <router-link
                    class="navlink"
                    to=""
                    @mouseenter="changeheader('/aboutus', 'contactus')"
                  >
                    <span>{{ page.Text.contactus }}</span>
                  </router-link>
                </template>
                <div class="navigation__submenu navigation__submenu--active">
                  <div class="navigation__submenu--body">
                    <ul
                      class="
                        navigation__submenu_item
                        navigation__submenu_item--grid
                        navigation__submenu_item--active
                      "
                    >
                      <li
                        class="navigation__submenu_item--grid--column"
                        v-for="item of data"
                        :key="item"
                      >
                        <a
                          class="navigation__link navigation__link--about"
                          :href="'#' + item.url"
                          ><span>{{ item.name }}</span></a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </n-popover>
            </div>
            <div class="flex-1 menuitem"></div>
            <!-- <div>
            <router-link class="navlink" to="/partnercenter">
              <span>{{ page.Text.partnercenter }}</span>
            </router-link>
          </div>
          <div>+-
            <router-link class="navlink" to="/myaccount">
              <span>{{ page.Text.myaccount }}</span>
            </router-link>
          </div> -->
          </div>
          <!-- 536.594 -->
        </div>
        <div class="flex-1"></div>
      </div>
    </nav>

    <!-- <n-modal v-model:show="showMenu">
      <n-card style="width: 600px" :bordered="false" size="huge">
        <div class="mobilemenubody">
          <div class="mobilenavlink">
            <div class="navigation-mobile__menu">
              <ul class="navigation-mobile__menu_top">
                <li v-for="item of list" :key="item">
                  <a href="" class="navigation-mobile__link">{{
                    item.content
                  }}</a>
                  <ul class="navigation-mobile__submenu">
                    <li v-for="child of item.secondpage" :key="child">
                      <a
                        class="
                          navigation-mobile__link navigation-mobile__link--about
                        "
                        :href="'#' + child.url"
                        @click="showMenu = false"
                        >{{ child.name }}</a
                      >
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </n-card>
    </n-modal> -->

    <div class="navigation-mobile " :class="showMenu==true?'navigation-mobile--open':'navigation-mobile--closed'">
      <div
        class="navigation-mobile__overlay"
        role="presentation"
        aria-label="Close mobile menu"
      ></div>
      <div class="navigation-mobile__wrapper">
        <div class="navigation-mobile__container">
          <button
            class="navigation-mobile__close"
            type="button"
            aria-label="Close mobile menu"
            @click="showMenu=false;"
          >
            <img
              src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI4IiB2aWV3Qm94PSIwIDAgMjggMjgiIHdpZHRoPSIyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNCIgY3k9IjE0IiBmaWxsPSIjZDlkNWQ1IiByPSIxNCIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzcwNzA3MCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjMiPjxwYXRoIGQ9Im0wIDBoMTciIHRyYW5zZm9ybT0ibWF0cml4KC43MDcxMDY3OCAuNzA3MTA2NzggLS43MDcxMDY3OCAuNzA3MTA2NzggOC4wMTA2NzUgOC4wMTA4ODcpIi8+PHBhdGggZD0ibTAgMGgxNyIgdHJhbnNmb3JtPSJtYXRyaXgoLS43MDcxMDY3OCAuNzA3MTA2NzggLS43MDcxMDY3OCAtLjcwNzEwNjc4IDIwLjAzMTQ5IDguMDEwODg3KSIvPjwvZz48L3N2Zz4="
              alt="Close"
            />
          </button>
          <div class="navigation-mobile__menu">
            <ul class="navigation-mobile__menu_top">
               <li v-for="item of list" :key="item">
                  <a href="" class="navigation-mobile__link">{{
                    item.content
                  }}</a>
                  <ul class="navigation-mobile__submenu">
                    <li v-for="child of item.secondpage" :key="child">
                      <a
                        class="
                          navigation-mobile__link navigation-mobile__link--about
                        "
                        :href="'#' + child.url"
                        @click="showMenu = false"
                        >{{ child.name }}</a
                      >
                    </li>
                  </ul>
               </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@media (max-width: 1300px) {
  .mainnav {
    display: none;
  }
}
@media (min-width: 1300px) {
  .mobilemainnav {
    display: none;
  }
}
.mainnav {
  width: 1440px;
  padding: 15px 32px 15px 16px;
  position: relative;
}
.logo {
  width: 153px;
  margin-right: 40px;
  max-height: 55px;
}
.logo img {
  width: 100%;
}
.menuitem {
  height: 96px;
}
.navlink {
  padding: 28px 32px;
}
.navlink span {
  line-height: 23.4px;
  font-size: 18px;
  font-weight: 600;
  color: #555;
  padding-top: 9px;
  padding-bottom: 4px;
  border-bottom: #00000000 solid 3px;
  cursor: pointer;
}
.navlink span.active {
  border-bottom: #555 solid 3px;
}

.mobilemainnav {
  width: 100vw;
  padding-left: 16px;
  padding-right: 16px;
}
.mobilemenubar {
  min-height: 60px;
}
.mobilemenubody {
  max-height: 80vh;
}
.mobilenavlink {
  padding-bottom: 20px;
}
.mobilenavlink span {
  line-height: 1.6;
  font-size: 24px;
  font-weight: 600;
  color: #555;
}

.navigation__submenu {
  margin: 0 -2rem;
  /* max-height: 0; */
  /* opacity: 0; */
  /* overflow: hidden; */
  padding: 0 2rem 2rem;
  /* position: absolute; */
  /* top: 65%; */
  /* -webkit-transform: translateX(-20%); */
  /* transform: translateX(-20%); */
  /* transition: max-height 0.25s, opacity 0.25s;
  -webkit-transition: max-height 0.25s, opacity 0.25s; */
  z-index: 1;
}
.navigation__submenu--active {
  max-height: 100vh;
  opacity: 1;
  z-index: 999;
}
.navigation__submenu--arrow {
  background: transparent;
  border-bottom: 26px solid #fff;
  border-left: 13px solid transparent;
  border-right: 13px solid transparent;
  display: block;
  -webkit-filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.1));
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.1));
  height: 0;
  left: 50%;
  position: absolute;
  top: 10px;
  transition: left 0.15s;
  width: 0;
  z-index: 1;
}
.navigation__submenu--body {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 0 20px rgb(0 0 0 / 10%);
  display: block;
  /* margin: 0 auto 0; */
  max-width: 100%;
  padding: 0 42px 0 52px;
  position: relative;
  transition: padding 0.25s;
  -webkit-transition: padding 0.25s;
}
.navigation__submenu_item {
  display: none;
  grid-template-columns: auto;
  list-style: none;
  margin: 0;
  max-width: 250px;
  min-width: 160px;
  padding: 0;
  text-align: left;
}
.navigation__submenu_item--active.navigation__submenu_item--grid {
  display: grid;
}
.navigation__submenu_item--grid {
  grid-auto-flow: row dense;
  /* grid-template-columns: 1fr 1fr; */
  max-width: 386px;
}
.navigation__submenu_item--grid--column {
  grid-column-start: 1;
}
.GroupedMenu__Link,
.GroupedMenu__Name,
.navigation__link {
  align-items: center;
  color: #555;
  cursor: pointer;
  display: flex;
  font-size: 15px;
  font-style: bold;
  font-weight: 400;
  justify-content: center;
  line-height: 1.44;
  overflow: hidden;
  padding: 28px 8px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
}
.navigation__submenu_item .GroupedMenu__Link,
.navigation__submenu_item .GroupedMenu__Name,
.navigation__submenu_item .navigation__link {
  align-items: center;
  color: #555 !important;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  justify-content: left;
  letter-spacing: -0.4px;
  line-height: 1.4;
  padding: 0.5rem 0.2rem;
  position: relative;
  text-align: left;
}
.GroupedMenu__Link span,
.GroupedMenu__Name span,
.navigation__link span {
  border-bottom: 3px solid transparent;
  padding-bottom: 4px;
  padding-top: 9px;
  transition: all 0.2s linear;
}
@media only screen and (min-width: 64em) {
  .GroupedMenu__Link,
  .GroupedMenu__Name,
  .navigation__link {
    color: #555;
    font-size: 15px;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 1.3;
    padding: 28px 1.25vw;
    text-align: center;
    text-transform: capitalize;
  }
}
@media only screen and (hover: hover) {
  .GroupedMenu__Link,
  .GroupedMenu__Name,
  .navigation__link {
    transition: all 0.2s linear;
  }
}
.navigation__logo {
  display: none;
  
}
.navigation__logo img {
  width: 6.96rem;
}
@media only screen and (min-width: 48em) {
  .navigation__logo {
    display: block;
  }
}
.navigation-mobile {
  bottom: 0;
  box-sizing: border-box;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
  width: 100vw;
}
.navigation-mobile,
.navigation-mobile--closed {
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.navigation-mobile--closed {
  max-height: 0;
  opacity: 0.5;
  overflow: hidden;
  pointer-events: none;
}
.navigation-mobile__overlay {
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.16);
  background: linear-gradient(
    0.892turn,
    rgba(247, 179, 52, 0.65) -4.26%,
    rgba(253, 131, 0, 0.65) 48.08%,
    rgba(206, 106, 58, 0.65) 94.12%
  );
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: opacity 0.3s ease-in-out 0.3s;
  z-index: 1;
}
.navigation-mobile--closed .navigation-mobile__overlay,
.navigation-mobile--closed .navigation-mobile__wrapper {
  opacity: 0;
  transition: opacity 0s ease-in-out;
}
.navigation-mobile--open .navigation-mobile__overlay,
.navigation-mobile--open .navigation-mobile__wrapper {
  opacity: 1;
}

.navigation-mobile__wrapper {
  height: 100vh;
  transition: opacity 0.3s ease-in-out;
}
.navigation-mobile__container,
.navigation-mobile__wrapper {
  align-content: stretch;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

.navigation-mobile__container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 15px 35px 0 rgb(0 0 0 / 16%);
  flex-direction: column;
  max-height: 96vh;
  max-width: 420px;
  min-height: 84vh;
  overflow: auto;
  padding: 8vh 33px 9vh 55px;
  position: relative;
  width: 94vw;
  z-index: 5;
}
.navigation-mobile__close {
  align-items: center;
  background-color: transparent;
  border: none;
  display: flex;
  height: 48px;
  justify-content: center;
  outline: none;
  position: absolute;
  right: 10px;
  top: 10px;
  width: 48px;
  z-index: 6;
}
img {
  max-width: 100%;
  border-style: none;
}
.navigation-mobile__menu {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  overflow: auto;
  padding: 0 10px 0 0;
  width: 100%;
}
.navigation-mobile__menu_bottom,
.navigation-mobile__menu_top {
  display: flex;
  flex: 1 1;
  flex-direction: column;
  list-style-type: none;
  padding-left: 0;
}
.navigation-mobile__menu_top {
  justify-content: flex-start;
  margin-bottom: 2rem;
}
.navigation-mobile__menu_top li {
  padding: 0 0 0.75rem;
}
.navigation-mobile__link {
  color: #555;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.4px;
  line-height: 1.5;
  margin: 0;
  padding: 0 0 2vh;
  text-align: left;
  text-transform: capitalize;
}
.navigation-mobile__link:last-child {
  padding-bottom: 0;
}
.navigation-mobile__menu_top .navigation-mobile__link {
  color: #555;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.4px;
  line-height: 1.6;
  text-transform: capitalize;
}
.navigation-mobile__submenu {
  list-style-type: none;
  padding-left: 41px;
}
.navigation-mobile__menu_top li {
  padding: 0 0 0.75rem;
}
.navigation-mobile__submenu li {
  padding: 0.65rem 0 0;
}
.navigation-mobile__submenu .navigation-mobile__link {
  color: #555;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: -0.4px;
  line-height: 2;
}
</style>