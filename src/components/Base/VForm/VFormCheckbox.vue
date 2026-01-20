<script lang="ts" setup>
import { computed, useId } from 'vue';
import VFormLabel from 'UiKit/components/Base/VForm/VFormLabel.vue';
import VCheckbox from 'UiKit/components/Base/VForm/VCheckbox/VCheckbox.vue';
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
  const { class: unused, ...delegated } = props;
  void unused; // Explicitly mark as intentionally unused

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
const modelValue = defineModel<boolean>();
</script>

<template>
  <div
    class="VFormCheckbox v-form-checkbox"
    :class="[props.class, {
      'is--readonly': readonly,
      'is--disabled': disabled,
      'is--error': isError,
    }]"
  >
    <VCheckbox
      v-bind="forwarded"
      :id="inputId"
      :checked="modelValue"
      @update:checked="modelValue = $event"
    />
    <VFormLabel
      v-bind="forwarded"
      :for="inputId"
      :has-asterisk="hasAsterisk"
      :class="{ 'is--checked': modelValue }"
      class="v-form-checkbox__label"
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

  &.is--readonly {
    pointer-events: none;
  }

  &.is--disabled {
    pointer-events: none;
    #{$root}__icon-wrap {
      opacity: .3;
    }
  }

  &__label {
    cursor: pointer;
  }
}
</style>
