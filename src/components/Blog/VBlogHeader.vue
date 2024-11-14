<script setup lang="ts">
import { PropType, computed } from 'vue';
import VTag from 'UiKit/components/VTag/VTag.vue';
import VImage from 'UiKit/components/VImage/VImage.vue';
import { navigateWithQueryParams } from 'UiKit/helpers/general';
import { IFrontmatter, IAuthor } from 'UiKit/types/types';


const props = defineProps({
  data: {
    type: Object as PropType<IFrontmatter>,
    requred: true,
  },
  author: {
    type: Object as PropType<IAuthor>,
    requred: true,
  },
});

const day = computed(() => String(new Date(props.data?.publishDate).getDate() + 1).padStart(2, '0'));
const month = computed(() => String(new Date(props.data?.publishDate).toLocaleString('en-us', { month: 'long' })));
const year = computed(() => String(new Date(props.data?.publishDate).getFullYear()));

const onTagClick = (tag: string) => {
  navigateWithQueryParams('/resource-center', { tag });
};
</script>

<template>
  <header class="VBlogHeader v-blog-header">
    <div class="v-blog-header__author-wrap">
      <div class="v-blog-header__author">
        <VImage
          :alt="author?.title || ''"
          :src="author?.cover?.image"
          class="v-blog-header__author-image is--no-margin"
        />
        <a
          :href="author?.url"
          class="v-blog-header__author-image-link"
        >
          <span class="is--visually-hidden">{{ author?.title }}</span>
        </a>
      </div>
      <div class="v-blog-header__author-details">
        <a
          :href="author?.url"
          class="v-blog-header__author-name is--h5__title"
        >
          {{ author?.title }}
        </a>
        <div class="v-blog-header__author-date">
          {{ month }} {{ day }}, {{ year }}
        </div>
      </div>
    </div>
    <div class="is--tags-inline">
      <VTag
        v-for="(tag, i) in data?.tags"
        :key="i"
        round
        background="#D9FFEE"
        @click="onTagClick(tag)"
      >
        {{ tag }}
      </VTag>
    </div>
  </header>
</template>

<style lang="scss">
.v-blog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include media-lte(tablet) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  &__author {
    width: 65px;
    height: 65px;
    padding: 2px;
    border-radius: 50%;
    border: 1px dashed #004fff;
    margin-right: 21px;
    position: relative;
  }

  &__author-wrap {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    flex-shrink: 0;
    @include media-lte(tablet) {
      margin-bottom: 20px;
    }
  }

  &__author-image {
    object-fit: cover;
    border-radius: 50%;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  &__author-image-link {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
  }

  &__author-name {
    opacity: 0.8;
    color: $black !important;
    text-decoration: none !important;
  }

  &__author-date {
    color: $gray-80;
    text-transform: capitalize;
    margin-top: 4px !important;
  }
}
</style>
