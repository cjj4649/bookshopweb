<template>
  <div>
    <el-container>
      <el-header height="70px">
        <router-link to="/">行走书店管理系统</router-link>
        <div class="user-info">
          <el-popover
          placement="top"
          v-model="visible">
          <el-button size="mini" type="text" @click="signOut">退出登录</el-button>
          <div slot="reference">
            <img v-show="role.imagePath" :src="role.imagePath" alt="">
            <img v-show="!role.imagePath" src="../assets/u18.jpg" alt="">
            <span class="username">{{role.userName}}</span>
          </div>
          </el-popover>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu @select="handlerSelect">
            <el-menu-item  v-for="(item,index) in menuList" :index="item.menuUrl" :key="index">
              <span slot="title">{{item.menuName}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import req from '@/api/menu-manage.js'
export default {
  name: 'home',
  data () {
    return {
      role: [],
      visible: false,
      menuList: [
        // {menuName: '用户管理', path: '/user-manage'},
        // {menuName: '菜单管理', path: '/menu-manage'},
        // {title: '商品管理', path: '/comm-manage'},
        // {title: '首页轮播图管理', path: '/home-pic-manage'},
        // {title: '商品分类管理', path: '/comm-classify-manage'},
        // {title: '客户管理', path: '/client-manage'},
        // {title: '订单管理', path: '/order-manage'},
        // {title: '热门位商品管理', path: '/hot-comm-manage'},
        // {title: '门店信息管理', path: '/shop-info-manage'},
        // {title: '司机信息管理', path: '/driver-info-manage'}
      ]
    }
  },
  mounted () {
    setTimeout(() => {
      this.menuList = JSON.parse(sessionStorage.getItem('menuList')).data
    }, 300)
    this.role = JSON.parse(sessionStorage.getItem('roleInfo'))
  },
  methods: {
    signOut () {
      sessionStorage.clear()
      this.$router.push({path: '/'})
    },
    handlerSelect (key, path) {
      if (key !== this.$route.path) {
        this.$router.replace({path: key})
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.username  {
  position: relative;
  top: -20px
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(242, 242, 242);

  .router-link-active {
    font-size: 25px;
    color: #409eff;
    text-decoration: none;
  }

  .user-info {
    display: flex;
    align-items: center;
    height: 20px;

    img {
      margin-right: 20px;
      width: 50px;
      height: 50px;

      }
  }
}
</style>
