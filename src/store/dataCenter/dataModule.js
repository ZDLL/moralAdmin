import * as types from './type'
import apiUrl from './api'
import {
    sendRequest
} from '../../request/axios.js'

const state = {
    [types.DATA_LIST]: {}, //  数据中心列表数据
    [types.CHANGE_CHANNEL_LIST]: {}, //  数据中心列表数据
    [types.ADD_INTERFACE]: {}, //  数据中心添加、编辑接口
    [types.CHANGE_STATUS]: {}, //  修改接口状态
    [types.CHANGE_INTERFACE]: {}, //  获取接口基本信息
    [types.DATA_TREE]: {}, //  获取参数列表（数状图）
    [types.DATA_TREE_SELECT]: {}, //  获取参数配置
    [types.ADD_INTER_PARA]: {}, //  添加、编辑参数
    [types.CHANGE_PRAR_STATUS]: {}, //  修改参数状态
}
const getters = {

}
const actions = {
    async [types.DATA_LIST](e, sendData) {
        // console.log(e);    
        e.commit(types.DATA_LIST, await sendRequest(apiUrl.getInfaceList, sendData, 'post'))
    },
    async [types.CHANGE_CHANNEL_LIST](e,sendData){
        e.commit(types.CHANGE_CHANNEL_LIST, await sendRequest(apiUrl.getOtherConfigList, sendData, 'post'))
    },
    async [types.ADD_INTERFACE](e,sendData){
        e.commit(types.ADD_INTERFACE, await sendRequest(apiUrl.editInfaceInfo, sendData, 'post'))
    },
    async [types.CHANGE_STATUS](e,sendData){
        e.commit(types.CHANGE_STATUS, await sendRequest(apiUrl.changeStatus, sendData, 'post'))
    },
    async [types.CHANGE_INTERFACE](e,sendData){
        e.commit(types.CHANGE_INTERFACE, await sendRequest(apiUrl.getInfaceInfo, sendData, 'post'))
    },
    async [types.DATA_TREE](e,sendData){
        e.commit(types.DATA_TREE, await sendRequest(apiUrl.getParaList, sendData, 'post'))
    },
    async [types.DATA_TREE_SELECT](e,sendData){
        e.commit(types.DATA_TREE_SELECT, await sendRequest(apiUrl.getParaConfigList, sendData, 'post'))
    },
    async [types.ADD_INTER_PARA](e,sendData){
        e.commit(types.ADD_INTER_PARA, await sendRequest(apiUrl.editParaInfo, sendData, 'post'))
    },
    async [types.CHANGE_PRAR_STATUS](e,sendData){
        e.commit(types.CHANGE_PRAR_STATUS, await sendRequest(apiUrl.changeParaStatus, sendData, 'post'))
    }
}
const mutations = {
    [types.DATA_LIST](state, data) {
        // console.log(state)    //  为state对象
        // console.log(data);    //  为actions传过来的值
        state[types.DATA_LIST] = data.data;
    },
    [types.CHANGE_CHANNEL_LIST](state,data){
        state[types.CHANGE_CHANNEL_LIST] = data.data;
    },
    [types.ADD_INTERFACE](state,data){
        state[types.ADD_INTERFACE] = data.data;
    },
    [types.CHANGE_STATUS](state,data){
        state[types.CHANGE_STATUS] = data.data;
    },
    [types.CHANGE_INTERFACE](state,data){
        state[types.CHANGE_INTERFACE] = data.data;
    },
    [types.DATA_TREE](state,data){
        state[types.DATA_TREE] = data.data;
    },
    [types.DATA_TREE_SELECT](state,data){
        state[types.DATA_TREE_SELECT] = data.data;
    },
    [types.ADD_INTER_PARA](state,data){
        state[types.ADD_INTER_PARA] = data.data;
    },
    [types.CHANGE_PRAR_STATUS](state,data){
        state[types.CHANGE_PRAR_STATUS] = data.data;
    },
}
export default {
    namespaced: true, //解决不同模块命名冲突的问题,需要加上所属的模块名
    state,
    getters,
    actions,
    mutations,
}