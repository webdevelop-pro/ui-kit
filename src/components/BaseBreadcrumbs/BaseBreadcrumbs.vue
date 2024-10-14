<script setup lang="ts">
import { computed } from 'vue';
import { PropType } from 'vue';

export interface IBreadcrumb {
  name: string;
  routeName?: string;
  params?: object;
  link?: string;
}

const props = defineProps({
  data: {
    type: Array as PropType<IBreadcrumb[]>,
    required: true,
  },
});

const getComponent = (item: IBreadcrumb) => {
  if (item.routeName) return 'router-link';
  if (item.link) return 'a';
  return 'span';
}
</script>

<template>
  <section class="BaseBreadcrumbs base-breadcrumbs is--no-margin">
    <ul class="base-breadcrumbs__container">
      <li
        v-for="item in data"
        :key="item.routeName"
        class="base-breadcrumbs__item-wrap"
      >
        <component
          :is="getComponent(item)"
          :to="{ name: item.routeName, params: item.params }"
          :href="item.link"
          class="base-breadcrumbs__item is--h6__title"
        >
          {{ item.name }}
        </component>
        <span class="base-breadcrumbs__divider">
          /
        </span>
      </li>
    </ul>
  </section>
</template>

<style lang="sass" scoped>
@import 'index.sass'
.base-breadcrumbs
  $root: &

  &__container
    gap: 8px
    display: flex
    flex-wrap: wrap
    padding-left: 0
    margin: 0

  &__divider
    color: $gray-50

  &__item-wrap
    gap: 8px
    display: flex

    &:last-of-type
      #{$root}__item
        color: $gray-50

      #{$root}__divider
        display: none

  a
    color: inherit !important
    text-decoration: none !important
</style>
