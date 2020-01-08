<template>
    <div class="role-page">
        <myBrea :crumb-ary='brea'></myBrea>
        <div class="role-cont">
             <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <span class='title'> 角色：</span>
                        <span style="display: inline-block;">
                            <el-input clearable @clear="clearBtn('roleName')" v-model="searchData.roleName" placeholder="请输入内容"></el-input>
                        </span>
                    </el-form-item>
                    <el-form-item>
                       <span class='title'> 类型：</span>
                        <!-- <div class='search-cont'> -->
                            <el-select v-model="searchData.roleType" clearable @clear="clearBtn('roleType')" placeholder="请选择">
                                <el-option
                                v-for="item in roleTypeOpn"
                                :key="item.codeValueId"
                                :label="item.codeValueName"
                                :value="item.codeValueId">
                                </el-option>
                            </el-select>
                        <!-- </div> -->
                    </el-form-item>
                    <el-form-item>
                       <span class='title'> 状态：</span>
                        <!-- <div class='search-cont'> -->
                            <el-select v-model="searchData.state" clearable @clear="clearBtn('state')" placeholder="请选择">
                                <el-option
                                v-for="item in roleStatusOpn"
                                :key="item.codeValueId"
                                :label="item.codeValueName"
                                :value="item.codeValueId">
                                </el-option>
                            </el-select>
                        <!-- </div> -->
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain @click="queryRoleClick">查询角色</el-button>
                        <el-button type="primary" @click="addRoleClick">添加角色</el-button>
                    </el-form-item>
             </el-form>
            <div class="role-table">
                <el-divider content-position="left">角色列表</el-divider>
                <div v-if='tableData.length>0' class="table-cont">
                    <el-table
                        :data="tableData"
                        border
                        style="width: 100%">

                        <el-table-column
                        v-for="(itm,index) in tableHeader"
                            :key="index"
                            :prop="itm.prop"
                            :label="itm.label"
                        >
                        </el-table-column>
                        <el-table-column
                             label="添加时间"
                          >
                             <template v-if='scope.row.insTime' slot-scope="scope">
                                 <span>{{scope.row.insTime | dateformat}}</span>
                             </template>
                        </el-table-column>
                        <el-table-column
                             label="类型"
                          >
                             <template v-if='scope.row.roleType' slot-scope="scope">
                                 <span>{{typeChange(scope.row.roleType) }}</span>
                             </template>
                        </el-table-column>

                          <el-table-column
                             label="状态"
                          >
                             <template v-if='scope.row.roleType' slot-scope="scope">
                                 <span>{{statuChange(scope.row.state) }}</span>
                             </template>
                        </el-table-column>
                        
                        <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                        <template slot-scope="scope">
                            <el-button :type="scope.row.state!=='00001002'?'danger':'' " size="mini" @click="RoleStatusClick(scope.row)">{{scope.row.state | statusBtnTxt}}</el-button>
                            <el-button size="mini" @click="RoleEditorClick(scope.row)">菜单编辑</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                    <myPackage v-if='packTotal' :key='packTotal' :pageTotal='packTotal' @handleCurrent="handleCurrentFunc"></myPackage>

                </div>
                <div v-else style='width:50%;margin-left:25%'>
                    <dataTrip tripType="1"></dataTrip>
                </div>
            </div>
        </div>
        <el-dialog
            title="角色编辑"
            :visible.sync="roleEditor"
            width="50%"
           >
            <div>
                <div class='elTree'>
                    <el-tree
                    :data="myMenu"
                    :props="defaultProps"
                    :default-checked-keys='isRole'
                    default-expand-all
                    accordion
                    node-key="menuNo"
                    ref='tree'
                    show-checkbox
                    >
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span>{{ node.label }}</span>
                            <span>{{data.state=='00001001'?" [正常]":" [失效]" }}</span>
                        </span>
                    </el-tree>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="roleEditor = false">取 消</el-button>
                <el-button type="primary" @click="saveUserMenuClick">确 定</el-button>
            </span>
        </el-dialog>
         <!-- 添加角色 -->
        <el-dialog
            title="添加角色"
            :visible.sync="roleVisible"
            width="40%"
           >
            <div class=''>
                <el-row class='mt20'>
                     <el-col class='txt-right' :span="4">
                        <span class='my-span-notice'>*</span> 角色：
                     </el-col>
                      <el-col :span="10">
                         <el-input class='search-cont' v-model="saveRoleData.roleName" maxlength="16" show-word-limit clearable placeholder="请输入内容"></el-input>
                     </el-col>
                </el-row>
                <el-row class='mt20'>
                    <el-col class='txt-right' :span="4">
                    <span class='my-span-notice'>*</span> 类型：
                    </el-col>
                    <el-col :span="10">
                        <el-select v-model="saveRoleData.roleType" placeholder="请选择">
                            <el-option
                            v-for="item in roleTypeOpn"
                            :key="item.codeValueId"
                            :label="item.codeValueName"
                            :value="item.codeValueId">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="roleVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRoleSure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {menuSetData,myConfirm} from '../../../until/until'

