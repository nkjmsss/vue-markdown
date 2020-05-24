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
