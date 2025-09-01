<script setup lang="ts">
</script>

<template>
  <li
    role="group"
    v-bind="$attrs"
    class="VCarouselItem v-carousel-item"
    aria-roledescription="slide"
    itemprop="associatedMedia"
  >
    <slot />
  </li>
</template>

<style lang="scss">
.v-carousel-item {
  width: 100%;
  list-style: none;
}
</style>