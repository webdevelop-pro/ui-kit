<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGlobalAlert } from 'UiKit/store/useGlobalAlert';
import VAlert from 'UiKit/components/VAlert.vue';

const globalAlertStore = useGlobalAlert();
const {
  isVisible,
  variant,
  title,
  message,
} = storeToRefs(globalAlertStore);
</script>

<template>
  <div
    v-if="isVisible && message"
    class="VGlobalAlert v-global-alert"
  >
    <VAlert
      :variant="variant || 'error'"
      class="v-global-alert__alert"
      @click="globalAlertStore.hide()"
    >
      <template
        v-if="title"
        #title
      >
        {{ title }}
      </template>
      <template #description>
        {{ message }}
      </template>
    </VAlert>
  </div>
</template>

<style lang="scss">
.v-global-alert {
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: -20px;
  z-index: 11;
  background: rgba($color: $white, $alpha: 0.6);

  &__alert {
    width: 100%;
    max-width: 1280px;
  }
}
</style>

