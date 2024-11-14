<script setup lang="ts">
import VTwoColBlock from 'UiKit/components/VTwoColBlock/VTwoColBlock.vue';
import VImage from 'UiKit/components/VImage/VImage.vue';

defineProps({
  title: String,
  text: String,
  image: String,
  imageAlt: String,
  svg: Boolean,
});

</script>

<template>
  <VTwoColBlock
    :title="title"
    :text="text"
    class="VTwoColBlockImage"
  >
    <template #left>
      <component
        :is="image"
        v-if="svg"
        :alt="imageAlt ?? `${title} image`"
      />
      <VImage
        v-else
        :src="image"
        :alt="imageAlt ?? `${title} image`"
      />
    </template>
  </VTwoColBlock>
</template>
