<script setup lang="ts">
import logoMob from '/images/logo-mob.svg?url';
</script>

<template>
  <div class="ChatAvatar chat-avatar">
    <img
      loading="lazy"
      :src="logoMob"
      alt="logo image"
      class="chat-avatar__avatar-image is--no-margin"
    />
  </div>
</template>

<style lang="scss">
.chat-avatar {
  --chat-avatar--size: 44px;

  width: var(--chat-avatar--size);
  height: var(--chat-avatar--size);
  flex-shrink: 0;
  border: 1px solid #D9D9D9;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__avatar-image {
    width: 21px;
    height: auto;
  }
}
</style>
