<template>
    <div class="userList-page">
         <myBrea :crumb-ary="brea"></myBrea>
         <div class="userList-cont">
            <div class="userList-top">
                 <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="真实姓名：">
                        <span style="display: inline-block;">
                             <el-input v-model="search.realName" clearable @clear='clearFun("realName")' placeholder="请输入内容"></el-input>
                        </span>
                    </el-form-item>
                    <el-form-item label="用户角色：">
                        <span style="display: inline-block;">
                            <el-select v-model="search.roleNo" clearable  @clear='clearFun("roleNo")' placeholder="请选择">
                                <el-option
                                v-for="item in userRoleOpn"
                                :key="item.roleNo"
                                :label="item.roleName"
                                :value="item.roleNo">
                                </el-option>
                            </el-select>
                        </span>
                    </el-form-item>
                    <el-form-item label="角色状态：">
                        <span style="display: inline-block;">
                            <el-select v-model="search.state" clearable  @clear='clearFun("state")' placeholder="请选择">
                                <el-option
                                v-for="item in roleTypeOpn"
                                :key="item.codeValueId"
                                :label="item.codeValueName"
                                :value="item.codeValueId">
                                </el-option>
                            </el-select>
                        </span>
                    </el-form-item>
                     <el-form-item>
                        <el-button type="primary" @click="searchBtn" plain>查询用户</el-button>
                        <el-button type="primary" @click="addUserBtn">添加用户</el-button>
                    </el-form-item>
                 </el-form>
            </div>
            <div class='userList-table'>
                <el-divider content-position="left">用户列表</el-divider>
                <div class='list_table'>
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                        <!-- <el-table-column prop="loginName" label="用户名"></el-table-column> -->
                        <el-table-column prop="roleName" label="角色"></el-table-column>
                        <el-table-column prop="userName" label="真实姓名"></el-table-column>
                        <!-- <el-table-column prop="paraName" label="参数名称"></el-table-column> -->
                        <el-table-column prop="userTel" label="电话"></el-table-column>
                        <el-table-column label="角色状态">
                            <template slot-scope="scope" >
                                {{scope.row.state | codeStatus}}
                                <!-- {{scope.row.isDel ==1?"冻结":"正常"}} -->
                            </template>
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="200">
                        <template slot-scope="scope">
                            <el-button @click="changeState(scope.row)" :type="scope.row.state!=='00001002'?'danger':'' " size="mini" >{{scope.row.state | statusBtnTxt}}</el-button>
                            <el-button size="mini" @click="userEdit(scope.row)">用户编辑</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </div>
                <myPackage v-if='packTotal' :key='packTotal' :pageTotal='packTotal' @handleCurrent="handleCurrentFunc"></myPackage>
            </div> 
         </div>

         <el-dialog
            :title='userType'
            :visible.sync="dialogVisible"
            width="50%"
           >
            <div class="userList-cont userList-top">
               <div>
                    <el-row>
                        <el-col :span="4"> <span class='title'> <span class='my-span-notice'>*</span>真实姓名：</span></el-col>
                        <el-col :span="10"><el-input class='search-cont' v-model="addUser.userName" maxlength="30" show-word-limit clearable placeholder="请输入内容"></el-input></el-col>
                    </el-row>
               </div>
               <div class='mt20'>
                    <el-row>
                        <el-col :span="4"><span class='title'><span class='my-span-notice'>*</span> 手机号：</span></el-col>
                        <el-col :span="10">
                            <el-input class='search-cont' v-model="addUser.userTel" maxlength="11" show-word-limit clearable placeholder="请输入内容"></el-input>
                        </el-col>
                    </el-row>
               </div>
                <div class='mt20'>
                    <el-row>
                        <el-col :span="4"><span class='title'><span class='my-span-notice'>*</span> 用户角色：</span></el-col>
                        <el-col :span="10">
                            <div class='search-cont'>
                                <el-select v-model="addUser.roleNo" placeholder="请选择">
                                    <el-option
                                    v-for="item in userRoleOpn"
                                    :key="item.roleNo"
                                    :label="item.roleName"
                                    :value="item.roleNo">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                    </el-row>
               </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="userSureBtn">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>
