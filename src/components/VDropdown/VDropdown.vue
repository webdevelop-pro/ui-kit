<script setup lang="ts">
import { ref, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import VSvgIcon from 'UiKit/components/VSvgIcon/VSvgIcon.vue';

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
    class="VDropdown v-dropdown"
    :class="{ 'is--hover': hover }"
  >
    <div
      ref="target"
      class="v-dropdown__selected"
      :class="{ 'is-active': isActive }"
      @click="onSelectedClick"
    >
      <slot />

      <VSvgIcon
        name="chevron-down"
        class="v-dropdown__selected-arrow"
      />
    </div>
    <Transition name="fade" mode="out-in">
      <div
        v-show="isActive || hover"
        class="v-dropdown__items"
      >
          <slot name="listItem" />
      </div>
    </Transition>
  </div>
</template>


<style lang="sass">
@use 'index.sass' as *
.v-dropdown
  $root: &

  position: relative
  width: fit-content
  padding: 13px 0
  cursor: pointer

  *
    transition: all 0.3s ease

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
        transform: rotate(0)
  &:not(.is--hover)
    #{$root}__selected
      &.is-active
        #{$root}__selected-arrow
            transform: rotate(0)

  &__selected
    position: relative
    display: flex
    align-items: center
    cursor: pointer
    width: fit-content

  &__selected-arrow
    width: 14px
    color: $v-dropdown-selected-arrow-color
    transition: all 0.3s
    transform-origin: center
    transform: rotate(180deg)

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
    border: 1px solid $v-dropdown-items-border-color
    background: $v-dropdown-item-backgroud
    box-shadow: $v-dropdown-item-box-shadow
    transition: all 0.3s ease
</style>
