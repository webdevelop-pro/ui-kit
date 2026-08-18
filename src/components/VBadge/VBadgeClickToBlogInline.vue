<script setup lang="ts">
import VBadgeClickToBlog from 'UiKit/components/VBadge/VBadgeClickToBlog.vue';
import { PropType } from 'vue';

defineProps({
  data: Array as PropType<string[]>,
});
</script>

<template>
  <ul
    v-if="data"
    :data="data"
    class="VBadgeClickToBlogInline v-badge-click-to-blog-inline is--tags-inline"
  >
    <li
      v-for="(text, i) in data"
      :key="i"
      class="v-badge-click-to-blog-inline__item"
    >
      <VBadgeClickToBlog
        :text="text"
      />
    </li>
  </ul>
</template>

<style lang="scss">
.v-badge-click-to-blog-inline {
  list-style: none;
  padding: 0;

  li {
    display: inline-flex;
    margin: 0 !important;
  }
}
</style>
