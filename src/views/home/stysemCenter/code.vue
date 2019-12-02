<template>
    <div class='code-page'>
        <myCrum :crumbAry='crumAry'></myCrum>
        <div class='cont'>
            <el-button type="primary" size="mini" >禁用</el-button>
            <myPage :key='total' :pageTotal='total' @handleCurrent='handleCurreentFun'></myPage>
            <div class='mm'>颜色</div>
        </div>
    </div>
</template>
<script>
import myCrum from '../../../components/headerCrumb'
import myPage from '../../../components/package'

export default {
    name:'expemcode',
    components:{
        myCrum,
        myPage
    },
    data(){
        return{
            crumAry:[{url:"/login",name:"简单码表"},{url:"",name:"信息中心"}],
            total:50,

        }
    },
    methods:{
        handleCurreentFun(curre){
            console.log(curre)
        }
    }
}
</script>
<style lang="scss">
   .mm{
       color: $action_color
   }
</style>