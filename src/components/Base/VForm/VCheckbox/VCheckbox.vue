<script lang="ts" setup>
import { computed } from 'vue';
import type { CheckboxRootEmits, CheckboxRootProps } from 'radix-vue';
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'radix-vue';

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
        <svg
          class="v-checkbox__icon"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="#48535C"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="square-check 1"
            clip-path="url(#clip0_381_5240)"
          >
            <path
              d="M12 0H0V12H12V0ZM9.02679 4.74107L5.59821 8.16964L5.14286 8.625L4.6875
            8.16964L2.97321 6.45536L2.51786 6L3.42857 5.09196L3.88393 5.54732L5.14286 6.80625L8.11607
            3.83036L8.57143 3.375L9.47946 4.28571L9.02411 4.74107H9.02679Z"
            />
          </g>
          <defs>
            <clipPath id="clip0_381_5240">
              <rect
                width="12"
                height="12"
                fill="white"
              />
            </clipPath>
          </defs>
        </svg>
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
    fill: colors.$primary;
    width: 16px;
    height: 16px;
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
  .v-checkbox__icon {
      opacity: 1;
    }
    .v-checkbox__icon-wrap {
      border-color: colors.$primary;
    }
}

</style>
