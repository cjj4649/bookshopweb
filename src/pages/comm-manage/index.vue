<template>
    <div>
      <i-search ref="iSearch" :model="formData" @search="search" @reset="reset">
        <el-form-item label="商品名称" prop="goodsName">
          <el-input v-model="formData.goodsName" ></el-input>
        </el-form-item>
         <el-form-item label="商品状态" prop="goodsStatus">
          <el-select v-model="formData.goodsStatus" >
              <el-option label="全部" value="1"></el-option>
              <el-option label="在售" value="2"></el-option>
              <el-option label="已下架" value="3"></el-option>
              <el-option label="未发布" value="4"></el-option>
              </el-select>
        </el-form-item>
         <el-form-item label="广告词" prop="goodsAd">
          <el-input v-model="formData.goodsAd" ></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="goodsPress">
          <el-input v-model="formData.goodsPress" ></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="goodsAuthor">
          <el-input v-model="formData.goodsAuthor" ></el-input>
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
        <el-table-column width="150px"
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
        <el-form :model="dialogFormData" :rules="rules" ref="dialogFormData" label-width="100px" >
            <el-row>
              <el-col :span="12">
                <el-form-item label="书名" prop="goodsName">
                  <el-input v-model="dialogFormData.goodsName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="书号" prop="isbn">
                  <el-input v-model="dialogFormData.isbn"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="一级分类" prop="firstClassId">
                  <el-select v-model="dialogFormData.firstClassId" @change="firstClassIdChange">
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
                <el-form-item label="二级分类" prop="secondClassId">
                  <el-select v-model="dialogFormData.secondClassId">
                    <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品介绍" prop="goodsIntroduction">
                  <el-input v-model="dialogFormData.goodsIntroduction"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商家名称" prop="storeName">
                  <el-input v-model="dialogFormData.storeName"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="商品库存" prop="inventory">
                  <el-input v-model="dialogFormData.inventory"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="成本价" prop="goodsCost">
                  <el-input v-model="dialogFormData.goodsCost"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="在售价" prop="goodsPrice">
                  <el-input v-model="dialogFormData.goodsPrice"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="广告词" prop="goodsAd">
                  <el-input v-model="dialogFormData.goodsAd "></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="作者" prop="goodsAuthor">
                  <el-input v-model="dialogFormData.goodsAuthor"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="图片路径" prop="goodsPicture" v-show="dialogTitle === '修改商品'">
                  <el-input v-model="dialogFormData.goodsPicture"></el-input>
                </el-form-item>
              </el-col>
                <el-col :span="12">
                <el-form-item label="出版社" prop="goodsPress">
                  <el-input v-model="dialogFormData.goodsPress"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="图片" prop="picturePath">
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
import req from '@/api/comm-manage.js'
import axios from 'axios'
export default {
  name: 'user-manage',
  components: {
    ISearch,
    ITable,
    IDialog
  },
  data () {
    return {
      picturePath: {},
      fileList: [],
      goodsCode: [],
      goodsStatus: [],
      version: [],
      formData: {},
      dialogFormData: {},
      options: [
      ],
      options2: [
      ],
      dialogTitle: '',
      dialogVisible: false,
      pageInfo: {
        pageNum: 1,
        pageSize: 5,
        total: 0
      },
      rules: {
        goodsName: [
          { required: true, message: '请输入书名', trigger: 'blur' }
        ],
        isbn: [
          { required: true, message: '请输入书号', trigger: 'blur' }
        ],
        firstClassId: [
          { required: true, message: '请选择一级分类', trigger: 'blur' }
        ],
        secondClassId: [
          { required: true, message: '请选择二级分类', trigger: 'blur' }
        ],
        goodsIntroduction: [
          { required: true, message: '请输入商品介绍', trigger: 'blur' }
        ],
        storeName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        inventory: [
          { required: true, message: '请输入商品库存', trigger: 'blur' }
        ],
        goodsCost: [
          { required: true, message: '请输入成本价', trigger: 'blur' }
        ],
        goodsPrice: [
          { required: true, message: '请输入在售价', trigger: 'blur' }
        ],
        goodsAd: [
          { required: true, message: '请输入广告词', trigger: 'blur' }
        ],
        // goodsPicturePath: [
        //   { required: true, message: '请选择商品路径', trigger: 'change' }
        // ],
        goodsAuthor: [
          { required: true, message: '请输入作者', trigger: 'blur' }
        ],
        goodsPress: [
          { required: true, message: '请输入出版社', trigger: 'blur' }
        ]
      },
      toolbar: [
        {
          btnName: '新增',
          type: 'primary',
          func: () => {
            console.log(this.dialogVisible)
            this.dialogVisible = true
            this.dialogTitle = '新增商品'
          }
        },
        // 修改
        {
          btnName: '修改',
          type: 'primary',
          func: () => {
            console.log(this.dialogVisible)
            if (this.goodsCode.length !== 1) {
              alert('不允许修改多条数据或者请选择一条数据')
            } else {
              this.dialogVisible = true
              this.dialogTitle = '修改商品'
              req('searchGoods', {
                goodsCode: this.goodsCode.join(',')
              }).then(data => {
                console.log(data)
                console.log('表格', this.dialogFormData)
                this.dialogFormData = data.data
              })
            }
          }
        },
        // 删除
        {
          btnName: '删除',
          type: 'primary',
          func: () => {
            if (this.goodsCode.length === 0) {
              alert('请选择一条数据')
            } else {
              this.$confirm('此操作将永久删除该文件,是否继续?').then(() => {
                req('deleteGoods', {
                  goodsCode: this.goodsCode.join(',')
                }).then(data => {
                  console.log(data)
                  req('getTableData', {
                    pageSize: this.pageInfo.pageSize,
                    pageNum: this.pageInfo.pageNum
                  }).then(data => {
                    console.log(data)
                    this.tableData = data.data.list
                    this.pageInfo.total = data.data.total
                    this.pageInfo.pageIndex = data.data.pageNum
                    this.pageInfo.pageSize = data.data.pageSize
                  })
                })
              })
            }
          }
        },
        {
          btnName: '上架',
          type: 'primary',
          func: () => {
            if (this.goodsCode.length === 0) {
              this.$message({
                type: 'error',
                message: '请选择'
              })
            } else {
              if (this.goodsStatus.join(',') === '1') {
                this.$message({
                  type: 'error',
                  message: '商品已经上架'
                })
              } else {
                req('upDownGoods', {
                  goodsStatus: '1',
                  goodsCode: this.goodsCode.join(','),
                  version: this.version.join(',')
                }).then(data => {
                  console.log(data)
                  this.$message({
                    type: 'success',
                    message: '上架成功'
                  })
                  this.search()
                })
              }
            }
          }
        },
        {
          btnName: '下架',
          type: 'primary',
          func: () => {
            if (this.goodsCode.length === 0) {
              this.$message({
                type: 'error',
                message: '请选择'
              })
            } else {
              if (this.goodsStatus.join(',') === '2') {
                this.$message({
                  type: 'error',
                  message: '商品已经下架'
                })
              } else {
                req('upDownGoods', {
                  goodsStatus: '2',
                  goodsCode: this.goodsCode.join(','),
                  version: this.version.join(',')
                }).then(data => {
                  console.log(data)
                  this.$message({
                    type: 'success',
                    message: '下架成功'
                  })
                  this.search()
                })
              }
            }
          }
        }
      ],
      columnList: [
        {label: '书名', prop: 'goodsName'},
        {label: '书号', prop: 'isbn'},
        {label: '一级分类', prop: 'firstClassName'},
        {label: '二级分类', prop: 'secondClassName'},
        {label: '商家名称', prop: 'storeName'},
        {label: '商品库存', prop: 'inventory'},
        {label: '商品状态', prop: 'goodsStatus', formatter: this.formattergoodsStatus},
        {label: '成本价', prop: 'goodsCost'},
        {label: '销售价', prop: 'goodsPrice'},
        {label: '广告词', prop: 'goodsAd'},
        {label: '商品图片路径', prop: 'goodsPicture'},
        {label: '作者', prop: 'goodsAuthor'},
        {label: '出版社', prop: 'goodsPress'},
        {label: '版本号', prop: 'version'}
      ],
      tableData: [
      ]
    }
  },
  mounted () {
    this.pageInfo.total = this.tableData.length
    this.search()
    req('listFirstClass', {
      flagId: '1'
    }).then(data => {
      console.log('一级菜单', data)
      data.data.forEach(item => {
        this.options.push({value: item.classifyId, label: item.classifyName})
        console.log('option', this.options)
      })
    })
  },
  methods: {
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
        this.dialogFormData.goodsPicture = this.picturePath
        console.log('图片路径', this.picturePath)
      })
    },
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
    formattergoodsStatus (row, column) {
      return row.goodsStatus === '0' ? '售罄' : row.goodsStatus === '1' ? '在售' : row.goodsStatus === '2' ? '已下架' : row.goodsStatus === '3' ? '未发布' : '未知'
    },
    firstClassIdChange () {
      console.log(this.dialogFormData.firstClassId)
      req('listFirstClass', {
        flagId: this.dialogFormData.firstClassId
      }).then(data => {
        this.options2 = []
        data.data.forEach(item => {
          console.log('二级菜单', data)
          this.options2.push({value: item.classifyId, label: item.classifyName})
          console.log(this.options2)
        })
      })
    },
    secondClassIdChange () {

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
    },
    // 分页控制
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
    // 分页控制
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
      this.goodsCode = []
      this.goodsStatus = []
      this.version = []
      rows.forEach(item => {
        this.goodsCode.push(item.goodsCode)
        this.goodsStatus.push(item.goodsStatus)
        this.version.push(item.version)
      })
      console.log('zzz', this.goodsCode, this.goodsStatus, this.version)
    },

    dialogBeforeClose () {
      this.$refs.dialogFormData.resetFields()
    },
    dialogCancel () {
      this.$refs.dialogFormData.resetFields()
      this.dialogVisible = false
      this.options2 = []
    },
    dialogConfirm () {
      this.$refs.dialogFormData.validate((valid) => {
        if (valid) {
          if (this.dialogTitle === '新增商品') {
            req('saveGoods', {
              goodsPicture: this.picturePath,
              ...this.dialogFormData
            }).then(data => {
              console.log(data)
              if (data.code === 0) {
                this.dialogVisible = false
                this.$message({
                  type: 'success',
                  message: data.msg
                })
                this.dialogFormData = {}
                this.fileList = []
                this.search()
              } else {
                this.$message({
                  type: 'error',
                  message: data.msg
                })
              }
            })
          } else {
            req('updateGoods', {
              goodsPicture: this.picturePath,
              ...this.dialogFormData,
              goodsCode: this.goodsCode.join(','),
              version: this.version.join(',')
            }).then(data => {
              console.log(data)
              if (data.code === 0) {
                this.$message({
                  type: 'success',
                  message: data.msg
                })
                this.dialogFormData = {}
                this.fileList = []
                this.dialogVisible = false
                this.search()
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
    }
  }
}
</script>

<style lang="scss" scoped>
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
