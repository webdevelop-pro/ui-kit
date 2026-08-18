<script setup lang="ts">
import VHighlightBase from './VHighlightBase.vue';
</script>

<template>
  <VHighlightBase
    class="VHighlightTwoCols v-highlight-two-cols"
    v-bind="$attrs"
  >
    <div class="is--two-col-grid is--gap-80 is--cols-auto-left is--mobile-gap-40">
      <div class="v-highlight-two-cols__column is--max-width-508">
        <slot name="left" />
      </div>
      <div class="v-highlight-two-cols__column">
        <slot name="right" />
      </div>
    </div>
  </VHighlightBase>
</template>

<style lang="scss">
.v-highlight-two-cols {
  width: 100%;

  &__column {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>


