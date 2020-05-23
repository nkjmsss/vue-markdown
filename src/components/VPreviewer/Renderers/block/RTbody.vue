<template>
  <tbody v-bind="token.attrs" class="renderer-tbody">
    <slot />
  </tbody>
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererTbody',
})
</script>

<style lang="scss" scoped>
@import '../styles/mixins';
</style>
