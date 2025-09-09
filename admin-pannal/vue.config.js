const { defineConfig } = require('@vue/cli-service')


module.exports = {
  chainWebpack: config => {
    config.module
      .rule('ts')
      .test(/\.tsx?$/)
      .use('ts-loader')
      .loader('ts-loader')
      .end()
  }
};