<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({ name: 'menu-create' })">操作菜单</el-button>
      </div>
      <el-table :data="menus" border style="width: 100%" :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ textAlign: 'center' }">
        <el-table-column type="index" label="编号" width="50"></el-table-column>
        <el-table-column prop="name" label="菜单名称" width="180">
        </el-table-column>
        <el-table-column prop="level" label="菜单级数" width="180">
        </el-table-column>
        <el-table-column prop="orderNum" label="排序"></el-table-column>
        <el-table-column prop="icon" label="前端图标"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllMenus, deleteMenu } from '@/services/menu'
export default Vue.extend({
  name: 'MenuIndex',
  data() {
    return {
      menus: []
    }
  },
  created() {
    this.loadAllMenus()
  },
  methods: {
    async loadAllMenus() {
      const { data } = await getAllMenus()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    handleEdit(row: any) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: row.id
        }
      })
    },
    handleDelete(row: any) {
      this.$confirm('确定删除吗？', '删除提示', {

      }).then(async () => {
        const { data } = await deleteMenu(row.id)
        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.loadAllMenus()
        } else {
          this.$message.error(data.mesg)
        }
      }).catch(() => {
        this.$message.info('已取消删除操作')
      })
    }
  }
})
</script>

<style scoped></style>