<script>
import {menuSetData,myConfirm} from '../../../until/until'
import myBrea from "../../../components/headerCrumb.vue"
import myPackage from "../../../components/package.vue"
export default {
    name:"userlist",
    data(){
        return{ 
            userRoleOpn:[],
            roleTypeOpn:[],
            dialogVisible:false,
            userType:"",
            val:'',
            packTotal:1,
            tableHeader:[{prop:"loginName",label:'用户名'},{prop:"roleName",label:'角色'},{prop:"loginName",label:'真实姓名'},{prop:"userTel",label:'电话'},{prop:"",label:'角色状态'}],
            brea:[{"name":"系统管理","url":""},{"name":"用户管理","url":""}],
            tableData:[],
            addUser:{
                loginName:"",
                userTel:"",
                userName:"",
                roleNo:"",
                userId:""
            },
            search:{
                pageNo:1,
                pageSize:10,
                realName:'',
                state:'',
                roleNo:"",
            }
        }
    },
    components:{
        myBrea,
        myPackage
    },
    methods:{
        async getCodeValue (type){
            await this.$store.dispatch("SystemModule/GET_CODE_VALUE",{codeTypes:type});
            let  data = this.$store.state.SystemModule.GET_CODE_VALUE
            this.roleTypeOpn = data.out.state
        },
        async userList (){
            await this.$store.dispatch("SystemModule/USER_GET_LIST",this.search);
            let  data = this.$store.state.SystemModule.USER_GET_LIST;
            this.tableData =data.out.list;
            this.packTotal = data.out.totalSize
        },
        async addUserFun (postData){
            await this.$store.dispatch("SystemModule/USER_SAVE",postData);
            let  data = this.$store.state.SystemModule.USER_SAVE
            this.$message.success("操作成功")
            this.userList();
            this.dialogVisible=false;
        },
        async getRoleList(){
            await this.$store.dispatch("SystemModule/GET_ROLE_LIST",{state: "00001001"});
            let data = this.$store.state.SystemModule.GET_ROLE_LIST;
            this.userRoleOpn = data.out.list
        },
        addUserBtn(){
            this.addUser={
                loginName:"",
                userTel:"",
                userName:"",
                roleNo:"",
                userId:""
            }
            this.dialogVisible=true
        },
        userEdit(row){
            let newObj= Object.assign({},row);
            this.addUser = newObj;
            this.dialogVisible=true
        },
        userSureBtn(){
            if(!this.addUser.userName){
                this.$message.warning("请输入真实姓名");
                return;
            }
            if(!this.addUser.userTel){
                this.$message.warning("请输入手机号");
                return;
            }
            if(!this.addUser.roleNo){
                this.$message.warning("请选择角色");
                return;
            }
            this.addUserFun(this.addUser)
        },
        changeState(row){
            let postData={
                userId:row.userId,
                state:row.state=='00001001'?'00001002':'00001001'
            }
            let _this = this;
            myConfirm(_this,`是否${row.state=='00001001'?'禁用':'启用'}该用户？`,function(){
                _this.addUserFun(postData)
            }) 
        },
        searchBtn(){
            this.userList();
        },
        handleCurrentFunc(pageNo){
            this.search.pageNo = pageNo;
            this.userList();
        },
        clearFun(str){
            this.search[str] ='';
             this.userList();
        },
        handleClose(done) {
            done();
        }
    },
    created(){
        this.getCodeValue("state");
        this.getRoleList();
        this.userList();
    },
    filters:{}
}
</script>
<style lang="scss">
    .userList-cont{
       @extend %pageCont;
       background-color: #fff;
       padding: 20px;
    }
</style>