<template>
    <div class="i-table">
        <!-- 按钮列表 -->
        <div class="btn-list" v-show="toolbar.length">
            <el-button
            v-for="(item, index) in toolbar"
            :key="index"
            :type="item.type"
            @click="item.func">
            {{item.btnName}}
            </el-button>
        </div>
<!-- 内容-->
        <div class="table-container">
              <el-table
              @cell-click="openpic"
            :data="tableData"
            @selection-change="handleSelectionChange"
            border>
              <el-table-column
              v-if="selectionShow"
                type="selection"
                width="55"
                align="center">
              </el-table-column>
                <slot></slot>
            </el-table>
        </div>
<!-- 分页 -->
        <div class="table-pagination" v-show="tableData.length">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageInfo.pageIndex"
              :page-sizes="[5,10,20,50,100]"
              :page-size="pageInfo.pageSize"
              layout="total,sizes,prev,pager,next,jumper"
              :total="pageInfo.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
  name: 'i-table',
  props: {
    toolbar: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    pageInfo: {
      type: Object,
      default: () => {
        return {
          pageNum: 0,
          pageSize: 5,
          total: 0
        }
      }
    },
    selectionShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentPage: 1
    }
  },
  methods: {
    openpic (row, column, event, cell) {
      console.log(row)
      console.log(column)
      console.log(event)
      console.log(cell)
    },
    handleSizeChange (value) {
      this.$emit('handleSizeChange', value)
    },
    handleCurrentChange (value) {
      this.$emit('handleCurrentChange', value)
    },
    // 多选框改变
    handleSelectionChange (rows) {
      console.log('rows', rows)
      this.$emit('selection-change', rows)
    }
  }
}
</script>

<style lang="scss" scoped>
.i-table {
    padding: 10px;
    display: bolock;
}
.table-pagination {
    float: right;
}
.el-button {
  margin-bottom: 10px;
}
</style>
