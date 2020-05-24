import { createAST, createMd, tokensToString } from '@/lib/markdown'

const md = createMd()

export const check = (...src: string[]) => () => {
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

export const wrap = (...args: Parameters<jest.Describe>): void => {
  describe('lib/markdown', () => {
    describe('toString', () => {
      describe(...args)
    })
  })
}
