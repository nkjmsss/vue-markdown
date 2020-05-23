<template>
  <component :is="token.tag" v-bind="token.attrs" class="renderer-heading" :class="`renderer-heading--${level}`">
    <slot />
  </component>
</template>

<script lang="ts">
import { Token } from '@/lib/markdown'
import Vue, { PropType } from 'vue'

export default Vue.extend({
  name: 'RendererHeading',

  props: {
    token: {
      type: Object as PropType<Token>,
      required: true,
    },
  },

  computed: {
    level(): number {
      const l = this.token.tag.replace(/h(\d)/, '$1')
      return Number(l)
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../utils/colors';

.renderer-heading {
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-weight: bolder;
  line-height: 1.4;

  &--1 {
    padding-bottom: 0.4rem;
    font-size: 2.2rem;
    line-height: 1.3;
  }

  &--1 + &--2 {
    margin-top: 0;
  }

  &--2 {
    padding: 0.4em 0.8em;
    margin: 3.3em 0 0.8em;
    font-size: 1.5rem;
    line-height: 1.225;
    background-color: rgba(colors(primary), 0.1);
    border-left: 0.2em solid colors(primary);
  }

  &--3 {
    margin: 1.8em 0 0.9em;
    font-size: 1.4rem;
    line-height: 1.43;
    color: colors(primary);
    border-bottom: 2px solid colors(primary);
  }

  &--4 {
    margin: 1.6em 0 1em;
    font-size: 1.2rem;

    &::before {
      display: inline-block;
      width: 0.6em;
      height: 0.6em;
      margin-right: 0.2em;
      line-height: 1em;
      content: '';
      background-color: colors(primary);
      border-radius: 0.15em;
    }
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
