<template>
  <tr v-bind="token.attrs" class="renderer-tr">
    <slot />
  </tr>
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererTr',
})
</script>

<style lang="scss" scoped>
@import '../styles/mixins';

.renderer-tr {
  border-top: 1px solid lighten(colors(primary), 40%);
}
</style>
