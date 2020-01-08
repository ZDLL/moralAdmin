import Vue from 'vue'
import Vuex from 'vuex'
import LoginModule from './loginModule/loginModule.js';
import SystemModule from './systemCenter/systemModule.js';
import DataModule from './dataCenter/dataModule';
import TargetModule from './dataCenter_target/dataCenter_target.js';
import ActModule from './accountModule/accountModule.js'
import insideTarget from './insideTarget/insideTarget'


Vue.use(Vuex)
export default new Vuex.Store({
  modules:{
    LoginModule,
    SystemModule,
    DataModule,
    TargetModule,
    ActModule,
    insideTarget
  }
})

