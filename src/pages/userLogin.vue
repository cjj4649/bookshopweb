<template>
    <div  class="container">
        <div  class="container-box">
          <el-form :model="formData"  label-position="left">
          <el-form-item prop="username"><span style="font-size: 17px; color: #ddd;">账号:&nbsp;</span>
             <el-input  type="text" v-model="formData.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
         <el-form-item prop="password"><span style="font-size: 17px; color: #ddd;">密码:&nbsp;</span>
             <el-input type="password" v-model="formData.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item class="btn-box">
            <el-button type="primary" @click="loginClick">登录</el-button>
          </el-form-item>
          </el-form>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
import req from '@/api/menu-manage.js'
export default {
  name: 'Login',
  data () {
    return {
      menuList: [],
      formData: {
        username: '',
        password: ''
      }
    }
  },
  mounted () {
  },
  methods: {
    getmeau (vale) {
      req('listMenuHome', {
        role: vale
      }).then(data => {
        sessionStorage.setItem('menuList', JSON.stringify(data))
      })
    },
    getrole (data) {
      req('getTopOfColumn', {
      }).then(data => {
        console.log('顶部栏', data)
        sessionStorage.setItem('roleInfo', JSON.stringify(data.data))
        if (data.data.role === '1') {
          this.getmeau(data.data.role)
          this.$router.replace({path: '/home'})
          console.log('测试', data)
        } else if (data.data.role === '2') {
          this.getmeau(data.data.role)
          this.$router.replace({path: '/client-manage'})
        }
      })
    },
    //  http://29916786qq.zicp.vip/uaa/auth/form
    loginClick () {
      axios.defaults.headers.post['Content-Type'] = 'appliction/x-www-form-urlencoded'
      axios({

        method: 'post',
        url: 'http://a309200w30.goho.co/uaa/auth/form',
        data: qs.stringify(this.formData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(data => {
        console.log(data)
        if (data.data.code === 0) {
          this.$message({
            type: 'success',
            message: data.data.msg
          })
          sessionStorage.setItem('userinfo', JSON.stringify(data.data.data))
          this.getrole()
          // this.$router.replace({path: '/home'})
        } else {
          this.$message({
            type: 'error',
            message: data.data.msg
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    width: 100%;
    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background: url("../assets/u0.jpg") no-repeat ;
    background-size: 100% 100%;
    background-attachment:fixed;
    .container-box {
      position: relative;
      top: 150px;
      width: 460px;
      height: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, .3);
      box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, .3);
      border-radius: 10px;
      margin: 0 auto;
      .btn-box {
        width: 150px;
        margin: 0 auto;
      }
    }
  }
  .el-input {
    width: 230px;
    border-radius: 10px;
     outline: none;
  }
  .el-button {
    border-radius: 100px;
    height: 38px;
    width: 170px;
    background: rgb(21, 121, 252);
  }
</style>
