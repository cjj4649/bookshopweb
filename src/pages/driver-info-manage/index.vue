<template>
    <div>
      <i-search ref="iSearch" :model="formData" @search="search" @reset="reset">
        <el-form-item label="司机编号" prop="driverCode">
          <el-input v-model="formData.driverCode" ></el-input>
        </el-form-item>
         <el-form-item label="司机姓名" prop="userName">
          <el-input v-model="formData.userName" ></el-input>
        </el-form-item>
          <el-form-item label="所在省份" prop="provinceId" >
          <el-select v-model="formData.provinceId" @change="provinceIdChange" style="width: 206.4px">
            <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="所在城市" prop="cityId" >
          <el-select v-model="formData.cityId"  @change="cityIdChange" style="width: 206.4px">
            <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在区" prop="areaId" >
          <el-select v-model="formData.areaId" style="width: 206.4px">
            <el-option
                  v-for="item in options2"
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
     @dialog-before-close="dialogBeforeClose"
       v-model="dialogVisible">
        <el-form :model="dialogFormData" :rules="rules" ref="dialogFormData" label-width="120px" :disabled="disabled">
            <el-row>
              <el-col :span="12">
                <el-form-item label="司机名称" prop="userName">
                  <el-input v-model.number="dialogFormData.userName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话" prop="phone">
                  <el-input v-model.number="dialogFormData.phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="司机账号 " prop="userAcct">
                  <el-input v-model.number="dialogFormData.userAcct"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="密码" prop="userPwd">
                  <el-input v-model.number="dialogFormData.userPwd"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证号" prop="idCard">
                  <el-input v-model.number="dialogFormData.idCard"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所在省" prop="provinceId">
                  <el-select v-model="dialogFormData.provinceId" @change="provinceIdChange">
                  <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
                <el-col :span="12">
                <el-form-item label="所在市" prop="cityId" >
                  <el-select v-model="dialogFormData.cityId"  @change="cityIdChange">
                  <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所在区" prop="areaId">
                  <el-select v-model="dialogFormData.areaId">
                  <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
        </el-form>
      </i-dialog>
    </div>
</template>

