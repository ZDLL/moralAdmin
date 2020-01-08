<template>
    <div class='mybreaumb'>
         <el-breadcrumb class="header_Breadcrumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-if='inx.url' v-for="(inx,key) in myCrrun" :to='{path:inx.url}' :key='key'>
                <i v-if='key == 0' class="iconfont icon-zuobiao"></i>{{inx.name}} 
            </el-breadcrumb-item>
            <el-breadcrumb-item v-else>
                {{inx.name}} 
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div> 
</template>
<script>
export default {
    name:"bead",
    data(){
        return{
            myCrrun:[]
        }
    },
    props:{
        crumbAry:{
            type:Array,
            default:[]
        }
    },
    methods:{},
    created(){
        this.myCrrun = this.crumbAry
    }
}
</script>
<style lang="scss">
    .mybreaumb{
       
        .el-breadcrumb__item{
            float: none;
             .el-breadcrumb__inner{
                 color: $brumColor;
            }
            .el-breadcrumb__inner:hover{
                color: $brumColor;
            }
        }
        .el-breadcrumb__inner.is-link{
            font-weight: 400;
            color: $tran_brumColor;
            cursor: pointer;
        }
        .el-breadcrumb__inner.is-link:hover{
            color: $brumColor;
        }
    }
</style>