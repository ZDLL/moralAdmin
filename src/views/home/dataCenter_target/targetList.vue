<template>
  <div class="targetList">
    <myBrea :crumb-ary="brea"></myBrea>
    <div class="targetFace">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="指标编号">
          <el-input v-model="formInline.number" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="指标名称">
          <el-input v-model="formInline.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="指标类型">
          <el-select v-model="formInline.type" placeholder="请选择">
            <el-option
              v-for="(item,index) in checkboxData.out.outIndexType"
              :key="index"
              :label="item.name"
              :value="item.val"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="业务类型">
          <el-select v-model="formInline.target" placeholder="请选择">
            <el-option
              v-for="(item,index) in checkboxData.out.outIndexBusiType"
              :key="index"
              :label="item.name"
              :value="item.val"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指标状态">
          <el-select v-model="formInline.status" placeholder="请选择">
            <el-option
              v-for="(item,index) in checkboxData.out.status"
              :key="index"
              :label="item.name"
              :value="item.val"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接口名称">
          <el-select v-model="formInline.adr" placeholder="请选择">
            <el-option
              v-for="(item,index) in checkboxData.out.inface"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指标定义">
          <el-select v-model="formInline.target_type" placeholder="请选择">
            <el-option
              v-for="(item,index) in checkboxData.out.outIndexDefinition"
              :key="index"
              :label="item.name"
              :value="item.val"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchList">查询</el-button>
          <el-button  @click="reset">重置</el-button>
          <el-button @click="openAdd">新增</el-button>
        </el-form-item>
      </el-form>
      <el-divider content-position="left">接口列表</el-divider>
      <el-table v-loading="loading" :data="tableData" stripe>
        <el-table-column prop="id" label="指标编号" align="center"></el-table-column>
        <el-table-column prop="name" label="指标名称" align="center"></el-table-column>
        <el-table-column prop="face_name" label="接口名称" align="center"></el-table-column>
        <el-table-column prop="target_input" label="指标类型" align="center"></el-table-column>
        <el-table-column prop="data_type" label="业务类型" align="center"></el-table-column>
        <el-table-column prop="target_type" label="指标定义" align="center"></el-table-column>
        <el-table-column label="指标状态" align="center" width="100px">
          <template slot-scope="scope">{{scope.row.status | codeStatus}}</template>
        </el-table-column>
        <el-table-column prop="admin" label="创建人" align="center"></el-table-column>
        <el-table-column prop="time" label="创建时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width='270px'>
          <template slot-scope="scope">
            <el-button
              size="mini"
              :type="scope.row.status != 0?'danger':''"
              @click="isOpenstatus(scope.row)"
            >{{scope.row.status|statusBtnTxt}}</el-button>
            <el-button size="mini" @click="openCheck(scope.row)">基本信息</el-button>
            <el-button size="mini" v-show="scope.row.status == 1" @click="jump(scope.row.id)">规则设置</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <dataTrip :tripType="tripType"></dataTrip> -->
      <packAge @handleSize="handleSize" class="page" :pageTotal="count" v-if="count" :key="count" @handleCurrent="handleCurrentClick"></packAge>
    </div>
    
    <targetPoup :checkboxData="checkboxData" ref="targetPoup" @initPdata="initPdata"></targetPoup>
    <targetCheck ref="checkPoup" @initPdata="initPdata"></targetCheck>
  </div>
</template>

<script>
import myBrea from "../../../components/headerCrumb";
import targetPoup from "../../../components/target_poup/target_poup";
import targetCheck from "../../../components/target_poup/target_check_poup";
import packAge from "../../../components/package";
import { openMessagebox } from "@/until/until";
export default {
  components: {
    myBrea,
    targetPoup,
    targetCheck,
    packAge
  },
  data() {
    return {
      tripType: '',
      loading: true,
      brea: [
        {
          name: "指标管理 ",
          url: ""
        },
        {
          name: "指标列表",
          url: ""
        }
      ],
      tableData: [],
      formInline: {
        number: "", //指标编号
        name: "", // 指标名称
        status: "", // 指标状态
        type: "", // 指标类型
        target: "", //业务类型
        adr: "", //接口名称
        target_type: "" //指标定义
      },
      dataList: {},
      checkboxData: {
        out: {
          inface: [], //接口名称
          outIndexBusiType: [], //新增弹窗里面的业务类型
          outIndexType: [], //指标类型
          outIndexDefinition: [], //指标定义
          status: [] //指标状态
        }
      },
      page: 1,
      num: 10,
      count: 0
    };
  },
  created() {
    this.initList();
    this.initSelect();
  },
  methods: {
    //初始化列表数据
    async initList() {
      let _this = this,
        data = {
          id: _this.formInline.number,
          name: _this.formInline.name,
          target_input: _this.formInline.type,
          target_type: _this.formInline.target_type,
          data_type: _this.formInline.target,
          status: _this.formInline.status,
          face_name: _this.formInline.adr,
          page: _this.page,
          num: _this.num
        };
      await _this.$store.dispatch("TargetModule/DATA_TARGET_LIST", data);
      let myData = _this.$store.state.TargetModule.DATA_TARGET_LIST;
      // console.log(myData.out);
      _this.tableData = myData.out.list;
      _this.count = Number(myData.out.count);
      if(_this.tableData.length <1){
        _this.tripType = 1;
      }
      
      _this.loading = false;
    },


    //重置
    reset() {
      this.formInline = {
        number: "", //指标编号
        name: "", // 指标名称
        status: "", // 指标状态
        type: "", // 指标类型
        target: "", //业务类型
        adr: "", //接口名称
        target_type: "" //指标定义
      };
      this.page = 1;
      this.initList();
    },
    //初始化下拉数据
    async initSelect() {
      let _this = this;
      await _this.$store.dispatch("TargetModule/DATA_TARGET_SELECT", {});
      let selectData = _this.$store.state.TargetModule.DATA_TARGET_SELECT;
      console.log(selectData);
      _this.checkboxData = selectData;
    },

    //点击查询
    searchList() {
      let _this = this;
      // console.log(data);
      _this.page = 1;
      _this.num = 10;
      _this.initList();
    },
    //打开新增
    openAdd() {
      this.$refs.targetPoup.openDialog(true);
    },
    initPdata() {
      this.initList();
    },
    isOpenstatus(row) {
      // 禁用启用
      let senddata = {
        id: row.id,
        status: row.status != 0 ? 0 : 1
      };
      openMessagebox(
        "标题",
        `<p class='center'>是否变更${row.name}的状态<p>`,
        async () => {
          await this.$store.dispatch(
            "TargetModule/DATA_TARGET_CHANGE_STATUS",
            senddata
          );
          this.loading = true;
          let getdata = this.$store.state.TargetModule
            .DATA_TARGET_CHANGE_STATUS;
          this.initList();
          return getdata.status != 200
            ? this.$message.error(getdata.message)
            : this.$message.success(getdata.message);
        }
      );
    },
    //查看弹窗
    openCheck(row) {
      this.$refs.checkPoup.open(row);
    },

    //规则设置
    jump(val) {
      this.$router.push({name:'ruleSet',query:{targetId:val}});
    },
    //每页数量改变
    handleSize(e) {
      
    },
    //页数切换
    handleCurrentClick(num) {
      this.page = num;
      this.initList();
    }
  }
};
</script>
<style lang="scss">
.targetList .demo-form-inline .el-input__inner {
  width: 240px;
}

</style>
<style lang="scss" scoped>
.targetList {
  box-sizing: border-box;
  .targetFace {
    background-color: #fff;
    padding: 20px;
    margin: 15px 0;
  }
}
</style>