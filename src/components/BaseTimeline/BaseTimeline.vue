<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      required: false,
    },
    contentStyleDefault: {
      type: Boolean,
      default: true,
    }
  })
</script>

<template>
  <div
    class="BaseTimeline base-timeline"
    :class="{ 'is--content-style-default': contentStyleDefault }"
  >
    <div class="base-timeline__content">
      <h3
        v-if="title"
        class="base-timeline__title"
      >
        {{ title }}
      </h3>
      <slot />
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import 'index.sass'
.base-timeline
  $root: &

  position: relative

  &__title
    margin-bottom: 20px
    color: $black

  &__content
    width: 100%
    position: relative

  &.is--content-style-default
    #{$root}__content
      max-width: 740px
      margin: 108px auto 0
      @media screen and (max-width: 767px)
        margin: 80px auto 0
</style>
