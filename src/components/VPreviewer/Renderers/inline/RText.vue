<template>
  <span class="renderer-text" v-bind="token.attrs">
    {{ token.content }}
  </span>
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererText',
})
</script>

<style lang="scss" scoped>
@import '../styles/mixins';

.renderer-text {
  word-wrap: break-word;
}
</style>
