<!-- <h2>登录页面</h2> -->
<template>
    <div class="login">
        <div class='login-cont'>
            <img class='img1' src="../assets/login_logo.png" alt="">
            <h1>数据中心-系统登录</h1>
            <img class='img2' src="../assets/login_img1.png" alt="">

            <el-form :inline="true" class="demo-form-inline" :model="loadForm" :rules="rules" ref="loadForm">
                <el-form-item prop="username">
                    <el-input placeholder="用户名" v-model="loadForm.username">
                        <i slot="prefix" :class="loadForm.username.length!=0?'blue':''"
                            class="iconfont icon-yonghuming"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input  placeholder="密码" type="password" v-model="loadForm.password">
                        <i slot="prefix" :class="loadForm.password.length!=0?'blue':''" class="iconfont icon-mima"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="testcode">
                    <el-input placeholder="验证码"
                        v-model="loadForm.testcode">
                        <i slot="prefix" :class="loadForm.testcode.length!=0?'blue':''"
                            class="iconfont icon-yanzhengma"></i>
                    </el-input>
                </el-form-item>
                <!-- @keyup.enter.native="submitForm('loadForm')" -->
                <el-form-item>
                    <img class="imgCode" :src="imgCode" alt="">
                    <!-- @click="clickImg" -->
                </el-form-item>
                <br>
                <br>
                <el-button type="success" style="display:block;width:200px;margin:auto">
                    登录</el-button>
                    <!--  @click="submitForm('loadForm')"  -->
            </el-form>

        </div>
    </div>
</template>
<script>
import {jse} from '../until/until'
export default {
   data() {
      return {
            imgCode: '',
            loadForm: {
               username: '',
               password: '',
               testcode: '',
            },
            rules: {
               username: [{
                  required: true,
                  message: '请输入用户名',
                  trigger: 'blur'
               }, ],
               password: [{
                  required: true,
                  message: '请输入密码',
                  trigger: 'blur'
               }, ],
               testcode: [{
                  required: true,
                  message: '请输入验证码',
                  trigger: 'blur'
               }, ],
            }
      }
   },
   created() {
      // this.clickImg();
    //   this.userLogin()
   },
   methods: {
       async userLogin(postData){
           await this.$store.dispatch("LoginModule/POST_LOGIN",postData)
           let data = this.$store.state.LoginModule.POST_LOGIN;
           console.log(data);
       },
       submitForm(formName){
           let _this = this;
            this.$refs[formName].validate((valid) => {
                 if (valid) {
                     _this.userLogin({
                        username: this.loadForm.username,
                        password: jse.encrypt(this.loadForm.password),
                        authcode: this.loadForm.testcode
                     })
                 }
            })
       }
      // submitForm(formName) {
      //       this.$refs[formName].validate((valid) => {
      //          if (valid) {
      //             login({
      //                   username: this.loadForm.username,
      //                   password: jse.encrypt(this.loadForm.password),
      //                   authcode: this.loadForm.testcode
      //             }, (data) => {
      //                   if (data.code == 1) {
      //                      localStorage.setItem("token", data.data.user_token);
      //                      localStorage.setItem("username", data.data.user_name);
      //                      this.$router.push({name:'Home'})
      //                      this.$notify({
      //                         title: '登录成功',
      //                         message: data.msg,
      //                         type: 'success'
      //                      });
      //                   } else {
      //                      this.$notify.error({
      //                         title: '错误',
      //                         message: data.msg
      //                      });
      //                   }
      //             })
      //          }
      //       });
      // },
      // clickImg() {
      //       this.imgCode = getImgCode() + '?time=' + new Date
      // }
   }
}
</script>
<style lang="scss">
   .login {
        width: 100%;
        height: 100vh;
        background: linear-gradient(180deg, rgba(14, 63, 75, 1) 0%, rgba(25, 36, 38, 1) 76%);
        display: flex;
        align-items: center;
        justify-content: center;
        .login-cont{
           text-align: center;
           .img1{
              display: block;
               margin: 0 auto 15px;
               width: 103px;
           }
           .img2{
              display: block;
               margin: 5px auto 30px;
               width: 350px
           }
           h1{
              font-size: 24px;
               color: #01C9FE;
               text-align: center;
               letter-spacing: 2px;
           }
           .el-button--success{
               color: #FFF;
               background-color: #01C9FE;
               border-color: #01C9FE;
               padding: 8px 20px;
            }
            .el-input__inner{
               background-color: #1A1C20;
               background-image: none;
               border-radius: 4px;
               border: 1px solid rgba(255, 255, 255, 0.1);
               -webkit-box-sizing: border-box;
               box-sizing: border-box;
               color: #C0C4CC;
               display: inline-block;
               font-size: inherit;
               height: 40px;
               line-height: 40px;
               outline: 0;
               padding: 0 15px;
               -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
               transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
               width: 210px;
            }
            .el-input--prefix 
            .el-input__inner {
                padding-left: 30px;
            }
        }
    }
</style>