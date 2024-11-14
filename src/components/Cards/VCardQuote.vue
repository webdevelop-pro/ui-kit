<script setup lang="ts">

defineProps({
  text: String,
});
</script>

<template>
  <div class="VCardQuote v-card-quote">
    <div class="v-card-quote__text is--subheading-1">
      {{ text }}
    </div>
  </div>
</template>

<style lang="scss">
.v-card-quote {
  display: flex;
  padding: 40px;
  align-items: flex-start;
  gap: 28px;
  align-self: stretch;
  border: 1px solid $gray-20;
  background: $gray-10;
  position: relative;

  &::before {
    content: url('UiKit/assets/images/sign-left.svg');
    left: 12px;
    top: 12.031px;
  }
  &::after {
    content: url('UiKit/assets/images/sign-right.svg');
    right: 12px;
    bottom: 12.031px;
  }
  &::before,
  &::after {
    position: absolute;
    width: 70px;
    height: 49px;
  }

  &__text {
    color: #333;
    position: relative;
    z-index: 1;
  }
}
</style>
