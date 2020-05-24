import { createAST, createMd, tokensToString } from '@/lib/markdown'

const md = createMd()
const check = (...src: string[]) => () => {
  const original = createAST({
    src: src.join('\n'),
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

      test('code', check('`foobar`'))

      describe('linebreaks', () => {
        test(
          'softbreak',
          check(
            'one', //
            'two',
          ),
        )
        test(
          'hardbreak',
          check(
            'one  ', //
            'two',
          ),
        )
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

      describe('image', () => {
        test('normal', check('![placeholder](https://via.placeholder.com/1000)'))
        test('with title', check('![placeholder](https://via.placeholder.com/1000 "title")'))
      })

      describe('blockquote', () => {
        test('one paragraph', check('> foobar'))
        test(
          'multi paragraph',
          check(
            '> first', //
            '> ',
            '> second',
          ),
        )
      })

      describe('bullet_list', () => {
        test('one element', check('- foo'))
        test(
          'multiple element',
          check(
            '- foo', //
            '- bar',
          ),
        )
      })

      describe('ordered_list', () => {
        test('one element', check('1. foo'))
        test('one element starts with 3', check('3. foo'))
        test('one element starts with 0', check('0. foo'))
        test(
          'multiple element',
          check(
            '1. foo', //
            '2. bar',
          ),
        )
        test(
          'multiple element with same number',
          check(
            '1. foo', //
            '2. bar',
          ),
        )
        test(
          'multiple element with shuffled number',
          check(
            '1. foo', //
            '3. bar',
            '2. baz',
          ),
        )
      })

      describe('table', () => {
        test(
          'normal',
          check(
            '| th1     | th2     | th3     |',
            '|---------|---------|---------|',
            '| td1-1   | td1-2   | td1-3   |',
            '| td2-1   | td2-2   | td2-3   |',
          ),
        )
        test(
          'left center right',
          check(
            '| Left align | Right align | Center align |',
            '|:-----------|------------:|:------------:|',
            '| This       | This        | This         |',
            '| column     | column      | column       |',
            '| will       | will        | will         |',
            '| be         | be          | be           |',
            '| left       | right       | center       |',
            '| aligned    | aligned     | aligned      |',
          ),
        )
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
