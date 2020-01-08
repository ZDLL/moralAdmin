import apiUrl from './api.js';
import {sendRequest} from '../../request/axios.js'
import * as types from './type.js';
const state ={
    /**
     * 简单码表
     */
    [types.POST_ADD_CODE_TYPE]:{},
    [types.POST_ADD_CODE_INFO]:{},
    [types.POST_CODE_TYPE_LIST]:{},
    [types.POST_CODE_INFO_LIST]:{},
    [types.GET_CODE_TYPE_STATUS]:{},
    [types.POST_CODE_ATTR_STATUS]:{},
    /**
     * 复杂码表
     */
    [types.POST_COM_CODE_TYPE_LIST]:{},
    [types.POST_COM_CODE_VALUE_LIST]:{},
    [types.POST_COM_CODE_TYPE_SAVE]:{},
    [types.POST_COM_CODE_VALUE_SAVE]:{},
    /**
     * 系统参数
     */
    [types.POST_PARA_CODE_LISY]:{},
    [types.POST_PARA_CODE_SAVE]:{},
    /**
     * 角色
     */
    [types.GET_ROLE_LIST]:{},
    [types.POST_SAVE_ROLE]:{},
    [types.DEL_DELETE_ROLE]:{},
    [types.PUT_ENABLE_ROLE]:{},
    [types.GET_USER_ROLE_LIST]:{},
    [types.POST_SAVE_USER_MENU]:{},
    /**
     * 菜单
     */
    [types.MENU_GET_LIST]:{},
    [types.GET_CODE_VALUE]:{},
    [types.POST_SAVE_MENU]:{},
    [types.UPDAT_POST_MENU]:{},
    [types.POST_DEL_MENU]:{},
    /**
     * 系统用户
     */
    [types.USER_GET_LIST]: {},
    [types.USER_SAVE]: {},
}
const getters ={

}
const actions={
  /**
   * 简单码表
   */
  async [types.POST_ADD_CODE_TYPE](cxt,postData){
      cxt.commit(types.POST_ADD_CODE_TYPE,await sendRequest(apiUrl.addCodeType,postData,'post'))
  },
  async [types.POST_ADD_CODE_INFO](cxt,postData){
    cxt.commit(types.POST_ADD_CODE_INFO,await sendRequest(apiUrl.addCodeInfo,postData,'post'))
  },
  async [types.POST_CODE_TYPE_LIST](cxt,postData){
    cxt.commit(types.POST_CODE_TYPE_LIST,await sendRequest(apiUrl.codeTypeList,postData,'post'))
  },
  async [types.POST_CODE_INFO_LIST](cxt,postData){
    cxt.commit(types.POST_CODE_INFO_LIST,await sendRequest(apiUrl.codeValueList,postData,'post'))
  },
  async [types.GET_CODE_TYPE_STATUS](cxt,postData){
    cxt.commit(types.GET_CODE_TYPE_STATUS,await sendRequest(apiUrl.statusChange+"/"+postData.codeTypeId,{},'get'))
  },
  async [types.POST_CODE_ATTR_STATUS](cxt,postData){
    cxt.commit(types.POST_CODE_ATTR_STATUS,await sendRequest(apiUrl.attrChange,postData,'post'))
  },
  /**
   * 复杂码表
   */
  async [types.POST_COM_CODE_TYPE_LIST](cxt,postData){
    cxt.commit(types.POST_COM_CODE_TYPE_LIST,await sendRequest(apiUrl.comCodeTypeList,postData,'post'))
  },
  async [types.POST_COM_CODE_VALUE_LIST](cxt,postData){
    cxt.commit(types.POST_COM_CODE_VALUE_LIST,await sendRequest(apiUrl.comCodeValeLis,postData,'post'))
  },
  async [types.POST_COM_CODE_TYPE_SAVE](cxt,postData){
    cxt.commit(types.POST_COM_CODE_TYPE_SAVE,await sendRequest(apiUrl.comSaveType,postData,'post'))
  },
  async [types.POST_COM_CODE_VALUE_SAVE](cxt,postData){
    cxt.commit(types.POST_COM_CODE_VALUE_SAVE,await sendRequest(apiUrl.comSaveValue,postData,'post'))
  },
  /**
   * 系统参数
   */
  async [types.POST_PARA_CODE_LISY](cxt,postData){
    cxt.commit(types.POST_PARA_CODE_LISY,await sendRequest(apiUrl.paraInfoLis,postData,'post'))
  },
  async [types.POST_PARA_CODE_SAVE](cxt,postData){
    cxt.commit(types.POST_PARA_CODE_SAVE,await sendRequest(apiUrl.paraSave,postData,'post'))
  },
  /**
   * 角色
   */
  async [types.GET_ROLE_LIST](cxt,pram){
    cxt.commit(types.GET_ROLE_LIST,await sendRequest(apiUrl.queryRoles,pram,"post"))
  },
  async [types.POST_SAVE_ROLE](cxt,pram){
      cxt.commit(types.POST_SAVE_ROLE,await sendRequest(apiUrl.saveRole,pram,"post"))
  },
  async [types.DEL_DELETE_ROLE](cxt,pram){
      cxt.commit(types.DEL_DELETE_ROLE,await sendRequest(apiUrl.deleteRole+'/'+pram.roleNo,{},"delete"))
  },
  async [types.PUT_ENABLE_ROLE](cxt,pram){
      cxt.commit(types.PUT_ENABLE_ROLE,await sendRequest(apiUrl.enableRole+'/'+pram.roleNo,{},"put"))
  },
  async [types.GET_USER_ROLE_LIST](cxt,pram){
      cxt.commit(types.GET_USER_ROLE_LIST,await sendRequest(apiUrl.roleMenus,pram,"post"))
  },
  async [types.POST_SAVE_USER_MENU](cxt,pram){
      cxt.commit(types.POST_SAVE_USER_MENU,await sendRequest(apiUrl.saveRoleMenuId,pram,"post"))
  },
  /**
   * 菜单
   */
async [types.MENU_GET_LIST](cxt,postData){
    cxt.commit(types.MENU_GET_LIST,await sendRequest(apiUrl.queryMenus,postData,"post"))
},
async [types.GET_CODE_VALUE](cxt,postData){
    cxt.commit(types.GET_CODE_VALUE,await sendRequest(apiUrl.queryCodeValue,postData,"post"))
},
async [types.POST_SAVE_MENU](cxt,postData){
    cxt.commit(types.POST_SAVE_MENU,await sendRequest(apiUrl.saveMenu,postData,"post"))
},
async [types.UPDAT_POST_MENU](cxt,postData){
    cxt.commit(types.UPDAT_POST_MENU,await sendRequest(apiUrl.updateMenu,postData,"post"))
},
async [types.POST_DEL_MENU](cxt,postData){
    cxt.commit(types.POST_DEL_MENU,await sendRequest(apiUrl.deleteMenu,postData,"post"))
},
/**
 * 用户
 */
  async [types.USER_GET_LIST](cxt,postData){
    cxt.commit(types.USER_GET_LIST,await sendRequest(apiUrl.queryUsers,postData,"post"))
  },
  async [types.USER_SAVE](cxt, postData) {
    cxt.commit(types.USER_SAVE,await sendRequest(apiUrl.saveUser,postData,"post"))
  },


}
const mutations={
  /**
   * 简单码表
   * @param {*} state 
   * @param {*} data 参数
   */
  [types.POST_ADD_CODE_TYPE](state,data){
    state[types.POST_ADD_CODE_TYPE]= data.data
  },
  [types.POST_ADD_CODE_INFO](state,data){
    state[types.POST_ADD_CODE_INFO]= data.data
  },
  [types.POST_CODE_TYPE_LIST](state,data){
    state[types.POST_CODE_TYPE_LIST]= data.data
  },
  [types.POST_CODE_INFO_LIST](state,data){
    state[types.POST_CODE_INFO_LIST]= data.data
  },
  [types.GET_CODE_TYPE_STATUS](state,data){
    state[types.GET_CODE_TYPE_STATUS]= data.data
  },
  [types.POST_CODE_ATTR_STATUS](state,data){
    state[types.POST_CODE_ATTR_STATUS]= data.data
  },
  /**
   * 复杂码表
   */
  [types.POST_COM_CODE_TYPE_LIST](state,data){
    state[types.POST_COM_CODE_TYPE_LIST]= data.data
  },
  [types.POST_COM_CODE_VALUE_LIST](state,data){
    state[types.POST_COM_CODE_VALUE_LIST]= data.data
  },
  [types.POST_COM_CODE_TYPE_SAVE](state,data){
    state[types.POST_COM_CODE_TYPE_SAVE]= data.data
  },
  [types.POST_COM_CODE_VALUE_SAVE](state,data){
    state[types.POST_COM_CODE_VALUE_SAVE]= data.data
  },
  /**
   * 系统参数
   */
  [types.POST_PARA_CODE_LISY](state,data){
    state[types.POST_PARA_CODE_LISY]= data.data
  },
  [types.POST_PARA_CODE_SAVE](state,data){
    state[types.POST_PARA_CODE_SAVE]= data.data
  },
  /**
   * 角色
   */
  [types.GET_ROLE_LIST](state,data){
    state[types.GET_ROLE_LIST] = data.data
  },
  [types.POST_SAVE_ROLE](state,data){
      state[types.POST_SAVE_ROLE] = data.data
  },
  [types.DEL_DELETE_ROLE](state,data){
      state[types.DEL_DELETE_ROLE] = data.data
  },
  [types.PUT_ENABLE_ROLE](state,data){
      state[types.PUT_ENABLE_ROLE] = data.data
  },
  [types.GET_USER_ROLE_LIST](state,data){
      state[types.GET_USER_ROLE_LIST] = data.data
  },
  [types.POST_SAVE_USER_MENU](state,data){
      state[types.POST_SAVE_USER_MENU] = data.data
  },
  [types.MENU_GET_LIST](state,data){
        state[types.MENU_GET_LIST]= data.data
  },
  [types.GET_CODE_VALUE](state,data){
      state[types.GET_CODE_VALUE]= data.data
  },
  [types.POST_SAVE_MENU](state,data){
      state[types.POST_SAVE_MENU]= data.data
  },
  [types.UPDAT_POST_MENU](state,data){
      state[types.UPDAT_POST_MENU]= data.data
  },

  [types.POST_DEL_MENU](state,data){
      state[types.POST_DEL_MENU]= data.data
  },
    /**
     * 角色
     */
    [types.MENU_GET_LIST](state,data){
      state[types.MENU_GET_LIST]= data.data
    },
    [types.POST_SAVE_MENU](state,data){
        state[types.POST_SAVE_MENU]= data.data
    },
    [types.UPDAT_POST_MENU](state,data){
        state[types.UPDAT_POST_MENU]= data.data
    },

    [types.POST_DEL_MENU](state,data){
        state[types.POST_DEL_MENU]= data.data
    },
    /**
     * 用户
     */
    [types.USER_GET_LIST](state,data){
      state[types.USER_GET_LIST]= data.data
    },
    [types.USER_SAVE](state,data){
      state[types.USER_SAVE]= data.data
    },
}

export default {
    namespaced: true,//解决不同模块命名冲突的问题,需要加上所属的模块名
    state,
    getters,
    actions,
    mutations
  }