<script lang="ts" setup>
</script>

<template>
  <ol
    class="VBreadcrumbList v-breadcrumb-list"
    itemscope
    itemtype="https://schema.org/BreadcrumbList"
  >
    <slot />
  </ol>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-breadcrumb-list {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-wrap: break-word;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
