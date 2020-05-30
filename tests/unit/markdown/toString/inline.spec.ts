import { check, wrap } from './utils'

wrap('inline', () => {
  test('empty', check(''))
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

  describe('code', () => {
    test('normal', check('`foobar`'))
    describe('with backquote', () => {
      test('2 > 1', check('`` `a` ``'))
      test('3 > 2', check('``` ``double-back-quote`` ```'))
      test('only space before', check('`` `code`some string``'))
      test('only space after', check('``some string`code` ``'))
    })
  })

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
