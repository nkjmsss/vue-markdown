import { MarkdownItToken, Token } from './tokens'

const openReg = /(.*)_open/

const findCloserIdx = (tokens: MarkdownItToken[], openIdx: number): number => {
  if (openReg.test(tokens[openIdx].type)) {
    const closerType = tokens[openIdx].type.replace('_open', '_close')
    for (let i = openIdx; i < tokens.length; i++) {
      if (tokens[i].type === closerType && tokens[openIdx].level === tokens[i].level) return i
    }

    throw new Error('failed to find closer')
  }

  return openIdx
}

const reshapeAttrs = (attrs: MarkdownItToken['attrs']): Record<string, string> => {
  return Object.fromEntries(attrs || [])
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const extractHTMLTag = (
  src: string,
):
  | {
      tag: string
      open: boolean
      close: boolean
      attrs: Record<string, string>
    }
  | false => {
  // tagかの判定
  const e = /<([^'"> ]*)(".*?"|'.*?'|[^'"])*?>/.exec(src)
  if (!e) {
    return false
  }

  const tag = e[1].replace('/', '')
  const open = /^\/.*/.test(e[1])
  const close = /(.*\/>$)|(<\/.*)/.test(src)

  return {
    tag,
    open,
    close,
    attrs: {},
  }
}

export const getContent = (
  tokens: (MarkdownItToken | Token)[],
  {
    start = 0,
    end = tokens.length,
    separator = '\n',
  }: {
    start?: number
    end?: number
    separator?: string
  } = {},
): string => {
  return tokens
    .slice(start, end)
    .map(token => token.content || getContent(token.children || []))
    .join(separator)
}

export const createAST = ({
  src,
  tokenizer,
}: {
  src: string
  tokenizer: (src: string) => MarkdownItToken[]
}): Token[] => {
  const parse = (tokens: MarkdownItToken[], parentTag = ''): Token[] => {
    const res: Token[][] = []
    const pushToRes = (token: MarkdownItToken, override: Partial<Token> = {}) => {
      const base: Token = {
        type: token.type,
        tag: token.tag,
        attrs: reshapeAttrs(token.attrs),
        children: [],
        content: token.content,
        info: token.info,
        block: token.block,
        markup: token.markup,
      }

      res.push([
        {
          ...base,
          ...override,
        },
      ])
    }

    let i = 0
    while (i < tokens.length) {
      const token = tokens[i]

      // **_open
      if (openReg.test(token.type)) {
        const tag = token.tag
        const closeIdx = findCloserIdx(tokens, i)
        const children = tokens.slice(i + 1, closeIdx)
        ;(() => {
          if (tag === 'p' && ['li'].includes(parentTag)) {
            if (children.length !== 1) {
              throw new Error('paragraph had unknown child')
            }

            res.push(parse(children[0].children || []))
            return
          }

          pushToRes(token, {
            type: token.type.replace(openReg, '$1'),
            children: parse(children, tag),
          })
        })()

        i = closeIdx + 1
        continue
      }

      // inline
      if (token.type === 'inline') {
        res.push(parse(token.children || [], parentTag))
        i++
        continue
      }

      // image
      if (token.type === 'image') {
        if (!token.children || token.children?.length !== 1) {
          throw new Error("image didn't have only one children")
        }

        token.attrJoin('alt', token.children[0].content)
      }

      // // html_inline
      // if (token.type === 'html_inline') {
      // }

      // default
      pushToRes(token)
      i++
    }

    return res.flat()
  }

  return parse(tokenizer(src))
}
