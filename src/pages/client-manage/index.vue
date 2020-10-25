<template>
    <div>
      <i-search ref="iSearch" :model="formData" @search="search" @reset="reset">
        <el-form-item label="客户名称" prop="test1">
          <el-input v-model="formData.test1" ></el-input>
        </el-form-item>
         <el-form-item label="客户账号" prop="test2">
          <el-input v-model="formData.test2" ></el-input>
        </el-form-item>
      </i-search>
        <el-table
        :border="true"
      :data="tableData"
      :pageInfo="pageInfo"
      :selectionShow="true"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @selection-change="handleSelectionChange"
      align="center">
        <el-table-column
        v-for="(item,index) in columnList"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :formatter="item.formatter"
        align="center">
        </el-table-column>
      </el-table>
        <div class="table-pagination" v-show="tableData.length" style="text-align: right;">
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
import ISearch from '@/components/common/i-search.vue'
import ITable from '@/components/common/i-table.vue'
import IDialog from '@/components/common/i-dialog.vue'
import req from '@/api/client-manage.js'
export default {
  name: 'client-manage',
  components: {
    ISearch,
    ITable,
    IDialog
  },
  data () {
    return {
      formData: {},
      dialogFormData: {},
      dialogTitle: '新增用户',
      dialogVisible: false,
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        total: 0
      },

      columnList: [
        {label: '客户账号', prop: 'userAcct'},
        {label: '姓名', prop: 'userName'},
        {label: '性别', prop: 'sex', formatter: this.formattersex},
        {label: '手机', prop: 'phone'},
        {label: '客户邮箱', prop: 'email'},
        {label: '身份证', prop: 'idCard'}
      ],
      tableData: [
      ]
    }
  },
  mounted () {
    this.pageInfo.total = this.tableData.length
    this.search()
  },
  methods: {
    handleSizeChange (value) {
      this.$emit('handleSizeChange', value)
    },
    handleCurrentChange (value) {
      this.$emit('handleCurrentChange', value)
    },
    // 多选框改变
    handleSelectionChange (rows) {
      this.$emit('selection-change', rows)
    },
    search () {
      req('listCustomer', {
        ...this.formData,
        role: JSON.parse(sessionStorage.getItem('roleInfo')).role,
        pageSize: this.pageInfo.pageSize,
        pageNum: this.pageInfo.pageNum
      }).then(data => {
        console.log(data)
        this.tableData = data.data.list
        this.pageInfo.total = data.data.total
        this.pageInfo.pageIndex = data.data.pageNum
        this.pageInfo.pageSize = data.data.pageSize
      })
    },
    reset () {
      console.log('重置按钮被点击了')
      this.search()
    },
    dialogBeforeClose () {
      this.$refs.dialogFormData.resetFields()
    },
    dialogCancel () {
      this.$refs.dialogFormData.resetFields()
      this.dialogVisible = false
    },
    dialogConfirm () {
      this.$refs.dialogFormData.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          return false
        }
      })
    },
    formattersex (row, column) {
      return row.sex === 1 ? '男' : row.sex === 0 ? '女' : '未知'
    }
  }
}
</script>

<style lang="scss">
.el-main {
  padding: 0;
}
</style>
