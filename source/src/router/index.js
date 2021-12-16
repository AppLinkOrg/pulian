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
import Addgarage from '../views/Addgarage.vue'
import Brand from '../views/Brand.vue'
import Editvegicle from '../views/Editvegicle.vue'
import Recharge from '../views/Recharge.vue'
import Integraldetail from '../views/Integraldetail.vue'

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
}, {
  path: '/addgarage',
  name: 'Addgarage',
  component: Addgarage
}, {
  path: '/brand',
  name: 'Brand',
  component: Brand
}, {
  path: '/editvegicle',
  name: 'Editvegicle',
  component: Editvegicle
}, {
  path: '/recharge',
  name: 'Recharge',
  component: Recharge
}, {
  path: '/integraldetail',
  name: 'Integraldetail',
  component: Integraldetail
}


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router