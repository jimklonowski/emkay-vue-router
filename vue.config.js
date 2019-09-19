// https://vuetifyjs.com/en/customization/sass-variables
module.exports = {
  // for production, use a different web root
  //publicPath: process.env.NODE_ENV === 'production' ? '../apps/VueTest' : '/vue/',
  publicPath: '/vue/',

  // css: {
  //   loaderOptions: {
  //     sass: {
  //       data: '@import "~@/styles/main.scss"'
  //     }
  //   }
  // },

  // chainWebpack: config => {
  //   // eslint-disable-next-line prettier/prettier
  //   ["vue-modules", "vue", "normal-modules", "normal"].forEach(match => {
  //     config.module
  //       .rule('scss')
  //       .oneOf(match)
  //       .use('sass-loader')
  //       .tap(opt =>
  //         Object.assign(opt, { data: `@import '~@/styles/main.scss';` })
  //       )
  //   })
  // },

  productionSourceMap: false,

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
