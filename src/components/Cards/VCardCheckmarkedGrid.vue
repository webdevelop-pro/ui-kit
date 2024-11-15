<script setup lang="ts">
import {
  PropType, computed,
} from 'vue';
import VCardCheckmarked from 'UiKit/components/Cards/VCardCheckmarked.vue';

import VSectionShort from 'UiKit/components/Section/VSectionShort.vue';

interface ICardCheckmarkedGrid {
  title: string;
  description: string;
}

const props = defineProps({
  data: {
    type: Object as PropType<ICardCheckmarkedGrid[]>,
    required: true,
  },
  title: String,
  subtitle: String,
});

const isThreeColumns = computed(() => (props.data.length === 3));
const isFiveColumns = computed(() => (props.data.length === 5));
</script>

<template>
  <section class="VCardCheckmarkedGrid v-card-checkmarked-grid">
    <div class="is--container">
      <VSectionShort>
        <h2 v-if="title">
          {{ title }}
        </h2>
        <p
          v-if="subtitle"
          class="is--subheading-1"
          v-html="subtitle"
        />
      </VSectionShort>
      <template v-if="isFiveColumns">
        <div class="is--two-col-grid is--three">
          <VCardCheckmarked
            v-for="(item, i) in data.slice(0, 3)"
            :key="i"
            card
            :title="item.title"
            :description="item.description"
            class="v-card-checkmarked-grid__item"
          />
        </div>
        <div
          class="is--two-col-grid"
        >
          <VCardCheckmarked
            v-for="(item, i) in data.slice(3, 5)"
            :key="i"
            card
            :title="item.title"
            :description="item.description"
          />
        </div>
      </template>
      <div
        v-else
        class="is--two-col-grid"
        :class="{ 'is--three': isThreeColumns }"
      >
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
