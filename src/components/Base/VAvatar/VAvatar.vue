<script setup lang="ts">
import { AvatarRoot } from 'radix-vue';

const props = withDefaults(defineProps<{
  size?: 'large' | 'medium' | 'small' | 'x-small';
  shape?: 'circle' | 'square';
}>(), {
  size: 'medium',
  shape: 'circle',
});
</script>

<template>
  <AvatarRoot
    class="VAvatar v-avatar"
    :class="[`is--${props.size}`, `is--${props.shape}`]"
  >
    <slot />
  </AvatarRoot>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;
.v-avatar {
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  user-select: none;
  border: 1px solid colors.$gray-30;
  font-size: 20px;
  background:colors.$gray-20;
  &.is--circle {
    border-radius: 100%;
  }
  &.is--large {
    width: 100px;
    height: 100px;
    font-size: 40px;
  }
  &.is--medium {
    width: 55px;
    height: 55px;
  }
  &.is--small {
    width: 30px;
    height: 30px;
    font-size: 14px;
  }
  &.is--x-small {
    width: 20px;
    height: 20px;
    font-size: 11px;
  }
}
</style>
