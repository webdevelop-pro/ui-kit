<script setup lang="ts">
import { ref, watch } from 'vue';
import VCardArticle from 'UiKit/components/Cards/VCardArticle.vue';
import { useRoute, useData } from 'vitepress';
import { data as allPages } from '@/store/all.data';
import { filterPages } from 'UiKit/helpers/allData';
import { IFrontmatter } from 'UiKit/types/types';

const { frontmatter } = useData();

const postsRandom = ref();
const route = useRoute();

const blogPosts = filterPages(allPages as IFrontmatter[], 'layout', 'resource-center-single');

const getRandomPosts = () => {
  const blogPostsFiltered = blogPosts.filter((item) => item.slug !== frontmatter.value.slug);
  const shuffledPosts = blogPostsFiltered?.slice().sort(() => Math.random() - 0.5); // Shuffle the array
  return shuffledPosts?.slice(0, 3); // Select the first three elements (randomly selected)
};

watch(() => route.path, () => {
  postsRandom.value = getRandomPosts();
}, { immediate: true });
</script>

<template>
  <div class="VBlogReadMore v-blog-read-more">
    <div class="is--three-col-grid is--no-margin">
      <VCardArticle
        v-for="item in postsRandom"
        :key="item.slug"
        :data="item"
        small
      />
    </div>
  </div>
</template>
