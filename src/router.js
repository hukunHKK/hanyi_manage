import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/Home.vue'
import Login from './views/login/login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      redirect:'/dataBank/mountings'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/About.vue')
    },
    {
      path:'/dataBank',
      name:'dataBank',
      component: Home,
      children:[
        {
          path: '/dataBank/mountings',
          name: 'mountings',
          meta:{
            name:'配件表'
          },
          component: () => import('./views/dataBank/mountings.vue')
        },
        {
          path: '/dataBank/client',
          name: 'client',
          meta:{
            name:'客户表'
          },
          component: () => import('./views/dataBank/client.vue')
        },
      ]
    },
    {
      path:'/systemManage',
      name:'systemManage',
      component: Home,
      children:[
        {
          path: '/systemManage/accountManage',
          name: 'accountManage',
          meta:{
            name:'账户管理'
          },
          component: () => import('./views/systemManage/accountManage.vue')
        },
      ]
    },
    {
      path:'/develop',
      name:'develop',
      component: Home,
      children:[
        {
          path: '/develop/mountings',
          name: 'mountings',
          meta:{
            name:'配件建档'
          },
          component: () => import('./views/develop/mountings.vue')
        },
        {
          path: '/develop/product',
          name: 'product',
          meta:{
            name:'产品建档'
          },
          component: () => import('./views/develop/product.vue')
        },
      ]
    }
  ]
})
