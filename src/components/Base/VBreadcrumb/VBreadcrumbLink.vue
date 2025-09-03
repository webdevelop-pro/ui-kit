<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  to: Object,
  href: String,
});

const isComponent = computed(() => {
  if (props.to) return 'router-link';
  if (props.href) return 'a';
  return 'span';
});
const componentProps = computed(() => {
  if (props.to) return { to: props.to };
  if (props.href) return { href: props.href };
  return {};
});
</script>

<template>
  <component
    :is="isComponent"
    v-bind="componentProps"
    class="VBreadcrumbLink v-breadcumb-link is--h6__title"
    itemprop="item"
  >
    <span itemprop="name"><slot /></span>
  </component>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-breadcumb-link {
  color: inherit;
  text-decoration: none;
  line-height: inherit;

  span {
    color: inherit;
    text-decoration: none;
    line-height: inherit;
  }
}
</style>
