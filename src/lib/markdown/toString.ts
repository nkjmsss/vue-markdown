import { Token } from './tokens'

export const tokensToString = (tokens: readonly Token[]): string => {
  const toStr = (tokens: readonly Token[]): string => {
    return tokens
      .map<string>(token => {
        const content = (token.children && token.children.length > 0 ? toStr(token.children) : token.content) || ''

        switch (token.type) {
          // inline
          case 'strong':
          case 'em':
          case 'ins':
          case 'mark':
          case 's':
          case 'code_inline': {
            const markup = token.markup
            return `${markup}${content}${markup}`
          }
          case 'link': {
            const href = token.attrs.href || ''
            const title = token.attrs.title ? ` "${token.attrs.title}"` : ''

            return `[${content}](${href}${title})`
          }
          case 'image': {
            const src = token.attrs.src || ''
            const title = token.attrs.title ? ` "${token.attrs.title}"` : ''

            return `![${content}](${src}${title})`
          }

          // block
          case 'paragraph': {
            return `${content}\n\n`
          }
          case 'heading': {
            return `${token.markup} ${content}\n\n`
          }
        }

        return content
      })
      .join('')
  }

  return toStr(tokens)
}
