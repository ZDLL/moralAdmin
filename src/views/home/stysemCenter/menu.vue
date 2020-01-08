<template>
    <div class='menu-page'>
        <myBrea :crumb-ary='brea'></myBrea>
        <div class='menu-cont'>
            <div class="left">
                  <el-divider content-position="left">系统菜单</el-divider>
                  <div class="left-cont">
                      <!-- <el-button type="primary" plain @click="mainMenuClick">添加根菜单</el-button> -->
                        <div class='elTree'>
                            <el-button type="primary" style='margin-bottom:20px' @click="childMenuClick">添加子菜单</el-button>
                            <el-tree
                            :data="myMenu"
                            :props="defaultProps"
                            accordion
                            node-key="id"
                            default-expand-all
                            @node-click="handleNodeClick"
                            :expand-on-click-node="false"
                            >
                             <span class="custom-tree-node" slot-scope="{ node, data }">
                                 <span>{{ node.label }}</span>
                                 <span>{{data.state=='00001001'?" [正常]":" [失效]" }}</span>
                                <span>
                                    <!-- <el-button
                                        type="text"
                                        size="mini"
                                        @click.stop="() => append(data)">
                                        Append
                                    </el-button> -->
                                    <el-button
                                        style="margin-left:20px"
                                        type="text"
                                        size="mini"
                                        @click.stop="() => delmenu(node, data)">
                                        删除
                                    </el-button>
                                    </span>
                             </span>
                             
                            </el-tree>
                        </div>
                        
                  </div>
            </div>
            <div class="reight">
                 <el-divider content-position='left'>菜单详情</el-divider>
                 <div class='reight-cont'>
                    <!-- <el-row class='row-style'>
                        <el-col :span="6">菜单编号:</el-col>
                        <el-col :span="16"><el-input v-model="menuData.menuNo" placeholder="请输入内容"></el-input></el-col>
                    </el-row> -->
                    <el-row class='row-style'>
                        <el-col :span="6"><span class='my-span-notice'>*</span>系统类型:</el-col>
                        <el-col :span="16">
                             <el-select :disabled='selectDis' v-model="menuData.sysType" placeholder="请选择">
                                <el-option
                                v-for="item in sysTypeOpn"
                                :key="item.codeValueId"
                                :label="item.codeValueName"
                                :value="item.codeValueId">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row class='row-style'>
                        <el-col :span="6"><span class='my-span-notice'>*</span>菜单状态:</el-col>
                        <el-col :span="16">
                            <el-select v-model="menuData.state" placeholder="请选择">
                                <el-option
                                v-for="item in menuStatuOpn"
                                :key="item.codeValueId"
                                :label="item.codeValueName"
                                :value="item.codeValueId">
                                </el-option>
                            </el-select>

                        </el-col>
                    </el-row>
                    <el-row class='row-style'>
                        <el-col :span="6"><span class='my-span-notice'>*</span>菜单性质:</el-col>
                        <el-col :span="16">
                              <el-select v-model="menuData.menuType" placeholder="请选择">
                                <el-option
                                v-for="item in menuTypeOpn"
                                :key="item.codeValueId"
                                :label="item.codeValueName"
                                :value="item.codeValueId">
                                </el-option>
                            </el-select>
                        </el-col>
                       
                    </el-row>
                    
                    <el-row class='row-style'>
                        <el-col :span="6"><span class='my-span-notice'>*</span>菜单名称:</el-col>
                        <el-col :span="16"><el-input clearable v-model="menuData.menuName" maxlength="6" show-word-limit placeholder="请输入内容"></el-input></el-col>
                    </el-row>
                   
                    <el-row class='row-style' v-show ='menuData.menuType == "00005002"' >
                        <el-col :span="6"><span class='my-span-notice'>*</span>菜单链接:</el-col>
                        <el-col :span="16">
                            <el-input clearable maxlength="64" show-word-limit v-model="menuData.menuPath" placeholder="请输入内容"></el-input>
                            <!-- <my-notice :tip-txt='"请尽量使用英文"'></my-notice> -->
                        </el-col>
                    </el-row>
                    <el-row class='row-style'> 
                        <el-col :span="6"><span class='my-span-notice'>*</span>菜单排序:</el-col>
                        <el-col :span="16">
                            <el-input type="txt" v-onleyNumber clearable v-model="menuData.sortNo " placeholder="请输入内容"></el-input>
                            <!-- <my-notice :tip-txt='"输入0-99的数字排序，数字越小排序越靠前"'></my-notice> -->
                        </el-col>
                    </el-row>
                    <el-row class='row-style'>
                        <el-col :span="6">菜单图标:</el-col>
                        <el-col :span="16">
                            <el-input clearable v-model="menuData.iconPath" placeholder="el-icon-coin"></el-input>
                             <!-- <my-notice :tip-txt='"请参考https://element.eleme.cn/#/zh-CN/component/icon"'></my-notice> -->
                        </el-col>
                    </el-row>
                    <div style="text-align: center;margin-top:40px">
                        <el-button type="primary" @click="addMenuClick">保存菜单</el-button>
                    </div>
                    
                 </div>
            </div>
        </div>
    </div>
