<template>
    <div>
      <i-search ref="iSearch" :model="formData" @search="search" @reset="reset">
        <el-form-item label="下单人" prop="userName">
          <el-input v-model="formData.userName" ></el-input>
        </el-form-item>
         <el-form-item label="订单编码" prop="orderCode">
          <el-input v-model="formData.orderCode" ></el-input>
        </el-form-item>
         <el-form-item label="付款时间" >
    <el-col :span="11">
      <el-form-item prop="date1">
        <el-date-picker type="date" placeholder="" v-model="formData.payTimeStart" style="width: 100%;"  value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
    </el-col>
    <el-col class="line" :span="2">----</el-col>
    <el-col :span="11">
      <el-form-item prop="date2">
         <el-date-picker type="date" placeholder="" v-model="formData.payTimeEnd" style="width: 100%;"  value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
    </el-col>
         </el-form-item>
         <el-form-item label="手机号" prop="phone">
          <el-input v-model="formData.phone" ></el-input>
        </el-form-item>
        <el-form-item label="订单状态" prop="orderStatus">
          <el-select v-model="formData.orderStatus" style="width: 206.4px">
             <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
          </el-select>
        </el-form-item>
      </i-search>

      <i-table
      :toolbar="toolbar"
      :tableData="tableData"
      :pageInfo="pageInfo"
      :selectionShow="true"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @selection-change="handleSelectionChange">
        <el-table-column
        :formatter="item.formatter"
        v-for="(item,index) in columnList"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        align="center">
        </el-table-column>
      </i-table>
      <i-dialog
      :title="dialogTitle"
     @dialog-cancel="dialogCancel"
     @dialog-confirm="dialogConfirm"
       v-model="dialogVisible">
        <el-table :data="dialogFormData"  ref="dialogFormData" label-width="100px">
          <el-table-column
        v-for="(item,index) in columnList1"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        align="center">
        </el-table-column>
        </el-table>
      </i-dialog>
    </div>
</template>

