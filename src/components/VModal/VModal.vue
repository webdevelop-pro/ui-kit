<template>
  <transition
    name="transition-fade"
    appear
  >
    <div class="VModal v-modal">
      <div
        class="v-modal__backdrop"
        :class="{ 'is-backdrop-close': !noBackdropDismiss }"
        @click="onCloseBackdrop"
      />

      <transition
        name="transition-fade"
        appear
      >
        <div
          v-if="isActive"
          class="v-modal__wrapper"
          :class="{ 'is-maximized': maximized }"
        >
          <div class="v-modal__container">
            <slot>
              the content
            </slot>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts" src="./VModal.component.ts"></script>

<style lang="sass">
.v-modal
  $root: &

  position: fixed
  top: 0
  left: 0
  z-index: 11000
  display: table
  width: 100%
  height: 100%

  &__backdrop
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    background: rgba(18, 22, 31, 0.40)

    &.is-backdrop-close
      cursor: pointer

    .app-modal-root + .app-modal-root &
      background-color: transparent

  &__wrapper
    display: flex
    flex-wrap: wrap
    align-items: center
    justify-content: center
    width: 100vw
    height: calc(var(--vh, 1vh) * 100)
    padding: 50px 0
    overflow: auto

    @media screen and (max-width: 767px)
      padding: 0

    &.is-maximized
      padding: 0
      #{$root}__container
        width: 100%
        height: 100%

  &__container
    position: relative

    @media screen and (max-width: 767px)
      width: 100%
</style>
