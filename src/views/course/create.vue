<template>
  <div class="create-course">
    <el-card>
      <div slot="header">
        <el-steps :active="activeStep" simple>
          <el-step
            v-for="(item,index) in steps"
            :key="index"
            :title="item.title"
            :icon="item.icon"
            @click.native="activeStep = index"
          >
          </el-step>
        </el-steps>
      </div>
      <el-form label-width="80px">
        <div v-show="activeStep === 0">
          <el-form-item label="课程名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="课程简介">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="课程概述">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="讲师姓名">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="课程排序">
            <el-input-number></el-input-number>
          </el-form-item>
        </div>
        <div v-show="activeStep === 1">课程封面</div>
        <div v-show="activeStep === 2">销售信息</div>
        <div v-show="activeStep === 3">秒杀活动</div>
        <div v-show="activeStep === 4">
          课程详情
          <el-form-item>
            <el-button type="primary" size="small">保存</el-button>
          </el-form-item>
        </div>
        <el-form-item v-if="activeStep >= 0 && activeStep < 4">
          <el-button type="primary" size="small" @click="activeStep++">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'course-create',
  data() {
    return {
      activeStep: 0,
      steps: [
        { title: '基本信息',icon: 'el-icon-edit' },
        { title: '课程封面',icon: 'el-icon-upload' },
        { title: '销售信息',icon: 'el-icon-help' },
        { title: '秒杀活动',icon: 'el-icon-help' },
        { title: '课程详情',icon: 'el-icon-picture' }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.el-step {
  cursor: pointer;
}
</style>
