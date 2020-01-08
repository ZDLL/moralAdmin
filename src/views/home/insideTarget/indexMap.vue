<template>
    <div class="indexMap">
        <myBrea :crumb-ary="brea"></myBrea>
        <div class="indexMap_box">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px">
                <el-form-item label="内部指标编号">
                    <el-input v-model="formInline.id" readonly placeholder="不可编辑"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="openaddDialog">添加外部指标</el-button>
                </el-form-item>
            </el-form>
            <el-divider content-position="left">指标映射列表</el-divider>
            <el-table :data="tableData.list" stripe style="width: 100%" v-loading='loading'>
                <el-table-column prop="o_id" label="指标编号" show-overflow-tooltip align='center'>
                </el-table-column>
                <el-table-column prop="o_name" label="指标名称" align='center'>
                </el-table-column>
                <el-table-column prop="f_name" label="接口名称" align='center'>
                </el-table-column>
                <el-table-column prop="target_type" label="指标类型" align='center'>
                </el-table-column>
                <el-table-column prop="data_type" label="业务类型" align='center'>
                </el-table-column>
                <el-table-column prop="target_def" label="指标定义" align='center'>
                </el-table-column>
                <el-table-column label="使用状态" align='center'>
                    <template slot-scope="scope">
                        {{scope.row.status | codeStatus}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align='center'>
                    <template slot-scope="scope">
                        <el-button size='mini' :type="scope.row.status!=0?'danger':''" @click="isOpenstatus(scope.row)">{{scope.row.status|statusBtnTxt}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <myPackage v-if="tableData.count" :key="tableData.count" :pageCurrent='formInline.page' :pageTotal="tableData.count" @handleCurrent="handleCurrentFunc">
            </myPackage>
        </div>
        <addindexMap ref="addindexMap" @initData='initData'></addindexMap>
    </div>
</template>

<script>
    import myBrea from '@/components/headerCrumb.vue'
    import addindexMap from '@/components/insideTarget/addindexMap.vue'
    import myPackage from '@/components/package.vue'
    import {openMessagebox} from '@/until/until'
    export default {
        components: {
            myBrea,
            addindexMap,
            myPackage,
        },
        data() {
            return {
                brea: [{
                    name: "内部指标",
                    url: "/insideTarget"
                }, {
                    name: "指标映射",
                    url: ""
                }],
                formInline: {
                    id: '',
                    page:1,
                    num:10
                },
                tableData:{
                    list:[],
                    count:0
                },
                loading:false
            }
        },
        created() {
            this.formInline.id = this.$route.query.mapId;
            this.initData();
        },
        methods: {
            openaddDialog() {
                this.$refs.addindexMap.openDialog();
            },
            async initData(){
                this.loading = true;
                await this.$store.dispatch('insideTarget/GET_MAP_LIST',this.formInline);
                this.loading = false;
                this.tableData = this.$store.state.insideTarget.GET_MAP_LIST.out;
            },
            isOpenstatus(row) {  // 禁用启用
                let senddata ={
                    k_id:row.k_id,
                    status:row.status!=0?0:1
                }
                console.log(row);
                openMessagebox('变更状态',`<p class='center'>是否变更${row.o_name}的状态</p>`,async ()=>{
                    this.loading = true;
                    await this.$store.dispatch('insideTarget/CHANGE_MAP_STATUS',senddata);
                    let getdata = this.$store.state.insideTarget.CHANGE_MAP_STATUS;
                    this.initData();
                    getdata.status !=200?this.$message.error(getdata.message):this.$message.success(getdata.message);
                });
            },
            handleCurrentFunc(num){     //  跳转页数
                this.formInline.page = num;
                this.outsideindex();
            },
        }
    }
</script>

<style lang='scss'>
    .indexMap {
        box-sizing: border-box;

        .indexMap_box {
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