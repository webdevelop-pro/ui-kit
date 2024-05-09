<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      required: false,
    },
  })
</script>

<template>
  <div class="BaseTimeline base-timeline">
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
  position: relative

  &__title
    margin-bottom: 20px
    color: $black

  &__content
    width: 100%
    max-width: 740px
    margin: 108px auto 0
    position: relative
    @media screen and (max-width: 767px)
      margin: 80px auto 0
</style>
