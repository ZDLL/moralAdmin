<template>
  <el-dialog class="addInsideTarget" :title="dialogName" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" @closed="closeClear('ruleForm')">
        <el-form :inline="true" label-position="right" v-loading='loading' :model="formInline" :rules="rules" ref="ruleForm"
            class="demo-form-inline" label-width="80px">
            <el-form-item label="指标编号" prop='id' v-show="!isadd">
                <el-input v-model="formInline.id" placeholder="请输入" disabled></el-input>
            </el-form-item>
            <el-form-item label="指标名称" prop='name'>
                <el-input v-model="formInline.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="指标类型" prop='quota_type'>
                <el-select v-model="formInline.quota_type" placeholder="请选择">
                    <el-option v-for="(item,index) in checkboxData.inIndexType" :key="index" :label="item.name"
                        :value="item.val"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="指标定义" prop='quota_def'>
                <el-select v-model="formInline.quota_def" placeholder="请选择">
                    <el-option v-for="(item,index) in checkboxData.inIndexDefinition" :key="index" :label="item.name"
                        :value="item.val"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="业务类型" prop='data_type'>
                <el-select v-model="formInline.data_type" placeholder="请选择">
                    <el-option v-for="(item,index) in checkboxData.inIndexBusiType" :key="index" :label="item.name"
                        :value="item.val"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="创建人" prop='admin' v-show="!isadd">
                <el-input v-model="formInline.admin" placeholder="请输入" disabled></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop='time' v-show="!isadd">
                <el-input v-model="formInline.time" placeholder="请输入" disabled></el-input>
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
    data(){
        return{
            dialogName:'新增内部指标',
            dialogVisible:false,
            loading:false,
            btnloading:false,
            isadd:true,
            checkboxData:{
                inIndexBusiType:[],
                inIndexDefinition:[],
                inIndexType:[]
            },
            formInline:{
                id:'',
                name:'',
                quota_type:'',
                data_type:'',
                quota_def:'',
                admin:'',
                time:''
            },
            rules:{
                name:[{
                    required: true,
                    message: '请输入指标名称',
                    trigger: 'blur'
                }],
                quota_type:[{
                    required: true,
                    message: '请选择指标类型',
                    trigger: 'change'
                }],
                quota_def:[{
                    required: true,
                    message: '请选择指标定义',
                    trigger: 'change'
                }],
                data_type:[{
                    required: true,
                    message: '请选择业务类型',
                    trigger: 'change'
                }],
            }
        }
    },
    watch: {
        '$store.state.insideTarget.GET_INSIDE_SELECT'(newVal, oldVal) {
            this.checkboxData = this.$store.state.insideTarget.GET_INSIDE_SELECT.out;
        }
    },
    methods:{
        openDialog(insideId){
            if (!this.$store.state.insideTarget.GET_INSIDE_SELECT.out) {
                this.$message.error('未获取到内部指标规则数据');
                return;
            }
            this.isadd = insideId?false:true;   //  如果有传值 则为编辑
            this.dialogName = this.isadd?'新增内部指标':'编辑内部指标';
            this.dialogVisible = true;
            if(!this.isadd){
                this.getEditInfo(insideId);
            }
        },
        addinterface(formName){
            this.$refs[formName].validate(async (valid)=> {
                if (valid) {
                    this.btnloading = true;
                    await this.$store.dispatch('insideTarget/ADD_INSIDE',this.formInline);
                    this.btnloading = false;
                    let getdata = this.$store.state.insideTarget.ADD_INSIDE;
                    this.$message.success(getdata.message);
                    this.$emit('initData');
                    this.dialogVisible = false;
                }
            });
        },
        async getEditInfo(row){     //  获取编辑信息
            this.loading = true;
            await this.$store.dispatch('insideTarget/GET_INSIDE_INFO',{id:row});
            this.loading = false;
            this.formInline = this.$store.state.insideTarget.GET_INSIDE_INFO.out;
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
        closeClear(formName){    //  关闭弹窗时初始化表单
            this.formInline={
                id:'',
                name:'',
                quota_type:'',
                data_type:'',
                quota_def:'',
                admin:'',
                time:'',
            }
            this.btnloading = false;
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style>

</style>