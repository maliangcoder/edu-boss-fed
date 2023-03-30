<template>
  <div class="header">
    <el-breadcrumb>
      <el-breadcrumb-item v-for="item in routes" :key="item.path">{{ item.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="display: flex; align-items: center;">
      <i class="el-icon-full-screen" style="margin-right: 10px;cursor: pointer;" @click="handleToggleFullScreen"></i>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar :size="30" :src="userInfo.portrait || imgUrl"></el-avatar><i
            class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
          <el-dropdown-item divided @click.native="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserInfo } from '@/services/user'
export default Vue.extend({
  name: 'AppHeader',
  data() {
    return {
      imgUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      userInfo: {}
    }
  },
  created() {
    this.loadUserInfo()
  },
  computed: {
    routes() {
      return this.$route.matched.filter(item => item.meta)
    }
  },
  methods: {
    async loadUserInfo() {
      const { data } = await getUserInfo()
      this.userInfo = data.content
    },
    handleLogout() {
      this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('setUser', null)

        this.$router.push({
          name: 'login'
        })
        this.$message.success('退出成功')
      }).catch(() => {
        this.$message.info('已取消退出')
      })
    },
    handleToggleFullScreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
