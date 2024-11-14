<script setup lang="ts">
import VCardCheckmarked from 'UiKit/components/Cards/VCardCheckmarked.vue';
import { PropType } from 'vue';


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
  <div class="VCardCheckmarkedTwoCol v-card-checkmarked-two-col is--two-col-grid is--gap-80 is--align-items-center">
    <div>
      <h3 v-if="title">
        {{ title }}
      </h3>
      <p
        v-if="subtitle"
        class="is--subheading-2"
        v-html="subtitle"
      />
      <a
        v-if="linkUrl && linkText"
        class="is--link-1 v-card-checkmarked-two-col__link"
        :href="linkUrl"
      >
        {{ linkText }}
      </a>
      <p
        v-if="text"
        class="is--subheading-2"
        v-html="text"
      />
    </div>
    <div>
      <VCardCheckmarked
        v-for="(item, i) in items"
        :key="i"
        :title="item"
      />
    </div>
  </div>
</template>

<style lang="scss">
.v-card-checkmarked-two-col {
  &__link {
    display: block;
    margin-bottom: 24px;
  }
}
</style>
