<script setup lang="ts">
import { PropType } from 'vue';

const currentYear = new Date().getFullYear();

interface IFooterBottom {
  href: string,
  text: string,
}

defineProps({
  items: Array as PropType<IFooterBottom[]>,
});
</script>

<template>
  <div class="VFooterBottom v-footer-bottom">
    <p class="is--container is--small">
      <template
        v-for="(item, index) in items"
        :key="index"
      >
        <a :href="item.href">{{ item.text }}</a> |
      </template>
      © {{ currentYear }} Pro Webdevelop, LLC.
    </p>
  </div>
</template>

<style lang="scss">
.v-footer-bottom {
    background-color: $black;
    padding: 10px 0 16px;
    @include media-lte(tablet) {
      padding-top: 51px;
    }
    p {
      color: $gray-50;
    }
}
</style>
