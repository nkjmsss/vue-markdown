import { check, wrap } from './utils'
import sample from '@/assets/sample.md'

wrap('samples', () => {
  test('sample', check(sample))
})
