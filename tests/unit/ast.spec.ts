import { createMd, markdownItTokensToString } from '@/lib/markdown'

const md = createMd()
const check = (src: string) => {
  const original = md.parse(src, {})
  const reshaped = md.parse(markdownItTokensToString(original), {})

  expect(original).toEqual(reshaped)
}

describe('lib/markdown', () => {
  describe('toString', () => {
    test('text', () => {
      check('sample text')
    })

    test('img', () => {
      check('![placeholder](https://via.placeholder.com/1000)')
    })
  })
})
