// https://vuetifyjs.com/en/customization/sass-variables
module.exports = {
  publicPath: '/vue/',
  css: {
    loaderOptions: {
      // sass: {
      //   data: `@import "~@/styles/main.sass"`
      // },
      sass: {
        data: `@import "~@/styles/main.scss"`
      }
    }
  },
  chainWebpack: config => {
    // eslint-disable-next-line prettier/prettier
    ["vue-modules", "vue", "normal-modules", "normal"].forEach(match => {
      config.module
        .rule('scss')
        .oneOf(match)
        .use('sass-loader')
        .tap(opt => Object.assign(opt, { data: `@import '~@/styles/main.scss';` }))
    })
  }
}
