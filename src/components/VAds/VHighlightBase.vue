<script setup lang="ts">
import VSection from 'UiKit/components/VSection/VSection.vue';

withDefaults(defineProps<{
  fullWidth?: boolean;
  color?: 'default' | 'black';
  background?: 'cells';
}>(), {
  color: 'default',
});
</script>

<template>
  <VSection
    class="VHighlightBase v-highlight-base"
    :class="[{ 'is--full-width': fullWidth }, `is--color-${color}`, `is--background-${background}`]"
  >
    <div class="v-highlight-base__container with-default-distance">
      <slot />
    </div>
  </VSection>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;
@use 'UiKit/styles/_variables.scss' as *;

.v-highlight-base {
  $root: &;

  --highlight-base-color: #{$gradient-blue};

  width: 100%;

  &.is--color-black {
    --highlight-base-color: #{$black};
  }

  &.is--full-width {
    padding: 130px 0;
    background: var(--highlight-base-color);

    @media screen and (max-width: $tablet) {
      padding: 100px 0;
    }
  }

  &.is--background-cells {
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 462px;
      height: 501px;
      aspect-ratio: 154/167;
      background-size: contain;
      background-repeat: no-repeat;
      z-index: 1;
      pointer-events: none;

      @media screen and (max-width: $tablet) {
        width: 375px;
        height: 407px;
        aspect-ratio: 375/407;
      }
    }

    &::before {
      background-image: url('UiKit/assets/images/backgrounds/cell-bottom-left.svg');
      background-position: left bottom;
      bottom: 0;
      left: 0;
    }

    &::after {
      background-image: url('UiKit/assets/images/backgrounds/cell-top-right.svg');
      background-position: right top;
      top: 0;
      right: 0;
    }

    &__container {
      position: relative;
      z-index: 1;
    }
  }

  &:not(.is--full-width) &__container{
    padding: 130px;
    background: var(--highlight-base-color);

    @media screen and (max-width: $tablet) {
      padding: 40px;
    }
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
    position: relative;
    color: $white;
    // Reserve space to prevent layout shift during async component hydration
    min-height: 245px;
    
    @media screen and (max-width: $tablet) {
      min-height: 250px;
    }
  }


  p {
    color: inherit;
    opacity: 0.9;
  }

  h1, h2, h3, h4, h5, h6 {
    color: inherit;

    a {
      text-decoration: none;
      color: inherit;
    }
  }

  a {
    color: inherit;
  }

  ul {
    color: inherit;
    margin: 32px 0 0;
  }

  li {
    color: inherit;
    // border-bottom: 1px solid $white !important;
  }

  .is--cols-auto-left{
      @media screen and (width < $desktop) {
        display: flex;
        flex-direction: column;
      }
  }

  .v-list-pointers {
    ul {
      @media screen and (width < $desktop) {
        max-width: 100%;
      }
    }
  }
}
</style>


