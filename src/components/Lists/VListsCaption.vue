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
  <div class="VListsCaption v-list-caprion is--list-pointers">
    <ul>
      <li
        v-for="(caption, index) in items"
        :key="index"
      >
        <a
          v-if="caption.url"
          :href="caption.url"
          class="is--link-1"
        >
          {{ caption.text }}
        </a>
        <span
          v-else
          class="is--h5__title"
        >
          {{ caption.text }}
        </span>
      </li>
    </ul>
  </div>
</template>


<style lang="sass">
</style>
