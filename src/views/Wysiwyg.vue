<template>
  <div class="home">
    <div class="editor-wrap">
      <v-previewer v-model="value" editable />
    </div>
  </div>
</template>

<script lang="ts">
import { VPreviewer } from '@/components'
import { sample } from '@/assets/md'
import Vue from 'vue'

export default Vue.extend({
  name: 'Wysiwyg',

  components: {
    VPreviewer,
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
