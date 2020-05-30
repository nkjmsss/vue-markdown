<template>
  <pre class="renderer-code-block" v-bind="token.attrs"><code>{{token.content}}</code></pre>
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererCodeBlock',
})
</script>

<style lang="scss" scoped>
@import '../styles/mixins';

.renderer-code-block {
  overflow: scroll;
  font-size: 0.9rem;
  background-color: #f8f8f8;

  code {
    display: block;
    padding: 1.2em 1.5em;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    font-size: 0.9rem;
    white-space: pre;
  }
}
</style>
