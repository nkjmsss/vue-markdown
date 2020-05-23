import { Token } from '@/lib/markdown'
import Vue, { PropType } from 'vue'

export const RendererBase = Vue.extend({
  props: {
    token: {
      type: Object as PropType<Token>,
      required: true,
    },

    editable: {
      type: Boolean,
      default: false,
    },
  },
})
