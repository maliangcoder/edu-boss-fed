<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" size="small" ref="form" :model="form" class="demo-form-inline">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="isLoading" size="small" @click="onSubmit">筛选查询</el-button>
            <el-button size="small" :disabled="isLoading" @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-button size="small" @click="handleAdd">添加角色</el-button>
      <el-table :data="roles" border style="width: 100%;margin-top: 20px;" v-loading="isLoading"
        :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center' }">
        <el-table-column prop="id" label="编号" width="80">
        </el-table-column>
        <el-table-column prop="name" label="角色名称">
        </el-table-column>
        <el-table-column prop="description" label="描述">
        </el-table-column>
        <el-table-column prop="createdTime" label="添加时间">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text">分配菜单</el-button>
            <el-button type="text">分配资源</el-button>
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="handleDeleteRole(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :title="isEdit ? '编辑角色' : '添加角色'" :visible.sync="dialogVisible" width="30%">
      <create-or-edit v-if="dialogVisible" :is-edit="isEdit" :role-id="roleId" @success="onSuccess"
        @cancel="dialogVisible = false" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './CreateOrEdit.vue'
import { Form } from 'element-ui'
import { getRoles, deleteRole } from '@/services/role'
export default Vue.extend({
  name: 'RoleList',
  components: {
    CreateOrEdit
  },
  data() {
    return {
      roles: [],
      form: {
        name: '',
        current: 1,
        size: 50
      },
      isLoading: true,
      dialogVisible: false, // 控制新增/编辑对话框的显示和隐藏
      roleId: null,
      isEdit: false
    }
  },
  created() {
    this.loadRoles()
  },
  methods: {
    async loadRoles() {
      this.isLoading = true
      const { data } = await getRoles(this.form)
      this.roles = data.data.records
      this.isLoading = false
    },
    onSubmit() {
      this.form.current = 1
      this.loadRoles()
    },
    onReset() {
      (this.$refs.form as Form).resetFields()
      this.loadRoles()
    },
    onSuccess() {
      this.dialogVisible = false
      this.loadRoles()
    },
    handleEdit(role: any) {
      this.isEdit = true
      this.dialogVisible = true
      this.roleId = role.id
    },
    async handleDeleteRole(role: any) {
      this.$confirm(`确认删除角色：${role.name}`, '删除提示').then(async () => {
        const { data } = await deleteRole(role.id)
        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.loadRoles()
        } else {
          this.$message.error(data.mesg)
        }
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    handleAdd() {
      this.dialogVisible = true
      this.isEdit = false
    }
  }
})
</script>

<style scoped></style>
