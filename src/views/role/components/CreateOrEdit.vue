<template>
  <div>
    <el-form ref="role" label-width="80px" :model="role" :rules="rules">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="role.name"></el-input>
      </el-form-item>
      <el-form-item label="角色编码" prop="code">
        <el-input v-model="role.code"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input type="textarea" v-model="role.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="$emit('cancel')">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { saveOrUpdateRole, getRoleById } from '@/services/role'

export default Vue.extend({
  name: 'CreateOrEditRole',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    roleId: {
      type: [String, Number]
    }
  },
  data() {
    return {
      role: {
        code: '',
        name: '',
        description: ''
      },
      rules: {
        code: [
          { required: true, message: '请输入角色编码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.isEdit) {
      this.loadRole()
    }
  },
  methods: {
    async loadRole() {
      const { data } = await getRoleById(this.roleId)
      this.role = data.data
    },
    onSubmit() {
      (this.$refs.role as Form).validate(async valid => {
        if (valid) {
          const { data } = await saveOrUpdateRole(this.role)
          if (data.code === '000000') {
            this.$message.success('操作成功')
            this.$emit('success')
          }
        }
        return false
      })
    }
  }
})
</script>

<style scoped></style>
