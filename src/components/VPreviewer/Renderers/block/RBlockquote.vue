<template>
  <blockquote class="renderer-blockquote" v-bind="token.attrs">
    <slot />
  </blockquote>
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererBlockquote',
})
</script>

<style lang="scss" scoped>
@import '../styles/mixins';

.renderer-blockquote {
  padding-left: 1em;
  margin: 2em 0;
  border-left: 4px solid colors(primary);
}
</style>
