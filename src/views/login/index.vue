<template>
  <div class="login">
    <el-form class="login-from" label-position="top" ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" :loading="isLoginLoading" @click="onSubmit">
          登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/services/user'

export default Vue.extend({
  name: 'LoginIndex',
  data() {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { parrern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: ' blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      },
      isLoginLoading: false
    }
  },
  methods: {
    async onSubmit() {
      try {
        await (this.$refs.form as Form).validate()

        this.isLoginLoading = true

        const { data } = await login(this.form)
        // 处理请求结果
        // 1. 失败，给出提示
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          // 2. 成功，更新Vuex容器中的 setUser
          this.$store.commit('setUser', data.content)
          // this.$router.push('/')

          // 重定向的之前请求401的页面
          this.$router.push(this.$route.query.redirect as string || '/')

          // this.$router.push({
          //   name: 'home'
          // })
          this.$message.success('登录成功')
        }
      } catch (error) {
        console.log('登录失败', error)
      }
      this.isLoginLoading = false
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-from {
    width: 300px;
    padding: 20px;
    background-color: #fff;
  }

  .login-btn {
    width: 100%;
  }
}
</style>
