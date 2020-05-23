<template>
  <component :is="token.tag" v-bind="token.attrs" class="renderer-heading" :class="`renderer-heading--${level}`">
    <slot />
  </component>
</template>

<script lang="ts">
import { RendererBase } from '../utils'

export default RendererBase.extend({
  name: 'RendererHeading',

  computed: {
    level(): number {
      const l = this.token.tag.replace(/h(\d)/, '$1')
      return Number(l)
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../styles/mixins';

.renderer-heading {
  position: relative;
  font-weight: 600;
  color: colors(text);

  & + & {
    margin-top: 0;
  }

  &--1 {
    margin: 0 0 1em;
    font-size: 2rem;
  }

  &--2 {
    padding-bottom: 0.7em;
    margin: 45px 0 0.8em;
    font-size: 1.5rem;
    border-bottom: 1px solid #ddd;
  }

  &--3 {
    margin: 52px 0 1.2em;
    font-size: 1.4rem;
  }

  &--4 {
    margin: 1.6em 0 1em;
    font-size: 1.2rem;
  }

  &--5 {
    font-size: 1rem;
  }

  &--6 {
    font-size: 1rem;
    color: colors(gray);
  }
}
</style>