</template>
<script>
import {menuSetData,myConfirm} from '../../../until/until'
import myBrea from '../../../components/headerCrumb.vue'
let id = 1000;
export default {
    name:"mymenu",
    data(){
        return{
            myMenu:[],
            defaultProps: {
                children: 'children',
                label: 'menuName',
                id:"menuNo"
            },
            menuStatuOpn:[
                {
                    label:"正常",
                    value:1
                },
                {
                    label:"失效",
                    value:2
                }
            ],
            actionOpn:[],
            menuTypeOpn:[],
            sysTypeOpn:[],
            parentId:"",
            menuNo:"",
            nodeLv:"",
            isRoot:false,
            menuData:{
                //actionType: "",
               // authCode: "",
                insertUserId: '',
                iconPath: "",
                menuNo: "",
                menuName: "",
                sortNo: "",
                menuType: "",
                menuPath: "",
                nodeLv: "",
                parMenuNo: "",
                state: "",
                sysType:"",
            },
            input:'',
            brea:[{"name":"系统管理","url":""},{"name":"菜单管理","url":""}],
            selectDis:false
        }
    },
    components:{
       myBrea
    },
    methods:{
         async getMenu (){
            await this.$store.dispatch("SystemModule/MENU_GET_LIST",{});
            let  data = this.$store.state.SystemModule.MENU_GET_LIST
            if(data.out.allMenu.length>0){
                this.myMenu = menuSetData(data.out.allMenu,'menu');
            }
        },
        async getCodeValue (type){
            await this.$store.dispatch("SystemModule/GET_CODE_VALUE",{codeTypes:type});
            let  data = this.$store.state.SystemModule.GET_CODE_VALUE
            if(data.status!=200){
                this.$message.error(data.message)
                return;
            }
            this.menuStatuOpn =data.out.state
            //this.actionOpn = data.out.actionType
            this.menuTypeOpn = data.out.menuType
            this.sysTypeOpn =data.out.sysType
          
        },
        async saveMenu(postData){
            await this.$store.dispatch("SystemModule/POST_SAVE_MENU",postData);
            let  data = this.$store.state.SystemModule.POST_SAVE_MENU
            if(data.status!=200){
                this.$message.error(data.message)
                return;
            }
            this.$message.success("添加成功");
            this.menuData={
                //actionType: "",
                //authCode: "",
                insertUserId: '',
                iconPath: "",
                menuNo: "",
                menuName: "",
                sortNo: "",
                menuType: "",
                menuPath: "",
                nodeLv: "",
                parMenuNo: "",
                state: "",
            };
            this.getMenu();
        },
        async updataMenu(postData){
            await this.$store.dispatch("SystemModule/UPDAT_POST_MENU",postData);
            let  data = this.$store.state.SystemModule.UPDAT_POST_MENU
            if(data.status!=200){
                this.$message.error(data.message)
                return;
            }
            this.$message.success("更新成功");
            this.menuData={
               // actionType: "",
                //authCode: "",
                insertUserId: '',
                iconPath: "",
                menuNo: "",
                menuName: "",
                sortNo: "",
                menuType: "",
                menuPath: "",
                nodeLv: "",
                parMenuNo: "",
                state: "",
            };
            this.getMenu();
        },
        async delMenu(postData){
            await this.$store.dispatch("SystemModule/POST_DEL_MENU",postData);
            let  data = this.$store.state.SystemModule.POST_DEL_MENU
            if(data.status!=200){
                this.$message.error(data.message)
                return;
            }
            this.$message.success("删除成功");
            this.getMenu();
        },
        handleNodeClick(data){
            console.log(data)
            this.menuData = data
            this.parentId = data.parMenuNo;
            this.menuNo = data.menuNo
            this.nodeLv = data.nodeLv
            this.selectDis = true;
        },
        mainMenuClick(){
            this.isRoot = true
            this.menuData={
                //actionType: "",
                //authCode: "",
                // insertUserId: '',
                iconPath: "",
                menuNo: "",
                menuName: "",
                sortNo: "",
                menuType: "",
                // menuPath: "",
                // nodeLv: "",
                parMenuNo: "",
                state: "",
            }
        },
        childMenuClick(){
             this.menuData={
               // actionType: "",
                //authCode: "",
                // insertUserId: '',
                iconPath: "",
                menuNo: "",
                menuName: "",
                sortNo: "",
                menuType: "",
                // menuPath: "",
                // nodeLv: "",
                parMenuNo: "",
                state: "",
            }
            this.selectDis = false;
        },
        addMenuClick(){
            if(!this.menuData.menuType){
                this.$message.warning("请选择菜单性质");
                return;
            }
            if(!this.menuData.state){
                this.$message.warning("请选择菜单状态");
                return;
            }
            // if(!this.menuData.actionType){
            //     this.$message.warning("请选择菜单行为类型");
            //     return;
            // }
            if(!this.menuData.menuName){
                this.$message.warning("请输入菜单名称");
                return;
            }
            if(this.menuData.menuType == '00005002' && !this.menuData.menuPath){
                this.$message.warning("请输入菜单链接");
                return;
            }
            // if(!this.menuData.authCode){
            //     this.$message.warning("请输入授权代码");
            //     return;
            // }
            if( !this.menuData.sortNo ||
                this.menuData.sortNo<0 || 
                this.menuData.sortNo>99){
                this.$message.warning("菜单顺序请输入0~99的数字");
                return;
            }
           let postData={
                menuName:this.menuData.menuName,
                menuPath:this.menuData.menuPath,
                menuType:this.menuData.menuType,
               // actionType:this.menuData.actionType,
                iconPath:this.menuData.iconPath,
                parMenuNo:this.parentId,
                state:this.menuData.state,
                sortNo:this.menuData.sortNo,
                authCode:this.menuData.authCode,
                sysType:this.menuData.sysType,
                // nodeLv:this.nodeLv,
                type:this.isRoot?'root':""
            }
            if(this.menuData.menuNo){
                postData.menuNo = this.menuData.menuNo
                postData.parMenuNo = this.parentId;
                this.updataMenu(postData);
            }else{
               postData.parMenuNo = this.menuNo;
                this.saveMenu(postData);
            }
            
        },
        delmenu(node,data){
            let _this = this;
            
            if(data.state =='00001001'){
                this.$message.warning("该菜单正常状态，不能被删除");
                return;
            }
            myConfirm(_this,"是否删除该菜单？删除后不会显示在菜单栏",function(){
                _this.delMenu({menuNo:data.menuNo});
            })
        }
    },
    created(){
        this.getMenu();
        this.getCodeValue("menuType,state,sysType")
    },
    mounted(){}
}
</script>
<style lang="scss">
    .menu-page{
        .menu-cont{
         @extend %pageCont;
        background-color: #fff;
        padding: 20px;
            .left,.reight{
                display: inline-block;
                 width: 50%;
                vertical-align: top;
                box-sizing: border-box;
            }
            .elTree{
                width: 300px;
                overflow: hidden;
                margin-top: 20px;
            }
            .left-cont{
                padding-left: 40px;
            }
            .reight-cont{
                margin-top: 50px;
                .el-col-6{
                    text-align: right;
                    padding-right: 20px;
                }
            }
            .row-style{
                margin-top: 20px;
                line-height: 40px;
            }
        }
        
    }
</style>