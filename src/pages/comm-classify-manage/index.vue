<template>
    <div>
        <i-form :title="title" :toolbar='toolbar'>
            <el-tree :data="treeData" :props="defaultProps"
            node-key="id" ref="treeData" slot="content"
            @node-click="handleNodeClick">
            </el-tree>
            <el-form :model="rightForm" ref="rightForm" class="rightForm" :inline="true"
            label-width="100px" size="mini" slot="input" :disabled="true">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="rightForm.name"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="else">
                    <el-input v-model="rightForm.else"></el-input>
                </el-form-item>
            </el-form>
        </i-form>
 <i-dialog
        :title="dialogTitle"
        @dialog-cancel="dialogCancel"
        @dialog-confirm="dialogConfirm"
        @dialog-before-close="dialogBeforeClose"
        v-model="dialogVisible">
            <el-form :model="dialogFormData" ref="dialogFormData" :rules="rules" size="mini" label-width="100px">
                <el-form-item label="分类名称" prop="classifyName">
                    <el-input v-model="dialogFormData.classifyName"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="menuRemark">
                    <el-input v-model="dialogFormData.menuRemark"></el-input>
                </el-form-item>
            </el-form>
        </i-dialog>
    </div>
</template>

<script>

import IForm from '@/components/common/i-form.vue'
import IDialog from '@/components/common/i-dialog.vue'
import req from '@/api/comm-classify-manage.js'
export default {
  name: 'classifyManage',
  components: {
    IForm,
    IDialog

  },
  data () {
    return {
      classifyCode: '1',
      version: [],
      dialogVisible: false,
      dialogFormData: {},
      toolbar: [
        {
          btnName: '新增',
          type: 'primary',
          func: () => {
            console.log(this.dialogVisible)
            this.dialogVisible = true
            this.dialogTitle = '新增分类'
          }
        },
        {
          btnName: '修改',
          type: 'primary',
          func: () => {
            console.log(this.dialogVisible)
            if (this.classifyCode === '1' || this.classifyCode === undefined) {
              this.$message({
                type: 'error',
                message: '请选择'
              })
            } else {
              this.dialogVisible = true
              this.dialogTitle = '修改分类'
              req('getGoodsClassify', {
                classifyId: this.classifyCode
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
            req('deleteGoodsClassify', {
              classifyId: this.classifyCode
            }).then(data => {
              console.log('删除菜单', data)
              if (data.code === 0) {
                this.$message({
                  type: 'success',
                  message: data.msg
                })
                this.refs()
              }
            })
          }
        },
        {
          btnName: '刷新',
          type: 'primary',
          func: () => {
            this.classifyCode = '1'
            this.$refs.rightForm.resetFields()
            this.refs()
            console.log(this.classifyCode)
          }
        }
      ],
      title: '分类详情',
      treeData: [{
        // id: '1',
        // label: '传记',
        // children: [
        //   {label: '名人传记', id: '4', else: '名人传记'},
        //   {label: '帝王传记', id: '5', else: '帝王传记'},
        //   {label: '君侯列传', id: '6', else: '君侯列传'}
        // ]
      }],
      defaultProps: {
        label: 'classifyName',
        children: 'twoClassifyList'
      },
      rightForm: {
        name: '',
        else: ''
      },
      dialogTitle: '',
      dialogForm: {
        name: '',
        else: ''
      },
      rules: {
        classifyName: [{required: true, message: '请输入名称', trigger: 'blur'}]
      },
      dialogShow: false,
      nodeLevel: 0
    }
  },
  mounted () {
    req('listAllGoodsClassify', {
    }).then(data => {
      console.log('分类管理', data)
      this.treeData = data.data
      // for (let i = 0; i < data.data.length; i++) {
      //   this.treeData[i].id = data.data[i].classifyId
      //   this.treeData[i].label = data.data[i].classifyName
      // }
      // console.log(this.treeData)
      // this.pageInfo.total = data.data.total
      // this.pageInfo.pageIndex = data.data.pageNum
      // this.pageInfo.pageSize = data.data.pageSize
    })
  },
  methods: {
    refs () {
      req('listAllGoodsClassify', {
      }).then(data => {
        console.log('一级菜单', data)
        this.treeData = data.data
      })
    },
    search () {
      req('listAllGoodsClassify', {
      }).then(data => {
        console.log(data)
        // this.tableData = data.data.list
        // this.pageInfo.total = data.data.total
        // this.pageInfo.pageIndex = data.data.pageNum
        // this.pageInfo.pageSize = data.data.pageSize
      })
    },
    // 刷新按钮action
    reset () {
      this.$refs.rightForm.resetFields()
    },
    // 树形控件数据Action
    handleNodeClick (data, node) {
      this.nodeLevel = node.level
      this.rightForm.name = data.classifyName
      this.rightForm.else = data.classifyName
      this.classifyCode = data.classifyId
      this.version = data.version
      console.log(this.version)
      console.log(this.classifyCode)
    },
    dialogBeforeClose () {
      this.$refs.dialogFormData.resetFields()
    },
    dialogCancel () {
      this.dialogVisible = false
      this.$refs.dialogFormData.resetFields()
    },
    dialogConfirm () {
      this.$refs.dialogFormData.validate((valid) => {
        if (valid) {
          if (this.dialogTitle === '新增分类') {
            req('addGoodsClassify', {
              ...this.dialogFormData,
              classifyParent: this.classifyCode
            }).then(data => {
              if (data.code === 0) {
                console.log(data)
                this.dialogVisible = false
                this.$message({
                  type: 'success',
                  message: data.msg
                })
                this.refs()
                this.dialogFormData = {}
              } else {
                this.$message({
                  type: 'error',
                  message: data.msg
                })
              }
            })
          } else {
            req('updateGoodsClassify', {
              classifyParent: 1,
              classifyId: this.classifyCode,
              ...this.dialogFormData,
              version: this.version
            }).then(data => {
              if (data.code === 0) {
                console.log(data)
                this.dialogFormData = data.data
                this.dialogVisible = false
                this.$message({
                  type: 'success',
                  message: data.msg
                })
                this.refs()
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
      })
    }
  }
}
</script>

<style lang='scss' scoped>
    .rightForm {
        /deep/.el-input__inner {
            width: 200px;
            border-radius: 0;
        }
    }
    /deep/.el-dialog {
        width: 380px;
        .el-input__inner {
            width: 180px;
            border-radius: 0;
        }
    }
</style>
