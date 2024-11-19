<script setup lang="ts">
import {
  computed, defineAsyncComponent, hydrateOnVisible, PropType,
} from 'vue';
import { IFrontmatter } from 'UiKit/types/types';


// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const VCardArticle = defineAsyncComponent({
  loader: () => import('UiKit/components/Cards/VCardArticle.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const VSection = defineAsyncComponent({
  loader: () => import('UiKit/components/VSection/VSection.vue'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  hydrate: hydrateOnVisible(),
});

const props = defineProps({
  title: String,
  subTitle: String,
  items: {
    type: Array as PropType<IFrontmatter[]>,
    required: true,
  },
  buttonHref: String,
  buttonText: String,
  noContainer: Boolean,
});

const noData = computed(() => props.items?.length === 0);
</script>

<template>
  <VSection
    :title="title"
    :sub-title="subTitle"
    :button-href="buttonHref"
    :button-text="buttonText"
    :no-data="noData"
    :no-container="noContainer"
    class="VCardArticleList v-card-article-list"
  >
    <ul
      v-if="!noData"
      class="v-card-article-list__items is--no-margin"
    >
      <li
        v-for="item in items"
        :key="item.slug"
      >
        <VCardArticle
          :data="item"
        />
      </li>
    </ul>

    <template #noData>
      <slot name="noData" />
    </template>
  </VSection>
</template>

<style lang="scss">
.v-card-article-list {
  width: 100%;

  &__items {
    width: 100%;
    padding: 0;
    list-style: none;
  }
}
</style>
