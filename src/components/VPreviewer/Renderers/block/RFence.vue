<template>
  <pre class="renderer-fence" v-bind="token.attrs"><code>{{token.content}}</code></pre>
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererFence',
})
</script>

<style lang="scss" scoped>
@import '../styles/mixins';

.renderer-fence {
  font-size: 0.85rem;
  background-color: #f8f8f8;

  code {
    display: block;
    padding: 1.2em 1.5em;
    font-size: 0.85rem;
    white-space: pre;
  }
}
</style>
