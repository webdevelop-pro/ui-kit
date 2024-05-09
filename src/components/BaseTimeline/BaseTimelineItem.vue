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
      class="base-timeline-item__step"
    >
      <component
        :is="to ? 'router-link' : 'h6'"
        :to="to"
        class="step"
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
    top: calc(var(--top) + 24px)
    left: 11px
    z-index: 1
    width: 2px
    height: calc(100% - 24px)
    background-color: $gray-30

  &.is--line-regular:last-child
    &::before
      display: none
  &.is--line-hidden:last-child
    &::before
      background: linear-gradient($gray-30, rgba($gray-30, 0)) !important

  &__items
    margin-left: 50px

  &__step
    display: flex
    flex-direction: row
    align-items: center
    position: relative
    // margin-bottom: 15px
    .step
      font-weight: 800
      font-size: 14px
      line-height: 19px
      letter-spacing: 2.5px
      text-transform: uppercase
      color: $black

    a.step
      &:hover
        color: $primary

  &__circle
    top: var(--top)
    position: absolute

  &.is--circle-type-highlight
    &::before
      top: calc(var(--top) + 32px)
      height: calc(100% - 32px)
</style>
