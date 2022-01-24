import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
// import 'amfe-flexible';
// import './libs/rem.js';
import 'lib-flexible/flexible'


import VueWechatTitle from 'vue-wechat-title'

// import store from './store'




// router.beforeEach((to, from, next) => {
//     /* 路由发生变化修改页面title */
//     if (to.meta.name) {
//       document.title = to.meta.name

//       window.document.querySelector("title").text=to.meta.name
//       console.log('我金瓯来了');
//     }
//     console.log('我金瓯来了222');  
//     next()
//   })




createApp(App).use(router).use(Vant).use(VueWechatTitle).mount('#app')
