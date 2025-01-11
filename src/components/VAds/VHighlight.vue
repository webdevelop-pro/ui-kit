<script setup lang="ts">
import { computed } from 'vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import { filterPages } from 'UiKit/helpers/allData';
import { data as allPages } from '@/store/all.data';
import { IFrontmatter } from 'UiKit/types/types';
import VSection from 'UiKit/components/VSection/VSection.vue';


const props = defineProps({
  backgroundImage: String,
  imageBottom: String,
  topic: String,
  buttonText: String,
  containerClassBackground: {
    type: String,
    default: 'is--background-primary-dark',
  },
  backgroundGradient: {
    type: String,
    default: 'linear-gradient(0deg, rgba(0, 66, 212, 0.85) 0%, rgba(0, 66, 212, 0.85) 100%)',
  },
});

const backgroundImageLocal = computed(() => (
  `${props.backgroundGradient}, url(${props.backgroundImage}) lightgray 50% / cover no-repeat`
));

const showImageBottom = computed(() => props.imageBottom && (props.imageBottom !== 'undefined'));
const showButton = computed(() => props.buttonText && (props.buttonText !== 'undefined'));

const getStarted = filterPages(allPages as IFrontmatter[], 'slug', 'get-started');
</script>

<template>
  <VSection
    class="VHighlight v-highlight is--list-pointers"
    :class="{ 'is--gap-bottom': showImageBottom }"
  >
    <div
      class="v-highlight__container"
      :class="[containerClassBackground]"
      :style="{ background: backgroundImage ? backgroundImageLocal : undefined }"
    >
      <div class="with-default-distance">
        <slot />
      </div>
      <VButton
        v-if="showButton"
        as="a"
        :href="`${getStarted[0].url}?topic=${topic}&text=${buttonText}`"
        variant="tetriary"
        size="large"
        class="is--margin-top-40"
      >
        {{ buttonText }}
      </VButton>
      <div
        v-if="showImageBottom"
        class="v-highlight__bottom-image-wrap"
      >
        <VImage
          :src="imageBottom"
          alt="Products highlight bottom image"
          class="v-highlight__bottom-image "
        />
      </div>
    </div>
  </VSection>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;
@use 'UiKit/styles/_variables.scss' as *;
.v-highlight {
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
    flex-shrink: 0;
    position: relative;
    padding: 130px 196px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    color: $white;
    @media screen and (max-width: $tablet) {
        padding: 40px;
    }
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
      overflow: hidden;
      box-shadow: $box-shadow-small;
    }
  }

  &__bottom-image {
    height: 100%;
    width: auto;
    min-width: 628px;

    @include media-lte(tablet) {
      min-width: auto;
      min-height: auto;
      height: 100%;
      object-fit: cover;
      width: 100%;
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
    margin-top: 32px;
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0;
    @media screen and (min-width: $tablet) {
      max-width: 562px;
    }
  }

  li {
        color: inherit;
        border-bottom: 1px solid $white !important;
  }
}
</style>
