<script setup lang="ts">
import {
  ref, onBeforeUnmount, onMounted, nextTick, PropType, watch,
} from 'vue';
import { useSwipe } from '@vueuse/core';
import type { UseSwipeDirection } from '@vueuse/core';

interface ISliderWithPaginationAutoPlay {
  id: number;
}

const props = defineProps({
  slider: {
    type: Array as PropType<ISliderWithPaginationAutoPlay[]>,
    required: true,
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  activecolor: {
    type: String,
    default: '#004FFF',
  },
});

let intervalId: NodeJS.Timeout = null;
const itemCount = props.slider?.length;
const activeElementId = ref(1);
const active = ref({});
const targetSwipe = ref<HTMLElement | null>(null);

const { direction } = useSwipe(targetSwipe);

watch(() => direction.value, () => {
  if (direction.value === 'left') {
    if (activeElementId.value < itemCount) activeElementId.value += 1;
    else activeElementId.value = 1;
    setActiveElement();
  }
  if (direction.value === 'right') {
    if (activeElementId.value > 1) activeElementId.value -= 1;
    else activeElementId.value = itemCount;
    setActiveElement();
  }
}, { immediate: true });

const setActiveElement = () => {
  active.value = props.slider.find((item) => item.id === activeElementId.value);
};
const setAutoPlay = () => {
  if (itemCount) {
    intervalId = setInterval(() => {
      if (activeElementId.value < itemCount) activeElementId.value += 1;
      else activeElementId.value = 1;
      setActiveElement();
    }, 6000);
  }
};

const changeSlide = (index: number) => {
  clearInterval(intervalId);
  activeElementId.value = index; // Update the active element
  if (props.autoplay) setAutoPlay();
};

watch(() => activeElementId.value, () => {
  setActiveElement();
}, { immediate: true });

onMounted(async () => {
  setActiveElement();
  await nextTick();
  if (props.autoplay) setAutoPlay();
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div ref="targetSwipe" class="SliderWithPaginationAutoPlay slider-with-pagination-auto-play">
    <slot v-bind="active" />
    <div class="slider-with-pagination-auto-play__pagination">
      <div
        v-for="item in slider"
        :key="item.id"
        class="slider-with-pagination-auto-play__pagination-item-wrap"
        @click="changeSlide(item.id)"
      >
        <div
          class="slider-with-pagination-auto-play__pagination-item"
          :class="{ 'is--active': item.id === activeElementId }"
        />
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import 'index.sass'
.slider-with-pagination-auto-play
  position: relative

  &__pagination
    display: flex
    flex-direction: row
    gap: 4px
    justify-content: center
    margin-top: 25px

  &__pagination-item
    width: 31px
    height: 2px
    background-color: $gray-30

    &.is--active
      background-color: v-bind(activecolor)

  &__pagination-item-wrap
    padding: 9px 0
    cursor: pointer

.fade-enter-active,
.fade-leave-active
  transition: opacity 0.5s ease

.fade-enter-from,
.fade-leave-to
  opacity: 0
</style>
