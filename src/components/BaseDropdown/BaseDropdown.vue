<script setup lang="ts">
import { ref, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import ArrowDown from './assets/chevron-down.svg';

const props = defineProps({
  hover: Boolean,
})

const isActive = ref(false);
const target = ref(null);

onClickOutside(target, () => {
  isActive.value = false;
})

const onSelectedClick = () => {
  if (!props.hover) isActive.value = !isActive.value
}

watch(() => props.hover, () => {
  if (props.hover) isActive.value = props.hover;
}, { immediate: true });
</script>


<template>
  <div
    class="BaseDropdown base-dropdown"
    :class="{ 'is--hover': hover }"
  >
    <div
      ref="target"
      class="base-dropdown__selected"
      :class="{ 'is-active': isActive }"
      @click="onSelectedClick"
    >
      <slot />

      <img
        v-svg-inline
        :src="ArrowDown"
        class="base-dropdown__selected-arrow"
        alt="dropdown selected arrow"
      >
    </div>
    <Transition name="fade" mode="out-in">
      <div
        v-show="isActive || hover"
        class="base-dropdown__items"
      >
          <slot name="listItem" />
      </div>
    </Transition>
  </div>
</template>


<style lang="sass" scoped>
@import 'index.sass'
.base-dropdown
  $root: &

  position: relative
  width: fit-content
  padding: 13px 0
  cursor: pointer

  &.is--hover
    #{$root}__items
      display: none
      visibility: visible
      opacity: 1
      transition: all 0.3s ease
    &:hover
      #{$root}__items
        display: block
        transition: all 0.3s ease
        visibility: visible
        opacity: 1
      #{$root}__selected-arrow
        transform: rotate(180deg)
  &:not(.is--hover)
    #{$root}__selected
      &.is-active
        #{$root}__selected-arrow
            transform: rotate(180deg)

  &__selected
    position: relative
    display: flex
    align-items: center
    cursor: pointer
    width: fit-content

  &__selected-arrow
    width: 14px
    color: $gray-70
    transition: all 0.3s
    transform-origin: center

  &__items
    position: absolute
    right: 0
    top: 100%
    z-index: 1
    display: flex
    width: 100%
    padding: 8px 0
    flex-direction: column
    align-items: flex-start
    border-radius: 2px
    border: 1px solid $gray-10
    background: $white
    box-shadow: $box-shadow-medium
    transition: all 0.3s ease
</style>
