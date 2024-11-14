<script setup lang="ts">

defineProps({
  index: [String, Number],
  text: String,
});
</script>

<template>
  <div class="VCardWithNumber v-card-with-number">
    <div class="v-card-with-number__index is--h2__title">
      {{ index }}
    </div>
    <div class="v-card-with-number__text">
      {{ text }}
    </div>
  </div>
</template>

<style lang="scss">
.v-card-with-number {
  display: flex;
  padding: 20px;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  border-radius: 2px;
  background: $gray-10;

  &__index {
    color: $primary;
  }

  &__text {
    opacity: 0.9;
    color: $gray-80;
  }
}
</style>
