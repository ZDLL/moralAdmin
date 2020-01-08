
<!-- 使用方法 <dataTrip tripType="3" tripTxt='无数据哦！'></dataTrip> -->
<!-- tripType  1[无数据] 2[出错了] 3[数据丢失] -->
<!-- tripTxt 提示的文字 若不传则用默认的提示-->
<template>
    <div class='isNoData'>
        <div class='cont' v-if='tripType==1'>
            <img src="@/assets/nodata.png" alt="无数据">
            <p v-if='tripTxt'  style="margin:5px 0 0 5px;">{{tripTxt}}</p>
            <p v-else  style="margin:5px 0 0 5px;">暂无数据哦！</p>
        </div>
        <div class='cont' v-if='tripType==2'>
            <img src="@/assets/errImg.png" alt="出错了">
            <p v-if='tripTxt' style="margin:5px 0 0 5px;">{{tripTxt}}</p>
            <p v-else  style="margin:5px 0 0 5px;">页面出错了呦！</p>
        </div>
         <div class='cont' v-if='tripType==3'>
            <img src="@/assets/losedataImg.png" alt="数据丢失">
            <p v-if='tripTxt' style="margin:5px 0 0 5px;">{{tripTxt}}</p>
            <p v-else  style="margin:5px 0 0 5px;">数据丢失了，我在努力找！</p>
        </div>
    </div>
</template>
<script>
export default {
    name:"nodata",
    props:{
        tripType:{
            type:String,
            default:'1'
        },
        tripTxt:{
            type:String,
            default:''
        }
    },
    data(){
        return{}
    },
    methods:{},
    created(){}
}
</script>
<style lang="scss" scoped>
    .isNoData{
        display: inline-block;
        width: 100%;
        text-align: center;
        margin-top: 30px;
        .cont{
            width: 26%;
            margin: 0 auto;
            text-align: center;
            color: #6CB7D6;
            overflow: hidden;
            img{
                width: 100%;
            }
        }
    }
</style>