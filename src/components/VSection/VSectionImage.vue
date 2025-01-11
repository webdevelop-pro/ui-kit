<script setup lang="ts">
import VSectionTwoCol from 'UiKit/components/VSection/VSectionTwoCol.vue';
import VImage from 'UiKit/components/Base/VImage/VImage.vue';

const props = defineProps({
  image: String,
  alt: String,
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
    class="VSectionImage v-section-image"
    :right="rightData"
    :mobile-reverse="mobileReverse"
  >
    <template #infoShort>
      <slot name="infoShort" />
    </template>
    <template #left="slotProps">
      <VImage
        :src="image"
        :alt="alt || ''"
        class="v-section-image__left"
        :class="slotProps.class"
      />
    </template>
    <template #right="slotProps">
      <slot
        name="right"
        class="v-section-image__right"
        :class="slotProps.class"
      />
    </template>
  </VSectionTwoCol>
</template>
