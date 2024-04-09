<script lang="ts" setup>
import {
  VueCollapsiblePanelGroup,
} from '@swoga/vue-collapsible-panel';

// IMPORTANT: before using this component you need to install library
// type in the terminal: yarn add @swoga/vue-collapsible-panel

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
