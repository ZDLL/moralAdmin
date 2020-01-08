/**
 * axios的post请求
 */
import axios from "axios";
import qs from 'qs'

import { Message,Loading} from "element-ui";

let loading
function startLoading() {    //使用Element loading-start 方法
  loading = Loading.service({
      target:document.querySelector("body"),
      lock: true,
      text: '加载中……',
      background: 'rgba(255, 255, 255, 0.7)'
  })
}
function endLoading() {    //使用Element loading-close 方法
  loading.close()
}

let needLoadingRequestCount = 0
function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}
/**
 *  
 * @param {*} url 请求路径
 * @param {*} payload  参数
 * @param {*} method 请求方式
 */
let sendRequest = function(url,payload,method){
  axios.interceptors.request.use((config)=>{
      // 在发送请求之前做些什么
      showFullScreenLoading();
      return config;
  }, function (err) {
      // 对请求错误做些什么
      console.log("错误!!!!")
      console.log(err)
      Message.error("请求错误");
      return
  });
  // console.log(JSON.parse(window.localStorage.getItem("userInfo")).token)
  return new Promise((res,rej)=>{
    axios({
      method: method,
      url: url,
      data:qs.stringify(payload),
      // headers:{'Content-Type': 'application/json'}
      headers: {"Authorization":window.localStorage.getItem("userInfo")?JSON.parse(window.localStorage.getItem("userInfo")).token:''},
    }).then(data=>{
      endLoading()
      if( data.data.code && data.data.code!='10000'){
          Message.error(data.data.msg);
          return
      }else{
        if(data.data.status && data.data.status !=200){
          Message.error(data.data.message)
          if(data.data.status =='403'){
            window.location.href='/'
          }
          return;
        }
      }
      res(data)
    }).catch(err=>{
      endLoading()
      rej(err)
    })
  })
};

export{
    sendRequest
}