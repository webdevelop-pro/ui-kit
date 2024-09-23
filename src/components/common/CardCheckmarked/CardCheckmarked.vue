<script setup lang="ts">
import { BaseSvgIcon } from 'UiKit/components/BaseSvgIcon'


export interface ICardCheckmarked {
  title: string;
  description: string;
}

defineProps({
  title: String,
  description: String,
  noCard: Boolean,
  dark: Boolean,
});
</script>

<template>
  <div
    class="CardCheckmarked card-checkmarked"
    :class="{ 'is--no-card': noCard, 'is--dark': dark }"
  >
    <div class="card-checkmarked__top">
      <div class="card-checkmarked__icon-wrap">
        <BaseSvgIcon
          name="check"
          class="card-checkmarked__icon"
        />
      </div>
      <span class="is--h4__title">
        {{ title }}
      </span>
    </div>
    <div
      v-if="description"
      class="card-checkmarked__bottom"
    >
      {{ description }}
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import 'index.sass'
.card-checkmarked
  $root: &

  display: flex
  flex-direction: column
  align-items: flex-start
  gap: 8px
  align-self: stretch
  &:not(.is--no-card)
    border-radius: 2px
    border: 1px solid $gray-20
    background: $gray-10
    padding: 20px

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

    #{$root}.is--dark &
      background-color: transparent
      border: 1px solid $secondary
      padding: 3px

  &__bottom
    opacity: 0.9
    color: $gray-80
    #{$root}.is--dark &
      color: $gray-10
</style>
