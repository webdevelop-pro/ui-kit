<script setup lang="ts">
import { TabsList, type TabsListProps } from 'radix-vue';
import {
  computed, nextTick, onMounted, onUnmounted, ref, type HTMLAttributes,
} from 'vue';
import ChevronDown from 'UiKit/assets/images/chevron-down.svg?component';

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
const showLeftGradient = ref(false);
const showRightGradient = ref(false);
const showLeftArrow = ref(false);
const showRightArrow = ref(false);


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
  showLeftArrow.value = canScroll && !isAtStart;
  showRightArrow.value = canScroll && !isAtEnd;
}

function scrollLeft() {
  const element = scrollElementRef.value;
  if (!element) return;
  const scrollAmount = element.clientWidth * 0.8;
  element.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
}

function scrollRight() {
  const element = scrollElementRef.value;
  if (!element) return;
  const scrollAmount = element.clientWidth * 0.8;
  element.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

onMounted(async () => {
  await nextTick();
  updateScrollElement();
  checkScrollPosition();
  
  const element = scrollElementRef.value;
  if (element) {
    element.addEventListener('scroll', checkScrollPosition);
    // Check on resize
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateScrollElement();
        checkScrollPosition();
      });
      resizeObserver.observe(element);
    }
  }
});

onUnmounted(() => {
  const element = scrollElementRef.value;
  if (element) {
    element.removeEventListener('scroll', checkScrollPosition);
  }
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
});
</script>

<template>
  <div
    ref="wrapperRef"
    class="v-tabs-list-wrapper"
    :class="`is--variant-${variant}`"
  >
    <button
      v-if="showLeftArrow"
      class="v-tabs-list__scroll-button v-tabs-list__scroll-button--left"
      aria-label="Scroll left"
      @click="scrollLeft"
    >
      <ChevronDown class="v-tabs-list__scroll-icon v-tabs-list__scroll-icon--left" />
    </button>
    <TabsList
      ref="tabsListRef"
      v-bind="delegatedProps"
      :class="[props.class, `is--variant-${variant}`]"
      class="VTabsList v-tabs-list"
    >
      <slot />
    </TabsList>
    <button
      v-if="showRightArrow"
      class="v-tabs-list__scroll-button v-tabs-list__scroll-button--right"
      aria-label="Scroll right"
      @click="scrollRight"
    >
      <ChevronDown class="v-tabs-list__scroll-icon v-tabs-list__scroll-icon--right" />
    </button>
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
  overflow: auto hidden;
  position: relative;
  gap: 20px;
  scrollbar-width: none; // Firefox
  -ms-overflow-style: none; // IE and Edge

  // Hide scrollbar for Chrome, Safari and Opera
  &::-webkit-scrollbar {
    display: none;
  }

  &.is--variant-primary {
    height: 48px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      border-bottom: 2px solid colors.$gray-30;
      width: 100%;
    }
  }

  &.is--variant-secondary {
    gap: 4px;
    border-radius: 2px;
    background: colors.$gray-20;
    padding: 4px;
    width: fit-content;
  }
}

.v-tabs-list__scroll-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: transparent;
  border: none;
  border-radius: 999px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: background-color 0.15s ease, color 0.15s ease, opacity 0.15s ease;
  color: colors.$gray-60;
  opacity: 0.9;

  &:hover {
    background: rgba(colors.$gray-20, 0.5);
    opacity: 1;
  }

  &:active {
    transform: translateY(-50%) scale(0.96);
  }

  &--left {
    left: 0;
  }

  &--right {
    right: 0;
  }
}

.v-tabs-list__scroll-icon {
  width: 16px;
  height: 16px;
  color: currentcolor;

  &--left {
    transform: rotate(90deg);
  }

  &--right {
    transform: rotate(-90deg);
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

// Adjust gradients for secondary variant background
.v-tabs-list-wrapper.is--variant-secondary {
  .v-tabs-list__gradient {
    &--left {
      background: linear-gradient(
        to right,
        colors.$gray-20 0%,
        rgb(233 236 239 / 80%) 50%,
        transparent 100%
      );
    }

    &--right {
      background: linear-gradient(
        to left,
        colors.$gray-20 0%,
        rgb(233 236 239 / 80%) 50%,
        transparent 100%
      );
    }
  }

  .v-tabs-list__scroll-button {
    background: transparent;
  }
}
</style>
