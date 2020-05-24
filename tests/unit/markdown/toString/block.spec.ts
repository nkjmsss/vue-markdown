import { check, wrap } from './utils'

wrap('block', () => {
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

  describe('hr', () => {
    test('---', check('---'))
    test('***', check('***'))
    test('___', check('___'))
    test('- - -', check('- - -'))
    test('-- - --', check('-- - --'))
  })
})
