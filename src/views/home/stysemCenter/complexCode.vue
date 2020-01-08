<!-- <h2>复杂码表</h2> -->
<template>
  <div class="complex-code-page">
    <myBrea :crumb-ary="brea"></myBrea>
    <div class="page-cont">
      <div class="page-left">
         <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
               <el-input class="input-with-select" style="width:200px" v-model='typeSeach.codeTypeCpltName' clearable @clear="clearFun" placeholder="请输入类型名称"></el-input>
            </el-form-item>
             <el-form-item>
              <el-button type="primary" plain >查询</el-button>
              <el-button type="primary" @click="addTypeBtn">添加类型</el-button>
            </el-form-item>
         </el-form>
        <el-divider content-position="left">复杂码表类型</el-divider>
        <el-table :data="tableDataLeft" stripe style="width: 100%">
          <el-table-column prop="codeTypeCpltId" label="类型编码"></el-table-column>

          <el-table-column prop="codeTypeCpltName" label="类型名称"></el-table-column>

          <el-table-column label="状态">
            <template slot-scope="scope">{{scope.row.state | codeStatus}}</template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                :type="scope.row.state!=='00001002'?'danger':'' "
                @click='statusChange(scope.row)'
              >{{scope.row.state | statusBtnTxt}}</el-button>
              <el-button  size="mini" @click="editTypeBtn(scope.row)">编辑</el-button>
              <el-button class='mt10'  size="mini" @click="typeViewInfo(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <myPackage
          v-if="packTotalLeft"
          :key="packTotalLeft"
          :pageTotal="packTotalLeft"
          @handleCurrent="handleCurrentLeftFunc"
        ></myPackage>
      </div>
      <div class="page-right">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
               <el-button type="primary" v-show="showAddAttr" @click="addAttrBtn">添加属性</el-button>
            </el-form-item>
         </el-form>
        <el-divider content-position="left">复杂码表属性</el-divider>
        <div v-show="!showLoading" class='code-tree'>
            <myTree v-if='treeData.length>0' :key="treeKey" :tree-data='treeData' :tree-conifg='treeCig'  @treeEdit="InfoEditor"  @treeAddNext='cAddInfo'></myTree>
            <dataTrip v-else tripType="1"></dataTrip>
        </div>
        <div v-show="showLoading" style="text-align:center;">
            <i style="font-size:20px" class='el-icon-loading'></i>
            <p>数据加载中</p>
        </div>

      </div>
    </div>

    <!-- 添加类型 -->
     <el-dialog
      :title='addTypeData.type=="save"?"添加类型":"编辑类型"'
      :visible.sync='leftDia'
      width="40%"
      >
        <div>
            <el-row :gutter="10" >
            <el-col :span="4"><span class="my-span-notice">*</span>类型编码:</el-col>
            <el-col :span="12"><el-input :disabled='addTypeData.type!="save"' v-model='addTypeData.codeTypeCpltId' maxlength="30"  show-word-limit clearable placeholder="请输入内容"></el-input></el-col>
            </el-row>
            <el-row :gutter="10" class="mt20">
            <el-col :span="4"><span class="my-span-notice">*</span>类型名称:</el-col>
            <el-col :span="12"><el-input v-model='addTypeData.codeTypeCpltName' maxlength="30"  show-word-limit clearable placeholder="请输入内容"></el-input></el-col>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="leftDia = false">取 消</el-button>
            <el-button type="primary" @click="addTypeSureBtn">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 添加属性 -->
    <el-dialog
      :title='!addAttrData.type=="save"?"添加属性":"编辑属性"'
      :visible.sync='rightDia'
      width="40%"
      >
        <div>
            <el-row :gutter="10" >
                <el-col :span="4"><span class="my-span-notice">*</span>类型编码:</el-col>
                <el-col :span="12"><el-input v-model='addAttrData.codeTypeCpltId' disabled maxlength="30" show-word-limit clearable placeholder="请输入内容"></el-input></el-col>
            </el-row>
            <el-row :gutter="10" class="mt20">
                <el-col :span="4"><span class="my-span-notice">*</span>类型名称:</el-col>
                <el-col :span="12"><el-input v-model='codeTypeData.codeTypeCpltName' disabled maxlength="30" show-word-limit clearable placeholder="请输入内容"></el-input></el-col>
            </el-row>
            <el-row :gutter="10" class="mt20">
                <el-col :span="4"><span class="my-span-notice">*</span>属性编码:</el-col>
                <el-col :span="12"><el-input :disabled='addAttrData.type!="save"' v-model='addAttrData.codeValueCpltId' maxlength="30" show-word-limit clearable placeholder="请输入内容"></el-input></el-col>
            </el-row>
            <el-row :gutter="10" class="mt20">
                <el-col :span="4"><span class="my-span-notice">*</span>属性名称:</el-col>
                <el-col :span="12"><el-input v-model='addAttrData.codeValueCpltName' maxlength="30" show-word-limit clearable placeholder="请输入内容"></el-input></el-col>
            </el-row>
             <el-row :gutter="10" class="mt20">
                <el-col :span="4"><span class="my-span-notice">*</span>属性顺序:</el-col>
                <el-col :span="12"><el-input v-onleyNumber v-model='addAttrData.nodeOrder' type="txt" clearable placeholder="请输入内容"></el-input></el-col>
            </el-row>
            <el-row :gutter="10" class="mt20">
                <el-col :span="4"><span class="my-span-notice">*</span>属性状态:</el-col>
                <el-col :span="12">
                    <el-radio v-model="addAttrData.state" label="00001001">正常</el-radio>
                    <el-radio v-model="addAttrData.state" label="00001002">冻结</el-radio>

                </el-col>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="rightDia = false">取 消</el-button>
            <el-button type="primary" @click="addAttrSureBtn">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
