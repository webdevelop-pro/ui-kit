<script setup lang="ts">
import { PropType } from 'vue';
import VImage from 'UiKit/components/Base/VImage/VImage.vue';
import VListsCaption from 'UiKit/components/VList/VListsCaption.vue';

export interface IDevelopmentStagesMiddle {
  image: string;
  number: string;
  title: string;
  text: string;
  captions?: {
    text: string;
    url?: string;
  }[];
}

defineProps({
  data: {
    type: Array as PropType<IDevelopmentStagesMiddle[]>,
    required: true,
  },
});
</script>

<template>
  <div class="VSectionDevelopmentStagesMiddle development-stages-middle is--list-pointers with-default-distance">
    <div class="is--container">
      <div
        v-for="item in data"
        :key="item.number"
        class="development-stages-middle__item"
      >
        <VImage
          loading="lazy"
          :src="item.image"
          alt="Development stages image"
          class="development-stages-middle__icon is--margin-top-0"
        />
        <div class="development-stages-middle__right">
          <div class="development-stages-middle__number is--h5__title">
            {{ item.number }}
          </div>
          <h2 class="is--margin-top-15 is--h3__title">
            {{ item.title }}
          </h2>

          <p>
            {{ item.text }}
          </p>

          <VListsCaption
            v-if="item.captions"
            :items="item.captions"
          />
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

  &__number {
    color: $primary;
  }
}
</style>
