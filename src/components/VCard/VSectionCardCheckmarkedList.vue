<script setup lang="ts">
import VCardCheckmarked from 'UiKit/components/VCard/VCardCheckmarked.vue';
import { PropType } from 'vue';
import VSectionTwoCol from 'UiKit/components/VSection/VSectionTwoCol.vue';

defineProps({
  title: String,
  subtitle: String,
  text: String,
  linkText: String,
  linkUrl: String,
  items: Array as PropType<string[]>,
});
</script>

<template>
  <VSectionTwoCol class="VSectionCardCheckmarkedList v-section-card-checkmarked-list">
    <template #left>
      <slot>
        <div class="v-section-card-checkmarked-list__left  with-default-distance">
          <h3 v-if="title">
            {{ title }}
          </h3>
          <div
            v-if="subtitle"
            class="is--subheading-2"
            v-html="subtitle"
          />
          <a
            v-if="linkUrl && linkText"
            class="is--link-1"
            :href="encodeURI(linkUrl)"
          >
            {{ linkText }}
          </a>
          <p
            v-if="text"
            class="is--margin-top-24"
            v-html="text"
          />
        </div>
      </slot>
    </template>
    <template #right>
      <div>
        <VCardCheckmarked
          v-for="(item, i) in items"
          :key="i"
          :title="item"
        />
      </div>
    </template>
  </VSectionTwoCol>
</template>

<style lang="scss">
.v-section-card-checkmarked-list {
  &__left {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
