<script setup lang="ts">
import { computed } from 'vue';
import VTimelineCircle from './VTimelineCircle.vue';

interface Props {
  type?: 'active' | 'complete' | 'not-complete';
  variant?: 'primary' | 'inner' | 'highlight' | 'inner-highlight';
  title?: string;
  duration?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'active',
  variant: 'primary',
});

const btnClasses = computed(() => {
  let classes = `is--type-${props.type} `;
  classes += `is--variant-${props.variant} `;
  return classes;
});
</script>

<template>
  <div
    class="VTimelineCard v-timeline-card is--card is--body"
    :class="[btnClasses]"
  >
    <div
      v-if="title"
      class="v-timeline-card__header"
    >
      <VTimelineCircle
        v-if="(variant === 'inner') || (variant === 'inner-highlight')"
        :type="(variant === 'inner') ? 'inner' : 'inner-highlight'"
        class="v-timeline-card__circle"
      />

      <h4 class="v-timeline-card__title">
        {{ title }}
      </h4>

      <div
        v-if="duration"
        class="v-timeline-card__duration"
      >
        <span class="v-timeline-card__duration-title is--small">
          Duration:
          <span class="v-timeline-card__duration-text is--h6__title">
            {{ duration }}
          </span>
        </span>
      </div>
    </div>
    <slot />
  </div>
</template>

<style lang="sass">
@use 'UiKit/styles/_colors.sass' as colors
@use 'UiKit/styles/_variables.sass' as variables
.v-timeline-card
  $root: &

  flex-direction: column
  padding: 40px !important
  position: relative
  color: colors.$gray-80

  &__duration-title
    color: colors.$black
  &__duration-text
    color: colors.$primary

  &__circle
    position: absolute
    left: 16px
    top: 50px
    @media screen and (max-width: 767px)
      left: 10px

  &__header
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    margin-bottom: 10px
    padding-bottom: 15px
    border-bottom: 1px dashed rgba(51,51,51,.1)
    @media screen and (max-width: 767px)
      flex-direction: column
      justify-content: flex-start
      align-items: flex-start

  &__title
    margin-top: 0
    color: colors.$black
    @media screen and (max-width: 767px)
      margin-bottom: 10px

  &.is--variant-inner
    margin-bottom: 32px
    color: colors.$gray-80
    &::before // inner lines between cards
      content: ""
      position: absolute
      left: 20px
      bottom: -32px
      width: 2px
      height: 32px
      background-color: colors.$gray-30
      @media screen and (max-width: 767px)
        left: 15px

    &:last-child
      margin-bottom: 0
      &::before
        display: none

  &.is--variant-inner-highlight
    background-color: colors.$primary-dark
    color: colors.$gray-10

    &::before // inner lines between cards
      content: ""
      position: absolute
      left: 20px
      bottom: -32px
      width: 2px
      height: 32px
      background-color: colors.$gray-30
      @media screen and (max-width: 767px)
        left: 15px

    #{$root}__title
      color: colors.$white

    p
      color: colors.$white

    #{$root}__duration-title,
    #{$root}__duration-text
      color: colors.$white

    #{$root}__header
      border-color: colors.$white

    &:last-child
      margin-bottom: 0
      &::before
        display: none

  &.is--variant-highlight
    background-color: colors.$primary-dark
    color: colors.$gray-10

    #{$root}__title
      color: colors.$gray-10

    p
      color: colors.$white

    #{$root}__duration-title,
    #{$root}__duration-text
      color: colors.$white

    #{$root}__header
      border-color: colors.$white

  &.is--type-not-complete
    opacity: 0.3
  &.is--type-complete
    background-color: colors.$gray-10
    border: 1px solid colors.$gray-20
    box-shadow: variables.$box-shadow-small
</style>
