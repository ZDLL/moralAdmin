import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui';
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
    redirect:"/homePage",
    children:[
      {
        path: '/homePage',
        name: 'homePage',
        component: ()=>import(/* webpackChunkName: "group-home" */'../views/home/homePage.vue')
      },
      {
      path: '/complexCode',
      name: 'complexCode',
      component: ()=>import(/* webpackChunkName: "stys" */"../views/home/stysemCenter/complexCode.vue")
    },{
      path: '/interfaceList',
      name: 'interfaceList',
      component: ()=>import(/* webpackChunkName: "interface" */"../views/home/dataCenter/initerfaceList.vue")
    },{
      path: '/setupParameter',
      name: 'setupParameter',
      component: ()=>import(/* webpackChunkName: "interface" */"../views/home/dataCenter/setupParameter.vue")
    },
    {
      path: '/insideTarget',
      name: 'insideTarget',
      component: ()=>import(/* webpackChunkName: "insideTarget" */"../views/home/insideTarget/targetList.vue")
    },
    {
      path: '/indexMap',
      name: 'indexMap',
      component: ()=>import(/* webpackChunkName: "insideTarget" */"../views/home/insideTarget/indexMap.vue")
    },
    {
      path: '/account',
      name: 'account',
      component: ()=>import(/* webpackChunkName: "cont" */"../views/home/accountCenter/accountList.vue")
    },
    {
      path: '/accountDet',
      name: 'accountDet',
      component: ()=>import(/* webpackChunkName: "cont" */"../views/home/accountCenter/accountDetail.vue")
    },
    {
      path: '/setPwd',
      name: 'setPwd',
      component: ()=>import(/* webpackChunkName: "cont" */"../views/home/accountCenter/setPwd.vue")
    },
    {
      path: '/role',
      name: 'role',
      component: ()=>import(/* webpackChunkName: "stys" */"../views/home/stysemCenter/roleList.vue")
    },
    {
      path: '/menu',
      name: 'menu',
      component: ()=>import(/* webpackChunkName: "stys" */"../views/home/stysemCenter/menu.vue")
    },
    {
      path: '/simpleCode',
      name: 'simpleCode',
      component: ()=>import(/* webpackChunkName: "stys" */"../views/home/stysemCenter/simpleCode.vue")
    },
    {
      path: '/complexCode',
      name: 'complexCode',
      component: ()=>import(/* webpackChunkName: "stys" */"../views/home/stysemCenter/complexCode.vue")
    },
    {
      path: '/parameter',
      name: 'parameter',
      component: ()=>import(/* webpackChunkName: "stys" */"../views/home/stysemCenter/parameter.vue")
    },
    {
      path: '/userMng',
      name: 'userManger',
      component: ()=>import(/* webpackChunkName: "stys" */"../views/home/stysemCenter/userList.vue")
    },
    {
      path: '/target',
      name: 'target',
      component: ()=>import(/* webpackChunkName: "target" */"../views/home/dataCenter_target/targetList.vue")
    },
    {
      path: '/ruleSet',
      name: 'ruleSet',
      component: ()=>import(/* webpackChunkName: "target" */"../views/home/dataCenter_target/ruleSet.vue")
    },
    ]
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach((to,from)=>{ //路由的钩子函数
  if(to.path !='/login'){
    const userInfo = window.localStorage.getItem("userInfo");
    if(!userInfo){
      Message.error("请登录以后在进行操作！");
      router.push({path: "/login"})
      return;
    }
  }
})
export default router
