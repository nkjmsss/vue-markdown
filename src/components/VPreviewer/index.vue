<script lang="tsx">
import { Components, components, fallbackComponent } from './Renderers'
import { MarkdownItToken, Token, createAST } from '@/lib/markdown'
import MarkdownIt from 'markdown-it'
import Vue, { PropType, VueConstructor } from 'vue'
import ins from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import md from 'markdown-it'

type MarkdownItUse<T = any> =
  | ((plugin: MarkdownIt.PluginSimple) => MarkdownIt)
  | ((plugin: MarkdownIt.PluginWithOptions<T>, options?: T) => MarkdownIt)
  | ((plugin: MarkdownIt.PluginWithParams, ...params: any[]) => MarkdownIt)

export default Vue.extend({
  name: 'VPreviewer',

  props: {
    value: {
      type: String as PropType<string>,
      default: '',
    },
    components: {
      type: Array as PropType<Components>,
      default: () => [],
    },
    mdOptions: {
      type: Object as PropType<Partial<md.Options>>,
      default: () => ({}),
    },
    mdDisables: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    mdPlugins: {
      type: Array as PropType<Array<Parameters<MarkdownItUse>>>,
      default: () => [],
    },
  },

  computed: {
    markdown(): MarkdownIt {
      const markdown = md({
        html: false,
        xhtmlOut: false,
        breaks: false,
        langPrefix: 'lang-',
        linkify: false,
        typographer: true,
        quotes: '“”‘’',
        ...this.mdOptions,
      })

      markdown
        .disable('lheading') // a special syntax for h1 and h2 (using "=" or "-" below the text)
        .disable('code') // four space to make code block

      markdown //
        .use(ins)
        .use(mark)

      this.mdDisables.forEach(rule => {
        markdown.disable(rule)
      })

      this.mdPlugins.forEach(plugin => {
        const [p, ...opts] = plugin
        markdown.use(p, ...opts)
      })

      return markdown
    },

    tokens(): MarkdownItToken[] {
      return this.markdown.parse(this.value, {})
    },

    Tokens(): Token[] {
      return createAST({
        src: this.value,
        tokenizer: (src: string) => this.markdown.parse(src, {}),
      })
    },
  },

  methods: {
    getComponent(type: string): VueConstructor {
      const c = [...this.components, ...components].find(({ type: t }) =>
        t instanceof RegExp ? t.test(type) : t === type,
      )
      if (c) {
        return c.component
      }
      return fallbackComponent
    },
  },

  render() {
    const render = (tokens: Token[]) =>
      tokens.map(token => {
        const Component = this.getComponent(token.type)
        return <Component token={token}>{render(token.children)}</Component>
      })

    return <div class="v-previewer">{render(this.Tokens)}</div>
  },
})
</script>

<style lang="scss" scoped>
.v-previewer {
  padding: 10px 20px 20px;
  line-height: 1.5;

  & > *:first-child {
    margin-top: 0 !important;
  }

  * {
    max-width: 100%;
  }
}
</style>
