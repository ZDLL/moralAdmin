import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index'
import ElementUI from "element-ui"
import './comm/directive.js'

import "element-ui/lib/theme-chalk/index.css"
import myFilter from './comm/comfilter'
import MyReg from './comm/regulars'
import dataTrip from './components/dataTrip.vue'

Object.keys(myFilter).forEach(key => {
  Vue.filter(key, myFilter[key])
})
Vue.use(ElementUI)
// Vue.use(noDataComp)
Vue.component("dataTrip", dataTrip)
Vue.config.productionTip = false
Vue.prototype.$reg= MyReg;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
