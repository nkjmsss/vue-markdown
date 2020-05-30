<template>
  <span
    class="renderer-text"
    :class="{ 'renderer-text--editable': editable }"
    v-bind="token.attrs"
    :contenteditable="editable"
    v-text="initialContent"
    @input="handleInput"
  />
</template>

<script lang="ts">
import { RendererBase } from '../utils'
import Token from 'markdown-it/lib/token'

export default RendererBase.extend({
  name: 'RendererText',

  methods: {
    handleInput(e: InputEvent) {
      const target = e.target as HTMLElement | null
      const content = target?.innerText || ''

      this.$emit('updateToken', {
        ...this.token,
        content,
      } as Token)
    },
  },

  data: () => ({
    initialContent: '', // prevent render event on input
  }),

  mounted() {
    this.initialContent = this.token.content ?? ''
  },
})
</script>

<style lang="scss" scoped>
@import '../styles/mixins';

.renderer-text {
  word-wrap: break-word;

  &--editable {
    &:focus {
      background-color: rgba(colors(primary), 0.2);
      outline: none;
    }
  }
}
</style>
