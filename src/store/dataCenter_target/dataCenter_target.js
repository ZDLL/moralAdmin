import reqUrl from './api';
import * as types from './type';
import {
    sendRequest
} from '../../request/axios.js';


const state = {
    [types.DATA_TARGET_LIST]: '',
    [types.DATA_TARGET_SELECT]: [],
    [types.DATA_TARGET_OPTIONS]: [],
    [types.DATA_TARGET_ADD]: {},
    [types.GET_TARGET_RULE]: {},
    [types.GET_TARGET_RULETREEINFO]: {},
    [types.GET_TARGET_RULECONFIG]: {},
    [types.ADD_TARGRT_RULE]: {},
    [types.CHANGE_TARGRT_RULE]: {},
    [types.DATA_TARGET_CHANGE_STATUS]: '',
    [types.DATA_TARGET_CHECK]: '',
    
}

const getters = {};

const actions = {
    async [types.DATA_TARGET_LIST] (cxt,data) {
        cxt.commit(types.DATA_TARGET_LIST, await sendRequest(reqUrl.getTargetList,data,'post'));
    },
    async [types.DATA_TARGET_SELECT] (cxt,data) {
        cxt.commit(types.DATA_TARGET_SELECT, await sendRequest(reqUrl.getTargetConfig,data,'post'));
    },
    async [types.DATA_TARGET_OPTIONS] (cxt,data) {
        cxt.commit(types.DATA_TARGET_OPTIONS, await sendRequest(reqUrl.getParaTreeInfo,data,'post'));
    },
    async [types.DATA_TARGET_ADD] (cxt,data) {
        cxt.commit(types.DATA_TARGET_ADD, await sendRequest(reqUrl.editTarget,data,'post'));
    },
    async [types.GET_TARGET_RULE] (cxt,data) {
        cxt.commit(types.GET_TARGET_RULE, await sendRequest(reqUrl.getRuleList,data,'post'));
    },
    async [types.GET_TARGET_RULETREEINFO] (cxt,data) {
        cxt.commit(types.GET_TARGET_RULETREEINFO, await sendRequest(reqUrl.getParaRuleTreeInfo,data,'post'));
    },
    async [types.GET_TARGET_RULECONFIG] (cxt,data) {
        cxt.commit(types.GET_TARGET_RULECONFIG, await sendRequest(reqUrl.getTargetRuleConfig,data,'post'));
    },
    async [types.ADD_TARGRT_RULE] (cxt,data) {
        cxt.commit(types.ADD_TARGRT_RULE, await sendRequest(reqUrl.editRule,data,'post'));
    },
    async [types.CHANGE_TARGRT_RULE] (cxt,data) {
        cxt.commit(types.CHANGE_TARGRT_RULE, await sendRequest(reqUrl.changeRuleStatus,data,'post'));
    },
    async [types.DATA_TARGET_CHANGE_STATUS] (cxt,data) {
        cxt.commit(types.DATA_TARGET_CHANGE_STATUS, await sendRequest(reqUrl.changeTargetStatus,data,'post'));
    },
    async [types.DATA_TARGET_CHECK] (cxt,data) {
        cxt.commit(types.DATA_TARGET_CHECK, await sendRequest(reqUrl.getTargetInfo,data,'post'));
    }
}


const mutations = {
    [types.DATA_TARGET_LIST] (state,data) {
        state[types.DATA_TARGET_LIST] = data.data;
    },
    [types.DATA_TARGET_SELECT] (state,data) {
        state[types.DATA_TARGET_SELECT] = data.data;
    },
    [types.DATA_TARGET_OPTIONS] (state,data) {
        state[types.DATA_TARGET_OPTIONS] = data.data;
    },
    [types.DATA_TARGET_ADD] (state,data) {
        state[types.DATA_TARGET_ADD] = data.data;
    },
    [types.GET_TARGET_RULE] (state,data) {
        state[types.GET_TARGET_RULE] = data.data;
    },
    [types.GET_TARGET_RULETREEINFO] (state,data) {
        state[types.GET_TARGET_RULETREEINFO] = data.data;
    },
    [types.GET_TARGET_RULECONFIG] (state,data) {
        state[types.GET_TARGET_RULECONFIG] = data.data;
    },
    [types.ADD_TARGRT_RULE] (state,data) {
        state[types.ADD_TARGRT_RULE] = data.data;
    },
    [types.CHANGE_TARGRT_RULE] (state,data) {
        state[types.CHANGE_TARGRT_RULE] = data.data;
    },
    [types.DATA_TARGET_CHANGE_STATUS] (state,data) {
        state[types.DATA_TARGET_CHANGE_STATUS] = data.data;
    },
    [types.DATA_TARGET_CHECK] (state,data) {
        state[types.DATA_TARGET_CHECK] = data.data;
    }
}
export default  {
    namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
    state,
    getters,
    actions,
    mutations,
}