<script setup lang="ts">
import { PropType } from 'vue';
import VCardTag from 'UiKit/components/Cards/VCardTag.vue';


export interface ICardTagList {
  tagText: string;
  text: string;
  tagColor?: string;
}

defineProps({
  data: {
    type: Object as PropType<ICardTagList[]>,
    required: true,
  },
});

</script>

<template>
  <section class="VCardTagList v-card-tag-list">
    <VCardTag
      v-for="(item, i) in data"
      :key="i"
      :tag-text="item.tagText"
      :text="item.text"
      :tag-color="item.tagColor"
    />
  </section>
</template>

<style lang="scss">
.v-card-tag-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 100%;
}
</style>
