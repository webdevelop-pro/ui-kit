<script setup lang="ts">
import VSectionTwoCol from 'UiKit/components/VSection/VSectionTwoCol.vue';
import VCardWithNumber from 'UiKit/components/VCard/VCardWithNumber.vue';
import { computed, PropType } from 'vue';

const props = defineProps({
  items: Array as PropType<string[]>,
  position: {
    type: String as PropType<'left' | 'right'>,
    default: 'right',
  },
  title: String,
  subtitle: String,
  linkText: String,
  linkHref: String,
  mobileReverse: {
    type: Boolean,
  },
});

const mobileReverseLocal = computed(() => {
  if (!props.mobileReverse) return props.position !== 'right';
  return props.mobileReverse;
});
const isPositionOther = computed(() => ((props.position === 'left') ? 'right' : 'left'));
</script>

<template>
  <VSectionTwoCol
    class="VSectionCardWithNumber v-section-with-number"
    :mobile-reverse="mobileReverseLocal"
  >
    <template #infoShort>
      <slot name="infoShort" />
    </template>
    <template #[isPositionOther]="slotProps">
      <div
        class="with-default-distance is--align-self-center"
        :class="slotProps.class"
      >
        <slot :name="isPositionOther">
          <h2 v-if="title">
            {{ title }}
          </h2>
          <div
            v-if="subtitle"
            class="is--subheading-2"
            v-html="subtitle"
          />
          <a
            v-if="linkHref && linkText"
            class="is--link-1"
            :href="encodeURI(linkHref)"
          >
            {{ linkText }}
          </a>
        </slot>
      </div>
    </template>
    <template #[position]="slotProps">
      <div
        class="is--card v-section-with-number__cards"
        :class="slotProps.class"
      >
        <VCardWithNumber
          v-for="(itemNumbered, inumb) in items"
          :key="inumb"
          :index="inumb + 1"
          :text="itemNumbered"
        />
      </div>
    </template>
  </VSectionTwoCol>
</template>

<style lang="scss">
.v-section-with-number {
  &__cards {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
}
</style>
