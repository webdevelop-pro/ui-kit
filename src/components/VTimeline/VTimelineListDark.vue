<script setup lang="ts">
import VTimeline from 'UiKit/components/VTimeline/VTimeline.vue';
import VTimelineItem from 'UiKit/components/VTimeline/VTimelineItem.vue';
import { useBreakpoints } from 'UiKit/composables/useBreakpoints';
import { storeToRefs } from 'pinia';
import { PropType, computed } from 'vue';

const { isTablet } = storeToRefs(useBreakpoints());
const textClass = computed(() => (isTablet.value ? 'is--small' : 'is--body'));

export interface ITimelineListDark {
  date: string;
  title: string;
  text?: string;
  circleType?: string;
  line?: string;
}

defineProps({
  data: {
    type: Object as PropType<ITimelineListDark[]>,
    required: true,
  },
});
</script>

<template>
  <div class="VTimelineListDark v-timeline-list-dark">
    <VTimeline>
      <VTimelineItem
        v-for="(item, index) in data"
        :key="index"
        :circle-type="item.circleType"
        :line="item.line"
        class="v-timeline-list-dark__item"
      >
        <div class="v-timeline-list-dark__item-info">
          <div class="v-timeline-list-dark__item-date is--h5__title">
            {{ item.date }}
          </div>
          <div class="v-timeline-list-dark__item-title is--h3__title">
            {{ item.title }}
          </div>
          <p
            class="v-timeline-list-dark__item-text"
            :class="textClass"
            v-html="item.text"
          />
        </div>
      </VTimelineItem>
    </VTimeline>
  </div>
</template>

<style lang="scss">
.v-timeline-list-dark {
  margin: 60px auto 0;
  max-width: 712px;

  &__item {
    --top: 8px;
  }

  &__item-info {
    padding-top: 8px;
  }

  &__item-date {
    color: $primary;
  }

  &__item-title {
    margin-top: 12px !important;
  }

  &__item-text {
    color: $gray-10;
    opacity: 0.8;
  }
}
</style>
