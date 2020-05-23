module.exports = {
  plugins: ['stylelint-order', 'stylelint-scss'],
  extends: [
    'stylelint-config-standard',
    './node_modules/prettier-stylelint/config.js',
    'stylelint-config-recess-order',
  ],
  ignoreFiles: ['**/node_modules/**'],
  rules: {
    // scssを使うには↓の2つがないと@mixinとかでエラーになってしまう。
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,

    // order and empty lines
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['first-nested', 'blockless-after-blockless'],
        ignore: ['after-comment'],
        ignoreAtRules: ['else'],
      },
    ],
    'declaration-empty-line-before': [
      'always',
      {
        except: ['after-comment', 'after-declaration', 'first-nested'],
        ignore: ['inside-single-line-block'],
      },
    ],
    'no-empty-first-line': true,
    'no-descending-specificity': null,
    'order/order': [
      'dollar-variables',
      'custom-properties',
      'declarations',
      {
        type: 'at-rule',
        name: 'include',
      },
      {
        type: 'at-rule',
        name: 'include',
        hasBlock: true,
      },
      {
        type: 'at-rule',
        name: 'include',
        parameter: 'mq',
        hasBlock: true,
      },
      {
        type: 'rule',
        selector: /^&\.\w/,
      },
      {
        type: 'rule',
        selector: /&$/,
      },
      {
        type: 'rule',
        selector: /^&:\w/,
      },
      {
        type: 'rule',
        selector: /^&::\w/,
      },
      {
        type: 'rule',
        selector: /^&_+\w/,
      },
      {
        type: 'rule',
        selector: /^&-+\w/,
      },
      'rules',
    ],
  },
}
