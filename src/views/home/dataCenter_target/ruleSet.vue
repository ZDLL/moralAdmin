<template>
    <div class="ruleSet">
        <myBrea :crumb-ary="brea"></myBrea>
        <div class="ruleSet_box">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="指标编号">
                    <el-input v-model="targetId" placeholder="请输入" readonly></el-input>
                </el-form-item>
                <el-form-item label="指标名称">
                    <el-input v-model="targetName" placeholder="请输入" readonly></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="openAddpopup">新增规则</el-button>
                </el-form-item>
            </el-form>
            <el-divider content-position="left">参数列表</el-divider>
            <el-table :data="dataList.list" stripe style="width: 100%" v-loading="loading">
                <el-table-column prop="para_id" label="参数编号" align='center'>
                </el-table-column>
                <el-table-column prop="para_name" label="参数名称" align='center'>
                </el-table-column>
                <el-table-column prop="rule_type" label="条件类型" align='center'>
                </el-table-column>
                <el-table-column prop="rule_val" label="条件属性" align='center'>
                </el-table-column>
                <el-table-column label="状态" align='center'>
                    <template slot-scope="scope">
                        {{scope.row.status | codeStatus}}
                    </template>
                </el-table-column>
                <el-table-column prop="real_name" label="创建人" align='center'>
                </el-table-column>
                <el-table-column prop="time" label="创建时间" align='center'>
                </el-table-column>
                <el-table-column label="操作" width="170" align='center'>
                    <template slot-scope="scope">
                        <el-button size='mini' :type="scope.row.status!=0?'danger':''" @click="isOpenstatus(scope.row)">{{scope.row.status|statusBtnTxt}}</el-button>
                        <el-button size='mini' @click="delRuleset(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <myPackage v-if="dataList.count" :key="dataList.count" :pageTotal="dataList.count"
                @handleCurrent="handleCurrentFunc"></myPackage>
        </div>
        <addTargetrule ref="addTargetrule" @RefreshData='RefreshData'></addTargetrule>
    </div>
</template>

<script>
    import myBrea from '@/components/headerCrumb.vue'
    import addTargetrule from '@/components/target_poup/addTargetrule.vue'
    import myPackage from '@/components/package.vue'
    import {openMessagebox} from '@/until/until'
    export default {
        components: {
            myBrea,
            myPackage,
            addTargetrule
        },
        data() {
            return {
                brea: [{
                    name: "指标管理 ",
                    url: "/target"
                }, {
                    name: "规则设置",
                    url: ""
                }],
                loading:false,
                dataList:{
                    list:[],
                    count:0
                },
                tablePage:1,
                targetId:'',
                targetName:'',
                pupopList:[],
            }
        },
        created(){
            this.targetId = this.$route.query.targetId;
            this.getRulesetInfo()
            this.getRulesetData()
        },
        methods: {
            async getRulesetInfo(){   //  获取参数数据
                let senddata = {
                    target_id:this.targetId
                }
                await this.$store.dispatch('TargetModule/GET_TARGET_RULETREEINFO',senddata);
                let getdata = this.$store.state.TargetModule.GET_TARGET_RULETREEINFO.out;
                this.targetName = getdata.name;
                this.pupopList = getdata.list;
            },
            async getRulesetData(){    //   获取列表
                let senddata = {
                    page:this.tablePage,
                    num:10,
                    target_id:this.targetId
                }
                this.loading = true;
                await this.$store.dispatch('TargetModule/GET_TARGET_RULE',senddata);
                this.loading = false;
                this.dataList = this.$store.state.TargetModule.GET_TARGET_RULE.out;
            },
            isOpenstatus(row){   //  改变指标规则状态
                let senddata = {
                    id:row.id,
                    status:row.status!=0?0:1
                }
                this.changeStatus(senddata,row.para_name);
            },
            delRuleset(row){     //   删除指标规则
                let senddata = {
                    id:row.id,
                    status:2
                }
                this.changeStatus(senddata,row.para_name);
            },  
            changeStatus(data,name){
                let title,msg;
                if(data.status!=2){
                    title = '改变状态';
                    msg = `<p class='center'>是否变更${name}的状态</p>`;
                }else{
                    title = '删除';
                    msg = `<p class='center'>是否删除${name}</p>`;
                }
                openMessagebox(title,msg,async ()=>{
                    this.loading = true;
                    await this.$store.dispatch('TargetModule/CHANGE_TARGRT_RULE',data);
                    let getdata = this.$store.state.TargetModule.CHANGE_TARGRT_RULE;
                    this.$message.success(getdata.message);
                    this.getRulesetData();
                })
            },
            handleCurrentFunc(num){     //  跳转页数
                this.tablePage = num;
                this.getRulesetData();
            },
            openAddpopup(){      //   打开新增规则弹窗
                this.$refs.addTargetrule.openDialog();
            },
            RefreshData(){      //  添加规则后重置table数据
                this.tablePage = 1;
                this.getRulesetData();
            }
        }
    }
</script>

<style lang='scss'>
    .ruleSet {
        box-sizing: border-box;
        .ruleSet_box {
            background-color: #fff;
            padding: 20px;
            margin: 15px 0;
            border-radius: 6px;
        }
    }
    .center{
        text-align: center;
    }
</style>