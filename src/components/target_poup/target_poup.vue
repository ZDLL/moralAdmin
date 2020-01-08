<template>
  <div class="poup">
    <el-dialog
      title="新增"
      :visible.sync="dialogTableVisible"
      width="60%"
      @close="close"
      :before-close="handleClose"
    >
      <el-form ref="form" label-width="80px" :inline="true" id="poupTitle">
        <el-form-item label="指标编号">
          <el-input class="item_msg" v-model="parameter_num" readonly></el-input>
        </el-form-item>
        <el-form-item label="指标状态">
          <el-input class="item_msg" v-model="parameter_status" readonly></el-input>
        </el-form-item>
        <el-form-item label="参数编号">
          <el-input class="item_msg" v-model="parameter_id" readonly></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="add" label-width="80px" :inline="true" :rules="rules" ref="ruleForm" v-loading='loading'>
        <el-form-item label="接口名称" prop="adr">
          <el-select v-model="add.adr" placeholder="请选择" @change="initOptions1">
            <el-option
              v-for="(item,index) in checkboxData.out.inface"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指标类型" prop="type">
          <el-select v-model="add.type" placeholder="请选择" :disabled="!add.adr?true:false" @change="initOptions">
            <el-option
              v-for="(item,index) in checkboxData.out.outIndexType"
              :key="index"
              :label="item.name"
              :value="item.val"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="参数名称" prop="canName">
          <!-- <el-select v-model="add.canName" placeholder="请选择" :disabled="!add.type?true:false">
            <el-option
              v-for="(item,index) in parameter_name"
              :key="index"
              :label="item.name"
              :value="item.val"
            ></el-option> 
          </el-select>-->
          <el-cascader v-model="add.canName" :options="options" @change="handleChange" :disabled="!add.type?true:false"></el-cascader>
        </el-form-item>
        <el-form-item label="业务类型" prop="target">
          <el-select v-model="add.target" placeholder="请选择">
            <el-option
              v-for="(item) in checkboxData.out.outIndexBusiType"
              :key="item.val"
              :label="item.name"
              :value="item.val"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="指标定义" prop="status">
          <el-select v-model="add.status" placeholder="请选择">
            <el-option
              v-for="(item) in checkboxData.out.outIndexDefinition"
              :key="item.val"
              :label="item.name"
              :value="item.val"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="指标名称" prop="name">
          <el-input v-model="add.name" placeholder="请输入" style="width:'215px'"></el-input>
        </el-form-item>
      </el-form>

      <div class="btn">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" size="medium" @click="addData('ruleForm')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "targetPoup",
  // props: ["checkboxData"],
  data() {
    return {
      loading: false,
      dialogTableVisible: false,
      add: {
        number: "", //指标编号
        name: "", // 指标名称
        status: "", // 指标定义
        type: "", // 指标类型
        target: "", //业务类型
        adr: "", //接口名称
        canName: [] //参数名称
      },
      checkboxData: {
        out: {
          outIndexDefinition:[],//指标定义
          outIndexBusiType:[],//业务类型
          outIndexType:[],//指标类型
          inface:[],//接口名称
        }
      }, //下拉数据

      options: [],
      parameter_num: '', //指标编号
      parameter_id: "", //参数编号
      parameter_status: "生效", //指标状态
      rules: {
        adr: [{ required: true, message: "请选择接口名称", trigger: "change" }],
        type: [
          { required: true, message: "请选择指标类型", trigger: "change" }
        ],
        canName: [
          { required: true, message: "请选择参数名称", trigger: "change" }
        ],
        target: [
          { required: true, message: "请选择业务类型", trigger: "change" }
        ],
        status: [
          { required: true, message: "请选择指标定义", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入指标名称", trigger: "blur" }]
      }
    };
  },
  methods: {

    //打开弹窗
    openDialog(flag) {
      if(!this.$store.state.TargetModule.DATA_TARGET_SELECT){
        this.$message.error('数据加载出错，请重新加载...');return
      }
      this.dialogTableVisible = flag;
      this.checkboxData = this.$store.state.TargetModule.DATA_TARGET_SELECT;
    },

    //点击取消按钮
    closeDialog() {
      // this.close();
      this.dialogTableVisible = false;
      this.add.number = "";
      this.add.name = "";
      this.add.status = "";
      this.add.type = "";
      this.add.target = "";
      this.add.adr = "";
      this.add.canName = "";
      this.parameter_id = "";
      // this.$refs[formName].resetFields();
    },

    //点击确定按钮
      addData(formName) {
        console.log(this.add);
      let _this = this,
        data = {
          id: _this.parameter_num,
          face_id: _this.add.adr,
          para_id: _this.add.canName,
          target_type: _this.add.type,
          target_name: _this.add.name,
          data_type: _this.add.target,
          target_def: _this.add.status
        };
        _this.$refs[formName].validate(async valid => {
        if (valid) {
          // console.log(data);
           await _this.$store.dispatch('TargetModule/DATA_TARGET_ADD',data);
           
          let addData = _this.$store.state.TargetModule.DATA_TARGET_ADD;
          // console.log(addData);
          _this.dialogTableVisible = false;
          _this.$emit("initPdata")
        }
      });
    },

    //弹窗关闭处理事件
    close() {
      this.parameter_id = "";
      this.$refs.ruleForm.resetFields();
      console.log(123);
    },

    //弹窗点击空白处关闭提示
    handleClose() {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.dialogTableVisible = false;
          done();
        })
        .catch(_ => {});
    },

    //多级联动下拉选择
    handleChange(val) {
      console.log(val);
      this.parameter_id = val[val.length-1];
      this.add.canName = this.add.canName[this.add.canName.length-1]
      
    },

    //加载参数名称多级联动数据options
    async initOptions() {

      console.log(this.add.type);
      console.log(this.add.adr);
      let _this = this,
      data = {
        face_id: _this.add.adr,
        target_type: _this.add.type,
        pid: ''
      };
      _this.loading = true;
      await _this.$store.dispatch('TargetModule/DATA_TARGET_OPTIONS',data);
      let options = _this.$store.state.TargetModule.DATA_TARGET_OPTIONS;
      _this.options = options.out;
      _this.loading = false;
      console.log(_this.options);
      console.log(options);
      
      
    },

    //接口名称参数选择
    initOptions1() {
      if(!this.add.type == ""){
        this.initOptions();
      }
    }

    
  }
};
</script>


<style lang="scss">
// .poup .el-input__inner {
//   width: 240px;
// }
</style>
<style lang="scss" scoped>
.poup .el-dialog {
  width: 80%;
}
#poupTitle {
  margin-bottom: 30px;
}
#poupTitle .el-form-item p {
  border: none;
  border-bottom: 1px solid #e1e1e1;
  width: 240px;
  height: 40px;
  line-height: 40px;
}
.btn {
  width: 100%;
  text-align: center;
  .el-button {
    margin: 10px 10px 0;
  }
}
</style>