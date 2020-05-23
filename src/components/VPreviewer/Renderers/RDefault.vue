<template>
  <component :is="token.tag" v-bind="token.attrs">
    <slot />
  </component>
</template>

<script lang="ts">
import { RendererBase } from './utils'

export default RendererBase.extend({
  name: 'RendererDefault',

  mounted() {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`unhandled md type: ${this.token.type}`)
    }
  },
})
</script>
