<script lang="ts" setup>
import { computed, useId } from 'vue';
import VFormLabel from './VFormLabel.vue';
import VCheckbox from './VCheckbox/VCheckbox.vue';
import type { CheckboxRootEmits, CheckboxRootProps } from 'radix-vue';
import { useForwardPropsEmits } from 'radix-vue';

const props = defineProps<CheckboxRootProps & {
  hasAsterisk?: boolean;
  isError?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  dataTestid?: string;
  class?: HTMLAttributes['class'];
}>();

const emits = defineEmits<CheckboxRootEmits>();

const inputId = useId();


const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <div
    class="VFormCheckbox v-form-checkbox"
    :class="props.class"
  >
    <VCheckbox
      :id="inputId"
      v-bind="forwarded"
    />
    <VFormLabel
      :for="inputId"
      :has-asterisk="hasAsterisk"
    >
      <slot />
    </VFormLabel>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-form-checkbox {
  $root: &;
  display: flex;
}
</style>
