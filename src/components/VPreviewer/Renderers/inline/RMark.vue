<template>
  <mark v-bind="token.attrs" class="renderer-mark">
    <slot />
  </mark>
</template>

<script lang="ts">
import { Token } from '@/lib/markdown'
import Vue, { PropType } from 'vue'

export default Vue.extend({
  name: 'RendererMark',

  props: {
    token: {
      type: Object as PropType<Token>,
      required: true,
    },
  },
})
</script>
