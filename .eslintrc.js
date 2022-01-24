module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
  },
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'no-console': 'off', // ++
    'prettier/prettier': 'error',
  },
  plugins: ['prettier'], // ++
  extends: [
    'plugin:vue/vue3-recommended', // ++
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
};
