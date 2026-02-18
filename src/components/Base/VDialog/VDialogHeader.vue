<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
  class?: HTMLAttributes['class']
}>();
</script>

<template>
  <div
    :class="props.class"
    class="VDialogHeader v-dialog-header"
  >
    <slot />
  </div>
</template>


<style lang="scss">  
.v-dialog-header {
  @media screen and (width < $tablet){
    padding-right: 54px;
  }
} 
</style>  
