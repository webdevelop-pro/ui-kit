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

