<script lang="ts" setup>
import {
  VueCollapsiblePanelGroup,
} from '@dafcoe/vue-collapsible-panel';

</script>

<template>
  <VueCollapsiblePanelGroup
    class="BaseAccordion base-accordion"
    accordion
  >
    <slot />
  </VueCollapsiblePanelGroup>
</template>

<style lang="sass" scoped>
.base-accordion
  background-color: transparent
</style>
