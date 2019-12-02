import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/login"//根目录直接重定向到登录页面
  },{
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */"../views/login.vue")
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/index.vue'),
    children:[{
      path: '/code',
      name: 'code',
      component: () => import(/* webpackChunkName: "home" */ '../views/home/stysemCenter/code.vue')
    }]
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
