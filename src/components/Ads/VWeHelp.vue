<script setup lang="ts">
</script>

<template>
  <section class="WeHelp we-help is--background-black is--paddings is--margin-top-130 is--color-white">
    <div class="is--container we-help__container">
      <div class="is--two-col-grid is--align-center is--gap-80">
        <slot />
      </div>
      <img
        loading="lazy"
        src="/images/gopher.svg"
        alt="Gopher"
        class="we-help__background"
      />
    </div>
  </section>
</template>

<style lang="sass">
@use 'UiKit/styles/_colors.sass' as *
@use 'UiKit/styles/_mixins.sass' as *
@use 'UiKit/styles/_variables.sass' as *

.we-help
  position: relative
  overflow: hidden

  h5
    // copy of .is--uppercase
    // copy of .is--color-primary
    text-transform: uppercase
    color: $primary

  h2
    // copy of .is--margin-top-12
    margin-top: 12px

  h4
    // copy of .is--subheading-2
    // copy of .is--margin-top-8
    margin-top: 8px
    @include font(350)
    font-size: 20px
    line-height: 30px
    font-style: normal

  p
    // copy of .is--margin-top-24
    margin-top: 24px

  &__right
    padding: 20px
    border-radius: 2px
    background-color: $gray-90
    @media screen and (max-width: $tablet)
      margin-top: 40px

  &__container
    position: relative

  &__background
    position: absolute
    left: 21%
    bottom: -130px
    width: 27%
    @media screen and (max-width: $tablet)
      bottom: -100px
      max-width: 100%
      width: 40%

  @media screen and (max-width: $tablet)
    .checkmarked-item__icon-wrap
      margin-top: 10px !important
</style>
