<template>
  <component :is="token.tag" v-bind="token.attrs">
    <slot />
  </component>
</template>

<script lang="ts">
import { Token } from '@/lib/markdown'
import Vue, { PropType } from 'vue'

export default Vue.extend({
  name: 'RendererDefault',

  props: {
    token: {
      type: Object as PropType<Token>,
      required: true,
    },
  },
})
</script>