// import myBrea from "../../../components/breadcrumb.vue";
import myBrea from '../../../components/headerCrumb.vue'
import proUpload from "../../../components/proUpload.vue";
import myPackage from "../../../components/package.vue";
import myTree from '../../../components/myTree.vue'
import { transAeaTree,myConfirm} from "../../../until/until";
export default {
  name: "complex",
  data() {
    return {
      brea: [{ name: "系统管理", url: "" }, { name: "复杂码表", url: "" }],
      tableDataLeft: [],
      typeSeach:{
          pageNo:1,
          pageSize:10,
          codeTypeCpltName:""
      },
      addTypeData:{
          codeTypeCpltId:"",
          codeTypeCpltName:"",
          type:"",//edit //save
          state:"",
      },
      codeTypeData:{},
      packTotalLeft:1,
      leftDia:false,
      treeData:[],
      treeKey:0,
      treeCig:{
        defProp:{
            children: 'children',
            label: 'codeValueCpltName'
        },
        yEdit:'nodeLv',
        editBtn:true,
        addNxtBtn:true,
        delBtn:false,
        viewBtn:false,
        stateBtn:false,
        stateKey:'state',
        noEnable:"00001001",
      },
      addAttrData:{
          codeValueCpltId:"",
          codeValueCpltName:"",
          parCodeValCpltId:"",
          codeTypeCpltId:"",
          nodeOrder:"",
          state:"",
      },
      rightDia:false,
      showAddAttr:false,
      showLoading:false,
      areaData:[]
    };
  },
  components: {
    myBrea,
    proUpload,
    myPackage,
    myTree,
    // noDataComp
  },
  methods: {
    async comCodeTypeList() {
      await this.$store.dispatch(
        "SystemModule/POST_COM_CODE_TYPE_LIST",
        this.typeSeach
      );
      let data = this.$store.state.SystemModule.POST_COM_CODE_TYPE_LIST;
      this.tableDataLeft = data.out.list;
      this.packTotalLeft = parseInt(data.out.totalSize);
    },
    async comCodeTypeSave(saveData) {
      await this.$store.dispatch(
        "SystemModule/POST_COM_CODE_TYPE_SAVE",
        saveData
      );
      let data = this.$store.state.SystemModule.POST_COM_CODE_TYPE_SAVE;
      this.$message.success("操作成功");
      this.comCodeTypeList();
    },
    async comCodeInfoList() {
      //  if(this.codeTypeData.codeTypeCpltId == "area" && 
      //       this.areaData.length>0){
      //           this.showLoading = false;
      //           this.treeData = this.areaData;
      //           return
      //  }
      await this.$store.dispatch(
        "SystemModule/POST_COM_CODE_VALUE_LIST",
       {codeTypeCpltId:this.codeTypeData.codeTypeCpltId}
      );
      let data = this.$store.state.SystemModule.POST_COM_CODE_VALUE_LIST;
        this.treeData=[];
        this.showLoading = false;
        if(data.out.list.length>0){
            let _this= this;
            this.treeData = transAeaTree(data.out.list,{pId:"parCodeValCpltId",id:"codeValueCpltId"});
            this.treeKey ++
            // console.log(this.treeData)
            // if(this.codeTypeData.codeTypeCpltId == "area" ){
            //     this.areaData =  this.treeData
            // }
        }
        
    },
    async comCodeAttrSave(saveData) {
      await this.$store.dispatch(
        "SystemModule/POST_COM_CODE_VALUE_SAVE",
        saveData
      );
      let data = this.$store.state.SystemModule.POST_COM_CODE_VALUE_SAVE;
      this.$message.success("操作成功");
       this.rightDia = false
      this.comCodeInfoList();
    },
    clearFun() {
        this.typeSeach.codeTypeCpltName= '';
        this.comCodeTypeList();
    },
    handleCurrentLeftFunc(val){
        this.typeSeach.pageNo= val;
        this.comCodeTypeList();
    },
    searBtn(){
       this.comCodeTypeList();
    },
    addTypeBtn(){
        this.addTypeData={
          codeTypeCpltId:"",
          codeTypeCpltName:"",
          type:"save",//edit //save
          state:"00001001"
        };
      this.leftDia = true;
    },
    addTypeSureBtn(){
        if(!this.addTypeData.codeTypeCpltId){
            this.$message.warning('请添加类型编码');
            return;
        }
        if(!this.addTypeData.codeTypeCpltName){
            this.$message.warning('请添加类型名称');
            return;
        }
        this.comCodeTypeSave(this.addTypeData);
        this.leftDia = false;
    },
    editTypeBtn(row){
        this.addTypeData = Object.assign({},row);
        this.addTypeData.type = 'edit'
        this.leftDia = true;
    },
    typeViewInfo(row){
        this.codeTypeData = row;
        this.showAddAttr= true;
        this.showLoading = true;
        this.comCodeInfoList();
    },
  
    addAttrBtn(){
        this.addAttrData={
          parCodeValCpltId:'',
          codeTypeCpltId:this.codeTypeData.codeTypeCpltId,
          codeValueCpltId:"",
          codeValueCpltName:"",
          nodeOrder:"",
          state:"",
          type:"save"
        },
        this.rightDia = true
    },
    cAddInfo(data){
         let myData=data.data
        this.addAttrData={
          parCodeValCpltId:myData.codeValueCpltId,
          codeTypeCpltId:myData.codeTypeCpltId,
          codeValueCpltId:"",
          codeValueCpltName:"",
          nodeOrder:"",
          state:"",
          type:"save"
        },
        this.rightDia = true
    },
    InfoEditor(data){
      let myData=data.data
        this.addAttrData={
          parCodeValCpltId:myData.parCodeValCpltId,
          codeTypeCpltId:myData.codeTypeCpltId,
          codeValueCpltId:myData.codeValueCpltId,
          codeValueCpltName:myData.codeValueCpltName,
          nodeOrder:myData.nodeOrder,
          state:myData.state,
          type:"edit"
        },
        this.rightDia = true
        
    },
    addAttrSureBtn(){
        if(!this.addAttrData.codeTypeCpltId){
            this.$message.warning("请填写属性编码")
            return
        }
        if(!this.addAttrData.codeValueCpltName){
            this.$message.warning("请填写属性名称")
          return
        }
        if(!this.addAttrData.state){
            this.$message.warning("请选择状态")
          return
        }
        this.comCodeAttrSave(this.addAttrData)
       
    },
    statusChange(row){
        let _this = this;
        let postData= Object.assign({},row);
        this.addTypeData = Object.assign({},row);
        postData.type = 'edit';
        postData.state = row.state =='00001001'?'00001002':'00001001';
        myConfirm(_this,"是否进行此操作？",function(){
            _this.comCodeTypeSave(postData)
        })
    }

  },
  created() {
      this.comCodeTypeList();
  }
};
</script>
<style lang="scss">
.complex-code-page {
  .page-cont {
    // overflow: hidden;
    // margin-top: 30px;
    // border-radius: 6px;
      @extend %pageCont;
      // background-color: #fff;
    .page-left,
    .page-right {
       @extend%pageLeftRight;
       background-color: $color_fff;
      // display: inline-block;
      // vertical-align: top;
      // width: calc(50% - 4px);
      // padding: 20px;
      // box-sizing: border-box;
      // overflow: hidden;
      // margin-top: 10px;
      // background-color: #fff;
      
    }
    .page-right {
      float: right;
      .el-tree-node__content{
          padding: 5px 0;
      }
      .custom-tree-node{
          width: 300px;
          .el-button--mini{
              padding: 4px 4px;
          }
      }
    }
  }
}
</style>