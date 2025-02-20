<script lang="ts" setup>
</script>

<template>
  <nav
    aria-label="breadcrumb"
    class="VBreadcrumb v-breadcrumb"
  >
    <slot />
  </nav>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as *;

.v-breadcrumb {
  & + * {
    margin-top: 40px;
    @media screen and (max-width: $tablet) {
      margin-top: 60px;
    }
  }

  .is--container + .is--container:last-child & {
    margin-top: 90px;
    @media screen and (max-width: $tablet) {
      margin-top: 60px;
    }
  }
}
</style>
