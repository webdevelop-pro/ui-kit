<script setup lang="ts">
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import arrowIcon from 'UiKit/assets/images/arrow-right.svg';
import arrowLeftIcon from 'UiKit/assets/images/arrow-left.svg';

defineProps({
  prev: String,
  next: String,
  prevButtonText: {
    type: String,
    default: 'Previous Case',
  },
  nextButtonText: {
    type: String,
    default: 'Next Case',
  },
});
</script>

<template>
  <section class="VSectionNavigation case-studies-navigation is--background-gray-10 ">
    <VButton
      v-if="prev"
      as="a"
      :href="encodeURI(prev)"
      size="large"
      variant="link"
    >
      <component
        :is="arrowLeftIcon"
        class="case-studies-navigation__button-icon"
      />
      {{ prevButtonText }}
    </VButton>
    <VButton
      v-if="next"
      as="a"
      :href="encodeURI(next)"
      size="large"
      variant="link"
    >
      {{ nextButtonText }}
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
