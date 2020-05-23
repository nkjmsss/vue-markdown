<template>
  <mark v-bind="token.attrs" class="renderer-mark">
    <slot />
  </mark>
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererMark',
})
</script>

<style lang="scss" scoped>
@import '../styles/mixins';
</style>
