<template>
    <div class="interfaceList">
        <myBrea :crumb-ary="brea"></myBrea>
        <div class="interface">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="接口编号">
                    <el-input v-model="formInline.number" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="接口名称">
                    <el-input v-model="formInline.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="渠道来源">
                    <el-select v-model="formInline.channel" placeholder="请选择">
                        <el-option v-for="(item,index) in checkboxData.out.channel" :key="index" :label="item.name"
                            :value="item.val"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接口版本">
                    <el-input v-model="formInline.edition" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="接口状态">
                    <el-select v-model="formInline.status" placeholder="请选择">
                        <el-option v-for="(item,index) in checkboxData.out.status" :key="index" :label="item.name"
                            :value="item.val"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchInterface">查询</el-button>
                    <el-button type="warning" @click="resetInterface">重置</el-button>
                    <el-button @click="openDialog">新增</el-button>
                </el-form-item>
            </el-form>
            <el-divider content-position="left">接口列表</el-divider>
            <el-table :data="dataList.list" stripe style="width: 100%" v-loading="loading">
                <el-table-column prop="num" label="接口编号" align='center'>
                </el-table-column>
                <el-table-column prop="name" label="接口名称" align='center'>
                </el-table-column>
                <el-table-column prop="channel" label="渠道来源" align='center'>
                </el-table-column>
                <el-table-column prop="version" label="接口版本" align='center'>
                </el-table-column>
                <el-table-column prop="unit" label="单价" align='center'>
                </el-table-column>
                <el-table-column label="接口状态" align='center'>
                    <template slot-scope="scope">
                        {{scope.row.status | codeStatus}}
                    </template>
                </el-table-column>
                <el-table-column prop="admin" label="创建人" align='center'>
                </el-table-column>
                <el-table-column prop="time" label="创建时间" align='center'>
                </el-table-column>
                <el-table-column label="操作" width="270" align='center'>
                    <template slot-scope="scope">
                        <el-button size='mini' :type="scope.row.status!=0?'danger':''" @click="isOpenstatus(scope.row)">{{scope.row.status|statusBtnTxt}}</el-button>
                        <el-button size='mini' @click="editInterface(scope.row)">基本信息</el-button>
                        <el-button size='mini' @click="tosetUp(scope.row)">参数设置</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <myPackage v-if="dataList.count" :key="dataList.count" :pageTotal="dataList.count"
                @handleCurrent="handleCurrentFunc"></myPackage>
        </div>
        <addInterface ref="addInterface" @initData=initData></addInterface>
    </div>
</template>

<script>
    import myBrea from '@/components/headerCrumb.vue'
    import addInterface from '@/components/addInterface/addInterface.vue'
    import myPackage from '@/components/package.vue'
    import {openMessagebox} from '@/until/until'
    export default {
        components: {
            myBrea,
            addInterface,
            myPackage,
        },
        data() {
            return {
                brea: [{
                    name: "接口管理 ",
                    url: ""
                }, {
                    name: "接口列表",
                    url: ""
                }],
                formInline: {
                    number: '',
                    name: '',
                    channel: '',
                    edition: '',
                    status: '',
                },
                dataList: {
                    list: [],
                    count: 0
                },
                checkboxData: {
                    out: {
                        channel: [],
                        status: [],
                    }
                },
                isopen: false,
                tableData: [],
                tablePage:1,
                loading:true
            }
        },
        created() {
            this.getChecboxData();
            this.initData();
        },
        methods: {
            async getChecboxData() {
                await this.$store.dispatch('DataModule/CHANGE_CHANNEL_LIST', {})
                this.checkboxData = this.$store.state.DataModule.CHANGE_CHANNEL_LIST;
            },
            async initData() {
                let data ={
                    page:this.tablePage,
                    num:10,
                    num_no:this.formInline.number,
                    name:this.formInline.name,
                    channel:this.formInline.channel,
                    version:this.formInline.edition,
                    status:this.formInline.status,
                }
                this.loading = true;
                await this.$store.dispatch('DataModule/DATA_LIST',data)
                this.loading = false;
                this.dataList = this.$store.state.DataModule.DATA_LIST.out;
            },
            searchInterface(){
                this.tablePage = 1;
                this.initData();
            },
            resetInterface(){
                this.tablePage = 1;
                this.formInline= {
                    number: '',
                    name: '',
                    channel: '',
                    edition: '',
                    status: '',
                },
                this.initData();
            },
            isOpenstatus(row) {  // 禁用启用
                let senddata ={
                    id:row.num,
                    status:row.status!=0?0:1
                }
                openMessagebox('变更状态',`<p class='center'>是否变更${row.name}的状态</p>`,async ()=>{
                    await this.$store.dispatch('DataModule/CHANGE_STATUS',senddata);
                    this.loading = true;
                    let getdata = this.$store.state.DataModule.CHANGE_STATUS;
                    this.initData();
                    return getdata.status !=200?this.$message.error(getdata.message):this.$message.success(getdata.message);
                });
            },
            editInterface(row){   //  查看编辑
                this.$refs.addInterface.openDialog(true,row.num)
            },
            openDialog() {      //  新增
                this.$refs.addInterface.openDialog(true);
            },
            tosetUp(row){ // 跳转参数设置页面
                this.$router.push({name:'setupParameter',query:{interId:row.num}})
            },  
            handleCurrentFunc(num){     //  跳转页数
                this.tablePage = num;
                this.initData();
            },
        }
    }
</script>

<style lang="scss">
    .interfaceList {
        box-sizing: border-box;

        .interface {
            background-color: #fff;
            padding: 20px;
            margin: 15px 0;
            border-radius: 6px;
        }

        .demo-form-inline .el-input__inner {
            width: 205px;
        }
        
    }
    .center{
        text-align: center;
    }
</style>