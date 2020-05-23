<template>
  <ul class="renderer-bullet-list" v-bind="token.attrs">
    <slot />
  </ul>
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererBulletList',
})
</script>

<style lang="scss" scoped>
.renderer-bullet-list {
  padding-left: 1.5em;
}
</style>
