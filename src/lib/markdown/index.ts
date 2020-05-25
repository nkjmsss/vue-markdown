import MarkdownIt from 'markdown-it'
import ins from 'markdown-it-ins'
import mark from 'markdown-it-mark'
const { options: commonmarkOptions } = require('markdown-it/lib/presets/commonmark')

export * from './tokens'
export * from './ast'
export * from './toString'

export interface CreateMdOptions {
  options?: Pick<MarkdownIt.Options, 'html' | 'breaks'>
  disableRules?: string[]
  plugins?: Array<Parameters<MarkdownItUse>>
}

type MarkdownItUse<T = any> =
  | ((plugin: MarkdownIt.PluginSimple) => MarkdownIt)
  | ((plugin: MarkdownIt.PluginWithOptions<T>, options?: T) => MarkdownIt)
  | ((plugin: MarkdownIt.PluginWithParams, ...params: any[]) => MarkdownIt)

const removeEmpty = <T extends Record<any, any>>(obj: T): Partial<T> =>
  Object.keys(obj)
    .filter(k => obj[k] !== null && obj[k] !== undefined)
    .reduce(
      (newObj, k) =>
        typeof obj[k] === 'object'
          ? { ...newObj, [k]: removeEmpty(obj[k]) } // Recurse.
          : { ...newObj, [k]: obj[k] }, // Copy value.
      {},
    )

export const createMd = ({ options = {}, disableRules = [], plugins = [] }: CreateMdOptions = {}): MarkdownIt => {
  const { html, breaks } = options
  const markdown = MarkdownIt({
    ...commonmarkOptions,
    ...removeEmpty({ html, breaks }),
  })

  markdown //
    .disable('lheading') // a special syntax for h1 and h2 (using "=" or "-" below the text)

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
