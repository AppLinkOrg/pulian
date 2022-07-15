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
import Myinfomation from '../views/Myinfomation.vue'
import Mycollection from '../views/Mycollection.vue'
import Partnership from '../views/Partnership.vue'
import Aboutus from '../views/Aboutus.vue'
import Feedback from '../views/Feedback.vue'
import Ceshi from '../views/Ceshi.vue'
import Ordersucess from '../views/Ordersucess.vue'
import Genneralevalut from '../views/Genneralevalut.vue'
import Myorderdetail from '../views/Myorderdetail.vue'
import City from '../views/City.vue'
import Landpage from '../views/Landpage.vue'
import Land from '../views/Land.vue'
import Infodetails from '../views/Infodetails.vue'
import Carwash from '../views/Carwash.vue'
import Personalcenter from '../views/Personalcenter.vue'
import Carwashorder from '../views/Carwashorder.vue'
import Carwashcard from '../views/Carwashcard.vue'
import Selectcarwashpackage from '../views/Selectcarwashpackage.vue'
import Placedetails from '../views/Placedetails.vue'
import Carwashcourse from '../views/Carwashcourse.vue'
import Helpinfo from '../views/Helpinfo.vue'
import Deductionbond from '../views/Deductionbond.vue'
import Purchasedpackage from '../views/Purchasedpackage.vue'
import Carwashpaysuccess from '../views/Carwashpaysuccess.vue'
import Carwashtcpaysucces from '../views/Carwashtcpaysucces.vue' 
import Carwashdetails from '../views/Carwashdetails.vue'
import Fault from '../views/Fault.vue'
import Mypoints from '../views/Mypoints.vue'
import Carwashplace from '../views/Carwashplace.vue'

