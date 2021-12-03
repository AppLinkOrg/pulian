import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./vuex/store";

// import Vant from 'vant';
// import 'vant/lib/index.css';
// import 'amfe-flexible'

// import { createApp } from 'vue'


// Vue.use(Vant);

// createApp(App).use(store).use(router).component('Vant', Vant).$mount('#app');






Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function (h) {
    return h(App);
  },
}).$mount("#app")




Vue.prototype.push = function push(url) {
  this.$store.state.iaBack=false;
  this.$router.push(url)
}

Vue.prototype.goback=function goback(num) {
  this.$store.state.iaBack=true;
  this.$router.go(num)
}