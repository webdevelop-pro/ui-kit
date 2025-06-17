<script lang="ts" setup>
import { computed } from 'vue';
import VSpinner from 'UiKit/components/Base/VSpinner/VSpinner.vue';
import { Primitive, type PrimitiveProps } from 'radix-vue';

interface Props extends PrimitiveProps {
    as?: 'button' | 'a' | 'router-link';
    size?: 'large' | 'medium' | 'small';
    variant?: 'default' | 'outlined' | 'link' | 'tetriary' | 'social';
    color?: 'primary' | 'secondary' | 'red';
    block?: boolean;
    disabled?: boolean;
    loading?: boolean;
    squared?: boolean;
    pill?: boolean;
    iconOnly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  variant: 'default',
  color: 'primary',
  as: 'button',
});

const btnClassesProps = computed(() => {
  let classes = `is--button-color-${props.color} `;
  classes += `is--size-${props.size} `;
  classes += `is--variant-${props.variant} `;
  return classes;
});

const btnClasses = computed(() => ({
  'is--block': props.block,
  'is--icon-only': props.iconOnly,
  'is--disabled': props.disabled,
  'is--loading': props.loading,
  'is--squared': props.squared && !props.pill,
  'is--pill': props.pill && !props.squared,
}));

// const asChild = computed(() => props.as !== 'button');

</script>

<template>
  <component
    :is="(as === 'router-link') ? as : Primitive"
    :as="as"
    :as-child="asChild"
    class="VButton v-button"
    :class="[btnClassesProps, btnClasses]"
    :disabled="loading"
    v-bind="$attrs"
  >
    <span
      class="v-button__content"
    >
      <slot>Button</slot>
    </span>
    <VSpinner
      v-if="loading"
      show
      small
      class="v-button__spinner"
    />
  </component>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;

.v-button {
  $root: &;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: unset;
  font-weight: 700;
  flex-shrink: 0;
  background-color: transparent;
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  position: relative;
  transition: all .3s;
  box-shadow: variables.$box-shadow-small;
  text-decoration: none !important;

  &:hover {
    box-shadow: none;
  }

  svg,
  img {
    width: 18px;
    height: 18px;
  }

  &__content {
    transition: opacity .3s;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 100%;
    gap: 6px;
  }

  &.is--block {
    width: 100%;
  }

  &.is--squared {
    border-radius: 0;
  }

  &.is--pill {
    border-radius: 30px;
  }

  &.is--disabled {
    opacity: 0.3;
    pointer-events: none;
  }

  &.is--loading {
    pointer-events: none;

    #{$root}__content {
      opacity: 0.2;
    }
  }

  &.is--size-large {
    height: 64px;
    padding: 0 28px;
    font-size: 20px;
    line-height: normal;
  }

  &.is--size-medium{
    height: 48px;
    padding: 0 20px;
    font-size: 16px;
    line-height: 20px;
  }

  &.is--size-small {
    height: 32px;
    padding: 0 12px;
    font-size: 12px;
    line-height: 28px;

    svg,
    img {
      width: 15px;
      height: 15px;
    }
  }

  &.is--button-color-primary {
    background-color: colors.$primary-red;
    color: colors.$white;

    &:hover {
      background-color: colors.$primary-red-dark;
      color: colors.$white;
    }
  }

  &.is--button-color-secondary {
    background-color: colors.$green;
    color: colors.$black;

    &:hover{
      background-color: colors.$green;
    }
  }

  &.is--button-color-red {
    background-color: colors.$red;
    color: colors.$white;

    &:hover {
      background-color: colors.$red-dark;
      color: colors.$white;
    }
  }

  &.is--variant-default {
    &.is--button-color-primary {
      color: colors.$white;
      background-color: colors.$primary-red;
      border-color: colors.$primary-red;

      &:hover{
        background-color: colors.$primary-red-dark;
        border-color: colors.$primary-red-dark;
      }
    }

    &.is--button-color-secondary {
      color: colors.$black;
      background-color: colors.$secondary;
      border-color: colors.$secondary;

      &:hover {
        background-color: colors.$secondary-dark;
        border-color: colors.$secondary-dark;
      }
    }

    &.is--button-color-red {
      color: colors.$white;
      background-color: colors.$red;
      border-color: colors.$red;

      &:hover {
        background-color: colors.$red-dark;
        border-color: colors.$red-dark;
      }
    }
  }

  &.is--variant-outlined {
    background-color: colors.$white;

    &.is--button-color-primary {
      border-color: colors.$primary;
      color: colors.$primary;

      &:hover {
        background-color: colors.$primary;
        color: colors.$white;
      }
    }

    &.is--button-color-secondary {
      border-color: colors.$secondary;

      &:hover {
        background-color: colors.$secondary;
      }
    }

    &.is--button-color-red {
      border-color: colors.$red;
      color: colors.$red;

      &:hover {
        background-color: colors.$red;
        color: colors.$red;
      }
    }
  }

  &.is--variant-tetriary {
    &.is--button-color-primary {
      background-color: colors.$primary-light;
      border-color: colors.$primary-light;
      color: colors.$white;

      &:hover {
        background-color: colors.$primary;
        border-color: colors.$primary;
        color: colors.$white;
      }
    }

    &.is--button-color-secondary {
      background-color: colors.$primary-light;
      border-color: colors.$primary-light;

      &:hover {
        background-color: colors.$secondary;
        border-color: colors.$secondary;
      }
    }

    &.is--button-color-red {
      background-color: colors.$red-light;
      border-color: colors.$red-light;
      color: colors.$red;

      &:hover{
        background-color: colors.$red;
        border-color: colors.$red;
        color: colors.$white;
      }
    }
  }

  &.is--variant-link {
    background-color: transparent;
    box-shadow: none;
    border-color: transparent;

    &.is--button-color-primary {
      color: colors.$primary-red;

      &:hover {
        background-color: colors.$primary-red-light;
      }
    }

    &.is--button-color-secondary {
      color: colors.$black;

      &:hover {
        background-color: colors.$green;
      }
    }

    &.is--button-color-red {
      color: colors.$red;

      &:hover {
        background-color: colors.$red-light;
        color: colors.$white;
      }
    }

    &.is--icon-only {
      &:hover {
        background-color: rgb(66 84 102 / 0.5);
      }
    }
  }

  &.is--icon-only {
    padding: 9px;
    height: 48px;
    width: 48px;

    &.is--size-large {
      height: 64px;
      width: 64px;

      svg,
      img {
        width: 24px;
        height: 24px;
      }
    }

    &.is--size-small {
      height: 32px;
      width: 32px;
      padding: 7px;
    }

    &:hover {
      background-color: rgb(66 84 102 / 0.5);
    }
  }

  &.is--variant-social {
    background-color: rgb(252 252 252 / 0.1);
    border-color: transparent;
    color: colors.$white;

    &:hover {
      background-color: rgb(252 252 252 / 0.3);
    }
  }

  .with-default-distance &,
  &.with-default-distance {
    margin-top: 48px;

    @media screen and (width < $tablet){
      margin-top: 40px;
    }
  }
}
</style>
