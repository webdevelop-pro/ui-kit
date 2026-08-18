<script setup lang="ts">
import { PropType, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import dotsIcon from 'UiKit/assets/images/three-dots.svg';
import type { VMoreActionsItem } from './types';

const props = defineProps({
  items: {
    type: Array as PropType<VMoreActionsItem[]>,
    required: true,
  },
  triggerSize: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'small',
  },
  triggerVariant: {
    type: String as PropType<'default' | 'outlined' | 'link' | 'ghost'>,
    default: 'link',
  },
  /** Dropdown alignment relative to trigger */
  align: {
    type: String as PropType<'start' | 'center' | 'end'>,
    default: 'end',
  },
});

const emit = defineEmits<{
  (e: 'select', item: VMoreActionsItem): void;
}>();

const isOpen = ref(false);
const target = ref<HTMLElement | null>(null);

const toggle = () => {
  if (!props.items.length) return;
  isOpen.value = !isOpen.value;
};

const onSelect = (item: VMoreActionsItem) => {
  if (item.disabled) return;
  isOpen.value = false;
  emit('select', item);
};

onClickOutside(target, () => {
  isOpen.value = false;
});
</script>

<template>
  <div
    v-if="items.length"
    ref="target"
    class="VMoreActions v-more-actions"
  >
    <VButton
      :size="triggerSize"
      :variant="triggerVariant"
      class="v-more-actions__trigger"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <slot name="trigger">
        <component
          :is="dotsIcon"
          class="v-more-actions__trigger-icon"
          aria-hidden="true"
        />
      </slot>
    </VButton>

    <Transition name="v-more-actions-fade">
      <ul
        v-show="isOpen"
        class="v-more-actions__dropdown"
        :class="`v-more-actions__dropdown--align-${align}`"
        role="listbox"
      >
        <li
          v-for="item in items"
          :key="String(item.id)"
          role="option"
          class="v-more-actions__item"
          :class="{ 'is--disabled': item.disabled }"
          :aria-disabled="item.disabled"
          :aria-selected="false"
          tabindex="0"
          @click="onSelect(item)"
          @keydown.enter.prevent="onSelect(item)"
          @keydown.space.prevent="onSelect(item)"
        >
          <component
            :is="item.icon"
            v-if="item.icon"
            class="v-more-actions__item-icon"
            aria-hidden="true"
          />
          <span class="v-more-actions__item-label">{{ item.label }}</span>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
@use 'UiKit/styles/_variables.scss' as variables;

.v-more-actions {
  position: relative;
  display: inline-flex;
}

.v-more-actions__trigger {
  min-width: auto;
  padding-inline: 8px;
}

.v-more-actions__trigger-icon {
  width: 16px;
  height: auto;
  display: block;
}

.v-more-actions__dropdown {
  position: absolute;
  top: 100%;
  margin-top: 4px;
  min-width: 150px;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4px 0;
  list-style: none;
  margin-left: 0;
  background-color: colors.$gray-10;
  border: 1px solid colors.$gray-20;
  box-shadow: variables.$box-shadow-medium;
  border-radius: 2px;
  z-index: 2;

  &--align-start {
    left: 0;
    right: auto;
  }

  &--align-center {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }

  &--align-end {
    right: 0;
    left: auto;
  }
}

.v-more-actions__item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-align: left;
  border: none;
  background: transparent;
  font: inherit;
  color: inherit;

  &:hover:not(.is--disabled) {
    background-color: colors.$gray-20;
  }

  &.is--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.v-more-actions__item-icon {
  width: 16px;
  height: auto;
  margin-right: 8px;
  flex-shrink: 0;
}

.v-more-actions__item-label {
  flex: 1;
}

.v-more-actions-fade-enter-active,
.v-more-actions-fade-leave-active {
  transition: opacity 0.15s ease;
}

.v-more-actions-fade-enter-from,
.v-more-actions-fade-leave-to {
  opacity: 0;
}
</style>
