<script setup lang="ts">
import VSectionTwoCol from 'UiKit/components/VSection/VSectionTwoCol.vue';
import VCardBadgeListNumbered from 'UiKit/components/VCard/VCardBadgeListNumbered.vue';
import { PropType } from 'vue';

const props = defineProps({
  items: Array as PropType<string[]>,
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
    class="VSectionCardBadgeListNumbered"
    :right="rightData"
    :mobile-reverse="mobileReverse"
  >
    <template #infoShort>
      <slot name="infoShort" />
    </template>
    <template #left="slotProps">
      <VCardBadgeListNumbered
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
