<template>
  <td v-bind="token.attrs" class="renderer-th">
    <slot />
  </td>
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererTh',
})
</script>

<style lang="scss" scoped>
@import '../styles/mixins';

.renderer-th {
  padding: 6px 13px;
  margin: 0;
  font-weight: bold;
  text-align: left;
  border: 1px solid #ddd;
  border-bottom: 0;
}
</style>
