<script setup lang="ts">
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import VSection from 'UiKit/components/VSection/VSection.vue';

</script>

<template>
  <VSection class="WeHelp we-help is--background-black is--paddings is--margin-top-130 is--color-white">
    <div class="is--two-col-grid is--align-items-center is--gap-80">
      <slot />
    </div>
    <div class="we-help__background-wrap">
      <VImage
        loading="lazy"
        src="/images/gopher.svg"
        alt="Gopher"
      />
    </div>
  </VSection>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;
@use 'UiKit/styles/_mixins.scss' as *;
@use 'UiKit/styles/_variables.scss' as *;

.we-help {
  position: relative;
  overflow: hidden;

  h5{
    text-transform: uppercase;
    color: $primary;
  }

  h2 {
    margin-top: 12px;
  }

  h4 {
    margin-top: 8px;

    @include font(350);

    font-size: 20px;
    line-height: 30px;
    font-style: normal;
  }

  p {
    margin-top: 24px;
  }

  &__right {
    padding: 20px;
    border-radius: 2px;
    background-color: $gray-90;

    @media screen and (max-width: $tablet) {
      margin-top: 40px;
    }
  }

  &__background-wrap{
    position: absolute;
    left: 26%;
    bottom: 0;
    width: 318px;

    @media screen and (max-width: $tablet) {
      max-width: 100%;
      width: 40%;
    }
  }

  @media screen and (max-width: $tablet){
    .checkmarked-item__icon-wrap{
      margin-top: 10px !important;
    }
  }
}
</style>
