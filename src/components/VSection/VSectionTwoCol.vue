<script setup lang="ts">
import VSection from 'UiKit/components/VSection/VSection.vue';
import { PropType } from 'vue';

interface ISectionTwoColRight {
  title: string;
  text: string;
}

defineProps({
  title: String,
  right: Object as PropType<ISectionTwoColRight>,
  mobileReverse: Boolean,
});
</script>

<template>
  <VSection
    :title="title"
    class="VSectionTwoCol v-section-two-col"
    :class="{ 'is--mobile-reverse': mobileReverse }"
  >
    <template #infoShort>
      <slot name="infoShort" />
    </template>
    <div
      class="is--two-col-grid is--gap-80"
      :class="{ 'is--margin-top-20': $slots.infoShort }"
    >
      <slot>
        <slot
          name="left"
          class="v-section-two-col__left"
        />
        <slot
          name="right"
          class="v-section-two-col__right"
        >
          <div class="v-section-two-col__right-data">
            <h2 v-if="right?.title">
              {{ right?.title }}
            </h2>
            <p
              v-if="right?.text"
              class="is--subheading-2 is--margin-top-10"
              v-html="right?.text"
            />
          </div>
        </slot>
      </slot>
    </div>
  </VSection>
</template>

<style lang="scss">
.v-section-two-col {
  $root: &;

  &__right-data{
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  &.is--mobile-reverse {
    @media screen and (max-width: $tablet){
      [slot="content"]{
        order: 2;
      }
      #{$root}__left {
        order: 2;
      }
      #{$root}__right {
        order: 1;
      }
    }
  }
}
</style>
