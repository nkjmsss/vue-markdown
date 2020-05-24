<script lang="tsx">
import { Components, components, fallbackComponent } from './Renderers'
import { CreateMdOptions, Token, createAST, createMd, tokensToString } from '@/lib/markdown'
import Vue, { PropType, VueConstructor } from 'vue'

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
      type: Object as PropType<Exclude<CreateMdOptions['options'], undefined>>,
      default: () => ({} as CreateMdOptions['options']),
    },
    mdDisableRules: {
      type: Array as PropType<Exclude<CreateMdOptions['disableRules'], undefined>>,
      default: () => [],
    },
    mdPlugins: {
      type: Array as PropType<Exclude<CreateMdOptions['plugins'], undefined>>,
      default: () => [],
    },
  },

  computed: {
    markdown(): ReturnType<typeof createMd> {
      return createMd({
        options: this.mdOptions,
        disableRules: this.mdDisableRules,
        plugins: this.mdPlugins,
      })
    },

    tokens(): Token[] {
      return this.tokenize(this.value)
    },

    stringfiedTokens(): string {
      return tokensToString(this.tokens)
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

    tokenize(src: string): Token[] {
      return createAST({
        src,
        tokenizer: (src: string) => this.markdown.parse(src, {}),
      })
    },
  },

  render() {
    const render = (tokens: Token[]) =>
      tokens.map(token => {
        if (!this.mdOptions.breaks && token.type === 'softbreak') return null

        const Component = this.getComponent(token.type)
        return <Component token={token}>{render(token.children)}</Component>
      })

    // return <div class="v-previewer">{render(this.tokens)}</div>
    return (
      <div class="v-previewer">
        <pre style="max-height: 80vh; overflow: scroll;">
          <code>{render(this.tokenize(`\`\`\`\`\n${this.stringfiedTokens}\n\`\`\`\``))}</code>
        </pre>
        <hr />
        <details>
          <summary>tokens</summary>
          <pre style="max-height: 80vh; overflow: scroll;">
            <code>{render(this.tokenize(`\`\`\`\n${JSON.stringify(this.tokens, null, 4)}\n\`\`\``))}</code>
          </pre>
        </details>
        <hr />
        <div>{render(this.tokens)}</div>
      </div>
    )
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
}
</style>