<script>
import ISearch from '@/components/common/i-search.vue'
import ITable from '@/components/common/i-table.vue'
import IDialog from '@/components/common/i-dialog.vue'
import req from '@/api/order-manage.js'
export default {
  name: 'order-manage',
  components: {
    ISearch,
    ITable,
    IDialog
  },
  data () {
    return {
      OrderCode: [],
      orderStatus: '',
      version: [],
      formData: {},
      dialogFormData: [],
      options: [
        {label: '已下单', value: '0'},
        {label: '已取消', value: '1'},
        {label: '已到货', value: '2'},
        {label: '已取货', value: '3'},
        {label: '已完成未评价', value: '4'},
        {label: '已完成已评价', value: '5'}
      ],
      dialogTitle: '订单详情',
      dialogVisible: false,
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        total: 0
      },
      rules: {
        user: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        name: [{ type: 'number', required: true, message: '请输入名字', trigger: 'blur' }],
        sex: [
          { required: true, message: '请输入性别', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机', trigger: 'blur' }
        ],
        email: [
          { type: 'email', required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        idcard: [
          { required: true, message: '请输入身份证', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        id: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      toolbar: [
        {
          btnName: '详情',
          type: 'primary',
          func: () => {
            console.log(this.dialogVisible)
            this.dialogVisible = true
            req('getOrderByOrderCode', {
              orderCode: this.OrderCode.join(',')
            }).then(data => {
              console.log(data)
              this.dialogFormData.push(data.data)
              console.log('1', data.data)
              console.log('2', this.dialogFormData)
            })
          }
        },
        {
          btnName: '取消订单',
          type: 'primary',
          func: () => {
            if (this.OrderCode.length !== 0) {
              req('updateOrderStatus', {
                orderCode: this.OrderCode.join(','),
                version: this.version.join(','),
                orderStatus: 1
              }).then(data => {
                console.log(data)
                if (data.code === 0) {
                  this.$message({
                    type: 'success',
                    message: data.msg
                  })
                  this.search()
                } else {
                  this.$message({
                    type: 'error',
                    message: data.msg
                  })
                }
              })
            } else {
              this.$message({
                type: 'error',
                message: '请选择数据'
              })
            }
          }
        },
        {
          btnName: '订单到货',
          type: 'primary',
          func: () => {
            if (this.OrderCode.length !== 0) {
              req('updateOrderStatus', {
                orderCode: this.OrderCode.join(','),
                version: this.version.join(','),
                orderStatus: 2
              }).then(data => {
                console.log(data)
                if (data.code === 0) {
                  this.$message({
                    type: 'success',
                    message: data.msg
                  })
                  this.search()
                } else {
                  this.$message({
                    type: 'error',
                    message: data.msg
                  })
                }
              })
            } else {
              this.$message({
                type: 'error',
                message: '请选择数据'
              })
            }
          }
        },
        {
          btnName: '取消到货',
          type: 'primary',
          func: () => {
            if (this.OrderCode.length !== 0) {
              req('updateOrderStatus', {
                orderCode: this.OrderCode.join(','),
                version: this.version.join(','),
                orderStatus: 0
              }).then(data => {
                console.log(data)
                if (data.code === 0) {
                  this.$message({
                    type: 'success',
                    message: data.msg
                  })
                  this.search()
                } else {
                  this.$message({
                    type: 'error',
                    message: data.msg
                  })
                }
              })
            } else {
              this.$message({
                type: 'error',
                message: '请选择数据'
              })
            }
          }
        },
        {
          btnName: '订单已取货',
          type: 'primary',
          func: () => {
            if (this.OrderCode.length !== 0) {
              req('updateOrderStatus', {
                orderCode: this.OrderCode.join(','),
                version: this.version.join(','),
                orderStatus: 3
              }).then(data => {
                console.log(data)
                if (data.code === 0) {
                  this.$message({
                    type: 'success',
                    message: data.msg
                  })
                  this.search()
                } else {
                  this.$message({
                    type: 'error',
                    message: data.msg
                  })
                }
              })
            } else {
              this.$message({
                type: 'error',
                message: '请选择数据'
              })
            }
          }
        },
        {
          btnName: '取消已取货',
          type: 'primary',
          func: () => {
            if (this.OrderCode.length !== 0) {
              req('updateOrderStatus', {
                orderCode: this.OrderCode.join(','),
                version: this.version.join(','),
                orderStatus: 2
              }).then(data => {
                console.log(data)
                if (data.code === 0) {
                  this.$message({
                    type: 'success',
                    message: data.msg
                  })
                  this.search()
                } else {
                  this.$message({
                    type: 'error',
                    message: data.msg
                  })
                }
              })
            } else {
              this.$message({
                type: 'error',
                message: '请选择数据'
              })
            }
          }
        },
        {
          btnName: '导出',
          type: 'primary',
          func: () => {
            console.log(this.dialogVisible)
            this.dialogVisible = true
          }
        }
      ],
      columnList: [
        {label: '订单编码', prop: 'orderCode'},
        {label: '订单总价', prop: 'orderPrice'},
        {label: '订单状态', prop: 'orderStatus', formatter: this.formatterorderStatus},
        {label: '门店编码', prop: 'storeCode'},
        {label: '下单人姓名', prop: 'userName'},
        {label: '下单人手机号', prop: 'phone'},
        {label: '确认收款时间', prop: 'test6'}
      ],
      columnList1: [
        {label: '用户编号', prop: 'userCode'},
        {label: '订单编号', prop: 'orderCode'},
        {label: '商品编号', prop: 'goodsCode'},
        {label: '商品名称', prop: 'goodsName'},
        {label: '商品数量', prop: 'goodsCount'},
        {label: '总金额', prop: 'orderPrice'},
        {label: '售价', prop: 'goodsPrice'}
      ],
      tableData: [
      ]
    }
  },
  mounted () {
    this.pageInfo.total = this.tableData.length
    this.search()
    if (this.orderStatus === 0) {
      this.tableData.orderStatus = '取消'
    }
  },
  methods: {
    formatterorderStatus (row, column) {
      return row.orderStatus === '0' ? '已下单' : row.orderStatus === '1' ? '已取消' : row.orderStatus === '2' ? '已到货' : row.orderStatus === '3' ? '已取货' : row.orderStatus === '4' ? '已完成未评价' : row.orderStatus === '5' ? '已完成已评价' : '未知'
    },
    search () {
      req('listOrder', {
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
      this.formData = {}
    },
    handleSizeChange (value) {
      req('listOrder', {
        pageSize: value,
        pageNum: this.pageInfo.pageNum
      }).then(data => {
        console.log(data)
        this.pageInfo.total = data.data.total
        this.pageInfo.pageIndex = data.data.pageNum
        this.pageInfo.pageSize = data.data.pageSize
        this.tableData = data.data.list
      })
    },
    handleCurrentChange (value) {
      req('listOrder', {
        pageSize: this.pageInfo.pageSize,
        pageNum: value
      }).then(data => {
        console.log(data)
        this.tableData = data.data.list
        this.pageInfo.total = data.data.total
        this.pageInfo.pageIndex = data.data.pageNum
        this.pageInfo.pageSize = data.data.pageSize
      })
    },
    handleSelectionChange (rows) {
      this.OrderCode = []
      this.version = []
      this.orderStatus = []
      rows.forEach(item => {
        this.OrderCode.push(item.orderCode)
        this.version.push(item.version)
        this.orderStatus.push(item.orderStatus)
      })
      console.log('zzz', this.OrderCode.join(','))
    },
    dialogCancel () {
      this.dialogVisible = false
      this.dialogFormData = []
    },
    dialogConfirm () {
      this.dialogVisible = false
      this.dialogFormData = []
    }
  }
}
</script>

<style lang="scss" scoped>
.el-main {
  padding: 0;
}
</style>
