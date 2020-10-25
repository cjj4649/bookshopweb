<template>
    <div>
      <i-search ref="iSearch" :model="formData" @search="search" @reset="reset">
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="formData.userName" ></el-input>
        </el-form-item>
         <el-form-item label="账号" prop="userAcct">
          <el-input v-model="formData.userAcct" ></el-input>
        </el-form-item>
         <el-form-item label="用户角色" prop="role">
                  <el-select v-model="formData.role">
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
        v-for="(item,index) in columnList"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :formatter="item.formatter"
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
              <el-col :span="12">
                <el-form-item label="用户账号" prop="userAcct">
                  <el-input v-model="dialogFormData.userAcct"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用户姓名" prop="userName">
                  <el-input v-model="dialogFormData.userName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用户性别" prop="sex">
                    <el-select v-model="dialogFormData.sex">
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
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="dialogFormData.phone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用户邮箱" prop="email">
                  <el-input v-model="dialogFormData.email"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证 " prop="idCard">
                  <el-input v-model="dialogFormData.idCard"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="用户密码" prop="userPwd">
                  <el-input v-model="dialogFormData.userPwd"></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="12">
                <el-form-item label="用户角色" prop="role">
                  <el-select v-model="dialogFormData.role">
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
                  <el-form-item label="用户头像">
               <el-upload
               class="upload-demo"
               action="http://a309200w30.goho.co"
               :on-preview="handlePreview"
               :on-remove="handleRemove"
               :http-request="change"
               :before-remove="beforeRemove"
                multiple
               :limit="1"
               :on-exceed="handleExceed"
               :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                 </el-upload>
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
import IImg from '@/components/i-img.vue'
import req from '@/api/user-manage.js'
import axios from 'axios'
export default {
  name: 'user-manage',
  components: {
    ISearch,
    ITable,
    IDialog,
    IImg
  },
  data () {
    return {
      picturePath: {},
      fileList: [],
      userCode: [],
      formData: {
        userName: '',
        userAcct: ''

      },
      dialogFormData: {},
      options: [
        {label: '管理员', value: '1'},
        {label: '店长', value: '2'}
      ],
      options1: [
        {label: '男', value: '0'},
        {label: '女', value: '1'}
      ],
      dialogTitle: '',
      dialogVisible: false,
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
        total: 0
      },
      rules: {
        userAcct: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        userName: [{ required: true, message: '请输入名字', trigger: 'blur' }],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        idCard: [
          { required: true, message: '请输入身份证', trigger: 'blur' }
        ],
        userPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      toolbar: [
        {
          btnName: '新增',
          type: 'primary',
          func: () => {
            console.log(this.dialogVisible)
            this.dialogVisible = true
            this.dialogTitle = '新增用户'
          }
        },
        {
          btnName: '修改',
          type: 'primary',
          func: () => {
            console.log(this.dialogVisible)
            if (this.userCode.length !== 1) {
              alert('不允许修改多条数据或者请选择一条数据')
            } else {
              this.dialogVisible = true
              this.dialogTitle = '修改用户'
              req('searchuser', {
                userCode: this.userCode.join(',')
              }).then(data => {
                console.log(data)
                this.dialogFormData = data.data
              })
            }
          }
        },
        {
          btnName: '删除',
          type: 'primary',
          func: () => {
            if (this.userCode.length === 0) {
              alert('请选择一条数据')
            } else {
              this.$confirm('此操作将永久删除该文件,是否继续?').then(() => {
                req('deletuser', {
                  userCode: this.userCode.join(',')
                }).then(data => {
                  if (data.code === 0) {
                    console.log(data)
                    this.search()
                    this.$message({
                      type: 'success',
                      message: '删除成功'
                    })
                  } else {
                    this.$message({
                      type: 'success',
                      message: data.data.msg
                    })
                  }
                })
              })
            }
          }
        }
      ],
      columnList: [
        {label: '账号', prop: 'userAcct'},
        {label: '姓名', prop: 'userName'},
        {label: '角色', prop: 'role', formatter: this.formatterrole},
        {label: '性别', prop: 'sex', formatter: this.formattersex},
        {label: '手机', prop: 'phone'},
        {label: '邮箱', prop: 'email'},
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
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name} ？`)
    },
    change (value) {
      console.log(value.file)
      var formdata = new FormData()
      formdata.append('multipartFile', value.file)
      formdata.append('access_token', JSON.parse(sessionStorage.getItem('userinfo')).access_token)
      axios({
        method: 'post',
        url: 'http://a309200w30.goho.co/pc/picture/upload',
        data: formdata,
        headers: {
          'Content-Type': 'miltipt/form-data'
        }
      }).then(data => {
        console.log('data图片', data)
        this.picturePath = data.data.data
        console.log('图片路径', this.picturePath)
      })
    },
    formattersex (row, column) {
      return row.sex === 1 ? '男' : row.sex === 0 ? '女' : '未知'
    },
    formatterrole (row, column) {
      return row.role === '1' ? '管理员' : row.role === '2' ? '店长' : row.role === '4' ? '司机' : row.role === '3' ? '用户' : '未知'
    },
    search () {
      req('getTableData', {
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
      req('getTableData', {
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
      req('getTableData', {
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
      this.userCode = []
      rows.forEach(item => {
        this.userCode.push(item.userCode)
      })
      console.log('zzz', this.userCode.join(','))
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
          if (this.dialogTitle === '新增用户') {
            req('adduser', {
              imagePath: this.picturePath,
              ...this.dialogFormData
            }).then(data => {
              console.log(data)
              if (data.code === 0) {
                this.dialogVisible = false
                this.search()
                this.$message({
                  type: 'success',
                  message: '新增成功'
                })
                this.dialogFormData = {}
                this.fileList = []
              } else {
                this.$message({
                  type: 'success',
                  message: data.msg
                })
              }
            })
          } else {
            req('updateUser', {
              imagePath: this.picturePath,
              userCode: this.dialogFormData.userCode,
              userAcct: this.dialogFormData.userAcct,
              userName: this.dialogFormData.userName,
              sex: this.dialogFormData.sex,
              phone: this.dialogFormData.phone,
              email: this.dialogFormData.email,
              idCard: this.dialogFormData.idCard,
              userPwd: this.dialogFormData.userPwd,
              role: this.dialogFormData.role,
              version: this.dialogFormData.version
            }).then(data => {
              console.log(data)
              if (data.code === 0) {
                this.dialogVisible = false
                this.search()
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.dialogFormData = {}
                this.fileList = []
              } else {
                this.$message({
                  type: 'success',
                  message: data.msg
                })
              }
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.el-main {
  padding: 0;
}
.upload-demo {
  display: flex;
    align-items: center;
     position: relative;
    left: 19px;
}
</style>
