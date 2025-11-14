<script setup lang="ts">
import { PropType, computed } from 'vue';
import VSvgIcon from 'UiKit/components/Base/VSvgIcon/VSvgIcon.vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';

interface IListsLeftBorder {
  text: string;
  title: string;
  icon: string;
  button?: Record<string, unknown>;
}

const props = defineProps({
  items: {
    type: Array as PropType<unknown[]>,
    required: true,
  },
  color: {
    type: String as PropType<'primary' | 'secondary'>,
    default: 'primary',
  },
});

// console.log('props.items', props.items);

// Separate button-* keys from other keys
const processedItems = computed(() => {
  return props.items.map((item) => {
    if (!item) return item;
    
    const button: Record<string, unknown> = {};
    const rest: Record<string, unknown> = {};
    
    // Separate button-* keys from other keys
    Object.keys(item).forEach((key) => {
      if (key.startsWith('button-')) {
        const buttonKey = key.replace('button-', '');
        button[buttonKey] = item[key];
      } else {
        rest[key] = item[key];
      }
    });
    
    // If we found any button keys, add the button object
    if (Object.keys(button).length > 0) {
      rest.button = button;
    }
    
    return rest as IListsLeftBorder;
  });
});


const keysToRemove = ['cover', 'head', 'url', 'slug', 'summary', 'draft', 'text', 'icon'];

const filteredButtons = computed<IListsLeftBorder[]>(() => {
  return processedItems.value.map((item) => {
    if (!item || !item.button) {
      return item;
    }
    
    const filteredButton = Object.fromEntries(
      Object.entries(item.button).filter(([key]) => !keysToRemove.includes(key))
    );
    
    return {
      ...item,
      button: filteredButton,
    } as IListsLeftBorder;
  });
});
</script>

<template>
  <div
    class="VListsLeftBorder v-list-left-border"
    :class="`is--border-color-${color}`"
  >
    <ul class="v-list-left-border__list">
      <li
        v-for="(caption, index) in filteredButtons"
        :key="index"
        class="v-list-left-border__item"
      >
        <div class="v-list-left-border__item-content">
          <VSvgIcon
            :icon="caption.icon"
            icon-size="35px"
            class="v-list-left-border__icon"
          />
          <div class="v-list-left-border__content">
            <h3 class="is--color-primary">
              {{ caption.title }}
            </h3>
            <p class="is--color-gray-80 is--margin-top-0">
              {{ caption.text }}
            </p>
            <slot :item="caption" />
          </div>
        </div>
        <VButton
          v-if="caption.button"
          v-bind="caption.button"
          class="is--margin-top-30"
        >
          {{ processedItems[index]?.button?.text }}
        </VButton>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as *;

.v-list-left-border {
  width: 100%;

  &.is--border-color-primary {
    --list-left-border-color: #{$primary};
  }

  &.is--border-color-secondary {
    --list-left-border-color: #{$secondary};
  }

  &__icon {
    color: $primary;
    flex-shrink: 0;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    opacity: 0.9;
  }

  &__list {
    width: 100%;
    padding-left: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 40px;
    list-style: none;
    margin: 0;
    max-width: auto;
  }

  &__item {
    flex: 1 1 255px;
    // max-width: 260px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 !important;
    padding: 20px;
    border-left: 2px solid var(--list-left-border-color);
    justify-content: space-between;
  }

  &__item-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  span {
    margin: 0 !important;
  }
}
</style>
