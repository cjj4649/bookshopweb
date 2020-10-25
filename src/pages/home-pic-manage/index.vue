<template>
    <div>
      <i-search ref="iSearch" :model="formData" @search="search" @reset="reset">
         <el-form-item label="状态" prop="test">
          <el-select v-model="formData.test" >
              <el-option label="全部" value= '0'></el-option>
              <el-option label="启用" value= 1></el-option>
              <el-option label="禁用" value= 2></el-option>
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
        <template slot-scope="scope">
          <el-link :href="scope.row.picturePath" target="_blink" type="primary"
          v-if="item.prop === 'preview'">
          图片
          </el-link>
          <span v-else>{{scope.row[item.prop]}}</span>
        </template>
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
                <el-form-item label="排序" prop="sorting">
                  <el-input v-model="dialogFormData.sorting"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="有效期起" prop="effectiveDate">
                  <el-date-picker
                  type="date"
                   value-format="yyyy-MM-dd"
                   placeholder="选择日期"
                    v-model="dialogFormData.effectiveDate"
                     style="width: 100%;"
                     :picker-options="effectiveDatePickerOptions">
                     </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="有效期止" prop="expiryDate">
                   <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    v-model="dialogFormData.expiryDate"
                    style="width: 100%;"
                    :picker-options="expiryDatePickerOptions">
                    </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品" prop="orders">
                  <div style="display: flex; align-items: center;"><el-input v-model="dialogFormData.goodsCode"></el-input><comm-select  v-model="dialogFormData.goodsCode"></comm-select></div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
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
                <!-- <el-upload
                 class="upload-demo"
                 action="https://jsonplaceholder.typicode.com/posts/"
                 :on-preview="handlePreview"
                 :on-remove="handleRemove"
                 :before-remove="beforeRemove"
                  multiple
                 :limit="3"
                 :on-exceed="handleExceed"
                 >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload> -->
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
import CommSelect from './comm-select.vue'
import IImg from '@/components/i-img.vue'
import req from '@/api/home-pic-manage.js'
import axios from 'axios'
export default {
  name: 'home-pic-manage',
  components: {
    ISearch,
    ITable,
    IDialog,
    CommSelect,
    IImg
  },
  data () {
    return {
      orderType () {
        if (this.tableData.pictureStatus === '1') {
          return '禁用'
        } else if (this.tableData.pictureStatus === '2') {
          return '启用'
        }
      },
      picturePath: {},
      pictureCode: [],
      pictureStatus: [],
      effectiveDatePickerOptions: {
        disabledDate: time => {
          if (this.dialogFormData.expiryDate) {
            return (
              time.getTime() < Date.now() - 8.64e7 || time.getTime() > new Date(this.dialogFormData.expiryDate).getTime()
            )
          } else {
            return time.getTime() < Date.now() - 8.64e7
          }
        }
      },
      expiryDatePickerOptions: {
        disabledDate: time => {
          if (this.dialogFormData.effectiveDate) {
            return (
              time.getTime() < new Date(this.dialogFormData.effectiveDate).getTime() - 1 * 24 * 60 * 60 * 1000
            )
          }
        }
      },
      fileList: [],
      formData: {},
      dialogFormData: {},
      dialogTitle: '',
      dialogVisible: false,
      pageInfo: {
        pageIndex: 1,
        pageSize: 5,
        total: 0
      },
      rules: {
        sorting: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ],
        effectiveDate: [{ required: true, message: '请输入起始日期', trigger: 'blur' }],
        expiryDate: [
          { required: true, message: '请输入终止日期', trigger: 'blur' }
        ]
      },
      toolbar: [
        {
          btnName: '新增',
          type: 'primary',
          func: () => {
            console.log(this.dialogVisible)
            this.dialogVisible = true
            this.dialogTitle = '轮播图新增'
          }
        },
        {
          btnName: '删除',
          type: 'primary',
          func: () => {
            if (this.pictureCode.length === 0) {
              this.$message({
                type: 'error',
                message: '请选择一条数据'
              })
            } else {
              this.$confirm('此操作将永久删除该文件,是否继续?').then(() => {
                req('deletePicture', {
                  pictureCode: this.pictureCode.join(',')
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
                      message: data.data.msg
                    })
                  }
                })
              })
            }
          }
        },
        {
          btnName: '启用 ',
          type: 'primary',
          func: () => {
            if (this.pictureStatus === 2) {
              this.$message({
                type: 'error',
                message: '已经启用'
              })
            } else {
              req('usePicture', {
                pictureStatus: 2,
                pictureCode: this.pictureCode.join(',')
              }).then(data => {
                console.log(data)
                this.search()
              })
            }
          }
        },
        {
          btnName: '禁用',
          type: 'primary',
          func: () => {
            if (this.pictureStatus === 1) {
              this.$message({
                type: 'error',
                message: '已经禁用'
              })
            } else {
              req('usePicture', {
                pictureStatus: 1,
                pictureCode: this.pictureCode.join(',')
              }).then(data => {
                console.log(data)
                this.search()
              })
            }
          }
        }
      ],
      columnList: [
        {label: '排序', prop: 'sorting'},
        {label: '图片路径', prop: 'picturePath'},
        {label: '状态', prop: 'pictureStatus', formatter: this.formatterStatus},
        {label: '预览', prop: 'preview'},
        {label: '有效期起', prop: 'effectiveDate'},
        {label: '有效期止', prop: 'expiryDate'}
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
    openpic (row, column, event, cell) {
      console.log(row)
      console.log(column)
      console.log(event)
      console.log(cell)
    },
    change (value) {
      console.log(value.file)
      var formdata = new FormData()
      formdata.append('multipartFile', value.file)
      // formdata.append('access_token', JSON.parse(sessionStorage.getItem('userinfo')).access_token)
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
    formatterStatus (row, column) {
      return row.pictureStatus === 1 ? '男' : row.pictureStatus === 0 ? '女' : '未知'
    },
    // changeStart () {
    //   this.startTimePickerOptions = Object.assign({}, this.startTimePickerOptions, {
    //     disabledDate: (time) => {
    //       return time.getTime() > this.dialogFormData.expiryDate
    //     }
    //   })
    // },
    // changeEnd () {
    //   this.endTimePickerOptions = Object.assign({}, this.endTimePickerOptions, {
    //     disabledDate: (time) => {
    //       return time.getTime() < this.dialogFormData.effectiveDate
    //     }
    //   })
    // },
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
    search () {
      req('listPicture', {
        pictureStatus: this.formData.test,
        pageSize: this.pageInfo.pageSize,
        pageNum: this.pageInfo.pageNum
      }).then(data => {
        console.log(data)
        this.tableLoading = false
        this.tableData = data.data.list
        this.pageInfo.pageNum = data.data.pageNum
        this.pageInfo.pageSize = data.data.pageSize
        this.pageInfo.total = data.data.total
        if (this.tableData.pictureStatus === '1') {
          this.tableLoading = false
          this.tableData = data.data.list
          this.pageInfo.pageNum = data.data.pageNum
          this.pageInfo.pageSize = data.data.pageSize
          this.pageInfo.total = data.data.total
          this.tableData.pictureStatus = '禁用'
        } else {
          this.tableLoading = false
          this.tableData = data.data.list
          this.pageInfo.pageNum = data.data.pageNum
          this.pageInfo.pageSize = data.data.pageSize
          this.pageInfo.total = data.data.total
          this.tableData.pictureStatus = '启用'
        }
      })
    },
    reset () {
      console.log('重置按钮被点击了')
    },
    handleSizeChange (value) {
      req('listPicture', {
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
      req('listPicture', {
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
      this.pictureCode = []
      this.pictureStatus = []
      rows.forEach(item => {
        this.pictureCode.push(item.pictureCode)
        this.pictureStatus.push(item.pictureStatus)
      })
      console.log('zzz', this.pictureCode)
    },
    dialogBeforeClose () {
      this.$refs.dialogFormData.resetFields()
    },
    dialogCancel () {
      this.$refs.dialogFormData.resetFields()
      this.dialogVisible = false
      // console.log('日期', this.dialogFormData.effectiveDate)
    },
    dialogConfirm () {
      this.$refs.dialogFormData.validate((valid) => {
        if (valid) {
          if (this.dialogTitle === '轮播图新增') {
            req('addPicture', {
              picturePath: this.picturePath,
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
                this.fileList = []
              } else {
                this.$message({
                  type: 'error',
                  message: data.data.msg
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
