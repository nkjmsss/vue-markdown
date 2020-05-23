<template>
  <ol class="renderer-ordered-list" v-bind="token.attrs">
    <slot />
  </ol>
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererOrderedList',
})
</script>

<style lang="scss" scoped>
@import '../styles/mixins';

.renderer-ordered-list {
  padding-left: 1.5em;
}
</style>
