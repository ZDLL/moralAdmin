<template>
    <div class='actDetail'>
         <myCrumb :crumb-ary="brea"></myCrumb>
        <div class="cont">
            <div class="info">
               <el-row :gutter="10">
                    <el-col :span="6"><span class='span-img'>
                        <img v-if='detObj.headSculpture' :src="detObj.headSculpture" alt="">
                        <i v-else style="font-size:50px;color:#999" class='el-icon-s-custom'></i>
                    </span>
                </el-col>
                    <el-col :span="6">
                        <ul class='info-ul'>
                            <li>账户编号：{{detObj.accountNo || '--'}}</li>
                            <li>昵称：{{detObj.accountName || '--'}}</li>
                            <li>角色名称：{{detObj.roleName || '--'}}</li>
                            <li>角色编号：{{detObj.roleNo || '--'}}</li>
                            
                        </ul>
                    </el-col>
                    <el-col :span="6">
                          <ul class='info-ul'>
                            <li>账户类型：{{detObj.accountTypeName || '--'}}</li>
                            <li>状态：{{detObj.state | codeStatus}}</li>
                            <li>上级编号：{{detObj.parAccountNo || '--'}}</li>
                            <li>创建人：{{detObj.insUserName || '--'}}</li>
                           
                        </ul>
                    </el-col>
                    <el-col :span="6">
                          <ul class='info-ul'>
                            <li>账号：{{detObj.accountLoginNo || '--'}}</li>
                            <li>来源：{{detObj.registerSourceName || '--'}}</li>
                            <li>上级名称：{{detObj.parAccountName || '--'}}</li>
                             <li>创建时间：{{detObj.insTime | dateformat}}</li>
                            <!-- <li>open-id：</li> -->
                            <!-- <li>角色编号</li> -->
                        </ul>
                    </el-col>
                </el-row>
            </div>
            
            <div class='table'>
                 <el-divider content-position="left">日志列表</el-divider>
                 <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column label="操作时间">
                        <template slot-scope="scope">
                            {{scope.row.insTime | dateformat}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="ip" label="操作IP"></el-table-column>
                    <el-table-column prop="logTypeName" label="操作类型"></el-table-column>
                    <el-table-column prop="platformTypeName" label="操作平台"></el-table-column>
                </el-table>
                <myPackage v-if='packTotal' :key='packTotal' :pageTotal='packTotal' @handleCurrent="handleCurrentFunc"></myPackage>

            </div>
        </div>
    </div>
</template>
<script>
import myCrumb from '../../../components/headerCrumb.vue';
import myPackage from "../../../components/package.vue";
import {myConfirm} from '../../../until/until'
export default {
    name:"actdet",
    data(){
        return{
            brea:[{name:"账户中心",url:""},{name:"账户详情",url:""}],
            tableData:[],
            packTotal:1,
            actNo:'',
            detObj:{},
            search:{
                pageNo:1,
                pageSize:10,
                accountNo:''
            }
        }
    },
    components:{
        myCrumb,
        myPackage
    },
    methods:{
        async actList (){
            await this.$store.dispatch("ActModule/GET_ACT_DETAIL",{accountNo:this.actNo});
            let data = this.$store.state.ActModule.GET_ACT_DETAIL;
            this.detObj= data.out.value;
        },
        async logList (){
            await this.$store.dispatch("ActModule/POST_ACT_LOG_LIST",this.search);
            let data = this.$store.state.ActModule.POST_ACT_LOG_LIST;
            this.tableData= data.out.list;
            this.packTotal= parseInt(data.out.totalSize)
            
        },
        handleCurrentFunc(val){
            this.search.pageNo= val;
            this.logList()
        }
    },
    created(){
        this.actNo = this.$route.query.id
        this.search.accountNo = this.actNo
        this.actList();
        this.logList()
    }
}
</script>
<style lang="scss">
    .actDetail{
        .cont{
            @extend %pageCont;
            background-color: #fff;
            .info{
                .span-img{
                    // display: inline-block;
                    display: block;
                    width: 110px;
                    height: 110px;
                    margin:30px auto;
                    overflow: hidden;
                    border-radius: 50%;
                    text-align: center;
                    line-height: 120px;
                    background-color: #f5f5f5;
                }
            }
            .info-ul{
                padding: 10px;
                margin: 0px;
                
                li{
                    padding: 10px;
                }
            }
            .table{
                padding: 20px;
            }
        }
    }
</style>