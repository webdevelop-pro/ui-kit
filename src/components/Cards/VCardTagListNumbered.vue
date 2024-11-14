<script setup lang="ts">
import { PropType } from 'vue';
import VCardTag from 'UiKit/components/Cards/VCardTag.vue';


defineProps({
  data: {
    type: Object as PropType<string[]>,
    required: true,
  },
});

</script>

<template>
  <section class="VCardTagListNumbered v-card-tag-list-numbered is--card">
    <VCardTag
      v-for="(item, i) in data"
      :key="i"
      :tag-text="i + 1 + ''"
      :index="i + 1"
      :text="item"
    />
  </section>
</template>

<style lang="scss">
.v-card-tag-list-numbered {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 100%;
}
</style>
