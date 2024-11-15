<script setup lang="ts">
import VButton from 'UiKit/components/VButton/VButton.vue';
import imageBg from './illustration-404.svg?url';
</script>


<template v-once>
  <div class="ViewErrorNotFound404 errors-404">
    <div class="is--container errors-404__container">
      <div class="errors-404__content">
        <h1
          class="errors-404__title"
        >
          Ooops.. Looks like you got lost
        </h1>
        <p class="errors-404__description is--subheading-1">
          It seems like you've encountered a broken link or perhaps there was a small typo in the
          address bar. Let's start fresh by navigating back to the Homepage.
        </p>
        <VButton
          tag="a"
          href="/"
          size="large"
          class="errors-404__btn"
        >
          Back to Homepage
        </VButton>
      </div>
      <img
        loading="lazy"
        :src="imageBg"
        alt="Products top background"
        class="errors-404__background is--no-margin"
      >
    </div>
  </div>
</template>

<style lang="scss">
.errors-404 {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: $white;
  min-height: 100vh;
  padding: 190px 0 140px;
  @include media-lt(desktop) {
    padding: 120px 0 110px;
  }

  &__content {
    width: 100%;
    color: $black;
    max-width: 457px;
    flex-shrink: 0;
  }

  &__background {
    max-width: 698.181px;
    max-height: 357.305px;
    width: 100%;
    height: auto;

    @include media-lte(desktop) {
      width: 100%;
      max-width: 100%;
      margin-top: 60px;
    }

  }

  &__container {
    display: flex;
    position: relative;
    justify-content: space-between;
    @include media-lte(desktop) {
      flex-direction: column;
    }
  }
}

</style>
