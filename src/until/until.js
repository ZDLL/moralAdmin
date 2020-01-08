import Vue from 'vue'
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
  
  /**
   * element MessageBox弹框封装
   * @param {*} title 弹窗名称 
   * @param {*} msg 弹窗内容  可以为html片段 
   * @param {*} callback 回调函数
   */
  let openMessagebox = (title,msg,callback)=>{
    let v = new Vue();
    v.$confirm(msg,title,  {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      dangerouslyUseHTMLString:true
    }).then(() => {
      callback()
    }).catch(() => {  
      v.$message.warning("操作取消")    
      return false;   
    });
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
  //公共的弹层提示
let  myConfirm = function(_this,txt,fn) {
  _this.$confirm(txt, "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
  })
  .then((val) => {
      fn(val)
  })
  .catch((err) => {
    console.log(err)
    _this.$message({
      type: "info",
      message: "已取消操作"
  });
  });
}
let menuSetData=function(data){
  let fisteMenu=[],
  twoMenu=[],
  threeMenu=[],
  allMenu=[];
  if(data && data.length>0){
    data.map((val,index)=>{
      // val.menuUrl =val.menuId
      if(val.parMenuNo ==''){
        val.parMenuNo ='1'
      }
      if(!val.menuPath){
        val.menuPath = val.menuPath
      }
      if(val.nodeLv == 1){
        allMenu.push(val);
      };
      if(val.nodeLv == 2){
          twoMenu.push(val)
      };
      if(val.nodeLv == 3){
        threeMenu.push(val)
      }
  })
    
  }else{
    alert("无权限！")
    return
    // this.$message.warning("该账号无权限")
  }
  allMenu.map((cv,inx)=>{
    allMenu[inx].children=[];
    twoMenu.map((nv,ix)=>{
      if(cv.menuNo == nv.parMenuNo){
            nv.children=[];
          allMenu[inx].children.push(nv)
            threeMenu.map((ccv,ccinx)=>{
              if(ccv.parMenuNo == nv.menuNo){
                  nv.children.push(ccv)
              }
            })
      }
    });
  })
  return allMenu
};
/**
 * 
 * @param {*} data =[]
 * @param {*} obj ={pId:"",id:""}
 */
let transAeaTree=function(data,obj){
  data.forEach(function (item) {
       delete item.children;
   });

   // 将数据存储为以 id 为 KEY 的 map 索引数据列
   var map = {};
   data.forEach(function (item) {
     item.Children = []   // 看情况加这一步
     let id=obj['id'];
     map[item[id]] = item;
   });
   //console.log(map);
   var DataInfo = [];
   let pid=obj['pId']
   data.forEach(function (item) {
       //如果需要对特定字段进行处理，那么这里做对应处理，会存在一定数据冗余
       //item.label = item.name;
       // 以当前遍历项，的pid,去map对象中找到索引的id
       var parent = map[item[pid]];
       // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
       if (parent) {
           (parent.children || ( parent.children = [] )).push(item);
             parent.Children.push(item)  //看情况要这一步，不要上一步
       } else {
           //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
           
           DataInfo.push(item);
       }
   });
   return DataInfo;
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
    openMessagebox,
    jse,
    myConfirm,
    menuSetData,
    transAeaTree
  }