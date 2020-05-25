module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ['babel', 'sort-imports-es6-autofix'],
  rules: {
    '@typescript-eslint/camelcase': [0],
    '@typescript-eslint/explicit-function-return-type': [0],
    '@typescript-eslint/no-explicit-any': [0],
    '@typescript-eslint/no-non-null-assertion': [0],
    '@typescript-eslint/no-use-before-define': [0],
    '@typescript-eslint/no-namespace': [0],
    '@typescript-eslint/no-unused-vars': [
      1,
      {
        argsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-var-requires': [0],
    '@typescript-eslint/member-delimiter-style': [0],
    'babel/no-unused-expressions': [2],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-expressions': [0],
    'sort-imports-es6-autofix/sort-imports-es6': [
      1,
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
    'unicorn/number-literal-case': 0,
    'vue/order-in-components': 2,
    'vue/component-tags-order': [
      2,
      {
        order: ['template', 'script', 'style'],
      },
    ],
    'vue/padding-line-between-blocks': [2, 'always'],
    'vue/no-static-inline-styles': [
      2,
      {
        allowBinding: false,
      },
    ],
    'vue/no-boolean-default': [2, 'default-false'],
    'prettier/prettier': [
      2,
      {
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'avoid',
        semi: false,
        endOfLine: 'auto',
      },
    ],
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
}
