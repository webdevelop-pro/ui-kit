<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<script setup lang="ts">
import { ref, computed } from 'vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import uploadIcon from 'UiKit/assets/images/upload.svg';
import fileIcon from 'UiKit/assets/images/file.svg';
import closeIcon from 'UiKit/assets/images/close.svg?component';
import VSkeleton from 'UiKit/components/Base/VSkeleton/VSkeleton.vue';

interface Props {
  isError?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  acceptedFileTypes?: string; // e.g., "application/pdf,image/*"
  dragDropText?: string;
  uploadButtonText?: string;
  supportedFilesText?: string;
  maxSizeText?: string;
  showFilePreview?: boolean;
  showSupportedFilesInfo?: boolean;
  showMaxSizeInfo?: boolean;
  customClass?: string;
  multiple?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isError: false,
  isDisabled: false,
  isLoading: false,
  maxFiles: 1,
  maxFileSize: 10, // 10MB default
  acceptedFileTypes: '*',
  dragDropText: 'Drag & drop files here or click to upload',
  uploadButtonText: 'Upload',
  supportedFilesText: 'Supported files: all types',
  maxSizeText: 'Maximum size 10MB',
  showFilePreview: true,
  showSupportedFilesInfo: true,
  showMaxSizeInfo: true,
  customClass: '',
  multiple: false,
});

const emit = defineEmits<{
  'update:files': [files: File[]];
  'remove': [index: number];
  'error': [message: string];
}>();

const filesUploadError = ref('');
const isDragging = ref(false);
const refFiles = ref<HTMLInputElement>();
const allFiles = ref<File[]>([]);

// Validation helpers
const validateFileSize = (files: File[]): string | null => {
  const maxFileSizeInBytes = props.maxFileSize * 1024 * 1024;
  const oversizedFiles = files.filter(file => file.size >= maxFileSizeInBytes);
  return oversizedFiles.length > 0 
    ? `Please upload smaller files. Limit ${props.maxFileSize}MB`
    : null;
};

const validateFileCount = (incomingFiles: File[]): string | null => {
  if (incomingFiles.length + allFiles.value.length > props.maxFiles) {
    return `You are only allowed to upload a maximum of ${props.maxFiles} files at a time`;
  }
  return null;
};

const validateDuplicateFiles = (incomingFiles: File[]): string | null => {
  const hasDuplicates = allFiles.value.some(existingFile => 
    incomingFiles.some(newFile => 
      newFile.name === existingFile.name && newFile.size === existingFile.size
    )
  );
  return hasDuplicates ? 'New upload contains files that already exist' : null;
};

const setError = (message: string) => {
  filesUploadError.value = message;
  emit('error', message);
};

const onFileChange = () => {
  const fileList = refFiles.value?.files as FileList;
  const incomingFiles = Array.from(fileList);
  filesUploadError.value = '';

  // Validate file size
  const sizeError = validateFileSize(incomingFiles);
  if (sizeError) {
    setError(sizeError);
    return;
  }

  // Single file mode - replace existing files
  if (!props.multiple) {
    allFiles.value = incomingFiles;
    emit('update:files', allFiles.value);
    return;
  }

  // Multiple file mode - additional validations
  const countError = validateFileCount(incomingFiles);
  if (countError) {
    setError(countError);
    setTimeout(() => {
      filesUploadError.value = '';
    }, 4000);
    return;
  }

  const duplicateError = validateDuplicateFiles(incomingFiles);
  if (duplicateError) {
    setError(duplicateError);
    return;
  }

  // Add new files to existing ones
  allFiles.value = [...allFiles.value, ...incomingFiles];
  emit('update:files', allFiles.value);
};

const triggerFileInput = () => {
  if (!props.isDisabled && !props.isLoading) {
    refFiles.value?.click();
  }
};

const handleDragEvent = (e: DragEvent, isEntering: boolean) => {
  if (!props.isDisabled && !props.isLoading) {
    e.preventDefault();
    isDragging.value = isEntering;
  }
};

const drop = (e: DragEvent) => {
  if (!props.isDisabled && !props.isLoading) {
    e.preventDefault();
    const files = e.dataTransfer?.files as FileList;
    if (refFiles.value) refFiles.value.files = files;
    onFileChange();
    isDragging.value = false;
  }
};

const removeFile = (index: number) => {
  allFiles.value.splice(index, 1);
  filesUploadError.value = '';
  emit('update:files', allFiles.value);
  emit('remove', index);
};
</script>

