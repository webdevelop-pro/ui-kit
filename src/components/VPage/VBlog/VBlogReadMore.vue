<script lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useData } from 'vitepress';

import VCardArticle from 'UiKit/components/VCard/VCardArticle.vue';
</script>

<script setup lang="ts">
const { frontmatter, theme } = useData();

const postsRandom = ref();
const route = useRoute();

const getRandomPosts = () => {
  // todo
  // maybe store it somewhere in config?
  const blogPosts = theme.navigation.rc.filterChilds('layout', 'resource-center-single')?.map((post) => post.data);
  const shuffledPosts = blogPosts?.slice().sort(() => Math.random() - 0.5); // Shuffle the array
  const shuffledPostsResult = shuffledPosts?.slice(0, 4); // Select the first 4 elements (randomly selected)
  const shuffledPostsResultFiltered = shuffledPostsResult?.filter((item) => item.slug !== frontmatter.value.slug); // filter current
  return shuffledPostsResultFiltered?.slice(0, 3);
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
