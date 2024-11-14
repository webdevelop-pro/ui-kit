<script setup lang="ts">
import VButton from 'UiKit/components/VButton/VButton.vue';

defineProps({
  title: String,
  text: String,
  buttonLink: String,
  buttonText: String,
});
</script>

<template>
  <section class="VSectionTwoColText is--container">
    <h2 v-if="title">
      {{ title }}
    </h2>
    <div class="is--two-col-text is--margin-top-40">
      <div v-html="text" />
      <VButton
        v-if="buttonLink && buttonText"
        tag="a"
        :href="buttonLink"
        icon-placement="right"
        size="large"
        variant="link"
      >
        {{ buttonText }}
        <VSvgIcon name="arrow-right" />
      </VButton>
    </div>
  </section>
</template>
