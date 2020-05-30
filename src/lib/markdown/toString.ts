import { Token } from './tokens'

const removeLastBrs = (src: string): string =>
  src
    .split('\n')
    .reduceRight((acc, cur) => {
      if (acc.length > 0 || cur.trim()) {
        acc.unshift(cur)
      }
      return acc
    }, [] as string[])
    .join('\n')

const appendHeadEachLine = (src: string, mark: string): string =>
  src
    .split('\n')
    .map(s => `${mark}${s}`)
    .join('\n')

const transpose = <T>(a: T[][]) => a[0].map((_, c) => a.map(r => r[c]))

export const tokensToString = (tokens: readonly Token[]): string => {
  const getContent = (token: Token, parent: Token): string =>
    (token.children && token.children.length > 0 ? toStr(token.children, parent) : token.content) || ''

  const toStr = (tokens: readonly Token[], parent?: Token): string => {
    return tokens
      .map<string>(token => {
        const c = (() => {
          switch (token.type) {
            // inline
            case 'strong':
            case 'em':
            case 'ins':
            case 'mark':
            case 's':
            case 'code_inline': {
              const markup = token.markup
              return `${markup}${getContent(token, token)}${markup}`
            }
            case 'link': {
              const href = token.attrs.href || ''
              const title = token.attrs.title ? ` "${token.attrs.title}"` : ''

              return `[${getContent(token, token)}](${href}${title})`
            }
            case 'image': {
              const src = token.attrs.src || ''
              const title = token.attrs.title ? ` "${token.attrs.title}"` : ''

              return `![${getContent(token, token)}](${src}${title})`
            }
            case 'softbreak': {
              return '\n'
            }
            case 'hardbreak': {
              return '  \n'
            }

            // block
            case 'paragraph': {
              return `${getContent(token, token)}`
            }
            case 'heading': {
              return `${token.markup} ${getContent(token, token)}`
            }
            case 'blockquote': {
              return appendHeadEachLine(removeLastBrs(getContent(token, token)), `${token.markup} `)
            }
            case 'bullet_list': {
              return token.children.map(t => `${t.markup} ${getContent(t, token)}`).join('\n')
            }
            case 'ordered_list': {
              const num = token.attrs.start !== undefined ? Number(token.attrs.start) : 1
              return token.children.map(t => `${num}${t.markup} ${getContent(t, token)}`).join('\n')
            }
            case 'table': {
              // table > (thead>tr) + (tbody>tr)
              const _table = token.children.flatMap(theadOrBody =>
                theadOrBody.children.map(tr => tr.children.map(tdOrTh => getContent(tdOrTh, tr))),
              )
              const maxLength = transpose(_table).map(r => Math.max(...r.map(d => d.length)))

              const table = _table.map(r => r.map((d, i) => d.padEnd(maxLength[i], ' ')))
              const [thead, ...tbody] = table

              const _alignment = token.children.flatMap(theadOrBody =>
                theadOrBody.children.map(tr =>
                  tr.children.map(tdOrTh => {
                    const style = (tdOrTh.attrs.style as string) || ''
                    const align = style.replace(/.?;?\s*text-align\s*:\s*(.+)\s*;?.*/, '$1')
                    return align
                  }),
                ),
              )
              const alignment = transpose(_alignment).map(col => (col.every((v, i, arr) => v === arr[0]) ? col[0] : ''))
              const alignmentLine = `|${alignment
                .map((align, i) => {
                  switch (align) {
                    case 'left': {
                      return `:${'-'.repeat(maxLength[i] + 1)}`
                    }
                    case 'right': {
                      return `${'-'.repeat(maxLength[i] + 1)}:`
                    }
                    case 'center': {
                      return `:${'-'.repeat(maxLength[i])}:`
                    }
                    default: {
                      return '-'.repeat(maxLength[i] + 2)
                    }
                  }
                })
                .join('|')}|`

              const formatTr = (tr: string[]) => `| ${tr.join(' | ')} |`

              return [formatTr(thead), alignmentLine, ...tbody.map(tr => formatTr(tr))].join('\n')
            }
            case 'fence': {
              return `${token.markup}${token.info}\n${getContent(token, token)}${token.markup}`
            }
            case 'code_block': {
              return appendHeadEachLine(getContent(token, token), '    ')
            }
            case 'html_block': {
              return getContent(token, token)
            }
            case 'hr': {
              return token.markup
            }
          }

          return getContent(token, token)
        })()

        // process exceptions
        if (parent) {
          switch (parent.type) {
            case 'bullet_list':
            case 'ordered_list': {
              if (token.block) {
                switch (token.type) {
                  case 'code_block': {
                    // markdown-it bug??
                    return `\n\n${removeLastBrs(appendHeadEachLine(c, parent.type === 'bullet_list' ? '  ' : '   '))}`
                  }
                }

                return `\n\n${removeLastBrs(appendHeadEachLine(c, '    '))}`
              }
            }
          }

          if (parent.block) {
            if (token.block) {
              return `${removeLastBrs(c)}\n\n`
            }
          }
        }

        return token.block ? `${c}\n\n` : c
      })
      .join('')
  }

  return removeLastBrs(toStr(tokens))
}
