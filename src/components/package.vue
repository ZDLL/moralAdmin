<!-- 共用翻页 -->
<!-- 使用方法：<myPackage
            v-if="packTotal" //总条数
            :key="packTotal" //总条数
            :pageTotal="packTotal"
            :pageCurrent="pageCurrent"   //当前页
            @handleCurrent="handleCurrentFunc"  //获取翻页的方法
          ></myPackage> 
  -->
<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: "pagination",
  data() {
    return {
      pageSize: 10, //默认每页10条数据
      total: this.pageTotal,
      currentPage: this.pageCurrent //默认第一页开始
    };
  },
  watch:{
    pageCurrent(newVal){
      this.currentPage = newVal;
    }
  },
  props: {
    pageTotal: {
      type: Number,
      default: 0
    },
    pageCurrent:{
       type: Number,
       default: 0
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("handleSize", val);
    },
    handleCurrentChange(val) {
      // document.getElementById("searchBar").scrollTop = 0
      this.$emit("handleCurrent", val);
    }
  },
  created() {
    
  },
  mounted() {
  },
  filters: {}
};
</script>
<style lang="scss">
.pagination {
  padding: 6px;
  // background-color: #fff;
  margin-top: 30px;
  text-align: right;
  .el-pager li {
    font-weight: 500;
    background: none;
  }
  .el-pager li.active {
    font-weight: 600;
  }
  .btn-prev,
  .btn-next {
    background: none;
  }
  .el-pagination button:disabled {
    background: none;
  }
  .el-input__inner {
    background-color: transparent;
  }
}
</style>

