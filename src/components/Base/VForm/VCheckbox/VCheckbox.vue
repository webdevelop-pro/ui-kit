<script lang="ts" setup>
import { computed } from 'vue';
import type { CheckboxRootEmits, CheckboxRootProps } from 'radix-vue';
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'radix-vue';
import check from 'UiKit/assets/images/check.svg';

const props = defineProps<CheckboxRootProps & {
  isError?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  class?: HTMLAttributes['class'];
}>();

const emits = defineEmits<CheckboxRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    :class="[props.class, {
      'is--readonly': readonly,
      'is--disabled': disabled,
      'is--error': isError,
    }]"
    class="VCheckbox v-checkbox"
  >
    <CheckboxIndicator class="v-checkbox__indicator">
      <slot>
        <check
          alt="check icon"
          class="v-checkbox__icon"
        />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-checkbox {
  $root: &;

    border: solid 1px colors.$black;
    border-radius: 2px;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    margin-right: 8px;
    position: relative;
    top: 5px;
    overflow: hidden;

  &__indicator {
    width: 100%;
    height: 100%;
    display: flex;
  }

  &__icon {
    color: colors.$white;
    width: 14px;
    height: 14px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &.is--readonly {
    pointer-events: none;
  }

  &.is--disabled {
    pointer-events: none;
    #{$root}__icon-wrap {
      opacity: .3;
    }
  }

  &__input:focus + #{$root}__icon-wrap {
    outline: none !important;
  }

  &.is--error {
    #{$root}__icon-wrap {
      border-color: colors.$red;
    }
  }
}
.v-checkbox[aria-checked="true"] {
  border-color: colors.$primary;
  background: colors.$primary;
  .v-checkbox__icon {
      opacity: 1;
    }
    .v-checkbox__icon-wrap {
      border-color: colors.$primary;
    }
}

</style>
