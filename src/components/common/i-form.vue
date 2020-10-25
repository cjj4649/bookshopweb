<template>
    <div class="i-form">
        <div class="form-left">
            <div class="form-left-btn">
                <el-button
            v-for="(item, index) in toolbar"
            :key="index"
            :type="item.type"
            @click="item.func">
            {{item.btnName}}
            </el-button>
            </div>
            <div class="form-left-meau">
                <slot name="content"></slot>
            </div>
        </div>
        <div class="form-right">
            <div class="form-right-title">{{title}}</div>
            <div class="form-right-input">
                <slot name="input"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'i-form',
  props: {
    title: {},
    toolbar: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import url("../../styles/global.css");
    .i-form {
        width: 1150px;
        height: 550px;
        margin: 25px 0 0 50px;
        border: 1px solid #ddd;
        display: flex;
        .form-left {
            flex: 1;
            border-right: 1px solid #ddd;
            display: flex;
            flex-direction: column;
            .form-left-btn {
                width: 100%;
                height: 64px;
                border-bottom: 1px solid #ddd;
                display: flex;
                align-items: center;
                padding-left: 15px;
                box-sizing: border-box;
                .el-button {
                    height: 30px;
                    line-height: 30px;
                    padding: 0 13px;
                    border-radius: 6px;
                    margin-right: 15px;
                    font-size: 13px;
                }
            }
            .form-left-meau {
                flex: 1;
                padding: 15px 0 0 30px;
                box-sizing: border-box;
            }
        }
        .form-right {
            flex: 2;
            display: flex;
            flex-direction: column;
            .form-right-title {
                width: 100%;
                height: 64px;
                line-height: 64px;
                border-bottom: 1px solid #ddd;
                font-size: 22px;
                padding-left: 55px;
                box-sizing: border-box;
            }
            .form-right-input {
                flex: 1;
                box-sizing: border-box;
                padding: 30px 50px 0 50px;
            }
        }
    }
</style>
