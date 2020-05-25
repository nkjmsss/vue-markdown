import { check, wrap } from './utils'
import { sample } from '@/assets/md'

wrap('samples', () => {
  test('sample', check(sample))
})
