<script lang="ts" setup>
import {
  VueCollapsiblePanelGroup,
} from '@swoga/vue-collapsible-panel';

// IMPORTANT: before using this component you need to install library
// type in the terminal: yarn add @swoga/vue-collapsible-panel

</script>

<template>
  <VueCollapsiblePanelGroup
    class="VAccordion v-accordion"
    accordion
  >
    <slot />
  </VueCollapsiblePanelGroup>
</template>

<style lang="sass">
.v-accordion
  background-color: transparent
</style>
