<script setup lang="ts">
import { PropType } from 'vue';
import VSectionTop from 'UiKit/components/VSectionTop/VSectionTop.vue';
import { IFrontmatter } from 'UiKit/types/types';
import { filterPages } from 'UiKit/helpers/allData';
import { data as allPages } from '@/store/all.data';


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

const getStarted = filterPages(allPages as IFrontmatter[], 'slug', 'get-started');
</script>

<template>
  <VSectionTop
    :title="data.title"
    :get-in-touch-url="`${getStarted[0].url}?topic=${topic}`"
    class="VSectionTopDevelopmentStages development-stages-top with-default-distance"
  >
    <template #right>
      <img
        loading="lazy"
        :src="data.image"
        alt="Products top background"
        class="development-stages-top__background"
        :class="data.class"
      >
    </template>
  </VSectionTop>
</template>

<style lang="scss">
.development-stages-top {
  $root: &;

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
