<script setup lang="ts">
import VSectionTwoCol from 'UiKit/components/VSection/VSectionTwoCol.vue';
import VCardBadgeList from 'UiKit/components/VCard/VCardBadgeList.vue';
import { ICardBadge } from 'UiKit/components/VCard/VCardBadge.vue';
import { PropType } from 'vue';

const props = defineProps({
  items: Array as PropType<ICardBadge[]>,
  rightTitle: String,
  rightText: String,
  mobileReverse: {
    type: Boolean,
    default: true,
  },
});

const rightData = {
  title: props.rightTitle || '',
  text: props.rightText || '',
};
</script>

<template>
  <VSectionTwoCol
    class="VSectionCardBadgeList v-section-card-badge-list"
    :right="rightData"
    :mobile-reverse="mobileReverse"
  >
    <template #infoShort>
      <slot name="infoShort" />
    </template>
    <template #left="slotProps">
      <VCardBadgeList
        :items="items"
        :class="slotProps.class"
      />
    </template>
    <template #right="slotProps">
      <slot
        name="right"
        :class="slotProps.class"
      />
    </template>
  </VSectionTwoCol>
</template>
