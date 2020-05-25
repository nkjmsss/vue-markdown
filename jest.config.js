const deepmerge = require('deepmerge')
const preset = require('@vue/cli-plugin-unit-jest/presets/typescript-and-babel/jest-preset')

module.exports = deepmerge(preset, {
  moduleFileExtensions: ['md'],
  transform: {
    '^.+\\.md$': 'jest-raw-loader',
  },
})
