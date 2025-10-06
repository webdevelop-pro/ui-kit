<script lang="ts">
import VSectionTop from 'UiKit/components/VSectionTop/VSectionTop.vue';
</script>

<script setup lang="ts">

defineProps({
  title: String,
  text: String,
  subtitle: String,
  image: String,
  class: String,
  topic: String,
  mainUrl: {
    type: String,
    default: '/book-a-call',
  },
  mainText: {
    type: String,
    default: 'Get In Touch',
  },
  classImage: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <VSectionTop
    :title="title"
    :subtitle="subtitle"
    :text="text"
    :main-url="mainUrl"
    :main-text="mainText"
    class="VSectionTopDevelopment development-top"
    :class="class"
  >
    <template #right>
      <img
        loading="lazy"
        :src="image"
        alt="Products top background"
        class="development-top__background"
        :class="classImage"
      >
    </template>
  </VSectionTop>
</template>

<style lang="scss">
.development-top {
  $root: &;

  &__background {
    max-width: 472px;
    max-height: 450px;
    width: auto;
    height: auto;
    position: absolute;
    z-index: 1;

    &.is--process {
      @include media-lte(tablet) {
        max-width: 190.27px;
        max-height: 180px;
        left: 50%;
        bottom: -180px;
        transform: translateX(-50%);
      }

      @include media-gt(tablet) {
        max-width: 372px;
        max-height: 350px;
        right: 2%;
        bottom: -190px;
      }

      @include media-gt(desktop) {
        max-width: 472px;
        max-height: 450px;
        right: 0;
        bottom: -55%;
      }

      @include media-gt(wide) {
        max-width: 472px;
        max-height: 450px;
        right: -95px;
        bottom: -55%;
      }
    }

    &.is--security {
      @include media-gt(wide) {
        max-width: 472px;
        max-height: 450px;
        right: 15px;
        bottom: -42%;
      }

      @include media-gt(desktop) {
        max-width: 472px;
        max-height: 450px;
        right: 0;
        bottom: -42%;
      }

      @include media-lte(desktop) {
        max-width: 190.27px;
        max-height: 180px;
        left: 50%;
        bottom: -120px;
        transform: translateX(-50%);
      }

      @include media-lte(tablet) {
        max-width: 190.27px;
        max-height: 180px;
        left: 50%;
        bottom: -160px;
        transform: translateX(-50%);
      }
    }

    &.is--insightful {
      @include media-lte(tablet) {
        max-width: 190.27px;
        max-height: 180px;
        left: 50%;
        bottom: -150px;
        transform: translateX(-50%);
      }

      @include media-gt(tablet) {
        max-width: 372px;
        max-height: 350px;
        right: 25px;
        bottom: -150px;
      }

      @include media-gt(desktop) {
        max-width: 472px;
        max-height: 450px;
        right: 0;
        bottom: -145px;
      }

      @include media-gt(wide) {
        max-width: 472px;
        max-height: 450px;
        right: -105px;
        bottom: -145px;
      }
    }
  }
}
</style>
