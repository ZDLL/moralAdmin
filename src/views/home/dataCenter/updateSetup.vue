<template>
    <div class="updateSetup">
        <el-form :inline="true" label-width="80px" :model="formInline" class="demo-form-inline" :rules="rules"
            ref="ruleForm">
            <el-form-item label="参数编号" prop='para_key'>
                <el-input v-model="formInline.para_key" :disabled='clickEditType' placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="接口编号">
                <el-input v-model="formInline.inface_id" disabled placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="参数状态">
                <el-input v-model="formInline.temporary" disabled placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="上级参数">
                <el-input v-model="formInline.p_id" disabled placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="参数类型">
                <el-input v-model="formInline.paratype" disabled placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="数据类型" prop='data_type'>
                <el-select v-model="formInline.data_type" placeholder="请选择">
                    <el-option v-for="(item,index) in selectData.dataType" :key="index" :label="item.name"
                        :value="item.val"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="参数名称" prop='para_name'>
                <el-input v-model="formInline.para_name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="入参类型" prop='input_type' v-show="!isShowenter">
                <el-select v-model="formInline.input_type" placeholder="请选择">
                    <el-option v-for="(item,index) in selectData.inputType" :key="index" :label="item.name"
                        :value="item.val"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="节点等级">
                <el-input v-model="formInline.para_lev" disabled placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="位置类型" prop='para_loaction' v-show="!isShowenter">
                <el-select v-model="formInline.para_loaction" placeholder="请选择">
                    <el-option v-for="(item,index) in selectData.locationType" :key="index" :label="item.name"
                        :value="item.val"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="节点顺序" prop='para_sort'>
                <el-input-number class="inpNum" v-model="formInline.para_sort" :precision="0" :step="1" :min='1' :max="100"
                    :controls='false' placeholder="请输入"></el-input-number>
            </el-form-item>
            <el-form-item label="创建人" v-show="clickEditType">
                <el-input v-model="formInline.admin" disabled placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="创建世间" v-show="clickEditType">
                <el-input v-model="formInline.time" disabled placeholder="请输入"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="参数备注">
                <el-input type="textarea" style="width:350px" placeholder="请输入" :rows="4" v-model="formInline.content"
                    maxlength="100" show-word-limit>
                </el-input>
            </el-form-item>
            <br>
            <el-form-item label=" ">
                <el-button @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formInline: {
                    id: '',
                    para_key: '',
                    inface_id: '',
                    temporary: '默认开启',
                    p_id: '',
                    paratype: '系统默认',
                    data_type: '',
                    para_name: '',
                    input_type: '',
                    para_lev: '系统默认',
                    para_loaction: '',
                    para_sort: 0,
                    admin: '',
                    time: '',
                    content: '',
                },
                rules: {
                    para_key: [{
                        required: true,
                        message: '请输入参数编号',
                        trigger: 'blur'
                    }],
                    data_type: [{
                        required: true,
                        message: '请选择数据类型',
                        trigger: 'change'
                    }],
                    para_name: [{
                        required: true,
                        message: '请输入参数名称',
                        trigger: 'blur'
                    }],
                    input_type: [{
                        required: true,
                        message: '请选择入参类型',
                        trigger: 'change'
                    }],
                    para_loaction: [{
                        required: true,
                        message: '请选择位置类型',
                        trigger: 'change'
                    }],
                    para_sort: [{
                        required: true,
                        message: '请输入节点顺序',
                        trigger: 'blur'
                    }],
                },
                selectData: {
                    dataType: [],
                    inputType: [],
                    locationType: [],
                },
                clickEditType: false,
                isShowenter: false,
            }
        },
        created() {
            this.getselData();
        },
        methods: {
            async getselData() {      //   获取下拉框数据
                await this.$store.dispatch('DataModule/DATA_TREE_SELECT', {});
                this.selectData = this.$store.state.DataModule.DATA_TREE_SELECT.out;
            },
            submitForm(formName) {     
                if (this.isShowenter) { //  如果为真  则为出参  出参时将入参类型与位置类型的值置为 0 后台不接收
                    this.formInline.input_type = 0;
                    this.formInline.para_loaction = 0;
                }
                let senddata = this.formInline;
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        await this.$store.dispatch('DataModule/ADD_INTER_PARA', senddata);
                        let getdata = this.$store.state.DataModule.ADD_INTER_PARA;
                        this.$message.success(getdata.message);
                        this.$emit('changeClick');
                    }
                });
            },
            clickType(res, clicktype) {          //   父级组件点击添加或编辑按钮触发的事件
                this.$refs.ruleForm.resetFields();
                this.formInline = {              //   初始化表单
                        id: '',
                        para_key: '',
                        inface_id: '',
                        temporary: '默认开启',
                        p_id: '',
                        paratype: '系统默认',
                        data_type: '',
                        para_name: '',
                        input_type: '',
                        para_lev: '系统默认',
                        para_loaction: '',
                        para_sort: 0,
                        admin: '',
                        time: '',
                        content: '',
                    },
                this.isShowenter = res.para_type != 0 ? true : false;    //  判断是否为出参
                if (clicktype == 'add') {
                    this.clickEditType = false;
                    this.formInline.p_id = res.id;
                    this.formInline.inface_id = res.inface_id;
                } else {
                    this.clickEditType = true;
                    this.formInline = {
                        id: res.id,
                        para_key: res.key,
                        inface_id: res.inface_id,
                        temporary: res.status==1?'开启':'关闭',
                        p_id: res.pid,
                        paratype: res.para_type==1?'出参':'入参',
                        data_type: res.type,
                        para_name: res.name,
                        input_type: res.in_para_type,
                        para_lev: res.level,
                        para_loaction: res.in_para_location,
                        para_sort: res.sort,
                        admin: res.admin,
                        time: res.time,
                        content: res.content
                    }
                }
            }
        }
    }
</script>

<style lang='scss'>
.inpNum{
    .el-input__inner{
        text-align: left;
    }
}
</style>