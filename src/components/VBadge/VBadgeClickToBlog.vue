<script setup lang="ts">
import VBadge from 'UiKit/components/Base/VBadge/VBadge.vue';
import { navigateWithQueryParams } from 'UiKit/helpers/general';

defineProps({
  text: String,
});

const onTagClick = (tag: string | undefined) => {
  if (!tag) return;
  navigateWithQueryParams('/resource-center-tags', { tag });
};
</script>

<template>
  <VBadge
    hover
    color="secondary-light"
    class="VBadgeClickToBlog v-badge-click-to-blog"
    @click="onTagClick(text)"
  >
    {{ text }}
  </VBadge>
</template>
