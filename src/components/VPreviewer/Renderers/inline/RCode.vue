<template>
  <code v-bind="token.attrs" class="renderer-code">{{ token.content }}</code>
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererCode',
})
</script>
