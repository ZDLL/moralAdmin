<!-- <h2>账号中心账号列表</h2> -->
<template>
    <div class='account-page'>
        <myCrumb :crumb-ary="brea"></myCrumb>
        <div class='page-cont'>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label='账户编号：'>
                    <el-input class="input-with-select" style="width:200px" v-model='search.accountNo' clearable @clear="clearFun" placeholder="请输入账户编号"></el-input>
                </el-form-item>
                <el-form-item label='账号：'>
                    <el-input class="input-with-select" style="width:200px" v-model='search.accountLoginNo' clearable @clear="clearFun" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label='账户类型：'>
                    <span style="display: inline-block;">
                        <el-select v-model="search.accountType" clearable  @clear='clearFun("roleNo")' placeholder="请选择">
                            <el-option
                                v-for="item in actTpyeOpn"
                                :key="item.codeValueId"
                                :label="item.codeValueName"
                                :value="item.codeValueId">
                            </el-option>
                        </el-select>
                    </span>
                </el-form-item>
                <el-form-item label='来源：'>
                    <span style="display: inline-block;">
                        <el-select v-model="search.registerSource" clearable  @clear='clearFun("roleNo")' placeholder="请选择">
                            <el-option
                                v-for="item in resSorTpyeOpn"
                                :key="item.codeValueId"
                                :label="item.codeValueName"
                                :value="item.codeValueId">
                            </el-option>
                        </el-select>
                    </span>
                </el-form-item>
                <el-form-item label='状态：'>
                    <span style="display: inline-block;">
                        <el-select v-model="search.state" clearable  @clear='clearFun("roleNo")' placeholder="请选择">
                            <el-option
                                v-for="item in stateOpn"
                                :key="item.codeValueId"
                                :label="item.codeValueName"
                                :value="item.codeValueId">
                            </el-option>
                        </el-select>
                    </span>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="searchBtn">查询</el-button>
                </el-form-item>
            </el-form>
            <el-divider content-position="left">账号列表</el-divider>
            <div class='table-cont'>
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column prop="accountNo" label="账户编号"></el-table-column>
                    <el-table-column prop="accountName" label="账号"></el-table-column>
                    <el-table-column prop="accountTypeName" label="账户类型"></el-table-column>
                    <el-table-column prop="registerSourceName" label="来源"></el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope" >
                            {{scope.row.state | codeStatus}}
                            <!-- {{scope.row.isDel ==1?"冻结":"正常"}} -->
                        </template>
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="240">
                    <template slot-scope="scope">
                        <el-button @click="changeState(scope.row)" :type="scope.row.state!=='00001002'?'danger':'' " size="mini" >{{scope.row.state | statusBtnTxt}}</el-button>
                         <el-button @click="resPwdBtn(scope.row)" size="mini">重置密码</el-button>
                        <el-button @click="viewBtn(scope.row)" size="mini">查看</el-button>
                    </template>
                    </el-table-column>
                </el-table>
                <myPackage v-if='packTotal' :key='packTotal' :pageTotal='packTotal' @handleCurrent="handleCurrentFunc"></myPackage>

            </div>
        </div>
    </div>
</template>
<script>
import myCrumb from '../../../components/headerCrumb.vue';
import myPackage from "../../../components/package.vue";
import {myConfirm} from '../../../until/until'
export default {
    name:"account",
    components:{
       myCrumb,
       myPackage
    },
    data(){
        return{
            search:{
                pageNo:1,
                pageSize:10,
                accountNo:"",
                accountLoginNo:"",
                accountType:"",
                registerSource:"",
                state:""
            },
            packTotal:1,
            tableData:[],
            actTpyeOpn:[],
            resSorTpyeOpn:[],
            stateOpn:[],
            brea:[{name:"账户中心",url:""},{name:"账户列表",url:""}],
        }
    },
    methods:{
        async getCodeValue (type){
            await this.$store.dispatch("SystemModule/GET_CODE_VALUE",{codeTypes:type});
            let data = this.$store.state.SystemModule.GET_CODE_VALUE
            this.actTpyeOpn = data.out.accountType;
            this.resSorTpyeOpn = data.out.registerSource;
            this.stateOpn = data.out.state;
        },
        async actList (){
            await this.$store.dispatch("ActModule/POST_ACT_LIST",this.search);
            let data = this.$store.state.ActModule.POST_ACT_LIST;
            this.tableData= data.out.list
            this.packTotal= parseInt(data.out.totalSize)
        },
        async actChangeState (postData){
            await this.$store.dispatch("ActModule/POST_ACT_UPDATALE",postData);
            let data = this.$store.state.ActModule.POST_ACT_UPDATALE;
            this.$message.success("操作成功")
            this.actList()
            // this.tableData= data.out.list
        },
        async resPwd (postData){
            await this.$store.dispatch("ActModule/POST_ACT_RES_PWD",postData);
            let data = this.$store.state.ActModule.POST_ACT_RES_PWD;
           this.$message.success("操作成功")
            this.actList()
            // this.tableData= data.out.list
        },
        changeState(row){
           let postData={
                accountNo:row.accountNo,
                state:row.state=='00001001'?'00001002':'00001001'
            }
            let _this = this;
            myConfirm(_this,`${row.state=='00001001'?'禁用账户后，该账户无法登陆':'启用账户后，账户可正常登陆'}`,function(){
                _this.actChangeState(postData)
            })
        },
        resPwdBtn(row){
            let postData={
                accountNo:row.accountNo
            }
            let _this = this;
            myConfirm(_this,`重置后密码为88888888，是否重置？`,function(){
                _this.resPwd(postData)
            })
        },
        viewBtn(row){
            this.$router.push({
                path:"/accountDet",
                query:{
                    id:row.accountNo
                }
            })
        },
        handleCurrentFunc(val){
            this.search.pageNo = val
            this.actList()
        },
        clearFun(str){
            this.search[str]='';
             this.actList()
        },
        searchBtn(){
            this.actList()
        }

    },
    created(){
         this.getCodeValue("accountType,registerSource,state");
         this.actList()
    }
}
</script>
<style lang="scss">
    .account-page{
        .page-cont{
             @extend %pageCont;
             background-color: $table_back_color;
             padding: 20px;
        }
    }
</style>