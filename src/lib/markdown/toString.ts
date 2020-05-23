import { MarkdownItToken } from './tokens'

export const markdownItTokensToString = (tokens: readonly MarkdownItToken[]): string => {
  const _toStr = (tokens: readonly MarkdownItToken[]): string => {
    return tokens
      .map(token => {
        const content = token.children && token.children.length > 0 ? _toStr(token.children) : token.content
        return `${token.markup}${content}`
      })
      .join('')
  }

  return _toStr(tokens)
}
