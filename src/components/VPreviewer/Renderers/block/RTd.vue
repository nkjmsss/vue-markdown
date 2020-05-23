<template>
  <td v-bind="token.attrs" class="renderer-td">
    <slot />
  </td>
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererTd',
})
</script>

<style lang="scss" scoped>
@import '../styles/mixins';

.renderer-td {
  padding: 0.375em 0.75em;
  text-align: left;
  border: 1px solid #ddd;
}
</style>
