<template>
  <div class="home">
    <el-container>
        <el-aside width="220px">
            <div class='logo'>
                <img src='../../assets/login_logo.png' />
            </div>
            <div class="nav">
               <myNav/>
            </div>
        </el-aside>
        <el-container>
            <el-header>
                <div class='header-cont'>
                    <!-- <span class='goback' ><i class='el-icon-back'></i>返回</span>
                    <span class='exit' >退出</span> -->
                    <span @mouseover='showDownBtn'  class='exit hoverDown' style="margin-right:20px">{{userName}}</span>
                    <div v-show='showDown' class='down'>
                        <ul class='down-ul' @mouseout='showDownBtn'>
                            <li @click="updataPwd">修改密码</li>
                            <li @click="loginOutBtn">注销</li>
                        </ul>
                    </div>
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
import  {getStore} from '../../until/until.js'
import myNav from '../../components/nav.vue'
export default {
    name:"home",
    components:{
        myNav
    },
    data(){
        return{
            total:100,
            userName:"",
            showDown:false,
        }
    },
    methods:{
       
        showDownBtn(){
            if(this.showDown){
                this.showDown= false
            }else{
                this.showDown= true
            }
        },
         async loginOut(){
            await this.$store.dispatch("LoginModule/POST_LONG_OUT",{});
            let data  = this.$store.state.LoginModule.POST_LONG_OUT;
            this.$router.push("/login");
        },
         updataPwd(){
           this.$router.push("/setPwd");
           
        },
        loginOutBtn(){
            this.loginOut();
        }
    },
    mounted(){
        
    },
    created(){
        if(JSON.parse(getStore("userInfo")) && JSON.parse(getStore("userInfo")).username){
            this.userName =JSON.parse(getStore("userInfo")).username
        }
    }
}
</script>
<style lang="scss">
    .home{
        height: 100%;
        // background-color: #1A1C20;
        .el-container{
            height: 100%;
            .el-main{
                overflow-x: hidden;
                overflow-y: auto;
            }
        }
         .el-header {
            //  background-color: rgba(35, 42, 46, 1);
            -webkit-box-shadow: 0px -1px 10px 2px rgba(0, 0, 0, 0.1);
            box-shadow: 0px -1px 10px 2px rgba(0, 0, 0, 0.1);
            color: #333;
            text-align: right;
            line-height: 60px;
            .header-cont{
                position: relative;
                .down-ul{
                    padding: 0px;
                    margin: 0px;
                    li{
                        height: 40px;
                        line-height: 40px;
                        border-bottom: 1px #f5f5f5 solid;
                    }
                }
                // .hoverDown{
                //     &:hover{
                //        .down{
                //            display: block;
                //        } 
                //     }
                // }
                .down{
                    position: absolute;
                    width: 100px;
                    height: 80px;
                    right: 2px;
                    top:50px;
                    background-color: #fff;
                    z-index: 2;
                    text-align:center;
                }
            }
        }
        .el-main{
            height: 100%;
            background-color: #f5f5f5;
        }
        
        .el-aside {
            // border-right: 1px #dcdcdc solid;
            color: #333;
            padding: 20px;
            // background: linear-gradient(165deg, rgba(60, 93, 104, 1) 0%, rgba(35, 42, 46, 1) 10%, rgba(25, 31, 33, 1) 100%);
            // -webkit-box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.05);
            box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.05);
        }
        .logo{
            width: 100px;
            margin-left: 35px;
            img{
                width: 100%
            }
        }
    }
</style>
