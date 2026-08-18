<script setup lang="ts">
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import VSection from 'UiKit/components/VSection/VSection.vue';

// TODO: add option to load as svg

interface VPartnerItem {
  id?: number | string;
  icon?: string;
  alt?: string;
}

const props = defineProps<{
  title?: string;
  items: VPartnerItem[];
}>();
</script>

<template>
  <VSection class="VSectionPartners v-section-partners">
    <h2
      v-if="props.title"
      class="is--h6__title"
    >
      {{ props.title }}
    </h2>
    <ul class="v-section-partners__slider">
      <li
        v-for="(item, index) in props.items"
        :key="item.id ?? `partner-${index}`"
        class="v-section-partners__slider-item"
      >
        <slot
          :item="item"
          :index="index"
        >
          <VImage
            v-if="item.icon"
            :src="item.icon"
            :alt="item.alt || 'Partner logo'"
            fit="contain"
            loading="lazy"
            class="v-section-partners__image"
          />
        </slot>
      </li>
    </ul>
  </VSection>
</template>

<style lang="scss">
.v-section-partners {
  .is--h6__title {
    text-align: center;
    margin-bottom: 30px;
    color: $gray-70;

    @include media-lte(tablet) {
      margin-bottom: 20px;
    }
  }

  &__slider-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: 0;
    max-width: 220px;
    height: 40px;

    @include media-lte(tablet) {
      max-width: 180px;
      height: 38px;
    }
  }

  &__slider {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 26px 18px;
    width: 100%;
    align-items: center;
    list-style: none;
    margin: 0;
    padding: 0;

    @include media-lte(tablet) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 18px 14px;
    }
  }

  &__image {
    display: flex;
    width: 100%;
    height: 100%;
    filter: grayscale(100%);
    filter: grayscale(1);
    transition: all 0.2s ease;

    &:hover {
      filter: grayscale(0);
      opacity: 1;
      transition: all 0.2s ease;
    }
  }
}
</style>
