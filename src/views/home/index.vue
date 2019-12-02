<template>
  <div class="home">
    <el-container>
        <el-aside width="200px">
            <div class='logo'>
                <!-- <img src='../../assets/logo.png' /> -->
            </div>
            <!-- <div class="nav">
               <my-nav/>
            </div> -->
        </el-aside>
        <el-container>
            <el-header>
                <div class='header-cont'>
                    <!-- <span class='goback' ><i class='el-icon-back'></i>返回</span>
                    <span class='exit' >退出</span> -->
                    <span class='exit' style="margin-right:20px">张三</span>
                </div>
            </el-header>
            <el-main id='searchBar'>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
    name:"home",
    components:{
    },
    data(){
        return{
            total:100,
            userName:""
        }
    },
    methods:{
        
    },
    mounted(){
        
    }
}
</script>
<style lang="scss">
    .home{
        height: 100%;
        background-color: #1A1C20;
        .el-container{
            height: 100%;
            .el-main{
                overflow-x: hidden;
                overflow-y: auto;
            }
        }
         .el-header {
             background-color: rgba(35, 42, 46, 1);
            -webkit-box-shadow: 0px -1px 10px 2px rgba(0, 0, 0, 0.1);
            box-shadow: 0px -1px 10px 2px rgba(0, 0, 0, 0.1);
            color: #FFFFFF;
            text-align: right;
            line-height: 60px;
        }
        
        .el-aside {
            // border-right: 1px #dcdcdc solid;
            color: #333;
            padding: 20px;
            background: linear-gradient(165deg, rgba(60, 93, 104, 1) 0%, rgba(35, 42, 46, 1) 10%, rgba(25, 31, 33, 1) 100%);
            -webkit-box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.05);
            box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.05);
        }
    }
</style>
