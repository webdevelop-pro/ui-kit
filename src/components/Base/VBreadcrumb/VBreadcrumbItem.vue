<script lang="ts" setup>
</script>

<template>
  <li class="VBreadcrumbItem v-breadcumb-item">
    <slot />
  </li>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-breadcumb-item {
    gap: 8px;
    display: flex;
    margin: 0;

    a[href=""],
    a:not([href]){
      line-height: inherit;
      color: colors.$gray-50;
      pointer-events: none;
    }
}
</style>
