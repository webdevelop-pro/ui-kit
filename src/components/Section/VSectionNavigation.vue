<script setup lang="ts">
import VButton from 'UiKit/components/VButton/VButton.vue';
import { VSvgIcon } from 'UiKit/components/VSvgIcon';

defineProps({
  prev: String,
  next: String,
});
</script>

<template>
  <section class="VSectionNavigation case-studies-navigation is--background-gray-10 is--no-margin">
    <VButton
      v-if="prev"
      tag="a"
      :href="prev"
      size="large"
      variant="link"
      icon-placement="left"
    >
      <VSvgIcon
        name="arrow-left"
        class="case-studies-navigation__button-icon"
      />
      Previous Case
    </VButton>
    <VButton
      v-if="next"
      tag="a"
      :href="next"
      size="large"
      variant="link"
      icon-placement="right"
    >
      Next Case
      <VSvgIcon
        name="arrow-right"
        class="case-studies-navigation__button-icon"
      />
    </VButton>
  </section>
</template>

<style lang="scss">
.case-studies-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__button-icon {
    width: 20px;
  }
}
</style>
