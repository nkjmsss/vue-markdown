<template>
  <thead v-bind="token.attrs" class="renderer-thead">
    <slot />
  </thead>
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererThead',
})
</script>

<style lang="scss" scoped>
.renderer-thead {
  background-color: #f2f2f2;
}
</style>
