<template>
  <div class="course-list">
    <el-card>
      <div slot="header">
        <el-form size="small" :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="课程名称">
            <el-input v-model="form.courseName" placeholder="请输入课程名称"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.status" placeholder="请输入查询状态">
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="isLoading" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table
          :data="courseList"
          border
          :cell-style="{ textAlign: 'center' }"
          :header-cell-style="{ textAlign: 'center' }"
          style="margin-bottom: 10px;"
        >
           <el-table-column label="ID" prop="id"></el-table-column>
           <el-table-column label="课程名称" prop="courseName"></el-table-column>
           <el-table-column label="价格" prop="price"></el-table-column>
           <el-table-column label="排序" prop="sortNum"></el-table-column>
           <el-table-column label="状态" prop="status">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </template>
           </el-table-column>
           <el-table-column label="操作"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :disabled="isLoading"
          :current-page="form.currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="countTotal">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getQueryCourses } from '@/services/course'

export default Vue.extend({
  name: 'CourseList',
  data() {
    return {
      isLoading: true,
      form: {
        currentPage: 1,
        pageSize: 11,
        courseName: '',
        status: ''
      },
      countTotal: 0,
      courseList: []
    }
  },
  created() {
    this.loadQueryCourses()
  },
  methods: {
    async loadQueryCourses() {
      this.isLoading = true
      const { data } = await getQueryCourses(this.form)
      this.courseList = data.data.records
      this.countTotal = data.data.total
      this.isLoading = false
    },
    onSubmit() {
      this.loadQueryCourses()
    },
    handleSizeChange(val:number) {
      this.form.pageSize = val
      this.form.currentPage = 1
      this.loadQueryCourses()
    },
    handleCurrentChange(val:number) {
      this.form.currentPage = val
      this.loadQueryCourses()
    }
  }
})
</script>

<style scoped>

</style>
