<script setup lang="ts">
import VHeader from 'UiKit/components/VHeader/VHeader.vue';
import { filterPages } from 'UiKit/helpers/allData';
import { data as allPages } from '@/store/all.data';
import { IFrontmatter } from 'UiKit/types/types';
import { defineAsyncComponent, hydrateOnVisible } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const VButton = defineAsyncComponent({
  loader: () => import('UiKit/components/Base/VButton/VButton.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});


const getStarted = filterPages(allPages as IFrontmatter[], 'slug', 'get-started');
</script>

<template>
  <VHeader class="VHeaderGetStarted v-header-get-started">
    <VButton
      as="a"
      :href="getStarted[0].url"
    >
      Get Started
    </VButton>
    <template #mobile>
      <VButton
        as="a"
        :href="getStarted[0].url"
        block
        size="large"
      >
        Get Started
      </VButton>
    </template>
  </VHeader>
</template>
