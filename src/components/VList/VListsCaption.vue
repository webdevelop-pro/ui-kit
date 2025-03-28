<script setup lang="ts">
import { PropType } from 'vue';

interface IListsCaption {
  url?: string;
  text: string;
}

defineProps({
  items: {
    type: Object as PropType<IListsCaption[]>,
    required: true,
  },
});
</script>

<template>
  <div class="VListsCaption v-list-caption is--list-pointers">
    <ul>
      <li
        v-for="(caption, index) in items"
        :key="index"
      >
        <a
          v-if="caption.url"
          :href="encodeURI(caption.url)"
          class="is--link-1"
        >
          {{ caption.text }}
        </a>
        <span
          v-else
          class="is--h5__title v-list-caption__text"
        >
          {{ caption.text }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;

.v-list-caption {
  &__text {
    color: $black;
  }
}
</style>
