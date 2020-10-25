<template>
    <div>
      <i-search ref="iSearch" :model="formData" @search="search" @reset="reset">
        <el-form-item label="商品名称" prop="goodsName">
          <el-input v-model="formData.goodsName" ></el-input>
        </el-form-item>
        <el-form-item label="商品编号" prop="goodsCode">
          <el-input v-model="formData.goodsCode" ></el-input>
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
     @dialog-before-close="dialogBeforeClose"
       v-model="dialogVisible">
        <el-form :model="dialogFormData" :rules="rules" ref="dialogFormData" label-width="100px" >
            <el-row>
              <el-col :span="24">
                <el-form-item label="热门位排序" prop="hotSorting">
                  <el-input v-model="dialogFormData.hotSorting" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="商品" prop="goodsCode">
                   <div style="display: flex; align-items: center;"><el-input v-model="dialogFormData.goodsCode"></el-input><comm-select  v-model="dialogFormData.goodsCode"></comm-select></div>
                </el-form-item>
              </el-col>
            </el-row>
        </el-form>
      </i-dialog>
      <i-dialog1
      :title="dialogTitle"
     @dialog-cancel="dialogCancel1"
     @dialog-confirm="dialogConfirm1"
     @dialog-before-close="dialogBeforeClose1"
       v-model="dialogVisible1" >
        <el-form label-width="100px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="数量">
                  <el-input v-model="dialogFormData1"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
        </el-form>
      </i-dialog1>
    </div>
</template>

<script>
import ISearch from '@/components/common/i-search.vue'
import ITable from '@/components/common/i-table.vue'
import IDialog from '@/components/common/i-dialog.vue'
import IDialog1 from '@/components/common/i-dialog1.vue'
import req from '@/api/hot-comm-manage.js'
import CommSelect from './comm-select.vue'

export default {
  name: 'hot-comm-manage',
  components: {
    ISearch,
    ITable,
    IDialog,
    CommSelect,
    IDialog1
  },
  data () {
    return {
      dialogFormData1: 0,
      version: [],
      hotGoodsCode: [],
      formData: {},
      dialogFormData: {},
      options: [
        {label: '管理员', value: '1'},
        {label: '店长', value: '2'}
      ],
      dialogTitle: '新增热门位商品',
      dialogVisible: false,
      dialogVisible1: false,
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        total: 0
      },
      rules: {
        hotSorting: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        goodsCode: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ]
      },
      toolbar: [
        {
          btnName: '新增',
          type: 'primary',
          func: () => {
            console.log(this.dialogVisible)
            this.dialogVisible = true
            this.dialogTitle = '热门商品新增'
          }
        },
        {
          btnName: '修改',
          type: 'primary',
          func: () => {
            console.log(this.dialogVisible)
            if (this.hotGoodsCode.length !== 1) {
              this.$message({
                type: 'error',
                message: '不允许修改多条数据或者选择一条数据'
              })
            } else {
              this.dialogVisible = true
              this.dialogTitle = '热门商品修改'
              req('getHotGoods', {
                hotGoodsCode: this.hotGoodsCode.join(',')
              }).then(data => {
                console.log('热门商品修改', data)
                this.dialogFormData = data.data
              })
            }
          }
        },
        {
          btnName: '删除',
          type: 'primary',
          func: () => {
            if (this.hotGoodsCode.length === 0) {
              this.$message({
                type: 'error',
                message: '请选择一条数据'
              })
            } else {
              this.$confirm('此操作将永久删除该文件,是否继续?').then(() => {
                req('deleteHotGoods', {
                  hotGoodsCode: this.hotGoodsCode.join(',')
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
              })
            }
          }
        },
        {
          // getHotGoodsShowNum
          btnName: '展示数量设置',
          type: 'primary',
          func: () => {
            this.dialogTitle = '展示数量'
            this.dialogVisible1 = true
            console.log(this.dialogVisible1)
            req('getHotGoodsShowNum', {
            }).then(data => {
              console.log('热门商品修改', data.data)
              this.dialogFormData1 = data.data
              console.log('热门商品修改', this.dialogFormData1)
            })
          }
        }
      ],
      columnList: [
        {label: '热门商品排序', prop: 'hotSorting'},
        {label: '商品编号', prop: 'goodsCode'},
        {label: '商品名称', prop: 'goodsName'},
        {label: '商品价格', prop: 'goodsPrice'},
        {label: '商品描述', prop: 'goodsIntroduction'}
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
    listgoods () {
      this.dialogVisible1 = true
      req('listGoodsPicture', {
        pageSize: this.pageInfo.pageSize,
        pageNum: this.pageInfo.pageNum
      }).then(data => {
        console.log(data)
      })
    },
    search () {
      req('listHotGoods', {
        ...this.formData,
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
    handleSizeChange (value) {
      req('listHotGoods', {
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
      req('listHotGoods', {
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
      this.version = []
      this.hotGoodsCode = []
      rows.forEach(item => {
        this.hotGoodsCode.push(item.hotGoodsCode)
        this.version.push(item.version)
      })
      console.log('zzz', this.hotGoodsCode.join(','))
    },
    dialogBeforeClose () {
      this.$refs.dialogFormData.resetFields()
      this.dialogFormData = {}
    },
    dialogCancel () {
      this.$refs.dialogFormData.resetFields()
      this.dialogVisible = false
      this.dialogFormData = {}
    },
    dialogConfirm () {
      this.$refs.dialogFormData.validate((valid) => {
        if (valid) {
          if (this.dialogTitle === '热门商品新增') {
            req('addHotGoods', {
              ...this.dialogFormData
            }).then(data => {
              console.log(data)
              if (data.code === 0) {
                this.dialogVisible = false
                this.search()
                this.$message({
                  type: 'success',
                  message: '成功'
                })
                this.dialogFormData = {}
              } else {
                this.$message({
                  type: 'error',
                  message: data.data.msg
                })
              }
            })
          } else {
            req('updateHotGoods', {
              hotGoodsCode: this.hotGoodsCode,
              version: this.version,
              ...this.dialogFormData
            }).then(data => {
              console.log(data)
              if (data.code === 0) {
                this.dialogVisible = false
                this.search()
                this.$message({
                  type: 'success',
                  message: data.msg
                })
                this.dialogFormData = {}
              } else {
                this.$message({
                  type: 'error',
                  message: data.msg
                })
              }
            })
          }
        } else {
          return false
        }
      })
    },
    // 展示数量dialog
    dialogBeforeClose1 () {
      this.dialogVisible1 = false
    },
    dialogCancel1 () {
      this.dialogVisible1 = false
    },
    dialogConfirm1 () {
      req('updateHotGoodsShowNum', {
        hotGoodsNum: this.dialogFormData1,
        version: this.version
      }).then(data => {
        console.log(data)
        if (data.code === 0) {
          this.dialogVisible1 = false
          this.search()
          this.$message({
            type: 'success',
            message: data.msg
          })
          this.dialogFormData = {}
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-main {
  padding: 0;
}
.el-input {
  width: 180px;
}
.el-dialog__body {
  text-align: center;
}
</style>
