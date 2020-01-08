<template>
    <el-dialog class="addindexMap" title="外部指标列表" :visible.sync="dialogVisible" width="80%" :before-close="handleClose" @open='outsideindex' @closed="closeClear">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="70px">
            <el-form-item label="指标编号">
                <el-input v-model="formInline.o_id" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="指标名称">
                <el-input v-model="formInline.o_name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="指标类型">
                <el-select v-model="formInline.target_type" placeholder="请选择">
                    <el-option v-for="(item,index) in selectData.outIndexType" :key="index" :label="item.name" :value="item.val">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="指标定义">
                <el-select v-model="formInline.target_def" placeholder="请选择">
                    <el-option v-for="(item,index) in selectData.outIndexDefinition" :key="index" :label="item.name" :value="item.val">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="业务类型">
                <el-select v-model="formInline.data_type" placeholder="请选择">
                    <el-option v-for="(item,index) in selectData.outIndexBusiType" :key="index" :label="item.name" :value="item.val">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="接口名称">
                <el-input v-model="formInline.f_name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="seachMap">筛选</el-button>
                <el-button type="warning" @click="resetMap">重置</el-button>
                <el-button type="primary" @click="addMap" :loading="btnloading">添加</el-button>
            </el-form-item>
        </el-form>
        <!-- <el-divider content-position="left">外部指标列表</el-divider> -->
        <el-table ref="multipleTable" max-height="450" v-loading='loading' :data="tableData.list" stripe tooltip-effect="dark" style="width: 100%" @row-click="clickRow" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align='left'>
            </el-table-column>
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
            <el-table-column label="指标状态" align='center'>
                <template slot-scope="scope">
                    {{scope.row.status | codeStatus}}
                </template>
            </el-table-column>
        </el-table>
        <myPackage v-if="tableData.count" :key="tableData.count" :pageCurrent='formInline.page' :pageTotal="tableData.count" @handleCurrent="handleCurrentFunc">
            </myPackage>
    </el-dialog>
</template>

<script>
import myPackage from '@/components/package.vue'
    export default {
        components:{
            myPackage
        },
        data() {
            return {
                dialogVisible: false,
                loading: false,
                btnloading: false,
                formInline: {
                    id: '', //  内部指标编号
                    o_id: '', //  指标编号
                    o_name: '', //  指标名称
                    target_type: '', //  指标类型
                    data_type: '', //  业务类型
                    target_def: '', //  指标定义
                    f_name: '', //  接口名称
                    page: 1,
                    num: 10
                },
                tableData:{
                    count:0,
                    list:[]
                },
                selectData:{
                    outIndexType:[],   //  指标类型
                    outIndexDefinition:[],   //  指标定义
                    outIndexBusiType:[]   //  业务类型
                },
                multipleSelection: []
            }
        },
        created(){
            this.formInline.id = this.$route.query.mapId;
            this.getoutTarget();
        },
        methods: {
            openDialog() {
                this.dialogVisible = true;
            },
            async getoutTarget(){    //  获取下拉框选项数据
                await this.$store.dispatch('TargetModule/DATA_TARGET_SELECT',{});
                this.selectData = this.$store.state.TargetModule.DATA_TARGET_SELECT.out;
            },
            async outsideindex(){   //   获取外部指标列表
                this.loading = true;
                await this.$store.dispatch('insideTarget/GET_OUT_TARGET',this.formInline);
                this.loading = false;
                this.tableData = this.$store.state.insideTarget.GET_OUT_TARGET.out;
            },
            async addMap(){    //  添加外部指标事件
                if(this.multipleSelection.length<=0){
                    this.$message.error('请选择外部指标');
                    return;
                }
                this.btnloading = true;
                let senddata = {
                    id:this.$route.query.mapId,
                    target_id:JSON.stringify(this.multipleSelection.map(item=>item.o_id))
                }
                await this.$store.dispatch('insideTarget/ADD_MAP_TARGET',senddata);
                this.btnloading = false;
                let getdata = this.$store.state.insideTarget.ADD_MAP_TARGET;
                this.$message.success(getdata.message);
                this.$emit('initData');
                this.dialogVisible = false;
            },
            seachMap(){    //  查询外部指标
                this.formInline.page = 1;
                this.outsideindex();
            },
            resetMap(){     //  重置查询条件
                this.formInline= {
                    id:this.$route.query.mapId,
                    o_id: '', //  指标编号
                    o_name: '', //  指标名称
                    target_type: '', //  指标类型
                    data_type: '', //  业务类型
                    target_def: '', //  指标定义
                    f_name: '', //  接口名称
                    page: 1,
                    num: 10
                }
                this.outsideindex();
            },
            clickRow(row){
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            handleSelectionChange(val){    //  获取选中项
                this.multipleSelection = val;
            },
            handleCurrentFunc(num){     //  跳转页数
                this.formInline.page = num;
                this.outsideindex();
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            closeClear(){     //  关闭弹窗时初始化数据
                this.formInline= {
                    id:this.$route.query.mapId,
                    o_id: '', //  指标编号
                    o_name: '', //  指标名称
                    target_type: '', //  指标类型
                    data_type: '', //  业务类型
                    target_def: '', //  指标定义
                    f_name: '', //  接口名称
                    page: 1,
                    num: 10
                }
                this.tableData={
                    count:0,
                    list:[]
                }
                this.btnloading = false;
                this.$refs.multipleTable.clearSelection();
            }
        }
    }
</script>

<style lang='scss'>

</style>