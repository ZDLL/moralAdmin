<template>
    <div class="insideTarget">
        <myBrea :crumb-ary="brea"></myBrea>
        <div class="inside">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="70px">
                <el-form-item label="指标编号">
                    <el-input v-model="formInline.id" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="指标名称">
                    <el-input v-model="formInline.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="指标类型">
                    <el-select v-model="formInline.quota_type" placeholder="请选择">
                        <el-option v-for="(item,index) in selectData.inIndexType" :key="index" :label="item.name"
                            :value="item.val"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务类型">
                    <el-select v-model="formInline.data_type" placeholder="请选择">
                        <el-option v-for="(item,index) in selectData.inIndexBusiType" :key="index" :label="item.name"
                            :value="item.val"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="指标定义">
                    <el-select v-model="formInline.quota_def" placeholder="请选择">
                        <el-option v-for="(item,index) in selectData.inIndexDefinition" :key="index" :label="item.name"
                            :value="item.val"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="formInline.status" placeholder="请选择">
                        <el-option v-for="(item,index) in selectData.status" :key="index" :label="item.name"
                            :value="item.val"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button type="warning" @click="reset">重置</el-button>
                    <el-button @click="openaddDialog">新增</el-button>
                </el-form-item>
            </el-form>
            <el-divider content-position="left">接口列表</el-divider>
            <el-table :data="dataList.list" stripe style="width: 100%" v-loading="loading">
                <el-table-column prop="id" label="指标编号" width='155' align='center'>
                </el-table-column>
                <el-table-column prop="name" label="指标名称" show-overflow-tooltip align='center'>
                </el-table-column>
                <el-table-column prop="quota_type" label="指标类型" align='center'>
                </el-table-column>
                <el-table-column prop="data_type" label="业务类型" align='center'>
                </el-table-column>
                <el-table-column prop="quato_def" label="指标定义" align='center'>
                </el-table-column>
                <el-table-column label="状态" align='center'>
                    <template slot-scope="scope">
                        {{scope.row.status | codeStatus}}
                    </template>
                </el-table-column>
                <el-table-column prop="admin" label="创建人" align='center'>
                </el-table-column>
                <el-table-column prop="time" show-overflow-tooltip label="创建时间" align='center'>
                </el-table-column>
                <el-table-column label="操作" width="350" align='left' fixed="right">
                    <template slot-scope="scope">
                        <el-button size='mini' :type="scope.row.status!=0?'danger':''" @click="isOpenstatus(scope.row)">{{scope.row.status|statusBtnTxt}}</el-button>
                        <el-button size='mini' @click="editInside(scope.row)">基本信息</el-button>
                        <el-button size='mini' v-show="scope.row.code ==1 || scope.row.code ==2" @click="mapping(scope.row)">指标映射</el-button>
                        <el-button size='mini' v-show="scope.row.code ==3 || scope.row.code ==2" @click="setRule(scope.row)">设置规则</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <myPackage v-if="dataList.count" :key="dataList.count" :pageCurrent='formInline.page' :pageTotal="dataList.count" @handleCurrent="handleCurrentFunc">
            </myPackage>
        </div>

        <addInsideTarget ref="addInsideTarget" @initData='initData'></addInsideTarget>
        <setupRule ref="setupRule"></setupRule>
    </div>
</template>

<script>
    import myBrea from '@/components/headerCrumb.vue'
    import myPackage from '@/components/package.vue'
    import setupRule from '@/components/insideTarget/setupRule.vue'
    import addInsideTarget from '@/components/insideTarget/addInsideTarget.vue'
    import {openMessagebox} from '@/until/until'
    export default {
        components: {
            myBrea,
            myPackage,
            setupRule,
            addInsideTarget,
        },
        data() {
            return {
                brea: [{
                    name: "内部指标",
                    url: ""
                }, {
                    name: "内部指标列表",
                    url: ""
                }],
                formInline: {
                    id: '',
                    name: '',
                    quota_type: '',
                    data_type: '',
                    quota_def: '',
                    status: '',
                    page: 1,
                    num: 10
                },
                selectData: {
                    inIndexBusiType: [],
                    inIndexDefinition: [],
                    inIndexType: [],
                    status: []
                },
                loading:true,
                dataList:{
                    list:[],
                    count:0,
                }
            }
        },
        created() {
            this.getSelectOpt();
            this.initData();
        },
        methods: {
            search() { // 查询
                this.initData();
            },
            reset() {
                this.formInline= {
                    id: '',
                    name: '',
                    quota_type: '',
                    data_type: '',
                    quota_def: '',
                    status: '',
                    page: 1,
                    num: 10
                },
                this.initData();
            },
            openaddDialog() { // 添加内部指标
                this.$refs.addInsideTarget.openDialog();
            },
            editInside(row){
                this.$refs.addInsideTarget.openDialog(row.id);
            },
            isOpenstatus(row) {  // 禁用启用
                let senddata ={
                    id:row.id,
                    status:row.status!=0?0:1
                }
                openMessagebox('变更状态',`<p class='center'>是否变更${row.name}的状态</p>`,async ()=>{
                    await this.$store.dispatch('insideTarget/CHANGE_INSIDE_STATU',senddata);
                    this.loading = true;
                    let getdata = this.$store.state.insideTarget.CHANGE_INSIDE_STATU;
                    this.initData();
                    getdata.status !=200?this.$message.error(getdata.message):this.$message.success(getdata.message);
                });
            },
            async initData() { // 获取列表
                this.loading = true;
                await this.$store.dispatch('insideTarget/GET_INSIDE_LIST',this.formInline);
                this.loading = false;
                this.dataList= this.$store.state.insideTarget.GET_INSIDE_LIST.out;
            },
            tosetRule() { // 打开编辑规则
                this.$refs.setupRule.openDialog();
            },
            mapping(row){    //  指标映射
                this.$router.push({name:'indexMap',query:{mapId:row.id}});
            },
            setRule(row){     //  设置规则

            },
            handleCurrentFunc(num){     //  跳转页数
                this.formInline.page = num;
                this.initData();
            },
            async getSelectOpt() { //  下拉框选项数据
                await this.$store.dispatch('insideTarget/GET_INSIDE_SELECT', {});
                this.selectData = this.$store.state.insideTarget.GET_INSIDE_SELECT.out;
            }
        }
    }
</script>

<style lang='scss'>
    .insideTarget {
        box-sizing: border-box;

        .inside {
            background-color: #fff;
            padding: 20px;
            margin: 15px 0;
            border-radius: 6px;
        }

        .demo-form-inline .el-input__inner {
            width: 205px;
        }
    }

    .center {
        text-align: center;
    }
</style>