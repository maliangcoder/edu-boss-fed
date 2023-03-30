<template>
  <div class="course-video">
    <el-card>
      <div slot="header">
        <span>课程xxx</span>
        <br/>
        <span>阶段xxx</span>
        <br/>
        <span>课时xxx</span>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="视频上传">
          <el-input type="file" />
        </el-form-item>
        <el-form-item label="封面上传">
          <el-input type="file" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">开始上传</el-button>
          <el-button type="primary" @click="$router.back()">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Course-video'
})
</script>

<style scoped>

</style>
