import { createAST, createMd, tokensToString } from '@/lib/markdown'
import { sample } from '@/assets/sample'

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
        test(
          '* markup',
          check(
            '* foo', //
            '* bar',
          ),
        )
        test(
          '+ markup',
          check(
            '+ foo', //
            '+ bar',
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

      describe('fence', () => {
        test(
          'without language',
          check(
            '```', //
            'sample',
            'code',
            '```',
          ),
        )
        test(
          'ends with blank line',
          check(
            '```', //
            'sample',
            '',
            '```',
          ),
        )
        test(
          'with language',
          check(
            '```java', //
            'sample',
            '',
            '```',
          ),
        )
        test(
          'with language (space before)',
          check(
            '```  java', //
            'sample',
            '',
            '```',
          ),
        )
        test(
          'with language (space after)',
          check(
            '```java  ', //
            'sample',
            '',
            '```',
          ),
        )
        test(
          'with language (space before and after)',
          check(
            '``` java ', //
            'sample',
            '',
            '```',
          ),
        )
        test(
          'with 4 backquote',
          check(
            '````', //
            'sample',
            '',
            '````',
          ),
        )
        test(
          'with 5 backquote',
          check(
            '`````', //
            'sample',
            '',
            '`````',
          ),
        )
      })

      describe('html_block', () => {
        test('div', check('<div>foobar</div>'))
        test('div > strong', check('<div>foo<strong>bar</strong></div>'))
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

      describe('block + block', () => {
        test(
          'heading + ul',
          check(
            '# heading', //
            '',
            '- list',
            '- list',
          ),
        )

        test(
          'ul + ol',
          check(
            '- ul', //
            '- ul',
            '',
            '1. ol',
            '1. ol',
          ),
        )
      })

      describe('block > block', () => {
        test(
          'ul > ul (2 space indent)',
          check(
            '- foo', //
            '  - bar',
            '- baz',
          ),
        )
        test(
          'ul > ul (4 space indent)',
          check(
            '- foo', //
            '    - bar',
            '- baz',
          ),
        )
        test(
          'ul > ul (tab indent)',
          check(
            '- foo', //
            '\t- bar',
            '- baz',
          ),
        )
        test(
          'ul > ul > ul > ul',
          check(
            '- foo', //
            '  - bar',
            '    + baz',
            '      * qux',
            '    + baz',
            '  - bar',
            '- foo',
            '  - bar',
            '  - bar',
          ),
        )
        test(
          'ul > blockquote',
          check(
            '- A list item with a blockquote:', //
            '    > This is a blockquote',
            '    > inside a list item.',
            '- Back to list',
          ),
        )
        test(
          'blockquote > blockquote',
          check(
            '> hoge', //
            '> hoge',
            '>> hoge',
          ),
        )
        test(
          'blockquote > blockquote, then unnest',
          check(
            '> hoge', //
            '> hoge',
            '>> hoge',
            '> hoge',
          ),
        )
        test(
          'blockquote > (heading + ul)',
          check(
            '> # header', //
            '> ',
            '> - list',
            '> - list',
          ),
        )
        test(
          'ul > ol',
          check(
            '- ul', //
            '    1. foo',
            '    1. bar',
            '- back to ul',
          ),
        )
      })

      describe('test sample', () => {
        test('sample', check(sample))
      })
    })
  })
})
