<template>
  <div>
    <el-card>
      <div slot="header">
        角色分配菜单
      </div>
      <el-tree
        ref="menu-tree"
        node-key="id"
        :default-checked-keys="checkedKeys"
        :data="menus"
        :props="defaultProps"
        show-checkbox
        default-expand-all></el-tree>
        <div style="text-align: center">
          <el-button size="small" @click="resetChecked">清空</el-button>
          <el-button size="small" type="primary" @click="onSave">保存</el-button>
        </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getMenuNodeList, allocateRoleMenus, getRoleMenus } from '@/services/menu'
import { Tree } from 'element-ui'

export default Vue.extend({
  name: 'AllocaMenu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checkedKeys: []
    }
  },
  created () {
    this.loadMenuNodes()
    this.loadRoleMenus()
  },
  methods: {
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.roleId)
      this.getCheckedKeys(data.data)
    },
    getCheckedKeys (menus: any) {
      menus.forEach((menu: any) => {
        if (menu.selected) {
          /**
           * 此处若用数组的 push 方法，页面不会刷新，因为Vue不会监听到数组的变化，有两种办法可以解决
           * 1. 使用 Vue 提供的强制更新方法 this.$nextTick()
           * 2. 用展开运算符进行浅拷贝一份，将上一份数据和当前数据拼接在一起
           */
          // 方法一:
          // this.$nextTick(() => {
          //   this.checkedKeys.push(menu.id as never)
          // })
          // 方法二:
          this.checkedKeys = [...this.checkedKeys, menu.id] as never
        }
        if (menu.subMenuList) {
          this.getCheckedKeys(menu.subMenuList)
        }
      })
    },
    async loadMenuNodes () {
      const { data } = await getMenuNodeList()
      this.menus = data.data
    },
    async onSave () {
      const menuIdList = (this.$refs['menu-tree'] as Tree).getCheckedKeys()
      console.log(menuIdList)
      await allocateRoleMenus({ roleId: this.roleId, menuIdList })
      this.$message.success('分配菜单成功')
      this.$router.back()
    },
    resetChecked() {
      (this.$refs['menu-tree'] as Tree).setCheckedKeys([])
    }
  }
})
</script>

<style scoped></style>
