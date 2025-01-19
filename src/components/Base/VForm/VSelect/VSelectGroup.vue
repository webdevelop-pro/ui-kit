<script setup lang="ts">
import { SelectGroup, type SelectGroupProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';

const props = defineProps<SelectGroupProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <SelectGroup
    :class="props.class"
    v-bind="delegatedProps"
    class="VSelectGroup v-select-group"
  >
    <slot />
  </SelectGroup>
</template>

<style lang="scss">
.v-select-group {
  width: 100%;
}
</style>
