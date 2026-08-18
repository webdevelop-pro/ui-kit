<script setup lang="ts">
import { PropType } from 'vue';
import VCardBadge, { ICardBadge } from 'UiKit/components/VCard/VCardBadge.vue';

defineProps({
  items: {
    type: Object as PropType<ICardBadge[]>,
    required: true,
  },
});

</script>

<template>
  <div
    class="VCardBadgeList v-card-badge-list"
  >
    <VCardBadge
      v-for="(item, i) in items"
      :key="i"
      :tag-text="item.tagText"
      :text="item.text"
      :classes="item.classes"
    />
  </div>
</template>

<style lang="scss">
.v-card-badge-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
}
</style>
