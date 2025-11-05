<script lang="ts">
import { PropType } from 'vue';
import VSectionTop from 'UiKit/components/VSectionTop/VSectionTop.vue';
</script>

<script setup lang="ts">
export interface IDevelopmentStagesTop {
  image: string;
  title: string;
  class: string;
  mainUrl?: string;
}

defineProps({
  data: {
    type: Object as PropType<IDevelopmentStagesTop>,
    required: true,
  },
  topic: String,

});

</script>

<template>
  <VSectionTop
    :title="data.title"
    :main-url="data.mainUrl"
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
        max-height: 300px;
        right: 2%;
        bottom: -170px;
      }

      @include media-gt(desktop) {
        max-width: 472px;
        max-height: 450px;
        right: 0;
        bottom: -207px;
      }

      @include media-gt(wide) {
        max-width: 472px;
        max-height: 450px;
        right: 0;
        bottom: -207px;
      }
    }
  }
}
</style>
