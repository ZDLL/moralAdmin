/**
 * 存储localStorage
 */
let setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  }
  
  /**
   * 获取localStorage
   */
  let getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
  }
  
  /**
   * 删除localStorage
   */
  let removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
  }
  
  /*
    获取url上参数
  */
  
  let getUrlParams = function(name) {
    let reg = new RegExp(name + "=([^&]*)");
    let r = window.location.href.match(reg);
    if (r != null) return unescape(r[1]);
    return null
  }

  /**
   * 
   * @param {*} list [] 数组
   * @param {*} obj { id: "skuInfoNo",parId: "parSkuInfoNo"} 产生联系的父级id 和子级id
   * 
   */

  let translateDataToTree = function (list,obj){
    let temp = {};
    let tree = [];
    if(Object.keys(obj).length<1){
      console.log("树状数据没有配置")
      return;
    }
    // console.log(list.length)
    if(!list || list.length<1){
      console.log("无树状数据")
      return;
    }
    let id= obj.id;
    let parId = obj.parId
    for(let i in list){
        temp[list[i][id]] = list[i];//skuTypeNo
    }
    for(let i in temp){
      
      // console.log(parId)
        if(temp[i][parId]) {//parSkuTypeNo
            if(!temp[temp[i][parId]].children) {
                temp[temp[i][parId]].children = [];
            }
            temp[temp[i][parId]].children.push(temp[i]);
        } else {
            tree.push(temp[i]);
        }
    }
    return tree;
  }

import JsEncrypt from 'jsencrypt'
const jse = new JsEncrypt();
jse.setPublicKey(`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDsIyYa6RpgXnT3dnF+SBW1UpNi
lZ+HIOQOb1KM/0JuYzmBoDB9h+fthTILWhDTpf6tc6idV52dwl9is71XqxdmIzVu
x31Qc7vF2Iis1rVnLH49FEiavNhpiI9sTXn1BmQ+xvfgos3vtjpVTzC0wOtgiPbX
k2PjwZm2WbiMPOe1PwIDAQAB
-----END PUBLIC KEY-----`)

  export{
    setStore,
    getStore,
    removeStore,
    getUrlParams,
    translateDataToTree,
    jse,
  }