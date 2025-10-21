<script lang="ts">
import { defineAsyncComponent, hydrateOnVisible, PropType } from 'vue';
import { useData, useRoute } from 'vitepress';
import VHeader from 'UiKit/components/VHeader/VHeader.vue';
import { useGlobalLoader } from 'UiKit/store/useGlobalLoader';
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

const route = useRoute();
</script>

<template>
  <VHeader
    :path="route.path"
    :menu="menu"
    class="VHeaderGetStarted v-header-get-started"
  >
    <VButton
      as="a"
      :href="getStarted.url"
    >
      Request a Demo
    </VButton>
    <template #mobile>
      <VButton
        as="a"
        :href="getStarted.url"
        block
        size="large"
      >
        Request a Demo
      </VButton>
    </template>
  </VHeader>
</template>
