<template>
    <div>
        <i-form :toolbar="toolbar" :title="title">
            <el-menu slot="content">
                <el-menu-item v-for="item in menuList" :index="item.menuCode"
                :key="item.menuCode" @click="handleItemSelect(item);change(item)">
                    <span slot="title">{{item.menuName}}</span>
                </el-menu-item>
            </el-menu>
            <el-form :model="rightForm" ref="rightForm" class="rightForm"
            label-width="100px" size="mini" slot="input" :disabled="true">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="菜单名称" prop="menuName">
                            <el-input type="text" v-model="rightForm.menuName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="菜单路由" prop="menuRoute">
                            <el-input type="text" v-model="rightForm.menuRoute"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="备注" prop="else">
                            <el-input type="text" v-model="rightForm.else"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </i-form>
        <i-dialog
        :title="dialogTitle"
        @dialog-cancel="dialogCancel"
        @dialog-confirm="dialogConfirm"
        @dialog-before-close="dialogBeforeClose"
        v-model="dialogVisible">
            <el-form :model="dialogFormData" ref="dialogFormData" :rules="rules" size="mini" label-width="100px">
                <el-form-item label="名称" prop="menuName">
                    <el-input v-model="dialogFormData.menuName"></el-input>
                </el-form-item>
                <el-form-item label="路径" prop="menuUrl">
                    <el-input v-model="dialogFormData.menuUrl"></el-input>
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
import req from '@/api/menu-manage.js'
// import req from '@/api/menu-manage.js'
export default {
  name: 'menuManage',
  data () {
    return {
      version: [],
      menuCode: [],
      toolbar: [
        {
          btnName: '新增',
          type: 'primary',
          func: () => {
            console.log(this.dialogVisible)
            this.dialogVisible = true
            this.dialogTitle = '新增菜单'
          }
        },
        {
          btnName: '修改',
          type: 'primary',
          func: () => {
            console.log(this.dialogVisible)
            if (this.version.length !== 1) {
              this.$message({
                type: 'error',
                message: '请选择'
              })
            } else {
              this.dialogVisible = true
              this.dialogTitle = '修改用户'
              req('getMenu', {
                menuCode: this.menuCode
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
            req('deleteMenu', {
              menuCode: this.menuCode
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
            this.refs()
            this.$message({
              type: 'success',
              message: '刷新成功'
            })
          }
        }
      ],
      title: '菜单管理',
      menuList: [
      ],
      rightForm: {
        menuName: '',
        menuRoute: '',
        isMenu: '',
        else: ''
      },
      dialogTitle: '',
      dialogFormData: {
      },
      rules: {
        menuName: [{required: true, message: '请输入名称', trigger: 'blur'}],
        menuRemark: [{required: true, message: '请输入是否为菜单', trigger: 'change'}]
      },
      dialogVisible: false
    }
  },
  // mounted () {
  //   req('listMenu', {
  //   }).then(data => {
  //     console.log(data)
  //   })
  // },
  mounted () {
    req('listMenu', {
    }).then(data => {
      console.log('一级菜单', data)
      this.menuList = data.data
      console.log(this.menuList)
    })
  },
  methods: {
    refs () {
      req('listMenu', {
      }).then(data => {
        console.log('一级菜单', data)
        this.menuList = data.data
      })
    },
    change (item) {
      this.menuCode = []
      this.version = []
      this.menuCode = item.menuCode
      this.version = item.version
      console.log('zaaa', this.version)
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
          if (this.dialogTitle === '新增菜单') {
            req('addMenu', {
              ...this.dialogFormData
            }).then(data => {
              if (data.code === 0) {
                console.log(data)
                this.dialogVisible = false
                this.$message({
                  type: 'success',
                  message: data.msg
                })
                this.refs()
              } else {
                this.$message({
                  type: 'error',
                  message: data.msg
                })
              }
            })
          } else {
            req('updateMenu', {
              menuCode: this.menuCode,
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
    },
    // 菜单详情action
    handleItemSelect (item) {
      console.log(item.menuCode)
      req('getMenu', {
        menuCode: item.menuCode
      }).then(data => {
        console.log(data)
        this.rightForm.menuName = data.data.menuName
        this.rightForm.menuRoute = data.data.menuUrl
        this.rightForm.else = data.data.menuRemark
        // this.menuList = data.data
        // console.log(this.menuList)
      })
    },
    // 刷新按钮action
    reset () {
      this.$refs.rightForm.resetFields()
    },
    // 新增按钮action
    add () {
      this.dialogShow = true
    }
  },
  components: {
    'i-form': IForm,
    IDialog
  }
}
</script>

<style lang="scss" scoped>
    .el-menu {
        width: 100%;
        height: 100%;
        .el-menu-item {
            height: 32px;
            line-height: 32px;
            font-size: 14px;
            padding: 0 40px !important;
        }
    }
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
