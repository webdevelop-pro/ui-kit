<script setup lang="ts">
import { computed } from 'vue';
import BaseTimelineCircle from './BaseTimelineCircle.vue';

interface Props {
  type?: 'active' | 'complete' | 'not-complete'
  variant?: 'primary' | 'inner' | 'highlight'
  circleType?: 'active' | 'not-complete' | 'complete' | 'highlight'
  line?: 'regular' | 'hidden'
  title?: string
  duration?: string
  active?: boolean
  to?: [Boolean, Object],
}

const props = withDefaults(defineProps<Props>(), {
  type: 'active',
  variant: 'primary',
  circleType: 'active',
  line: 'regular',
})

const btnClasses = computed(() => {
  let classes = `is--type-${props.type} `;
  classes += `is--variant-${props.variant} `;
  classes += `is--circle-type-${props.circleType} `;
  classes += `is--line-${props.line} `;
  return classes;
});
</script>

<template>
  <div
    class="BaseTimelineItem base-timeline-item"
    :class="[btnClasses, { 'is--title': title }]"
  >
    <BaseTimelineCircle
      :type="circleType"
      class="base-timeline-item__circle"
    />

    <div
      v-if="title"
      class="base-timeline-item__step-wrap"
    >
      <component
        :is="to ? 'router-link' : 'h6'"
        :to="to"
        class="base-timeline-item__step is--h6__title"
      >
        {{ title }}
      </component>
    </div>

    <div
      v-if="$slots.default"
      class="items base-timeline-item__items"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import 'index.sass'
.base-timeline-item
  --top: 42px
  --normal-circle-height: 24px
  --highlight-circle-bigger: 8px
  --highlight-circle-height: calc(var(--normal-circle-height) + var(--highlight-circle-bigger))

  $root: &

  padding-bottom: 30px
  position: relative
  left: 0
  top: 0
  height: 100%
  @media screen and (max-width: 767px)
    padding-bottom: 35px
    margin-left: 8px

  &::before
    content: ""
    position: absolute
    top: calc(var(--top) + var(--normal-circle-height))
    left: 11px
    z-index: 1
    width: 2px
    height: calc(100% - var(--top) - var(--normal-circle-height) - (2 * var(--highlight-circle-bigger)))
    background-color: $gray-30

  &::after
    content: ""
    position: absolute
    top: -16px // -(2 * var(--highlight-circle-bigger))
    left: 11px
    z-index: 1
    width: 2px
    height: calc(var(--top) + (2 * var(--highlight-circle-bigger)))
    background-color: $gray-30

  &.is--line-regular:last-child
    &::before
      display: none
  &.is--line-hidden:last-child
    &::before
      background: linear-gradient($gray-30, rgba($gray-30, 0)) !important
  &:first-of-type
    &::after
      display: none

  &__items
    margin-left: 50px

  &__step-wrap
    display: flex
    flex-direction: row
    align-items: center
    position: relative
    margin-bottom: 16px
    margin-left: 50px

  &__step
    text-transform: uppercase
    color: $primary

  &__circle
    top: var(--top)
    position: absolute

  &.is--circle-type-highlight
    &::before
      top: calc(var(--top) + var(--highlight-circle-height))
      height: calc(100% - var(--top) - var(--highlight-circle-height) - var(--highlight-circle-bigger))
    &::after
      height: calc(var(--top) + var(--highlight-circle-bigger))

  &.is--title
    &::before
      top: var(--normal-circle-height)
      height: calc(100% - var(--normal-circle-height) - var(--highlight-circle-bigger))
    &::after
      height: calc(2 * var(--highlight-circle-bigger))
    #{$root}__circle
      top: 0
  
  &.is--title.is--circle-type-highlight
    &::before
      top: var(--highlight-circle-height)
      height: calc(100% - var(--highlight-circle-height))
    &::after
      height: var(--highlight-circle-bigger)
</style>
