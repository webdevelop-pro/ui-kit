<script setup lang="ts">
import type { ComboboxRootEmits, ComboboxRootProps } from 'reka-ui';
import { ComboboxRoot, useForwardPropsEmits } from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';

const props = withDefaults(defineProps</* @vue-ignore */ ComboboxRootProps & { class?: HTMLAttributes['class'] }>(), {
  open: true,
  modelValue: '',
});

const emits = defineEmits</* @vue-ignore */ ComboboxRootEmits>();

const delegatedProps = computed(() => {
  const { class: unused, ...delegated } = props;
  void unused; // Explicitly mark as intentionally unused

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <ComboboxRoot
    v-bind="forwarded"
    :class="props.class"
    class="VCommand v-command"
  >
    <slot />
  </ComboboxRoot>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;

.v-command {
  padding-left: 0;
    list-style-type: none;
    background-color: colors.$gray-10;
    border: solid 1px colors.$gray-20;
    box-shadow: variables.$box-shadow-medium;
    border-radius: 2px;
    max-height: 222px;
    overflow: scroll;
    width: var(--reka-select-trigger-width);
    z-index: 10;
    display: flex;
  flex-direction: column;
  // position: fixed;
  // min-width: 175px;
  // left: 636px;
  // bottom: 0px;
  // height: 638px;
  // margin: 10px 0px;
  // min-height: 125px;
  // max-height: 950px;
  // z-index: 100;
}
</style>
