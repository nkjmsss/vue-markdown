<template>
  <hr v-bind="token.attrs" class="renderer-hr" />
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererHr',
})
</script>

<style lang="scss" scoped>
@import '../styles/mixins';
</style>
