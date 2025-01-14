<script setup lang="ts">
import VBadge from 'UiKit/components/Base/VBadge/VBadge.vue';
import { VCardContent, VCard, VCardHeader } from 'UiKit/components/Base/VCard';

export interface ICardBadge {
  tagText: string;
  text: string;
  classes?: string;
}

defineProps({
  tagText: String,
  text: String,
  classes: String,
});
</script>

<template>
  <VCard class="VCardBadge v-card-badge is--card">
    <VCardHeader>
      <VBadge
        :class="[classes]"
      >
        {{ tagText }}
      </VBadge>
    </VCardHeader>
    <VCardContent>
      <p>
        {{ text }}
      </p>
    </VCardContent>
  </VCard>
</template>

<style lang="scss">
.v-card-badge {
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
}
</style>
