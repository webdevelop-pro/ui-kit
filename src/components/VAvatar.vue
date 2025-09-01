<script setup lang="ts">
import { VAvatarFallback, VAvatarImage, VAvatar } from 'UiKit/components/Base/VAvatar';
import user from 'UiKit/assets/images/user.svg?component';
import VSkeleton from 'UiKit/components/Base/VSkeleton/VSkeleton.vue';

withDefaults(defineProps<{
  size?: 'x-large' | 'large' | 'medium' | 'small' | 'x-small';
  shape?: 'circle' | 'square';
  src: string | undefined;
  alt?: string;
  loading?: boolean;
}>(), {
  size: 'medium',
  shape: 'circle',
  alt: 'avatar image',
});
</script>

<template>
  <VAvatar
    :size="size"
    :shape="shape"
    class="VAvatarDefault v-avatar-default"
  >
    <VSkeleton
      v-if="loading"
      redius="100%"
      size="max"
      class="v-avatar-default__skeleton"
    />
    <VAvatarImage
      v-else-if="src"
      :src="src"
      :alt="alt"
    />
    <VAvatarFallback>
      <slot>
        <user
          class="v-avatar-default__icon"
          alt="avatar"
        />
      </slot>
    </VAvatarFallback>
  </VAvatar>
</template>

<style lang="scss">
.v-avatar-default {
  &__icon {
    height: 16px;
    max-width: 100%;
    max-height: 100%;
    flex-shrink: 0;
    color: $gray-50;
  }

  &__skeleton {
    width: 100%;
    height: 100%;
  }
}

.is--large {
  .v-avatar-default__icon {
    height: 24px;
    width: 24px;
  }
}
.is--x-large {
  .v-avatar-default__icon {
    height: 60px;
    width: 60px;
  }
}
</style>
