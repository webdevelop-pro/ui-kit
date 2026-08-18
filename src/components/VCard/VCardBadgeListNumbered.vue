<script setup lang="ts">
import { PropType } from 'vue';
import VCardBadge from 'UiKit/components/VCard/VCardBadge.vue';

defineProps({
  items: {
    type: Object as PropType<string[]>,
    required: true,
  },
});

</script>

<template>
  <div
    class="VCardBadgeListNumbered v-card-badge-list-numbered is--card"
  >
    <VCardBadge
      v-for="(item, i) in items"
      :key="i"
      :tag-text="`${i + 1}`"
      :index="i + 1"
      :text="item"
    />
  </div>
</template>

<style lang="scss">
.v-card-badge-list-numbered {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 100%;
}
</style>
