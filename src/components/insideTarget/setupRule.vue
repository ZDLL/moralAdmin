<template>
    <el-dialog class="setupRule" title="提示" :visible.sync="dialogVisible" width="70%" :before-close="handleClose"
        @closed="closeClear">
        <div class="flex_box">
            <el-input id="inputContent" type="textarea" @focus="isfocus" @blur="isBlur" class="contentInt" :autosize="{ minRows: 20}"
                placeholder="请输入设置规则" v-model="content">
            </el-input>
            <div class="contentBtn">
                <el-button type='primary' @click="addtarget" class="fir_btn">选择指标</el-button>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                dialogVisible: false,
                content: '',
                mousePlace: [0,0], //  内有两个参数  第一个为前鼠标复制位置 第二个为后一个鼠标复制位置
            }
        },
        methods: {
            addbtnText(item) {
                let contentInt = document.getElementById('inputContent'),
                    mouseArr =[0,0];
                let isnotcursor = this.mousePlace.every(mouse=> mouse ==0)
                // console.log(isnotcursor)
                switch(item){
                    case 'sum':
                        isnotcursor?this.content+='sum(##)':this.content = this.content.substring(0,this.mousePlace[0])+'sum(##)'+this.content.substring(this.mousePlace[0],this.content.length)
                        break;
                    case 'count':
                        isnotcursor?this.content+='count(##)':this.content = this.content.substring(0,this.mousePlace[0])+'count(##)'+this.content.substring(this.mousePlace[0],this.content.length)
                        break;
                    case 'case':
                        isnotcursor?this.content+='case when end ':this.content = this.content.substring(0,this.mousePlace[0])+'case when end '+this.content.substring(this.mousePlace[0],this.content.length)
                        break;
                    // default:
                    //     isnotcursor?this.content+=item:this.content = this.content.substring(0,this.mousePlace[0])+item+this.content.substring(this.mousePlace[0],this.content.length)
                }
            },
           
            addtarget(){
                let indexNum = this.mousePlace[0];
                this.content = this.content.substring(0,indexNum)+'这个是点击的名称'+this.content.substring(indexNum,this.content.length);
            },
            isBlur(istype) {
                let contentInt = document.getElementById('inputContent');
                this.mousePlace = [];
                this.mousePlace.push(contentInt.selectionStart)
                this.mousePlace.push(contentInt.selectionEnd)
                contentInt.selectionStart =this.mousePlace[0];
                contentInt.selectionEnd = this.mousePlace[1];
            },
            isfocus(){
                
            },
            openDialog() {
                this.dialogVisible = true;
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            closeClear() {
                this.content = '';
            }
        }
    }
</script>

<style lang="scss">
    .setupRule {
        .flex_box {
            width: 100%;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;

            .contentInt {
                width: 70%;
            }

            .contentBtn {
                width: 28%;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                flex-wrap: wrap;

                .el-button {
                    // display: block;
                    width: 50%;
                    margin: 0;
                }

                .fir_btn {
                    width: 100%;
                    margin: 0;
                }
            }

        }
    }
</style>