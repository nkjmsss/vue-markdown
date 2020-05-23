<template>
  <router-link v-if="internal" v-bind="token.attrs" :to="href" class="renderer-link">
    <slot />
  </router-link>

  <a v-else v-bind="token.attrs" :href="href" class="renderer-link">
    <slot />
  </a>
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererLink',

  computed: {
    internal(): boolean {
      // /で始まるかつ、2個以上/が続かない
      return /^(?!\/{2,})\/(.*)/.test(this.href)
    },

    attrs(): Record<string, string | undefined> {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { href, ...rest } = this.token.attrs
      return rest
    },

    href(): string {
      return this.token.attrs.href || '/'
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../styles/mixins';

.renderer-link {
  font-weight: 600;
  color: colors(primary);
}
</style>
