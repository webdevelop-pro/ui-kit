<script setup lang="ts">
import userIcon from 'UiKit/assets/images/user.svg';
import { navigateWithQueryParams } from 'UiKit/helpers/general';

defineProps({
  urlProfile: {
    type: String,
  },
  userLoggedIn: {
    type: Boolean,
    default: false,
  },
});

</script>

<template>
  <component
    :is="userIcon"
    v-if="userLoggedIn"
    class="VMenuProfileLink v-menu-profile"
    @click="navigateWithQueryParams(urlProfile);"
  />
</template>

<style lang="scss">
$z-index-menu-bg: 99;
$z-index-menu: 999;
$z-index-menu-profile: $z-index-menu + 1;

.v-menu-profile {
  z-index: $z-index-menu-profile;
  color: $black;
  cursor: pointer;
  transition: color 0.3s;
  width: 24px;
  height: 24px;
}
</style>
