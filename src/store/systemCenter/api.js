module.exports={
    /**
     * 简单码表
     */
    'codeTypeList':"/api/code/queryCodeType",//码类列表
    'codeValueList':"/api/code/queryCodeValue",//码值列表
    'addCodeType':"/api/code/saveCoeType",//码类添加
    'addCodeInfo':"/api/code/saveCodeInfo",//码值添加
    'statusChange':"/api/code/updateCodeTypeStatus",//禁用启用码值类型
    'attrChange':"/api/code/updateCodeInfoStatus",//禁用启用属性
    /**
     * 复杂码表
     */
    'comCodeTypeList':"/api/cplt/getCodeTypeList",//复杂码表类型列表
    'comCodeValeLis':"/api/cplt/getCodeValueList",//复杂码表码值列表
    'comSaveType':"/api/cplt/save/type",//复杂码表类型 修改 添加 
    'comSaveValue':"/api/cplt/save/value",//复杂码表码值 修改 添加
    /**
     * 系统参数
     */
    'paraInfoLis':'/api/para/getParaInfoList',//参数列表
    'paraSave':"/api/para/save",//参数 修改 增加 改变状态
    /**
     * 菜单
     */
    "queryMenus":"/api/menu/queryMenus",//用户查询菜单
    "queryCodeValue":"/api/code/queryCodes",//获取码值
    "saveMenu":'/api/menu/saveMenu',//添加菜单
    "deleteMenu":"/api/menu/deleteMenu",//删除菜单
    "updateMenu":'/api/menu/updateMenu',//更新菜单
    "queryRoles":"/api/role/queryRoles",//查询角色列表
    'saveRole':"/api/role/saveRole",//新增角色
    "deleteRole":"/api/role/deleteRole",//禁用角色
    "enableRole":"/api/role/enableRole",//启用角色
    'roleMenus':"/api/role/queryRoleHasMenuId",//查询用户角色菜单
    "saveRoleMenuId":"/api/role/saveRoleMenuId",//更新用户菜单
    /**
     * 系统用户
     */
    "queryUsers": "/api/user/queryUser",//系统用户查询
    "saveUser":"api/user/saveUser",//添加系统用户

}