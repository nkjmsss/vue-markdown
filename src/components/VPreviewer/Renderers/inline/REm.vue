<template>
  <em v-bind="token.attrs" class="renderer-em">
    <slot />
  </em>
</template>

<script lang="ts">
import { Token } from '@/lib/markdown'
import Vue, { PropType } from 'vue'

export default Vue.extend({
  name: 'RendererEm',

  props: {
    token: {
      type: Object as PropType<Token>,
      required: true,
    },
  },
})
</script>
