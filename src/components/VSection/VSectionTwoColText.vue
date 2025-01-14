<script setup lang="ts">
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import arrowIcon from 'UiKit/assets/images/arrow-right.svg';
import VSection from 'UiKit/components/VSection/VSection.vue';


defineProps({
  title: String,
  text: String,
  buttonLink: String,
  buttonText: String,
});
</script>

<template>
  <VSection
    :title="title"
    class="VSectionTwoColText with-default-distance"
  >
    <template #infoShort>
      <slot name="infoShort" />
    </template>
    <div class="is--two-col-text">
      <div v-html="text" />
      <VButton
        v-if="buttonLink && buttonText"
        as="a"
        :href="encodeURI(buttonLink)"
        size="large"
        variant="link"
      >
        {{ buttonText }}
        <component :is="arrowIcon" />
      </VButton>
    </div>
  </VSection>
</template>
