<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { blockedBody, unBlockedBody } from 'UiKit/helpers/blocked-body';
import VSvgIcon from 'UiKit/components/VSvgIcon/VSvgIcon.vue';

onMounted(() => blockedBody());
onBeforeUnmount(() => unBlockedBody());
</script>

<template>
  <div
    class="VLoader the-loader"
    data-testid="the-loader"
  >
    <div class="the-loader__circle">
      <div class="the-loader__wrap">
        <VSvgIcon
          class="the-loader__logo"
          name="logo"
        />
      </div>
    </div>
  </div>
</template>


<style lang="sass">
.the-loader
  position: fixed
  top: 0
  left: 0
  z-index: 13000
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  height: 100%
  background-color: #fff

  &__circle
    position: relative
    display: flex
    align-items: center
    justify-content: center
    width: 120px
    height: 120px

  &__wrap
    position: relative
    z-index: 1
    display: flex
    align-items: center
    justify-content: center
</style>
