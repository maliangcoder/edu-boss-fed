<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h1>资源管理</h1>
      </div>
      <div slot="header" class="clearfix">
        <el-form ref="form" :inline="true" size="small" :model="form" class="demo-form-inline">
          <el-form-item label="资源名称" prop="name">
            <el-input v-model="form.name" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="url">
            <el-input v-model="form.url" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="资源分类" prop="categoryId">
            <el-select v-model="form.categoryId" clearable placeholder="请选择资源分类">
              <el-option :label="item.name" :value="item.id" v-for="item in resouceCategorys" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="isLoading" @click="onSubmit">查询搜索</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="resouces" v-loading="isLoading" border style="width: 100%" :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ textAlign: 'center' }">
        <el-table-column type="index" label="编号" width="50">
        </el-table-column>
        <el-table-column prop="name" label="资源名称">
        </el-table-column>
        <el-table-column prop="url" label="资源路径"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="createdTime" label="添加时间"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="form.current"
        :page-sizes="[5, 10, 20, 50]" :disabled="isLoading" :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
      <el-form :label-position="labelPosition" label-width="80px" :model="formResource">
        <el-form-item label="资源名称">
          <el-input v-model="formResource.name"></el-input>
        </el-form-item>
        <el-form-item label="资源路径">
          <el-input v-model="formResource.url"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="formResource.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onResourceUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourcePages, deleteResource, resourceSaveOrUpdate } from '@/services/resouce'
import { getResoureCategory } from '@/services/resourceCategory'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'ResouceList',
  data() {
    return {
      resouces: [], // 资源列表
      form: {
        name: '',
        url: '',
        categoryId: null,
        current: 1,
        size: 10
      },
      totalCount: 0,
      resouceCategorys: [],
      isLoading: true, // 加载中状态
      dialogVisible: false,
      labelPosition: 'right',
      formResource: {}
    }
  },
  created() {
    this.loadResources()
    this.loadResourceCategorys()
  },
  methods: {
    async loadResourceCategorys() {
      const { data } = await getResoureCategory()
      this.resouceCategorys = data.data
    },

    async loadResources() {
      this.isLoading = true
      const { data } = await getResourcePages(this.form)
      this.resouces = data.data.records
      this.totalCount = data.data.total
      this.isLoading = false
    },
    onSubmit() {
      this.form.current = 1 // 筛选查询从第一页开始
      this.loadResources()
    },
    onReset() {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1
      this.loadResources()
    },
    handleEdit(row: any) {
      this.formResource = { ...row }
      this.dialogVisible = true
    },
    handleDelete(row: any) {
      this.$confirm('是否删除该数据', '删除提示').then(async () => {
        const { data } = await deleteResource(row.id)
        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.loadResources()
        } else {
          this.$message.error(data.mesg)
        }
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    handleSizeChange(val: number) {
      this.form.size = val
      this.form.current = 1 // 每页改变大小重新查询从第一页开始
      this.loadResources()
    },
    handleCurrentChange(val: number) {
      this.form.current = val
      this.loadResources()
    },
    async onResourceUpdate() {
      const { data } = await resourceSaveOrUpdate(this.formResource)
      if (data.code === '000000') {
        this.$message.success('更新成功')
        this.loadResources()
      } else {
        this.$message.error(data.mesg)
      }
      this.dialogVisible = false
    }
  }
})
</script>

<style scoped></style>
