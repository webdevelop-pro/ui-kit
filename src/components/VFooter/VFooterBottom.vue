<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <div class="VFooterBottom v-footer-bottom">
    <p class="is--container is--small">
      <a href="/legal/terms-of-service">Terms of Service</a> |
      <a href="/legal/privacy-notice">Privacy Notice</a> |
      <a href="/legal/cookie">Cookie Policy</a> |
      © {{ currentYear }} Pro Webdevelop, LLC.
    </p>
  </div>
</template>


<style lang="scss">
.v-footer-bottom {
    background-color: $black;
    padding: 10px 0 16px;
    @include media-lte(tablet) {
      padding-top: 51px;
    }
    p {
      color: $gray-50;
    }
}
</style>
