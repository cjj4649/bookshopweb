
<template>
  <div>
    <el-dialog
    :title="title"
    :visible.sync="visible"
    :beforeClose="dialogBeforeClose"
    width="50%"
    @close="dialogClose"
    :appendToBody="true"
    >
      <slot></slot>
                <div  class="dialog-footer">
            <el-button @click="dialogCancel">取 消</el-button>
            <el-button type="primary"
                       @click="dialogConfirm">确 定</el-button>
                </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'i-dialog',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    dialogClose () {
      this.visible = false
      this.$emit('input', this.visible)
    },
    dialogCancel () {
      this.$emit('dialog-cancel')
    },
    dialogConfirm () {
      this.$emit('dialog-confirm')
    },
    dialogBeforeClose () {
      this.visible = false
      this.$emit('dialog-before-close')
    }
  },
  watch: {
    value: {
      handler (value) {
        this.visible = value
      },
      deep: true
    }
  }
}

</script>

<style lang="scss" scoped>
  .dialog-footer {
        text-align: right;
  }
</style>
