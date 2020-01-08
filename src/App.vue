<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="scss">
// @import '@/style/myElstyle.scss';
@import '@/style/com.scss';
@import "./assets/fontIcon/iconfont.css";
#app {
  box-sizing: border-box;
  height: 100%;
  color: #2c3e50;
  
  .el-table thead {
    th {
      font-weight: 800;
      color: #666;
      text-align: center;
    }
  }
  .home{
    height: 100%;
    // background-color: #eee;
  }
}
/* 页面内自定义按钮 */
.html_btn{
    display: flex;
    align-items: center;
    margin: 20px 0 25px;
}
.html_btn>span{
   padding: 5px 10px;
   border: 1px solid rgba(50, 197, 255, 1);
   color: rgba(50, 197, 255, 1);
   font-size: 14px;
   margin-right: 10px;
   cursor: pointer;
   transition: .2s ease-in-out;
}
.html_btn>span:hover{
  background-color: rgba(50, 197, 255, 1);
  color: #1A1C20;
}
.html_btn i{
  margin-right: 6px;
}
.btn_box{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}


</style>
