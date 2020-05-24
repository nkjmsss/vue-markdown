import { check, wrap } from './utils'

wrap('edge cases', () => {
  test('todo', check(''))
  // describe('ol like', () => {
  //   test('1999\\. foo', check('1999\\. foo'))
  // })
  //
  // describe('starts with 4 space indent', () => {
  //   test('heading like', check('    # foo'))
  //   test('blockquote like', check('    > foo'))
  //   test('ul like', check('    - foo'))
  //   test('ol like', check('    1. foo'))
  //   test(
  //     'table like',
  //     check(
  //       '    | Left align | Right align | Center align |',
  //       '    |:-----------|------------:|:------------:|',
  //       '    | This       | This        | This         |',
  //       '    | column     | column      | column       |',
  //       '    | will       | will        | will         |',
  //       '    | be         | be          | be           |',
  //       '    | left       | right       | center       |',
  //       '    | aligned    | aligned     | aligned      |',
  //     ),
  //   )
  // })
  //
  // describe('inline code with backquote', () => {
  //   test('2 > 1', check('`` `a` ``'))
  //   test('3 > 2', check('``` ``double-back-quote`` ```'))
  // })
})
