<script setup lang="ts">
import {
  ref, onBeforeUnmount, onMounted, nextTick, PropType, watch,
} from 'vue';

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
  <div class="SliderWithPaginationAutoPlay slider-with-pagination-auto-play">
    <transition
      name="fade"
      mode="out-in"
    >
      <div
        :key="active.id"
        class="slider-with-pagination-auto-play__item"
      >
        <slot v-bind="active" />
      </div>
    </transition>
    <div class="slider-with-pagination-auto-play__pagination">
      <div
        v-for="item in slider"
        :key="item.id"
        class="slider-with-pagination-auto-play__pagination-item"
        :class="{ 'is--active': item.id === activeElementId }"
        @click="changeSlide(item.id)"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import 'index.sass'
.slider-with-pagination-auto-play
  position: relative

  &__item
    top: 0
    left: 0
    width: 100%

    &.is--active
      position: relative
      transition: opacity 3s ease

  &__pagination
    display: flex
    flex-direction: row
    gap: 4px
    justify-content: center
    margin-top: 35px

  &__pagination-item
    width: 31px
    height: 2px
    background-color: $gray-30
    cursor: pointer

    &.is--active
      background-color: v-bind(activecolor)

.fade-enter-active,
.fade-leave-active
  transition: opacity 0.5s ease

.fade-enter-from,
.fade-leave-to
  opacity: 0
</style>
