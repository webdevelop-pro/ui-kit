<template>
  <div
    class="BaseTimelineInfo timeline-info is--card"
    :class="{ 'timelines-inner': infoInner, 'is--finish': infoFinish }"
  >
    <div
      v-if="title"
      class="timeline-info__header"
    >
      <div class="circle">
        <span />
      </div>
      <div class="title link-underline">
        <h4 id="initial-research-and-development">
          {{ title }}
        </h4>
      </div>
      <div
        v-if="duration"
        class="duration link-underline"
      >
        <p class="is--small">
          Duration:
          <strong class="is--h6__title">
            {{ duration }}
          </strong>
        </p>
      </div>
    </div>
    <slot />
    <div
      v-if="linkComponent"
      class="timeline-info__explanation"
    >
      <component
        :is="linkComponent"
        :to="to"
        :href="href"
      >
        explanation
      </component>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
} from 'vue';

export default defineComponent({
  name: 'WdTimelineInfo',
  props: {
    duration: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    infoInner: Boolean,
    infoFinish: Boolean,
    href: String,
    to: String,
  },
  setup(props) {
    return {
      linkComponent: computed(() => {
        if (props.href) return 'a';
        if (props.to) return 'router-link';
        return false;
      }),
    };
  },
});
</script>

<style lang="sass" scoped>

.timeline-info
  $root: &

  flex-direction: column
  padding: 40px !important
  position: relative

  .description
    border-top: 1px dashed rgba(51,51,51,0.1)
    margin-top: 15px
    padding-top: 20px
    p
      font-size: 14px
      line-height: 24px
  .duration
    p
      margin-bottom: 0
      strong
        color: $primary

  &__header
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    margin-bottom: 10px
    padding-bottom: 15px
    border-bottom: 1px dashed rgba(51,51,51,.1)
    @include media-lte(tablet)
      flex-direction: column
      justify-content: flex-start
      align-items: flex-start

    .circle
      width: 12px
      height: 12px
      border-radius: 100px
      background-color: $primary
      display: flex
      flex-direction: row
      justify-content: center
      align-items: center
      position: absolute
      left: 15px
      top: 50px
      opacity: 0
      @include media-lte(tablet)
        left: 10px

      span
        width: 4px
        height: 4px
        background-color: $white
        border-radius: 100px

    .title
      @include media-lte(tablet)
        margin-bottom: 10px

  &.timelines-inner
    margin-bottom: 32px
    color: $gray-80
    &::before
      content: ""
      position: absolute
      left: 20px
      bottom: -32px
      width: 2px
      height: 32px
      background-color: $gray-40
      @include media-lte(tablet)
        left: 15px

    #{$root}__header
      .circle
        opacity: 1

    &:last-child
      margin-bottom: 0
      &::before
        display: none

  &__explanation
    text-align: right
    font-size: 14px
    line-height: 24px
    a
      border-bottom: 1px dotted primary
      color: $black

  &.is--finish:last-of-type
    background-color: $primary
    color: $white
    .duration
      strong
        color: $white

    .timeline-info__header
      border-color: $white
      .circle
        background-color: $white
        span
          background-color: $primary
</style>
