<template>
  <em v-bind="token.attrs" class="renderer-em">
    <slot />
  </em>
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererEm',
})
</script>
