import { check, wrap } from './utils'

wrap('nested', () => {
  describe('inline + inline', () => {
    test('text + strong', check('sample**foo**sample__foo__'))
    test('link + text + s', check('[link](https://example.com "title")text~~strike~~'))
  })

  describe('inline > inline', () => {
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
      'ul > code_block',
      check(
        '* hoge', //
        '',
        '        foo',
        '        bar',
        '* foo',
      ),
    )
    test(
      'ol > code_block',
      check(
        '1. hoge', //
        '',
        '        foo',
        '        bar',
        '1. foo',
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
      'blockquote > code_block',
      check(
        '> foobar', //
        '>',
        '>     code block',
        '>     > this is not blockquote',
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
})
