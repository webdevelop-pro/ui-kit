<script lang="ts" setup>
</script>

<template>
  <li
    class="VBreadcrumbItem v-breadcumb-item"
    itemprop="itemListElement"
    itemscope
    itemtype="https://schema.org/ListItem"
  >
    <slot />
  </li>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-breadcumb-item {
    display: inline;
    margin: 0 !important;

    a[href=""],
    a:not([href]),
    span{
      line-height: inherit;
      color: colors.$gray-50;
      pointer-events: none;
    }
}
</style>
