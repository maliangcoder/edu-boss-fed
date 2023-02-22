module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/styles/variables.scss";'
      }
    }
  },
  devServer: {
    proxy: {
      '/front': {
        target: 'http://edufront.lagounews.com',
        changeOrigin: true
      },
      '/boss': {
        target: 'http://eduboss.lagounews.com',
        changeOrigin: true // 把请求头中的 host 配置为 target
      }
    }
  }
}
