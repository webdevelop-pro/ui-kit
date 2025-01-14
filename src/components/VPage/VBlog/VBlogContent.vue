<script setup lang="ts">
import { PropType } from 'vue';
import { IFrontmatter } from 'UiKit/types/types';
import VImage from 'UiKit/components/Base/VImage/VImage.vue';

defineProps({
  currentPost: {
    type: Object as PropType<IFrontmatter>,
    requred: true,
  },
  wide: Boolean,
});
</script>

<template>
  <section class="VBlogContent v-blog-content">
    <h1 v-if="currentPost?.title">
      {{ currentPost?.title }}
    </h1>
    <p
      v-if="currentPost?.subTitle"
      class="is--subheading-1 is--margin-top-12"
    >
      {{ currentPost?.subTitle }}
    </p>
    <div class="is--margin-top-60">
      <VImage
        v-if="currentPost?.cover?.image"
        :src="currentPost.cover?.image"
        alt="blog image"
        class="v-blog-content__image"
      />
    </div>
    <div
      class="v-blog-content__wrap  with-default-distance"
      :class="{ 'is-wide': wide }"
    >
      <slot />
    </div>
  </section>
</template>

<style lang="scss">
.v-blog-content {
  &__image {
    object-fit: cover;
    object-position: center;
    width: 100%;
    min-height: 400px;
    .v-image__skeleton {
      min-height: 400px;
    }
    @include media-lte(tablet) {
      min-height: 100px;
      .v-image__skeleton {
        min-height: 100px;
      }
    }
  }

  &__wrap {
    width: 100%;
    max-width: 756px;
    margin: 60px auto;
    &.is-wide {
      max-width: 100%;
    }

    hr {
      border-top: 0;
      border-bottom: 1px solid $gray-50;
    }
  }
}
</style>
