<script setup lang="ts">
import VAvatar from 'UiKit/components/VAvatar.vue';

defineOptions({
  inheritAttrs: false,
});

defineProps<{
  label: string;
  avatarText?: string;
}>();
</script>

<template>
  <div class="VAvatarIdentity v-avatar-identity">
    <VAvatar
      v-bind="$attrs"
      class="v-avatar-identity__avatar"
    >
      {{ avatarText }}
    </VAvatar>
    <span class="v-avatar-identity__label is--h6__title">
      <slot>
        {{ label }}
      </slot>
    </span>
  </div>
</template>

<style scoped lang="scss">
.v-avatar-identity {
  display: flex;
  align-items: center;
  gap: 5px;

  &__label {
    max-width: 220px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
