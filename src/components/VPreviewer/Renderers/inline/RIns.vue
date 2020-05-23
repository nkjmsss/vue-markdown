<template>
  <ins v-bind="token.attrs" class="renderer-ins">
    <slot />
  </ins>
</template>

<script lang="ts">
import { Token } from '@/lib/markdown'
import Vue, { PropType } from 'vue'

export default Vue.extend({
  name: 'RendererIns',

  props: {
    token: {
      type: Object as PropType<Token>,
      required: true,
    },
  },
})
</script>
