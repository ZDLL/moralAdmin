import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index'
import ElementUI from "element-ui"
import "./assets/fontIcon/iconfont.css"
import "element-ui/lib/theme-chalk/index.css"
import myFilter from './comm/comfilter'
import MyReg from './comm/regulars'

Object.keys(myFilter).forEach(key => {
  Vue.filter(key, myFilter[key])
})
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$reg= MyReg;
// router.afterEach((to,from)=>{ //路由的钩子函数
//   if(to.path !='/login'){
//     const userInfo = window.localStorage.getItem("userInfo");
//     if(!userInfo){
//       Message.error("请登录以后在进行操作！");
//       router.push({path: "/login"})
//     }
//   }
// })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
