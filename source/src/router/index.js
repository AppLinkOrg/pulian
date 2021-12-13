import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

import Home from '../views/Home.vue'
import Integral from '../views/Integral.vue'
import Firsthome from '../views/Firsthome.vue'
import Storedetail from '../views/Storedetail.vue'
import Xzservice from '../views/Xzservice.vue'
import Submitorder from '../views/Submitorder.vue'
import Paysuccess from '../views/Paysuccess.vue'
import Orderdetail from '../views/Orderdetail.vue'

const routes = [{
    path: '/home',
    name: 'Home',
    component: Home,
    children:[{
        path: '/integral',
      name: 'Integral',
      component: Integral
      },{
        path: '/',
      name: 'Firsthome',
      component: Firsthome
      }]
},{
  path: '/storedetail',
  name: 'Storedetail',
  component: Storedetail
},{
  path: '/xzservice',
  name: 'Xzservice',
  component: Xzservice
},{
  path: '/submitorder',
  name: 'Submitorder',
  component: Submitorder
},{
  path: '/paysuccess',
  name: 'Paysuccess',
  component: Paysuccess
},{
  path: '/orderdetail',
  name: 'Orderdetail',
  component: Orderdetail
}



]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router