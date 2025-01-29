<script setup lang="ts">
import {
  TabsTrigger, type TabsTriggerProps, useForwardProps,
} from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';
import VBadge from 'UiKit/components/Base/VBadge/VBadge.vue';

  const props = withDefaults(defineProps<TabsTriggerProps & {
  class?: HTMLAttributes['class'];
  variant?: 'primary' | 'secondary';
}>(), {
  variant: 'primary',
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <TabsTrigger
    v-bind="forwardedProps"
    class="VTabsTrigger v-tabs-trigger"
    :class="[props.class, `is--variant-${variant}`]"
  >
    <span :class="variant === 'primary' ? 'is--h5__title' : 'is--small-2'">
      <slot />
    </span>
    <VBadge
      v-if="$slots.subtitle"
      size="small"
      class="v-tabs-trigger__subtitle"
    >
      <slot name="subtitle" />
    </VBadge>
  </TabsTrigger>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;
.v-tabs-trigger {
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: colors.$gray-60;
  flex-shrink: 0;
  z-index: 1;
  transition: color 0.3s ease;

  &__subtitle {
    margin-top: 0 !important;
    transition: color 0.3s ease;
    @media screen and (max-width: 576px) {
      display: none;
    }
  }

  &.is--variant-primary {
    padding: 8px 16px;
    gap: 8px;
    border-bottom: 2px solid transparent;

    &:hover {
      color: colors.$primary;
    }
  }
  &.is--variant-secondary {
    padding: 3px 12px;
    gap: 4px;
    align-self: stretch;
    border-radius: 2px;
    transition: all 0.3s ease;

    &:hover {
      background-color: colors.$white;
      color: colors.$black;
      box-shadow: variables.$box-shadow-small;
    }
  }
}

.v-tabs-trigger[data-state='active'] {
  &.is--variant-primary {
    color: colors.$black;
    border-color: colors.$primary;

    .v-tabs-trigger__subtitle {
      background-color: colors.$primary;
      color: colors.$white;
    }
  }

  &.is--variant-secondary {
    background-color: colors.$white;
    color: colors.$black;
    box-shadow: variables.$box-shadow-small;
  }
}
</style>
