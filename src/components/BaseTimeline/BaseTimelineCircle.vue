<script setup lang="ts">
import { computed } from 'vue';
import check from './assets/check.svg?url';

interface Props {
  type?: 'active' | 'inner' | 'not-complete' | 'complete' | 'highlight' | 'inner-ighlight'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'active',
})

const btnClasses = computed(() => {
  let classes = `is--type-${props.type} `;
  return classes;
});
</script>

<template>
  <div
    class="BaseTimelineCircle base-timeline-circle"
    :class="[btnClasses]"
  >
    <img
      v-if="type === 'complete'"
      :src="check"
      alt="check icon"
      class="base-timeline-circle__icon is--no-margin"
    />
  </div>
</template>

<style lang="sass" scoped>
@use 'UiKit/styles/_colors.sass' as colors
.base-timeline-circle
  $root: &

  display: flex
  justify-content: center
  align-items: center
  border-style: solid
  gap: 10px
  border-radius: 100%
  z-index: 2

  &.is--type-inner
    width: 9px
    height: 9px
    border-width: 3px
    border-color: colors.$primary

  &.is--type-inner-highlight
    width: 9px
    height: 9px
    border-width: 3px
    border-color: colors.$white

  &.is--type-active
    width: 24px
    height: 24px
    border-width: 5px
    border-color: colors.$primary
  
  &.is--type-not-complete
    width: 24px
    height: 24px
    border-width: 5px
    border-color: colors.$gray-30
  
  &.is--type-complete
    width: 24px
    height: 24px
    border-color: colors.$primary
    background-color: colors.$primary

  &.is--type-highlight
    width: 24px
    height: 24px
    border-width: 5px
    border-color: colors.$primary

    &::before
      content: ''
      width: 40px
      height: 40px
      border: 1px solid colors.$primary
      position: absolute
      border-radius: 100%
</style>
