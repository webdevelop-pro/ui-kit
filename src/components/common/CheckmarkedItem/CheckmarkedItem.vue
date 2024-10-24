<script setup lang="ts">
import { BaseSvgIcon } from 'UiKit/components/BaseSvgIcon'
import BaseTooltip from 'UiKit/components/BaseTooltip/BaseTooltip.vue';
import { PropType } from 'vue';


export interface ICheckmarkedItem {
  title: string;
  description: string;
}

defineProps({
  title: String,
  description: String,
  darkMode: Boolean,
  icon: String as PropType<'hollow' | 'darkbg'>,
  card: Boolean,
  tooltip: String,
});
</script>

<template>
  <div
    class="CheckmarkedItem checkmarked-item is--no-margin"
    :class="{ 'is--card': card, 'is--dark-mode': darkMode }"
  >
    <BaseTooltip
      :disabled="!tooltip"
      :content-text="tooltip"
      contentWidth="230px"
    >
      <template #activator>
        <div class="checkmarked-item__top">
          <div
            class="checkmarked-item__icon-wrap"
            :class="{'is--icon-hollow': icon === 'hollow', 'is--icon-dark-bg': icon === 'darkbg'  }"
          >
            <BaseSvgIcon
              name="check"
              class="checkmarked-item__icon"
            />
          </div>
          <span class="is--h4__title">
            {{ title }}
          </span>
        </div>
      </template>
    </BaseTooltip>
    <div
      v-if="description"
      class="checkmarked-item__bottom"
    >
      {{ description }}
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import 'index.sass'
.checkmarked-item
  $root: &

  display: flex
  flex-direction: column
  align-items: flex-start
  gap: 8px
  align-self: stretch
  box-shadow: none
  &.is--card
    border-radius: 2px
    border: 1px solid $gray-20
    background: $gray-10
    padding: 20px
  
  &:not(.is--card) + &:not(.is--card)
    padding-top: 20px
    margin-top: 20px
    border-top: 1px solid $gray-40
    &.is--dark-mode
      border-top: 1px solid $gray-60

  &__top
    display: flex
    align-items: center
    gap: 8px
    align-self: stretch

    @media screen and (max-width: 767px)
      align-items: flex-start

  &__icon
    width: 16px
    height: auto
    color: $secondary-dark


  &__icon-wrap
    display: flex
    padding: 4px
    align-items: center
    gap: 10px
    border-radius: 50px
    box-shadow: $box-shadow-small
    background-color: $secondary-light

    &.is--icon-hollow
      background-color: transparent
      border: 1px solid $secondary
      padding: 3px
    &.is--icon-dark-bg
      background-color: $secondary-dark
      #{$root}__icon
        color: $black

  &__bottom
    opacity: 0.9
    color: $gray-80
    #{$root}.is--dark-mode &
      color: $gray-10
</style>
