<template>
  <ins v-bind="token.attrs" class="renderer-ins">
    <slot />
  </ins>
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererIns',
})
</script>

<style lang="scss" scoped>
@import '../styles/mixins';
</style>
