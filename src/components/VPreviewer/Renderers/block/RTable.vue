<template>
  <div class="renderer-table">
    <table v-bind="token.attrs" class="renderer-table__table">
      <slot />
    </table>
  </div>
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererTable',
})
</script>

<style lang="scss" scoped>
@import '../styles/mixins';

.renderer-table {
  width: 100%;
  overflow: scroll;

  &__table {
    min-width: 100%;
    padding: 0;
    word-break: initial;
    border-spacing: 0;
    border-collapse: collapse;
  }
}
</style>
