import apiUrl from './api.js'
import * as types from './type.js';
import {sendRequest} from '@/request/axios.js'
const state={
    [types.POST_ACT_LIST]:{},
    [types.POST_ACT_UPDATALE]:{},
    [types.POST_ACT_LOG_LIST]:{},
    [types.GET_ACT_DETAIL]:{},
    [types.POST_ACT_RES_PWD]:{},
    [types.POST_ACT_SETPWD]:{}
    
}

const getters={

}
const actions ={//异步
    async [types.POST_ACT_LIST](cxt,postData){
        cxt.commit(types.POST_ACT_LIST,await sendRequest(apiUrl.actList,postData,'post'))
    },
    async [types.POST_ACT_UPDATALE](cxt,postData){
        cxt.commit(types.POST_ACT_UPDATALE,await sendRequest(apiUrl.actUpdata,postData,'post'))
    },
    async [types.POST_ACT_LOG_LIST](cxt,postData){
        cxt.commit(types.POST_ACT_LOG_LIST,await sendRequest(apiUrl.actLogList,postData,'post'))
    },
    async [types.GET_ACT_DETAIL](cxt,postData){
        cxt.commit(types.GET_ACT_DETAIL,await sendRequest(apiUrl.actDetail+"/"+postData.accountNo,{},'get'))
    },
    async [types.POST_ACT_RES_PWD](cxt,postData){
        cxt.commit(types.POST_ACT_RES_PWD,await sendRequest(apiUrl.actResPwd,postData,'post'))
    },
    async [types.POST_ACT_SETPWD](cxt,postData){
        cxt.commit(types.POST_ACT_SETPWD,await sendRequest(apiUrl.setPwd,postData,'post'))
    },
    
}
const mutations ={//同步
    [types.POST_ACT_LIST](state,data){
        state[types.POST_ACT_LIST]= data.data
    },
    [types.POST_ACT_UPDATALE](state,data){
        state[types.POST_ACT_UPDATALE]= data.data
    },
    [types.POST_ACT_LOG_LIST](state,data){
        state[types.POST_ACT_LOG_LIST]= data.data
    },
    [types.GET_ACT_DETAIL](state,data){
        state[types.GET_ACT_DETAIL]= data.data
    },
    [types.POST_ACT_RES_PWD](state,data){
        state[types.POST_ACT_RES_PWD]= data.data
    },
    [types.POST_ACT_SETPWD](state,data){
        state[types.POST_ACT_SETPWD]= data.data
    },
   
    
}

export default {
    namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
    state,
    getters,
    actions,
    mutations
}