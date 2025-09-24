<script setup lang="ts">
import userIcon from 'UiKit/assets/images/user.svg';
import { urlProfile } from 'InvestCommon/domain/config/links';
import { useSessionStore } from 'InvestCommon/domain/session/store/useSession';
import { navigateWithQueryParams } from 'UiKit/helpers/general';
import { storeToRefs } from 'pinia';

const sessionStore = useSessionStore();
const { userLoggedIn } = storeToRefs(sessionStore);

</script>

<template>
  <component
    :is="userIcon"
    v-if="userLoggedIn"
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
