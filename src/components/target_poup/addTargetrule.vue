<template>
    <el-dialog class="addTargetrule" title="新增规则" :visible.sync="dialogVisible" width="50%" :before-close="handleClose"
        @closed="closeClear('ruleForm')">
        <el-form :inline="true" label-position="right" :model="formInline" :rules="rules"
            ref="ruleForm" class="demo-form-inline" label-width="80px">
            <el-form-item label="参数名称" prop='name'>
                <el-cascader ref="el_cascader" v-model="formInline.name" :props="{ checkStrictly: true }" :options="setNameData.list" @change="handleChange"></el-cascader>
            </el-form-item>
            <el-form-item label="参数编号" prop='para_id'>
                <el-input v-model="formInline.para_id" readonly placeholder="请先选择参数名称"></el-input>
            </el-form-item>
            <el-form-item label="条件类型" prop='target_type'>
                <el-select v-model="formInline.target_type" placeholder="请选择">
                    <el-option v-for="item in ruleConfigData" :key="item.val" :label="item.name" :value="item.val">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="条件属性" prop='target_val'>
                <el-input v-model="formInline.target_val" placeholder="请输入"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" :loading="btnloading" @click="addsetRule('ruleForm')">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                clearCheckedNodes: false,
                dialogVisible: false,
                btnloading: false,
                setNameData: {
                    list: [],
                    target_id: '' //  指标编号
                },
                ruleConfigData:[],
                formInline: {
                    id:'',
                    name: '',
                    para_id: '',
                    target_type: '',
                    target_val: '',
                },
                rules: {
                    name:[{
                        required: true,
                        message: '请选择参数名称',
                        trigger: 'change'
                    }],
                    para_id:[{
                        required: true,
                        message: '请输入接口名称',
                        trigger: 'change'
                    }],
                    target_type:[{
                        required: true,
                        message: '请选择条件类型',
                        trigger: 'change'
                    }],
                    target_val:[{
                        required: true,
                        message: '请输入条件属性',
                        trigger: 'blur'
                    }]
                }
            }
        },
        created(){
            this.getCondition();
        },
        methods: {
            async getCondition(){      //   获取条件类型列表数据
                await this.$store.dispatch('TargetModule/GET_TARGET_RULECONFIG',{});
                this.ruleConfigData = this.$store.state.TargetModule.GET_TARGET_RULECONFIG.out;
            },
            openDialog() {       //   打开dialog
                if (!this.$store.state.TargetModule.GET_TARGET_RULETREEINFO.out) {
                    this.$message.error('未获取到指标规则数据');
                    return;
                }
                this.dialogVisible = true;
                this.setNameData = this.$store.state.TargetModule.GET_TARGET_RULETREEINFO.out;
                this.formInline.id = this.setNameData.target_id;
            },
            handleChange(value) { //  获取参数名称对应的参数编号
                this.formInline.para_id = value[value.length - 1];
            },
            addsetRule(formName) {       //  添加规则参数
                this.$refs[formName].validate(async (valid)=> {
                    if (valid) {
                        this.btnloading = true;
                        await this.$store.dispatch('TargetModule/ADD_TARGRT_RULE',this.formInline);
                        this.btnloading = false;
                        let getdata = this.$store.state.TargetModule.ADD_TARGRT_RULE;
                        this.$message.success(getdata.message);
                        this.$emit('RefreshData');
                        this.dialogVisible = false;
                    }
                });
            },
            handleClose(done) { //    弹窗关闭前的回调
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            closeDialog() {       //   关闭dialog
                this.dialogVisible = false;
            },
            closeClear(formName) {     //  关闭弹框后的回调
                this.formInline= {
                    id:'',
                    name: '',
                    para_id: '',
                    target_type: '',
                    target_val: '',
                }
                this.$refs[formName].resetFields();    //  初始化正则验证
                this.btnloading = false;
            },
        }
    }
</script>

<style lang='scss'>
.addTargetrule{
    box-sizing: border-box;
    .demo-form-inline .el-input__inner {
            width: 205px;
        }
}

</style>