module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-scss'],
  rules: {
    'max-empty-lines': 2,
    'unit-allowed-list': ['em', 'rem', 'vh', 'vw', '%', 's'],
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
  },
  ignoreFiles: [
    'styles/abstracts/_variables.scss'
  ]
}
