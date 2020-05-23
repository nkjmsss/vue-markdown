<template>
  <li class="renderer-list-item" v-bind="token.attrs">
    <slot />
  </li>
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererListItem',
})
</script>
