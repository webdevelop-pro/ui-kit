<script lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useData } from 'vitepress';

import VCardArticle from 'UiKit/components/VCard/VCardArticle.vue';

import { pages } from 'UiKit/types/pages';
</script>

<script setup lang="ts">
const { frontmatter } = useData();

const postsRandom = ref();
const route = useRoute();

const getRandomPosts = () => {
  // todo
  // maybe store it somewhere in config?
  const resourceCenter = pages.filterChilds('layout', 'resource-center');
  if (resourceCenter.length > 0) {
    const blogPostsFiltered = resourceCenter[0].filterChilds('layout', 'resource-center-single')
      .filter((item) => item.slug !== frontmatter.value.slug);
      const shuffledPosts = blogPostsFiltered?.slice().sort(() => Math.random() - 0.5); // Shuffle the array
      return shuffledPosts?.slice(0, 3); // Select the first three elements (randomly selected)  
  }
  return [];
};

watch(() => route.path, () => {
  postsRandom.value = getRandomPosts();
}, { immediate: true });
</script>

<template>
  <div class="VBlogReadMore v-blog-read-more">
    <div class="is--three-col-grid ">
      <VCardArticle
        v-for="item in postsRandom"
        :key="item.slug"
        :data="item"
        small
      />
    </div>
  </div>
</template>
