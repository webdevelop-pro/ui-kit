<script setup lang="ts">
import VTag from 'UiKit/components/VTag/VTag.vue';

defineProps({
  tagText: String,
  text: String,
  tagColor: String,
});
</script>

<template>
  <article class="VCardTag v-card-tag is--card">
    <div class="v-card-tag__top">
      <VTag
        round
        :background="tagColor"
      >
        {{ tagText }}
      </VTag>
    </div>
    <div class="v-card-tag__bottom">
      {{ text }}
    </div>
  </article>
</template>

<style lang="scss">
.v-card-tag {
  padding: 20px !important;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  &__top {
    display: flex;
    align-items: self-start;
    gap: 8px;
    align-self: stretch;
  }

  &__bottom {
    opacity: 0.9;
    color: $gray-80;
  }
}
</style>
