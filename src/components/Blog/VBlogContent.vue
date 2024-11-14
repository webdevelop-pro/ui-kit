<script setup lang="ts">
import { defineAsyncComponent, hydrateOnVisible, PropType } from 'vue';
import { IFrontmatter } from 'UiKit/types/types';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
import VImage from 'UiKit/components/VImage/VImage.vue';

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
      class="is--subheading-1"
    >
      {{ currentPost?.subTitle }}
    </p>
    <VImage
      v-if="currentPost?.cover?.image"
      :src="currentPost.cover?.image"
      alt="blog image"
      class="v-blog-content__image"
    />
    <div
      class="v-blog-content__wrap"
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
