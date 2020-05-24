<template>
  <div class="home">
    <div class="editor-wrap">
      <v-editor v-model="value" />
    </div>
  </div>
</template>

<script lang="ts">
import { VEditor } from '@/components'
import Vue from 'vue'
import sample from '@/assets/sample.md'

export default Vue.extend({
  name: 'Home',

  components: {
    VEditor,
  },

  data: () => ({
    value: sample,
  }),
})
</script>

<style lang="scss" scoped>
.editor-wrap {
  height: 90vh;
}
</style>
