import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Management from '../views/Management.vue'
import Password from '../views/Password.vue'
import Storeinfo from '../views/Storeinfo.vue'
import About from '../views/About.vue'
import Service from '../views/Service.vue'
import Order from '../views/Order.vue'
import Writeoff from '../views/Writeoff.vue'
import Orderdetail from '../views/Orderdetail.vue'
import Content from '../views/Content.vue'
import Genneralevalut from '../views/Genneralevalut.vue'

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
},{
  path: '/login',
  name: 'Login',
  component: Login,
},{
  path: '/management',
  name: 'Management',
  component: Management,
  meta:{
    'name':'账号管理'
  }
},{
  path: '/password',
  name: 'Password',
  component: Password,
  meta:{
    'name':'修改密码'
  }
},{
  path: '/storeinfo',
  name: 'Storeinfo',
  component: Storeinfo,
  meta:{
    'name':'门店信息'
  }
},{
  path: '/about',
  name: 'About',
  component: About,
  meta:{
    'name':'关于我们'
  }
},{
  path: '/service',
  name: 'Service',
  component: Service,
  meta:{
    'name':'服务信息'
  }
},{
  path: '/order',
  name: 'Order',
  component: Order,
  meta:{
    'name':'订单管理'
  }
},{
  path: '/writeoff',
  name: 'Writeoff',
  component: Writeoff,
  meta:{
    'name':'服务核销'
  }
},{
  path: '/orderdetail',
  name: 'Orderdetail',
  component: Orderdetail,
  meta:{
    'name':'订单详情'
  }
},{
  path: '/content',
  name: 'Content',
  component: Content,
  meta:{
    'name':'内容'
  }
},{
  path: '/genneralevalut',
  name: 'Genneralevalut',
  component: Genneralevalut,
  meta:{
    'name':'评价管理'
  }
}


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router