const routes = [{
  path: '/home',
  name: 'Home',
  component: Home,
  children: [{
    path: '/integral',
    name: 'Integral',
    component: Integral,
    meta: {
      'name2': '积分商城'
    }
  }, {
    path: '/',
    name: 'Firsthome',
    component: Firsthome,
    meta: {
      'name2': '车服中心'
    }
  }, {
    path: '/carwash',
    name: 'Carwash',
    component: Carwash,
    meta: {
      'name2': '自助洗车'
    }
  }, {
    path: '/myselef',
    name: 'Myselef',
    component: Myselef,
    meta: {
      'name2': '个人中心'
    }
  }]
}, {
  path: '/storedetail',
  name: 'Storedetail',
  component: Storedetail,
  meta: {
    'name': '门店详情',
    'name2': '商家服务介绍'

  }
  
}, {
  path: '/storelist',
  name: 'Storelist',
  component: Storelist,
  meta: {
    'name': '门店详情',
    'name2': '商家服务介绍'

  }
  
}, {
  path: '/xzservice',
  name: 'Xzservice',
  component: Xzservice
}, {
  path: '/submitorder',
  name: 'Submitorder',
  component: Submitorder,
  meta: {
    'name': '订单信息',
    'name2': '提交订单',
  }

}, {
  path: '/paysuccess',
  name: 'Paysuccess',
  component: Paysuccess,
     // 'name': '支付成功',
  meta: {
 
    'name2': '支付成功',
  }
}, {
  path: '/orderdetail',
  name: 'Orderdetail',
  component: Orderdetail,
  meta: {
    'name': '二维码核销',
    'name2': '订单详情',
  }
}, {
  path: '/myorder',
  name: 'Myorder',
  component: Myorder,
  meta: {
    'name': '订单',
    'name2': '我的订单',
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
  component: Garage,
  meta:{
    'name':'车辆信息',
    'name2':'我的车库',
  }
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
  component: Editvegicle,
  meta:{
    'name':'爱车入会',
    'name2':'添加车辆',
  }
}, {
  path: '/addmycar',
  name: 'AddMyCar',
  component: AddMyCar
}, {
  path: '/choosebrand',
  name: 'ChooseBrand',
  component: ChooseBrand,
  meta:{
    'name2':'品牌选择',
  }

}, {
  path: '/choosemodel',
  name: 'ChooseModel',
  component: ChooseModel,
  meta:{
    'name2':'品牌选择',
  }
}, {
  path: '/chooseseries',
  name: 'ChooseSeries',
  component: ChooseSeries,
  meta:{
    'name2':'品牌选择',
  }
}, {
  path: '/couponsdetail',
  name: 'Couponsdetail',
  component: Couponsdetail
}, {
  path: '/materialdetail',
  name: 'Materialdetail',
  component: Materialdetail,
  meta:{
    'name':'商品详情',
    'name2':'积分兑换'
  }
}, {
  path: '/submitintegral',
  name: 'Submitintegral',
  component: Submitintegral,
  meta:{
    'name':'提交订单',
    'name2':'提交订单'
  }

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
  component: Exchangerecord,
  meta:{
    'name':'订单状态',
    'name2':'我的积分订单',
  }
}, {
  path: '/integralorder',
  name: 'Integralorder',
  component: Integralorder,
  meta:{
    'name':'状态跟踪',
    'name2':'订单详情',
  }
}, {
  path: '/aftersale',
  name: 'Aftersale',
  component: Aftersale
}, {
  path: '/interevalute',
  name: 'Interevalute',
  component: Interevalute,
  meta: {
    'name': '发布评价'
  }
}, {
  path: '/integraldetail',
  name: 'Integraldetail',
  component: Integraldetail,
  meta: {
    'name': '收支明细',
    'name2': '积分列表'
  }
}, {
  path: '/recharge',
  name: 'Recharge',
  component: Recharge,
  meta: {
    'name': '积分充值',
    'name2': '积分充值',
  }
}, {
  path: '/storesx',
  name: 'Storesx',
  component: Storesx,
  meta: {
    'name': '更所选择',
    'name2': '卡券使用门店',
  }
}, {
  path: '/physicalsupply',
  name: 'Physicalsupply',
  component: Physicalsupply,
  meta: {
    'name': '实物补给'
  }
}, {
  path: '/vouchercenter',
  name: 'Vouchercenter',
  component: Vouchercenter,
  meta: {
    'name': '有券更优惠',
    'name2': '领券中心'
  }
}, {
  path: '/couponbag',
  name: 'Couponbag',
  component: Couponbag,
  meta: {
    'name': '优惠给力',
    'name2': '卡券详情',
  }
}, {
  path: '/myvoucher',
  name: 'Myvoucher',
  component: Myvoucher,
  meta: {
    'name': '优惠多多',
    'name2': '我的卡券包',
  }
},{
  path: '/myinfomation',
  name: 'Myinfomation',
  component: Myinfomation,
  meta: {
    'name': '我的资料'
  }
},{
  path: '/mycollection',
  name: 'Mycollection',
  component: Mycollection,
  meta: {
    'name': '门店列表',
    'name2': '我的收藏',
  }
},{
    path: '/partnership',
    name: 'Partnership',
    component: Partnership,
    meta: {
      'name': '合伙加盟'
    }
},{
  path: '/aboutus',
  name: 'Aboutus',
  component: Aboutus,
  meta: {
    'name': '关于我们'
  }
},{
  path: '/feedback',
  name: 'Feedback',
  component: Feedback,
  meta: {
    'name': '意见反馈'
  }
},{
  path: '/ceshi',
  name: 'Ceshi',
  component: Ceshi,
  meta: {
    'name': '测试'
  }
},{
  path: '/ordersucess',
  name: 'Ordersucess',
  component: Ordersucess,
  // meta: {
  //   'name': '支付成功'
  // }
},{
  path: '/genneralevalut',
  name: 'Genneralevalut',
  component: Genneralevalut,
  meta: {
    'name': '评价管理'
  }
},{
  path: '/myorderdetail',
  name: 'Myorderdetail',
  component: Myorderdetail,
  meta: {
    'name': '订单详情',
    'name2': '我的订单',
  }
},{
  path: '/city',
  name: 'City',
  component: City,
  meta: {
    'name': '城市'
  }
},{
  path: '/landpage',
  name: 'Landpage',
  component: Landpage,
  
},{
  path: '/infodetails',
  name: 'Infodetails',
  component: Infodetails, 
  meta: {
    'name': '资讯详情'
  }
},{
  path: '/personalcenter',
  name: 'Personalcenter',
  component: Personalcenter, 
  meta: {
    'name': '信息中心',
    'name2': '自助洗车'
  }
},{
  path: '/carwashorder',
  name: 'Carwashorder',
  component: Carwashorder, 
  meta: {
    'name': '洗车订单'
  }
},{
  path: '/carwashcard',
  name: 'Carwashcard',
  component: Carwashcard, 
  meta: {
    'name': '购买洗车卡'
  }
},{
  path: '/selectcarwashpackage',
  name: 'Selectcarwashpackage',
  component: Selectcarwashpackage, 
  meta: {
    'name': '选择洗车套餐'
  }
},{
  path: '/placedetails',
  name: 'Placedetails',
  component: Placedetails, 
  meta: {
    'name': '站点详情'
  }
},{
  path: '/carwashcourse',
  name: 'Carwashcourse',
  component: Carwashcourse, 
  meta: {
    'name': '洗车教程'
  }
},{
  path: '/helpinfo',
  name: 'Helpinfo',
  component:Helpinfo, 
  meta: {
    'name': '帮助信息'
  }
},{
  path: '/deductionbond',
  name: 'Deductionbond',
  component:Deductionbond, 
  meta: {
    'name': '我的优惠券'
  }
},{
  path: '/purchasedpackage',
  name: 'Purchasedpackage',
  component:Purchasedpackage, 
  meta: {
    'name': '已购套餐'
  }
},{
  path: '/carwashpaysuccess',
  name: 'Carwashpaysuccess',
  component:Carwashpaysuccess, 
  meta: {
    'name': '支付成功'
  }
},{
  path: '/carwashtcpaysucces',
  name: 'Carwashtcpaysucces',
  component:Carwashtcpaysucces, 
  meta: {
    'name': '支付成功'
  }
},{
  path: '/carwashdetails',
  name: 'Carwashdetails',
  component:Carwashdetails, 
  meta: {
    'name': '订单详情'
  }
},{
  path: '/fault',
  name: 'Fault',
  component:Fault, 
  meta: {
    'name': '故障反馈'
  }
},
{
  path: '/mypoints',
  name: 'Mypoints',
  component:Mypoints, 
  meta: {
    'name': '我的积分'
  }
},
{
  path: '/carwashplace',
  name: 'Carwashplace',
  component:Carwashplace, 
  meta: {
    'name': '站点列表'
    
  }
},{
  path: '/land',
  name: 'Land',
  component:Land, 
  meta: {
    'name': '落地页'
    
  }
},


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router