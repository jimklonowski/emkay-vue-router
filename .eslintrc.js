// https://medium.com/@gogl.alex/how-to-properly-set-up-eslint-with-prettier-for-vue-or-nuxt-in-vscode-e42532099a9c

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['prettier', 'plugin:vue/recommended', 'plugin:prettier/recommended', 'eslint:recommended'],
  plugins: ['vue', 'prettier'],
  rules: {
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}

// module.exports = {
//   root: true,
//   env: {
//     node: true
//   },
//   extends: [
//     'plugin:vue/essential',
//     'plugin:prettier/recommended',
//     '@vue/prettier'
//     // 'plugin:vue/essential',
//     // 'plugin:prettier/recommended',
//     // 'prettier/vue'
//     //'@vue/prettier'
//     //'plugin:vue/recommended',
//     //'eslint:recommended',
//     //'prettier/vue',
//     //'plugin:vue/essential',
//     //'@vue/prettier'
//   ],
//   plugins: ['prettier'],
//   rules: {
//     'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//     'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
//   },
//   parserOptions: {
//     parser: 'babel-eslint'
//   }
// }
