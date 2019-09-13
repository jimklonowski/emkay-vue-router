module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'prettier',
    'plugin:vue/recommended',
    //'@vue/prettier',
    'plugin:prettier/recommended',
    'eslint:recommended'
  ],
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        tabWidth: 2,
        semi: false,
        trailingComma: 'none'
      }
    ],
    'vue/max-attributes-per-line': [
      1,
      {
        singleline: 10,
        multiline: {
          max: 2,
          allowFirstLine: true
        }
      }
    ],
    'vue/singleline-html-element-content-newline': 0,
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
    //sourceType: 'module'
  }
}
