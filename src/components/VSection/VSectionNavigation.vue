<script setup lang="ts">
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import arrowIcon from 'UiKit/assets/images/arrow-right.svg';
import arrowLeftIcon from 'UiKit/assets/images/arrow-left.svg';

defineProps({
  prev: String,
  next: String,
});
</script>

<template>
  <section class="VSectionNavigation case-studies-navigation is--background-gray-10 ">
    <VButton
      v-if="prev"
      tag="a"
      :href="prev"
      size="large"
      variant="link"
      icon-placement="left"
    >
      <component
        :is="arrowLeftIcon"
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
      <component
        :is="arrowIcon"
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
