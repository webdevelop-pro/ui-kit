<script setup lang="ts">
import { computed } from 'vue';
import VButton from 'UiKit/components/VButton/VButton.vue';
import VImage from 'UiKit/components/VImage/VImage.vue';
import { filterAndSortByOrderElements } from 'UiKit/helpers/allData';
import { data as allPages } from '@/store/all.data';
import { IFrontmatter } from 'UiKit/types/types';


const props = defineProps({
  backgroundImage: String,
  imageBottom: String,
  topic: String,
  buttonText: String,
});

const backgroundImageLocal = computed(() => (
  `linear-gradient(0deg, rgba(0, 66, 212, 0.85) 0%, rgba(0, 66, 212, 0.85) 100%), url(${props.backgroundImage}) lightgray 50% / cover no-repeat`
));

const showImageBottom = computed(() => props.imageBottom && (props.imageBottom !== 'undefined'));
const showButton = computed(() => props.buttonText && (props.buttonText !== 'undefined'));

const getStarted = filterAndSortByOrderElements(allPages as IFrontmatter[], 'slug', 'get-started');
</script>

<template>
  <section
    class="VHighlight the-highlight is--list-pointers"
    :class="{ 'is--gap-bottom': showImageBottom }"
  >
    <div class="is--container">
      <div
        class="the-highlight__container is--background-primary-dark is--highlight"
        :style="{ background: backgroundImage ? backgroundImageLocal : undefined }"
      >
        <slot />
        <VButton
          v-if="showButton"
          tag="a"
          :href="`${getStarted[0].url}?topic=${topic}&text=${buttonText}`"
          color="secondary"
          size="large"
        >
          {{ buttonText }}
        </VButton>
        <div
          v-if="showImageBottom"
          class="the-highlight__bottom-image-wrap"
        >
          <VImage
            :src="imageBottom"
            alt="Products highlight bottom image"
            class="the-highlight__bottom-image is--no-margin"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.the-highlight {
  width: 100%;
  overflow: hidden;
  &.is--gap-bottom {
    padding-bottom: 136px;
    @include media-lte(tablet) {
      padding-bottom: 175px;
    }
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__bottom-image-wrap {
    position: absolute;
    right: -165px;
    bottom: -135.728px;
    max-width: 636px;
    max-height: 316px;
    width: auto;
    height: 100%;
    padding: 3.728px;
    border-radius: 7.456px;
    background-color: $white;
    box-shadow: $box-shadow-large;

    @include media-lte(desktop) {
      bottom: -200px;
    }

    @include media-lte(tablet) {
      left: 37px;
      bottom: -172.146px;
      max-height: 183.703px;
      max-width: 374.557px;
    }
  }

  &__bottom-image {
    height: 100%;
    width: auto;
    min-width: 628px;

    @include media-lte(tablet) {
      min-width: 300px;
    }
  }
}
</style>
