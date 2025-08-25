<script setup lang="ts">
import VSkeleton from 'UiKit/components/Base/VSkeleton/VSkeleton.vue';

</script>

<template>
  <div class="VFormFooterSubscribe v-form-footer-subscribe">
    <VSkeleton
      height="21px"
      width="100px"
    />
    <form
      novalidate
      @submit.prevent="onSubmit"
    >
      <div class="v-form-footer-subscribe__group">
        <VSkeleton
          height="48px"
          width="480px"
        />
        
        <VSkeleton
          height="48px"
          width="115px"
        />
      </div>
    </form>
  </div>
</template>

<style lang="scss">
.v-form-footer-subscribe {
  &__group {
    display: flex;
    gap: 4px;
  }

  &__button {
    position: relative;
    top: 28px;
  }
}
</style>
