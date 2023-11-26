<script lang="ts" setup>
import { withDefaults, defineAsyncComponent } from 'vue';
import {
  VueCollapsiblePanel,
} from '@dafcoe/vue-collapsible-panel';

withDefaults(defineProps<{
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
}>(), {
  size: 'small',
  color: 'primary',
  expanded: false,
});

</script>

<template>
  <VueCollapsiblePanel
    class="BaseAccordionItem base-accordion-item"
    :class="[`is--${size}`, `is--${color}`]"
    :expanded="expanded"
  >
    <template #title>
      <component
        :is="size === 'large' ? 'h4' : 'p'"
        class="base-accordion-item__title-text"
        :class="[`is--${size}`, `is--${color}`]"
      >
        <slot name="title" />
      </component>
    </template>
    <template #icon>
      <!-- eslint-disable vue/no-v-html -->
      <span
        class="base-accordion-item__open-close-icon"
        :class="[`is--${size}`, `is--${color}`]"
      >
		    <svg width="20" height="20" viewBox="0 0 20 20" fill="#48535C" xmlns="http://www.w3.org/2000/svg">
			    <g id="Property 1=20">
				    <path id="Vector" d="M15.2057 10L14.3229 10.8828L6.82294 18.3828L5.93622 19.2695L4.16669 17.5L5.0495 16.6172L11.6667 10L5.05341 3.38281L4.16669 2.5L5.93622 0.730469L6.81903 1.61328L14.319 9.11328L15.2057 10Z" />
			    </g>
		    </svg>
      </span>
    </template>
    <template #content>
      <p
        class="base-accordion-item__content-text"
        :class="[`is--${size}`, `is--${color}`]"
      >
        <slot name="content" />
      </p>
    </template>
  </VueCollapsiblePanel>
</template>

<style lang="sass" scoped>
@import 'index.sass'

.base-accordion-item
  border-top: solid 1px $border-color
  --base-accordion-item--height: 100%
  &:last-child
    border-bottom: solid 1px $gray-30
  &.is--white
    border-color: $border-color-white
  :deep(.vcp__header)
    display: flex
    align-items: center
    justify-content: space-between
    padding-right: 16px
    cursor: pointer
  &.vcp--expanded
    .base-accordion-item__open-close-icon
      :deep(svg)
        transform: rotate(270deg)
        +mt(.2s)
    :deep(.vcp__body)
      height: 0
  &__title-text
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
    padding: 8px 16px 28px 16px
    height: var(--base-accordion-item--height)
    &.is--small
      font-size: 14px
      line-height: 19.6px
    &.is--large
      padding-bottom: 36px
    &.is--white
      color: $white-color
      :deep(a)
        color: $white-link-color
        +font(400)
        border-bottom: solid 1px $white-link-color
        &:hover
          +mt(.3s)
          border-bottom: solid 1px transparent
          color: $white-link-color
    :deep(a)
      position: relative
      display: inline
      z-index: 1
      +mt(.3s)
      color: $link-color
      +font(400)
      border-bottom: solid 1px $link-color
      &:hover
        +mt(.3s)
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
    :deep(svg)
      fill: inherit
      transform: rotate(90deg)
      width: inherit
      height: inherit
      +mt(.2s)
  :deep(.slide-enter-active)
    overflow: hidden
  :deep(.slide-leave-active),
  :deep(.slide-reverse-leave-active)
    transform: translateX(0) !important
    transition: height 0.3s ease
    position: relative !important
    opacity: 1 !important
    overflow: hidden
</style>
