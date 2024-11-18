<script setup lang="ts">
import { computed, PropType } from 'vue';
import VSection from 'UiKit/components/VSection/VSection.vue';
import VCardArticle from 'UiKit/components/Cards/VCardArticle.vue';
import { IFrontmatter } from 'UiKit/types/types';

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
