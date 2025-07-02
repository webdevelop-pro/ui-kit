<script lang="ts" setup>
import { computed, useSlots } from 'vue';

const props = defineProps({
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '20px',
  },
  animation: {
    type: [String, Boolean],
    default: 'wave',
    validator: (val) => ['wave', false].includes(val),
  },
  isLoaded: {
    type: Boolean,
    default: false,
  },
  radius: {
    type: String,
    default: '2px',
  },
  skeletonClass: {
    type: String,
    default: '',
  },
  transition: {
    type: Boolean,
    default: true,
  },
  margin: {
    type: String,
  },
  size: {
    type: String,
    validator: (val) => ['small', 'medium', 'large'].includes(val),
  },
});

const componentClass = computed(() => [
  props.skeletonClass,
  'v-skeleton',
  props.animation ? `v-skeleton--${props.animation}` : null,
]);

const height = computed(() => {
  if (props.size === 'small') return '32px';
  if (props.size === 'medium') return '40px';
  if (props.size === 'large') return '48px';
  return props.height;
});

const componentStyle = computed(() => ({
  width: props.width,
  height: height.value,
  borderRadius: props.radius,
  margin: props.margin,
}));

const hasChild = computed(() => !!useSlots().default);
</script>

<template>
  <transition
    name="skeleton"
    mode="out-in"
    :css="transition && hasChild ? true : false"
  >
    <slot v-if="isLoaded" />
    <div
      v-else
      :class="componentClass"
      :style="componentStyle"
    />
  </transition>
  <!-- <div
    class="VSkeleton v-skeleton"
    :style="{
      width,
      height,
    }"
  /> -->
</template>

<style lang="scss">
.v-skeleton {
  color: transparent;
  display: block;
  user-select: none;
  position: relative;
  // overflow: hidden;
  background: linear-gradient(90deg, rgba(207, 219, 255, 0.34) 0%, rgba(235, 243, 255, 0.34) 35.42%, rgba(203, 216, 255, 0.34) 100%);
  // border-radius: 2px;

  // &::before {
  //   position: absolute;
  //   top: 0;
  //   left: -100%;
  //   display: block;
  //   width: 100%;
  //   height: 100%;
  //   content: "";
  //   background: linear-gradient(90deg, rgba(207, 219, 255, 0.34) 0%, rgba(235, 243, 255, 0.34) 35.42%, rgba(203, 216, 255, 0.34) 100%);
  //   animation: load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  // }

  * {
    visibility: hidden;
  }

  &--wave {
    position: relative;
    overflow: hidden;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    &::after {
      animation: wave 1.5s linear 0s infinite;
      background: linear-gradient(90deg, rgba(207, 219, 255, 0.34) 0%, rgba(235, 243, 255, 0.34) 35.42%, rgba(203, 216, 255, 0.34) 100%);
      content: '';
      position: absolute;
      transform: translate3d(-100%, 0, 0);
      will-change: transform;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
    }
  }
}

@keyframes load {
  from {
    left: -100%;
  }

  to {
    left: 100%;
  }
}

@keyframes wave {
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  60% {
    transform: translate3d(100%, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}

.skeleton-enter-active,
.skeleton-leave-active-active {
  // transition: opacity 0.1s ease-in-out;
}

.skeleton-enter,
.skeleton-leave-active {
  opacity: 0;
  // transition: opacity 0.1s ease-in-out;
}
</style>
