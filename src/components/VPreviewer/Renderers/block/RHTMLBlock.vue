<template>
  <div class="renderer-html-block" v-bind="token.attrs" v-html="token.content" />
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererHTMLBlock',

  methods: {
    isComment(src: string): boolean {
      return /(?=<!--)([\s\S]*?)-->/.test(src)
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../styles/mixins';
</style>
