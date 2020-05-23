<template>
  <s v-bind="token.attrs" class="renderer-s">
    <slot />
  </s>
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererS',
})
</script>

<style lang="scss" scoped>
@import '../styles/mixins';
</style>
