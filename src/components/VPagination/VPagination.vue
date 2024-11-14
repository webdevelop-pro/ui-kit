<script lang="ts" setup>

const props = defineProps<{
  count: number | string;
  offsetFrom: number | string;
  offsetTo: number | string;
  disabledNextButton?: boolean;
  disabledPreviousButton?: boolean;
}>();

defineEmits(['previous', 'next']);
</script>

<template>
  <div class="VPagination v-pagination">
    <p class="v-pagination__count-of-items">
      {{ props.offsetFrom }}-{{ props.offsetTo }} of {{ props.count }} items
    </p>
    <div class="v-pagination__buttons-wrapper">
      <a
        class="v-pagination__button"
        :class="{ 'is--disabled': props.disabledPreviousButton }"
        @click="$emit('previous')"
      >
        <svg
          class="v-pagination__button-icon is--caret-left"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="#12171C"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.54167 5L13.75 10L8.54167 15H7.5V5H8.54167Z" />
        </svg>
      </a>
      <a
        class="v-pagination__button"
        :class="{ 'is--disabled': props.disabledNextButton }"
        @click="$emit('next')"
      >
        <svg
          class="v-pagination__button-icon"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="#12171C"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.54167 5L13.75 10L8.54167 15H7.5V5H8.54167Z" />
        </svg>
      </a>
    </div>
  </div>
</template>

<style lang="sass">
@use 'index.sass' as *
.v-pagination
  display: flex
  width: 100%
  flex-direction: row
  align-items: center
  justify-content: space-between
  border-top: solid 1px $pagination-border-top-color
  padding-left: $pagination-padding-left
  &__count-of-items
    margin-bottom: 0
    font-size: $pagination-count-of-items-font-size
    +font(400)
    line-height: $pagination-count-of-items-line-height
    color: $pagination-count-of-items-color
    @media screen and (max-width: 767px)
      font-size: $pagination-count-of-items-mobile-font-size
      line-height: $pagination-count-of-items-mobile-line-height
  &__buttons-wrapper
    display: flex
    flex-direction: row
  &__button
    width: $pagination-button-width
    height: $pagination-button-height
    display: flex
    align-items: center
    justify-content: center
    border-left: solid 1px $pagination-button-border-left-color
    @media screen and (max-width: 767px)
      width: $pagination-button-mobile-width
      height: $pagination-button-mobile-height
    &.is--disabled
      pointer-events: none
      opacity: .5
    &:hover
      .v-pagination__button-icon
        fill: $pagination-button-icon-fill
        +mt(.3s)
  &__button-icon
    width: 20px
    height: 20px
    fill: $pagination-button-icon-fill
    +mt(.3s)
    &.is--caret-left
      transform: rotate(180deg)
</style>
