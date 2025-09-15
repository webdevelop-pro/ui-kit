<script setup lang="ts">
import fileIcon from '../../assets/images/file.svg';
import closeIcon from '../../assets/images/close.svg?component';
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import VImage from 'UiKit/components/Base/VImage/VImage.vue';

interface PreloadedItem {
  id?: string | number;
  name: string;
  url: string;
  mimeType?: string;
  thumbnailUrl?: string;
}

interface Props {
  file?: File;
  preloaded?: PreloadedItem;
  index: number;
  canRemove?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  canRemove: true,
});

const emit = defineEmits<{
  'remove': [index: number];
  'click': [index: number];
}>();

const removeFile = (index: number) => {
  emit('remove', index);
};

const objectUrl = ref<string | null>(null);

const isImage = computed(() => {
  if (props.file) return props.file.type?.startsWith('image/');
  if (props.preloaded?.mimeType) return props.preloaded.mimeType.startsWith('image/');
  const url = props.preloaded?.thumbnailUrl || props.preloaded?.url || '';
  return /\.(png|jpe?g|gif|webp|svg|bmp|tiff?)$/i.test(url);
});

const displayName = computed(() => {
  if (props.file) return props.file.name;
  return props.preloaded?.name || '';
});

const previewSrc = computed(() => {
  if (props.file && isImage.value) {
    return objectUrl.value;
  }
  if (props.preloaded && isImage.value) {
    return props.preloaded.thumbnailUrl || props.preloaded.url;
  }
  return null;
});

watch(
  () => props.file,
  (newFile) => {
    if (objectUrl.value) {
      URL.revokeObjectURL(objectUrl.value);
      objectUrl.value = null;
    }
    if (newFile && newFile.type?.startsWith('image/')) {
      objectUrl.value = URL.createObjectURL(newFile);
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (objectUrl.value) {
    URL.revokeObjectURL(objectUrl.value);
    objectUrl.value = null;
  }
});
</script>

<template>
  <div 
    class="VUploaderPreviewCard v-uploader__preview-card"
    :class="{ 'is--image': isImage }"
    role="button"
    tabindex="0"
    @click.stop="emit('click', index)"
    @keydown.enter.stop="emit('click', index)"
    @keydown.space.prevent.stop="emit('click', index)"
  >
    <div class="v-uploader__preview-card-info">
      <template v-if="isImage && previewSrc">
        <VImage
          alt="preview"
          :src="previewSrc"
          class="v-uploader__preview-card-thumb is--margin-top-0"
        />
      </template>
      <template v-else>
        <component
          :is="fileIcon"
          class="v-uploader__preview-card-icon"
        />
        <span class="v-uploader__preview-card-name is--small">
          {{ displayName }}
        </span>
      </template>
    </div>
    <button
      v-if="canRemove"
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
  $root: &;

  &__preview-card {
    transition: background-color 0.2s ease;

    &:not(.is--image) {
      width: 100%;
      display: flex;
      border-top: 1px solid colors.$gray-20;
      padding: 7px 13px 7px 10px;
      align-items: center;
      gap: 12px;
      justify-content: space-between;
    }

    &.is--image {
      padding: 4px;
      width: fit-content;
      position: relative;
      display: inline-block;
    }

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

  &__preview-card.is--image  &__preview-card-remove {
      position: absolute;
      top: 0;
      right: 0;
      background-color: colors.$white;
      padding: 2px;
      border-radius: 2px;
  }

  &__preview-card-icon {
    width: 16px;
    flex-shrink: 0;
  }

  &__preview-card-thumb {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 2px;
    flex-shrink: 0;
  }

  &__close-icon {
    width: 15px;
    height: 15px;
    vertical-align: middle;
  }
}
</style>
