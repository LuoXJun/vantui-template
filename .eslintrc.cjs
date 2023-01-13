module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // 关闭vue组件名必须驼峰且两个单词以上
    'vue/multi-word-component-names': 0,
    // 关闭使用any检测
    '@typescript-eslint/no-explicit-any': ['off'],
    // 关闭非空断言检测
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
}
