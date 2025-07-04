<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<script setup lang="ts">
import { ref, watch } from 'vue';
import VButton from 'UiKit/components/Base/VButton/VButton.vue';
import uploadIcon from 'UiKit/assets/images/upload.svg';
import fileIcon from 'UiKit/assets/images/file.svg';
import closeIcon from 'UiKit/assets/images/close.svg?component';

interface Props {
  modelValue?: number | null;
  isError?: boolean;
  isDisabled?: boolean;
  size?: 'large' | 'medium' | 'small';
  maxFileSize?: number; // in MB
  acceptedFileTypes?: string;
  objectName?: string;
  objectId?: string | number;
  userId?: string | number;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  isError: false,
  isDisabled: false,
  size: 'medium',
  maxFileSize: 10, // 10MB default
  acceptedFileTypes: 'application/pdf',
  objectName: 'document',
  objectId: '',
  userId: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void;
  (e: 'upload-success', fileId: number): void;
  (e: 'upload-error', error: string): void;
}>();

const filesUploadError = ref('');
const isDragging = ref(false);
const refFiles = ref<HTMLInputElement>();
const isLoading = ref(false);
const uploadedFileId = ref<number | null>(props.modelValue || null);
const uploadedFileName = ref<string>('');

// Watch for external modelValue changes
watch(() => props.modelValue, (newValue) => {
  uploadedFileId.value = newValue;
});

const onFileChange = async () => {
  const fileList = refFiles.value?.files as FileList;
  const incomingFiles = Array.from(fileList);
  const maxAllowedSize = props.maxFileSize * 1024 * 1024; // Convert MB to bytes
  filesUploadError.value = '';
  isLoading.value = true;

  if (incomingFiles.length === 0) {
    isLoading.value = false;
    return;
  }

  const file = incomingFiles[0]; // Only handle single file

  // Validate file size
  if (file.size >= maxAllowedSize) {
    filesUploadError.value = `Please upload a smaller file size. Limit ${props.maxFileSize}MB`;
    isLoading.value = false;
    return;
  }

  // Validate file type
  if (!file.type.match(/pdf|image\/(jpeg|jpg|png)/)) {
    filesUploadError.value = 'Please upload a valid file type (PDF, JPG, JPEG, PNG)';
    isLoading.value = false;
    return;
  }

  try {
    // Simulate upload process - in real implementation, this would call the filer store
    // For now, we'll simulate the upload and return a mock file ID
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate upload delay
    
    const mockFileId = Math.floor(Math.random() * 10000) + 1; // Mock file ID
    uploadedFileId.value = mockFileId;
    uploadedFileName.value = file.name;
    
    emit('update:modelValue', mockFileId);
    emit('upload-success', mockFileId);
    filesUploadError.value = '';
  } catch (error) {
    filesUploadError.value = 'Upload failed. Please try again.';
    emit('upload-error', 'Upload failed');
  } finally {
    isLoading.value = false;
  }
};

const triggerFileInput = () => {
  if (!props.isDisabled) {
    refFiles.value?.click();
  }
};

const dragover = (e: DragEvent) => {
  if (!props.isDisabled) {
    e.preventDefault();
    isDragging.value = true;
  }
};

const dragleave = (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = false;
};

const drop = (e: DragEvent) => {
  if (!props.isDisabled) {
    e.preventDefault();
    const files = e.dataTransfer?.files as FileList;
    if (refFiles.value) refFiles.value.files = files;
    onFileChange();
    isDragging.value = false;
  }
};

const removeFile = () => {
  uploadedFileId.value = null;
  uploadedFileName.value = '';
  emit('update:modelValue', null);
  emit('upload-success', 0);
};
</script>

<template>
  <div class="VFormDocument v-form-document">
    <div
      class="v-form-document__dropzone"
      :class="{
        'is--dragging': isDragging,
        'is--error': filesUploadError || isError,
        'is--disabled': isDisabled,
        'is--file': uploadedFileId,
      }"
      @dragover.prevent="dragover"
      @dragleave.prevent="dragleave"
      @drop.prevent="drop"
      @click="triggerFileInput"
    >
      <input
        id="file-control"
        ref="refFiles"
        name="file"
        type="file"
        :accept="acceptedFileTypes"
        :disabled="isDisabled"
        @change="onFileChange"
      >

      <label
        class="v-form-document__label"
        for="file-control"
        :class="{ disabled: isDisabled }"
      >
        Drag & drop files here or click to upload
      </label>

      <VButton
        size="small"
        variant="outlined"
        :loading="isLoading"
        :disabled="isDisabled"
        class="v-form-document__file-button"
      >
        <component
          :is="uploadIcon"
          class="v-form-document__file-icon"
        />
        Upload
      </VButton>

      <div
        v-if="uploadedFileId"
        class="v-form-document__preview"
      >
        <div class="v-form-document__preview-card">
          <div class="v-form-document__preview-card-info">
            <component
              :is="fileIcon"
              class="v-form-document__preview-card-icon"
            />
            <span class="v-form-document__preview-card-name is--small">
              {{ uploadedFileName }}
            </span>
          </div>
          <div
            class="v-form-document__preview-card-remove"
            title="Remove file"
            @click.stop="removeFile"
          >
            <closeIcon
              alt="close icon"
              class="v-form-document__close-icon"
            />
          </div>
        </div>
      </div>
    </div>
    
    <p
      v-if="filesUploadError"
      class="v-form-document__error is--small"
    >
      {{ filesUploadError }}
    </p>
    
    <div class="v-form-document__comment is--small">
      Supported files: PDF, JPG, JPEG, PNG. Maximum size {{ maxFileSize }}MB.
    </div>
  </div>
</template>

<style lang="scss">
@use 'UiKit/styles/_colors.scss' as colors;

.v-form-document {
  $root: &;

  &__dropzone {
    display: flex;
    padding: 32px 12px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    border-radius: 2px;
    border: 1px dashed colors.$gray-40;
    background: colors.$gray-10;
    transition: border-color 0.2s ease;
    
    &.is--dragging {
      border-color: colors.$primary;
    }

    &.is--error {
      border-color: colors.$red;
    }

    &.is--file {
      padding: 32px 12px 12px 12px;
    }

    &.is--disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    &:hover:not(.is--disabled) {
      border-color: colors.$primary;
      cursor: pointer;
    }
  }

  input[type="file"] {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
  }

  &__label {
    color: colors.$gray-60;
    
    &.disabled {
      cursor: not-allowed;
    }
  }

  &__file-button {
    margin-top: 12px;
    
    #{$root}__dropzone.is--file & {
      margin-bottom: 32px;
    }
  }

  &__preview {
    width: 100%;
    position: relative;
    z-index: 1;
  }

  &__preview-card {
    width: 100%;
    display: flex;
    border-top: 1px solid colors.$gray-20;
    padding: 7px 13px 7px 10px;
    align-items: center;
    gap: 12px;
    justify-content: space-between;
  }

  &__preview-card-info {
    display: flex;
    align-items: center;
    gap: 12px;
    color: colors.$gray-80;
  }

  &__preview-card-remove {
    cursor: pointer;
    
    &:hover {
      opacity: 0.7;
    }
  }

  &__comment {
    color: colors.$gray-70;
    margin-top: 4px;
  }

  &__error {
    margin-top: 4px;
    color: colors.$red;
  }

  &__file-icon {
    width: 16px;
  }

  &__preview-card-icon {
    width: 16px;
  }

  &__close-icon {
    width: 15px;
    height: 15px;
    vertical-align: middle;
  }
}
</style> 