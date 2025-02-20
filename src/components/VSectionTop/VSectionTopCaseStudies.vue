<script setup lang="ts">
import { computed, PropType } from 'vue';
import { ICaseStudies } from 'UiKit/types/useCase';
import VHighlightInfo from 'UiKit/components/VInfo/VInfoHighlight.vue';
import VTopInfo from 'UiKit/components/VInfo/VInfoTop.vue';
import VBadgeClickToBlogInline from 'UiKit/components/VBadge/VBadgeClickToBlogInline.vue';
import VSection from 'UiKit/components/VSection/VSection.vue';


const props = defineProps({
  data: {
    type: Object as PropType<ICaseStudies>,
    required: true,
  },
});

const highlight = computed(() => [
  {
    title: 'Expertise',
    text: props.data.expertise,
  },
  {
    title: 'Deliverables',
    text: props.data.deliverables,
  },
  {
    title: 'Tech Stack',
    text: props.data.techStack,
  },
]);
</script>

<template>
  <VSection class="VSectionTopCaseStudies case-studies-top">
    <div class="is--top is--flex-row">
      <VTopInfo
        :title="data.title"
        :subtitle="data.subtitle"
        :text="data.description"
        class="is--width-70"
      />

      <aside class="is--width-30">
        <VBadgeClickToBlogInline
          v-if="data.tags"
          :data="data.tags"
        />
        <div class="is--gt-tablet-show is--margin-top-40">
          <VHighlightInfo
            v-for="(item, index) in highlight"
            :key="index"
            :data="item"
          />
        </div>
      </aside>
    </div>
    <div class="is--lt-tablet-show is--margin-top-60">
      <VHighlightInfo
        v-for="(item, index) in highlight"
        :key="index"
        :data="item"
      />
    </div>
  </VSection>
</template>

<style lang="scss">
.case-studies-top {

  .is--top {
      @include media-lte(tablet) {
        flex-direction: column-reverse;
      }
  }
}
</style>
