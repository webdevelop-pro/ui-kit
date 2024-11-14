<script setup lang="ts">
import { PropType } from 'vue';
import VButton from 'UiKit/components/VButton/VButton.vue';
import { navigateWithQueryParams } from 'UiKit/helpers/general';


export interface IDevelopmentStagesTop {
  image: string;
  title: string;
  isGetInTouch?: boolean;
  class: string;
}


defineProps({
  data: {
    type: Object as PropType<IDevelopmentStagesTop>,
    required: true,
  },
  topic: String,
});

const onGetStartedClick = (topic: string) => {
  navigateWithQueryParams('/get-started', { topic });
};
</script>

<template>
  <section class="VSectionTopDevelopmentStages development-stages-top">
    <div class="is--container">
      <div class="development-stages-top__container">
        <div class="development-stages-top__content">
          <h1>
            {{ data.title }}
          </h1>
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
          class="development-stages-top__background"
          :class="data.class"
        >
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.development-stages-top {
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

    &.is--development-stages {
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
        bottom: -170px;
      }
      @include media-gt(desktop) {
        max-width: 472px;
        max-height: 450px;
        right: 0;
        bottom: -80%;
      }
      @include media-gt(wide) {
        max-width: 472px;
        max-height: 450px;
        right: 0;
        bottom: -80%;
      }
    }
  }
}
</style>
