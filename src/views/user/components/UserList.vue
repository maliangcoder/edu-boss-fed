<template>
  <div class="user-list">
    <el-card>
      <div slot="header">
        <el-form ref="form" :inline="true" size="small" :model="form" class="demo-form-inline">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="注册时间" prop="time">
             <el-date-picker
              v-model="form.time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-fomat="yyyy-MM-dd HH:mm:ss"
              @change="changeTime"
              >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="isLoading" @click="onSubmit">查询</el-button>
            <el-button :disabled="isLoading" @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="userList"
        border
        v-loading="isLoading"
        :cell-style="{ textAlign:'center' }"
        :header-cell-style="{ textAlign:'center' }"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
        >
        </el-table-column>
        <el-table-column
          prop="id"
          label="用户头像"
        >
        <template slot-scope="scope">
          <img style="width: 30px; height: 30px;" :src="scope.row.portrait || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" alt="">
        </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
        >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="allocaRole(scope.row)">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
       <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.currentPage"
        :page-sizes="[10,20,30]"
        :page-size="form.pageSize"
        :disabled="isLoading"
        layout="total, sizes, prev, pager, next, jumper"
        :total="countTotal">
      </el-pagination>
    </el-card>
    <el-dialog
      title="分配角色"
      :visible.sync="dialogVisible"
      width="35%"
      >
      <el-select v-model="roleIdList" multiple placeholder="请选择">
        <el-option
          v-for="item in roles" :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAllocateRoles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserPages, allocateUserRoles } from '@/services/user'
import { getAllRoles, getUserRole } from '@/services/role'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'UserList',
  data() {
    return {
      form: {
        currentPage: 1,
        pageSize: 10,
        phone: '',
        time: [],
        startCreateTime: '',
        endCreateTime: ''
      },
      userList: [],
      countTotal: 0,
      isLoading: true,
      dialogVisible: false,
      roles: [],
      roleIdList: [],
      currentUser: null
    }
  },
  created() {
    this.loadUserList()
  },
  methods: {
    async loadUserList() {
      this.isLoading = true
      const { data } = await getUserPages(this.form)
      this.userList = data.data.records
      this.countTotal = data.data.total
      this.isLoading = false
    },
    changeTime(time: Array<string>) {
      this.form.startCreateTime = time[0]
      this.form.endCreateTime = time[1]
    },
    onSubmit() {
      this.loadUserList()
    },
    onReset() {
      (this.$refs.form as Form).resetFields()
      this.loadUserList()
    },
    // 获取全局角色列表
    async allocaRole(row: any) {
      this.currentUser = row

      const { data } = await getAllRoles()
      this.roles = data.data

      const { data: { data: userRoles } } = await getUserRole((this.currentUser as any).id)
      this.roleIdList = userRoles.map((role: any) => role.id)

      this.dialogVisible = true
    },
    async handleAllocateRoles() {
      const { data } = await allocateUserRoles({
        userId: (this.currentUser as any).id,
        roleList: this.roleIdList
      })
      if (data.code === '000000') {
        this.$message.success('角色分配成功')
        this.dialogVisible = false
      }
    },
    handleSizeChange(val: number) {
      this.form.pageSize = val
      this.form.currentPage = 1 // 每页改变大小，重新从第一页查询
      this.loadUserList()
    },
    handleCurrentChange(val: number) {
      this.form.currentPage = val
      this.loadUserList()
    }
  }
})
</script>

<style scoped>
.el-select {
  width: 350px;
}
</style>
