<template>

<!-- <myTree v-if='treeData.length>0'
     :key="treeKey"
      :tree-data='treeData'        //  tree树状图数据    [{{},children:[]}]
       :default-props='defaultProps'     // 
        @treeEdit="InfoEditor"
          @treeAddNext='cAddInfo'></myTree> -->

    <div id='myTree'>
        <el-tree
            :data="data"
            :props="treeCig.defProp"
            accordion
            >
            <span class="custom-tree-node" slot-scope="{ node, data }">
                
                    <el-tooltip class="item" effect="dark" :content="node.label" placement="right">
                        <span style="line-height: 26px" class='no_width'>
                            {{ node.label }} [ {{data[treeCig.stateKey] | codeStatus}} ]
                        </span>
                        <!-- <el-button>上左</el-button> -->
                    </el-tooltip>
                   
               
                <span v-if='treeCig.stateBtn && data[treeCig.yEdit]' style="float: right;margin-left:8px" @click.stop="() => treeState(node, data)">
                        <el-button  :type="data[treeCig.stateKey]==treeCig.noEnable?'danger':''" size="mini">{{data[treeCig.stateKey] | statusBtnTxt}}</el-button>
                </span>
                 <span v-if='treeCig.viewBtn' style="float: right;margin-left:8px" @click.stop="() => treeView(node, data)">
                        <el-button size="mini">查看</el-button>
                </span>
                <span v-if='treeCig.delBtn' style="float: right;margin-left:8px" @click.stop="() => treeDel(node, data)">
                        <el-button size="mini">删除</el-button>
                </span>
                <span v-if='treeCig.editBtn && data[treeCig.yEdit]' style="float: right;margin-left:8px" @click.stop="() => InfoEditor(node, data)">
                        <el-button size="mini">编辑</el-button>
                </span>
                
                <span v-if='treeCig.addNxtBtn' style="float: right;" @click.stop="() => cAddInfo(node, data)">
                        <el-button size="mini">添加子级</el-button>
                </span>
            </span>
        </el-tree>
    </div>
</template>
<script>
export default {
    name:'mytree',
    props:{
        treeData:{
            type:Array,
            default:[]
        },
        treeConifg:{
            type:Object,
            default:{
                defProp:{//状态数上的配置
                    children: 'children',//子集的key键
                    label: 'label'//显示的名字
                },
                treeNodeWitdh:300,//树状图的宽度
                yEdit:'level',//编辑的key key键的值有则展示
                editBtn:true,//按钮的总配置，若为false 则不显示
                addNxtBtn:true,
                delBtn:true,
                viewBtn:true,
                stateBtn:true,
                noEnable:1,
                stateKey:'status'//判断状态的键
            }
        }
    },
    watch:{
        treeData(newVal,oldVal){
            this.data = newVal;
        }
    },
    data(){
        return{
            data:[],
            treeCig:{
                defProp:{
                    children: 'child',
                    label: 'name'
                },
                // treeNodeWitdh:300,
                noEdit:0,
                editBtn:true,
                addNxtBtn:true,
                delBtn:false,
                viewBtn:false,
                stateBtn:true,
                stateKey:'status',
                yEdit:'level',
                noEnable:1
            }
        }
    },
    methods:{
        treeView(node,data){//查看
            this.$emit("treeView",{data:data,node:node})
        },
        treeDel(node,data){//删除
             this.$emit("treeDel",{data:data,node:node})
        },
        InfoEditor(node,data){//编辑
            this.$emit("treeEdit",{data:data,node:node})
        },
        cAddInfo(node,data){//添加子集
            this.$emit("treeAddNext",{data:data,node:node})
        },
        treeState(node,data){//状态函数
            this.$emit("treeState",{data:data,node:node})
        }
    },
    created(){
        this.data=[];
        if(Object.keys(this.treeConifg).length>0){
            this.treeCig = this.treeConifg
        }
        if(!this.treeData || this.treeData.length==0){
            this.$message.error('树状图暂无数据');return;
        }
        this.data= this.treeData
    }
}
</script>
<style lang="scss">
    #myTree{
        display: inline-block;
        vertical-align: top;
        width: 100%;
        .el-tree-node__content{
            padding: 5px 0;
            min-width: 300px; 
        }
        .el-tree-node>.el-tree-node__children{
            overflow:inherit;
        }
        .custom-tree-node {
            min-width: 92%;
            .el-button--mini{
                padding: 4px 4px;
            }
        }
        .no_width{
            display: inline-block;
            vertical-align: top;
            max-width: 50%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

    }
</style>