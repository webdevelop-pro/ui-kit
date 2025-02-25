<script lang="ts" setup>
import { IFrontmatter } from 'UiKit/types/types';
import { PropType } from 'vue';
import {
  VTable, VTableBody, VTableCell, VTableRow,
} from 'UiKit/components/Base/VTable';

interface IRelatedPages {
    groupBy: IFrontmatter;
    items: IFrontmatter[];
}

defineProps({
  data: Array as PropType<IRelatedPages[]>,
});
</script>

<template>
  <div class="VRelatedPages v-related-pages">
    <VTable class="v-related-pages__content">
      <VTableBody>
        <VTableRow
          v-for="(item, index) in data"
          :key="index"
          class="v-related-pages__item"
        >
          <VTableCell class="v-related-pages__left" v-if="item._data">
            <a
              :href="encodeURI(item._data.url)"
              class="is--h4__title"
            >
              {{ item._data.title }}
            </a>
          </VTableCell>
          <VTableCell class="v-related-pages__right" v-if="item._data">
            <a
              v-for="(child, indexChild) in item.childs()"
              :key="indexChild"
              :href="child.url"
              class="is--link-regular"
            >
              {{ child.title }}
            </a>
          </VTableCell>
        </VTableRow>
      </VTableBody>
    </VTable>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;

.v-related-pages {
    display: flex;
    padding: 8px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
    border-radius: 2px;
    border: 1px solid colors.$gray-20;
    background: colors.$white;
    box-shadow: variables.$box-shadow-medium;

    &__content {
      border: 1px solid colors.$gray-20;
      border-top: none;
    }

    &__left {
        width: 30%;
        background-color: colors.$primary-light;
        a {
            text-decoration: none;
        }
    }

    &__right {
        a {
            padding: 8px 16px;
            display: inline-block;
        }
    }
}
</style>