<template>
  <div 
    class="VUploader v-uploader"
    :class="customClass"
  >
    <div
      class="v-uploader__dropzone"
      :class="{
        'is--dragging': isDragging,
        'is--error': filesUploadError || isError,
        'is--disabled': isDisabled,
        'is--loading': isLoading,
        'is--files': allFiles?.length > 0,
      }"
      @dragover.prevent="handleDragEvent($event, true)"
      @dragleave.prevent="handleDragEvent($event, false)"
      @drop.prevent="drop"
      @click="triggerFileInput"
    >
      <input
        id="file-control"
        ref="refFiles"
        name="file"
        :multiple="multiple"
        type="file"
        :accept="acceptedFileTypes"
        :disabled="isDisabled || isLoading"
        @change="onFileChange"
      >

      <label
        class="v-uploader__label"
        for="file-control"
        :class="{ disabled: isDisabled || isLoading }"
      >
        {{ dragDropText }}
      </label>
      <VSkeleton
        v-if="isLoading"
        width="200px"
        height="28px"
        class="v-uploader__file-button"
      />
      <VButton
        v-else
        size="small"
        variant="outlined"
        class="v-uploader__file-button"
        :disabled="isDisabled || isLoading"
        @click.stop="triggerFileInput"
      >
        <component
          :is="uploadIcon"
          class="v-uploader__file-icon"
        />
        {{ uploadButtonText }}
      </VButton>
      
      <div
        v-if="allFiles?.length && showFilePreview"
        class="v-uploader__preview"
      >
        <div
          v-for="(file, index) in allFiles"
          :key="`${file.name}-${index}`"
          class="v-uploader__preview-card"
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
          <div
            class="v-uploader__preview-card-remove"
            title="Remove file"
            @click.stop="removeFile(index)"
          >
            <closeIcon
              alt="close icon"
              class="v-uploader__close-icon"
            />
          </div>
        </div>
      </div>
    </div>
    
    <p
      v-if="filesUploadError"
      class="v-uploader__error is--small"
    >
      {{ filesUploadError }}
    </p>


    <VSkeleton
      v-if="isLoading"
      width="200px"
      height="17px"
      class="v-uploader__comment is--small"
    />
    
    <div 
      v-else-if="showSupportedFilesInfo || showMaxSizeInfo"
      class="v-uploader__comment is--small"
    >
      <span v-if="showSupportedFilesInfo">{{ supportedFilesText }}</span>
      <span v-if="showSupportedFilesInfo && showMaxSizeInfo">. </span>
      <span v-if="showMaxSizeInfo">{{ maxSizeText }}</span>
    </div>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-uploader{
  $root: &;

  &__dropzone{
    display: flex;
    padding: 32px 12px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    border-radius: 2px;
    border: 1px dashed colors.$gray-40;
    background: colors.$gray-10;
    &.is--dragging{
      border-color: colors.$primary;
    }

    &.is--error{
      border-color: colors.$red;
    }

    &.is--files{
      padding: 32px 12px 12px 12px;
    }

    &.is--disabled{
      opacity: 0.3;
      pointer-events: none;
    }

    &.is--loading{
      opacity: 0.6;
      pointer-events: none;
    }

    &:hover:not(.is--disabled):not(.is--loading){
      border-color: colors.$primary;
      cursor: pointer;
    }
  }
  
  input[type="file"]{
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
  }

  &__label{
    color: colors.$gray-60;
  }

  &__file-button{
    margin-top: 12px;
    #{$root}__dropzone.is--files &{
      margin-bottom: 32px;
    }
  }

  &__preview{
    width: 100%;
    position: relative;
    z-index: 1;
  }

  &__preview-card{
    width: 100%;
    display: flex;
    border-top: 1px solid colors.$gray-20;
    padding: 7px 13px 7px 10px;
    align-items: center;
    gap: 12px;
    justify-content: space-between;
  }

  &__preview-card-info{
    display: flex;
    align-items: center;
    gap: 12px;
    color: colors.$gray-80;
  }

  &__preview-card-remove{
    cursor: pointer;
  }

  &__comment{
    color: colors.$gray-70;
    margin-top: 4px;
  }

  &__error{
    margin-top: 4px;
    color: colors.$red;
  }

  &__file-icon{
    width: 16px;
  }

  &__preview-card-icon{
    width: 16px;
  }

  &__close-icon {
    width: 15px;
    height: 15px;
    vertical-align: middle;
  }
}
</style>
