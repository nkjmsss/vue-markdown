import { check, wrap } from './utils'

wrap('edge cases', () => {
  test('todo', check(''))
  // describe('ol like', () => {
  //   test('1999\\. foo', check('1999\\. foo'))
  // })
  //
  //
  // describe('inline code with backquote', () => {
  //   test('2 > 1', check('`` `a` ``'))
  //   test('3 > 2', check('``` ``double-back-quote`` ```'))
  // })
})
