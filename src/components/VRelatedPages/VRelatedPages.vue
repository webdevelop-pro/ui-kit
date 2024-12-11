<script lang="ts" setup>
import { IFrontmatter } from 'UiKit/types/types';
import { PropType } from 'vue';

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
    <table class="v-related-pages__content">
      <tr
        v-for="(item, index) in data"
        :key="index"
        class="v-related-pages__item"
      >
        <td class="v-related-pages__left">
          <a
            :href="item.groupBy.url"
            class="is--h4__title"
          >
            {{ item.groupBy.title }}
          </a>
        </td>
        <td class="v-related-pages__right">
          <a
            v-for="(child, indexChild) in item.items"
            :key="indexChild"
            :href="child.url"
            class="is--link-regular"
          >
            {{ child.title }}
          </a>
        </td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.sass' as colors;
@use 'UiKit/styles/_variables.sass' as variables;

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
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        align-self: stretch;
        border-radius: 2px;
        border: 1px solid colors.$gray-20;
        background: colors.$white;
        margin-top: 0;
    }

    &__item {
        & + & {
            border-top: 1px solid colors.$gray-20;
        }
    }

    &__left {
        padding: 16px;
        width: 30%;
        background-color: colors.$primary-light;
        a {
            text-decoration: none;
        }
    }

    &__right {
        padding: 8px 0;
        a {
            padding: 8px 16px;
            display: inline-block;
            margin: 0 !important;
        }
    }
}
</style>
