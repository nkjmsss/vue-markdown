import { createAST, createMd, tokensToString } from '@/lib/markdown'

const md = createMd()
const check = (src: string) => () => {
  const original = createAST({
    src,
    tokenizer: (src: string) => md.parse(src, {}),
  })
  const reshaped = createAST({
    src: tokensToString(original),
    tokenizer: (src: string) => md.parse(src, {}),
  })

  expect(original).toEqual(reshaped)
}

describe('lib/markdown', () => {
  describe('toString', () => {
    // inline rules
    describe('inline', () => {
      test('text', check('sample text'))

      describe('strong', () => {
        test('*', check('**foobar**'))
        test('_', check('__foobar__'))
      })

      describe('em', () => {
        test('*', check('*foobar*'))
        test('_', check('_foobar_'))
      })

      test('ins', check('++foobar++'))

      test('mark', check('==foobar=='))

      test('s', check('~~foobar~~'))

      describe('link', () => {
        test('normal', check('[link](https://example.com)'))

        test('with title', check('[link](https://example.com "title")'))
      })
    })

    // block rules
    describe('block', () => {
      describe('headings', () => {
        test('h1', check('# heading'))
      })
    })
  })
})
