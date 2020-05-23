<template>
  <code v-bind="token.attrs" class="renderer-code">{{ token.content }}</code>
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererCode',
})
</script>

<style lang="scss" scoped>
@import '../styles/mixins';

.renderer-code {
  padding: (3em/16) (5em/16);
  color: colors(secondary);
  white-space: nowrap;
  background-color: #f8f8f8;
  border-radius: 2px;
}
</style>
