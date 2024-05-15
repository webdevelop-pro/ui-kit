<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import ArrowDown from './assets/chevron-down.svg';

const isActive = ref(false);
const target = ref(null);

onClickOutside(target, () => {
  isActive.value = false;
})
</script>


<template>
  <div
    class="BaseDropdown base-dropdown"
  >
    <div
      ref="target"
      class="base-dropdown__selected"
      :class="{ 'is-active': isActive }"
      @click="isActive = !isActive"
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
        v-show="isActive"
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

  &__selected
    position: relative
    display: flex
    align-items: center
    cursor: pointer
    width: fit-content

    &.is-active
      .base-dropdown
        &__selected-arrow
          transform: rotate(180deg)

  &__selected-arrow
    width: 14px
    color: $gray-70
    transition: all 0.3s
    transform-origin: center

  &__items
    position: absolute
    right: 0
    top: calc(100% + 13px)
    z-index: 1
    display: flex
    width: 100%
    padding: 8px 0px
    flex-direction: column
    align-items: flex-start
    border-radius: 2px
    background: $white
    box-shadow: $box-shadow-small
</style>
