import MarkdownIt from 'markdown-it'
import ins from 'markdown-it-ins'
import mark from 'markdown-it-mark'

export * from './tokens'
export * from './ast'
export * from './toString'

export interface CreateMdOptions {
  options?: MarkdownIt.Options
  disableRules?: string[]
  plugins?: Array<Parameters<MarkdownItUse>>
}

type MarkdownItUse<T = any> =
  | ((plugin: MarkdownIt.PluginSimple) => MarkdownIt)
  | ((plugin: MarkdownIt.PluginWithOptions<T>, options?: T) => MarkdownIt)
  | ((plugin: MarkdownIt.PluginWithParams, ...params: any[]) => MarkdownIt)

export const createMd = ({ options = {}, disableRules = [], plugins = [] }: CreateMdOptions = {}): MarkdownIt => {
  const markdown = MarkdownIt({
    html: true,
    xhtmlOut: false,
    breaks: false,
    langPrefix: 'lang-',
    linkify: false,
    typographer: true,
    quotes: '“”‘’',
    ...options,
  })

  markdown
    .disable('lheading') // a special syntax for h1 and h2 (using "=" or "-" below the text)
    .disable('code') // four space to make code block

  markdown //
    .use(ins)
    .use(mark)

  disableRules.forEach(rule => {
    markdown.disable(rule)
  })

  plugins.forEach(plugin => {
    const [p, ...opts] = plugin
    markdown.use(p, ...opts)
  })

  return markdown
}
