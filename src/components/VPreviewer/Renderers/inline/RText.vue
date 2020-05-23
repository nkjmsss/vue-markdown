<template>
  <span class="renderer-text" v-bind="token.attrs">
    {{ token.content }}
  </span>
</template>

<script lang="ts">
import { Token } from '@/lib/markdown'
import Vue, { PropType } from 'vue'

export default Vue.extend({
  name: 'RendererText',

  props: {
    token: {
      type: Object as PropType<Token>,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.renderer-text {
  word-wrap: break-word;
}
</style>
