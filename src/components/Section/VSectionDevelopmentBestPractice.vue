<script setup lang="ts">
import { PropType } from 'vue';
import { ICardsWithCheckmark, IBestPractice } from '../utils';
import VSectionShort from 'UiKit/components/Section/VSectionShort.vue';
import VCardCheckmarked from 'UiKit/components/Cards/VCardCheckmarked.vue';

defineProps({
  data: {
    type: Object as PropType<ICardsWithCheckmark[]>,
    required: true,
  },
  dataInfo: {
    type: Object as PropType<IBestPractice>,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <section class="VSectionDevelopmentBestPractice development-best-practice">
    <div class="is--container">
      <VSectionShort>
        <h2 v-if="dataInfo?.title ">
          {{ dataInfo?.title }}
        </h2>
        <p
          v-if="dataInfo?.subtitle"
          class="is--subheading-1"
        >
          {{ dataInfo?.subtitle }}
        </p>
        <a
          v-if="dataInfo.linkUrl && dataInfo?.linkText"
          class="is--link-1"
          :href="dataInfo.linkUrl"
        >
          {{ dataInfo?.linkText }}
        </a>
      </VSectionShort>
      <div class="development-best-practice__wrap is--margin-top-40">
        <VCardCheckmarked
          v-for="(item, i) in data"
          :key="i"
          card
          :title="item.title"
          :description="item.description"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.development-best-practice {
  width: 100%;

  &__title-wrap {
    margin-bottom: 40px;
  }

  &__wrap {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px 30px;
    width: 100%;
    @include media-lte(tablet) {
      grid-template-columns: repeat(1, 1fr);
    }

    & + & {
      margin-top: 30px;
    }
  }
}
</style>
