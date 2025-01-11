<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  size?: 'medium' | 'small';
  color?: 'primary' | 'secondary'| 'secondary-light';
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
}
</style>
