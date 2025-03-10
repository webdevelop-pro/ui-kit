<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  size?: 'medium' | 'small';
  color?: 'primary' | 'secondary'| 'secondary-light' | 'red' | 'yellow' | 'red-light' | 'yellow-light' | 'purple-light' | 'default';
  isActive?: boolean;
  hover?: boolean;
}>(), {
  size: 'medium',
});

const classes = computed(() => {
  let res = `is--size-${props.size}`;
  if (props.color) res += ` is--badge-color-${props.color}`;
  if (props.isActive) res += ' is--active';
  if (props.hover) res += ' is--hover';
  return res;
});

</script>

<template>
  <span
    class="VBadge v-badge"
    :class="[classes]"
    v-bind="$attrs"
  >
    <slot />
  </span>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-badge {
  color: colors.$gray-70;
  font-family: 'Avenir';
  text-decoration: none;
  border-radius: 24px;
  font-size: 12px;
  line-height: 18px;
  background-color: colors.$gray-30;
  display: inline-block;
  white-space: nowrap;

  &.is--size-medium {
    padding: 8px 12px;
    font-weight: 800;
  }
  &.is--size-small {
    padding: 0 6px;
    font-weight: 500;
  }

  &.is--hover {
    cursor: pointer;
  }

  &.is--badge-color-primary {
    background-color: colors.$primary;
    color: colors.$white;
    &.is--active,
    &.is--hover:hover {
      background-color: colors.$primary-dark;
    }
  }

  &.is--badge-color-secondary {
    background-color: colors.$secondary;
    &.is--active,
    &.is--hover:hover {
      background-color: colors.$secondary-dark;
    }
  }

  &.is--badge-color-secondary-light {
    background-color: colors.$secondary-light;
    &.is--active,
    &.is--hover:hover {
      background-color: colors.$secondary;
    }
  }

  &.is--badge-color-red {
    background-color: colors.$red;
    color: colors.$white;
    &.is--active,
    &.is--hover:hover {
      background-color: colors.$red-dark;
    }
  }

  &.is--badge-color-yellow {
    background-color: colors.$yellow;
    &.is--active,
    &.is--hover:hover {
      background-color: colors.$yellow-dark;
    }
  }
  &.is--badge-color-red-light {
    background-color: colors.$red-light;
    &.is--active,
    &.is--hover:hover {
      background-color: colors.$red;
    }
  }
  &.is--badge-color-yellow-light {
    background-color: colors.$yellow-light;
    &.is--active,
    &.is--hover:hover {
      background-color: colors.$yellow;
    }
  }
  &.is--badge-color-purple-light {
    background-color: colors.$purple-light;
    &.is--active,
    &.is--hover:hover {
      background-color: colors.$purple;
    }
  }
  &.is--badge-color-default {
    // default color
  }
}
</style>
