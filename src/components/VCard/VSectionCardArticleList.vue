<script setup lang="ts">
import {
  computed, PropType,
} from 'vue';
import { IFrontmatter } from 'UiKit/types/types';
import VSection from 'UiKit/components/VSection/VSection.vue';
import VCardArticle from 'UiKit/components/VCard/VCardArticle.vue';

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
const emit = defineEmits(['click']);

const noData = computed(() => !props.items || props.items?.length === 0);
</script>

<template>
  <VSection
    :title="title"
    :sub-title="subTitle"
    :button-href="buttonHref"
    :button-text="buttonText"
    :no-data="noData"
    :no-container="noContainer"
    class="VSectionCardArticleList v-section-card-article-list"
  >
    <template #infoShort>
      <slot name="infoShort" />
    </template>
    <ul
      class="v-section-card-article-list__items"
    >
      <li
        v-for="item in items"
        :key="item.slug"
        class="v-section-card-article-list__item"
      >
        <VCardArticle
          :data="item"
          @click="emit('click')"
        />
      </li>
    </ul>

    <template #noData>
      <slot name="noData" />
    </template>
  </VSection>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-section-card-article-list {
  width: 100%;

  &__items {
    width: 100%;
    padding: 0;
    list-style: none;
  }

  &__item {
    border-top: 1px solid colors.$gray-40;
    &:last-child {
      border-bottom: 1px solid colors.$gray-40;
    }
  }
}
</style>
