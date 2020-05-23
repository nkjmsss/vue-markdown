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
        test('h2', check('## heading'))
        test('h3', check('### heading'))
        test('h4', check('#### heading'))
        test('h5', check('##### heading'))
        test('h6', check('###### heading'))
      })
    })

    // complicated
    describe('complicated', () => {
      describe('mixed inline rules', () => {
        test('text + strong', check('sample**foo**sample__foo__'))
        test('link + text + s', check('[link](https://example.com "title")text~~strike~~'))
      })

      describe('nested inline rules', () => {
        test('strong > ins', check('**strong++ins++**'))
        test('link > em', check('[link*em*](https://example.com "title")'))
        test('em > strike', check('_~~strike~~em_'))
      })
    })
  })
})
