<template>
  <p class="renderer-paragraph" v-bind="token.attrs">
    <slot />
  </p>
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererParagraph',
})
</script>

<style lang="scss" scoped>
@import '../styles/mixins';

.renderer-paragraph {
  margin: 0 0 1em;
}
</style>
