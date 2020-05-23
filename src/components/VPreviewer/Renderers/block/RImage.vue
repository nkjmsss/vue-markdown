<template>
  <img v-bind="token.attrs" class="renderer-image" />
</template>

<script lang="ts">
import { Token } from '@/lib/markdown'
import Vue, { PropType } from 'vue'

export default Vue.extend({
  name: 'RendererImage',

  props: {
    token: {
      type: Object as PropType<Token>,
      required: true,
    },
  },
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
