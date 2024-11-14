<script setup lang="ts">
import { PropType } from 'vue';
import VButton from 'UiKit/components/VButton/VButton.vue';
import { navigateWithQueryParams } from 'UiKit/helpers/general';

defineProps({
  data: {
    type: Object as PropType<IDevelopmentTop>,
    required: true,
  },
  topic: String,
});

const onGetStartedClick = (topic: string) => {
  navigateWithQueryParams('/get-started', { topic });
};
</script>

<template>
  <section class="VSectionTopDevelopment development-top">
    <div class="is--container">
      <div class="development-top__container">
        <div class="development-top__content">
          <h1>
            {{ data.title }}
          </h1>
          <p class="is--subheading-1">
            {{ data.subtitle }}
          </p>
          <p
            v-if="data.description"
            v-html="data.description"
          />
          <VButton
            v-if="data.isGetInTouch"
            icon-placement="right"
            size="large"
            @click="onGetStartedClick(topic)"
          >
            Get In Touch
          </VButton>
        </div>

        <img
          loading="lazy"
          :src="data.image"
          alt="Products top background"
          class="development-top__background"
          :class="data.class"
        >
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.development-top {
  $root: &;

  position: relative;

  &__container {
    position: relative;
    display: flex;
    align-items: center;
    @include media-gt(tablet) {
      justify-content: space-between;
    }
    @include media-lte(tablet) {
      flex-direction: column;
    }
  }

  &__content {
    width: 100%;
    z-index: 2;
    position: relative;
    @include media-gt(tablet) {
      max-width: 653px;
    }
    @include media-lte(tablet) {
      margin-bottom: 60px;
    }
  }

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
      @include media-lte(tablet) {
        max-width: 190.27px;
        max-height: 180px;
        left: 50%;
        bottom: -160px;
        transform: translateX(-50%);
      }
      @include media-gt(tablet) {
        max-width: 372px;
        max-height: 350px;
        right: 2%;
        bottom: -55%;
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
        right: 15px;
        bottom: -55%;
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
