import * as types from './type'
import apiUrl from './api'
import {sendRequest} from '@/request/axios';

const state ={
    [types.GET_INSIDE_SELECT]:{},
    [types.ADD_INSIDE]:{},
    [types.GET_INSIDE_LIST]:{},
    [types.CHANGE_INSIDE_STATU]:{},
    [types.GET_INSIDE_INFO]:{},
    [types.GET_OUT_TARGET]:{},
    [types.ADD_MAP_TARGET]:{},
    [types.GET_MAP_LIST]:{},
    [types.CHANGE_MAP_STATUS]:{},
}
const getter = {

}
const actions = {
    async [types.GET_INSIDE_SELECT](e,senddata){
        e.commit(types.GET_INSIDE_SELECT,await sendRequest(apiUrl.getQuotaConfig,senddata,'post'))
    },
    async [types.ADD_INSIDE](e,senddata){
        e.commit(types.ADD_INSIDE,await sendRequest(apiUrl.editQuotaInfo,senddata,'post'))
    },
    async [types.GET_INSIDE_LIST](e,senddata){
        e.commit(types.GET_INSIDE_LIST,await sendRequest(apiUrl.getQuotaList,senddata,'post'))
    },
    async [types.CHANGE_INSIDE_STATU](e,senddata){
        e.commit(types.CHANGE_INSIDE_STATU,await sendRequest(apiUrl.changeStatus,senddata,'post'))
    },
    async [types.GET_INSIDE_INFO](e,senddata){
        e.commit(types.GET_INSIDE_INFO,await sendRequest(apiUrl.getQuotaInfo,senddata,'post'))
    },
    async [types.GET_OUT_TARGET](e,senddata){
        e.commit(types.GET_OUT_TARGET,await sendRequest(apiUrl.getOutTargetList,senddata,'post'))
    },
    async [types.ADD_MAP_TARGET](e,senddata){
        e.commit(types.ADD_MAP_TARGET,await sendRequest(apiUrl.editMappingTarget,senddata,'post'))
    },
    async [types.GET_MAP_LIST](e,senddata){
        e.commit(types.GET_MAP_LIST,await sendRequest(apiUrl.getMappingList,senddata,'post'))
    },
    async [types.CHANGE_MAP_STATUS](e,senddata){
        e.commit(types.CHANGE_MAP_STATUS,await sendRequest(apiUrl.changeMappingStatus,senddata,'post'))
    },
}
const mutations = {
    [types.GET_INSIDE_SELECT](state,data){
        state[types.GET_INSIDE_SELECT] = data.data;
    },
    [types.ADD_INSIDE](state,data){
        state[types.ADD_INSIDE] = data.data;
    },
    [types.GET_INSIDE_LIST](state,data){
        state[types.GET_INSIDE_LIST] = data.data;
    },
    [types.CHANGE_INSIDE_STATU](state,data){
        state[types.CHANGE_INSIDE_STATU] = data.data;
    },
    [types.GET_INSIDE_INFO](state,data){
        state[types.GET_INSIDE_INFO] = data.data;
    },
    [types.GET_OUT_TARGET](state,data){
        state[types.GET_OUT_TARGET] = data.data;
    },
    [types.ADD_MAP_TARGET](state,data){
        state[types.ADD_MAP_TARGET] = data.data;
    },
    [types.GET_MAP_LIST](state,data){
        state[types.GET_MAP_LIST] = data.data;
    },
    [types.CHANGE_MAP_STATUS](state,data){
        state[types.CHANGE_MAP_STATUS] = data.data;
    },
}
export default {
    namespaced: true, //解决不同模块命名冲突的问题,需要加上所属的模块名
    state,
    getter,
    actions,
    mutations
}