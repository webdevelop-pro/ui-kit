<script setup lang="ts">
import { PropType } from 'vue';
import { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router';

export interface IBreadcrumb {
  name: string;
  routeTo?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric;
  link?: string;
}

defineProps({
  data: {
    type: Array as PropType<IBreadcrumb[]>,
    required: true,
  },
  slug: String,
});

const getComponent = (item: IBreadcrumb) => {
  if (item.routeTo) return 'router-link';
  if (item.link) return 'a';
  return 'span';
};
</script>

<template>
  <ul
    :key="slug"
    class="VBreadcrumbs v-breadcrumbs is--no-margin"
  >
    <li
      v-for="item in data"
      :key="item.name"
      class="v-breadcrumbs__item-wrap"
    >
      <component
        :is="getComponent(item)"
        :to="item.routeTo"
        :href="item.link"
        class="v-breadcrumbs__item is--h6__title"
      >
        {{ item.name }}
      </component>
      <span class="v-breadcrumbs__divider">
        <slot>
          /
        </slot>
      </span>
    </li>
  </ul>
</template>

<style lang="sass">
@use 'index.sass' as *
.v-breadcrumbs
  $root: &

  gap: $v-bredcrumbs-gap
  display: flex
  flex-wrap: wrap
  padding-left: 0
  margin: 0

  &__divider
    color: $v-bredcrumbs-divider-color

  &__item-wrap
    gap: $v-bredcrumbs-gap
    display: flex

    &:last-of-type
      #{$root}__item
        line-height: inherit
        color: $v-bredcrumbs-item-color

      #{$root}__divider
        display: none

  a
    color: inherit !important
    text-decoration: none !important
    line-height: inherit
</style>
