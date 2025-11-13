<script setup lang="ts">
import { PropType } from 'vue';

interface IHighlightInfo {
  title: string;
  text: string;
}

defineProps({
  data: {
    type: Object as PropType<IHighlightInfo>,
    required: true,
  },
});
</script>

<template>
  <div
    v-if="data"
    class="VInfoHighlight v-info-highlight"
  >
    <h6
      v-if="data.title"
      class="is--h6__title"
    >
      {{ data.title }}
    </h6>
    <p
      v-if="data.text"
      v-dompurify-html="data.text"
      class="is--small"
    />
  </div>
</template>

<style lang="scss">
.v-info-highlight {
    & + & {
      margin-top: 20px;
    }
}
</style>
