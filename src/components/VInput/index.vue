<template>
  <div class="v-input" :style="styles" />
</template>

<script lang="ts">
import * as monaco from 'monaco-editor'
import Vue, { PropType } from 'vue'

type Editor = monaco.editor.IStandaloneCodeEditor

export default Vue.extend({
  name: 'VInput',

  props: {
    value: {
      type: String as PropType<string>,
      default: '',
    },
    width: {
      type: [String, Number] as PropType<string | number>,
      default: '100%',
    },
    height: {
      type: [String, Number] as PropType<string | number>,
      default: '100%',
    },
  },

  data: () => ({
    editor: null as Editor | null,
    innerValue: '',
  }),

  computed: {
    styles(): Record<string, any> {
      return {
        width: !/^\d+$/.test(String(this.width)) ? this.width : `${this.width}px`,
        height: !/^\d+$/.test(String(this.height)) ? this.height : `${this.height}px`,
      }
    },
  },

  mounted(): void {
    this.initMonaco()
    this.innerValue = this.value
  },

  methods: {
    initMonaco(): void {
      const editor = monaco.editor.create(this.$el as HTMLElement, {
        value: this.value,
        language: 'markdown',
        wordWrap: 'bounded',
        wrappingStrategy: 'advanced',
        minimap: {
          enabled: false,
        },
        fontSize: 16,
        automaticLayout: true,
        wrappingIndent: 'same',
      })

      this.editor = editor
      this.handleMonacoMounted(editor)
    },

    handleMonacoMounted(editor: Editor): void {
      editor.onDidChangeModelContent(() => {
        const value = editor.getValue()
        this.innerValue = value
        this.$emit('input', value)
      })
    },
  },
})
</script>
