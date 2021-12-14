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
import Storelist from '../views/Storelist.vue'
import Myselef from '../views/Myselef.vue'
import Myorder from '../views/Myorder.vue'
import Evaluate from '../views/Evaluate.vue'
import Refund from '../views/Refund.vue'
import Garage from '../views/Garage.vue'

const routes = [{
  path: '/home',
  name: 'Home',
  component: Home,
  children: [{
    path: '/integral',
    name: 'Integral',
    component: Integral
  }, {
    path: '/',
    name: 'Firsthome',
    component: Firsthome
  },{
    path: '/storelist',
    name: 'Storelist',
    component: Storelist
  }, {
    path: '/myselef',
    name: 'Myselef',
    component: Myselef
  }]
}, {
  path: '/storedetail',
  name: 'Storedetail',
  component: Storedetail
}, {
  path: '/xzservice',
  name: 'Xzservice',
  component: Xzservice
}, {
  path: '/submitorder',
  name: 'Submitorder',
  component: Submitorder
}, {
  path: '/paysuccess',
  name: 'Paysuccess',
  component: Paysuccess
}, {
  path: '/orderdetail',
  name: 'Orderdetail',
  component: Orderdetail
}, {
  path: '/myorder',
  name: 'Myorder',
  component: Myorder
}, {
  path: '/evaluate',
  name: 'Evaluate',
  component: Evaluate
}, {
  path: '/refund',
  name: 'Refund',
  component: Refund
}
  , {
  path: '/garage',
  name: 'Garage',
  component: Garage
}


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router