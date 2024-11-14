<script setup lang="ts">
import { PropType } from 'vue';

export interface IDevelopmentStagesMiddle {
  image: string;
  number: string;
  title: string;
  text: string;
  items: string[];
}

defineProps({
  data: {
    type: Array as PropType<IDevelopmentStagesMiddle[]>,
    required: true,
  },
});
</script>

<template>
  <div class="VSectionDevelopmentStagesMiddle development-stages-middle is--list-pointers">
    <div class="is--container">
      <div
        v-for="item in data"
        :key="item.number"
        class="development-stages-middle__item"
      >
        <div class="development-stages-middle__left">
          <img
            loading="lazy"
            :src="item.image"
            alt="Development stages image"
            class="development-stages-middle__icon is--no-margin"
          />
        </div>
        <div class="development-stages-middle__right">
          <div class="development-stages-middle__number is--h5__title">
            {{ item.number }}
          </div>
          <h2 class="development-stages-middle__title is--h3__title">
            {{ item.title }}
          </h2>

          <p class="development-stages-middle__text">
            {{ item.text }}
          </p>

          <ul
            v-if="item.items"
            class="development-stages-middle__captions"
          >
            <li
              v-for="(caption, capInd) in item.items"
              :key="capInd"
            >
              <span class="is--h5__title">
                {{ caption }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.development-stages-middle {
  &__item {
    display: flex;
    align-items: center;
    gap: 80px;
    & + & {
      margin-top: 80px;
    }
    @include media-lte(tablet) {
      flex-direction: column-reverse;
      gap: 40px;
    }
  }

  &__icon {
    width: 100%;
    max-width: 170px;
  }

  &__left {
    width: 100%;
    max-width: 170px;
  }

  &__title {
    margin-top: 15px !important;
  }

  &__number {
    color: $primary;
  }

  &__text {
    opacity: 0.8;
  }

  &__captions {
    margin-top: 24px;
  }
}
</style>
