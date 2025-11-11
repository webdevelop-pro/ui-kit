<script lang="ts">
import { defineAsyncComponent, hydrateOnVisible, PropType } from 'vue';
import { useData } from 'vitepress';
import VHeader from 'UiKit/components/VHeader/VHeader.vue';
import { MenuItem } from './VHeaderNavigation.vue';
</script>

<script setup lang="ts">
const { theme } = useData();
const getStarted = theme.navigation.getStarted.data;

const VButton = defineAsyncComponent({
  loader: () => import('UiKit/components/Base/VButton/VButton.vue'),
  hydrate: hydrateOnVisible(),
});

defineProps({
  menu: {
    type: Array as PropType<MenuItem[]>,
  },
});
</script>

<template>
  <VHeader
    :menu="menu"
    class="VHeaderGetStarted v-header-get-started"
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
