<script setup lang="ts">
import { computed, PropType } from 'vue';
import VSection from 'UiKit/components/VSection/VSection.vue';
import VCardFeaturesHover, { IVCardFeaturesHover } from 'UiKit/components/VCard/VCardFeaturesHover.vue';
import VCardFeatures from 'UiKit/components/VCard/VCardFeatures.vue';

const props = defineProps({
  title: String,
  subTitle: String,
  items: Array as PropType<IVCardFeaturesHover[]>,
  buttonHref: String,
  buttonText: String,
});

const emit = defineEmits(['click']);
const noData = computed(() => props.items?.length === 0);
</script>

<template>
  <VSection
    :title="title"
    :sub-title="subTitle"
    :button-href="buttonHref"
    :button-text="buttonText"
    :no-data="noData"
    class="VSectionCardFeaturesGrid v-section-card-features-grid"
  >
    <template #infoShort>
      <slot name="infoShort" />
    </template>
    <div
      class="is--list-features"
    >
      <template 
        v-for="(item, i) in items"
        :key="i"
      >
        <VCardFeaturesHover
          v-if="item.url"
          :href="encodeURI(item.url)"
          button-text="Read More"
          @click="emit('click')"
        >
          <h3>
            {{ item.title }}
          </h3>
        </VCardFeaturesHover>

        <VCardFeatures
          v-else
          class="v-section-card-features-grid__card"
        >
          <div class="v-section-card-features-grid__card-content">
            <h3>
              {{ item.title }}
            </h3>
          </div>
        </VCardFeatures>
      </template>
    </div>
  </VSection>
</template>

<style lang="scss">
.v-section-card-features-grid {
  width: 100%;

  &__card {
    min-height: 200px;
    text-align: center;
  }

  &__card-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }
}
</style>
