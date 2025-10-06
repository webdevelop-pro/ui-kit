<script setup lang="ts">
import VSection from 'UiKit/components/VSection/VSection.vue';
import VTopInfo from 'UiKit/components/VInfo/VInfoTop.vue';

defineProps({
  title: String,
  text: String,
  subtitle: String,
  tagText: String,
  secondaryUrl: String,
  secondaryText: {
    type: String,
    default: 'Learn More in Use Cases',
  },
  mainUrl: String,
  mainText: {
    type: String,
    default: 'Get In Touch',
  },
});
</script>

<template>
  <VSection class="VSectionTop v-section-top">
    <div class="v-section-top__container">
      <div class="v-section-top__content">
        <slot>
          <VTopInfo
            :title="title"
            :subtitle="subtitle"
            :text="text"
            :main-url="mainUrl"
            :tag-text="tagText"
            :secondary-url="secondaryUrl"
            :main-text="mainText"
            :secondary-text="secondaryText"
          />
        </slot>
      </div>

      <slot name="right" />
    </div>
  </VSection>
</template>

<style lang="scss">
.v-section-top {
  $root: &;

  position: relative;

  &__container {
    position: relative;
    display: flex;
    align-items: center;

    @include media-gt(tablet) {
      justify-content: space-between;
    }

    @include media-lte(tablet) {
      flex-direction: column;
    }
  }

  &__content {
    width: 100%;
    z-index: 2;
    position: relative;

    @include media-gt(tablet) {
      max-width: 653px;
    }

    @include media-lte(tablet) {
      margin-bottom: 60px;
    }
  }
}
</style>
