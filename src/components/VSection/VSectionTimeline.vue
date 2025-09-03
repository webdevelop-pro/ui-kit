<script setup lang="ts">
import { PropType, computed } from 'vue';
import { ICaseStudiesTimelineItem } from '../../types/useCase';
import VTimeline from 'UiKit/components/Base/VTimeline/VTimeline.vue';
import VTimelineItem from 'UiKit/components/Base/VTimeline/VTimelineItem.vue';
import VTimelineCard from 'UiKit/components/Base/VTimeline/VTimelineCard.vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import { useBreakpoints } from 'UiKit/composables/useBreakpoints';
import { storeToRefs } from 'pinia';
import VSection from 'UiKit/components/VSection/VSection.vue';

const { isTablet } = storeToRefs(useBreakpoints());

const props = defineProps({
  data: {
    type: Object as PropType<ICaseStudiesTimelineItem[]>,
    required: true,
  },
  topic: String,
  title: String,
  showAll: Boolean,
  horizontal: Boolean,
});

const length = computed(() => props.data.length);
const buttonText = computed(() => {
  if (isTablet.value) return 'Leave Your Email';
  return 'Leave Us Your Email For Further Details';
});
</script>

<template>
  <VSection class="VSectionTimeline case-studies-timeline">
    <VTimeline
      :title="title"
      :horizontal="horizontal"
    >
      <template #title>
        <slot name="title" />
      </template>
      <VTimelineItem
        v-for="(dataItem, index) in data.slice(0, 1)"
        :key="index"
        :circle-type="dataItem.circleType"
        class="case-studies-timeline__always-visble"
        :class="{ 'is--show-all': showAll }"
        :line="!showAll ? 'hidden' : 'regular'"
        :horizontal="horizontal"
        :title="dataItem.title"
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
        :horizontal="horizontal"
        :title="dataItem.title"
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
        as="a"
        :href="encodeURI(`/get-started.html?topic=${topic}&text=Leave Us Your Email`)"
        variant="outlined"
        size="large"
        block
        class="case-studies-timeline__button "
      >
        {{ buttonText }}
      </VButton>
    </div>
  </VSection>
</template>

<style lang="scss">
.case-studies-timeline {
  display: flex;
  flex-direction: column;
  overflow: hidden;

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
