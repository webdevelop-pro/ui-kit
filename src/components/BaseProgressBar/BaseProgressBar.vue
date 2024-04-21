<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps({
  total: {
    type: Number,
    default: 100,
  },
  current: {
    type: Number,
    required: true,
    default: 0,
  },
});

const progress = computed(() => {
  const rawProgress = (props.current / props.total) * 100;
  return parseFloat(rawProgress.toFixed(2));
});
</script>

<template>
  <section class="BaseProgressBar base-progressbar">
    <div class="base-progressbar__top is--h5__title">
      {{ progress }}% Funded
    </div>
    <div class="base-progressbar__progress">
      <div class="base-progressbar__progress-bar" :style="{ width: progress + '%' }">
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.base-progressbar {
  $root: &;

  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 8px;
  flex: 1 0 0;

  &__top {
    color: $secondary-dark;
  }

  &__progress {
    display: flex;
    align-items: flex-end;
    align-self: stretch;
    height: 3px;
    flex: 1 0 0;
    border-radius: 2px;
    background: $gray-30;
  }

  &__progress-bar {
    height: 3px;
    background: $secondary;
  }
}
</style>
