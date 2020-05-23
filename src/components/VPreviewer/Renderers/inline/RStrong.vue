<template>
  <strong v-bind="token.attrs" class="renderer-strong">
    <slot />
  </strong>
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererStrong',
})
</script>
