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
      class="base-timeline-circle__icon"
    />
  </div>
</template>

<style lang="sass" scoped>
@import 'index.sass'
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
    border-color: $primary

  &.is--type-inner-highlight
    width: 9px
    height: 9px
    border-width: 3px
    border-color: $white

  &.is--type-active
    width: 24px
    height: 24px
    border-width: 5px
    border-color: $primary
  
  &.is--type-not-complete
    width: 24px
    height: 24px
    border-width: 5px
    border-color: $gray-30
  
  &.is--type-complete
    width: 24px
    height: 24px
    border-color: $primary
    background-color: $primary

  &.is--type-highlight
    width: 24px
    height: 24px
    border-width: 5px
    border-color: $primary

    &::before
      content: ''
      width: 40px
      height: 40px
      border: 1px solid $primary
      position: absolute
      border-radius: 100%
</style>
