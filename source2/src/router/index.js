import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Management from '../views/Management.vue'
import Password from '../views/Password.vue'
import Storeinfo from '../views/Storeinfo.vue'

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
}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router