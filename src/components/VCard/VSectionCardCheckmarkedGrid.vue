<script setup lang="ts">
import {
  PropType, computed,
} from 'vue';
import VCardCheckmarked from 'UiKit/components/VCard/VCardCheckmarked.vue';
import VSection from 'UiKit/components/VSection/VSection.vue';

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
  linkHref: String,
  linkText: String,
});

const isThreeColumns = computed(() => (props.data.length === 3));
const isFiveColumns = computed(() => (props.data.length === 5));
</script>

<template>
  <VSection
    :title="title"
    :sub-title="subtitle"
    :link-href="linkHref"
    :link-text="linkText"
    class="VSectionCardCheckmarkedGrid"
  >
    <template #infoShort>
      <slot name="infoShort" />
    </template>
    <template v-if="isFiveColumns">
      <div
        class="is--two-col-grid is--three"
      >
        <VCardCheckmarked
          v-for="(item, i) in data.slice(0, 3)"
          :key="i"
          card
          :title="item.title"
          :description="item.description"
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
  </VSection>
</template>
