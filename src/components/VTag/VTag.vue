<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  round?: boolean;
  showIcon?: boolean;
  strongText?: boolean;
  whiteTextColor?: boolean;
  background?: string;
  tag?: string;
  size?: 'medium' | 'small';
}>(), {
  background: '#F2F4F5',
  tag: 'div',
  size: 'medium',
});


const tagClasses = computed(() => {
  let classes = `is--size-${props.size} `;
  return classes;
});
</script>

<template>
  <component
    :is="tag"
    class="VTag v-tag"
    :style="{ background: background }"
    :class="[tagClasses, {
      'is--round': round,
      'is--white-text': whiteTextColor,
      'is--strong-text': strongText,
      'is--icon': showIcon,
    }]"
    v-bind="$attrs"
  >
    <div class="v-tag__icon-wrapper">
      <slot name="icon" />
    </div>
    <p class="v-tag__text">
      <slot />
    </p>
  </component>
</template>

<style lang="sass">
@use 'index.sass' as *
.v-tag
  padding: $v-tag-padding
  color: $v-tag-color
  display: flex
  flex-direction: row
  align-items: center
  border-radius: $v-tag-default-border-radius
  font-family: $v-tag-font-family
  text-decoration: none
  $root: &
  &.is--size-small
    padding: $v-tag-small-padding
    color: $v-tag-small-color
    #{$root}__text
      font-weight: $v-tag-small-font-weight
  &.is--round
    border-radius: $v-tag-round-border-radius
  &.is--strong-text
    #{$root}__text
      font-weight: $v-tag-font-weight
  &.is--white-text
    color: $v-tag-white-text-color !important
  &__text
    font-size: $v-tag-font-size
    font-weight: $v-tag-font-weight
    line-height: $v-tag-line-height
  &.is--icon
    padding-left: $v-tag-icon-padding-left
    #{$root}__icon-wrapper
      margin-right: $v-tag-icon-margin-after-icon
      display: flex
      align-items: center
      justify-content: center
  &__icon-wrapper
    width: $v-tag-icon-width
    height: $v-tag-icon-height
    display: none
    :deep(svg)
      width: $v-tag-icon-width
      height: $v-tag-icon-height
    :deep(div)
      display: flex
</style>
