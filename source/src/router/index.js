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
import AddMyCar from '../views/AddMyCar.vue'
import ChooseBrand from '../views/ChooseBrand.vue'
import ChooseModel from '../views/ChooseModel.vue'
import ChooseSeries from '../views/ChooseSeries.vue'
import Couponsdetail from '../views/Couponsdetail.vue'
import Materialdetail from '../views/Materialdetail.vue'
import Submitintegral from '../views/Submitintegral.vue'
import Addressguan from '../views/Addressguan.vue'
import Addressadd from '../views/Addressadd.vue'
import Exchangerecord from '../views/Exchangerecord.vue'
import Integralorder from '../views/Integralorder.vue'
import Aftersale from '../views/Aftersale.vue'
import Interevalute from '../views/Interevalute.vue'
import Storesx from '../views/Storesx.vue'
import Physicalsupply from '../views/Physicalsupply.vue'
import Vouchercenter from '../views/Vouchercenter.vue'
import Couponbag from '../views/Couponbag.vue'
import Myvoucher from '../views/Myvoucher.vue'


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
  component: Storedetail,
  meta:{
    'name':'门店详情'
  }
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
  component: Myorder,
  meta:{
    'name':'订单'
  }
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
  path: '/addmycar',
  name: 'AddMyCar',
  component: AddMyCar
}, {
  path: '/choosebrand',
  name: 'ChooseBrand',
  component: ChooseBrand
}, {
  path: '/choosemodel',
  name: 'ChooseModel',
  component: ChooseModel
}, {
  path: '/chooseseries',
  name: 'ChooseSeries',
  component: ChooseSeries
}, {
  path: '/couponsdetail',
  name: 'Couponsdetail',
  component: Couponsdetail
}, {
  path: '/materialdetail',
  name: 'Materialdetail',
  component: Materialdetail
}, {
  path: '/submitintegral',
  name: 'Submitintegral',
  component: Submitintegral
}, {
  path: '/addressguan',
  name: 'Addressguan',
  component: Addressguan
}, {
  path: '/addressadd',
  name: 'Addressadd',
  component: Addressadd
}, {
  path: '/exchangerecord',
  name: 'Exchangerecord',
  component: Exchangerecord
}, {
  path: '/integralorder',
  name: 'Integralorder',
  component: Integralorder
}, {
  path: '/aftersale',
  name: 'Aftersale',
  component: Aftersale
}, {
  path: '/interevalute',
  name: 'Interevalute',
  component: Interevalute
}, {
  path: '/integraldetail',
  name: 'Integraldetail',
  component: Integraldetail
}, {
  path: '/recharge',
  name: 'Recharge',
  component: Recharge
},{
  path: '/storesx',
  name: 'Storesx',
  component: Storesx,
  meta:{
    'name':'门店列表'
  }
 }
}, {
  path: '/physicalsupply',
  name: 'Physicalsupply',
  component: Physicalsupply,
  meta:{
    'name':'实物补给'
  }
}, {
  path: '/vouchercenter',
  name: 'Vouchercenter',
  component: Vouchercenter,
  meta:{
    'name':'领券中心'
  }
}, {
  path: '/couponbag',
  name: 'Couponbag',
  component: Couponbag,
  meta:{
    'name':'券包详情'
  }
}, {
  path: '/myvoucher',
  name: 'Myvoucher',
  component: Myvoucher,
  meta:{
    'name':'卡券'
  }
}

<<<<<<< .mine



=======



>>>>>>> .theirs
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router