module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'space-before-function-paren': [0, {
      "anonymous": 'ignore',
      'named': 'ignore',
      'asyncArrow': 'ignore'
    }]
  },
  globals: {}
}
