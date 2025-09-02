<script setup lang="ts">
import fileIcon from 'UiKit/assets/images/file.svg';
import closeIcon from 'UiKit/assets/images/close.svg?component';

interface Props {
  file: File;
  index: number;
}

defineProps<Props>();

const emit = defineEmits<{
  'remove': [index: number];
  'click': [index: number];
}>();

const removeFile = (index: number) => {
  emit('remove', index);
};
</script>

<template>
  <div 
    class="v-uploader__preview-card"
    role="button"
    tabindex="0"
    @click.stop="emit('click', index)"
    @keydown.enter.stop="emit('click', index)"
    @keydown.space.prevent.stop="emit('click', index)"
  >
    <div class="v-uploader__preview-card-info">
      <component
        :is="fileIcon"
        class="v-uploader__preview-card-icon"
      />
      <span class="v-uploader__preview-card-name is--small">
        {{ file.name }}
      </span>
    </div>
    <button
      type="button"
      class="v-uploader__preview-card-remove"
      title="Remove file"
      aria-label="Remove file"
      @click.stop="removeFile(index)"
    >
      <closeIcon
        alt="close icon"
        class="v-uploader__close-icon"
      />
    </button>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-uploader {
  &__preview-card {
    width: 100%;
    display: flex;
    border-top: 1px solid colors.$gray-20;
    padding: 7px 13px 7px 10px;
    align-items: center;
    gap: 12px;
    justify-content: space-between;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: colors.$gray-20;
      transition: background-color 0.2s ease;
    }
  }

  &__preview-card-info {
    display: flex;
    align-items: center;
    gap: 12px;
    color: colors.$gray-80;
  }

  &__preview-card-remove {
    cursor: pointer;
    display: flex;
  }

  &__preview-card-icon {
    width: 16px;
    flex-shrink: 0;
  }

  &__close-icon {
    width: 15px;
    height: 15px;
    vertical-align: middle;
  }
}
</style>
