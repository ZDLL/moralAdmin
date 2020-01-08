<template>
  <div class="check">
    <el-dialog
      title="查看"
      :visible.sync="dialogTableVisible"
      width="60%"
      @close="close"
      :before-close="handleClose"
    >
      <el-form
      :model="checkData"
        ref="ruleForm"
        label-width="80px"
        :inline="true"
        id="poupTitle"
        :rules="rules"
        v-loading="loading"
      >
        <el-form-item label="指标编号">
          <el-input class="item_msg" v-model="checkData.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="指标状态">
          <el-input class="item_msg" v-model="checkData.parameter_status" disabled></el-input>
        </el-form-item>
        <el-form-item label="参数编号">
          <el-input class="item_msg" v-model="checkData.parameter_num" disabled></el-input>
        </el-form-item>
        <el-form-item label="接口名称" prop="face_id">
          <el-input class="item_msg" v-model="checkData.face_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="指标类型" prop="target_type">
          <el-input class="item_msg" v-model="checkData.target_type" disabled></el-input>
        </el-form-item>
        <el-form-item label="参数名称" prop="para_id">
          <el-cascader v-model="checkData.para_id" :options="options" @change="handleChange"></el-cascader>
        </el-form-item>
        <el-form-item label="指标名称" prop="target_name">
          <el-input class="item_msg" v-model="checkData.target_name" @change="showBtn"></el-input>
          <!-- <el-select v-model="check.target_name" placeholder="请选择">
            <el-option
              v-for="(item,index) in checkboxData.out.inface"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>-->
        </el-form-item>
        <el-form-item label="业务类型" prop="data_type">
          <el-select v-model="checkData.data_type" placeholder="请选择" @change="showBtn">
            <el-option
              v-for="(item,index) in checkboxData.out.outIndexBusiType"
              :key="index"
              :label="item.name"
              :value="item.val"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指标定义" prop="target_def">
          <el-select v-model="checkData.target_def" placeholder="请选择" @change="showBtn">
            <el-option
              v-for="(item,index) in checkboxData.out.outIndexDefinition"
              :key="index"
              :label="item.name"
              :value="item.val"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button :type="btnFlag?'primary':'info'" :disabled="!btnFlag?true:false" size="medium" @click="addData('ruleForm')">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "checkPoup",
  created() {},
  data() {
    return {
      btnFlag: false, //修改按钮是否灰掉
      loading: true,
      dialogTableVisible: false,
      checkData: {
        id: "", //指标编号
        parameter_status: "", //指标状态
        parameter_num: "", //参数编号
        face_id: "", //接口名称
        target_type: "", //指标类型
        para_id: "", //参数名称
        target_name: "", //指标名称
        data_type: "", //业务类型
        target_def: "" //指标定义
      },

      options: [], //多级联动
      checkboxData: {
        out: {
          outIndexDefinition: [], //指标定义
          outIndexBusiType: [], //业务类型
          outIndexType: [], //指标类型
          inface: [] //接口名称
        }
      }, //下拉数据
      // check: {
      //   canName: "" // 参数下拉选中值
      // },
      rules: {
        face_id: [{ required: true, message: "请填写接口名称", trigger: "blur" }],
        target_type: [{ required: true, message: "请填写指标类型", trigger: "blur" }],
        target_name: [{ required: true, message: "请填写指标名称", trigger: "blur" }],
        para_id: [{ required: true, message: "请选择参数名称", trigger: "change" }],
        target_def: [{ required: true, message: "请选择指标定义", trigger: "change" }],
        data_type: [{ required: true, message: "请选择业务类型", trigger: "change" }]
      }
    };
  },
  methods: {
    handleClose() {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.dialogTableVisible = false;
          done();
        })
        .catch(_ => {});
    },
    close() {
      this.btnFlag = false;
    },
    async open(row) {
      console.log(row);
      await this.$store.dispatch("TargetModule/DATA_TARGET_CHECK", {
        id: row.id
      });
      let msg = this.$store.state.TargetModule.DATA_TARGET_CHECK.out;
      console.log(msg);
      this.checkData.id = msg.id;
      this.checkData.parameter_status = msg.status;
      this.checkData.parameter_num = msg.para_id;
      this.checkData.face_id = msg.face_id;
      this.checkData.target_type = msg.target_type;
      this.checkData.target_name = msg.name;
      this.checkData.para_id = msg.para_id;
      this.checkData.data_type = msg.data_type;
      this.checkData.target_def = msg.index_def;
      this.dialogTableVisible = true;
      console.log(this.$store.state.TargetModule.DATA_TARGET_OPTIONS);
      if (!this.$store.state.TargetModule.DATA_TARGET_SELECT) {
        this.$message.error("数据加载出错，请重新加载...");
        return;
      }
      //加载参数名称多级联动数据options
      if (this.$store.state.TargetModule.DATA_TARGET_OPTIONS.length == 0) {
        let data = {
          face_id: msg.face_id,
          target_type: msg.target_type,
          pid: ""
        };
        this.loading = true;
        await this.$store.dispatch("TargetModule/DATA_TARGET_OPTIONS", data);
        let options = this.$store.state.TargetModule.DATA_TARGET_OPTIONS;
        this.options = options.out;
        this.loading = false;
      }
      this.options = this.$store.state.TargetModule.DATA_TARGET_OPTIONS.out;
      this.loading = false;
      //获取下拉数据

      this.checkboxData = this.$store.state.TargetModule.DATA_TARGET_SELECT;
      // console.log(this.checkboxData);
    },
    closeDialog() {
      this.dialogTableVisible = false;
    },
    //多级联动选择
    handleChange(val) {
      this.checkData.para_id = val[val.length - 1];
      this.checkData.parameter_num = this.para_id;
    },

    addData(formName) {
      let _this = this,
        data = {
          id: _this.checkData.id,
          face_id: _this.checkData.face_id,
          para_id: _this.checkData.para_id,
          target_type: _this.checkData.target_type,
          target_name: _this.checkData.target_name,
          data_type: _this.checkData.data_type,
          target_def: _this.checkData.target_def
        };
      _this.$refs[formName].validate(async valid => {
        if (valid) {
          await _this.$store.dispatch("TargetModule/DATA_TARGET_ADD",data);
          let addData = _this.$store.state.TargetModule.DATA_TARGET_ADD;
          console.log(addData);
          _this.dialogTableVisible = false;
          _this.$emit('initPdata');
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //弹窗关闭处理事件
    close() {
      this.checkData.id = "";
      this.$refs.ruleForm.resetFields();
    },

    //弹窗点击空白处关闭提示
    handleClose() {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.dialogTableVisible = false;
          this.btnFlag = false;
          done();
        })
        .catch(_ => {});
    },

    showBtn() {
      this.btnFlag = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.check .btn{
  width: 100%;
  text-align: center;
}
</style>