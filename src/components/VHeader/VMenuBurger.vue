<script setup lang="ts">
import closeIcon from 'UiKit/assets/images/close.svg';
import menuMobIcon from 'UiKit/assets/images/menu-mob.svg';

const modelValue = defineModel<boolean>();
defineEmits(['update:modelValue']);
</script>

<template>
  <component
    :is="modelValue ? closeIcon : menuMobIcon"
    class="VMenuBurger v-menu-burger"
  />
</template>

<style lang="scss">
$z-index-menu-bg: 99;
$z-index-menu: 999;
$z-index-menu-burger: $z-index-menu + 1;

.v-menu-burger {
  z-index: $z-index-menu-burger;
  color: $black;
  cursor: pointer;
  transition: color 0.3s;
  width: 24px;
  height: 24px;
}
</style>
