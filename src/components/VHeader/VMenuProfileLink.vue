<script setup lang="ts">
import userIcon from 'UiKit/assets/images/user.svg';
import { urlProfile } from 'InvestCommon/domain/config/links';
import { navigateWithQueryParams } from 'UiKit/helpers/general';

</script>

<template>
  <component
    :is="userIcon"
    class="VMenuProfileLink v-menu-profile"
    @click="navigateWithQueryParams(urlProfile());"
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
