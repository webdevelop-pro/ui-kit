<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<script setup lang="ts">
import { ref, watch } from 'vue';
import VUploader from './VUploader.vue';
import { storeToRefs } from 'pinia';
import { useFilerStore } from 'InvestCommon/store/useFiler';
import { useRepositoryProfiles } from 'InvestCommon/data/profiles/profiles.repository';

interface Props {
  modelValue?: number[] | null;
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
  multiple?: boolean | null;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  isError: false,
  isDisabled: false,
  isLoading: false,
  maxFiles: 5,
  maxFileSize: 10, // 10MB default
  acceptedFileTypes: 'application/pdf,image/jpeg,image/jpg,image/png',
  dragDropText: 'Drag & drop files here or click to upload',
  uploadButtonText: 'Upload',
  supportedFilesText: 'Supported files: PDF, JPG, JPEG, PNG',
  maxSizeText: 'Maximum size 10MB',
  showFilePreview: true,
  showSupportedFilesInfo: true,
  showMaxSizeInfo: true,
  customClass: '',
  multiple: null,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number[] | null): void;
  (e: 'upload-success', fileIds: number[]): void;
  (e: 'upload-error', error: string): void;
  (e: 'remove', index: number): void;
  (e: 'uploading', isUploading: boolean): void;
}>();

const filesUploadError = ref('');
const isUploading = ref(false);
const uploadedFileIds = ref<number[]>(props.modelValue || []);
const uploadedFileNames = ref<string[]>([]);
const uploadedFiles = ref<File[]>([]);

const filerStore = useFilerStore();
const { postSignurlData } = storeToRefs(filerStore);
const useRepositoryProfilesStore = useRepositoryProfiles();
const { getUserState } = storeToRefs(useRepositoryProfilesStore);

// Watch for external modelValue changes
watch(() => props.modelValue, (newValue) => {
  uploadedFileIds.value = newValue || [];
});

// Watch for loading state changes and emit to parent
watch(isUploading, (newValue) => {
  emit('uploading', newValue);
});

const onUpload = async (file: File): Promise<number | null> => {
  await filerStore.uploadHandler(file, getUserState.value?.data?.id, 'user');
  if (postSignurlData.value?.meta?.id) {
    return postSignurlData.value.meta.id;
  }
  return null;
};

const onFilesChange = async (files: File[]) => {
  console.log('onFilesChange', files);
  if (files.length === 0) {
    uploadedFileIds.value = [];
    uploadedFileNames.value = [];
    uploadedFiles.value = [];
    emit('update:modelValue', null);
    emit('upload-success', []);
    return;
  }

  isUploading.value = true;
  filesUploadError.value = '';

  try {
    const newFileIds: number[] = [];
    const newFileNames: string[] = [];
    const newFiles: File[] = [];

    // If multiple is null, only take the last file (single file mode)
    const filesToProcess = props.multiple === null ? [files[files.length - 1]] : files;

    // Upload each file sequentially to avoid conflicts
    for (const file of filesToProcess) {
      await onUpload(file);
      if (postSignurlData.value?.meta?.id) {
        newFileIds.push(postSignurlData.value?.meta?.id);
        newFileNames.push(file.name);
        newFiles.push(file);
      } else {
        throw new Error(`Failed to upload file: ${file.name}`);
      }
    }

    uploadedFileIds.value = newFileIds;
    uploadedFileNames.value = newFileNames;
    uploadedFiles.value = newFiles;

    emit('update:modelValue', uploadedFileIds.value);
    emit('upload-success', uploadedFileIds.value);
    filesUploadError.value = '';
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Upload failed. Please try again.';
    filesUploadError.value = errorMessage;
    emit('upload-error', errorMessage);
  } finally {
    isUploading.value = false;
  }
};

const onFileRemove = (index: number) => {
  uploadedFileIds.value.splice(index, 1);
  uploadedFileNames.value.splice(index, 1);
  uploadedFiles.value.splice(index, 1);
  
  emit('update:modelValue', uploadedFileIds.value.length > 0 ? uploadedFileIds.value : null);
  emit('remove', index);
};

const onUploaderError = (message: string) => {
  filesUploadError.value = message;
  emit('upload-error', message);
};
</script>

<template>
  <div class="VUploaderWithIds v-uploader-with-ids">
    <VUploader
      :is-error="isError || (filesUploadError.length > 0)"
      :is-disabled="isDisabled || isUploading || isLoading"
      :is-loading="isLoading"
      :max-files="maxFiles"
      :max-file-size="maxFileSize"
      :accepted-file-types="acceptedFileTypes"
      :drag-drop-text="dragDropText"
      :upload-button-text="uploadButtonText"
      :supported-files-text="supportedFilesText"
      :max-size-text="maxSizeText"
      :show-file-preview="showFilePreview"
      :show-supported-files-info="showSupportedFilesInfo"
      :show-max-size-info="showMaxSizeInfo"
      :custom-class="customClass"
      :multiple="multiple"
      @update:files="onFilesChange"
      @remove="onFileRemove"
      @error="onUploaderError"
    />
  </div>
</template>
