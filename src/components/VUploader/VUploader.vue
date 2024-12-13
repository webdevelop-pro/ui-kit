<script setup lang="ts">
import { ref } from 'vue';
import VButton from 'UiKit/components/VButton/VButton.vue';
import VSvgIcon from 'UiKit/components/VSvgIcon/VSvgIcon.vue';

defineProps({
  isError: Boolean,
  isDisabled: Boolean,
});
const emit = defineEmits(['update:files', 'remove']);

const filesUploadError = ref('');
const isDragging = ref(false);
const refFiles = ref<HTMLInputElement>();

const allFiles = ref<File[]>([]);

const onFileChange = () => {
  const fileList = refFiles.value?.files as FileList;
  const incomingFiles = Array.from(fileList);
  const maxAllowedSize = 100 * 1024 * 1024; // 100MB
  filesUploadError.value = '';

  const fileExist = allFiles.value.some((r) => incomingFiles.some(
    (file) => file.name === r.name && file.size === r.size,
  ));

  if (fileExist) {
    filesUploadError.value = 'New upload contains files that already exist';
    return;
  }

  if (incomingFiles.length + allFiles.value.length > 5) {
    filesUploadError.value = 'You are only allowed to upload a maximum of 5 files at a time';
    setTimeout(() => {
      filesUploadError.value = '';
    }, 4000);
    return;
  }

  incomingFiles.forEach((file: File) => {
    if (file.size >= maxAllowedSize) {
      filesUploadError.value = 'Please upload a smaller file size. Limit 100MB';
    }
  });

  if (filesUploadError.value) return;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  allFiles.value = [...allFiles.value, ...incomingFiles];
  emit('update:files', allFiles.value);
};

const triggerFileInput = () => {
  refFiles.value?.click();
};

const dragover = () => {
  isDragging.value = true;
};

const dragleave = () => {
  isDragging.value = false;
};

const drop = (e: DragEvent) => {
  const files = e.dataTransfer?.files as FileList;
  if (refFiles.value) refFiles.value.files = files;
  onFileChange();
  isDragging.value = false;
};

const removeFile = (index: number) => {
  allFiles.value.splice(index, 1);
  filesUploadError.value = '';
  emit('update:files', allFiles.value);
  emit('remove', index);
};
</script>

<template>
  <div class="VUploader v-uploader">
    <div
      class="v-uploader__dropzone"
      :class="{
        'is--dragging': isDragging,
        'is--error': filesUploadError || isError,
        'is--disabled': isDisabled,
        'is--files': allFiles?.length > 0,
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
        multiple
        type="file"
        accept="application/pdf"
        data-testid="accreditation-input-file"
        @change="onFileChange"
      >

      <label
        class="v-uploader__label"
        for="file-control"
        :class="{ disabled: isDisabled }"
      >
        Drag & drop files here or click to upload
      </label>

      <VButton
        size="small"
        variant="outlined"
        icon-placement="left"
        class="v-uploader__file-button"
      >
        <VSvgIcon
          name="upload"
          class="v-uploader__file-icon"
        />
        Upload
      </VButton>
      <div
        v-if="allFiles?.length"
        class="v-uploader__preview"
      >
        <div
          v-for="(file, index) in allFiles"
          :key="file.name"
          class="v-uploader__preview-card"
        >
          <div class="v-uploader__preview-card-info">
            <VSvgIcon
              name="file"
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
            <b>×</b>
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
    <div class="v-uploader__comment is--small">
      Supported files: pdf. Maximum size 100mb.
    </div>
  </div>
</template>

<style lang="sass">
@use 'UiKit/styles/_colors.sass' as colors

.v-uploader
  $root: &

  &__dropzone
    display: flex
    padding: 32px 12px
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 12px
    align-self: stretch
    border-radius: 2px
    border: 1px dashed colors.$gray-40
    background: colors.$gray-10
    &.is--dragging
      border-color: colors.$primary

    &.is--error
      border-color: colors.$red

    &.is--files
      padding: 32px 12px 12px 12px

    &.is--disabled
      opacity: 0.3

    &:hover
      border-color: colors.$primary
      cursor: pointer

  input[type="file"]
    opacity: 0
    overflow: hidden
    position: absolute
    width: 1px
    height: 1px

  &__label
    color: colors.$gray-60

  &__file-button
    #{$root}__dropzone.is--files &
      margin-bottom: 32px

  &__preview
    width: 100%
    position: relative
    z-index: 1

  &__preview-card
    width: 100%
    display: flex
    border-top: 1px solid colors.$gray-20
    padding: 12px
    align-items: center
    gap: 12px
    justify-content: space-between

  &__preview-card-info
    display: flex
    align-items: center
    gap: 12px
    color: colors.$gray-80

  &__preview-card-remove
    cursor: pointer

  &__comment
    color: colors.$gray-70
    margin-top: 4px

  &__error
    margin-top: 4px
    color: colors.$red
  
  &__file-icon
    width: 16px

  &__preview-card-icon
    width: 16px
</style>
