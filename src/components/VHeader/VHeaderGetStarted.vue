<script lang="ts">
import { PropType } from 'vue';
import VHeaderGuest from 'UiKit/components/VHeader/VHeaderGuest.vue';
import { MenuItem } from './VHeaderNavigation.vue';
import { filterPages } from 'UiKit/helpers/allData';
import { data as allPages } from '@/store/all.data';
import { IFrontmatter } from 'UiKit/types/types';
</script>

<script setup lang="ts">
import VButton from 'UiKit/components/Base/VButton/VButton.vue';

const contactUs = filterPages(allPages as IFrontmatter[], 'layout', 'contact-us');

defineProps({
  menu: {
    type: Array as PropType<MenuItem[]>,
  },
});
</script>

<template>
  <VHeaderGuest
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
  </VHeaderGuest>
</template>
