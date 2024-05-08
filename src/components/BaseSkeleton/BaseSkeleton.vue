<script lang="ts" setup>
defineProps({
  width: {
    type: String,
    default: '70px',
  },
  height: {
    type: String,
    default: '15px',
  },
})
</script>

<template>
  <div
    class="BaseSkeleton base-skeleton"
    :style="{
      width: width,
      height: height,
    }"
  />
</template>

<style lang="sass" scoped>
@import 'index.sass'
.base-skeleton
  position: relative
  overflow: hidden
  background: linear-gradient( 90deg, rgba(207, 219, 255, 0.34) 0%, rgba(235, 243, 255, 0.34) 35.42%, rgba(203, 216, 255, 0.34) 100%)
  border-radius: 25px

  &::before
    position: absolute
    top: 0
    left: -100%
    display: block
    width: 100%
    height: 100%
    content: ""
    background: linear-gradient( 90deg, rgba(207, 219, 255, 0.34) 0%, rgba(235, 243, 255, 0.34) 35.42%, rgba(203, 216, 255, 0.34) 100% )
    animation: load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite

  @keyframes load
    from
      left: -100%

    to
      left: 100%
</style>
