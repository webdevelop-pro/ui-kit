<script setup lang="ts">
import { PropType } from 'vue';
import VSection from 'UiKit/components/VSection/VSection.vue';
import VCardPrimary from 'UiKit/components/VCard/VCardPrimary.vue';

interface ISectionCardsPrimaryDifferentHeight {
  title: string;
  subtitle: string;
  items: {
    title: string;
    subtitle: string;
    text: string;
    href: string;
  }[];
}

defineProps({
  data: {
    type: Object as PropType<ISectionCardsPrimaryDifferentHeight>,
    required: true,
  },
});
</script>

<template>
  <VSection class="VSectionCardsPrimaryDifferentHeight v-section-card-primary-different-height">
    <template #infoShort>
      <slot name="infoShort">
        <h3>
          {{ data.title }}
        </h3>
        <p
          v-dompurify-html="data.subtitle"
          class="is--subheading-2"
        />
      </slot>
    </template>
    <div class="v-section-card-primary-different-height__content">
      <VCardPrimary
        v-for="(item, index) in data?.items"
        :key="index"
        :data="item"
        description-with-html
        show-button
        class="v-section-card-primary-different-height__card"
      >
        <template #button>
          <VButton
            v-if="item.href"
            as="a"
            :href="encodeURI(item.href)"
            block
            class="is--margin-top-0"
          >
            Make Donation
          </VButton>
        </template>
      </VCardPrimary>
    </div>
  </VSection>
</template>

<style lang="scss">
.v-section-card-primary-different-height {

  &__content {
    display: flex;
    align-items: flex-start;
    gap: 31px;

    @include media-lte(tablet) {
      flex-direction: column;
    }
  }

  &__card {
    width: 33%;

    @include media-lte(tablet) {
      width: 100%;
    }
  }
}
</style>
