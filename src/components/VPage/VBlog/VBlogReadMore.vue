<script lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useData } from 'vitepress';

import VCardArticle from 'UiKit/components/VCard/VCardArticle.vue';

import { pages } from 'UiKit/types/pages';
</script>

<script setup lang="ts">
const { frontmatter, theme } = useData();

const postsRandom = ref();
const route = useRoute();

const getRandomPosts = () => {
  // todo
  // maybe store it somewhere in config?
  const blogPostsFiltered = theme.navigation.rc.getChilds('layout', 'resource-center-single')
    .filter((item) => item.data.slug !== frontmatter.value.slug);
  const shuffledPosts = blogPostsFiltered?.slice().sort(() => Math.random() - 0.5); // Shuffle the array
  return shuffledPosts?.slice(0, 3).map(post => post.data); // Select the first three elements (randomly selected)  
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
