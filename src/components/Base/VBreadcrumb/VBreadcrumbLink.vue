<script lang="ts" setup>
import { Primitive, type PrimitiveProps } from 'radix-vue';

const props = withDefaults(defineProps<PrimitiveProps>(), {
  as: 'a',
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    class="VBreadcrumbLink v-breadcumb-link is--h6__title"
  >
    <slot />
  </Primitive>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-breadcumb-link {
  color: inherit;
  text-decoration: none;
  line-height: inherit;
}
</style>
