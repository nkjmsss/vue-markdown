import _MarkdownItToken from 'markdown-it/lib/token'

type Weaken<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? any : T[P]
}

export interface MarkdownItToken extends Weaken<_MarkdownItToken, 'children' | 'attrs'> {
  children: _MarkdownItToken['children'] | null
  attrs: _MarkdownItToken['attrs'] | null
}

export interface Token {
  type: string
  tag: string
  attrs: Record<string, string | undefined>
  children: Token[]
  content?: string
  info: string
  block: boolean
  markup: string
}
