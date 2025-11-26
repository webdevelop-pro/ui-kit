<script lang="ts">
import { defineAsyncComponent, hydrateOnVisible, PropType } from 'vue';
import VHeader from 'UiKit/components/VHeader/VHeader.vue';
import { MenuItem } from './VHeaderNavigation.vue';
import { filterPages } from 'UiKit/helpers/allData';
import { data as allPages } from '@/store/all.data';
import { IFrontmatter } from 'UiKit/types/types';
</script>

<script setup lang="ts">
const contactUs = filterPages(allPages as IFrontmatter[], 'layout', 'contact-us');

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
      :href="contactUs[0]?.url"
    >
      Get Started
    </VButton>
    <template #mobile>
      <VButton
        as="a"
        :href="contactUs[0]?.url"
        block
        size="large"
      >
        Get Started
      </VButton>
    </template>
  </VHeader>
</template>
