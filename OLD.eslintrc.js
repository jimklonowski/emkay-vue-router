module.exports = {
  root: true,
  extends: [
    'prettier',
    'plugin:vue/recommended', //    /base, /essential, /strongly-recommended, /recommended
    'plugin:prettier/recommended', //    // turns off all eslint rules that are unnecessary due to/conflict with Prettier
    'eslint:recommended'
  ],
  env: {
    browser: true,
    node: true
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'vue/attributes-order': 'warn',
    'vue/html-indent': ['warn', 2],
    'vue/html-self-closing': 'warn',
    'vue/html-closing-bracket-newline': 'off',

    'vue/max-attributes-per-line': [
      1,
      {
        singleline: 10,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    'vue/singleline-html-element-content-newline': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/no-v-html': 0,
    'vue/require-v-for-key': 1,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        tabWidth: 2,
        semi: false,
        trailingComma: 'none'
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  }
}

// // module.exports = {
// //   "extends": [
// //     "eslint:recommended",
// //     "plugin:vue/recommended"
// //   ],
// //   "rules": {
// //     "import/no-unresolved": 0,
// //     "import/no-unassigned-import": 0,
// //     'vue/html-self-closing': 'off',
// //     'vue/max-attributes-per-line': 'off',
// //     'vue/singleline-html-element-content-newline': 'off',
// //     'vue/multiline-html-element-content-newline': 'off',
// //     "semi": ["error", "never"],
// //     "no-console": "off",
// //     "space-before-function-paren": [
// //       "error",
// //       {
// //         "anonymous": "always",
// //         "named": "always",
// //         "asyncArrow": "always"
// //       }
// //     ]
// //   },
// //   parserOptions: {
// //     parser: 'babel-eslint'
// //   }
// // }

// // // https://medium.com/@gogl.alex/how-to-properly-set-up-eslint-with-prettier-for-vue-or-nuxt-in-vscode-e42532099a9c

// // // module.exports = {
// // //   root: true,
// // //   env: {
// // //     node: true
// // //   },
// // //   extends: ['prettier', 'plugin:vue/recommended', 'plugin:prettier/recommended', 'eslint:recommended'],
// // //   plugins: ['vue', 'prettier'],
// // //   rules: {
// // //     'vue/html-self-closing': 'off',
// // //     'vue/max-attributes-per-line': 'off',
// // //     'vue/singleline-html-element-content-newline': 'off',
// // //     'vue/multiline-html-element-content-newline': 'off',
// // //     'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
// // //     'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
// // //   },
// // //   parserOptions: {
// // //     parser: 'babel-eslint'
// // //   }
// // // }

// // // module.exports = {
// // //   root: true,
// // //   env: {
// // //     node: true
// // //   },
// // //   extends: [
// // //     'plugin:vue/essential',
// // //     'plugin:prettier/recommended',
// // //     '@vue/prettier'
// // //     // 'plugin:vue/essential',
// // //     // 'plugin:prettier/recommended',
// // //     // 'prettier/vue'
// // //     //'@vue/prettier'
// // //     //'plugin:vue/recommended',
// // //     //'eslint:recommended',
// // //     //'prettier/vue',
// // //     //'plugin:vue/essential',
// // //     //'@vue/prettier'
// // //   ],
// // //   plugins: ['prettier'],
// // //   rules: {
// // //     'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
// // //     'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
// // //   },
// // //   parserOptions: {
// // //     parser: 'babel-eslint'
// // //   }
// // // }

// 'import/no-unresolved': 0,
//     'import/no-unassigned-import': 0,
//     'vue/html-indent': [
//       'error',
//       2,
//       {
//         closeBracket: 0,
//         ignores: ['VAttribute']
//       }
//     ],
//     'vue/html-self-closing': 'off',
//     'vue/max-attributes-per-line': 'off',
//     'vue/html-closing-bracket-newline': [
//       'error',
//       {
//         singleline: 'never',
//         multiline: 'always'
//       }
//     ],
//     'vue/singleline-html-element-content-newline': [
//       'error',
//       {
//         ignoreWhenEmpty: true,
//         ignores: [],
//         ignoreWhenNoAttributes: true
//       }
//     ],
//     // 'vue/multiline-html-element-content-newline': [
//     //   'error',
//     //   {
//     //     ignoreWhenEmpty: false,
//     //     ignores: [],
//     //     allowEmptyLines: false
//     //   }
//     // ],
//     'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//     'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//     semi: ['error', 'never'],
//     // customize prettier rules
//     'prettier/prettier': [
//       'error',
//       {
//         singleQuote: true,
//         tabWidth: 2,
//         semi: false,
//         trailingComma: 'none'
//       }
//     ]
//   },
