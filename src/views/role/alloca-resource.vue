<template>
  <div>
    <el-card class="alloca-resource" style="height: 90vh; overflow-y: auto;">
      <div slot="header">
        分配资源
      </div>
      <el-tree
        ref="resource-tree"
        :data="resources"
        :props="defaultProps"
        :default-checked-keys="checkedKeys"
        node-key="id"
        show-checkbox
        default-expand-all
      ></el-tree>
      <div style="text-align: center;">
        <el-button size="small">清空</el-button>
        <el-button size="small" type="primary" @click="onSave">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getRoleResources, allocateRoleResources } from '@/services/resouce'
import { Tree } from 'element-ui'

export default Vue.extend({
  name: 'AllocaResource',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      resources: [],
      defaultProps: {
        children: 'resourceList',
        label: 'name'
      },
      checkedKeys: []
    }
  },
  created() {
    this.loadResourceNodes()
  },
  methods: {
    async loadResourceNodes() {
      const { data } = await getRoleResources(this.roleId)
      this.resources = data.data
      const list: any = data.data.map((item:any) => {
        return {
          ...item,
          father: true
        }
      })
      this.getCheckedKeys(list)
    },
    getCheckedKeys(resources: any) {
      resources.forEach((resource: any) => {
        if (resource.selected && !resource.father) {
          /**
           * 此处和角色分配菜单相同 alloca-menu
          */
          this.checkedKeys = [...this.checkedKeys, resource.id] as never
        }
        if (resource.resourceList) {
          this.getCheckedKeys(resource.resourceList)
        }
      })
      console.log(this.checkedKeys, '123')
    },
    async onSave() {
      const resourceIdList = (this.$refs['resource-tree'] as Tree).getCheckedKeys()
      await allocateRoleResources({ roleId: this.roleId, resourceIdList })
      this.$message.success('角色分配资源成功')
      this.$router.back()
    }
  }
})
</script>

<style scoped>

</style>
