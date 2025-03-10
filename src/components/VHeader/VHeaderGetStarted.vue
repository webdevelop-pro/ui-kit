<script lang="ts">
import { defineAsyncComponent, hydrateOnVisible } from 'vue';
import { useData } from 'vitepress';
import VHeader from 'UiKit/components/VHeader/VHeader.vue';
import { useGlobalLoader } from 'UiKit/store/useGlobalLoader';
</script>

<script setup lang="ts">
const { frontmatter, theme } = useData();
const getStarted = theme.navigation.getStarted.data;

const VButton = defineAsyncComponent({
  loader: () => import('UiKit/components/Base/VButton/VButton.vue'),

  hydrate: hydrateOnVisible(),
});

const onClick = () => {
  useGlobalLoader().show();
};
</script>

<template>
  <VHeader
    class="VHeaderGetStarted v-header-get-started"
    @click="onClick"
  >
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
