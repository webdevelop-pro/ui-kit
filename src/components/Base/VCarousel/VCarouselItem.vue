<script setup lang="ts">
</script>

<template>
  <div
    role="group"
    v-bind="$attrs"
    class="VCarouselItem v-carousel-item"
    aria-roledescription="slide"
  >
    <slot />
  </div>
</template>

<style lang="scss">
.v-carousel-item {
  width: 100%;
  list-style: none;
}
</style>