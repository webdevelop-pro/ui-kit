<template>
  <div
    class="BaseTimelineItem timelines-items"
    :class="{ 'is--first': infoFirst, 'is--finish': infoFinish }"
  >
    <div
      class="circle"
      :class="{ 'is-active': active }"
    >
      <span />
    </div>
    <div
      v-if="title"
      class="timelines-items__step"
    >
      <component
        :is="to ? 'router-link' : 'h6'"
        :to="to"
        class="step"
      >
        {{ title }}
      </component>
    </div>
    <div
      v-if="$slots.default"
      class="items timelines-items__items"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';


export default defineComponent({
  name: 'WdTimelineItem',
  props: {
    to: [Boolean, Object],
    active: Boolean,
    infoFirst: Boolean,
    infoFinish: Boolean,
    title: {
      type: String,
    },
  },
});
</script>

<style lang="scss" scoped>

.timelines-items {
  --top: 42px;

  $root: &;

  padding-bottom: 30px;
  position: relative;
  left: 0;
  top: 0;
  height: 100%;
  @include media-lte(tablet) {
    padding-bottom: 35px;
    margin-left: 8px;
  }
  &::before {
    content: "";
    position: absolute;
    top: var(--top);
    left: 9px;
    z-index: 1;
    width: 2px;
    height: 100%;
    background-color: rgba($gray-40,0.6);
  }
  &:last-child {
    &::before {
      display: none;
    }
  }

  &__items {
    margin-left: 50px;
  }

  &__step {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    margin-bottom: 15px;
    .step {
      font-weight: 800;
      font-size: 14px;
      line-height: 19px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: $black;
    }
    a.step {
      &:hover {
        color: $primary;
      }
    }
  }
  &.is--first {
    .circle {
      width: 42px;
      height: 42px;
      top: 32px;
      left: -11px;
      border-width: 1px;
      span {
        width: 20px;
        height: 20px;
        border-radius: 100%;
        border: 7px solid $primary;
        background-color: $white;
      }
    }
  }
  &.is--finish {
    .circle {
      width: 32px;
      height: 32px;
      top: 35px;
      left: -8px;
      border-width: 12px;
      span {
        display: none;
      }
    }
  }
}


.circle {
  width: 24px;
  height: 24px;
  border-radius: 100%;
  border: 3px solid $primary;
  background-color: $white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-shrink: 0;
  align-items: center;
  position: absolute;
  left: -3px;
  top: var(--top);
  opacity: 1;
  z-index: 2;
  margin-right: 55px;
  @include media-lte(tablet) {
    margin-right: 25px;
  }
  span {
    width: 6px;
    height: 6px;
    background-color: $primary;
    border-radius: 100%;
  }
  &.is-active {
    width: 20px;
    height: 20px;
    background-color: $primary;
    position: relative;
    transition: .3s;
    &::before {
      content: "";
      position: absolute;
      left: -13px;
      top: -13px;
      width: 42px;
      height: 42px;
      background-color: $primary;
      opacity: 0.08;
      border-radius: 100px;
    }
    span {
      width: 6px;
      height: 6px;
      background-color: $white;
    }
  }
}

.timelines-inner {
  .timeline-info {
    margin-bottom: 12px;
    &::before {
      content: "";
      position: absolute;
      left: 20px;
      bottom: -12px;
      width: 2px;
      height: 12px;
      background-color: #9cb9fc;
      @include media-lte(tablet) {
        left: 15px;
      }
    }

    &__header {
      .circle {
        opacity: 1;
      }
    }

    &:last-child {
      margin-bottom: 0;
      &::before {
        display: none;
      }
    }
  }
}
</style>
