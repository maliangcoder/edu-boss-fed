const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/styles/variables.scss";'
      }
    }
  },
  devServer: {
    proxy: {
      '/boss': {
        target: 'http://eduboss.lagounews.com',
        changeOrigin: true // 把请求头中的 host 配置为 target
      },
      '/front': {
        target: 'http://debfront.lagounews.com',
        changeOrigin: true
      }
    }
  }
})
