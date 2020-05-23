import { Token } from './tokens'

const removeLastBrs = (src: string): string =>
  src
    .split('\n')
    .reduceRight((acc, cur) => {
      if (acc.length > 0 || cur) {
        acc.unshift(cur)
      }
      return acc
    }, [] as string[])
    .join('\n')

export const tokensToString = (tokens: readonly Token[]): string => {
  const getContent = (token: Token): string =>
    (token.children && token.children.length > 0 ? toStr(token.children) : token.content) || ''

  const toStr = (tokens: readonly Token[]): string => {
    return tokens
      .map<string>(token => {
        switch (token.type) {
          // inline
          case 'strong':
          case 'em':
          case 'ins':
          case 'mark':
          case 's':
          case 'code_inline': {
            const markup = token.markup
            return `${markup}${getContent(token)}${markup}`
          }
          case 'link': {
            const href = token.attrs.href || ''
            const title = token.attrs.title ? ` "${token.attrs.title}"` : ''

            return `[${getContent(token)}](${href}${title})`
          }
          case 'image': {
            const src = token.attrs.src || ''
            const title = token.attrs.title ? ` "${token.attrs.title}"` : ''

            return `![${getContent(token)}](${src}${title})`
          }
          case 'softbreak': {
            return '\n'
          }
          case 'hardbreak': {
            return '  \n'
          }

          // block
          case 'paragraph': {
            return `${getContent(token)}\n\n`
          }
          case 'heading': {
            return `${token.markup} ${getContent(token)}\n\n`
          }
          case 'blockquote': {
            const markAppended = removeLastBrs(getContent(token))
              .split('\n')
              .map(c => `${token.markup} ${c}`)
              .join('\n')

            return `${markAppended}\n\n`
          }
          case 'bullet_list': {
            return token.children.map(t => `${t.markup} ${getContent(t)}`).join('\n')
          }
        }

        return getContent(token)
      })
      .join('')
  }

  return removeLastBrs(toStr(tokens))
}
