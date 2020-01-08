<template>
    <div class="setupParameter">
        <myBrea :crumb-ary="brea"></myBrea>
        <div class="setup_box">
            <div class="setup_left">
                <el-divider content-position="left">接口名称</el-divider>
                <div class="ismyTree" v-loading=loading>
                    <myTree v-if='treeData.length>0' :key="treeKey" :tree-data='treeData' :tree-conifg='treeCig'
                        @treeEdit="InfoEditor" @treeState="treeState" @treeAddNext='cAddInfo'></myTree>
                </div>
            </div>
            <div class="setup_right">
                <dataTrip v-show="!isClickTreeBtn" tripType="3" tripTxt='请添加或编辑参数'></dataTrip>
                <div class="fixtitle" v-show="isClickTreeBtn">
                    <el-divider content-position="left">{{right_text}}</el-divider>
                </div>
                <updateSetup ref="updateSetup" @changeClick='changeClick' v-show="isClickTreeBtn"></updateSetup>
            </div>
        </div>
    </div>
</template>

<script>
    import myBrea from '@/components/headerCrumb.vue'
    import myTree from '../../../components/myTree.vue'
    import updateSetup from './updateSetup.vue'
    import {openMessagebox} from '@/until/until'
    export default {
        components: {
            myBrea,
            updateSetup,
            myTree,
        },
        data() {
            return {
                brea: [{
                    name: "接口管理",
                    url: "/interfaceList"
                }, {
                    name: "参数设置",
                    url: ""
                }],
                treeCig: {},
                interId: '',
                treeData: [],
                treeKey: 0,
                right_text: '',
                isClickTreeBtn: false,
                loading:false,
            }
        },
        created() {
            this.interId = this.$route.query.interId;
            this.getTreedata();
        },
        methods: {
            async getTreedata() {
                this.loading = true;
                await this.$store.dispatch('DataModule/DATA_TREE', {
                    id: this.interId
                });
                this.loading = false;
                this.treeData = this.$store.state.DataModule.DATA_TREE.out;
            },
            InfoEditor(res) { //  编辑接口参数
                this.$refs.updateSetup.clickType(res.data,'edit');
                this.right_text = '编辑参数';
                this.isClickTreeBtn = true;
            },
            cAddInfo(res) { //   添加接口参数
                this.$refs.updateSetup.clickType(res.data,'add');
                this.right_text = '添加参数';
                
                this.isClickTreeBtn = true;
            },
            treeState(row){
                console.log(row);
                let senddata ={
                    id:row.data.id,
                    status:row.data.status==1?0:1
                }
                openMessagebox('变更状态',`<p class='center'>是否变更${row.data.name}的状态<p>`,async ()=>{
                    await this.$store.dispatch('DataModule/CHANGE_PRAR_STATUS',senddata);
                    let getdata = this.$store.state.DataModule.CHANGE_PRAR_STATUS;
                    this.$message.success(getdata.message);
                    this.getTreedata();
                });
            },
            changeClick(){
                this.isClickTreeBtn = false;
                this.getTreedata();
            },
            
        }
    }
</script>

<style lang='scss'>
    .setup_box {
        @extend %setup_box;

        .icon {
            width: 1em;
            height: 1em;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
        }

        .fixtitle {
            background-color: #fff;
            margin-bottom: 10px;
        }

        .isWhile {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            text-align: center;
            height: 200px;
        }
        
    }
    .center{
            text-align: center;
        }
</style>