<script>
import ISearch from '@/components/common/i-search.vue'
import ITable from '@/components/common/i-table.vue'
import IDialog from '@/components/common/i-dialog.vue'
import req from '@/api/driver-info-manage.js'
export default {
  name: 'driver-info-manage',
  components: {
    ISearch,
    ITable,
    IDialog
  },
  data () {
    return {
      disabled: false,
      driverCode: [],
      formData: {},
      dialogFormData: {},
      options: [
      ],
      options1: [
      ],
      options2: [
      ],
      dialogTitle: '新增用户',
      dialogVisible: false,
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        total: 0
      },
      rules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        userAcct: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机', trigger: 'blur' }
        ],
        userPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        idCard: [
          { required: true, message: '请输入身份证', trigger: 'blur' }
        ],
        provinceId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        cityId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        areaId: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      toolbar: [
        {
          btnName: '详情',
          type: 'primary',
          func: () => {
            console.log(this.dialogVisible)
            if (this.driverCode.length !== 1) {
              this.$message({
                type: 'error',
                message: '不允许查看多条数据或者选择一条数据'
              })
            } else {
              this.dialogVisible = true
              this.dialogTitle = '司机详情'
              req('searchdriver', {
                driverCode: this.driverCode.join(',')
              }).then(data => {
                console.log('司机修改信息', data)
                this.provinceIdChange(data.data.provinceId)
                this.cityIdChange(data.data.cityId)
                this.dialogFormData = data.data
                this.disabled = true
              })
            }
          }
        },
        {
          btnName: '新增',
          type: 'primary',
          func: () => {
            console.log(this.dialogVisible)
            this.dialogVisible = true
            this.dialogTitle = '司机新增'
          }
        },
        {
          btnName: '修改',
          type: 'primary',
          func: () => {
            console.log(this.dialogVisible)
            if (this.driverCode.length !== 1) {
              this.$message({
                type: 'error',
                message: '不允许修改多条数据或者选择一条数据'
              })
            } else {
              this.dialogVisible = true
              this.dialogTitle = '司机修改'
              req('searchdriver', {
                driverCode: this.driverCode.join(',')
              }).then(data => {
                console.log('司机修改信息', data)
                this.provinceIdChange(data.data.provinceId)
                this.cityIdChange(data.data.cityId)
                this.dialogFormData = data.data
                this.disabled = false
              })
            }
          }
        },
        {
          btnName: '删除',
          type: 'primary',
          func: () => {
            if (this.driverCode.length === 0) {
              this.$message({
                type: 'error',
                message: '请选择一条数据'
              })
            } else {
              this.$confirm('此操作将永久删除该文件,是否继续?').then(() => {
                req('deleteDriver', {
                  driverCode: this.driverCode.join(',')
                }).then(data => {
                  console.log(data)
                  if (data.code === 0) {
                    this.$message({
                      type: 'success',
                      message: '删除成功'
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
        }
      ],
      columnList: [
        {label: '司机编号', prop: 'driverCode'},
        {label: '姓名', prop: 'userName'},
        {label: '手机', prop: 'phone'},
        {label: '身份证', prop: 'idCard'},
        {label: '账号', prop: 'userAcct'}
      ],
      tableData: [
      ]
    }
  },
  mounted () {
    this.pageInfo.total = this.tableData.length
    this.search()
    req('listArea', {
      flagId: '0'
    }).then(data => {
      console.log('省', data)
      data.data.forEach(item => {
        this.options.push({value: item.areaId, label: item.provinceName})
        console.log('options', this.options)
      })
    })
  },
  methods: {
    provinceIdChange (value) {
      req('listArea', {
        flagId: value
      }).then(data => {
        this.options1 = []
        console.log('市', data)
        data.data.forEach(item => {
          this.options1.push({value: item.areaId, label: item.cityName})
          console.log('options', this.options)
        })
      })
    },
    cityIdChange (value) {
      req('listArea', {
        flagId: value
      }).then(data => {
        console.log('区', data)
        this.options2 = []
        data.data.forEach(item => {
          this.options2.push({value: item.areaId, label: item.areaName})
          console.log('options', this.options)
        })
      })
    },
    search () {
      console.log('搜索按钮被点击了')
      req('getlistDrivers', {
        role: JSON.parse(sessionStorage.getItem('roleInfo')).role,
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
      this.options1 = []
      this.options2 = []
      this.search()
    },
    handleSizeChange (value) {
      req('getlistDrivers', {
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
      req('getlistDrivers', {
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
      console.log('rows', rows)
      this.driverCode = []
      rows.forEach(item => {
        this.driverCode.push(item.driverCode)
      })
      console.log('zzz', this.driverCode)
    },
    dialogBeforeClose () {
      this.$refs.dialogFormData.resetFields()
      this.disabled = false
      this.options1 = []
      this.options2 = []
    },
    dialogCancel () {
      this.$refs.dialogFormData.resetFields()
      this.dialogVisible = false
      this.disabled = false
      this.options1 = []
      this.options2 = []
    },
    dialogConfirm () {
      this.$refs.dialogFormData.validate((valid) => {
        if (valid) {
          if (this.dialogTitle === '司机新增') {
            req('addDriver', {
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
                  message: data.msg
                })
              }
            })
          } else if (this.dialogTitle === '司机修改') {
            req('updateDriver', {
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
                  message: data.msg
                })
              }
            })
          } else {
            this.dialogVisible = false
            this.disabled = false
            this.search()
          }
        } else {
          return false
        }
      })
      this.options1 = []
      this.options2 = []
    }
  }
}
</script>

<style lang="scss">
.el-main {
  padding: 0;
}
</style>
