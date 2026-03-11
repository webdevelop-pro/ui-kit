<script setup lang="ts">
import { TabsList, type TabsListProps } from 'radix-vue';
import {
  computed, nextTick, onMounted, onUnmounted, ref, type HTMLAttributes,
} from 'vue';
import debounce from 'lodash/debounce';

const props = withDefaults(defineProps<TabsListProps & {
  class?: HTMLAttributes['class'];
  variant?: 'primary' | 'secondary';
}>(), {
  variant: 'primary',
});

const delegatedProps = computed(() => {
  const { class: unused, ...delegated } = props;
  void unused; // Explicitly mark as intentionally unused

  return delegated;
});

const wrapperRef = ref<HTMLElement | null>(null);
const scrollElementRef = ref<HTMLElement | null>(null);
let resizeObserver: ResizeObserver | null = null;
let mutationObserver: MutationObserver | null = null;
let scrollRafId = 0;
const showLeftGradient = ref(false);
const showRightGradient = ref(false);
const borderWidth = ref<string>('100%');

function updateScrollElement() {
  if (!wrapperRef.value) {
    scrollElementRef.value = null;
    return;
  }

  scrollElementRef.value = wrapperRef.value.querySelector('.v-tabs-list') as HTMLElement | null;
}

function checkScrollPosition() {
  const element = scrollElementRef.value;
  if (!element) return;

  const { scrollLeft, scrollWidth, clientWidth } = element;
  const isAtStart = scrollLeft <= 0;
  const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1; // -1 for rounding errors
  const canScroll = scrollWidth > clientWidth;

  showLeftGradient.value = canScroll && !isAtStart;
  showRightGradient.value = canScroll && !isAtEnd;
  
  // Update border width to match scrollable width
  borderWidth.value = `${scrollWidth}px`;
}

function scheduleCheckScrollPosition() {
  if (scrollRafId) return;
  scrollRafId = requestAnimationFrame(() => {
    scrollRafId = 0;
    checkScrollPosition();
  });
}

function scrollToActiveTab() {
  const element = scrollElementRef.value;
  if (!element) return;

  const activeTab = element.querySelector('[data-state="active"]') as HTMLElement | null;
  if (!activeTab) return;

  const containerWidth = element.clientWidth;
  const tabWidth = activeTab.offsetWidth;
  const tabOffsetLeft = activeTab.offsetLeft;

  // Calculate center position: tab center should align with container center
  const tabCenter = tabOffsetLeft + tabWidth / 2;
  const containerCenter = containerWidth / 2;
  const targetScrollLeft = tabCenter - containerCenter;

  // Ensure we don't scroll beyond bounds
  const maxScroll = element.scrollWidth - containerWidth;
  const clampedScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScroll));

  // Only scroll if the tab is not already centered (with some tolerance)
  const currentScrollLeft = element.scrollLeft;
  const scrollDifference = Math.abs(currentScrollLeft - clampedScrollLeft);

  if (scrollDifference > 1) {
    element.scrollTo({
      left: clampedScrollLeft,
      behavior: 'smooth',
    });
  }
}

const scrollToActiveTabDebounced = debounce(scrollToActiveTab, 50);

onMounted(async () => {
  await nextTick();
  updateScrollElement();
  checkScrollPosition();

  const element = scrollElementRef.value;
  if (!element) return;

  element.addEventListener('scroll', scheduleCheckScrollPosition, { passive: true });

  // Scroll to active tab on mount (after layout settles)
  await nextTick();
  scrollToActiveTab();

  // Watch for changes to active tab state using MutationObserver
  if (typeof MutationObserver !== 'undefined') {
    mutationObserver = new MutationObserver((mutations) => {
      const hasActiveChange = mutations.some((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-state') {
          const target = mutation.target as HTMLElement;
          return target.getAttribute('data-state') === 'active';
        }
        return false;
      });

      if (hasActiveChange) {
        scrollToActiveTabDebounced();
      }
    });

    mutationObserver.observe(element, {
      attributes: true,
      attributeFilter: ['data-state'],
      subtree: true,
    });
  }

  // Check on resize
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      updateScrollElement();
      scheduleCheckScrollPosition();
      scrollToActiveTabDebounced();
    });
    resizeObserver.observe(element);
  }
});

onUnmounted(() => {
  const element = scrollElementRef.value;
  if (element) {
    element.removeEventListener('scroll', scheduleCheckScrollPosition);
  }
  if (scrollRafId) {
    cancelAnimationFrame(scrollRafId);
    scrollRafId = 0;
  }
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
  if (mutationObserver) {
    mutationObserver.disconnect();
    mutationObserver = null;
  }
  scrollToActiveTabDebounced.cancel();
});
</script>

<template>
  <div
    ref="wrapperRef"
    class="v-tabs-list-wrapper"
    :class="`is--variant-${variant}`"
  >
    <TabsList
      ref="tabsListRef"
      v-bind="delegatedProps"
      :class="[props.class, `is--variant-${variant}`, 'is--hide-scrollbar']"
      class="VTabsList v-tabs-list"
      :style="variant === 'primary' ? { '--border-width': borderWidth } : undefined"
    >
      <slot />
    </TabsList>
    <div
      v-if="showLeftGradient"
      class="v-tabs-list__gradient v-tabs-list__gradient--left"
    />
    <div
      v-if="showRightGradient"
      class="v-tabs-list__gradient v-tabs-list__gradient--right"
    />
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-tabs-list-wrapper {
  position: relative;
  width: 100%;
}

.v-tabs-list {
  display: flex;
  flex-direction: row;
  width: 100%;
  position: relative;
  gap: 20px;
  overflow: auto hidden;

  &.is--variant-primary {
    height: 48px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      border-bottom: 2px solid colors.$gray-30;
      width: var(--border-width, 100%);
    }
  }

  &.is--variant-secondary {
    gap: 4px;
    border-radius: 2px;
    background: colors.$gray-20;
    padding: 4px;
  }
}

.v-tabs-list__gradient {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40px;
  pointer-events: none;
  z-index: 5;

  &--left {
    left: 0;
    background: linear-gradient(
      to right,
      colors.$white 0%,
      rgb(255 255 255 / 80%) 50%,
      transparent 100%
    );
  }

  &--right {
    right: 0;
    background: linear-gradient(
      to left,
      colors.$white 0%,
      rgb(255 255 255 / 80%) 50%,
      transparent 100%
    );
  }
}
</style>
