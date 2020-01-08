<template>
    <el-dialog class="addInterface" :title="dialogName" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" @closed="closeClear('ruleForm')">
        <el-form :inline="true" label-position="right" v-loading='loading' :model="formInline" :rules="rules" ref="ruleForm"
            class="demo-form-inline" label-width="80px">
            <el-form-item label="接口编号">
                <el-input v-model="formInline.number" disabled placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="接口状态">
                <el-select v-model="formInline.status" placeholder="请选择" disabled>
                    <el-option v-for="(item,index) in checkboxData.out.status" :key="index" :label="item.name"
                        :value="item.val"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="渠道来源" prop='channel'>
                <el-select v-model="formInline.channel" placeholder="请选择" :disabled='clickType'>
                    <el-option v-for="(item,index) in checkboxData.out.channel" :key="index" :label="item.name"
                        :value="item.val"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="接口名称" prop='name'>
                <el-input v-model="formInline.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="接口版本" prop='edition'>
                <el-input v-model="formInline.edition" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="单价" prop='money'>
                <el-input-number v-model="formInline.money" :precision="2" :step="0.1" :min='0' :max="100"
                    :controls='false' placeholder="元 / 次"></el-input-number>
            </el-form-item>
            <el-form-item label="创建人" v-show="clickType">
                <el-input v-model="formInline.admin" disabled placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" v-show="clickType">
                <el-input v-model="formInline.time" disabled placeholder="请输入"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" :loading="btnloading" @click="addinterface('ruleForm')">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                btnloading: false,
                dialogVisible: false,
                clickType: true, //  true:添加  false:编辑
                dialogName: '',
                interfaceId:'',
                formInline: {
                    number: '自动生成，唯一',
                    status: 0,
                    channel: '',
                    name: '',
                    edition: '',
                    money: 0,
                    admin: null,
                    time: null,
                },
                checkboxData: {
                    out: {
                        channel: [],
                        status: [],
                    }
                },
                rules: {
                    channel: [{
                        required: true,
                        message: '请选择渠道来源',
                        trigger: 'change'
                    }],
                    name: [{
                        required: true,
                        message: '请输入接口名称',
                        trigger: 'blur'
                    }],
                    edition: [{
                        required: true,
                        message: '请输入接口版本',
                        trigger: 'blur'
                    }],
                    money: [{
                        required: true,
                        message: '请输入单价',
                        trigger: 'blur'
                    }],
                }
            }
        },
        watch: {
            '$store.state.DataModule.CHANGE_CHANNEL_LIST'(newVal, oldVal) {
                this.checkboxData = this.$store.state.DataModule.CHANGE_CHANNEL_LIST;
            }
        },
        methods: {
            async loadData(){
                let senddata ={
                    id:this.clickType?this.formInline.number:'',
                    channel:this.formInline.channel,
                    name:this.formInline.name,
                    version:this.formInline.edition,
                    unit:this.formInline.money,
                    status:this.formInline.status
                }
                await this.$store.dispatch('DataModule/ADD_INTERFACE',senddata)
                let getdata = this.$store.state.DataModule.ADD_INTERFACE;
                this.btnloading = false;
                this.dialogVisible = false;
                this.$message.success(getdata.message);
                this.$emit('initData');
            },
            async getinterface(rowid){
                let senddata = {
                    id:rowid
                }
                this.loading = true;
                await this.$store.dispatch('DataModule/CHANGE_INTERFACE',senddata);
                let getdata = this.$store.state.DataModule.CHANGE_INTERFACE.out;
                this.loading = false;
                this.formInline.number = getdata.num;
                this.formInline.channel = getdata.channel;
                this.formInline.name = getdata.name;
                this.formInline.edition = getdata.version;
                this.formInline.money = getdata.unit;
                this.formInline.status = getdata.status;
                this.formInline.admin = getdata.real_name;
                this.formInline.time = getdata.time;
            },
            openDialog(status, dataid) {
                this.dialogVisible = status;
                this.loading = false;
                if (dataid) {
                    this.dialogName = '编辑';
                    this.clickType = true;
                    this.getinterface(dataid);
                } else {
                    this.dialogName = '新增接口';
                    this.clickType = false;
                }
            },
             addinterface(formName) {
                this.$refs[formName].validate((valid)=> {
                    if (valid) {
                        this.btnloading = true;
                        this.loadData();
                    }
                });
            },
            closeDialog() {
                this.dialogVisible = false;
            },
            handleClose(done) { //    弹窗关闭前的回调
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            closeClear(formName){    //   dialog关闭后初始化输入框
                this.formInline = {
                    number: '自动生成，唯一',
                    status: 0,
                    channel: '',
                    name: '',
                    edition: '',
                    money: 0,
                    admin: null,
                    time: null,
                },
                this.$refs[formName].resetFields();
                this.btnloading = false;
            }
        }
    }
</script>

<style scoped>

</style>