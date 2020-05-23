<script lang="tsx">
import { Components, components, fallbackComponent } from './Renderers'
import { MarkdownItToken, Token, createAST, markdown } from '@/lib/markdown'
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
  },

  computed: {
    tokens(): MarkdownItToken[] {
      return markdown.parse(this.value, {})
    },

    Tokens(): Token[] {
      return createAST({
        src: this.value,
        tokenizer: (src: string) => markdown.parse(src, {}),
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

  & > *:first-child {
    margin-top: 0 !important;
  }

  * {
    max-width: 100%;
  }
}
</style>
