<template>
  <div id="app">
    <h1>个人学习</h1>
    <!-- 根路由出口 -->
    <router-view />
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
    <p class="test">hello world</p>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({

})

</script>
<style lang="scss" scoped>
// @import "~@/styles/variables.scss";

.test {
  color: $warning-color;
}
</style>
