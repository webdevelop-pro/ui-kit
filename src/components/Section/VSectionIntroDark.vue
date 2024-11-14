<script setup lang="ts">
import { PropType } from 'vue';

interface IDigitalIntro {
  title: string;
  text: string;
  list: string[];
}

defineProps({
  data: {
    type: Array as PropType<IDigitalIntro[]>,
    required: true,
  },
  short: Boolean,
});
</script>

<template>
  <section class="VSectionIntroDark v-section-intro-dark is--highlight-black">
    <div class="is--container">
      <div
        class="v-section-intro-dark__container"
        :class="{ 'is--short': short }"
      >
        <div
          v-for="(item, i) in data"
          :key="i"
          class="is--border-left"
        >
          <h2
            v-if="item.title"
            class="is--h2__title"
          >
            {{ item.title }}
          </h2>
          <p
            v-if="item.text"
            v-html="item.text"
          />
          <ol
            v-if="item.list"
          >
            <li
              v-for="(listItem, lii) in item.list"
              :key="lii"
            >
              {{ listItem }}
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.v-section-intro-dark {
  &__container {
    display: flex;
    flex-direction: column;
    gap: 80px;
    @include media-lte(desktop-lg) {
      gap: 60px;
    }

    &.is--short{
      @include media-gt(desktop-lg) {
        max-width: 753px;
      }
    }
  }
}
</style>
