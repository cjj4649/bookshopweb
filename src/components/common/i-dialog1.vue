
<template>
  <div>
    <el-dialog
    :title="title"
    :visible.sync="visible1"
    :beforeClose="dialogBeforeClose"
    width="50%"
    @close="dialogClose"
    >

      <slot></slot>
                <div  class="dialog-footer">
            <el-button @click="dialogCancel">取 消</el-button>
            <el-button type="primary"
                       @click="dialogConfirm">修改</el-button>
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
      visible1: false
    }
  },
  methods: {
    dialogClose () {
      this.visible1 = false
      this.$emit('input', this.visible1)
    },
    dialogCancel () {
      this.$emit('dialog-cancel')
    },
    dialogConfirm () {
      this.$emit('dialog-confirm')
    },
    dialogBeforeClose () {
      this.visible1 = false
      this.$emit('dialog-before-close')
    }
  },
  watch: {
    value: {
      handler (value) {
        this.visible1 = value
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
