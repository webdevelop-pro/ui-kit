<script lang="ts">
import { defineAsyncComponent, hydrateOnVisible } from 'vue';
import { useData } from 'vitepress';
import VHeader from 'UiKit/components/VHeader/VHeader.vue';
</script>

<script setup lang="ts">
const { frontmatter, theme } = useData();
const getStarted = theme.navigation.getStarted._data;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const VButton = defineAsyncComponent({
  loader: () => import('UiKit/components/Base/VButton/VButton.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});
</script>

<template>
  <VHeader class="VHeaderGetStarted v-header-get-started">
    <VButton
      as="a"
      :href="getStarted.url"
    >
      Get Started
    </VButton>
    <template #mobile>
      <VButton
        as="a"
        :href="getStarted.url"
        block
        size="large"
      >
        Get Started
      </VButton>
    </template>
  </VHeader>
</template>
