import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

import Home from "../components/Home.vue"
import HelloWorld from "../components/HelloWorld.vue"
import Footer from "../components/Footer.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/helloWorld",
    name: "HelloWorld",
    component: HelloWorld,
  },
  {
    path: "/footer",
    name: "Footer",
    component: Footer,
  },
 
];

const router = new VueRouter({
  routes,
});

export default router;
