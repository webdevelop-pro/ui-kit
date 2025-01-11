<script lang="ts" setup>
import VRelatedPages from './VRelatedPages.vue';
import VSection from 'UiKit/components/VSection/VSection.vue';

withDefaults(defineProps<{
    data: object;
}>(), {
});
</script>

<template>
  <VSection
    class="VSectionRelatedPages v-section-related-pages"
  >
    <template #infoShort>
      <div class="v-section-related-pages__title">
        <slot />
      </div>
    </template>
    <VRelatedPages
      :data="data"
    />
  </VSection>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;

.v-section-related-pages {
    * + & {
        margin-top: 60px;
    }
}
</style>
