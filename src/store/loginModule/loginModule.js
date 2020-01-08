import apiUrl from './api.js'
import * as types from './type.js';
import {sendRequest} from '@/request/axios.js'
const state={
    [types.POST_LOGIN]:{},
    [types.POST_LONG_OUT]:"",
    [types.GET_USER_MENU]:{},
}

const getters={

}
const actions ={//异步
    async [types.POST_LOGIN](cxt,postData){
        cxt.commit(types.POST_LOGIN,await sendRequest(apiUrl.login,postData,'post'))
    },
    async [types.POST_LONG_OUT](cxt,postData){
        cxt.commit(types.POST_LONG_OUT,await sendRequest(apiUrl.loginOut,postData,'post'))
    },
    async [types.GET_USER_MENU](cxt,postData){
        cxt.commit(types.GET_USER_MENU,await sendRequest(apiUrl.loginWeight,postData,'get'))
    },
}
const mutations ={//同步
    [types.POST_LOGIN](state,data){
        state[types.POST_LOGIN]= data.data
    },
    [types.POST_LONG_OUT](state,data){
        state[types.POST_LONG_OUT]= data.data
    },
    [types.GET_USER_MENU](state,data){
        state[types.GET_USER_MENU]= data.data
    },
}

export default {
    namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
    state,
    getters,
    actions,
    mutations
}