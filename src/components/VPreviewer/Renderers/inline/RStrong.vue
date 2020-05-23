<template>
  <strong v-bind="token.attrs" class="renderer-strong">
    <slot />
  </strong>
</template>

<script lang="ts">
import { Token } from '@/lib/markdown'
import Vue, { PropType } from 'vue'

export default Vue.extend({
  name: 'RendererStrong',

  props: {
    token: {
      type: Object as PropType<Token>,
      required: true,
    },
  },
})
</script>
