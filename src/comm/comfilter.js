/**
 * 公共使用的过滤器
 */
import moment from 'moment'
const myFilter={
    /**
     * 
     * @param {*} dataStr 时间戳 数字 
     * @param {*} pattern 默认转成 年-月-日 时:分：秒
     */
    dateformat(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss'){//时间戳转标准时间
         return moment(dataStr).format(pattern)
    },
    numToFixed:function (value) {  // 截取当前数据到小数点后两位
        /**
         * @param {*} value 数字 
         */
        let realVal = Number(value).toFixed(2)
        return realVal
    },
    codeStatus(val){ //判断启用 禁用 的过滤器
        // if(!val){
        //   return
        // }
        if(val == '00001001' || val == 1){
          return '生效'
        }else{
          return '失效'
        }
    },
    statusBtnTxt(val){
      // if(!val){
      //   return
      // }
      if(val == '00001001' || val == 1){
        return '禁用'
      }else{
        return '启用'
      }
    } 
}

export default myFilter  