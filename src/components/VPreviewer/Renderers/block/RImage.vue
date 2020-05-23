<template>
  <img v-bind="token.attrs" class="renderer-image" />
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererImage',
})
</script>

<style lang="scss" scoped>
.renderer-image {
  display: block;
  width: 80%;
  max-width: 600px;
  margin: 10px auto;
}
</style>
