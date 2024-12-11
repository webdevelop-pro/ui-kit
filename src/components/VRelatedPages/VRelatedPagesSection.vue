<script lang="ts" setup>
import VRelatedPages from './VRelatedPages.vue';

withDefaults(defineProps<{
    data: object;
}>(), {
});
</script>

<template>
  <div class="VRelatedPagesSection v-related-pages-section">
    <div class="v-related-pages-section__title">
      <slot />
    </div>
    <VRelatedPages
      :data="data"
      class="is--margin-top-40"
    />
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.sass' as colors;
@use 'UiKit/styles/_variables.sass' as variables;

.v-related-pages-section {
    * + & {
        margin-top: 60px;
    }
}
</style>
