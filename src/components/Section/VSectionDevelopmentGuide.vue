<script setup lang="ts">
import { PropType } from 'vue';
import { IDevelopmentGuide } from '../utils';
import VTimelineCircle from 'UiKit/components/VTimeline/VTimelineCircle.vue';
import VTimelineCard from 'UiKit/components/VTimeline/VTimelineCard.vue';

defineProps({
  data: {
    type: Object as PropType<IDevelopmentGuide>,
    required: true,
  },
});

</script>

<template>
  <section class="VSectionDevelopmentGuide development-guide">
    <div class="is--container">
      <div class="development-guide__container">
        <div class="development-guide__content">
          <h2
            class="development-guide__title"
          >
            {{ data.title }}
          </h2>
          <div class="development-guide__timeline">
            <div
              v-for="(item, i) in data.items"
              :key="i"
              class="development-guide__item"
            >
              <VTimelineCircle
                :type="item.circleType"
                class="development-guide__circle"
              />
              <div class="development-guide__step is--h6__title">
                {{ item.stepText.toUpperCase() }}
              </div>
              <VTimelineCard
                :title="item.title"
                class="development-guide__card"
              >
                <p class="development-guide__card-text">
                  {{ item.text }}
                </p>
              </VTimelineCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.development-guide {
  $root: &;

  position: relative;

  &__container {
    position: relative;
    display: flex;
    align-items: center;
    @include media-gt(tablet) {
      justify-content: space-between;
    }
    @include media-lte(tablet) {
      flex-direction: column;
    }
  }

  &__content {
    width: 100%;
  }

  &__title {
    color: $black;
    margin-bottom: 50px;

    @include media-lte(tablet) {
      margin-bottom: 50px;
      word-break: break-word;
    }
  }

  &__timeline {
    display: grid;
    gap: 31px;
    grid-template-columns: repeat(3, 1fr);
    @include media-lte(desktop) {
      grid-template-columns: repeat(2, 1fr);
    }
    @include media-lte(tablet) {
      display: flex;
      flex-direction: column;
    }
  }

  &__item {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;

    @include media-lte(tablet) {
      padding-left: 60px;
      margin-bottom: 0;
    }

    &:nth-child(1)::before {
      @include media-gt(tablet) {
        left: calc(50% + 19px);
        width: calc(100%);
      }
      @include media-lte(tablet) {
        top: 32px;
        height: calc(100%);
      }
    }

    &:nth-child(4)::after {
      @include media-gt(tablet) {
        content: "";
        position: absolute;
        top: 11px;
        right: calc(50% + 12px);
        z-index: 1;
        height: 2px;
        background-color: $gray-30;
      }
      @include media-gte(desktop) {
        width: calc(100% + 100vw);
      }
    }

    &:nth-child(3)::after {
      @include media-lte(desktop) {
        width: calc(100% + 100vw);
        content: "";
        position: absolute;
        top: 11px;
        right: calc(50% + 12px);
        z-index: 1;
        height: 2px;
        background-color: $gray-30;

        @include media-lte(tablet) {
          display: none;
        }
      }
    }

    &:nth-child(3)::before {
      @include media-gt(desktop) {
        width: calc(100% + 100vw);
      }
    }

    @include media-lte(desktop) {
      &:nth-child(5)::after {
        width: calc(100% + 100vw);
        content: "";
        position: absolute;
        top: 11px;
        right: calc(50% + 12px);
        z-index: 1;
        height: 2px;
        background-color: $gray-30;

        @include media-lte(tablet) {
          display: none;
        }
      }
    }

    &::before {
      content: "";
      position: absolute;
      top: 11px;
      left: calc(50% + 12px);
      z-index: 1;
      width: calc(100% + 7px);
      height: 2px;
      background-color: $gray-30;

      @include media-lte(tablet) {
        top: 24px;
        left: 20px;
        width: 2px;
        height: calc(100% + 7px);
      }
    }
    &:last-child {
      &::before {
        display: none;
      }
    }
  }

  &__step {
    width: 100%;
    color: $primary;
    margin-bottom: 16px;
    margin-top: 20px;

    @include media-lte(tablet) {
      margin-top: 0;
    }
    @include media-gt(tablet) {
      text-align: center;
    }
  }

  &__circle {
    flex-shrink: 0;
    opacity: 1;
    z-index: 2;
    position: relative;
    margin-bottom: 12px;
    left: 50%;
    transform: translateX(-50%);

    @include media-lte(tablet) {
      top: 0;
      left: 9px;
      transform: translateX(0);
      position: absolute;
    }
  }

  &__card-text {
    color: $gray-80;
  }

  &__card {
    @include media-gte(tablet) {
      height: 100%;
    }
  }
}
</style>
