<script setup lang="ts">
import VListCheckmarks from '../VList/VListCheckmarks.vue';

withDefaults(defineProps<{
  title?: string;
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  subtitle?: string;
  subtitle2?: string;
  text?: string;
  summary?: string;
  items?: string[];
  itemsText?: string;
}>(), {
  titleTag: 'h2',
});

</script>

<template>
  <div class="VTextBlockWithCheckmarks v-text-block-with-checkmarks with-default-distance">
    <slot>
      <slot name="title">
        <component
          :is="titleTag"
          v-if="title"
        >
          {{ title }}
        </component>
      </slot>
      <slot name="subtitle">
        <div
          v-if="subtitle"
          class="is--subheading-1"
        >
          {{ subtitle }}
        </div>
      </slot>
      <slot name="subtitle2">
        <div
          v-if="subtitle2"
          class="is--subheading-2"
        >
          {{ subtitle2 }}
        </div>
      </slot>
      <slot name="text">
        <p
          v-if="text"
          v-dompurify-html="text"
        />
      </slot>
      <slot name="list">
        <div class="is--margin-top-40">
          <p
            v-if="itemsText"
            class="is--margin-bottom-20"
          >
            {{ itemsText }}
          </p>
          <VListCheckmarks
            v-if="items?.length"
            :items="items"
            class="is--margin-top-0"
          />
        </div>
      </slot>
      
      <slot name="summary">
        <div
          v-if="summary"
          class="v-text-block-with-checkmarks__summary is--h5__title"
        >
          {{ summary }}
        </div>
      </slot>
    </slot>
  </div>
</template>

<style lang="scss">
.v-text-block-with-checkmarks {
  position: relative;

  &__summary {
    padding: 12px 0;
    border-bottom: 1px solid $gray-70;
    margin-top: 30px !important;
  }

  a:not([class]) {
    margin-top: 0 !important;
  }
}
</style>
