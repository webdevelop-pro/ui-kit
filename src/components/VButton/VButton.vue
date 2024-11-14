<script lang="ts" setup>
import { computed } from 'vue';
import VSpinner from 'UiKit/components/VSpinner/VSpinner.vue';

interface Props {
    tag?: 'button' | 'a' | 'router-link';
    size?: 'large' | 'medium' | 'small' | 'x-small';
    variant?: 'outlined' | 'link';
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    block?: boolean;
    disabled?: boolean;
    loading?: boolean;
    squared?: boolean;
    pill?: boolean;
    iconOnly?: boolean;
    iconPlacement?: 'none' | 'left' | 'right' | 'both';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  color: 'primary',
  tag: 'button',
  iconPlacement: 'none',
});

const btnClasses = computed(() => {
  let classes = `is--bg-color-${props.color} `;
  classes += `is--size-${props.size} `;
  classes += `is--variant-${props.variant} `;
  classes += `is--icon-placement-${props.iconPlacement} `;
  return classes;
});

</script>

<template>
  <component
    :is="tag"
    class="VButton v-button"
    :class="[btnClasses, {
      'is--block': props.block, 'is--icon-only': iconOnly, 'is--disabled': props.disabled, 'is--squared': squared && !pill, 'is--pill': pill && !squared,
    }]"
    :disabled="loading"
  >
    <span
      class="v-button__content"
    >
      <slot>Button</slot>
    </span>
    <VSpinner
      v-if="loading"
      show
      small
    />
  </component>
</template>

<style lang="sass">
@use 'UiKit/styles/_colors.sass' as colors
@use 'UiKit/styles/_variables.sass' as variables

.v-button
  $root: &

  display: inline-flex
  justify-content: center
  align-items: center
  border: unset
  font-family: 'Avenir'
  line-height: 21px
  font-weight: 700
  height: 40px
  color: colors.$white
  background-color: transparent
  border-radius: 2px
  padding: 0 16px
  font-size: 14px
  cursor: pointer
  position: relative
  transition: all .3s
  box-shadow: variables.$box-shadow-small
  letter-spacing: 0.3px
  text-decoration: none !important
  &:hover
    box-shadow: none
    color: colors.$white

  svg,
  img
    width: 20px
    height: 20px

  &__content
    transition: opacity .3s
    display: flex
    align-items: center
    justify-content: center
    flex-shrink: 0
    width: 100%
  &.is--icon-placement-both,
  &.is--icon-placement-left,
  &.is--icon-placement-right
    #{$root}__content
      gap: 4px
  &.is--icon-placement-none
    svg,
    img
      margin: 0
  &.is--block
    width: 100%
  &.is--squared
    border-radius: 0
  &.is--pill
    border-radius: 30px
  &.is--disabled
    opacity: 0.3
    pointer-events: none
  &.is--size-large
    height: 48px
    padding: 0 20px
    font-size: 16px
    line-height: 26px
  &.is--size-small
    height: 32px
    padding: 0 12px
    font-size: 12px
    svg,
    img
      width: 16px
      height: 16px
  &.is--size-x-small
    height: 26px
    padding: 0 6px
    svg,
    img
      width: 16px
      height: 16px
  &.is--bg-color-primary
    background-color: colors.$primary
    &:hover
      background-color: colors.$primary-dark
  &.is--bg-color-secondary
    background-color: colors.$primary-light
    color: colors.$primary
    &:hover
      background-color: colors.$primary
      color: colors.$white
  &.is--bg-color-success
    background-color: colors.$secondary
    color: colors.$black
    &:hover
      background-color: colors.$secondary-dark
      color: colors.$black
  &.is--bg-color-warning
    background-color: colors.$yellow
    &:hover
      background-color: colors.$yellow-dark
  &.is--bg-color-danger
    background-color: colors.$red
    &:hover
      background-color: colors.$red-dark
  &.is--variant-outlined
    background-color: colors.$white
    border-style: solid
    border-width: 1px
    &.is--bg-color-primary
      border-color: colors.$primary
      color: colors.$primary
      &:hover
        background-color: colors.$primary
        color: colors.$white
    &.is--bg-color-secondary
      border-color: colors.$primary-light
      &:hover
        background-color: colors.$primary-light
        color: colors.$primary
    &.is--bg-color-success
      border-color: colors.$secondary
      &:hover
        background-color: colors.$secondary
    &.is--bg-color-warning
      border-color: colors.$yellow
      color: colors.$yellow
      &:hover
        background-color: colors.$yellow
        color: colors.$white
    &.is--bg-color-danger
      border-color: colors.$red
      color: colors.$red
      &:hover
        background-color: colors.$red
        color: colors.$white
  &.is--variant-link
    background-color: transparent
    box-shadow: none
    &.is--bg-color-primary
      color: colors.$primary
      &:hover
        background-color: colors.$primary-light
    &.is--bg-color-secondary
      color: colors.$primary
      &:hover
        background-color: rgba(colors.$primary-light, 1)
    &.is--bg-color-success
      color: colors.$black
      &:hover
        background-color: rgba(colors.$secondary, 0.1)
    &.is--bg-color-warning
      color: colors.$yellow
      &:hover
        background-color: rgba(colors.$yellow, 0.1)
    &.is--bg-color-danger
      color: colors.$red
      &:hover
        background-color: rgba(colors.$red, 0.1)
  &.is--icon-only
    padding: 9px
    height: 40px
    width: 40px
    &.is--size-large
      height: 48px
      width: 48px
    &.is--size-small
      height: 32px
      width: 32px
      padding: 7px
</style>
