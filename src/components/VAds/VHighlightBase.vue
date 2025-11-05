<script setup lang="ts">
import VSection from 'UiKit/components/VSection/VSection.vue';
</script>

<template>
  <VSection class="VHighlightBase v-highlight-base">
    <div class="v-highlight-base__container with-default-distance">
      <slot />
    </div>
  </VSection>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;
@use 'UiKit/styles/_variables.scss' as *;

.v-highlight-base {
  width: 100%;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-shrink: 0;
    position: relative;
    padding: 130px;
    background: linear-gradient(107deg, rgba(0, 66, 212, 0.95) -11.26%, rgba(1, 47, 150, 0.95) 8.01%, rgba(1, 33, 102, 0.95) 42.66%, rgba(2, 22, 67, 0.95) 99.14%);
    color: $white;

    @media screen and (max-width: $tablet) {
      padding: 40px;
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

    @media screen and (min-width: $tablet) {
      max-width: 562px;
    }
  }

  li {
    color: inherit;
    border-bottom: 1px solid $white !important;
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


