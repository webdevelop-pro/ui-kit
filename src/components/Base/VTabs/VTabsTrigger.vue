<script setup lang="ts">
import {
  TabsTrigger, type TabsTriggerProps, useForwardProps,
} from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';
import VBadge from 'UiKit/components/Base/VBadge/VBadge.vue';

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'] }>();

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
  >
    <span class="is--h5__title">
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
.v-tabs-trigger {
  cursor: pointer;
  padding: 8px 16px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: colors.$gray-60;
  flex-shrink: 0;
  border-bottom: 2px solid transparent;
  bottom: -2px;
  gap: 8px;

  &:hover {
    color: colors.$primary;
  }

  &__subtitle {
    margin-top: 0 !important;
    @media screen and (max-width: 576px) {
      display: none;
    }
  }
}

.v-tabs-trigger[data-state='active'] {
  color: colors.$black;
  border-color: colors.$primary;

  .v-tabs-trigger__subtitle {
    background-color: colors.$primary;
    color: colors.$white;
  }
}
</style>
