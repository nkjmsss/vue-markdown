<template>
  <div class="v-editor" :style="styles">
    <div class="v-editor__input">
      <v-input :value="value" @input="handleInput" />
    </div>

    <v-previewer class="v-editor__output" :value="innerValue" />
  </div>
</template>

<script lang="ts">
import VInput from '@/components/VInput/index.vue'
import VPreviewer from '@/components/VPreviewer/index.vue'
import Vue from 'vue'

export default Vue.extend({
  name: 'VEditor',

  components: {
    VInput,
    VPreviewer,
  },

  props: {
    value: {
      type: String,
      default: '',
    },
    width: {
      type: [String, Number],
      default: '100%',
    },
    height: {
      type: [String, Number],
      default: '100%',
    },
  },

  data: () => ({
    innerValue: '',
  }),

  computed: {
    styles(): Record<string, any> {
      return {
        width: !/^\d+$/.test(String(this.width)) ? this.width : `${this.width}px`,
        height: !/^\d+$/.test(String(this.height)) ? this.height : `${this.height}px`,
      }
    },
  },

  mounted(): void {
    this.innerValue = this.value
  },

  methods: {
    handleInput(v: string) {
      this.innerValue = v
      this.$emit('input', v)
    },
  },
})
</script>

<style lang="scss" scoped>
$border: 1px solid #ccc;

.v-editor {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: $border;

  &__input,
  &__output {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }

  &__input {
    border-right: $border;
  }
}
</style>
