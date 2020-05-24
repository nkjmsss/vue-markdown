declare module '*.md' {
  const src: string
  export default src
}

declare module 'markdown-it-color' {
  import { PluginWithOptions } from 'markdown-it'
  const lib: PluginWithOptions<{
    defaultClassName?: string
    inline?: boolean
  }>
  export default lib
}

declare module 'markdown-it-ins' {
  import { PluginSimple } from 'markdown-it'
  const lib: PluginSimple
  export default lib
}

declare module 'markdown-it-mark' {
  import { PluginSimple } from 'markdown-it'
  const lib: PluginSimple
  export default lib
}
