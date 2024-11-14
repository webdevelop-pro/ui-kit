<script setup lang="ts">
</script>

<template>
  <div class="ChatHeader chat-header">
    <div class="chat-header__name">
      <div class="chat-header__title is--h5__title">
        Webdevelop PRO virtual assistant
      </div>
      <div class="chat-header__status-wrap">
        <div class="chat-header__status-color" />
        <div class="chat-header__title is--small">
          Available
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.chat-header {
  padding: 12px 40px;
  width: 100%;
  gap: 12px;
  display: flex;
  border-bottom: 1px solid $gray-20;
  @include media-lte(tablet) {
    padding: 12px;
  }

  &__title {
    color: $black;
  }

  &__status-wrap {
    display: flex;
    gap: 4px;
    align-items: center;
  }

  &__status {
    color: $gray-80;
  }

  &__status-color {
    width: 8px;
    height: 8px;
    background-color: $secondary;
    border-radius: 100%;
  }
}
</style>
