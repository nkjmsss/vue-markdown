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
          case 'softbreak': {
            return '\n'
          }
          case 'hardbreak': {
            return '  \n'
          }

          // block
          case 'paragraph': {
            return `${content}\n\n`
          }
          case 'heading': {
            return `${token.markup} ${content}\n\n`
          }
          case 'blockquote': {
            const markAppended = removeLastBrs(content)
              .split('\n')
              .map(c => `${token.markup} ${c}`)
              .join('\n')

            return `${markAppended}\n\n`
          }
        }

        return content
      })
      .join('')
  }

  return removeLastBrs(toStr(tokens))
}