import myBrea from "../../../components/headerCrumb.vue"
import myPackage from '../../../components/package.vue'
export default {
    name:"role",
    data(){
        return{
            roleVisible:false,
            input:"",
            searchData:{
                // role:'',
                state:'',
                pageNo:"1",
                pageSize:10,
                roleName:"",
                roleType:""
            },
             myMenu:[],
             isRole:[],
             defaultProps: {
                children: 'children',
                label: 'menuName'
            },
             tableData:[],
            // roleType:"",
            roleStatusOpn:[],
            roleTypeOpn:[],
            tableHeader:[
                { prop: "roleName", label: "角色" },
                // { prop: "insertTime", label: "添加时间" },
                // { prop: "roleType", label: "类型" },
                // { prop: "status", label: "状态" },
            ],
            roleEditor:false,
            brea:[{"name":"系统管理","url":""},{"name":"角色管理","url":""}],
            roleId:"",
            packTotal:1,
            saveRoleData:{
                roleName:"",
                roleType:""
            }
        }
    },
    
    components:{
        myBrea,
        myPackage
    },
    methods:{
        async getRoleList(){
            await this.$store.dispatch("SystemModule/GET_ROLE_LIST",this.searchData);
            let data = this.$store.state.SystemModule.GET_ROLE_LIST;
            this.tableData = data.out.list
            this.packTotal = parseInt(data.out.totalSize)
        },
        async getCodeValue (type){
            await this.$store.dispatch("SystemModule/GET_CODE_VALUE",{codeTypes:type});
            let  data = this.$store.state.SystemModule.GET_CODE_VALUE
            if(data.status!=200){
                this.$message.error(data.message)
                return;
            }
            this.roleTypeOpn = data.out.roleType;
            this.roleStatusOpn= data.out.state;
            let allData={
                codeValueName: "全部",
                codeValueId: "",
                codeTypeId: "",
                insertTime: "",
                insertUserId: "",
                status: "",
                updateTime: null,
            };
             this.roleTypeOpn.unshift(allData);
             this.roleStatusOpn.unshift(allData);
        },
        async saveRole(){
            await this.$store.dispatch("SystemModule/POST_SAVE_ROLE",this.saveRoleData);
            let data = this.$store.state.SystemModule.POST_SAVE_ROLE
            if(data.status != 200){
                this.$message.error(data.msg);
                return;
            }
            this.$message.success("添加角色成功");
            this.searchData={
                // role:'',
                status:'',
                pageNo:"",
                pageSize:10,
                roleName:"",
            };
            this.getRoleList();
            this.roleVisible = false;
        },
        async delRole(roleid){
            await this.$store.dispatch("SystemModule/DEL_DELETE_ROLE",{roleNo:roleid});
            let data = this.$store.state.SystemModule.DEL_DELETE_ROLE
            // if(data.status != 200){
            //     this.$message.error("操作失败,请稍后重试");
            //     return
            // }
            this.$message.success("禁用角色成功");
            this.getRoleList();
        },
        async putRole(roleid){
            await this.$store.dispatch("SystemModule/PUT_ENABLE_ROLE",{roleNo:roleid});
             let data = this.$store.state.SystemModule.PUT_ENABLE_ROLE
             if(data.status != 200){
                this.$message.error("操作失败,请稍后重试");
                return
            }
            this.$message.success("启用角色成功");
            this.getRoleList();
        },
        async getUserRole(roleid,type){
            this.isRole=[];
            await this.$store.dispatch("SystemModule/GET_USER_ROLE_LIST",{roleNo:roleid,roleType:type});
             let data = this.$store.state.SystemModule.GET_USER_ROLE_LIST
             if(data.status != 200){
                this.$message.error("操作失败,请稍后重试");
                return
            }
            this.myMenu = menuSetData(data.out.allMenus);
           
            if(data.out.roleMenus){
               
                for(let i=0;i<data.out.roleMenus.length;i++){
                    // this.isRole.push(data.out.roleMenus[i])
                    if(data.out.roleMenus[i].nodeLv!=1){
                         this.isRole.push(data.out.roleMenus[i].menuNo)
                    }
                    if(data.out.roleMenus[i].menuNo =='1757729677056'){
                         this.isRole.push(data.out.roleMenus[i].menuNo)
                    }
                }
                // console.log(this.isRole)
                // this.isRole = data.out.roleMenus
            };
            
            
        },
        async saveUserRole(ids){
            await this.$store.dispatch("SystemModule/POST_SAVE_USER_MENU",{menuIds:ids,roleNo:this.roleId});
             let data = this.$store.state.SystemModule.POST_SAVE_USER_MENU
             if(data.status != 200){
                this.$message.error("操作失败,请稍后重试");
                return
            }
            this.$message.success("编辑角色菜单成功");
            this.getRoleList();
            this.roleEditor = false;
            // this.myMenu = menuSetData(data.out.allMenus);
            
        },
        RoleEditorClick(row){
            this.getUserRole(row.roleNo,row.roleType)
            this.roleId = row.roleNo
            this.roleEditor = true;
        },
        RoleStatusClick(row){
            let _this = this;
            if(row.state =="00001001"){//正常
                myConfirm(_this,"是否禁用该角色？",function(){
                     _this.delRole(row.roleNo);
                })
            }else{
                 myConfirm(_this,"是否启用该角色？",function(){
                      _this.putRole(row.roleNo);
                })
            }
        },
        addRoleClick(){
            this.saveRoleData={
                roleName:"",
                roleType:""
            };
            this.roleVisible = true
        },
        addRoleSure(){
            if(!this.saveRoleData.roleName){
                this.$message.warning("请填写角色名称");
                return
            }
             if(!this.saveRoleData.roleType){
                this.$message.warning("请选择角色类型");
                return
            }

            this.saveRole()
        },
        queryRoleClick(){
            this.getRoleList();
        },
       saveUserMenuClick(){
           let checkId = this.$refs.tree.getCheckedKeys()
           this.saveUserRole(checkId.join(","))
       },
       handleCurrentFunc(val){
           this.searchData.pageNo = val;
           this.getRoleList();
       },
       clearBtn(str){
            this.searchData[str] = '';
            this.getRoleList();
       }
    },
    computed:{
       typeChange(){
           let _this = this;
            return function (data) {
                let nam=''
                _this.roleTypeOpn.map((val,index)=>{
                    if(val.codeValueId == data){
                        nam = val.codeValueName
                    }
                })
                return nam
            }
        },
        statuChange(){
            let _this = this;
             return function (data) {
                let nam=''
                _this.roleStatusOpn.map((val,index)=>{
                    if(val.codeValueId == data){
                        nam = val.codeValueName
                    }
                })
                return nam
            }

        }
      // 控制显示的内容
     
    },
    created(){
        this.getRoleList();
        this.getCodeValue("roleType,state")
    },
    filters:{
        roleTypeFter(val){
            return 'mmm'
            // console.log( this.roleTypeOpn)
            //  if(val){
            //         this.roleTypeOpn.map((val,inx)=>{
            //         if(val == val.codeValueId){
            //           return val.codeValueName
            //         }
            //     })
            // }
        }
    }
}
</script>
<style lang="scss">
    .role-page{
        
        .role-cont{
          @extend %pageCont;
          background-color: #fff;
           padding: 20px;
            color: #333;
            .userSearch{
                // @extend %topSearch;
                display: inline-block;
                vertical-align: top;
                box-sizing: border-box;
                height: 50px;
                line-height: 50px;
                margin: 0 15px;
                margin-bottom: 20px;
                // width: 80%;
                .title{
                    width: 70px;
                    display: inline-block;
                    vertical-align: top;
                }
                .search-cont{
                    display: inline-block;
                    vertical-align: top;
                    width: calc(100% - 80px);
                }
            }
            .table-cont{
                // @extend %tableborder;
            }
           
        }
        .txt-right{
            text-align: right;
            line-height: 40px;
            padding-right: 20px;
        }
    }
</style>