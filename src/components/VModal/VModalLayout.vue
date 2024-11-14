<script lang="ts" setup>
import VButton from 'UiKit/components/VButton/VButton.vue';
import VSvgIcon from 'UiKit/components/VSvgIcon/VSvgIcon.vue';

defineProps({
  title: String,
  titleBold: Boolean,
  titleLeft: Boolean,
  subtitle: String,
  headerLined: Boolean,
  fullWidthHeader: Boolean,
  circle: Boolean,
  dark: Boolean,
  footerUp: Boolean,
  footerLined: Boolean,
  contentNoPadding: Boolean,
  closable: {
    type: Boolean,
    default: true,
  },
  mobileFullScreen: {
    type: Boolean,
    default: true,
  },
  fullScreen: Boolean,
});

defineEmits(['close']);
</script>

<template>
  <div
    :class="[{
      'is-circle': circle,
      'is-dark': dark,
      'is-mobile-full-screen': mobileFullScreen,
      'is--full-screen': fullScreen,
    }, $attrs.class]"
    :style="$attrs.style"
    class="VModalLayout v-modal-layout"
  >
    <VButton
      v-if="closable"
      size="large"
      variant="link"
      icon-only
      class="v-modal-layout__close"
      data-testid="close-button"
      @click="$emit('close')"
    >
      <VSvgIcon
        name="close"
        class="v-modal-layout__close-icon"
        @click="$emit('close')"
      />
    </VButton>
    <header
      :class="{
        'is-lined': headerLined,
        'is-full-width': fullWidthHeader,
        'is-left': titleLeft,
      }"
      class="v-modal-layout__header"
    >
      <slot name="prepend-header" />
      <div
        v-if="circle"
        class="v-modal-layout__circle"
      />
      <slot name="header">
        <div class="v-modal-layout__header-inner">
          <h3
            v-if="title"
            :class="{ 'is-bold': titleBold }"
            class="v-modal-layout__title"
            data-testid="modal-title"
            v-text="title"
          />
          <h4
            v-if="subtitle"
            class="v-modal-layout__subtitle"
            data-testid="modal-subtitle"
            v-text="subtitle"
          />
        </div>
      </slot>
    </header>

    <main
      class="v-modal-layout__main"
      :class="{
        'no-grow': footerUp,
        'no-padding': contentNoPadding,
      }"
    >
      <slot>
        the content
      </slot>
    </main>

    <footer
      :class="{
        'is-lined': footerLined,
        'is-lined-mobile': headerLined,
      }"
      class="v-modal-layout__footer"
    >
      <slot name="footer" />
    </footer>
  </div>
</template>

<style lang="sass">
@use 'UiKit/styles/_colors.sass' as colors
.v-modal-layout
  $root: &

  display: flex
  flex-direction: column
  padding-bottom: 15px
  color: colors.$black
  background: colors.$white
  position: relative

  &.is--full-screen
    width: 100%
    min-height: 100%

  &__header
    display: flex
    padding: 8px 8px 0px 8px
    align-items: flex-start
    gap: 10px
    width: 100%
    justify-content: space-between

    &.is-lined
      border-bottom-color: colors.$gray-10

    &.is-full-width
      margin: 0

    &:not(.is-left)
      text-align: center

  &__close
    position: absolute !important
    right: 8px
    top: 8px

  @media screen and (max-width: 767px)
    &.is-mobile-full-screen
      width: 100vw
      height: 100%
      min-height: calc(var(--vh, 1vh) * 100)

    &:not(.is-mobile-full-screen)
      width: calc(100% - 32px)
      margin: 0 auto
      border-radius: 40px

    &__header
      #{$root}.is-mobile-full-screen &
        padding: 30px 15px 20px 15px

      #{$root}:not(.is-mobile-full-screen) &
        padding: 30px 15px 0 15px

      &.is-full-width
        padding: 30px 0 20px 0
        margin-top: 50px

    &__main
      padding: 10px 15px 0 15px

    &__footer
      padding: 20px 15px 10px 15px

  @media screen and (min-width: 767px)
    width: 500px
    border-radius: 2px

    &__header
      display: flex
      padding: 8px 8px 0px 8px
      align-items: flex-start
      gap: 10px
      align-self: stretch

    &__main
      padding: 0 30px

    &__footer
      padding: 10px 0
      margin: 0 30px

    &.is-circle
      background: transparent

      &::before
        position: absolute
        top: 95px
        left: 0
        z-index: 1
        width: 100%
        height: calc(100% - 95px)
        content: ""
        background: colors.$white
        border-bottom-right-radius: 37px
        border-bottom-left-radius: 37px

      #{$root}__main,
      #{$root}__footer
        position: relative
        z-index: 2

      #{$root}__close
        z-index: 2
        display: none

        @media screen and (max-width: 767px)
          display: block

    #{$root}__circle
      position: absolute
      top: 0
      left: 0
      z-index: 1
      width: 500px
      height: 95px
      margin: 0 auto
      overflow: hidden
      border-top-left-radius: 37px
      border-top-right-radius: 37px

      &::before
        position: absolute
        top: -50px
        left: 198px
        z-index: -1
        width: 105px
        height: 105px
        content: ""
        border-radius: 50%
        box-shadow: 0 0 0 9999px colors.$white

      &::after
        position: absolute
        top: 0
        left: 0
        z-index: -1
        width: 100%
        height: 100%
        content: ""

  &__header-inner
    width: 100%

  &__footer
    border-top: 1px solid transparent

    &.is-lined
      border-top-color: #1a327c

    @media screen and (max-width: 767px)
      &.is-lined-mobile
        border-top-color: colors.$gray-10

  &__main
    display: flex
    flex-direction: column

    &:not(.no-grow)
      flex-grow: 1

    &.no-padding
      padding: 0

  &__title
    font-size: 24px
    font-weight: 800
    line-height: 34px

    &.is-bold
      font-size: 25px
      font-weight: 700

  &__subtitle
    margin-bottom: 0
    font-size: 14px
    font-weight: 500
    color: #798dca

    @media screen and (min-width: 767px)
      font-size: 16px

  &__default-button
    display: block
    margin-top: 1rem

  &.is-dark
    color: #fff
    background: linear-gradient(180deg, #13296d 0%, rgba(19, 41, 109, 1) 100%)

    @media screen and (min-width: 767px)
      border-radius: 37px
  &__close-icon
      width: 20px
</style>
