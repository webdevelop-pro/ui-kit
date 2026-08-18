<script setup lang="ts">
import {
  SelectContent,
  type SelectContentEmits,
  type SelectContentProps,
  SelectPortal,
  SelectViewport,
  useForwardPropsEmits,
} from 'reka-ui';
import { computed, type HTMLAttributes } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps</* @vue-ignore */ SelectContentProps & { class?: HTMLAttributes['class'] }>(),
  {
    position: 'popper',
  },
);
const emits = defineEmits</* @vue-ignore */ SelectContentEmits>();

const delegatedProps = computed(() => {
  const { class: unused, ...delegated } = props;
  void unused; // Explicitly mark as intentionally unused

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <SelectPortal>
    <SelectContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="props.class"
      class="VSelectContent v-select-content"
    >
      <SelectViewport class="v-select-viewport">
        <slot />
      </SelectViewport>
    </SelectContent>
  </SelectPortal>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;

.v-select-content {
  padding-left: 0;
    list-style-type: none;
    background-color: colors.$gray-10;
    border: solid 1px colors.$gray-20;
    box-shadow: variables.$box-shadow-medium;
    border-radius: 2px;
    max-height: 222px;
    overflow: scroll;
    width: var(--reka-select-trigger-width);
    z-index: 1101;
    display: flex;
  // flex-direction: column;
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
