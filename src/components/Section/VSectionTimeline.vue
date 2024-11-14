<script setup lang="ts">
import { PropType, computed, ref } from 'vue';
import { ICaseStudiesTimelineItem } from '../../types/useCase';
import VTimeline from 'UiKit/components/VTimeline/VTimeline.vue';
import VTimelineItem from 'UiKit/components/VTimeline/VTimelineItem.vue';
import VTimelineCard from 'UiKit/components/VTimeline/VTimelineCard.vue';
import VButton from 'UiKit/components/VButton/VButton.vue';
import { useBreakpoints } from 'UiKit/composables/useBreakpoints';
import { storeToRefs } from 'pinia';


const { isTablet } = storeToRefs(useBreakpoints());

const props = defineProps({
  data: {
    type: Object as PropType<ICaseStudiesTimelineItem[]>,
    required: true,
  },
  prev: String,
  next: String,
  topic: String,
});

const showAll = ref(false);
const length = computed(() => props.data.length);
const buttonText = computed(() => {
  if (isTablet.value) return 'Leave Your Email';
  return 'Leave Us Your Email For Further Details';
});
</script>

<template>
  <section class="VSectionTimeline case-studies-timeline is--background-gray-10">
    <div class="is--container">
      <VTimeline
        title="Project Timeline"
      >
        <VTimelineItem
          v-for="(dataItem, index) in data.slice(0, 1)"
          :key="index"
          :circle-type="dataItem.circleType"
          class="case-studies-timeline__always-visble"
          :class="{ 'is--show-all': showAll }"
        >
          <VTimelineCard
            v-for="(item, i) in dataItem.items"
            :key="i"
            :title="item.title"
            :duration="item.duration"
            :variant="item.variant"
            :type="item.type"
          >
            <div class="case-studies-timeline__card-description">
              <p>
                {{ item.text }}
              </p>
            </div>
          </VTimelineCard>
        </VTimelineItem>
        <VTimelineItem
          v-for="(dataItem, index) in data.slice(1, length)"
          v-show="showAll"
          :key="index"
          :circle-type="dataItem.circleType"
        >
          <VTimelineCard
            v-for="(item, i) in dataItem.items"
            :key="i"
            :title="item.title"
            :duration="item.duration"
            :variant="item.variant"
            :type="item.type"
          >
            <div class="case-studies-timeline__card-description">
              <p>
                {{ item.text }}
              </p>
            </div>
          </VTimelineCard>
        </VTimelineItem>
      </VTimeline>
      <div
        v-if="!showAll"
        class="case-studies-timeline__button-wrap"
      >
        <VButton
          tag="a"
          :href="`/get-started.html?topic=${topic}&text=Leave Us Your Email`"
          variant="outlined"
          size="large"
          block
          class="case-studies-timeline__button is--no-margin"
        >
          {{ buttonText }}
        </VButton>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.case-studies-timeline {
  display: flex;
  flex-direction: column;

  &__always-visble {
    &:not(.is--show-all):nth-child(2) {
      &.v-timeline-item::before {
        background: linear-gradient($gray-30, rgba($gray-30, 0)) !important;
      }
    }
  }

  &__button {
    max-width: 692px;
    min-height: 48px;
    padding: 12px 20px;
    height: auto;
  }

  &__button-wrap {
    max-width: 740px;
    margin: 0 auto;
    width: 100%;
    justify-content: flex-end;
    display: flex;
    @include media-lte(tablet) {
      padding-left: 60px;
    }
  }
}
</style>
