<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue';

const props = withDefaults(defineProps<{
  /**
   * by default - small, can be: large | small
   */
  size?: 'large' | 'small';
  /**
   * color of text and lines, by default - primary, can be: primary | white
   */
  color?: 'primary' | 'white';
  /**
   * opened by default if true
   */
  expanded?: boolean;
  /**
   * header background
   */
  transparent?: boolean;
}>(), {
  size: 'small',
  color: 'primary',
  expanded: false,
});

const emit = defineEmits(['update:isOpen']);

const visible = ref(props.expanded || false);

function open() {
  nextTick(() => visible.value = !visible.value);
  emit('update:isOpen', visible.value);
}

watch(() => props.expanded, (val) => {
  visible.value = val;
});

</script>

<template>
  <div
    class="VAccordionItemCustom v-accordion-item-custom is--no-margin"
    :class="[`is--${size}`, `is--${color}`, { 'is--transparent': transparent, 'is--open': visible }]"
    @click="open"
  >
    <component
      :is="size === 'large' ? 'h4' : 'p'"
      class="v-accordion-item-custom__title-text"
      :class="[`is--${size}`, `is--${color}`]"
    >
      <slot name="title" />
      <!-- eslint-disable vue/no-v-html -->
      <span
        class="v-accordion-item-custom__open-close-icon"
        :class="[`is--${size}`, `is--${color}`]"
      >
		    <svg width="20" height="20" viewBox="0 0 20 20" fill="#48535C" xmlns="http://www.w3.org/2000/svg">
			    <g id="Property 1=20">
				    <path id="Vector" d="M15.2057 10L14.3229 10.8828L6.82294 18.3828L5.93622 19.2695L4.16669 17.5L5.0495 16.6172L11.6667 10L5.05341 3.38281L4.16669 2.5L5.93622 0.730469L6.81903 1.61328L14.319 9.11328L15.2057 10Z" />
			    </g>
		    </svg>
      </span>
    </component>

    <p
      class="v-accordion-item-custom__content-text"
      :class="[`is--${size}`, `is--${color}`]"
    >
      <slot name="content" />
    </p>
  </div>
</template>

<style lang="sass">
@use 'index.sass' as *
@use 'UiKit/styles/_mixins.sass' as *
$timing-function: cubic-bezier(.5, .25, 0, 1)
.v-accordion-item-custom
  $root:&

  border-top: solid 1px $border-color
  --v-accordion-item-custom--height: 100%
  position: relative

  &:last-child
    border-bottom: solid 1px $border-color

  &__title-text
    display: flex
    align-items: center
    justify-content: space-between
    cursor: pointer
    width: 100%
    padding: 12px 16px
    margin-bottom: 0
    &.is--small
      font-size: 14px
      line-height: 19.6px
    &.is--large
      padding-top: 20px
      padding-bottom: 20px
    &.is--white
      color: $white-color
  &__content-text
    overflow: hidden
    will-change: height
    transition: all 0.3s ease
    height: 0
    width: 100%
    padding: 0 16px 0 16px
    &.is--small
      font-size: 14px
      line-height: 19.6px
    &.is--white
      color: $white-color
      a
        color: $white-link-color
        @include font(600)
        border-bottom: solid 1px $white-link-color
        &:hover
          @include mt(.3s)
          border-bottom: solid 1px transparent
          color: $white-link-color
    a
      position: relative
      display: inline
      z-index: 1
      @include mt(.3s)
      color: $link-color
      @include font(600)
      border-bottom: solid 1px $link-color
      &:hover
        @include mt(.3s)
        border-bottom: solid 1px transparent
        color: $link-color

  &__open-close-icon
    fill: $open-close-icon-fill
    width: 16px
    height: 16px
    display: flex
    &.is--white
      fill: $white-color
    &.is--large
      width: 20px
      height: 20px
    svg
      fill: inherit
      transform: rotate(90deg)
      width: inherit
      height: inherit
      @include mt(.2s)

  &.is--white
    border-color: $border-color-white
  &.is--open
    #{$root}__open-close-icon
      svg
        transform: rotate(270deg)
        @include mt(.2s)
    #{$root}__content-text
      transition: all 0.3s ease
      height: auto
      padding: 8px 16px 28px 16px
  
  &:not(.is--transparent).is--open
    #{$root}__title-text
      box-shadow: $accordion-item-active-header-box-shadow
      z-index: 1
      position: relative
  &.is--transparent.is--open
    #{$root}__title-text
      background-color: $accordion-item-active-content-background
    #{$root}__content-text
      background-color: $accordion-item-active-content-background
  &.is--transparent
    &:hover
      #{$root}__title-text
        background-color: $accordion-item-active-content-background
</style>
