<script setup lang="ts">
import { PropType } from 'vue';

export interface IBreadcrumb {
  name: string;
  routeName?: string;
}

defineProps({
  data: {
    type: Array as PropType<IBreadcrumb[]>,
    required: true,
  },
});
</script>

<template>
  <section class="BaseBreadcrumbs base-breadcrumbs">
    <div class="base-breadcrumbs__container">
      <div
        v-for="item in data"
        :key="item.routeName"
        class="base-breadcrumbs__item-wrap"
      >
        <component
          :is="item.routeName ? 'router-link' : 'span'"
          :to="{ name: item.routeName }"
          class="base-breadcrumbs__item"
        >
          <span class="is--h6__title">
            {{ item.name }}
          </span>
        </component>
        <span class="base-breadcrumbs__divider">
          /
        </span>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.base-breadcrumbs
  $root: &

  &__container
    gap: 8px
    display: flex
    flex-wrap: wrap

  &__item
    color: $black

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
</style>
