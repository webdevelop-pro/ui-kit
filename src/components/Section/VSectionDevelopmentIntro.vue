<script setup lang="ts">
import { PropType } from 'vue';
import { IDevelopmentIntro } from '../utils';

defineProps({
  data: {
    type: Object as PropType<IDevelopmentIntro[]>,
    required: true,
  },
});

</script>

<template>
  <section class="VSectionDevelopmentIntro development-intro">
    <div class="is--container">
      <div class="development-intro__container">
        <div
          v-for="(item, i) in data"
          :key="i"
          class="development-intro__item"
        >
          <div class="is--h2__title">
            {{ item.title }}
          </div>
          <p>
            {{ item.text }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.development-intro {
  width: 100%;

  &__container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 80px;

    @include media-lte(tablet) {
      grid-template-columns: repeat(1, 1fr);
      gap: 60px;
    }
  }

  &__item {
    display: flex;
    padding-left: 20px;
    flex-direction: column;
    align-items: flex-start;
    flex: 1 0 0;
    border-left: 2px solid $primary;
  }
}
</style>
